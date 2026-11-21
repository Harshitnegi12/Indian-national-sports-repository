import type { Metadata } from "next"
import Link from "next/link"
import { Crown } from "lucide-react"
import { INDIA_REGIONS } from "@/lib/india-sports-data"
import { ATHLETES, getSportCategory, getSportCounts } from "@/lib/athlete-data"
import { getRegion } from "@/lib/region-meta"
import { PageHero } from "@/components/site/page-hero"
import { SectionHeading } from "@/components/site/section-heading"
import { StateBars, type StateBarRow } from "@/components/charts/state-bars"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/motion-primitives"

export const metadata: Metadata = { title: "State rankings & medal tally", description: "Which state leads in which sport: medallists, world champions and athletes listed by state." }

export default function RankingsPage() {
  const rows: StateBarRow[] = INDIA_REGIONS.map((region) => {
    const list = ATHLETES.filter((a) => a.regionId === region.id)
    return {
      id: region.id,
      name: region.name,
      values: {
        olympic: list.filter((a) => a.tier === "olympic-medal").length,
        paralympic: list.filter((a) => a.tier === "paralympic-medal").length,
        world: list.filter((a) => a.tier === "world-champion").length,
        international: list.filter((a) => a.tier && a.tier !== "national").length,
        all: list.length,
      },
    }
  })

  const sports = getSportCounts(ATHLETES).slice(0, 14)
  const matrix = new Map<string, number>()
  for (const a of ATHLETES) {
    const key = a.regionId + "|" + getSportCategory(a)
    matrix.set(key, (matrix.get(key) ?? 0) + 1)
  }
  const leaders = sports.map(({ sport, slug }) => {
    let best = { id: "", count: 0 }
    for (const region of INDIA_REGIONS) {
      const count = matrix.get(region.id + "|" + sport) ?? 0
      if (count > best.count) best = { id: region.id, count }
    }
    return { sport, slug, region: getRegion(best.id), count: best.count }
  })
  const heatRegions = [...rows].sort((a, b) => b.values.all - a.values.all).slice(0, 18)
  const heatMax = Math.max(1, ...heatRegions.flatMap((r) => sports.map((s) => matrix.get(r.id + "|" + s.sport) ?? 0)))

  return (
    <>
      <PageHero eyebrow="Rankings" title="State rankings & medal tally" hindi="राज्यों की रैंकिंग" text="Which state produces the most Olympic and Paralympic medallists, world champions and international athletes, and who leads in each sport." />
      <div className="site-container space-y-20 py-12">
        <section>
          <Reveal><SectionHeading eyebrow="Medal tally" title="Medallists by state" text="Counts of athletes listed in this directory at each level, by their state. An athlete is counted once, at their highest level." /></Reveal>
          <Reveal className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <StateBars
              rows={rows}
              color="var(--gold)"
              measures={[
                { key: "olympic", label: "Olympic medallists" },
                { key: "paralympic", label: "Paralympic medallists" },
                { key: "world", label: "World champions" },
                { key: "international", label: "International athletes" },
                { key: "all", label: "All athletes" },
              ]}
            />
          </Reveal>
        </section>

        <section>
          <Reveal><SectionHeading eyebrow="Sport leaders" title="Who leads in which sport" /></Reveal>
          <Stagger gap={0.03} className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.filter((l) => l.region).map((l) => (
              <StaggerItem key={l.slug}>
                <Link href={`/sports/${l.slug}`} className="group spotlight card-lift pressable flex h-full items-center gap-3 rounded-2xl border border-border bg-card p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold/15"><Crown className="size-5 text-[color-mix(in_oklch,var(--gold)_70%,var(--foreground))]" /></span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted-foreground">{l.sport}</span>
                    <span className="block truncate font-semibold group-hover:text-saffron">{l.region!.name}</span>
                    <span className="block text-xs text-muted-foreground">{l.count} athletes</span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <section>
          <Reveal><SectionHeading eyebrow="Heatmap" title="States × sports" text="Darker cells mean more athletes listed. Hover a cell for the exact number." /></Reveal>
          <Reveal className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card p-4 sm:p-6">
            <table className="w-full border-separate border-spacing-[2px] text-xs">
              <thead>
                <tr>
                  <th className="sticky left-0 bg-card p-2 text-left font-medium text-muted-foreground">State</th>
                  {sports.map((s) => <th key={s.slug} className="p-1 align-bottom font-medium text-muted-foreground"><span className="block w-10 origin-bottom-left -rotate-45 whitespace-nowrap text-left">{s.sport}</span></th>)}
                </tr>
              </thead>
              <tbody>
                {heatRegions.map((r) => (
                  <tr key={r.id}>
                    <th className="sticky left-0 whitespace-nowrap bg-card p-2 text-left font-medium"><Link href={"/states/" + r.id} className="hover:text-saffron">{r.name}</Link></th>
                    {sports.map((s) => {
                      const v = matrix.get(r.id + "|" + s.sport) ?? 0
                      const strength = v ? 0.15 + 0.85 * Math.sqrt(v / heatMax) : 0
                      return (
                        <td key={s.slug} title={`${r.name} · ${s.sport}: ${v}`} className="h-8 min-w-10 rounded-[4px] text-center font-mono tabular-nums transition hover:ring-2 hover:ring-foreground/40" style={{ background: v ? `color-mix(in oklch, var(--saffron) ${Math.round(strength * 100)}%, var(--muted))` : "var(--muted)", color: strength > 0.6 ? "white" : "var(--muted-foreground)" }}>
                          {v || ""}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </section>
        <p className="text-xs text-muted-foreground">Rankings reflect athletes listed in this directory, which is still growing; they are not official medal tables.</p>
      </div>
    </>
  )
}
