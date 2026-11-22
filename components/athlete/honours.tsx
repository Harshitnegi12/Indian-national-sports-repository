import { Award, BriefcaseBusiness } from "lucide-react"
import honours from "@/lib/data/athlete-honours.json"

// Awards, employers and military rank from Wikidata (scripts/fetch-athlete-socials.js).

type Honours = { awards?: { name: string; year?: string }[]; employers?: { name: string; from?: string }[]; rank?: string[] }

export function getAthleteHonours(id: string): Honours | undefined {
  return (honours as Record<string, Honours>)[id]
}

const MAJOR = /Khel Ratna|Arjuna|Padma|Dronacharya|Dhyan Chand|Bharat Ratna|Wisden|ICC|Laureus/i

export function AwardsSection({ id }: { id: string }) {
  const h = getAthleteHonours(id)
  if (!h?.awards?.length) return null
  return (
    <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <h2 className="flex items-center gap-2 text-xl font-bold"><Award className="size-5 text-gold" /> Awards &amp; honours</h2>
      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {h.awards.map((a) => (
          <li key={a.name + a.year} className={"flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm " + (MAJOR.test(a.name) ? "bg-gold/12 font-semibold" : "bg-muted/60")}>
            <span>{a.name}</span>
            {a.year && <span className="font-mono text-xs text-muted-foreground">{a.year}</span>}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">Source: Wikidata.</p>
    </section>
  )
}

export function CareerJobSection({ id }: { id: string }) {
  const h = getAthleteHonours(id)
  if (!h?.employers?.length && !h?.rank?.length) return null
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="flex items-center gap-2 text-lg font-bold"><BriefcaseBusiness className="size-5" /> Job &amp; rank</h2>
      <dl className="mt-3 divide-y divide-border text-sm">
        {h.rank?.map((r) => (
          <div key={r} className="flex gap-3 py-2.5"><dt className="w-24 shrink-0 text-muted-foreground">Rank</dt><dd className="font-medium">{r}</dd></div>
        ))}
        {h.employers?.map((e) => (
          <div key={e.name} className="flex gap-3 py-2.5"><dt className="w-24 shrink-0 text-muted-foreground">Employer</dt><dd className="font-medium">{e.name}{e.from ? <span className="text-muted-foreground"> · since {e.from}</span> : null}</dd></div>
        ))}
      </dl>
      <p className="mt-2 text-xs text-muted-foreground">Many athletes hold sports-quota posts with the Army, Railways, Police or public companies. Source: Wikidata.</p>
    </section>
  )
}
