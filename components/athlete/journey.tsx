import { Baby, Flag, Medal, Star, Trophy } from "lucide-react"
import type { AthleteRecord } from "@/lib/athlete-data"
import { getAthleteProfile } from "@/lib/athlete-profiles"
import { getAthleteHonours } from "@/components/athlete/honours"

type Step = { year: number; text: string; kind: "born" | "medal" | "award" | "event" }

/** Year-by-year journey built only from the profile's own sourced facts (birth, highlights, story, awards). */
function buildJourney(athlete: AthleteRecord): Step[] {
  const profile = getAthleteProfile(athlete.id)
  const steps: Step[] = []
  const born = Number(profile?.born?.slice(0, 4))
  if (born) steps.push({ year: born, text: `Born${profile?.birthplace ? " in " + profile.birthplace : ""}`, kind: "born" })
  const sentences = [
    ...athlete.highlights,
    ...(profile?.story ?? "").split(/(?<=[.!?])\s+/).slice(0, 12),
  ]
  const seen = new Set<string>()
  for (const s of sentences) {
    const years = [...s.matchAll(/\b(19[0-9]{2}|20[0-2][0-9])\b/g)].map((m) => Number(m[1]))
    const year = years[0]
    if (!year || (born && year <= born)) continue
    const text = s.replace(/\s+/g, " ").trim()
    const key = year + text.slice(0, 40)
    if (seen.has(key) || text.length > 220) continue
    seen.add(key)
    steps.push({ year, text, kind: /\b(gold|silver|bronze|medal|champion)\b/i.test(text) ? "medal" : "event" })
  }
  for (const a of getAthleteHonours(athlete.id)?.awards ?? []) {
    if (a.year) steps.push({ year: Number(a.year), text: `Received the ${a.name}`, kind: "award" })
  }
  return steps.sort((a, b) => a.year - b.year).slice(0, 14)
}

const ICON = { born: Baby, medal: Medal, award: Trophy, event: Flag }

export function JourneyTimeline({ athlete }: { athlete: AthleteRecord }) {
  const steps = buildJourney(athlete)
  if (steps.length < 2) return null
  return (
    <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <h2 className="flex items-center gap-2 text-xl font-bold"><Star className="size-5 text-saffron" /> Journey</h2>
      <ol className="relative mt-6 space-y-5 border-l-2 border-border pl-6">
        {steps.map((step, i) => {
          const Icon = ICON[step.kind]
          return (
            <li key={i} className="relative">
              <span className={"absolute -left-[37px] top-0 flex size-6 items-center justify-center rounded-full ring-4 ring-card " + (step.kind === "medal" ? "bg-gold text-white" : step.kind === "award" ? "bg-saffron text-white" : "bg-muted text-foreground")}>
                <Icon className="size-3.5" />
              </span>
              <p className="font-display text-sm font-bold text-saffron">{step.year}</p>
              <p className="mt-0.5 text-sm leading-6 text-foreground/85">{step.text}</p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
