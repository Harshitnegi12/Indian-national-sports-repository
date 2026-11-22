import { Suspense } from "react"
import { INDIA_REGIONS } from "@/lib/india-sports-data"
import { compareAthletes, getSportCounts, isMedallist, type AthleteRecord } from "@/lib/athlete-data"
import { getRegion, getRegionMeta } from "@/lib/region-meta"
import { PageHero } from "@/components/site/page-hero"
import { SectionHeading } from "@/components/site/section-heading"
import { AthleteCard } from "@/components/site/athlete-card"
import { NationalAthleteDirectory } from "@/components/national-athlete-directory"
import { AnimatedNumber, Reveal, Stagger, StaggerItem } from "@/components/motion/motion-primitives"

/** A themed list of athletes (e.g. Women in Sports, Para Champions) with stats, champions and a filterable grid. */
export function CollectionPage({ eyebrow, title, hindi, intro, athletes, championsTitle }: { eyebrow: string; title: string; hindi: string; intro: string; athletes: AthleteRecord[]; championsTitle: string }) {
  const sorted = [...athletes].sort(compareAthletes)
  const champions = sorted.filter((a) => a.tier && a.tier !== "national" && a.tier !== "international").slice(0, 8)
  const sports = getSportCounts(athletes)
  const states = new Set(athletes.map((a) => a.regionId)).size
  const accents = Object.fromEntries(INDIA_REGIONS.map((r) => [r.id, getRegionMeta(r).accent]))
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} hindi={hindi} text={intro}>
        <Stagger className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[[athletes.length, "Athletes"], [athletes.filter(isMedallist).length, "Olympic & Para medallists"], [sports.length, "Sports"], [states, "States & UTs"]].map(([v, l]) => (
            <StaggerItem key={String(l)}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="font-display text-3xl font-bold text-white"><AnimatedNumber value={v} /></p>
                <p className="text-xs text-hero-muted">{l}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </PageHero>
      <div className="site-container space-y-16 py-12">
        {champions.length > 0 && (
          <section>
            <Reveal><SectionHeading eyebrow="Champions" title={championsTitle} /></Reveal>
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {champions.map((a) => <StaggerItem key={a.id}><AthleteCard athlete={a} showRegion accent={getRegionMeta(getRegion(a.regionId)!).accent} /></StaggerItem>)}
            </Stagger>
          </section>
        )}
        <section>
          <Reveal><SectionHeading eyebrow="Everyone" title="Browse all" text="Filter by sport or state, or show only medallists." /></Reveal>
          <div className="mt-8">
            <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
              <NationalAthleteDirectory
                accents={accents}
                athletes={sorted.map(({ id, name, regionId, sport, hometown, tier, photo, highlights }) => ({ id, name, regionId, sport, hometown, tier, photo, highlights: highlights.slice(0, 1), summary: "", sources: [] }))}
              />
            </Suspense>
          </div>
        </section>
      </div>
    </>
  )
}
