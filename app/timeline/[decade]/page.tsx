import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"
import { DECADES, getDecade, getDecadeHeroes } from "@/lib/decades"
import { getRegion, getRegionMeta } from "@/lib/region-meta"
import { AthleteCard } from "@/components/site/athlete-card"
import { SectionHeading } from "@/components/site/section-heading"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/motion-primitives"

export function generateStaticParams() {
  return DECADES.map((d) => ({ decade: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ decade: string }> }): Promise<Metadata> {
  const { decade } = await params
  const d = getDecade(decade)
  return d ? { title: `${d.label} in Indian sport`, description: d.intro } : {}
}

export default async function DecadePage({ params }: { params: Promise<{ decade: string }> }) {
  const { decade: slug } = await params
  const decade = getDecade(slug)
  if (!decade) notFound()
  const index = DECADES.indexOf(decade)
  const prev = DECADES[index - 1]
  const next = DECADES[index + 1]
  const heroes = getDecadeHeroes(decade)

  return (
    <>
      <section className="hero-surface relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <p aria-hidden="true" className="pointer-events-none absolute -right-4 bottom-[-0.2em] select-none font-display text-[10rem] font-bold leading-none text-white/[0.05] sm:text-[16rem]">{decade.label}</p>
        <div className="site-container relative py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-hero-muted"><Link href="/timeline" className="hover:text-white">Timeline</Link><ChevronRight className="size-3.5" /><span className="text-white">{decade.label}</span></nav>
          <Reveal>
            <p className="mt-6 font-display text-6xl font-bold text-[#FFB366] sm:text-7xl">{decade.label}</p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{decade.title}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-hero-muted">{decade.intro}</p>
          </Reveal>
        </div>
      </section>
      <div className="site-container space-y-16 py-12">
        <section>
          <Reveal><SectionHeading eyebrow="Key moments" title="What happened" /></Reveal>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2">
            {decade.events.map((e) => (
              <Reveal key={e.text}><li className="flex gap-4 rounded-2xl border border-border bg-card p-5"><span className="font-display text-2xl font-bold text-saffron">{e.year}</span><span className="pt-1 text-[15px] leading-6">{e.text}</span></li></Reveal>
            ))}
          </ol>
        </section>
        {heroes.length > 0 && (
          <section>
            <Reveal><SectionHeading eyebrow="Heroes" title={`Heroes of the ${decade.label}`} text="Athletes who were in their mid-twenties during this decade." /></Reveal>
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {heroes.map((a) => <StaggerItem key={a.id}><AthleteCard athlete={a} showRegion accent={getRegionMeta(getRegion(a.regionId)!).accent} /></StaggerItem>)}
            </Stagger>
          </section>
        )}
        <div className="grid grid-cols-2 gap-3">
          {prev ? <Link href={"/timeline/" + prev.slug} className="group rounded-2xl border border-border bg-card p-5 transition hover:border-foreground/25"><span className="flex items-center gap-1 text-xs text-muted-foreground"><ArrowLeft className="size-3.5" /> Previous</span><span className="mt-1 block font-display text-2xl font-bold group-hover:text-saffron">{prev.label}</span></Link> : <span />}
          {next && <Link href={"/timeline/" + next.slug} className="group rounded-2xl border border-border bg-card p-5 text-right transition hover:border-foreground/25"><span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">Next <ArrowRight className="size-3.5" /></span><span className="mt-1 block font-display text-2xl font-bold group-hover:text-saffron">{next.label}</span></Link>}
        </div>
      </div>
    </>
  )
}
