"use client"

import * as React from "react"
import { AnimatePresence, LayoutGroup, motion } from "motion/react"
import { Search, X } from "lucide-react"
import { AthleteCard } from "@/components/site/athlete-card"
import { compareAthletes, getSportCategory, type AthleteRecord } from "@/lib/athlete-data"

type Sort = "achievement" | "name"

/** All athletes of one region with sport tabs, search and sort; results animate as filters change. */
export function RegionAthletes({
  athletes,
  sports,
  accent,
  regionName,
  districtOf = {},
}: {
  athletes: AthleteRecord[]
  sports: { sport: string; hindi: string; count: number }[]
  accent: string
  regionName: string
  districtOf?: Record<string, string>
}) {
  const [district, setDistrict] = React.useState<string | null>(null)
  const [sport, setSport] = React.useState("all")
  const [query, setQuery] = React.useState("")
  const [sort, setSort] = React.useState<Sort>("achievement")
  const [limit, setLimit] = React.useState(24)
  const deferredQuery = React.useDeferredValue(query)
  React.useEffect(() => setLimit(24), [sport, deferredQuery, sort])

  // Allow deep links such as /states/haryana#sport=Wrestling
  React.useEffect(() => {
    function applyHash() {
      const districtMatch = window.location.hash.match(/district=([^&]+)/)
      if (districtMatch) {
        setDistrict(decodeURIComponent(districtMatch[1]))
        window.setTimeout(() => document.getElementById("athletes")?.scrollIntoView({ block: "start" }), 150)
        return
      }
      const match = window.location.hash.match(/sport=([^&]+)/)
      if (!match) return
      const wanted = decodeURIComponent(match[1]).toLowerCase()
      const found = sports.find((item) => item.sport.toLowerCase() === wanted || item.sport.toLowerCase().replace(/\s+/g, "-") === wanted)
      if (found) {
        setSport(found.sport)
        // Wait for Next.js to finish its own scroll handling after navigation.
        window.setTimeout(() => document.getElementById("athletes")?.scrollIntoView({ block: "start" }), 150)
      }
    }
    applyHash()
    window.addEventListener("hashchange", applyHash)
    return () => window.removeEventListener("hashchange", applyHash)
  }, [sports])

  const visible = React.useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    return athletes
      .filter((athlete) => sport === "all" || getSportCategory(athlete) === sport)
      .filter((athlete) => !district || districtOf[athlete.id] === district)
      .filter((athlete) => !q || [athlete.name, athlete.sport, athlete.hometown ?? ""].join(" ").toLowerCase().includes(q))
      .sort(sort === "name" ? (a, b) => a.name.localeCompare(b.name) : compareAthletes)
  }, [athletes, sport, deferredQuery, sort, district, districtOf])

  const chips = [{ sport: "all", hindi: "", count: athletes.length }, ...sports]

  return (
    <div>
      <LayoutGroup id="sport-chips">
        <div className="no-scrollbar snap-rail -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="toolbar" aria-label="Filter by sport">
          {chips.map((item) => {
            const active = sport === item.sport
            return (
              <button
                key={item.sport}
                type="button"
                aria-pressed={active}
                onClick={() => setSport(item.sport)}
                className={"pressable relative inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors " + (active ? "border-transparent text-background" : "border-border bg-card text-foreground/80 hover:border-foreground/25 hover:text-foreground")}
              >
                {active && <motion.span layoutId="chip-pill" className="absolute inset-0 -z-0 rounded-full bg-foreground" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
                <span className="relative">{item.sport === "all" ? "All sports" : item.sport}</span>
                {item.hindi && <span className="relative hidden font-hindi text-xs opacity-60 sm:inline">{item.hindi}</span>}
                <span className="relative font-mono text-[11px] opacity-70">{item.count}</span>
              </button>
            )
          })}
        </div>
      </LayoutGroup>

      {district && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">District:</span>
          <button type="button" onClick={() => { setDistrict(null); history.replaceState(null, "", window.location.pathname) }} className="pressable inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1 font-medium text-background">
            {district} <X className="size-3.5" />
          </button>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative block w-full sm:max-w-sm">
          <span className="sr-only">Search {regionName} athletes</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, event or hometown"
            className="h-11 w-full rounded-xl border border-input bg-card pl-9 pr-9 text-sm outline-none transition focus:border-ring focus:ring-4 focus:ring-ring/15"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          )}
        </label>
        <div className="flex items-center gap-3 sm:ml-auto">
          <span className="text-sm text-muted-foreground" aria-live="polite">
            <motion.span key={visible.length} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="inline-block font-semibold text-foreground">{visible.length}</motion.span>{" "}
            {visible.length === 1 ? "athlete" : "athletes"}
          </span>
          <div className="inline-flex rounded-xl border border-border bg-muted p-1 text-sm" role="group" aria-label="Sort">
            {(["achievement", "name"] as const).map((value) => (
              <button key={value} type="button" aria-pressed={sort === value} onClick={() => setSort(value)} className={"relative rounded-lg px-3 py-1.5 font-medium transition-colors " + (sort === value ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
                {sort === value && <motion.span layoutId="sort-pill" className="absolute inset-0 rounded-lg bg-card shadow-sm" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
                <span className="relative">{value === "achievement" ? "Top" : "A–Z"}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.slice(0, limit).map((athlete) => (
            <motion.div
              key={athlete.id}
              layout
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.7 }}
            >
              <AthleteCard athlete={athlete} accent={accent} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {visible.length > limit && (
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => setLimit((l) => l + 24)} className="pressable rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-foreground/25">
            Show more ({visible.length - limit} more)
          </button>
        </div>
      )}

      <AnimatePresence>
        {!visible.length && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <p className="font-semibold">No athletes match these filters.</p>
            <button type="button" onClick={() => { setSport("all"); setQuery("") }} className="mt-3 text-sm font-semibold text-saffron hover:underline">Clear filters</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
