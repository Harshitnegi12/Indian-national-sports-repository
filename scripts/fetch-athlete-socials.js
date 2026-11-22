// Writes two files from Wikidata for every athlete with a Wikidata item:
// - lib/data/athlete-socials.json: official accounts (Instagram P2003, X P2002, Facebook P2013, YouTube channel P2397)
// - lib/data/athlete-honours.json: awards received (P166, with year), employers (P108) and military rank (P410)
// Wikidata ties each value to that exact person, so nothing is guessed.
// Usage: node scripts/fetch-athlete-socials.js
const fs = require("fs")
const path = require("path")

const root = path.join(__dirname, "..")
const UA = { "User-Agent": "IndianSportsRepository-importer/1.0 (local dev script)" }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const profiles = JSON.parse(fs.readFileSync(path.join(root, "lib/data/athlete-profiles.json"), "utf8"))

async function wd(params) {
  for (let attempt = 0; attempt < 8; attempt++) {
    try {
      const res = await fetch("https://www.wikidata.org/w/api.php?" + new URLSearchParams({ format: "json", ...params }), { headers: UA })
      if (res.ok) { await sleep(150); return await res.json() }
    } catch {}
    await sleep(4000 * (attempt + 1))
  }
  return null
}

const live = (e, p) => (e?.claims?.[p] || []).filter((c) => c.rank !== "deprecated")
const first = (e, p) => live(e, p)[0]?.mainsnak?.datavalue?.value
const year = (c, p) => c.qualifiers?.[p]?.[0]?.datavalue?.value?.time?.slice(1, 5)

async function main() {
  const entries = Object.entries(profiles).filter(([, p]) => p.qid)
  console.log("athletes with Wikidata items:", entries.length)
  const socials = {}
  const raw = {}
  const labelIds = new Set()
  for (let i = 0; i < entries.length; i += 50) {
    const chunk = entries.slice(i, i + 50)
    const data = await wd({ action: "wbgetentities", ids: chunk.map(([, p]) => p.qid).join("|"), props: "claims" })
    for (const [id, p] of chunk) {
      const e = data?.entities?.[p.qid]
      if (!e) continue
      const s = {}
      const ig = first(e, "P2003"), x = first(e, "P2002"), fb = first(e, "P2013"), yt = first(e, "P2397")
      if (ig) s.instagram = ig
      if (x) s.x = x
      if (fb) s.facebook = fb
      if (yt) s.youtube = yt
      if (Object.keys(s).length) socials[id] = s
      const awards = live(e, "P166").map((c) => ({ q: c.mainsnak?.datavalue?.value?.id, year: year(c, "P585") })).filter((a) => a.q)
      const employers = live(e, "P108").map((c) => ({ q: c.mainsnak?.datavalue?.value?.id, from: year(c, "P580") })).filter((a) => a.q)
      const rank = live(e, "P410").map((c) => c.mainsnak?.datavalue?.value?.id).filter(Boolean)
      if (awards.length || employers.length || rank.length) {
        raw[id] = { awards, employers, rank }
        for (const a of [...awards, ...employers]) labelIds.add(a.q)
        rank.forEach((q) => labelIds.add(q))
      }
    }
    if (i % 1000 === 0) console.log(`${i}/${entries.length}`)
  }

  // English labels for every award, employer and rank
  const ids = [...labelIds]
  const labels = {}
  for (let i = 0; i < ids.length; i += 50) {
    const data = await wd({ action: "wbgetentities", ids: ids.slice(i, i + 50).join("|"), props: "labels", languages: "en" })
    for (const [q, e] of Object.entries(data?.entities || {})) if (e.labels?.en) labels[q] = e.labels.en.value
  }
  const honours = {}
  for (const [id, r] of Object.entries(raw)) {
    const awards = r.awards.map((a) => ({ name: labels[a.q], year: a.year })).filter((a) => a.name)
    const seen = new Set()
    const uniqueAwards = awards.filter((a) => { const k = a.name + a.year; return seen.has(k) ? false : (seen.add(k), true) }).sort((a, b) => (a.year || "9999").localeCompare(b.year || "9999"))
    const employers = r.employers.map((e) => ({ name: labels[e.q], from: e.from })).filter((e) => e.name)
    const rank = r.rank.map((q) => labels[q]).filter(Boolean)
    const h = {}
    if (uniqueAwards.length) h.awards = uniqueAwards
    if (employers.length) h.employers = employers
    if (rank.length) h.rank = rank
    if (Object.keys(h).length) honours[id] = h
  }

  fs.writeFileSync(path.join(root, "lib/data/athlete-socials.json"), JSON.stringify(socials))
  fs.writeFileSync(path.join(root, "lib/data/athlete-honours.json"), JSON.stringify(honours))
  const n = (k) => Object.values(socials).filter((s) => s[k]).length
  const h = (k) => Object.values(honours).filter((x) => x[k]).length
  console.log(`Socials for ${Object.keys(socials).length}: Instagram ${n("instagram")}, X ${n("x")}, Facebook ${n("facebook")}, YouTube ${n("youtube")}`)
  console.log(`Honours: awards ${h("awards")}, employers ${h("employers")}, rank ${h("rank")}`)
}
main()
