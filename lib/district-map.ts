import districtMaps from "@/lib/data/district-maps.json"
import type { AthleteRecord } from "@/lib/athlete-data"

// District shapes: DataMeet Census 2011 districts (CC BY 4.0), simplified by scripts/build-district-maps.js.
// Districts created after 2011 appear inside their 2011 parent district.

export interface DistrictShape {
  name: string
  path: string
  cx: number
  cy: number
}

type DistrictMapData = Record<string, { viewBox: string; districts: DistrictShape[] }>

export function getDistrictMap(regionId: string) {
  return (districtMaps as DistrictMapData)[regionId]
}

// Present-day spellings that differ from the 2011 district names.
const ALIASES: Record<string, string[]> = {
  Gurgaon: ["Gurugram"], Mewat: ["Nuh"], Allahabad: ["Prayagraj"], Faizabad: ["Ayodhya"], "Sant Ravidas Nagar (Bhadohi)": ["Bhadohi"],
  Bangalore: ["Bengaluru"], "Bangalore Rural": ["Bengaluru Rural"], Mysore: ["Mysuru"], Belgaum: ["Belagavi"], Gulbarga: ["Kalaburagi"],
  Bellary: ["Ballari"], Shimoga: ["Shivamogga"], Tumkur: ["Tumakuru"], Bijapur: ["Vijayapura"], Kodagu: ["Coorg", "Madikeri", "Somwarpet"],
  "Dakshina Kannada": ["Mangaluru", "Mangalore"], Udupi: ["Siddapura"], Mumbai: ["Bombay"], "Mumbai Suburban": [], Pune: ["Poona", "Khadki"],
  Kolkata: ["Calcutta"], Haora: ["Howrah"], Hugli: ["Hooghly"], "North Twenty Four Parganas": [], Darjiling: ["Darjeeling", "Siliguri"],
  Puruliya: ["Purulia"], "Paschim Medinipur": ["Midnapore"], Chennai: ["Madras"], Kancheepuram: ["Kanchipuram"], Thiruvallur: ["Tiruvallur"],
  Thiruvananthapuram: ["Trivandrum"], Kozhikode: ["Calicut", "Payyoli"], Thrissur: ["Trichur"], Kannur: ["Cannanore", "Payyanur", "Peravoor"],
  Ernakulam: ["Kochi", "Cochin", "Kothamangalam"], Kollam: ["Quilon"], Kottayam: ["Changanassery"], Idukki: ["Thodupuzha"],
  Hyderabad: ["Secunderabad"], Rangareddy: ["Ranga Reddy"], Visakhapatnam: ["Vizag"], Krishna: ["Vijayawada", "Gudivada"],
  "East Godavari": ["Kakinada", "Amalapuram"], Sundargarh: ["Rourkela"], Khordha: ["Bhubaneswar"], Kandhamal: ["Phulbani"],
  "Purba Singhbhum": ["Jamshedpur"], "Imphal West": ["Imphal"], Kamrup: ["Guwahati"], "Kamrup Metropolitan": ["Guwahati"],
  "Sri Muktsar Sahib": ["Muktsar"], "Sahibzada Ajit Singh Nagar": ["Mohali", "Zirakpur", "Kharar"], "Shahid Bhagat Singh Nagar": ["Nawanshahr"],
  "Gautam Buddha Nagar": ["Noida", "Gautam Buddh Nagar"], Sonipat: ["Sonepat"], Panchkula: [], Ahmadabad: ["Ahmedabad"], Vadodara: ["Baroda"],
  Kachchh: ["Kutch"], Dohad: ["Dahod"], "The Dangs": ["Dang"], Banas_Kantha: [], Leh: ["Leh"], Kargil: [], Srinagar: [], Anantnag: ["Bijbehara"],
}

function needles(name: string) {
  return [name, ...(ALIASES[name] ?? [])].filter((n) => n.length > 2)
}

/** Assigns athletes to districts by looking for the district name in their hometown, summary or birthplace. */
export function athletesByDistrict(regionId: string, athletes: (AthleteRecord & { birthplace?: string })[]) {
  const map = getDistrictMap(regionId)
  const result = new Map<string, AthleteRecord[]>()
  if (!map) return result
  const patterns = map.districts.map((d) => ({ name: d.name, re: new RegExp("\\b(" + needles(d.name).map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")\\b", "i") }))
  for (const athlete of athletes) {
    // Prefer the hometown and Wikidata birthplace; fall back to the summary text.
    const place = [athlete.hometown, athlete.birthplace].filter(Boolean).join(" · ")
    const hit = (place && patterns.find((p) => p.re.test(place))) || patterns.find((p) => p.re.test(athlete.summary))
    if (hit) {
      if (!result.has(hit.name)) result.set(hit.name, [])
      result.get(hit.name)!.push(athlete)
    }
  }
  return result
}
