import profiles from "@/lib/data/athlete-profiles.json"

// Extra profile details built by scripts/enrich-athlete-profiles.js:
// photo (free licence, Wikimedia Commons), story (Wikipedia, CC BY-SA 4.0), birth date and birthplace (Wikidata, CC0).

export interface AthleteProfile {
  title: string
  description?: string
  story?: string
  born?: string
  birthplace?: string
  gender?: "female" | "male"
  image?: { src: string; width: number; height: number; file: string; credit?: string; license?: string; page?: string }
}

const PROFILES = profiles as Record<string, AthleteProfile>

const decode = (s?: string) => s?.replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/&#0?39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/[ \t]{2,}/g, " ")

export function getAthleteProfile(id: string): AthleteProfile | undefined {
  const p = PROFILES[id]
  if (!p) return undefined
  return { ...p, story: decode(p.story), image: p.image ? { ...p.image, credit: decode(p.image.credit) } : undefined }
}

export function formatBorn(born?: string) {
  if (!born) return undefined
  const [y, m, d] = born.split("-").map(Number)
  if (!m) return String(y)
  const date = new Date(Date.UTC(y, m - 1, d || 1))
  return date.toLocaleDateString("en-IN", { year: "numeric", month: "long", ...(d ? { day: "numeric" } : {}), timeZone: "UTC" })
}
