import { INDIA_REGIONS, type RegionData } from "@/lib/india-sports-data"
import { getRegionStory, type RegionMotif } from "@/lib/region-stories"

/** Region names in Devanagari, shown alongside the English name. */
export const REGION_HINDI: Record<string, string> = {
  "andhra-pradesh": "आंध्र प्रदेश",
  "arunachal-pradesh": "अरुणाचल प्रदेश",
  assam: "असम",
  bihar: "बिहार",
  chhattisgarh: "छत्तीसगढ़",
  goa: "गोवा",
  gujarat: "गुजरात",
  haryana: "हरियाणा",
  "himachal-pradesh": "हिमाचल प्रदेश",
  jharkhand: "झारखंड",
  karnataka: "कर्नाटक",
  kerala: "केरल",
  "madhya-pradesh": "मध्य प्रदेश",
  maharashtra: "महाराष्ट्र",
  manipur: "मणिपुर",
  meghalaya: "मेघालय",
  mizoram: "मिज़ोरम",
  nagaland: "नागालैंड",
  odisha: "ओडिशा",
  punjab: "पंजाब",
  rajasthan: "राजस्थान",
  sikkim: "सिक्किम",
  "tamil-nadu": "तमिलनाडु",
  telangana: "तेलंगाना",
  tripura: "त्रिपुरा",
  "uttar-pradesh": "उत्तर प्रदेश",
  uttarakhand: "उत्तराखंड",
  "west-bengal": "पश्चिम बंगाल",
  "andaman-nicobar": "अंडमान और निकोबार",
  chandigarh: "चंडीगढ़",
  "dadra-nagar-haveli-daman-diu": "दादरा नगर हवेली और दमन दीव",
  "delhi-nct": "दिल्ली",
  "jammu-kashmir": "जम्मू और कश्मीर",
  ladakh: "लद्दाख",
  lakshadweep: "लक्षद्वीप",
  puducherry: "पुडुचेरी",
}

/** One accent colour per landscape motif. Each passes contrast on white and on the dark hero. */
const MOTIF_ACCENT: Record<RegionMotif, string> = {
  fields: "#C2410C",
  phulkari: "#BE185D",
  mountains: "#0E7490",
  desert: "#B45309",
  coast: "#0F766E",
  river: "#0369A1",
  forest: "#15803D",
  plateau: "#A16207",
  city: "#6D28D9",
  islands: "#0D9488",
  valley: "#1D4ED8",
  heritage: "#9A3412",
}

export interface RegionMeta {
  region: RegionData
  hindi: string
  accent: string
  shortCode: string
  story: ReturnType<typeof getRegionStory>
}

export function getRegion(id: string) {
  return INDIA_REGIONS.find((region) => region.id === id)
}

export function getRegionMeta(region: RegionData): RegionMeta {
  const story = getRegionStory(region.id)
  return {
    region,
    hindi: REGION_HINDI[region.id] ?? region.name,
    accent: MOTIF_ACCENT[story.motif] ?? MOTIF_ACCENT.plateau,
    shortCode: region.code.replace("IN-", ""),
    story,
  }
}

/** Regions sorted A to Z, used by the state switcher and previous/next links. */
export const REGIONS_SORTED = [...INDIA_REGIONS].sort((a, b) => a.name.localeCompare(b.name))

export function getAdjacentRegions(id: string) {
  const index = REGIONS_SORTED.findIndex((region) => region.id === id)
  const n = REGIONS_SORTED.length
  return {
    previous: REGIONS_SORTED[(index - 1 + n) % n],
    next: REGIONS_SORTED[(index + 1) % n],
  }
}

export function getSameZoneRegions(id: string) {
  const region = getRegion(id)
  if (!region) return []
  return REGIONS_SORTED.filter((item) => item.zone === region.zone && item.id !== id)
}
