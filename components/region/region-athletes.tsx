"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { AthleteCard } from "@/components/site/athlete-card"
import { compareAthletes, getSportCategory, type AthleteRecord } from "@/lib/athlete-data"

type Sort = "achievement" | "name"

/** All athletes of one region with sport tabs, search and sort. */
export function RegionAthletes({
  athletes,
  sports,
  accent,
  regionName,
}: {
  athletes: AthleteRecord[]
  sports: { sport: string; hindi: string; count: number }[]
  accent: string
  regionName: string
}) {
  const [sport, setSport] = React.useState("all")
  const [query, setQuery] = React.useState("")
  const [sort, setSort] = React.useState<Sort>("achievement")

  // Allow deep links such as /states/haryana#sport=wrestling
  React.useEffect(() => {
    function applyHash() {
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
    const q = query.trim().toLowerCase()
    return athletes
      .filter((athlete) => sport === "all" || getSportCategory(athlete) === sport)
      .filter((athlete) => !q || [athlete.name, athlete.sport, athlete.hometown ?? ""].join(" ").toLowerCase().includes(q))
      .sort(sort === "name" ? (a, b) => a.name.localeCompare(b.name) : compareAthletes)
  }, [athletes, sport, query, sort])

  return (
    <div>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="toolbar" aria-label="Filter by sport">
        <button type="button" className="chip" aria-pressed={sport === "all"} onClick={() => setSport("all")}>
          All sports <span className="font-mono text-[11px] opacity-70">{athletes.length}</span>
        </button>
        {sports.map((item) => (
          <button key={item.sport} type="button" className="chip" aria-pressed={sport === item.sport} onClick={() => setSport(item.sport)}>
            {item.sport}
            <span className="hidden font-hindi text-xs opacity-60 sm:inline">{item.hindi}</span>
            <span className="font-mono text-[11px] opacity-70">{item.count}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative block w-full sm:max-w-sm">
          <span className="sr-only">Search {regionName} athletes</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, event or hometown"
            className="h-10 w-full rounded-lg border border-input bg-card pl-9 pr-9 text-sm outline-none transition focus:border-ring"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <X className="size-4" />
            </button>
          )}
        </label>
        <div className="flex items-center gap-3 sm:ml-auto">
          <span className="text-sm text-muted-foreground" aria-live="polite">{visible.length} {visible.length === 1 ? "athlete" : "athletes"}</span>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            Sort
            <select value={sort} onChange={(event) => setSort(event.target.value as Sort)} className="h-10 rounded-lg border border-input bg-card px-2 text-sm text-foreground">
              <option value="achievement">Top achievements</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
        </div>
      </div>

      {visible.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((athlete) => (
            <AthleteCard key={athlete.id} athlete={athlete} accent={accent} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <p className="font-semibold">No athletes match these filters.</p>
          <button type="button" onClick={() => { setSport("all"); setQuery("") }} className="mt-3 text-sm font-semibold text-saffron hover:underline">Clear filters</button>
        </div>
      )}
    </div>
  )
}
