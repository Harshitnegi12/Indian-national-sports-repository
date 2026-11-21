import type { SearchItem } from "@/components/site/search-dialog"
import { ATHLETES, getRegionName } from "@/lib/athlete-data"
import { INDIA_REGIONS } from "@/lib/india-sports-data"
import { REGION_HINDI } from "@/lib/region-meta"

/** Built on the server and passed to the header, so search works instantly on every page. */
export function buildSearchIndex(): SearchItem[] {
  const regions: SearchItem[] = INDIA_REGIONS.map((region) => ({
    kind: "region",
    title: region.name,
    subtitle: `${region.type} · ${region.zone} · Capital ${region.capital}`,
    href: "/states/" + region.id,
    keywords: [region.name, region.code, region.capital, region.zone, REGION_HINDI[region.id] ?? ""].join(" ").toLowerCase(),
  }))
  const athletes: SearchItem[] = ATHLETES.map((athlete) => ({
    kind: "athlete",
    title: athlete.name,
    subtitle: `${athlete.sport} · ${getRegionName(athlete.regionId)}`,
    href: "/athletes/" + athlete.id,
    keywords: [athlete.name, athlete.sport, athlete.hometown ?? "", getRegionName(athlete.regionId), athlete.featured ? "featured" : ""].join(" ").toLowerCase(),
  }))
  return [...regions, ...athletes]
}
