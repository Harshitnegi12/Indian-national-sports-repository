// Builds lib/data/athletes-wiki.json from Wikipedia's "<sport> players from <state>" categories.
// Covers every era (1947 to today). Only real pages in those categories are used; nothing is invented.
// Per state and sport it keeps up to PER_SPORT athletes, preferring the most detailed articles.
// Summaries are the first sentence of each Wikipedia article (CC BY-SA 4.0, attributed on every profile).
// Usage: node scripts/import-wikipedia-athletes.js
const fs = require("fs")
const path = require("path")

const PER_SPORT = Number(process.env.PER_SPORT || Infinity)
const API = "https://en.wikipedia.org/w/api.php"
const UA = { "User-Agent": "IndianSportsRepository-importer/1.0 (local dev script)" }

const REGIONS = {
  "andhra-pradesh": ["Andhra Pradesh"], "arunachal-pradesh": ["Arunachal Pradesh"], assam: ["Assam"], bihar: ["Bihar"],
  chhattisgarh: ["Chhattisgarh"], goa: ["Goa"], gujarat: ["Gujarat"], haryana: ["Haryana"], "himachal-pradesh": ["Himachal Pradesh"],
  jharkhand: ["Jharkhand"], karnataka: ["Karnataka"], kerala: ["Kerala"], "madhya-pradesh": ["Madhya Pradesh"], maharashtra: ["Maharashtra"],
  manipur: ["Manipur"], meghalaya: ["Meghalaya"], mizoram: ["Mizoram"], nagaland: ["Nagaland"], odisha: ["Odisha"],
  punjab: ["Punjab, India"], rajasthan: ["Rajasthan"], sikkim: ["Sikkim"], "tamil-nadu": ["Tamil Nadu"], telangana: ["Telangana"],
  tripura: ["Tripura"], "uttar-pradesh": ["Uttar Pradesh"], uttarakhand: ["Uttarakhand"], "west-bengal": ["West Bengal"],
  "andaman-nicobar": ["Andaman and Nicobar Islands"], chandigarh: ["Chandigarh"],
  "dadra-nagar-haveli-daman-diu": ["Dadra and Nagar Haveli and Daman and Diu", "Dadra and Nagar Haveli", "Daman and Diu"],
  "delhi-nct": ["Delhi"], "jammu-kashmir": ["Jammu and Kashmir"], ladakh: ["Ladakh"], lakshadweep: ["Lakshadweep"], puducherry: ["Puducherry"],
}

// Category name pattern -> [our sport category, keyword the article description must contain]
const SPORTS = [
  [/^Category:(Indian )?(women |female |male )?cricketers from/i, "Cricket", /cricket/i],
  [/^Category:(Indian )?(women |female |male )?field hockey players from/i, "Hockey", /hockey/i],
  [/^Category:(Indian )?(women |female |male )?(association )?footballers from/i, "Football", /football|soccer/i],
  [/^Category:(Indian )?(women |female |male )?(athletes \(track and field\)|track and field athletes) from/i, "Athletics", /athlet|runner|sprinter|thrower|jumper|walker|hurdler|heptathlete|decathlete|middle-distance|long-distance|marathon|track and field/i],
  [/^Category:(Indian )?(women |female |male )?boxers from/i, "Boxing", /boxer/i],
  [/^Category:(Indian )?(women |female |male )?(sport )?wrestlers from/i, "Wrestling", /wrestl/i],
  [/^Category:(Indian )?(women |female |male )?sport shooters from/i, "Shooting", /shoot/i],
  [/^Category:(Indian )?(women |female |male )?badminton players from/i, "Badminton", /badminton/i],
  [/^Category:(Indian )?(women |female |male )?table tennis players from/i, "Table tennis", /table tennis/i],
  [/^Category:(Indian )?(women |female |male )?tennis players from/i, "Tennis", /tennis/i],
  [/^Category:(Indian )?(women |female |male )?chess players from/i, "Chess", /chess/i],
  [/^Category:(Indian )?(women |female |male )?archers from/i, "Archery", /archer/i],
  [/^Category:(Indian )?(women |female |male )?weightlifters from/i, "Weightlifting", /weightlift/i],
  [/^Category:(Indian )?(women |female |male )?swimmers from/i, "Swimming", /swim/i],
  [/^Category:(Indian )?(women |female |male )?kabaddi players from/i, "Kabaddi", /kabaddi/i],
  [/^Category:(Indian )?(women |female |male )?volleyball players from/i, "Volleyball", /volleyball/i],
  [/^Category:(Indian )?(women |female |male )?basketball players from/i, "Basketball", /basketball/i],
  [/^Category:(Indian )?(women |female |male )?squash players from/i, "Squash", /squash/i],
  [/^Category:(Indian )?(women |female |male )?(artistic )?gymnasts from/i, "Gymnastics", /gymnast/i],
  [/^Category:(Indian )?(women |female |male )?judoka from/i, "Judo", /judo/i],
]
const EXCLUDE_DESC = /\b(umpire|referee|coach|administrator|commentator|journalist|selector|executive|official|broadcaster)\b/i

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function api(params) {
  const url = API + "?" + new URLSearchParams({ format: "json", formatversion: "2", maxlag: "5", ...params })
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      const res = await fetch(url, { headers: UA })
      if (res.ok) {
        const data = await res.json()
        if (!data.error) { await sleep(Number(process.env.PAUSE_MS || 150)); return data }
        if (data.error.code !== "maxlag") throw new Error(data.error.info)
      }
    } catch (e) { if (attempt === 9) throw e }
    await sleep(8000 * (attempt + 1))
  }
  throw new Error("API failed: " + url)
}

async function categoryMembers(title, type) {
  try { return await categoryMembersStrict(title, type) } catch (e) { console.error("skipped " + title + ": " + e.message); return [] }
}
async function categoryMembersStrict(title, type) {
  const out = []
  let cont = {}
  do {
    const data = await api({ action: "query", list: "categorymembers", cmtitle: title, cmtype: type, cmlimit: "500", ...cont })
    out.push(...data.query.categorymembers.map((m) => m.title))
    cont = data.continue || null
  } while (cont)
  return out
}

function sportOf(cat) {
  for (const [re, sport, kw] of SPORTS) if (re.test(cat)) return { sport, kw }
  return null
}

// One request per category returns its sub-categories AND its pages with descriptions and sizes.
async function categoryContents(title) {
  const pages = [], subcats = []
  let cont = {}
  do {
    let data
    try {
      data = await api({ action: "query", generator: "categorymembers", gcmtitle: title, gcmtype: "page|subcat", gcmlimit: "500", prop: "description|info|pageprops", ppprop: "disambiguation", ...cont })
    } catch (e) { console.error("skipped " + title); break }
    for (const p of data.query?.pages || []) (p.ns === 14 ? subcats : pages).push(p)
    cont = data.continue || null
  } while (cont)
  return { pages, subcats }
}

async function collectRegion(regionId, names) {
  const sportCats = new Map()
  const queue = names.map((n) => "Category:Sportspeople from " + n)
  const visitedGeneric = new Set()
  // Walk "Sportspeople from <state>" and its district folders to find sport categories
  while (queue.length) {
    const cat = queue.shift()
    if (visitedGeneric.has(cat)) continue
    visitedGeneric.add(cat)
    const { subcats } = await categoryContents(cat)
    for (const sub of subcats) {
      const s = sportOf(sub.title)
      if (s) sportCats.set(sub.title, s)
      else if (/^Category:Sportspeople from /.test(sub.title) && visitedGeneric.size < 80) queue.push(sub.title)
    }
  }
  const candidates = new Map()
  const seenCats = new Set()
  const sportQueue = [...sportCats]
  while (sportQueue.length) {
    const [cat, s] = sportQueue.shift()
    if (seenCats.has(cat)) continue
    seenCats.add(cat)
    const { pages, subcats } = await categoryContents(cat)
    for (const sub of subcats) if (sportOf(sub.title) && !seenCats.has(sub.title)) sportQueue.push([sub.title, s])
    for (const p of pages) if (!candidates.has(p.title)) candidates.set(p.title, { ...s, page: p })
  }
  return candidates
}
async function buildRecords(regionId, candidates) {
  for (const [title, c] of [...candidates]) {
    const p = c.page, desc = p?.description || ""
    if (!p || p.pageprops?.disambiguation !== undefined || !c.kw.test(desc) || (EXCLUDE_DESC.test(desc) && !/player|athlete|cricketer|footballer|boxer|wrestler|shooter/i.test(desc))) candidates.delete(title)
  }
  const titles = [...candidates.keys()]
  const info = new Map()
  for (let i = 0; i < titles.length; i += 20) {
    const chunk = titles.slice(i, i + 20)
    const data = await api({ action: "query", prop: "description|info|extracts|pageprops", ppprop: "disambiguation", exintro: "1", explaintext: "1", exsentences: "2", exlimit: "20", redirects: "1", titles: chunk.join("|") })
    for (const p of data.query.pages) if (!p.missing) info.set(p.title, p)
  }
  const groups = new Map()
  for (const [title, c] of candidates) {
    const p = info.get(title)
    if (!p || p.pageprops?.disambiguation !== undefined) continue
    const desc = p.description || ""
    if (!c.kw.test(desc) || (EXCLUDE_DESC.test(desc) && !/player|athlete|cricketer|footballer|boxer|wrestler|shooter/i.test(desc))) continue
    if (!/India/i.test(desc + " " + (p.extract || ""))) continue
    if (!groups.has(c.sport)) groups.set(c.sport, [])
    groups.get(c.sport).push({ title, c, p })
  }
  const records = []
  for (const [, list] of groups) {
    list.sort((a, b) => (b.p.length || 0) - (a.p.length || 0))
    for (const { title, c, p } of list.slice(0, PER_SPORT)) {
      const extract = (p.extract || "").replace(/\s*\([^()]*\)\s*/, " ").replace(/\s+/g, " ").trim()
      const sentences = extract.match(/[^.!?]+[.!?]+/g) || [extract]
      let tier = /represent(ed|s|ing) India|national team|Asian Games|Commonwealth Games|World Cup|World Championships|Asian Championships|University Games|Universiade|SAFF|Olympi|international/i.test(extract) ? "international" : "national"
      if (/\b(won|winning|claimed)\b[^.]*\b(gold|silver|bronze)\b[^.]*\bParalympic/i.test(extract)) tier = "paralympic-medal"
      else if (/\b(won|winning|claimed)\b[^.]*\b(gold|silver|bronze)\b[^.]*\b(Summer |Winter )?Olympic/i.test(extract) && !/Youth Olympic/i.test(extract)) tier = "olympic-medal"
      const desc = p.description || ""
      records.push({
        name: title.replace(/\s*\(.*\)$/, ""),
        regionId,
        sport: c.sport,
        summary: (sentences[0] || desc).trim().slice(0, 300),
        highlights: [sentences[1] ? sentences[1].trim().slice(0, 240) : desc.charAt(0).toUpperCase() + desc.slice(1) + "."],
        wiki: title.replace(/ /g, "_"),
        tier,
      })
    }
  }
  return records.sort((a, b) => a.sport.localeCompare(b.sport) || a.name.localeCompare(b.name))
}

/** Combines every finished region file into lib/data/athletes-wiki.json, so finished states go live right away. */
function mergeRegionFiles(dir) {
  const seen = new Set()
  const all = []
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
    for (const r of JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"))) if (!seen.has(r.wiki)) { seen.add(r.wiki); all.push(r) }
  }
  const out = path.join(__dirname, "..", "lib", "data", "athletes-wiki.json")
  fs.writeFileSync(out, JSON.stringify(all))
  return all.length
}

async function main() {
  const dir = process.env.REGION_DIR || path.join(__dirname, "..", ".wiki-import")
  fs.mkdirSync(dir, { recursive: true })
  if (process.env.MERGE_ONLY) return console.log("merged", mergeRegionFiles(dir))
  const only = process.env.ONLY ? process.env.ONLY.split(",") : null
  for (const [regionId, names] of Object.entries(REGIONS).filter(([id]) => !only || only.includes(id))) {
    const file = path.join(dir, regionId + ".json")
    if (fs.existsSync(file)) { console.log(`${regionId}: already done`); continue }
    const candidates = await collectRegion(regionId, names)
    const records = await buildRecords(regionId, candidates)
    fs.writeFileSync(file, JSON.stringify(records))
    console.log(`${regionId}: ${candidates.size} pages -> ${records.length} athletes`)
  }
}
main().catch((e) => { console.error(e); process.exit(1) })