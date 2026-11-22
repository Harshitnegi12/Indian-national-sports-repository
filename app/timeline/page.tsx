import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { DECADES, getDecadeHeroes } from "@/lib/decades"
import { PageHero } from "@/components/site/page-hero"
import { AthleteAvatar } from "@/components/site/athlete-card"
import { Reveal } from "@/components/motion/motion-primitives"

export const metadata: Metadata = { title: "Timeline", description: "Indian sport decade by decade since 1947: key moments and the heroes of each era." }

export default function TimelinePage() {
  return (
    <>
      <PageHero eyebrow="Timeline" title="Indian sport, decade by decade" hindi="दशक दर दशक" text="From hockey gold in 1948 to a world chess champion in 2024. Scroll through the moments and heroes of every era." />
      <div className="site-container py-14">
        <ol className="relative space-y-10 border-l-2 border-border pl-8 sm:pl-12">
          {DECADES.map((decade) => {
            const heroes = getDecadeHeroes(decade, 6)
            return (
              <li key={decade.slug} className="relative">
                <span className="absolute -left-[42px] top-1 flex size-5 items-center justify-center rounded-full border-4 border-background bg-saffron sm:-left-[58px]" aria-hidden="true" />
                <Reveal>
                  <Link href={"/timeline/" + decade.slug} className="group spotlight card-lift pressable block rounded-2xl border border-border bg-card p-6 sm:p-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <p className="font-display text-5xl font-bold text-saffron">{decade.label}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold group-hover:text-saffron">Open decade <ArrowRight className="size-4 transition group-hover:translate-x-0.5" /></span>
                    </div>
                    <h2 className="mt-2 text-2xl font-bold">{decade.title}</h2>
                    <p className="mt-2 max-w-3xl text-[15px] leading-7 text-foreground/80">{decade.intro}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {decade.events.slice(0, 4).map((e) => <li key={e.text} className="rounded-full bg-muted px-3 py-1 text-xs"><strong className="mr-1">{e.year}</strong>{e.text}</li>)}
                    </ul>
                    {heroes.length > 0 && (
                      <div className="mt-5 flex items-center gap-3">
                        <div className="flex -space-x-2">{heroes.map((h) => <span key={h.id} className="rounded-xl ring-2 ring-card"><AthleteAvatar name={h.name} photo={h.photo} /></span>)}</div>
                        <span className="text-xs text-muted-foreground">Heroes of the decade</span>
                      </div>
                    )}
                  </Link>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </>
  )
}
