import Link from "next/link"
import { ArrowRight, BadgeCheck, FileSearch, MapPinned } from "lucide-react"
import { INDIA_REGIONS, type ZoneType } from "@/lib/india-sports-data"
import { ATHLETES, SPORT_HINDI, compareAthletes, getAthletesForRegion, getSportCounts, isMedallist } from "@/lib/athlete-data"
import { REGION_HINDI, getRegion, getRegionMeta } from "@/lib/region-meta"
import { getRegionExtras } from "@/lib/region-extras"
import { IndiaMap } from "@/components/map/india-map"
import type { MapRegionInfo } from "@/components/map/india-map-interactive"
import { AnimatedNumber, Reveal, Stagger, StaggerItem, WordReveal } from "@/components/motion/motion-primitives"
import { SearchLauncher, SearchSuggestion } from "@/components/site/search-launcher"
import { AthleteCard } from "@/components/site/athlete-card"
import { SectionHeading } from "@/components/site/section-heading"
import { TodayInSport } from "@/components/site/today-in-sport"
import { T } from "@/components/site/lang"

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
  const mapRegions: MapRegionInfo[] = INDIA_REGIONS.map((region) => {
    const athletes = getAthletesForRegion(region.id)
    return { id: region.id, name: region.name, hindi: REGION_HINDI[region.id] ?? "", type: region.type, zone: region.zone, count: athletes.length, medallists: athletes.filter(isMedallist).length }
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
            <Reveal y={10}>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
                <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[#FF9933] opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-[#FF9933]" /></span>
                <span className="font-hindi text-sm text-[#FFB366]">भारत के खिलाड़ी</span>
                <span className="h-3 w-px bg-white/20" />
                Athletes of India
              </p>
            </Reveal>
            <h1 className="mt-6 text-[2.6rem] font-bold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.2rem]">
              <T
                en={<WordReveal lines={[{ text: "Every state." }, { text: "Every sport." }, { text: "Every champion.", className: "bg-gradient-to-r from-[#FF9933] via-[#FFD2A1] to-[#7EE29A] bg-clip-text text-transparent" }]} />}
                hi={<WordReveal lines={[{ text: "हर राज्य।" }, { text: "हर खेल।" }, { text: "हर चैंपियन।", className: "bg-gradient-to-r from-[#FF9933] via-[#FFD2A1] to-[#7EE29A] bg-clip-text text-transparent" }]} />}
              />
            </h1>
            <Reveal delay={0.35}>
              <p className="mt-6 max-w-xl text-lg leading-8 text-hero-muted">
                <T en={<>Explore India&apos;s athletes state by state, from Olympic medallists to rising national talent. Every profile links to a public source.</>} hi="राज्य दर राज्य भारत के खिलाड़ियों को जानिए, ओलंपिक पदक विजेताओं से लेकर उभरती राष्ट्रीय प्रतिभाओं तक। हर प्रोफ़ाइल किसी सार्वजनिक स्रोत से जुड़ी है।" />
              </p>
            </Reveal>
            <Reveal delay={0.45} className="mt-8">
              <SearchLauncher />
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-hero-muted">
                Try
                {["Neeraj Chopra", "Wrestling", "Manipur", "Para athletics"].map((term) => (
                  <SearchSuggestion key={term} term={term} />
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.55}>
              <dl className="mt-10 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
                {[
                  [36, "States & UTs", "राज्य व केंद्र शासित"],
                  [ATHLETES.length, "Athletes", "खिलाड़ी"],
                  [sportCounts.length, "Sports", "खेल"],
                  [medallists, "Olympic & Para medallists", "ओलंपिक व पैरा पदक विजेता"],
                ].map(([value, label, hi]) => (
                  <div key={label} className="bg-hero/80 px-4 py-4 transition-colors hover:bg-hero/60">
                    <dt className="text-xs text-hero-muted"><T en={label} hi={hi} /></dt>
                    <dd className="mt-1 font-display text-2xl font-bold text-white"><AnimatedNumber value={value} /></dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={30} className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 shadow-2xl shadow-black/30 sm:p-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-display text-base font-semibold text-white"><T en="Pick a state on the map" hi="मैप पर राज्य चुनें" /></p>
                <Link href="/states" className="text-xs font-semibold text-[#FFB366] hover:underline">List view</Link>
              </div>
              <div className="mx-auto max-w-[460px]">
                <IndiaMap regions={mapRegions} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Aaj ka din */}
      <section className="site-container pt-16"><Reveal><TodayInSport /></Reveal></section>

      {/* Champions */}
      <section className="site-container py-20">
        <Reveal><SectionHeading
          eyebrow="Champions"
          title="India's medal-winning athletes" titleHi="भारत के पदक विजेता खिलाड़ी"
          text="Olympic and Paralympic medallists and world champions from across the country."
          action={{ href: "/athletes", label: "All athletes" }}
        /></Reveal>
        <Stagger className="snap-rail no-scrollbar -mx-4 mt-10 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {featured.map((athlete) => (
            <StaggerItem key={athlete.id} className="w-[78%] shrink-0 sm:w-auto">
              <AthleteCard athlete={athlete} showRegion accent={getRegionMeta(getRegion(athlete.regionId)!).accent} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Sports */}
      <section className="border-y border-border bg-card">
        <div className="site-container py-20">
          <Reveal><SectionHeading eyebrow="Sports" title="Explore by sport" titleHi="खेल के अनुसार देखें" text="Pick a sport to see every listed athlete across India." /></Reveal>
          <Stagger gap={0.03} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {sportCounts.map(({ sport, slug, count }) => (
              <StaggerItem key={slug}>
              <Link
                href={"/sports/" + slug}
                className="group spotlight card-lift pressable flex h-full items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3.5"
              >
                <span className="min-w-0">
                  <span className="block truncate font-semibold group-hover:text-saffron">{sport}</span>
                  <span className="block truncate font-hindi text-sm text-muted-foreground">{SPORT_HINDI[sport] ?? ""}</span>
                </span>
                <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground transition group-hover:bg-saffron group-hover:text-white">{count}</span>
              </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Spotlight */}
      <section className="site-container py-20">
        <Reveal className="hero-surface relative overflow-hidden rounded-3xl" style={{ ["--accent-region" as string]: haryanaMeta.accent }}>
          <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow text-[#FFB366]">State spotlight</p>
              <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
                Haryana <span className="font-hindi font-semibold text-white/60">{haryanaMeta.hindi}</span>
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-8 text-hero-muted">{haryanaExtras.introduction}</p>
              <blockquote className="mt-6 border-l-2 border-[#FF9933] pl-4 text-white/85 italic">“{haryanaExtras.quotes?.[0]}”</blockquote>
              <Link href="/states/haryana" className="pressable group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-[#FFE2C4]">
                Explore Haryana <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <Stagger className="grid grid-cols-2 gap-3">
              {[
                [haryanaAthletes.length, "athletes listed"],
                [haryanaAthletes.filter(isMedallist).length, "Olympic & Para medallists"],
                [getSportCounts(haryanaAthletes).length, "sports"],
                [haryanaExtras.academies.length, "academies"],
              ].map(([value, label]) => (
                <StaggerItem key={label}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.05] p-5 transition hover:border-white/25 hover:bg-white/[0.08]">
                    <p className="font-display text-4xl font-bold text-white"><AnimatedNumber value={value} /></p>
                    <p className="mt-1 text-sm text-hero-muted">{label}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </section>

      {/* Zones */}
      <section className="site-container pb-4">
        <Reveal><SectionHeading
          eyebrow="Regions"
          title="Browse India by zone" titleHi="क्षेत्र के अनुसार भारत"
          text={`All 28 states and 8 union territories have their own page${regionsWithAthletes === INDIA_REGIONS.length ? ", each with listed athletes" : `, and ${regionsWithAthletes} already list athletes`}. More are added as sources are checked.`}
          action={{ href: "/states", label: "All states & UTs" }}
        /></Reveal>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ZONES.map(({ zone, blurb }) => {
            const regions = INDIA_REGIONS.filter((region) => region.zone === zone).sort((a, b) => a.name.localeCompare(b.name))
            return (
              <StaggerItem key={zone}><article className="spotlight h-full rounded-2xl border border-border bg-card p-6 transition hover:border-foreground/15">
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
                        <Link href={"/states/" + region.id} className="chip pressable text-[13px] hover:border-saffron/50 hover:bg-saffron/5">
                          {region.name}
                          {count > 0 && <span className="rounded bg-muted px-1 font-mono text-[10px] text-muted-foreground">{count}</span>}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </article></StaggerItem>
            )
          })}
        </Stagger>
      </section>

      {/* Trust */}
      <section className="site-container pt-20">
        <Reveal className="grid gap-6 rounded-3xl border border-border bg-card p-8 sm:p-10 lg:grid-cols-4">
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
        </Reveal>
      </section>
    </>
  )
}
