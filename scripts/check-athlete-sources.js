// Checks every row in lib/data/athletes-batch-*.ts against the Wikipedia REST API:
// the page must exist, must not be a disambiguation page, and its description should
// mention the athlete's sport or "Indian". Usage: node scripts/check-athlete-sources.js
const fs = require("fs")
const path = require("path")

const dir = path.join(__dirname, "..", "lib", "data")
const files = fs.readdirSync(dir).filter((f) => /^athletes-batch-\d+\.ts$/.test(f))
const ROW = /\["([^"]+)", "([a-z-]+)", "([^"]+)", "([^"]*)", "([^"]+)", "([OPWIN])"(?:, "([^"]+)")?\]/g

const KEYWORDS = {
  Cricket: /cricket/i, Hockey: /hockey/i, Football: /football|soccer/i, Athletics: /athlet|runner|sprinter|thrower|jumper|walker|hurdler|heptathlete|middle-distance/i,
  Shooting: /shoot/i, Wrestling: /wrestl/i, Boxing: /box/i, Badminton: /badminton/i, Tennis: /tennis/i, "Table tennis": /table tennis/i,
  Chess: /chess/i, Archery: /archer/i, Weightlifting: /weightlift/i, Swimming: /swim/i, Squash: /squash/i, Kabaddi: /kabaddi/i,
  Gymnastics: /gymnast/i, Volleyball: /volleyball/i,
}

async function main() {
  const rows = []
  for (const file of files) {
    const text = fs.readFileSync(path.join(dir, file), "utf8")
    for (const m of text.matchAll(ROW)) rows.push({ file, name: m[1], sport: m[3], slug: m[7] || m[1].replace(/ /g, "_") })
  }
  const problems = []
  // Batch up to 50 titles per request to stay well inside Wikipedia's rate limits.
  for (let i = 0; i < rows.length; i += 50) {
    const chunk = rows.slice(i, i + 50)
    const titles = chunk.map((r) => r.slug.replace(/_/g, " ")).join("|")
    const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&redirects=1&prop=description|pageprops&ppprop=disambiguation&titles=" + encodeURIComponent(titles)
    let data
    for (let attempt = 0; attempt < 6; attempt++) {
      const res = await fetch(url, { headers: { "User-Agent": "IndianSportsRepository-source-check/1.0 (local dev script)" } })
      if (res.ok) { data = await res.json(); break }
      const wait = 20000 * (attempt + 1)
      console.error(`HTTP ${res.status}, retrying in ${wait / 1000}s`)
      await new Promise((r) => setTimeout(r, wait))
    }
    if (!data) { problems.push(`Could not check rows ${i}-${i + chunk.length}`); continue }
    const norm = new Map((data.query.normalized || []).map((n) => [n.from, n.to]))
    const redir = new Map((data.query.redirects || []).map((n) => [n.from, n.to]))
    const pages = new Map(Object.values(data.query.pages).map((p) => [p.title, p]))
    for (const row of chunk) {
      let t = row.slug.replace(/_/g, " ")
      t = norm.get(t) || t
      t = redir.get(t) || t
      const page = pages.get(t)
      const category = row.sport.split("·")[0].trim().replace(/^Para /, "")
      if (!page || page.missing !== undefined) { problems.push(`MISSING  ${row.name} (${row.slug})`); continue }
      if (page.pageprops && page.pageprops.disambiguation !== undefined) { problems.push(`DISAMBIG ${row.name} (${row.slug})`); continue }
      const kw = KEYWORDS[category]
      const desc = page.description || ""
      if (kw && !kw.test(desc) && !/paralympi|olympi|athlete|sportsperson/i.test(desc)) problems.push(`CHECK    ${row.name}: "${desc}" (${row.slug})`)
    }
    await new Promise((r) => setTimeout(r, 1500))
  }
  console.log(`Checked ${rows.length} rows`)
  console.log(problems.length ? problems.join("\n") : "All sources OK")
}
main()
