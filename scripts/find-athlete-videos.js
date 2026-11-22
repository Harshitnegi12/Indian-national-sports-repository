// Builds lib/data/athlete-videos.json: up to 2 YouTube videos per top athlete, from official channels only.
// For each athlete it reads YouTube's public search results page, keeps videos whose channel is on the
// allow-list below, and double-checks the uploader with YouTube's oEmbed endpoint. No API key is used.
// Usage: node scripts/find-athlete-videos.js
const fs = require("fs")
const path = require("path")

const root = path.join(__dirname, "..")
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const slugify = (name) => name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

const OFFICIAL = [
  "Olympics", "Paralympic Games", "ICC", "BCCI", "Hockey India", "FIH Hockey", "Watch.Hockey", "BWF TV", "World Athletics",
  "World Archery", "ISSF", "United World Wrestling", "World Boxing", "Pro Kabaddi", "Star Sports", "Sony Sports Network",
  "JioCinema", "JioHotstar", "DD Sports", "Doordarshan Sports", "Khelo India", "SAI Media", "World Table Tennis", "ITTF World",
  "FIDE chess", "Indian Super League", "Indian Football Team", "Commonwealth Sport", "Team India", "Olympic Khel", "IWF",
  "International Weightlifting Federation", "Tennis Channel", "Australian Open TV", "Wimbledon", "Asian Games", "PSA SQUASHTV",
]
const isOfficial = (channel) => OFFICIAL.some((o) => channel.toLowerCase() === o.toLowerCase())

function topAthletes() {
  const read = (f) => fs.readFileSync(path.join(root, f), "utf8")
  const list = new Map()
  for (const m of read("lib/athlete-data.ts").matchAll(/id: "([^"]+)", name: "([^"]+)", regionId: "[^"]+",\s*sport: "([^"]+)"/g)) list.set(m[1], { name: m[2], sport: m[3] })
  for (const m of read("lib/data/haryana.ts").matchAll(/id: "([^"]+)", name: "([^"]+)", sport: "([^"]+)"[^\n]*tier: "(olympic-medal|paralympic-medal|world-champion)"/g)) list.set(m[1], { name: m[2], sport: m[3] })
  for (const f of fs.readdirSync(path.join(root, "lib/data")).filter((f) => /^athletes-batch-\d+\.ts$/.test(f))) {
    for (const m of read("lib/data/" + f).matchAll(/\["([^"]+)", "[a-z-]+", "([^"]+)", "[^"]*", "[^"]+", "([OPW])"/g)) list.set(slugify(m[1]), { name: m[1], sport: m[2] })
  }
  return [...list]
}

function parseResults(html) {
  const match = html.match(/var ytInitialData = (\{.*?\});<\/script>/s)
  if (!match) return []
  const data = JSON.parse(match[1])
  const out = []
  const walk = (node) => {
    if (!node || typeof node !== "object") return
    if (node.videoRenderer) {
      const v = node.videoRenderer
      out.push({ id: v.videoId, title: v.title?.runs?.map((r) => r.text).join("") || "", channel: v.ownerText?.runs?.[0]?.text || "" })
      return
    }
    for (const value of Object.values(node)) walk(value)
  }
  walk(data)
  return out
}

async function main() {
  const athletes = topAthletes()
  console.log("athletes to search:", athletes.length)
  const result = {}
  for (const [id, { name, sport }] of athletes) {
    const q = `${name} ${sport.split("·")[0].trim()} highlights`
    try {
      const res = await fetch("https://www.youtube.com/results?hl=en&gl=IN&search_query=" + encodeURIComponent(q), { headers: { "User-Agent": "Mozilla/5.0", "Accept-Language": "en" } })
      const html = await res.text()
      const surname = name.split(" ").pop().toLowerCase()
      const candidates = parseResults(html).filter((v) => isOfficial(v.channel) && v.title.toLowerCase().includes(surname)).slice(0, 4)
      const verified = []
      for (const v of candidates) {
        const o = await fetch("https://www.youtube.com/oembed?format=json&url=" + encodeURIComponent("https://www.youtube.com/watch?v=" + v.id))
        if (!o.ok) continue
        const meta = await o.json()
        if (isOfficial(meta.author_name)) verified.push({ id: v.id, title: meta.title, channel: meta.author_name })
        if (verified.length === 2) break
      }
      if (verified.length) result[id] = verified
      console.log(`${name}: ${verified.length}`)
    } catch (e) {
      console.log(`${name}: error ${e.message}`)
    }
    await sleep(1200)
  }
  fs.writeFileSync(path.join(root, "lib", "data", "athlete-videos.json"), JSON.stringify(result, null, 1))
  console.log("athletes with videos:", Object.keys(result).length)
}
main()
