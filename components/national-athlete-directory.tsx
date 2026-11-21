"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { Search, X } from "lucide-react"
import { AthleteCard } from "@/components/site/athlete-card"
import { ATHLETES, compareAthletes, getRegionName, getSportCategory, isMedallist } from "@/lib/athlete-data"
import { REGIONS_SORTED } from "@/lib/region-meta"

export function NationalAthleteDirectory({ accents }: { accents: Record<string, string> }) {
  const params = useSearchParams()
  const [query, setQuery] = React.useState(params.get("q") ?? "")
  const [sport, setSport] = React.useState(params.get("sport") ?? "all")
  const [region, setRegion] = React.useState(params.get("region") ?? "all")
  const [medalOnly, setMedalOnly] = React.useState(false)
  const [sort, setSort] = React.useState<"achievement" | "name">("achievement")
  const [limit, setLimit] = React.useState(48)
  React.useEffect(() => setLimit(48), [query, sport, region, medalOnly, sort])

  const sports = React.useMemo(() => Array.from(new Set(ATHLETES.map((athlete) => getSportCategory(athlete)))).sort(), [])

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return ATHLETES.filter((athlete) => sport === "all" || getSportCategory(athlete) === sport)
      .filter((athlete) => region === "all" || athlete.regionId === region)
      .filter((athlete) => !medalOnly || isMedallist(athlete))
      .filter((athlete) => !q || [athlete.name, athlete.sport, athlete.hometown ?? "", getRegionName(athlete.regionId)].join(" ").toLowerCase().includes(q))
      .sort(sort === "name" ? (a, b) => a.name.localeCompare(b.name) : compareAthletes)
  }, [query, sport, region, medalOnly, sort])

  const select = "h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring"

  return (
    <div>
      <div className="grid gap-3 rounded-2xl border border-border bg-card p-4 sm:p-5 md:grid-cols-[1.5fr_1fr_1fr_auto]">
        <label className="relative">
          <span className="sr-only">Search athletes</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, event, hometown or state" className="h-11 w-full rounded-lg border border-input bg-background pl-9 pr-9 text-sm outline-none focus:border-ring" />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"><X className="size-4" /></button>}
        </label>
        <select aria-label="Sport" value={sport} onChange={(event) => setSport(event.target.value)} className={select}>
          <option value="all">All sports</option>
          {sports.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
        <select aria-label="State or UT" value={region} onChange={(event) => setRegion(event.target.value)} className={select}>
          <option value="all">All states &amp; UTs</option>
          {REGIONS_SORTED.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
        <label className="flex h-11 items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm">
          <input type="checkbox" checked={medalOnly} onChange={(event) => setMedalOnly(event.target.checked)} className="size-4 accent-[var(--saffron)]" />
          Medallists only
        </label>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground" aria-live="polite">Showing {filtered.length} of {ATHLETES.length} athletes</p>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Sort
          <select value={sort} onChange={(event) => setSort(event.target.value as "achievement" | "name")} className="h-10 rounded-lg border border-input bg-card px-2 text-foreground">
            <option value="achievement">Top achievements</option>
            <option value="name">Name A–Z</option>
          </select>
        </label>
      </div>

      {filtered.length ? (
        <>
        <motion.div layout className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.slice(0, limit).map((athlete) => (
              <motion.div
                key={athlete.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
                transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.7 }}
              >
                <AthleteCard athlete={athlete} showRegion accent={accents[athlete.regionId]} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      {filtered.length > limit && (
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => setLimit((l) => l + 48)} className="pressable rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-foreground/25">
            Show more ({filtered.length - limit} more)
          </button>
        </div>
      )}
        </>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <p className="font-semibold">No athletes match these filters.</p>
          <button type="button" onClick={() => { setQuery(""); setSport("all"); setRegion("all"); setMedalOnly(false) }} className="mt-3 text-sm font-semibold text-saffron hover:underline">Clear filters</button>
        </div>
      )}
    </div>
  )
}
