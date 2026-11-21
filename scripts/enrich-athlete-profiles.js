// Builds lib/data/athlete-profiles.json: photo, longer story, birth date and birthplace for every athlete.
// - Photo: Wikipedia lead image, FREE licences only (PageImages pilicense=free), credited to Wikimedia Commons.
// - Story: the opening paragraphs of the athlete's Wikipedia article (CC BY-SA 4.0, attributed on the page).
// - Birth date / birthplace: Wikidata (CC0).
// Usage: node scripts/enrich-athlete-profiles.js
const fs = require("fs")
const path = require("path")

const root = path.join(__dirname, "..")
const UA = { "User-Agent": "IndianSportsRepository-importer/1.0 (local dev script)" }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const slugify = (name) => name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

async function get(url) {
  for (let attempt = 0; attempt < 8; attempt++) {
    try {
      const res = await fetch(url, { headers: UA })
      if (res.ok) { const data = await res.json(); await sleep(300); return data }
    } catch {}
    await sleep(4000 * (attempt + 1))
  }
  throw new Error("failed " + url)
}

function collectAthletes() {
  const out = new Map() // id -> wiki title
  const read = (f) => fs.readFileSync(path.join(root, f), "utf8")
  // Hand-written base + Haryana entries: look up by name
  for (const f of ["lib/athlete-data.ts", "lib/data/haryana.ts"]) {
    for (const m of read(f).matchAll(/id: "([^"]+)", name: "([^"]+)"/g)) out.set(m[1], m[2].replace(/ /g, "_"))
  }
  for (const f of fs.readdirSync(path.join(root, "lib/data")).filter((f) => /^athletes-batch-\d+\.ts$/.test(f))) {
    for (const m of read("lib/data/" + f).matchAll(/\["([^"]+)", "[a-z-]+", "[^"]+", "[^"]*", "[^"]+", "[OPWIN]"(?:, "([^"]+)")?\]/g)) {
      out.set(slugify(m[1]), m[2] || m[1].replace(/ /g, "_"))
    }
  }
  const wiki = JSON.parse(read("lib/data/athletes-wiki.json"))
  for (const row of wiki) if (!out.has(slugify(row.name))) out.set(slugify(row.name), row.wiki)
  return out
}

async function main() {
  const athletes = [...collectAthletes()]
  console.log("athletes:", athletes.length)
  const profiles = {}
  const qids = new Map() // id -> Q
  for (let i = 0; i < athletes.length; i += 20) {
    const chunk = athletes.slice(i, i + 20)
    const params = new URLSearchParams({
      action: "query", format: "json", formatversion: "2", redirects: "1",
      prop: "pageimages|extracts|pageprops|description", piprop: "thumbnail|name", pithumbsize: "480", pilicense: "free",
      exintro: "1", explaintext: "1", exlimit: "20", ppprop: "wikibase_item|disambiguation",
      titles: chunk.map(([, t]) => t.replace(/_/g, " ")).join("|"),
    })
    const data = await get("https://en.wikipedia.org/w/api.php?" + params)
    const norm = new Map((data.query.normalized || []).map((n) => [n.from, n.to]))
    const redir = new Map((data.query.redirects || []).map((n) => [n.from, n.to]))
    const pages = new Map((data.query.pages || []).map((p) => [p.title, p]))
    for (const [id, title] of chunk) {
      let t = title.replace(/_/g, " ")
      t = norm.get(t) || t
      t = redir.get(t) || t
      const p = pages.get(t)
      if (!p || p.missing || p.pageprops?.disambiguation !== undefined) continue
      // Only trust pages that describe a sportsperson
      if (!/player|athlete|cricketer|footballer|boxer|wrestler|shooter|archer|swimmer|weightlifter|sprinter|runner|thrower|jumper|chess|gymnast|judoka|kabaddi|hockey|tennis|badminton|olympian|paralympian|sportsperson|sportswoman|sportsman|skier|walker|hurdler/i.test(p.description || "")) continue
      const story = (p.extract || "").split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 3).join("\n\n").slice(0, 1600)
      profiles[id] = {
        title: p.title,
        description: p.description,
        story,
        image: p.thumbnail ? { src: p.thumbnail.source, width: p.thumbnail.width, height: p.thumbnail.height, file: p.pageimage } : undefined,
      }
      if (p.pageprops?.wikibase_item) qids.set(id, p.pageprops.wikibase_item)
    }
    if (i % 400 === 0) console.log(`wikipedia ${i}/${athletes.length}`)
  }

  // Photo credits: author and licence for each image (from Wikimedia Commons metadata)
  const withImages = Object.values(profiles).filter((p) => p.image?.file)
  for (let i = 0; i < withImages.length; i += 50) {
    const chunk = withImages.slice(i, i + 50)
    const params = new URLSearchParams({ action: "query", format: "json", formatversion: "2", prop: "imageinfo", iiprop: "extmetadata", iiextmetadatafilter: "Artist|LicenseShortName|LicenseUrl", titles: chunk.map((p) => "File:" + p.image.file).join("|") })
    const data = await get("https://commons.wikimedia.org/w/api.php?" + params)
    const norm = new Map((data.query.normalized || []).map((n) => [n.from, n.to]))
    const pages = new Map((data.query.pages || []).map((p) => [p.title, p]))
    for (const profile of chunk) {
      const key = "File:" + profile.image.file
      const page = pages.get(norm.get(key) || key) || pages.get(key.replace(/_/g, " "))
      const meta = page?.imageinfo?.[0]?.extmetadata
      if (!meta) { delete profile.image; continue } // not on Commons: skip to be safe
      const artist = (meta.Artist?.value || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 80)
      profile.image.credit = artist || "Wikimedia Commons contributor"
      profile.image.license = meta.LicenseShortName?.value || "Free licence"
      profile.image.page = "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(profile.image.file)
    }
  }

  // Wikidata: birth date (P569) and place of birth (P19)
  const entries = [...qids]
  const places = new Map()
  for (let i = 0; i < entries.length; i += 50) {
    const chunk = entries.slice(i, i + 50)
    const data = await get("https://www.wikidata.org/w/api.php?" + new URLSearchParams({ action: "wbgetentities", format: "json", props: "claims", ids: chunk.map(([, q]) => q).join("|") }))
    for (const [id, q] of chunk) {
      const claims = data.entities?.[q]?.claims || {}
      const born = claims.P569?.[0]?.mainsnak?.datavalue?.value?.time
      const place = claims.P19?.[0]?.mainsnak?.datavalue?.value?.id
      if (born) profiles[id].born = born.replace(/^\+/, "").slice(0, 10).replace(/-00/g, "")
      if (place) { profiles[id].placeId = place; places.set(place, null) }
    }
    if (i % 500 === 0) console.log(`wikidata ${i}/${entries.length}`)
  }
  const placeIds = [...places.keys()]
  for (let i = 0; i < placeIds.length; i += 50) {
    const chunk = placeIds.slice(i, i + 50)
    const data = await get("https://www.wikidata.org/w/api.php?" + new URLSearchParams({ action: "wbgetentities", format: "json", props: "labels", languages: "en", ids: chunk.join("|") }))
    for (const q of chunk) places.set(q, data.entities?.[q]?.labels?.en?.value || null)
  }
  for (const p of Object.values(profiles)) {
    if (p.placeId) { p.birthplace = places.get(p.placeId) || undefined; delete p.placeId }
  }

  const out = path.join(root, "lib", "data", "athlete-profiles.json")
  fs.writeFileSync(out, JSON.stringify(profiles))
  const withImage = Object.values(profiles).filter((p) => p.image).length
  console.log(`Wrote ${Object.keys(profiles).length} profiles (${withImage} with free photos) to ${out}`)
}
main().catch((e) => { console.error(e); process.exit(1) })
