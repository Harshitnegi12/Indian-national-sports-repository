import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ArrowUpRight, Building2, ChevronRight, LayoutGrid, MapPin } from "lucide-react"
import { INDIA_REGIONS } from "@/lib/india-sports-data"
import {
  SPORT_CATEGORIES,
  SPORT_HINDI,
  compareAthletes,
  getAthletesForRegion,
  getSportCounts,
  isMedallist,
} from "@/lib/athlete-data"
import { REGIONS_SORTED, getAdjacentRegions, getRegion, getRegionMeta, getSameZoneRegions } from "@/lib/region-meta"
import { getRegionExtras, hasRegionalAcademies } from "@/lib/region-extras"
import { RegionSwitcher, type SwitcherRegion } from "@/components/region/region-switcher"
import { RegionAthletes } from "@/components/region/region-athletes"
import { PlayerCorner } from "@/components/region/player-corner"
import { AthleteAvatar, TierBadge } from "@/components/site/athlete-card"
import { SectionHeading } from "@/components/site/section-heading"
import { SectionNav } from "@/components/region/section-nav"
import { StateMap } from "@/components/map/state-map"
import { athletesByDistrict, getDistrictMap } from "@/lib/district-map"
import { getAthleteProfile } from "@/lib/athlete-profiles"
import { ReportError } from "@/components/site/report-error"
import { DATA_UPDATED } from "@/lib/site-config"
import { AnimatedNumber, Reveal, Stagger, StaggerItem } from "@/components/motion/motion-primitives"

export function generateStaticParams() {
  return INDIA_REGIONS.map((region) => ({ id: region.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const region = getRegion(id)
  if (!region) return {}
  const count = getAthletesForRegion(id).length
  return {
    title: `${region.name} athletes`,
    description: `${count} athletes from ${region.name}, browsable by sport, with academies, district highlights and source links.`,
  }
}

export default async function RegionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const region = getRegion(id)
  if (!region) notFound()

  const meta = getRegionMeta(region)
  const extras = getRegionExtras(id)
  const athletes = [...getAthletesForRegion(id)].sort(compareAthletes)
  const sportCounts = getSportCounts(athletes)
  const athletesWithPlace = athletes.map((athlete) => ({ ...athlete, birthplace: getAthleteProfile(athlete.id)?.birthplace }))
  const districtOf: Record<string, string> = {}
  for (const [district, list] of athletesByDistrict(id, athletesWithPlace)) for (const athlete of list) districtOf[athlete.id] = district
  const hasMap = Boolean(getDistrictMap(id)?.districts.length)
  const champions = athletes.filter((athlete) => athlete.featured || isMedallist(athlete)).slice(0, 6)
  const medallists = athletes.filter(isMedallist).length
  const { previous, next } = getAdjacentRegions(id)
  const sameZone = getSameZoneRegions(id)
  const switcherRegions: SwitcherRegion[] = REGIONS_SORTED.map((item) => ({
    id: item.id,
    name: item.name,
    type: item.type,
    zone: item.zone,
    count: getAthletesForRegion(item.id).length,
  }))
  const headline = extras.headline ?? meta.story.tagline
  const intro = extras.introduction ?? meta.story.introduction
  const playerSports = sportCounts.length ? [...sportCounts.map((s) => s.sport), ...SPORT_CATEGORIES.filter((s) => !sportCounts.some((c) => c.sport === s))] : SPORT_CATEGORIES

  const sections = [
    champions.length ? { id: "champions", label: "Champions" } : null,
    hasMap ? { id: "map", label: "District map" } : null,
    { id: "athletes", label: "All athletes" },
    extras.districts?.length ? { id: "districts", label: "Districts" } : null,
    extras.facts?.length ? { id: "facts", label: "Did you know" } : null,
    { id: "academies", label: "Academies" },
    { id: "player-corner", label: "Player Corner" },
    { id: "sources", label: "Sources" },
  ].filter(Boolean) as { id: string; label: string }[]

  return (
    <div style={{ ["--accent-region" as string]: meta.accent }}>
      {/* Location bar: breadcrumb, previous/next and the state switcher */}
      <div className="border-b border-border bg-card/60">
        <div className="site-container flex flex-wrap items-center justify-between gap-3 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="size-3.5" />
            <Link href="/states" className="hover:text-foreground">States &amp; UTs</Link>
            <ChevronRight className="size-3.5" />
            <span className="font-medium text-foreground" aria-current="page">{region.name}</span>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/states" className="hidden h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-medium transition hover:border-foreground/25 sm:inline-flex">
              <LayoutGrid className="size-4" /> All states
            </Link>
            <Link href={"/states/" + previous.id} aria-label={"Previous: " + previous.name} title={previous.name} className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card transition hover:border-foreground/25">
              <ArrowLeft className="size-4" />
            </Link>
            <RegionSwitcher current={id} regions={switcherRegions} />
            <Link href={"/states/" + next.id} aria-label={"Next: " + next.name} title={next.name} className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card transition hover:border-foreground/25">
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="hero-surface relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <p aria-hidden="true" className="pointer-events-none absolute -right-6 bottom-[-0.18em] select-none whitespace-nowrap font-hindi text-[9rem] font-bold leading-none text-white/[0.04] sm:text-[13rem] lg:text-[16rem]">
          {meta.hindi}
        </p>
        <div className="absolute inset-x-0 bottom-0 h-1" style={{ background: meta.accent }} aria-hidden="true" />
        <div className="site-container relative grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <Reveal y={24}>
            <p className="flex flex-wrap items-center gap-2 text-sm text-hero-muted">
              <span className="rounded-md border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-xs text-white/80">{region.code}</span>
              {region.type} · {region.zone} zone
            </p>
            <h1 className="mt-5 text-5xl font-bold leading-[0.95] tracking-[-0.035em] text-white sm:text-7xl">{region.name}</h1>
            <p className="mt-2 font-hindi text-3xl font-semibold text-white/55 sm:text-4xl">{meta.hindi}</p>
            <p className="mt-6 text-xl font-semibold text-[color-mix(in_oklch,var(--accent-region)_45%,white)]">{headline}</p>
            <p className="mt-3 max-w-2xl text-base leading-7 text-hero-muted">{intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#athletes" className="pressable group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-black/20 hover:bg-slate-100">
                See all {athletes.length || ""} athletes <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href="#player-corner" className="pressable inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/10">
                I&apos;m an athlete
              </a>
            </div>
          </Reveal>
          <Stagger className="grid grid-cols-2 gap-3" gap={0.08}>
            {[
              [athletes.length, "Athletes listed"],
              [medallists, "Olympic & Para medallists"],
              [sportCounts.length, "Sports"],
              [hasRegionalAcademies(id) ? extras.academies.length : "–", "Academies"],
            ].map(([value, label]) => (
              <StaggerItem key={String(label)}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur transition hover:border-white/25 hover:bg-white/[0.08]">
                  <p className="font-display text-4xl font-bold text-white"><AnimatedNumber value={value} /></p>
                  <p className="mt-1 text-sm text-hero-muted">{label}</p>
                </div>
              </StaggerItem>
            ))}
            <StaggerItem className="col-span-2">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-sm text-hero-muted">
                <MapPin className="size-4 shrink-0" /> Capital: <span className="font-medium text-white">{region.capital}</span>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <SectionNav sections={sections} accent={meta.accent} />

      {/* Champions */}
      {champions.length > 0 && (
        <section id="champions" className="site-container scroll-mt-32 pt-16">
          <Reveal><SectionHeading eyebrow="Champions" title={`Pride of ${region.name}`} text="Medallists and headline athletes from this region." /></Reveal>
          <Stagger className="snap-rail no-scrollbar -mx-4 mt-8 flex gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
            {champions.map((athlete) => (
              <StaggerItem key={athlete.id} className="w-[82%] shrink-0 sm:w-[60%] md:w-auto">
              <Link href={"/athletes/" + athlete.id} className="group spotlight card-lift pressable relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6" style={{ ["--accent-card" as string]: meta.accent }}>
                <div className="absolute inset-y-0 left-0 w-1 transition-all duration-300 group-hover:w-1.5" style={{ background: meta.accent }} />
                <div className="flex items-center gap-4">
                  <AthleteAvatar name={athlete.name} accent={meta.accent} size="lg" photo={athlete.photo} />
                  <div className="min-w-0">
                    <p className="truncate font-display text-xl font-bold group-hover:text-saffron">{athlete.name}</p>
                    <p className="truncate text-sm text-muted-foreground">{athlete.sport}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-foreground/85">{athlete.highlights[0]}</p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <TierBadge tier={athlete.tier} />
                  {athlete.hometown && <span className="truncate pl-3 text-xs text-muted-foreground">{athlete.hometown}</span>}
                </div>
              </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {/* District map */}
      {hasMap && (
        <section id="map" className="site-container scroll-mt-32 pt-16">
          <Reveal><SectionHeading eyebrow="District map" title={`Explore ${region.name} district by district`} text="Hover over a district to see who comes from there. Click it to filter the athlete list." /></Reveal>
          <Reveal className="mt-8">
            <StateMap regionId={id} athletes={athletesWithPlace} accent={meta.accent} />
          </Reveal>
        </section>
      )}

      {/* All athletes */}
      <section id="athletes" className="site-container scroll-mt-32 pt-16">
        <Reveal><SectionHeading
          eyebrow="Athletes"
          title={`All athletes from ${region.name}`}
          text={athletes.length ? "Filter by sport, search by name or hometown, and open any card for the full profile and sources." : undefined}
        /></Reveal>
        <div className="mt-8">
          {athletes.length ? (
            <RegionAthletes
              athletes={athletes}
              sports={sportCounts.map(({ sport, count }) => ({ sport, count, hindi: SPORT_HINDI[sport] ?? "" }))}
              accent={meta.accent}
              regionName={region.name}
              districtOf={districtOf}
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card p-10 sm:p-14">
              <p className="font-display text-2xl font-bold">Athlete profiles for {region.name} are being added</p>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                We only list an athlete once a public source confirms their achievements and connection to {region.name}.
                An empty list means records haven&apos;t been checked yet, not that the region has no athletes.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#player-corner" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Are you an athlete? Add your card</a>
                <Link href="/athletes" className="rounded-xl border border-border px-5 py-3 text-sm font-semibold">Browse all athletes</Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Districts */}
      {extras.districts?.length ? (
        <section id="districts" className="site-container scroll-mt-32 pt-20">
          <Reveal><SectionHeading eyebrow="Districts" title="Where the champions come from" text="District by district: the sports each area is known for and the athletes it produced." /></Reveal>
          <Stagger className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {extras.districts.map((district) => (
              <StaggerItem key={district.name} className="group bg-card p-6 transition-colors hover:bg-muted/50">
                <p className="eyebrow" style={{ color: meta.accent }}>{district.sports}</p>
                <h3 className="mt-2 text-xl font-bold">{district.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{district.athletes}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      ) : null}

      {/* Facts */}
      {extras.facts?.length ? (
        <section id="facts" className="site-container scroll-mt-32 pt-20">
          <Reveal><SectionHeading eyebrow="Did you know" title={`${region.name} in numbers and firsts`} /></Reveal>
          <Stagger className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {extras.facts.map((fact) => (
              <StaggerItem key={fact.title}><article className="spotlight card-lift h-full rounded-2xl border border-border bg-card p-6" style={{ ["--accent-card" as string]: meta.accent }}>
                <p className="font-display text-2xl font-bold" style={{ color: meta.accent }}>{fact.title}</p>
                <p className="mt-2 text-sm leading-6 text-foreground/80">{fact.text}</p>
              </article></StaggerItem>
            ))}
          </Stagger>
          {extras.quotes && extras.quotes.length > 1 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {extras.quotes.map((quote) => (
                <span key={quote} className="rounded-full border border-border bg-card px-4 py-2 text-sm italic text-muted-foreground">“{quote}”</span>
              ))}
            </div>
          )}
        </section>
      ) : null}

      {/* Academies */}
      <section id="academies" className="site-container scroll-mt-32 pt-20">
        <Reveal><SectionHeading
          eyebrow="Academies"
          title={hasRegionalAcademies(id) ? "Where champions train" : "Training centres"}
          text={hasRegionalAcademies(id) ? `Sports centres, schools and clubs in ${region.name}. Official pages are linked where available.` : `Regional academy listings for ${region.name} haven't been added yet. Use these official national directories meanwhile.`}
        /></Reveal>
        <Stagger className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {extras.academies.map((academy) => (
            <StaggerItem key={academy.name}><article className="group spotlight card-lift flex h-full flex-col rounded-2xl border border-border bg-card p-6" style={{ ["--accent-card" as string]: meta.accent }}>
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted transition group-hover:scale-110 group-hover:bg-saffron/15"><Building2 className="size-5 text-foreground/70" /></span>
                <div className="min-w-0">
                  <h3 className="font-bold leading-snug">{academy.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{academy.place}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {academy.sports.map((sport) => (
                  <span key={sport} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground/75">{sport}</span>
                ))}
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{academy.description}</p>
              <div className="mt-auto pt-4">
                {academy.url ? (
                  <a href={academy.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-india-green hover:underline">
                    {academy.linkLabel ?? "Official site"} <ArrowUpRight className="size-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-muted-foreground">No official website found</span>
                )}
              </div>
            </article></StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Player Corner */}
      <section id="player-corner" className="site-container scroll-mt-32 pt-20">
        <Reveal><SectionHeading eyebrow="Player Corner" title={`Athlete from ${region.name}?`} text="Create your athlete card. When public sign-up opens, verified cards can be added to this page." /></Reveal>
        <Reveal className="mt-8">
          <PlayerCorner regionId={id} regionName={region.name} sports={playerSports} accent={meta.accent} />
        </Reveal>
      </section>

      {/* Sources and nearby */}
      <section id="sources" className="site-container scroll-mt-32 pt-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-2xl font-bold">Official links &amp; sources</h2>
            <p className="mt-2 text-sm text-muted-foreground">Each athlete profile lists its own sources. These are the main references for {region.name}.</p>
            <ul className="mt-5 divide-y divide-border">
              {[...extras.officialLinks, ...meta.story.links].map((link) => (
                <li key={link.url} className="py-3">
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-india-green hover:underline">
                    {link.label} <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
              ))}
              <li className="py-3">
                <Link href="/data-notes" className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline">How we check data <ArrowRight className="size-3.5" /></Link>
              </li>
              <li className="py-3 text-xs text-muted-foreground">Last updated {DATA_UPDATED} <ReportError subject={`State page: ${region.name}`} className="ml-3 mt-0" /></li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-2xl font-bold">More from the {region.zone} zone</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {sameZone.map((item) => {
                const count = getAthletesForRegion(item.id).length
                return (
                  <li key={item.id}>
                    <Link href={"/states/" + item.id} className="chip">
                      {item.name}
                      {count > 0 && <span className="font-mono text-[11px] opacity-60">{count}</span>}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-3 border-t border-border pt-6">
              <Link href={"/states/" + previous.id} className="group rounded-xl border border-border p-4 transition hover:border-foreground/25">
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><ArrowLeft className="size-3.5" /> Previous</span>
                <span className="mt-1 block truncate font-semibold group-hover:text-saffron">{previous.name}</span>
              </Link>
              <Link href={"/states/" + next.id} className="group rounded-xl border border-border p-4 text-right transition hover:border-foreground/25">
                <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">Next <ArrowRight className="size-3.5" /></span>
                <span className="mt-1 block truncate font-semibold group-hover:text-saffron">{next.name}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
