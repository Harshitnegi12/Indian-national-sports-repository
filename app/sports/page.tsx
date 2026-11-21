import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ATHLETES, SPORT_HINDI, getSportCounts, isMedallist, getSportCategory } from "@/lib/athlete-data"
import { getSportInfo } from "@/lib/sports-info"
import { PageHero } from "@/components/site/page-hero"
import { Stagger, StaggerItem } from "@/components/motion/motion-primitives"

export const metadata: Metadata = { title: "Sports", description: "Every sport in the directory: history in India, the basic rules and India's top players." }

export default function SportsPage() {
  const sports = getSportCounts(ATHLETES)
  return (
    <>
      <PageHero eyebrow="Sports" title="Explore every sport" hindi="हर खेल की कहानी" text="History, rules and India's greatest players for each sport, from cricket and hockey to kabaddi and chess." />
      <div className="site-container py-12">
        <Stagger gap={0.03} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sports.map(({ sport, slug, count }) => {
            const info = getSportInfo(sport)
            const medallists = ATHLETES.filter((a) => getSportCategory(a) === sport && isMedallist(a)).length
            return (
              <StaggerItem key={slug}>
                <Link href={"/sports/" + slug} className="group spotlight card-lift pressable flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-bold group-hover:text-saffron">{sport}</h2>
                      <p className="font-hindi text-muted-foreground">{SPORT_HINDI[sport] ?? ""}</p>
                    </div>
                    <span className="rounded-lg bg-muted px-2.5 py-1 font-mono text-xs">{count}</span>
                  </div>
                  {info && <p className="mt-3 text-sm leading-6 text-foreground/80">{info.tagline}</p>}
                  <div className="mt-auto flex items-center justify-between pt-5 text-sm">
                    <span className="text-muted-foreground">{medallists ? `${medallists} Olympic/Para medallists` : `${count} athletes`}</span>
                    <span className="inline-flex items-center gap-1 font-semibold">Open <ArrowRight className="size-4 transition group-hover:translate-x-0.5" /></span>
                  </div>
                </Link>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </>
  )
}
