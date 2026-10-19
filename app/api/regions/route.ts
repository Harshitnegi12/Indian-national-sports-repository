import { ATHLETES, SPORT_CATEGORIES } from "@/lib/athlete-data"
import { INDIA_REGIONS } from "@/lib/india-sports-data"
import { getRegionStory } from "@/lib/region-stories"

export const dynamic = "force-static"

export function GET() {
  const regions = INDIA_REGIONS.map((region) => ({
    ...region,
    story: getRegionStory(region.id),
    athletes: ATHLETES.filter((athlete) => athlete.regionId === region.id),
  }))

  return Response.json({ regions, sports: SPORT_CATEGORIES })
}
