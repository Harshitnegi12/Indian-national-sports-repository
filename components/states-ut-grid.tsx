"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Search, X } from "lucide-react"
import { INDIA_REGIONS, type ZoneType } from "@/lib/india-sports-data"

export interface RegionCardData {
  id: string
  name: string
  hindi: string
  code: string
  type: string
  zone: ZoneType
  capital: string
  accent: string
  count: number
  medallists: number
  athleteText: string
}

const ZONES: ("All zones" | ZoneType)[] = ["All zones", "North", "North-East", "East", "Central", "West", "South", "Coastal & Islands"]

export function StatesUtGrid({ regions }: { regions: RegionCardData[] }) {
  const params = useSearchParams()
  const [query, setQuery] = React.useState(params.get("search") ?? "")
  const [type, setType] = React.useState<"all" | "State" | "Union Territory">("all")
  const [zone, setZone] = React.useState<"All zones" | ZoneType>("All zones")
  const [sortBy, setSortBy] = React.useState<"alphabetical" | "profiles">("alphabetical")

  const stateCount = INDIA_REGIONS.filter((region) => region.type === "State").length
  const utCount = INDIA_REGIONS.length - stateCount

  const visible = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return regions
      .filter((region) => type === "all" || region.type === type)
      .filter((region) => zone === "All zones" || region.zone === zone)
      .filter((region) => !q || [region.name, region.code, region.capital, region.zone, region.hindi, region.athleteText].join(" ").toLowerCase().includes(q))
      .sort((a, b) => (sortBy === "profiles" ? b.count - a.count || a.name.localeCompare(b.name) : a.name.localeCompare(b.name)))
  }, [regions, query, type, zone, sortBy])

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative block w-full md:max-w-md">
            <span className="sr-only">Search regions and athletes</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a state, capital or athlete"
              className="h-11 w-full rounded-lg border border-input bg-background pl-9 pr-9 text-sm outline-none focus:border-ring"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"><X className="size-4" /></button>
            )}
          </label>
          <div className="inline-flex rounded-lg border border-border bg-muted p-1">
            {([["all", "All", INDIA_REGIONS.length], ["State", "States", stateCount], ["Union Territory", "UTs", utCount]] as const).map(([value, label, count]) => (
              <button key={value} type="button" onClick={() => setType(value)} aria-pressed={type === value} className={"rounded-md px-3 py-1.5 text-sm font-medium transition " + (type === value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                {label} <span className="font-mono text-[11px] opacity-60">{count}</span>
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground md:ml-auto">
            Sort
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value as "alphabetical" | "profiles")} className="h-10 rounded-lg border border-input bg-background px-2 text-foreground">
              <option value="alphabetical">A to Z</option>
              <option value="profiles">Most athletes</option>
            </select>
          </label>
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {ZONES.map((item) => (
            <button key={item} type="button" className="chip text-[13px]" aria-pressed={zone === item} onClick={() => setZone(item)}>{item}</button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">Showing {visible.length} of {regions.length} states and union territories</p>

      {visible.length ? (
        <motion.div layout className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((region) => (
            <motion.div
              key={region.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.7 }}
            >
            <Link href={"/states/" + region.id} className="group spotlight card-lift pressable relative flex h-full min-h-52 flex-col overflow-hidden rounded-2xl border border-border bg-card p-5" style={{ ["--accent-card" as string]: region.accent }}>
              <span className="absolute inset-x-0 top-0 h-1" style={{ background: region.accent }} />
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] font-semibold text-foreground/70">{region.code}</span>
                <span className="text-xs font-medium text-muted-foreground">{region.type === "State" ? "State" : "Union Territory"}</span>
              </div>
              <h2 className="mt-4 text-xl font-bold leading-tight group-hover:text-saffron">{region.name}</h2>
              <p className="font-hindi text-sm text-muted-foreground">{region.hindi}</p>
              <p className="mt-2 text-xs text-muted-foreground">{region.zone} · {region.capital}</p>
              <div className="mt-auto flex items-end justify-between border-t border-border pt-4">
                <div>
                  <p className="font-display text-2xl font-bold">{region.count}</p>
                  <p className="text-[11px] text-muted-foreground">{region.medallists ? `athletes · ${region.medallists} medallists` : "athletes listed"}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground group-hover:text-foreground">Open <ArrowUpRight className="size-3.5" /></span>
              </div>
            </Link>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <p className="font-semibold">No state, capital or athlete matches your search.</p>
          <button type="button" onClick={() => { setType("all"); setZone("All zones"); setQuery("") }} className="mt-3 text-sm font-semibold text-saffron hover:underline">Reset filters</button>
        </div>
      )}
    </div>
  )
}
