import type { AthleteRecord, AthleteTier } from "@/lib/athlete-data"
import rows from "@/lib/data/athletes-wiki.json"

// Athletes of every era imported from Wikipedia's "<sport> players from <state>" categories by
// scripts/import-wikipedia-athletes.js. Summary text is quoted from Wikipedia (CC BY-SA 4.0).
// Hand-written entries elsewhere take priority when the same athlete appears in both.

interface WikiRow {
  name: string
  regionId: string
  sport: string
  summary: string
  highlights: string[]
  wiki: string
  tier: AthleteTier
}

function slugify(name: string) {
  return name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export const WIKI_ATHLETES: AthleteRecord[] = (rows as WikiRow[]).map((row) => ({
  id: slugify(row.name),
  name: row.name,
  regionId: row.regionId,
  sport: row.sport,
  summary: row.summary,
  highlights: row.highlights,
  sources: [{ label: "Wikipedia biography (text CC BY-SA 4.0)", url: "https://en.wikipedia.org/wiki/" + encodeURIComponent(row.wiki).replace(/%2C/g, ",") }],
  tier: row.tier,
}))
