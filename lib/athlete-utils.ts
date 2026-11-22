// Client-safe helpers (no athlete data), so client components stay small.
import type { AthleteRecord, AthleteTier } from "@/lib/athlete-data"
import { INDIA_REGIONS } from "@/lib/india-sports-data"

export const TIER_LABEL: Record<AthleteTier, string> = {
  "olympic-medal": "Olympic medallist",
  "paralympic-medal": "Paralympic medallist",
  "world-champion": "World champion",
  international: "International",
  national: "National",
}

const TIER_RANK: Record<AthleteTier, number> = {
  "olympic-medal": 0,
  "paralympic-medal": 1,
  "world-champion": 2,
  international: 3,
  national: 4,
}

export function compareAthletes(a: AthleteRecord, b: AthleteRecord) {
  const ra = a.tier ? TIER_RANK[a.tier] : 9
  const rb = b.tier ? TIER_RANK[b.tier] : 9
  return ra - rb || a.name.localeCompare(b.name)
}

export function isMedallist(athlete: AthleteRecord) {
  return athlete.tier === "olympic-medal" || athlete.tier === "paralympic-medal"
}

export function getRegionName(regionId: string) {
  return INDIA_REGIONS.find((region) => region.id === regionId)?.name ?? regionId
}

export function getSportCategory(athlete: AthleteRecord | string) {
  const label = typeof athlete === "string" ? athlete : athlete.sport
  return label.split("·")[0].trim()
}

export function getSportSlug(sport: string) {
  return getSportCategory(sport).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export const SPORT_CATEGORIES = [
  "Alpine skiing", "Archery", "Athletics", "Badminton", "Basketball", "Boxing", "Cricket",
  "Football", "Hockey", "Ice hockey", "Kabaddi", "Shooting", "Sepaktakraw", "Squash", "Swimming", "Table tennis",
  "Tennis", "Volleyball", "Weightlifting", "Wrestling", "Gymnastics", "Para athletics",
  "Para badminton", "Para shooting", "Para table tennis", "Para archery", "Chess", "Judo", "Para judo",
]

/** Sport names in Devanagari. */
export const SPORT_HINDI: Record<string, string> = {
  "Alpine skiing": "अल्पाइन स्कीइंग", Archery: "तीरंदाज़ी", Athletics: "एथलेटिक्स", Badminton: "बैडमिंटन",
  Basketball: "बास्केटबॉल", Boxing: "मुक्केबाज़ी", Cricket: "क्रिकेट", Football: "फुटबॉल", Hockey: "हॉकी",
  "Ice hockey": "आइस हॉकी", Kabaddi: "कबड्डी", Shooting: "निशानेबाज़ी", Sepaktakraw: "सेपक टकरॉ", Squash: "स्क्वैश",
  Swimming: "तैराकी", "Table tennis": "टेबल टेनिस", Tennis: "टेनिस", Volleyball: "वॉलीबॉल", Weightlifting: "भारोत्तोलन",
  Wrestling: "कुश्ती", Gymnastics: "जिम्नास्टिक्स", "Para athletics": "पैरा एथलेटिक्स", "Para badminton": "पैरा बैडमिंटन",
  "Para shooting": "पैरा निशानेबाज़ी", "Para table tennis": "पैरा टेबल टेनिस", "Para archery": "पैरा तीरंदाज़ी", Chess: "शतरंज", Judo: "जूडो", "Para judo": "पैरा जूडो",
}

export function getSportEvent(athlete: AthleteRecord) {
  return athlete.sport.split("·")[1]?.trim() ?? ""
}

/** Sports that have at least one athlete, with counts, most athletes first. */
export function getSportCounts(athletes: AthleteRecord[]) {
  const counts = new Map<string, number>()
  for (const athlete of athletes) {
    const category = getSportCategory(athlete)
    counts.set(category, (counts.get(category) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([sport, count]) => ({ sport, slug: getSportSlug(sport), count }))
    .sort((a, b) => b.count - a.count || a.sport.localeCompare(b.sport))
}

export function getInitials(name: string) {
  const parts = name.replace(/\./g, " ").trim().split(/\s+/)
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase()
}
