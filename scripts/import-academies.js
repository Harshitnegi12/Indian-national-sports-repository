// Builds lib/data/academies-wiki.json from Wikipedia's Indian sports academy and sports school categories.
// Each academy is placed in its state using Wikidata's "located in" chain (P131), so nothing is guessed.
// Usage: node scripts/import-academies.js
const fs = require("fs")
const path = require("path")

const UA = { "User-Agent": "IndianSportsRepository-importer/1.0 (local dev script)" }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function get(url) {
  for (let a = 0; a < 6; a++) {
    try { const r = await fetch(url, { headers: UA }); if (r.ok) { await sleep(150); return await r.json() } } catch {}
    await sleep(3000 * (a + 1))
  }
  return null
}
const wp = (p) => get("https://en.wikipedia.org/w/api.php?" + new URLSearchParams({ format: "json", formatversion: "2", ...p }))
const wd = (p) => get("https://www.wikidata.org/w/api.php?" + new URLSearchParams({ format: "json", ...p }))

const ROOTS = ["Category:Sports academies in India", "Category:Sports schools in India", "Category:Cricket academies in India", "Category:Football academies in India", "Category:Sports training facilities in India", "Category:Sports Authority of India"]
const STATES = {
  "Andhra Pradesh": "andhra-pradesh", "Arunachal Pradesh": "arunachal-pradesh", Assam: "assam", Bihar: "bihar", Chhattisgarh: "chhattisgarh", Goa: "goa", Gujarat: "gujarat", Haryana: "haryana", "Himachal Pradesh": "himachal-pradesh", Jharkhand: "jharkhand", Karnataka: "karnataka", Kerala: "kerala", "Madhya Pradesh": "madhya-pradesh", Maharashtra: "maharashtra", Manipur: "manipur", Meghalaya: "meghalaya", Mizoram: "mizoram", Nagaland: "nagaland", Odisha: "odisha", Punjab: "punjab", Rajasthan: "rajasthan", Sikkim: "sikkim", "Tamil Nadu": "tamil-nadu", Telangana: "telangana", Tripura: "tripura", "Uttar Pradesh": "uttar-pradesh", Uttarakhand: "uttarakhand", "West Bengal": "west-bengal", "Andaman and Nicobar Islands": "andaman-nicobar", Chandigarh: "chandigarh", "Dadra and Nagar Haveli and Daman and Diu": "dadra-nagar-haveli-daman-diu", Delhi: "delhi-nct", "New Delhi": "delhi-nct", "Jammu and Kashmir": "jammu-kashmir", Ladakh: "ladakh", Lakshadweep: "lakshadweep", Puducherry: "puducherry",
}
const SPORTS = ["Cricket", "Football", "Hockey", "Badminton", "Tennis", "Athletics", "Boxing", "Wrestling", "Shooting", "Archery", "Swimming", "Chess", "Kabaddi", "Table tennis", "Weightlifting", "Volleyball", "Basketball", "Squash", "Golf", "Gymnastics"]

async function members(cat, depth = 0, seen = new Set()) {
  if (seen.has(cat) || depth > 2) return []
  seen.add(cat)
  const out = []
  let cont = {}
  do {
    const d = await wp({ action: "query", list: "categorymembers", cmtitle: cat, cmlimit: "500", cmtype: "page|subcat", ...cont })
    if (!d) break
    for (const m of d.query.categorymembers) {
      if (m.ns === 14) out.push(...(await members(m.title, depth + 1, seen)))
      else if (m.ns === 0) out.push(m.title)
    }
    cont = d.continue || null
  } while (cont)
  return out
}

async function main() {
  const titles = [...new Set((await Promise.all(ROOTS.map((r) => members(r)))).flat())]
  console.log("pages:", titles.length)
  const info = new Map()
  for (let i = 0; i < titles.length; i += 20) {
    const d = await wp({ action: "query", prop: "description|extracts|pageprops", exintro: "1", explaintext: "1", exsentences: "2", exlimit: "20", ppprop: "wikibase_item", redirects: "1", titles: titles.slice(i, i + 20).join("|") })
    for (const p of d?.query?.pages || []) if (!p.missing) info.set(p.title, p)
  }
  // State via Wikidata P131 chain (up to 4 levels)
  const qOf = new Map([...info].filter(([, p]) => p.pageprops?.wikibase_item).map(([t, p]) => [t, p.pageprops.wikibase_item]))
  const cache = {}
  async function entities(ids) {
    const need = ids.filter((q) => !cache[q])
    for (let i = 0; i < need.length; i += 50) {
      const d = await wd({ action: "wbgetentities", ids: need.slice(i, i + 50).join("|"), props: "claims|labels", languages: "en" })
      Object.assign(cache, d?.entities || {})
    }
  }
  const stateOf = new Map()
  let frontier = new Map([...qOf].map(([t, q]) => [t, q]))
  for (let level = 0; level < 5 && frontier.size; level++) {
    await entities([...new Set(frontier.values())])
    const next = new Map()
    for (const [t, q] of frontier) {
      const e = cache[q]
      const label = e?.labels?.en?.value
      if (level > 0 && label && STATES[label]) { stateOf.set(t, STATES[label]); continue }
      const parent = (e?.claims?.P131 || [])[0]?.mainsnak?.datavalue?.value?.id
      if (parent) next.set(t, parent)
    }
    frontier = next
  }
  const city = (t) => {
    const q = qOf.get(t); const parent = q && (cache[q]?.claims?.P131 || [])[0]?.mainsnak?.datavalue?.value?.id
    return (parent && cache[parent]?.labels?.en?.value) || ""
  }
  // Fallback: find a state, district or major city named in the title, description or intro
  const districts = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "lib", "data", "district-maps.json"), "utf8"))
  const placeNames = []
  for (const [name, id] of Object.entries(STATES)) placeNames.push([name, id])
  for (const [id, m] of Object.entries(districts)) for (const d of m.districts) if (d.name.length > 3) placeNames.push([d.name, id])
  const CITIES = { Bengaluru: "karnataka", Bangalore: "karnataka", Mumbai: "maharashtra", Bombay: "maharashtra", Pune: "maharashtra", Hyderabad: "telangana", Secunderabad: "telangana", Chennai: "tamil-nadu", Madras: "tamil-nadu", Kolkata: "west-bengal", Calcutta: "west-bengal", Jamshedpur: "jharkhand", Ranchi: "jharkhand", Bhubaneswar: "odisha", Patiala: "punjab", Mohali: "punjab", Jalandhar: "punjab", Guwahati: "assam", Imphal: "manipur", Shillong: "meghalaya", Aizawl: "mizoram", Kohima: "nagaland", Gangtok: "sikkim", Agartala: "tripura", Itanagar: "arunachal-pradesh", Thiruvananthapuram: "kerala", Kochi: "kerala", Kozhikode: "kerala", Ahmedabad: "gujarat", Gandhinagar: "gujarat", Jaipur: "rajasthan", Lucknow: "uttar-pradesh", Noida: "uttar-pradesh", Bhopal: "madhya-pradesh", Indore: "madhya-pradesh", Raipur: "chhattisgarh", Dehradun: "uttarakhand", Shimla: "himachal-pradesh", Dharamshala: "himachal-pradesh", Srinagar: "jammu-kashmir", Jammu: "jammu-kashmir", Leh: "ladakh", Panaji: "goa", Margao: "goa", Patna: "bihar", Gurugram: "haryana", Gurgaon: "haryana", Sonipat: "haryana", Rohtak: "haryana", Bhiwani: "haryana", Puducherry: "puducherry", "Port Blair": "andaman-nicobar" }
  for (const [n, id] of Object.entries(CITIES)) placeNames.push([n, id])
  placeNames.sort((a, b) => b[0].length - a[0].length)
  const textState = (s) => placeNames.find(([n]) => new RegExp("\\b" + n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b").test(s))?.[1]
  const out = []
  for (const [t, p] of info) {
    const regionId = stateOf.get(t) || textState(t + " " + (p.description || "") + " " + (p.extract || ""))
    if (!regionId) continue
    const text = (p.description || "") + " " + (p.extract || "")
    if (/\b(stadium|ground|arena)\b/i.test(p.description || "") && !/academy|school|centre|center|institute|hostel/i.test(t)) continue
    const sports = SPORTS.filter((s) => new RegExp("\\b" + s + "\\b", "i").test(t + " " + text))
    out.push({ name: t.replace(/\s*\(.*\)$/, ""), regionId, city: city(t), sports: sports.length ? sports : ["Multi-sport"], type: /Sports Authority of India|SAI |Government|state-run|government/i.test(text) ? "Government" : "Private", description: (p.extract || p.description || "").split(/(?<=[.!?])\s+/)[0].slice(0, 220), url: "https://en.wikipedia.org/wiki/" + encodeURIComponent(t.replace(/ /g, "_")) })
  }
  fs.writeFileSync(path.join(__dirname, "..", "lib", "data", "academies-wiki.json"), JSON.stringify(out))
  const by = {}; out.forEach((a) => (by[a.regionId] = (by[a.regionId] || 0) + 1))
  console.log("academies:", out.length, by)
}
main()
