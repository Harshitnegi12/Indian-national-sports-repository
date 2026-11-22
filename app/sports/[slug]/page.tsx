import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRight, BookOpen, ChevronRight, Flag, ListChecks, MapPin } from "lucide-react"
import { ATHLETES, SPORT_HINDI, compareAthletes, getSportCategory, getSportCounts, isMedallist } from "@/lib/athlete-data"
import { getSportInfo } from "@/lib/sports-info"
import { getAcademiesForSport } from "@/lib/academies"
import { getRegion, getRegionMeta } from "@/lib/region-meta"
import { AthleteCard } from "@/components/site/athlete-card"
import { SectionHeading } from "@/components/site/section-heading"
import { AnimatedNumber, Reveal, Stagger, StaggerItem } from "@/components/motion/motion-primitives"

export function generateStaticParams() {
  return getSportCounts(ATHLETES).map(({ slug }) => ({ slug }))
}

function findSport(slug: string) {
  return getSportCounts(ATHLETES).find((s) => s.slug === slug)
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const sport = findSport(slug)
  if (!sport) return {}
  return { title: `${sport.sport} in India`, description: getSportInfo(sport.sport)?.tagline }
}

export default async function SportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sport = findSport(slug)
  if (!sport) notFound()
  const info = getSportInfo(sport.sport)
  const athletes = ATHLETES.filter((a) => getSportCategory(a) === sport.sport).sort(compareAthletes)
  const top = athletes.slice(0, 12)
  const medallists = athletes.filter(isMedallist).length
  const byState = new Map<string, number>()
  for (const a of athletes) byState.set(a.regionId, (byState.get(a.regionId) ?? 0) + 1)
  const states = [...byState.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10)
  const maxState = states[0]?.[1] ?? 1

  return (
    <>
      <section className="hero-surface relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="site-container relative py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-hero-muted">
            <Link href="/sports" className="hover:text-white">Sports</Link><ChevronRight className="size-3.5" /><span className="text-white">{sport.sport}</span>
          </nav>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <Reveal>
              <h1 className="text-5xl font-bold text-white sm:text-6xl">{sport.sport}</h1>
              <p className="mt-1 font-hindi text-2xl text-white/55">{SPORT_HINDI[sport.sport] ?? ""}</p>
              {info && <p className="mt-5 max-w-2xl text-lg leading-8 text-hero-muted">{info.tagline}</p>}
            </Reveal>
            <Stagger className="grid grid-cols-3 gap-3">
              {[[athletes.length, "Athletes"], [medallists, "Medallists"], [byState.size, "States"]].map(([value, label]) => (
                <StaggerItem key={String(label)}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <p className="font-display text-3xl font-bold text-white"><AnimatedNumber value={value} /></p>
                    <p className="text-sm text-hero-muted">{label}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <div className="site-container grid gap-6 py-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          {info && (
            <Reveal>
              <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                <h2 className="flex items-center gap-2 text-xl font-bold"><BookOpen className="size-5 text-saffron" /> History in India</h2>
                <div className="mt-4 space-y-4 text-[15px] leading-7 text-foreground/85">{info.history.map((p) => <p key={p}>{p}</p>)}</div>
                <ol className="mt-6 grid gap-2 sm:grid-cols-2">
                  {info.milestones.map((m) => {
                    const [year, ...rest] = m.split(": ")
                    return (
                      <li key={m} className="flex items-center gap-3 rounded-xl bg-muted/60 px-3 py-2.5 text-sm">
                        <span className="font-display font-bold text-saffron">{year}</span>
                        <span>{rest.join(": ")}</span>
                      </li>
                    )
                  })}
                </ol>
              </section>
            </Reveal>
          )}
          {info && (
            <Reveal>
              <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                <h2 className="flex items-center gap-2 text-xl font-bold"><ListChecks className="size-5 text-india-green" /> How it's played</h2>
                <ul className="mt-4 space-y-3">
                  {info.rules.map((r) => <li key={r} className="flex gap-3 text-[15px] leading-7"><span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-india-green" />{r}</li>)}
                </ul>
              </section>
            </Reveal>
          )}
        </div>
        <aside className="space-y-6">
          <Reveal>
            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold"><MapPin className="size-5" /> Leading states</h2>
              <ol className="mt-4 space-y-2.5">
                {states.map(([regionId, count]) => {
                  const region = getRegion(regionId)!
                  return (
                    <li key={regionId}>
                      <Link href={`/states/${regionId}#sport=${encodeURIComponent(sport.sport)}`} className="group block">
                        <div className="flex justify-between text-sm"><span className="font-medium group-hover:text-saffron">{region.name}</span><span className="font-mono text-xs text-muted-foreground">{count}</span></div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full transition-all duration-700" style={{ width: `${(count / maxState) * 100}%`, background: getRegionMeta(region).accent }} /></div>
                      </Link>
                    </li>
                  )
                })}
              </ol>
            </section>
          </Reveal>
          {info && (
            <Reveal>
              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="flex items-center gap-2 text-lg font-bold"><Flag className="size-5" /> Governing bodies</h2>
                <ul className="mt-3 divide-y divide-border">
                  {info.bodies.map((b) => <li key={b.url} className="py-2.5"><a href={b.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-india-green hover:underline">{b.label} <ArrowUpRight className="size-3.5" /></a></li>)}
                </ul>
              </section>
            </Reveal>
          )}
        </aside>
      </div>

      <section className="site-container">
        <Reveal><SectionHeading eyebrow="Top players" title={`India's best in ${sport.sport.toLowerCase()}`} action={{ href: "/athletes?sport=" + encodeURIComponent(sport.sport), label: `All ${athletes.length} athletes` }} /></Reveal>
        <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {top.map((a) => <StaggerItem key={a.id}><AthleteCard athlete={a} showRegion accent={getRegionMeta(getRegion(a.regionId)!).accent} /></StaggerItem>)}
        </Stagger>
      </section>

      <section className="site-container pt-16">
        <Reveal><SectionHeading eyebrow="Start training" title={`Want to play ${sport.sport.toLowerCase()}?`} titleHi="खेलना शुरू करना है?" text="Join your district and state association, take part in Khelo India events, and try out at a training centre." action={{ href: "/academies", label: "How to start & all academies" }} /></Reveal>
        <Stagger className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {getAcademiesForSport(sport.sport).slice(0, 6).map((a) => (
            <StaggerItem key={a.name}>
              <a href={a.url} target="_blank" rel="noopener noreferrer" className="group spotlight card-lift flex h-full flex-col rounded-2xl border border-border bg-card p-5">
                <p className="font-semibold group-hover:text-saffron">{a.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{a.city} · {a.type}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{a.description}</p>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
        {info && <p className="mt-4 text-sm text-muted-foreground">Federation: {info.bodies.map((b, i) => <span key={b.url}>{i ? ", " : ""}<a href={b.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-india-green hover:underline">{b.label}</a></span>)}</p>}
      </section>
    </>
  )
}
