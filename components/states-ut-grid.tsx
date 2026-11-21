"use client"

import * as React from "react"
import Link from "next/link"
import { INDIA_REGIONS, type ZoneType } from "@/lib/india-sports-data"
import { getAthletesForRegion } from "@/lib/athlete-data"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowUpRight, Filter, MapPin, Search, X } from "lucide-react"

interface StatesUtGridProps {
  externalSearchQuery: string
  onExternalSearchChange: (query: string) => void
}

const ZONES: ("All zones" | ZoneType)[] = ["All zones", "North", "South", "East", "West", "Central", "North-East", "Coastal & Islands"]

export function StatesUtGrid({ externalSearchQuery, onExternalSearchChange }: StatesUtGridProps) {
  const [regionFilter, setRegionFilter] = React.useState<"all" | "State" | "Union Territory">("all")
  const [selectedZone, setSelectedZone] = React.useState<"All zones" | ZoneType>("All zones")
  const [sortBy, setSortBy] = React.useState<"alphabetical" | "profiles">("alphabetical")

  const stateCount = INDIA_REGIONS.filter((region) => region.type === "State").length
  const utCount = INDIA_REGIONS.filter((region) => region.type === "Union Territory").length

  const regions = React.useMemo(() => {
    const query = externalSearchQuery.trim().toLowerCase()
    const filtered = INDIA_REGIONS.filter((region) => {
      if (regionFilter !== "all" && region.type !== regionFilter) return false
      if (selectedZone !== "All zones" && region.zone !== selectedZone) return false
      if (!query) return true
      const athleteMatch = getAthletesForRegion(region.id).some((athlete) => (athlete.name + " " + athlete.sport).toLowerCase().includes(query))
      return [region.name, region.code, region.capital, region.zone].some((value) => value.toLowerCase().includes(query)) || athleteMatch
    })
    return filtered.sort((a, b) => {
      if (sortBy === "profiles") return getAthletesForRegion(b.id).length - getAthletesForRegion(a.id).length || a.name.localeCompare(b.name)
      return a.name.localeCompare(b.name)
    })
  }, [externalSearchQuery, regionFilter, selectedZone, sortBy])

  return (
    <section id="states-ut-directory" className="scroll-mt-20 bg-background/40 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-border pb-7 lg:flex-row lg:items-end">
          <div>
            <Badge variant="outline" className="border-ashoka-navy/25 bg-ashoka-navy/5 text-ashoka-navy"><MapPin className="mr-1.5 size-3.5 text-saffron" />India · Regional directory</Badge>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ashoka-navy sm:text-3xl">Explore all {stateCount} states and {utCount} union territories</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Open any region page to see its listed source-linked athlete profiles. Regions without a profile are clearly marked while records are being added.</p>
          </div>
          <div className="inline-flex self-start rounded-xl border border-border bg-muted/70 p-1 lg:self-auto">
            {([
              ["all", "All regions", INDIA_REGIONS.length],
              ["State", "States", stateCount],
              ["Union Territory", "Union territories", utCount],
            ] as const).map(([value, label, count]) => (
              <button key={value} type="button" onClick={() => setRegionFilter(value)} aria-pressed={regionFilter === value} className={"rounded-lg px-3 py-2 text-xs font-semibold transition " + (regionFilter === value ? "bg-ashoka-navy text-white shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                {label}<span className={"ml-1.5 rounded px-1 py-0.5 font-mono text-[10px] " + (regionFilter === value ? "bg-white/20" : "bg-background")}>{count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <label className="relative block w-full max-w-lg">
              <span className="sr-only">Search regions and listed athletes</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={externalSearchQuery} onChange={(event) => onExternalSearchChange(event.target.value)} placeholder="Search region, capital, or listed athlete" className="h-10 bg-card pl-9 pr-9" />
              {externalSearchQuery && <button type="button" onClick={() => onExternalSearchChange("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"><X className="size-4" /></button>}
            </label>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Showing {regions.length} of {INDIA_REGIONS.length} regions</span>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                Sort
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value as "alphabetical" | "profiles")} className="h-9 rounded-lg border border-border bg-card px-2 text-foreground">
                  <option value="alphabetical">A to Z</option>
                  <option value="profiles">Most profiles</option>
                </select>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground"><Filter className="size-3.5" />Zone</span>
            {ZONES.map((zone) => <button key={zone} type="button" onClick={() => setSelectedZone(zone)} aria-pressed={selectedZone === zone} className={"shrink-0 rounded-full border px-3 py-1.5 text-xs transition " + (selectedZone === zone ? "border-ashoka-navy bg-ashoka-navy text-white" : "border-border bg-card text-foreground/80 hover:bg-muted")}>{zone}</button>)}
          </div>
        </div>

        {regions.length ? (
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {regions.map((region) => {
              const profileCount = getAthletesForRegion(region.id).length
              return (
                <Link key={region.id} href={"/states/" + region.id} className="group relative flex min-h-48 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-india-green/40 hover:shadow-md">
                  <span className={"absolute inset-x-0 top-0 h-1 " + (region.accentTone === "saffron" ? "bg-saffron" : region.accentTone === "green" ? "bg-india-green" : "bg-ashoka-navy")} />
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-md border border-border bg-muted px-2 py-1 font-mono text-[11px] font-bold text-ashoka-navy">{region.code}</span>
                      <Badge variant="secondary" className={region.type === "State" ? "bg-saffron/10 text-saffron" : "bg-india-green/10 text-india-green"}>{region.type}</Badge>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ashoka-navy">{region.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">Capital: {region.capital}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{region.zone} zone</p>
                  </div>
                  <div className="mt-5 flex items-end justify-between border-t border-border pt-3">
                    <div><p className="text-lg font-bold text-ashoka-navy">{profileCount}</p><p className="text-[11px] text-muted-foreground">source-linked profiles listed</p></div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-india-green">Open region <ArrowUpRight className="size-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <h3 className="font-semibold text-ashoka-navy">No matching region or listed athlete found</h3>
            <button type="button" onClick={() => { setRegionFilter("all"); setSelectedZone("All zones"); onExternalSearchChange("") }} className="mt-3 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted">Reset filters</button>
          </div>
        )}
      </div>
    </section>
  )
}

