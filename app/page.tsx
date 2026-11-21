import Link from "next/link"
import { ArrowRight, BadgeCheck, FileSearch, MapPinned } from "lucide-react"
import { INDIA_REGIONS, type ZoneType } from "@/lib/india-sports-data"
import { ATHLETES, SPORT_HINDI, compareAthletes, getAthletesForRegion, getSportCounts, isMedallist } from "@/lib/athlete-data"
import { REGION_HINDI, TILE_POSITIONS, getRegion, getRegionMeta } from "@/lib/region-meta"
import { getRegionExtras } from "@/lib/region-extras"
import { IndiaTileMap, type MapTile } from "@/components/site/india-tile-map"
import { SearchLauncher } from "@/components/site/search-launcher"
import { AthleteCard } from "@/components/site/athlete-card"
import { SectionHeading } from "@/components/site/section-heading"

const ZONES: { zone: ZoneType; blurb: string }[] = [
  { zone: "North", blurb: "Akhadas, boxing rings and shooting ranges" },
  { zone: "North-East", blurb: "Boxing, weightlifting, archery and football" },
  { zone: "East", blurb: "Hockey heartlands and football clubs" },
  { zone: "Central", blurb: "Hockey, shooting and emerging academies" },
  { zone: "West", blurb: "Cricket, chess, shooting and para sport" },
  { zone: "South", blurb: "Badminton, athletics, tennis and table tennis" },
  { zone: "Coastal & Islands", blurb: "Water sports and island athletes" },
]

export default function HomePage() {
  const tiles: MapTile[] = INDIA_REGIONS.map((region) => {
    const [col, row] = TILE_POSITIONS[region.id] ?? [0, 0]
    return {
      id: region.id,
      name: region.name,
      hindi: REGION_HINDI[region.id] ?? "",
      short: region.code.replace("IN-", ""),
      type: region.type,
      zone: region.zone,
      count: getAthletesForRegion(region.id).length,
      col,
      row,
    }
  })

  const medallists = ATHLETES.filter(isMedallist).length
  const sportCounts = getSportCounts(ATHLETES)
  // Champions from as many different states as possible, then fill up with the rest.
  const champions = ATHLETES.filter((athlete) => athlete.featured || isMedallist(athlete)).sort(compareAthletes)
  const onePerRegion = champions.filter((athlete, index) => champions.findIndex((a) => a.regionId === athlete.regionId) === index)
  const featured = [...onePerRegion, ...champions.filter((athlete) => !onePerRegion.includes(athlete))].slice(0, 8)
  const regionsWithAthletes = INDIA_REGIONS.filter((region) => getAthletesForRegion(region.id).length > 0).length

  const haryana = getRegion("haryana")!
  const haryanaMeta = getRegionMeta(haryana)
  const haryanaExtras = getRegionExtras("haryana")
  const haryanaAthletes = getAthletesForRegion("haryana")

  return (
    <>
      {/* Hero */}
      <section className="hero-surface relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="site-container relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
              <span className="font-hindi text-sm text-[#FFB366]">भारत के खिलाड़ी</span>
              <span className="h-3 w-px bg-white/20" />
              Athletes of India
            </p>
            <h1 className="mt-6 text-[2.6rem] font-bold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.2rem]">
              Every state.
              <br />
              Every sport.
              <br />
              <span className="bg-gradient-to-r from-[#FF9933] via-[#FFD2A1] to-[#7EE29A] bg-clip-text text-transparent">Every champion.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-hero-muted">
              Explore India&apos;s athletes state by state, from Olympic medallists to rising national talent.
              Every profile links to a public source.
            </p>
            <div className="mt-8">
              <SearchLauncher />
              <p className="mt-3 text-sm text-hero-muted">
                Try{" "}
                {["Neeraj Chopra", "Wrestling", "Manipur"].map((term, index) => (
                  <span key={term}>
                    <span className="font-medium text-white/85">{term}</span>
                    {index < 2 ? ", " : ""}
                  </span>
                ))}
              </p>
            </div>
            <dl className="mt-10 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
              {[
                ["36", "States & UTs"],
                [String(ATHLETES.length), "Athletes"],
                [String(sportCounts.length), "Sports"],
                [String(medallists), "Olympic & Para medallists"],
              ].map(([value, label]) => (
                <div key={label} className="bg-hero/80 px-4 py-4">
                  <dt className="text-xs text-hero-muted">{label}</dt>
                  <dd className="mt-1 font-display text-2xl font-bold text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 shadow-2xl shadow-black/30 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-display text-base font-semibold text-white">Pick a state</p>
                <Link href="/states" className="text-xs font-semibold text-[#FFB366] hover:underline">List view</Link>
              </div>
              <IndiaTileMap tiles={tiles} />
            </div>
          </div>
        </div>
      </section>

      {/* Champions */}
      <section className="site-container py-20">
        <SectionHeading
          eyebrow="Champions"
          title="India's medal-winning athletes"
          text="Olympic and Paralympic medallists and world champions from across the country."
          action={{ href: "/athletes", label: "All athletes" }}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((athlete) => (
            <AthleteCard key={athlete.id} athlete={athlete} showRegion accent={getRegionMeta(getRegion(athlete.regionId)!).accent} />
          ))}
        </div>
      </section>

      {/* Sports */}
      <section className="border-y border-border bg-card">
        <div className="site-container py-20">
          <SectionHeading eyebrow="Sports" title="Explore by sport" text="Pick a sport to see every listed athlete across India." />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {sportCounts.map(({ sport, slug, count }) => (
              <Link
                key={slug}
                href={"/athletes?sport=" + encodeURIComponent(sport)}
                className="group card-lift flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3.5"
              >
                <span className="min-w-0">
                  <span className="block truncate font-semibold group-hover:text-saffron">{sport}</span>
                  <span className="block truncate font-hindi text-sm text-muted-foreground">{SPORT_HINDI[sport] ?? ""}</span>
                </span>
                <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">{count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight */}
      <section className="site-container py-20">
        <div className="hero-surface relative overflow-hidden rounded-3xl" style={{ ["--accent-region" as string]: haryanaMeta.accent }}>
          <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow text-[#FFB366]">State spotlight</p>
              <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
                Haryana <span className="font-hindi font-semibold text-white/60">{haryanaMeta.hindi}</span>
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-8 text-hero-muted">{haryanaExtras.introduction}</p>
              <blockquote className="mt-6 border-l-2 border-[#FF9933] pl-4 text-white/85 italic">“{haryanaExtras.quotes?.[0]}”</blockquote>
              <Link href="/states/haryana" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#FFE2C4]">
                Explore Haryana <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                [String(haryanaAthletes.length), "athletes listed"],
                [String(haryanaAthletes.filter(isMedallist).length), "Olympic & Para medallists"],
                [String(getSportCounts(haryanaAthletes).length), "sports"],
                [String(haryanaExtras.academies.length), "academies"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <p className="font-display text-4xl font-bold text-white">{value}</p>
                  <p className="mt-1 text-sm text-hero-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Zones */}
      <section className="site-container pb-4">
        <SectionHeading
          eyebrow="Regions"
          title="Browse India by zone"
          text={`All 28 states and 8 union territories have their own page${regionsWithAthletes === INDIA_REGIONS.length ? ", each with listed athletes" : `, and ${regionsWithAthletes} already list athletes`}. More are added as sources are checked.`}
          action={{ href: "/states", label: "All states & UTs" }}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ZONES.map(({ zone, blurb }) => {
            const regions = INDIA_REGIONS.filter((region) => region.zone === zone).sort((a, b) => a.name.localeCompare(b.name))
            return (
              <article key={zone} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-bold">{zone}</h3>
                  <span className="text-xs text-muted-foreground">{regions.length} regions</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{blurb}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {regions.map((region) => {
                    const count = getAthletesForRegion(region.id).length
                    return (
                      <li key={region.id}>
                        <Link href={"/states/" + region.id} className="chip text-[13px]">
                          {region.name}
                          {count > 0 && <span className="rounded bg-muted px-1 font-mono text-[10px] text-muted-foreground">{count}</span>}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </article>
            )
          })}
        </div>
      </section>

      {/* Trust */}
      <section className="site-container pt-20">
        <div className="grid gap-6 rounded-3xl border border-border bg-card p-8 sm:p-10 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="eyebrow text-india-green">How it works</p>
            <h2 className="mt-3 text-2xl font-bold">Built on public records</h2>
            <Link href="/data-notes" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-saffron hover:underline">
              Read the data notes <ArrowRight className="size-4" />
            </Link>
          </div>
          {[
            { icon: BadgeCheck, title: "Every profile is sourced", text: "Achievements link to the IOA, SAI, federations, Olympics.com or official state pages." },
            { icon: MapPinned, title: "Organised by state", text: "Each state and UT has its own page with sports, athletes, academies and official links." },
            { icon: FileSearch, title: "Growing, not complete", text: "An empty sport means records have not been added yet, not that the state has no athletes." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <span className="flex size-10 items-center justify-center rounded-xl bg-muted"><Icon className="size-5 text-foreground/80" /></span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
