import type { Metadata } from "next"
import { Suspense } from "react"
import { INDIA_REGIONS } from "@/lib/india-sports-data"
import { getAthletesForRegion, isMedallist } from "@/lib/athlete-data"
import { getRegionMeta } from "@/lib/region-meta"
import { StatesUtGrid, type RegionCardData } from "@/components/states-ut-grid"
import { PageHero } from "@/components/site/page-hero"

export const metadata: Metadata = { title: "States & Union Territories" }

export default function StatesDirectoryPage() {
  const regions: RegionCardData[] = INDIA_REGIONS.map((region) => {
    const meta = getRegionMeta(region)
    const athletes = getAthletesForRegion(region.id)
    return {
      id: region.id,
      name: region.name,
      hindi: meta.hindi,
      code: region.code,
      type: region.type,
      zone: region.zone,
      capital: region.capital,
      accent: meta.accent,
      count: athletes.length,
      medallists: athletes.filter(isMedallist).length,
      athleteText: athletes.map((athlete) => athlete.name + " " + athlete.sport).join(" "),
    }
  })

  return (
    <>
      <PageHero
        eyebrow="Choose a region"
        title="States & Union Territories"
        hindi="राज्य और केंद्र शासित प्रदेश"
        text="All 28 states and 8 union territories, each with its own page of athletes, sports, academies and official links."
      />
      <div className="site-container py-10">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading regions…</p>}>
          <StatesUtGrid regions={regions} />
        </Suspense>
      </div>
    </>
  )
}
