import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { InsrHeader } from "@/components/insr-header"
import { INDIA_REGIONS } from "@/lib/india-sports-data"
import { getAthletesForRegionSport, getSportCategory, getSportSlug, SPORT_CATEGORIES } from "@/lib/athlete-data"

export function generateStaticParams() {
  return INDIA_REGIONS.flatMap((region) => SPORT_CATEGORIES.map((sport) => ({ id: region.id, sport: getSportSlug(sport) })))
}

export default async function RegionSportPage({ params }: { params: Promise<{ id: string; sport: string }> }) {
  const { id, sport } = await params
  const region = INDIA_REGIONS.find((item) => item.id === id)
  if (!region) notFound()
  const title = SPORT_CATEGORIES.find((item) => getSportSlug(item) === sport)
  if (!title) notFound()
  const athletes = getAthletesForRegionSport(id, sport)

  return <main className="min-h-screen bg-background/40 text-foreground">
    <InsrHeader />
    <section className="border-b border-border bg-gradient-to-br from-white/70 via-background/50 to-emerald-50/40"><div className="mx-auto max-w-6xl px-5 py-10 sm:py-16">
      <Link href={"/states/" + region.id} className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-india-green hover:underline"><ArrowLeft size={16}/>Back to {region.name}</Link>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-saffron">{region.type} · {region.zone}</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ashoka-navy sm:text-5xl">{title} in {region.name}</h1>
      <p className="mt-4 text-sm text-muted-foreground">{athletes.length} source-linked profiles currently listed</p>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">Select a player to open their individual profile, career highlights, and source links.</p>
    </div></section>
    <section className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      {athletes.length ? <div className="grid gap-4 md:grid-cols-2">{athletes.map((athlete) => <Link key={athlete.id} href={"/athletes/" + athlete.id} className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-india-green/40 hover:shadow-md"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-saffron">{athlete.sport}</p><h2 className="mt-2 text-xl font-bold text-ashoka-navy">{athlete.name}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{athlete.summary}</p></div><ArrowUpRight className="shrink-0 text-india-green" size={20}/></div><ul className="mt-4 space-y-2 border-t border-border pt-4">{athlete.highlights.map((item) => <li key={item} className="text-sm leading-6 text-foreground/80">• {item}</li>)}</ul><p className="mt-4 text-xs font-semibold text-india-green">Open profile and sources</p></Link>)}</div> : <div className="rounded-2xl border border-dashed border-border bg-card p-8 sm:p-10"><h2 className="font-semibold text-ashoka-navy">No source-checked {title.toLowerCase()} profiles have been added for {region.name} yet.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">This is a data-collection gap, not a claim that there are no players. The page is ready for verified entries.</p></div>}
      <p className="mt-8 rounded-xl border border-saffron/30 bg-saffron/5 p-4 text-xs leading-6 text-muted-foreground">Current records are selective and source-linked. This is not a complete historical roster.</p>
    </section>
  </main>
}
