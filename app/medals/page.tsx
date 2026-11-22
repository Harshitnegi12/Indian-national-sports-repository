import type { Metadata } from "next"
import Link from "next/link"
import { OLYMPIC_MEDALS, type Medal } from "@/lib/olympic-medals"
import { getAthleteById } from "@/lib/athlete-data"
import { PageHero } from "@/components/site/page-hero"
import { AthleteAvatar } from "@/components/site/athlete-card"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/motion-primitives"

export const metadata: Metadata = { title: "Olympic medal wall", description: "Every Olympic medal India has won, from Paris 1900 to Paris 2024." }

const STYLE: Record<Medal, { ring: string; label: string; fill: string }> = {
  gold: { ring: "ring-[#D4A72C]", label: "Gold", fill: "linear-gradient(135deg,#F6D365,#C9971C)" },
  silver: { ring: "ring-[#A8B0BB]", label: "Silver", fill: "linear-gradient(135deg,#E6E9EE,#9AA3AE)" },
  bronze: { ring: "ring-[#B8733A]", label: "Bronze", fill: "linear-gradient(135deg,#E5A46B,#9C5B28)" },
}

export default function MedalWallPage() {
  const games = [...new Set(OLYMPIC_MEDALS.map((m) => m.year))]
  const count = (m: Medal) => OLYMPIC_MEDALS.filter((x) => x.medal === m).length
  return (
    <>
      <PageHero eyebrow="Medal wall" title="Every Indian Olympic medal" hindi="ओलंपिक पदक दीवार" text={`${OLYMPIC_MEDALS.length} medals: ${count("gold")} gold, ${count("silver")} silver and ${count("bronze")} bronze, from Norman Pritchard in 1900 to Paris 2024.`} />
      <div className="site-container space-y-14 py-12">
        {games.reverse().map((year) => {
          const medals = OLYMPIC_MEDALS.filter((m) => m.year === year)
          return (
            <section key={year}>
              <Reveal>
                <div className="flex items-baseline gap-3 border-b border-border pb-3">
                  <h2 className="font-display text-4xl font-bold">{year}</h2>
                  <span className="text-muted-foreground">{medals[0].city}{year === 2021 ? " (Tokyo 2020)" : ""}</span>
                  <span className="ml-auto text-sm text-muted-foreground">{medals.length} {medals.length === 1 ? "medal" : "medals"}</span>
                </div>
              </Reveal>
              <Stagger className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {medals.map((m) => {
                  const athletes = (m.athletes ?? []).map((id) => getAthleteById(id)).filter(Boolean)
                  const first = athletes[0]
                  const body = (
                    <div className="group spotlight card-lift flex h-full items-center gap-4 rounded-2xl border border-border bg-card p-4">
                      <span className={"flex size-14 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold text-white ring-4 ring-offset-2 ring-offset-card " + STYLE[m.medal].ring} style={{ background: STYLE[m.medal].fill }}>{STYLE[m.medal].label}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold group-hover:text-saffron">{m.winner}</p>
                        <p className="truncate text-sm text-muted-foreground">{m.sport} · {m.event}</p>
                      </div>
                      {first && <AthleteAvatar name={first.name} photo={first.photo} />}
                    </div>
                  )
                  return <StaggerItem key={m.year + m.event + m.winner}>{first ? <Link href={"/athletes/" + first.id}>{body}</Link> : body}</StaggerItem>
                })}
              </Stagger>
            </section>
          )
        })}
      </div>
    </>
  )
}
