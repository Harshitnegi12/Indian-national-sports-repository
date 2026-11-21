import indiaMap from "@svg-maps/india"

// Map shapes: @svg-maps/india by Victor Cazanave, CC BY 4.0 (https://github.com/VictorCazanave/svg-maps).
// The source predates 2019, so two changes are made here:
//  - Jammu and Kashmir is split into the J&K and Ladakh union territories with an approximate clip line.
//  - Dadra and Nagar Haveli and Daman and Diu (two shapes in the source) both map to the merged UT.
// Boundaries are simplified and indicative only.

const SOURCE_TO_REGION: Record<string, string> = {
  an: "andaman-nicobar", ap: "andhra-pradesh", ar: "arunachal-pradesh", as: "assam", br: "bihar",
  ch: "chandigarh", ct: "chhattisgarh", dn: "dadra-nagar-haveli-daman-diu", dd: "dadra-nagar-haveli-daman-diu",
  dl: "delhi-nct", ga: "goa", gj: "gujarat", hr: "haryana", hp: "himachal-pradesh", jk: "jammu-kashmir",
  jh: "jharkhand", ka: "karnataka", kl: "kerala", ld: "lakshadweep", mp: "madhya-pradesh", mh: "maharashtra",
  mn: "manipur", ml: "meghalaya", mz: "mizoram", nl: "nagaland", or: "odisha", py: "puducherry", pb: "punjab",
  rj: "rajasthan", sk: "sikkim", tn: "tamil-nadu", tg: "telangana", tr: "tripura", up: "uttar-pradesh",
  ut: "uttarakhand", wb: "west-bengal",
}

export interface MapShape {
  key: string
  regionId: string
  path: string
  clip?: "jk" | "ladakh"
}

export const MAP_VIEWBOX = indiaMap.viewBox

/** Approximate J&K / Ladakh dividing line, in map coordinates. */
const SPLIT_LINE = "112,37 139,48 163,61 178,82 182,109 187,130"
export const CLIP_POLYGONS = {
  jk: `80,37 ${SPLIT_LINE} 80,130`,
  ladakh: `80,0 260,0 260,130 ${SPLIT_LINE.split(" ").reverse().join(" ")} 80,37`,
}

export const MAP_SHAPES: MapShape[] = indiaMap.locations.flatMap((location) => {
  if (location.id === "jk") {
    return [
      { key: "jk", regionId: "jammu-kashmir", path: location.path, clip: "jk" as const },
      { key: "la", regionId: "ladakh", path: location.path, clip: "ladakh" as const },
    ]
  }
  const regionId = SOURCE_TO_REGION[location.id]
  return regionId ? [{ key: location.id, regionId, path: location.path }] : []
})

/** Regions too small to hover on the map get a dot marker (map coordinates). */
export const MAP_MARKERS: { regionId: string; x: number; y: number }[] = [
  { regionId: "chandigarh", x: 179.5, y: 159.5 },
  { regionId: "delhi-nct", x: 186.5, y: 210.5 },
  { regionId: "dadra-nagar-haveli-daman-diu", x: 102, y: 405 },
  { regionId: "puducherry", x: 262, y: 590 },
  { regionId: "lakshadweep", x: 99, y: 627 },
]
