"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react"
import { ATHLETES, getRegionName, getSportCategory } from "@/lib/athlete-data"
import { INDIA_REGIONS } from "@/lib/india-sports-data"

export function NationalAthleteDirectory() {
  const [query, setQuery] = React.useState("")
  const [sport, setSport] = React.useState("all")
  const [region, setRegion] = React.useState("all")
  const sports = Array.from(new Set(ATHLETES.map((athlete) => getSportCategory(athlete)))).sort()
  const filtered = ATHLETES.filter((athlete) => {
    const matchesSport = sport === "all" || getSportCategory(athlete) === sport
    const matchesRegion = region === "all" || athlete.regionId === region
    const matchesQuery = !query.trim() || [athlete.name, athlete.sport, getRegionName(athlete.regionId)].join(" ").toLowerCase().includes(query.trim().toLowerCase())
    return matchesSport && matchesRegion && matchesQuery
  }).sort((a, b) => a.name.localeCompare(b.name))

  return <section id="athlete-profiles" className="scroll-mt-20 border-y border-border bg-card/60 py-12 sm:py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-india-green">National directory</p><h2 className="mt-2 text-2xl font-extrabold text-ashoka-navy sm:text-3xl">Athletes across India</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Search the profiles currently listed, or narrow by sport and region. Select a player to open their own page and check sources.</p></div>
        <span className="text-xs text-muted-foreground">{ATHLETES.length} source-linked profiles · selective coverage</span>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-[1.4fr_1fr_1fr]">
        <label className="relative"><span className="sr-only">Search athletes</span><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search athlete or region" className="h-11 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ashoka-navy/20"/></label>
        <label className="flex h-11 items-center gap-2 rounded-xl border border-border bg-background px-3 text-xs text-muted-foreground"><SlidersHorizontal size={15}/><span>Sport</span><select value={sport} onChange={(event) => setSport(event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none"><option value="all">All sports</option>{sports.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
        <label className="flex h-11 items-center gap-2 rounded-xl border border-border bg-background px-3 text-xs text-muted-foreground"><span>Region</span><select value={region} onChange={(event) => setRegion(event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none"><option value="all">All regions</option>{INDIA_REGIONS.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Showing {filtered.length} of {ATHLETES.length} currently listed profiles</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((athlete) => <Link key={athlete.id} href={"/athletes/" + athlete.id} className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-india-green/40 hover:shadow-md"><p className="text-xs font-semibold uppercase tracking-wider text-saffron">{athlete.sport}</p><h3 className="mt-2 text-lg font-bold text-ashoka-navy">{athlete.name}</h3><p className="mt-1 text-xs text-muted-foreground">{getRegionName(athlete.regionId)}</p><p className="mt-3 text-sm leading-6 text-foreground/80">{athlete.highlights[0]}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-india-green">View athlete page <ArrowUpRight className="size-3.5"/></span></Link>)}
        {!filtered.length && <p className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground sm:col-span-2 lg:col-span-3">No profiles match these filters. Try a different sport or region.</p>}
      </div>
      <p className="mt-6 text-xs leading-5 text-muted-foreground">This is a growing source-checked selection, not a complete national roster of every athlete since 1947.</p>
    </div>
  </section>
}
