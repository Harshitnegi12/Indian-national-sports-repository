import { HARYANA_EXTRAS } from "@/lib/data/haryana"

export interface Academy {
  name: string
  place: string
  sports: string[]
  description: string
  url?: string
  linkLabel?: string
}

export interface RegionExtras {
  headline?: string
  introduction?: string
  quotes?: string[]
  facts?: { title: string; text: string }[]
  districts?: { name: string; sports: string; athletes: string }[]
  academies?: Academy[]
  officialLinks?: { label: string; url: string }[]
}

/**
 * Optional, hand-written content per region. A region with no entry still gets the full page;
 * these sections simply fall back to national resources until data is added.
 * To add a region, create lib/data/<region>.ts and register it here.
 */
const EXTRAS: Record<string, RegionExtras> = {
  haryana: HARYANA_EXTRAS,
}

const NATIONAL_ACADEMIES: Academy[] = [
  {
    name: "Sports Authority of India centres",
    place: "National directory",
    sports: ["Multiple sports"],
    description: "Use the official SAI directory for current regional centres, programmes and contact details.",
    url: "https://sportsauthorityofindia.nic.in/sai_new/public/directory",
    linkLabel: "SAI directory",
  },
  {
    name: "Khelo India accredited academies",
    place: "National programme",
    sports: ["Multiple sports"],
    description: "Khelo India lists accredited academies and state centres of excellence across India.",
    url: "https://kheloindia.gov.in/",
    linkLabel: "Khelo India",
  },
]

export function getRegionExtras(regionId: string): Required<Pick<RegionExtras, "academies" | "officialLinks">> & RegionExtras {
  const extras = EXTRAS[regionId] ?? {}
  return {
    ...extras,
    academies: extras.academies?.length ? extras.academies : NATIONAL_ACADEMIES,
    officialLinks: extras.officialLinks ?? [{ label: "Sports Authority of India", url: "https://sportsauthorityofindia.nic.in/" }],
  }
}

export function hasRegionalAcademies(regionId: string) {
  return Boolean(EXTRAS[regionId]?.academies?.length)
}
