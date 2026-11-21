import Link from "next/link"
import { ArrowUpRight, MapPin } from "lucide-react"
import {
  TIER_LABEL,
  getInitials,
  getRegionName,
  getSportCategory,
  getSportEvent,
  type AthleteRecord,
  type AthleteTier,
} from "@/lib/athlete-data"

const TIER_STYLE: Record<AthleteTier, string> = {
  "olympic-medal": "bg-gold/15 text-[color-mix(in_oklch,var(--gold)_70%,var(--foreground))] ring-gold/30",
  "paralympic-medal": "bg-sky-500/12 text-sky-700 ring-sky-500/25 dark:text-sky-300",
  "world-champion": "bg-saffron/12 text-saffron ring-saffron/25",
  international: "bg-india-green/10 text-india-green ring-india-green/20",
  national: "bg-muted text-muted-foreground ring-border",
}

export function TierBadge({ tier }: { tier?: AthleteTier }) {
  if (!tier) return null
  return (
    <span className={"inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset " + TIER_STYLE[tier]}>
      {(tier === "olympic-medal" || tier === "paralympic-medal") && <span aria-hidden="true">●</span>}
      {TIER_LABEL[tier]}
    </span>
  )
}

export function AthleteAvatar({ name, accent, size = "md" }: { name: string; accent?: string; size?: "md" | "lg" }) {
  return (
    <span
      aria-hidden="true"
      className={"flex shrink-0 items-center justify-center rounded-xl font-display font-bold text-white shadow-sm transition duration-300 group-hover:-rotate-3 group-hover:scale-105 " + (size === "lg" ? "size-14 text-lg" : "size-11 text-sm")}
      style={{ background: `linear-gradient(135deg, ${accent ?? "#13234A"}, color-mix(in oklch, ${accent ?? "#13234A"} 55%, #0B1120))` }}
    >
      {getInitials(name)}
    </span>
  )
}

export function AthleteCard({ athlete, accent, showRegion = false }: { athlete: AthleteRecord; accent?: string; showRegion?: boolean }) {
  const event = getSportEvent(athlete)
  return (
    <Link
      href={"/athletes/" + athlete.id}
      className="group spotlight card-lift pressable flex h-full flex-col rounded-2xl border border-border bg-card p-5"
      style={{ ["--accent-card" as string]: accent }}
    >
      <div className="flex items-start justify-between gap-3">
        <AthleteAvatar name={athlete.name} accent={accent} />
        <TierBadge tier={athlete.tier} />
      </div>
      <h3 className="mt-4 text-lg font-bold leading-snug group-hover:text-saffron">{athlete.name}</h3>
      <p className="mt-0.5 text-sm font-medium text-foreground/70">
        {getSportCategory(athlete)}
        {event && <span className="text-muted-foreground"> · {event}</span>}
      </p>
      {(athlete.hometown || showRegion) && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          <span className="truncate">{showRegion ? getRegionName(athlete.regionId) : athlete.hometown}</span>
        </p>
      )}
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-foreground/80">{athlete.highlights[0]}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold text-muted-foreground group-hover:text-foreground">
        View profile <ArrowUpRight className="size-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}
