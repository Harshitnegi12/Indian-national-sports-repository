import type { Metadata } from "next"
import { Suspense } from "react"
import { INDIA_REGIONS } from "@/lib/india-sports-data"
import { ATHLETES } from "@/lib/athlete-data"
import { getRegionMeta } from "@/lib/region-meta"
import { NationalAthleteDirectory } from "@/components/national-athlete-directory"
import { PageHero } from "@/components/site/page-hero"

export const metadata: Metadata = { title: "Athletes across India" }

export default function AthletesDirectoryPage() {
  const accents = Object.fromEntries(INDIA_REGIONS.map((region) => [region.id, getRegionMeta(region).accent]))
  return (
    <>
      <PageHero
        eyebrow="National directory"
        title="Athletes across India"
        hindi="भारत के खिलाड़ी"
        text={`${ATHLETES.length} athletes from every corner of the country. Filter by sport or state, or show only Olympic and Paralympic medallists.`}
      />
      <div className="site-container py-10">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading athletes…</p>}>
          <NationalAthleteDirectory accents={accents} />
        </Suspense>
      </div>
    </>
  )
}
