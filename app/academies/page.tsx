import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { ACADEMIES, HOW_TO_START } from "@/lib/academies"
import { getRegionExtras } from "@/lib/region-extras"
import { getAthleteById } from "@/lib/athlete-data"
import { REGIONS_SORTED } from "@/lib/region-meta"
import { PageHero } from "@/components/site/page-hero"
import { SectionHeading } from "@/components/site/section-heading"
import { AcademyFinder, type AcademyView } from "@/components/academies/academy-finder"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/motion-primitives"

export const metadata: Metadata = { title: "Academies & how to start", description: "Sports academies and training centres across India, and a step-by-step guide for young athletes." }

export default function AcademiesPage() {
  const name = (id: string) => REGIONS_SORTED.find((r) => r.id === id)?.name ?? id
  // Haryana's hand-written academy list is included too
  const haryana = getRegionExtras("haryana").academies.map((a) => ({ name: a.name, regionId: "haryana", city: a.place, sports: a.sports, type: a.name.startsWith("SAI") || a.name.includes("Khelo India") ? "Government" : "Private", description: a.description, url: a.url ?? "https://haryanasports.gov.in/" }) as const)
  const all: AcademyView[] = [...ACADEMIES, ...haryana].map((a) => ({
    ...a,
    type: a.type as AcademyView["type"],
    regionName: name(a.regionId),
    alumniNames: ("alumni" in a && a.alumni ? a.alumni : []).map((id) => getAthleteById(id)).filter(Boolean).map((p) => ({ id: p!.id, name: p!.name })),
  }))
  const sports = [...new Set(all.flatMap((a) => a.sports))].sort()
  const states = REGIONS_SORTED.filter((r) => all.some((a) => a.regionId === r.id)).map((r) => ({ id: r.id, name: r.name }))

  return (
    <>
      <PageHero eyebrow="Academies" title="Where to train" hindi="अकादमियां और शुरुआत" text="Government centres, services institutes and well-known private academies across India, plus a simple guide for young athletes who want to start." />
      <div className="site-container space-y-16 py-12">
        <section>
          <Reveal><SectionHeading eyebrow="How to start" title="Your path into sport" titleHi="खेल में शुरुआत कैसे करें" text="The usual route for a young athlete in India, step by step." /></Reveal>
          <Stagger className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {HOW_TO_START.map((step, i) => (
              <StaggerItem key={step.title}>
                <article className="h-full rounded-2xl border border-border bg-card p-6">
                  <span className="font-display text-3xl font-bold text-saffron">{i + 1}</span>
                  <h3 className="mt-2 font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{step.text}</p>
                  {step.link && <a href={step.link.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-india-green hover:underline">{step.link.label} <ArrowUpRight className="size-3.5" /></a>}
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
        <section>
          <Reveal><SectionHeading eyebrow="Find an academy" title="Academies across India" titleHi="भारत की अकादमियां" /></Reveal>
          <div className="mt-8"><AcademyFinder academies={all} states={states} sports={sports} /></div>
        </section>
        <p className="text-xs text-muted-foreground">Contact details change often: please confirm trials and admissions on the official site before visiting.</p>
      </div>
    </>
  )
}
