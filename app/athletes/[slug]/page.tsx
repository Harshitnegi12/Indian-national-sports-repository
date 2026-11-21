import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, MapPin, Trophy } from "lucide-react"
import { InsrHeader } from "@/components/insr-header"
import { getAthleteById, getAthleteStaticParams, getRegionName } from "@/lib/athlete-data"
import { INDIA_REGIONS } from "@/lib/india-sports-data"

export function generateStaticParams() {
  return getAthleteStaticParams()
}

export default async function AthletePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const athlete = getAthleteById(slug)
  if (!athlete) notFound()
  const region = INDIA_REGIONS.find((item) => item.id === athlete.regionId)

  return <main className="min-h-screen bg-background/40 text-foreground">
    <InsrHeader />
    <div className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
      <Link href={"/states/" + athlete.regionId} className="inline-flex items-center gap-2 text-sm font-semibold text-india-green hover:underline"><ArrowLeft size={16}/>Back to {getRegionName(athlete.regionId)}</Link>
      <section className="mt-8 border-b border-border pb-9"><p className="text-xs font-bold uppercase tracking-[0.18em] text-saffron">{athlete.sport}</p><h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ashoka-navy sm:text-6xl">{athlete.name}</h1><p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><MapPin size={17}/>{region?.type}: {getRegionName(athlete.regionId)}</p><p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">{athlete.summary}</p></section>
      <section className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8"><div className="flex items-center gap-3"><Trophy className="text-india-green" size={21}/><h2 className="text-xl font-bold text-ashoka-navy">Verified highlights</h2></div><ul className="mt-5 space-y-3">{athlete.highlights.map((item) => <li key={item} className="rounded-xl bg-muted/60 p-4 text-sm leading-6">{item}</li>)}</ul></section>
      <section className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8"><h2 className="text-xl font-bold text-ashoka-navy">Sources</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Public records used to support the details shown on this profile.</p><ul className="mt-5 divide-y divide-border">{athlete.sources.map((source) => <li key={source.url} className="py-3"><a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-india-green hover:underline">{source.label}<ArrowUpRight size={15}/></a></li>)}</ul></section>
      <p className="mt-6 rounded-xl border border-saffron/30 bg-saffron/5 p-4 text-xs leading-6 text-muted-foreground">The profile is selective and source-linked; it is not a complete career record.</p>
    </div>
  </main>
}
