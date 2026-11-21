import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, ChevronRight, MapPin, Trophy } from "lucide-react"
import {
  compareAthletes,
  getAthleteById,
  getAthleteStaticParams,
  getAthletesForRegion,
  getSportCategory,
  getSportEvent,
  getSportSlug,
} from "@/lib/athlete-data"
import { getRegion, getRegionMeta } from "@/lib/region-meta"
import { AthleteAvatar, AthleteCard, TierBadge } from "@/components/site/athlete-card"

export function generateStaticParams() {
  return getAthleteStaticParams()
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const athlete = getAthleteById(slug)
  if (!athlete) return {}
  return { title: athlete.name, description: athlete.summary }
}

export default async function AthletePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const athlete = getAthleteById(slug)
  if (!athlete) notFound()
  const region = getRegion(athlete.regionId)
  const meta = region ? getRegionMeta(region) : undefined
  const category = getSportCategory(athlete)
  const event = getSportEvent(athlete)
  const related = getAthletesForRegion(athlete.regionId)
    .filter((other) => other.id !== athlete.id && getSportSlug(other.sport) === getSportSlug(athlete.sport))
    .sort(compareAthletes)
    .slice(0, 4)

  return (
    <div style={{ ["--accent-region" as string]: meta?.accent }}>
      <section className="hero-surface relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="site-container relative py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-hero-muted">
            <Link href="/athletes" className="hover:text-white">Athletes</Link>
            <ChevronRight className="size-3.5" />
            {region && <><Link href={"/states/" + region.id} className="hover:text-white">{region.name}</Link><ChevronRight className="size-3.5" /></>}
            <span className="text-white">{athlete.name}</span>
          </nav>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            <AthleteAvatar name={athlete.name} accent={meta?.accent} size="lg" />
            <div>
              <p className="eyebrow text-[#FFB366]">{category}{event ? " · " + event : ""}</p>
              <h1 className="mt-2 text-4xl font-bold text-white sm:text-6xl">{athlete.name}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-hero-muted">
                <TierBadge tier={athlete.tier} />
                {region && (
                  <Link href={"/states/" + region.id} className="inline-flex items-center gap-1.5 hover:text-white">
                    <MapPin className="size-4" /> {athlete.hometown ? athlete.hometown + ", " : ""}{region.name}
                  </Link>
                )}
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-hero-muted">{athlete.summary}</p>
        </div>
      </section>

      <div className="site-container grid gap-6 py-12 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold"><Trophy className="size-5 text-gold" /> Career highlights</h2>
          <ol className="mt-6 space-y-3">
            {athlete.highlights.map((item, index) => (
              <li key={item} className="flex gap-4 rounded-xl bg-muted/60 p-4 text-sm leading-6">
                <span className="font-mono text-xs font-semibold text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>
        </section>
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-xl font-bold">Sources</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">Public records supporting this profile.</p>
          <ul className="mt-5 divide-y divide-border">
            {athlete.sources.map((source) => (
              <li key={source.url + source.label} className="py-3">
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 text-sm font-semibold text-india-green hover:underline">
                  {source.label} <ArrowUpRight className="mt-0.5 size-3.5 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-lg bg-muted/60 p-3 text-xs leading-5 text-muted-foreground">This profile is selective and source-linked, not a complete career record.</p>
        </section>
      </div>

      {related.length > 0 && region && (
        <section className="site-container">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold">More {category.toLowerCase()} from {region.name}</h2>
            <Link href={"/states/" + region.id + "#sport=" + encodeURIComponent(category)} className="text-sm font-semibold hover:text-saffron">See all</Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((other) => <AthleteCard key={other.id} athlete={other} accent={meta?.accent} />)}
          </div>
        </section>
      )}

      {region && (
        <div className="site-container mt-10">
          <Link href={"/states/" + region.id} className="inline-flex items-center gap-2 text-sm font-semibold hover:text-saffron">
            <ArrowLeft className="size-4" /> Back to {region.name}
          </Link>
        </div>
      )}
    </div>
  )
}
