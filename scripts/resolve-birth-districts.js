// Writes lib/data/athlete-birth-areas.json: for each athlete, the birthplace plus the two administrative
// areas above it on Wikidata (P131), e.g. ["Khandra", "Panipat district", "Haryana"].
// The state district maps use these to place athletes born in villages and towns in their district.
// Usage: node scripts/resolve-birth-districts.js
const fs = require("fs")
const path = require("path")

const root = path.join(__dirname, "..")
const outFile = path.join(root, "lib", "data", "athlete-birth-areas.json")
const slugify = (name) => name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

// Every athlete id with its English Wikipedia title (hand-written lists first, then the import).
function collectTitles() {
  const out = new Map()
  const read = (f) => fs.readFileSync(path.join(root, f), "utf8")
  for (const f of ["lib/athlete-data.ts", "lib/data/haryana.ts"]) for (const m of read(f).matchAll(/id: "([^"]+)", name: "([^"]+)"/g)) out.set(m[1], m[2])
  for (const f of fs.readdirSync(path.join(root, "lib/data")).filter((f) => /^athletes-batch-\d+\.ts$/.test(f))) {
    for (const m of read("lib/data/" + f).matchAll(/\["([^"]+)", "[a-z-]+", "[^"]+", "[^"]*", "[^"]+", "[OPWIN]"(?:, "([^"]+)")?\]/g)) out.set(slugify(m[1]), (m[2] || m[1]).replace(/_/g, " "))
  }
  for (const row of JSON.parse(read("lib/data/athletes-wiki.json"))) if (!out.has(slugify(row.name))) out.set(slugify(row.name), row.wiki.replace(/_/g, " "))
  return out
}
const UA = { "User-Agent": "IndianSportsRepository-importer/1.0 (local dev script)" }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function wd(params) {
  for (let attempt = 0; attempt < 8; attempt++) {
    try {
      const res = await fetch("https://www.wikidata.org/w/api.php?" + new URLSearchParams({ format: "json", ...params }), { headers: UA })
      if (res.ok) { await sleep(250); return await res.json() }
    } catch {}
    await sleep(4000 * (attempt + 1))
  }
  throw new Error("wikidata failed")
}

const claimIds = (entity, prop) => (entity?.claims?.[prop] || []).map((c) => c.mainsnak?.datavalue?.value?.id).filter(Boolean)

async function entities(ids, props) {
  const out = {}
  for (let i = 0; i < ids.length; i += 50) {
    const data = await wd({ action: "wbgetentities", ids: ids.slice(i, i + 50).join("|"), props, languages: "en" })
    Object.assign(out, data.entities || {})
  }
  return out
}

async function main() {
  const entries = [...collectTitles()].map(([id, title]) => [id, { title }])
  console.log("athletes:", entries.length)

  // 1. Birthplace item for every athlete, looked up by English Wikipedia title
  const placeOf = new Map()
  for (let i = 0; i < entries.length; i += 50) {
    const chunk = entries.slice(i, i + 50)
    const data = await wd({ action: "wbgetentities", sites: "enwiki", titles: chunk.map(([, p]) => p.title).join("|"), props: "claims|sitelinks", sitefilter: "enwiki" })
    const norm = new Map((data.normalized ? Object.values(data.normalized) : []).map((n) => [n.from, n.to]))
    const byTitle = new Map(Object.values(data.entities || {}).filter((e) => e.sitelinks?.enwiki).map((e) => [e.sitelinks.enwiki.title, e]))
    for (const [from, to] of norm) if (byTitle.has(to)) byTitle.set(from, byTitle.get(to))
    for (const [id, p] of chunk) {
      const place = claimIds(byTitle.get(p.title), "P19")[0]
      if (place) placeOf.set(id, place)
    }
    if (i % 1000 === 0) console.log(`athletes ${i}/${entries.length}`)
  }

  // 2. Two levels of "located in the administrative territorial entity" above each birthplace
  const places = await entities([...new Set(placeOf.values())], "claims|labels")
  const parents = new Map()
  for (const [q, e] of Object.entries(places)) parents.set(q, claimIds(e, "P131")[0])
  const level2 = await entities([...new Set([...parents.values()].filter(Boolean))], "claims|labels")
  const grand = new Map()
  for (const [q, e] of Object.entries(level2)) grand.set(q, claimIds(e, "P131")[0])
  const level3 = await entities([...new Set([...grand.values()].filter((q) => q && !level2[q] && !places[q]))], "labels")
  const label = (q) => (q && (places[q] || level2[q] || level3[q])?.labels?.en?.value) || null

  const result = {}
  for (const [id, place] of placeOf) {
    const parent = parents.get(place)
    const areas = [label(place), label(parent), label(grand.get(parent))].filter(Boolean)
    if (areas.length) result[id] = areas
  }
  const count = Object.keys(result).length
  fs.writeFileSync(outFile, JSON.stringify(result))
  console.log(`Added birth areas for ${count} athletes`)
}
main().catch((e) => { console.error(e); process.exit(1) })
