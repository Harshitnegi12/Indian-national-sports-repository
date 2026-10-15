"use client"

import * as React from "react"
import {
  INDIA_REGIONS,
  type RegionData,
  type ZoneType,
} from "@/lib/india-sports-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  SearchIcon,
  Building2Icon,
  UsersIcon,
  IndianRupeeIcon,
  MapPinIcon,
  TrophyIcon,
  ArrowUpRightIcon,
  FilterIcon,
  XIcon,
  ShieldCheckIcon,
  SparklesIcon,
  LayersIcon,
  CheckCircle2Icon,
} from "lucide-react"

interface StatesUtGridProps {
  externalSearchQuery: string
  onExternalSearchChange: (q: string) => void
  onOpenAthleteLogin: () => void
}

const ZONES: ("All Zones" | ZoneType)[] = [
  "All Zones",
  "North",
  "South",
  "East",
  "West",
  "Central",
  "North-East",
  "Coastal & Islands",
]

const SORT_OPTIONS = [
  { label: "Alphabetical (A – Z)", value: "alphabetical" },
  { label: "Sample Academies (High → Low)", value: "academies-desc" },
  { label: "Sample Athletes (High → Low)", value: "athletes-desc" },
  { label: "Sample Funds Figure (High → Low)", value: "funds-desc" },
]

export function StatesUtGrid({
  externalSearchQuery,
  onExternalSearchChange,
  onOpenAthleteLogin,
}: StatesUtGridProps) {
  const [regionFilter, setRegionFilter] = React.useState<
    "all" | "State" | "Union Territory"
  >("all")
  const [selectedZone, setSelectedZone] = React.useState<"All Zones" | ZoneType>(
    "All Zones"
  )
  const [sortBy, setSortBy] = React.useState<string>("alphabetical")
  const [activeRegion, setActiveRegion] = React.useState<RegionData | null>(null)
  const [copiedRegionCode, setCopiedRegionCode] = React.useState<string | null>(
    null
  )

  const totalStatesCount = React.useMemo(
    () => INDIA_REGIONS.filter((r) => r.type === "State").length,
    []
  )
  const totalUtsCount = React.useMemo(
    () => INDIA_REGIONS.filter((r) => r.type === "Union Territory").length,
    []
  )

  const filteredRegions = React.useMemo(() => {
    const q = externalSearchQuery.trim().toLowerCase()

    const list = INDIA_REGIONS.filter((region) => {
      if (regionFilter !== "all" && region.type !== regionFilter) {
        return false
      }
      if (selectedZone !== "All Zones" && region.zone !== selectedZone) {
        return false
      }
      if (q.length > 0) {
        const matchesName = region.name.toLowerCase().includes(q)
        const matchesCode = region.code.toLowerCase().includes(q)
        const matchesCapital = region.capital.toLowerCase().includes(q)
        const matchesHub = region.sportsHub.toLowerCase().includes(q)
        const matchesSport =
          region.flagshipSport.toLowerCase().includes(q) ||
          region.secondarySports.some((s) => s.toLowerCase().includes(q))
        return (
          matchesName ||
          matchesCode ||
          matchesCapital ||
          matchesHub ||
          matchesSport
        )
      }
      return true
    })

    return [...list].sort((a, b) => {
      if (sortBy === "academies-desc") {
        return b.registeredAcademies - a.registeredAcademies
      }
      if (sortBy === "athletes-desc") {
        return b.registeredAthletes - a.registeredAthletes
      }
      if (sortBy === "funds-desc") {
        return b.fundsDisbursedCr - a.fundsDisbursedCr
      }
      return a.name.localeCompare(b.name)
    })
  }, [externalSearchQuery, regionFilter, selectedZone, sortBy])

  const handleResetFilters = () => {
    setRegionFilter("all")
    setSelectedZone("All Zones")
    setSortBy("alphabetical")
    onExternalSearchChange("")
  }

  const handleCopyDossierCode = (code: string) => {
    setCopiedRegionCode(code)
    setTimeout(() => setCopiedRegionCode(null), 2500)
  }

  return (
    <section
      id="states-ut-directory"
      className="py-12 sm:py-16 bg-background/40 scroll-mt-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-border">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-ashoka-navy/25 bg-ashoka-navy/5 text-ashoka-navy font-mono text-xs uppercase tracking-wider"
              >
                <LayersIcon className="mr-1.5 size-3.5 text-saffron" />
                Pan-India Regional Sports Directory
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                28 States & 8 Union Territories
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ashoka-navy">
              All {totalStatesCount} Indian States & {totalUtsCount} Union Territories
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              Open a state or territory page to explore its sample academy listings, sports profile, and illustrative figures.
            </p>
          </div>

          {/* Primary Jurisdiction Type Tabs (All 36 / 28 States / 8 UTs) */}
          <div
            role="tablist"
            aria-label="Filter by State or Union Territory"
            className="inline-flex rounded-xl border border-border bg-muted/70 p-1 self-start lg:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={regionFilter === "all"}
              onClick={() => setRegionFilter("all")}
              className={`rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                regionFilter === "all"
                  ? "bg-ashoka-navy text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>All Regions</span>
              <span
                className={`rounded-md px-1.5 py-0.5 font-mono text-[11px] ${
                  regionFilter === "all"
                    ? "bg-white/20 text-white"
                    : "bg-background text-foreground"
                }`}
              >
                {INDIA_REGIONS.length}
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={regionFilter === "State"}
              onClick={() => setRegionFilter("State")}
              className={`rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                regionFilter === "State"
                  ? "bg-saffron text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>States</span>
              <span
                className={`rounded-md px-1.5 py-0.5 font-mono text-[11px] ${
                  regionFilter === "State"
                    ? "bg-white/20 text-white"
                    : "bg-background text-foreground"
                }`}
              >
                {totalStatesCount}
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={regionFilter === "Union Territory"}
              onClick={() => setRegionFilter("Union Territory")}
              className={`rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                regionFilter === "Union Territory"
                  ? "bg-india-green text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>Union Territories</span>
              <span
                className={`rounded-md px-1.5 py-0.5 font-mono text-[11px] ${
                  regionFilter === "Union Territory"
                    ? "bg-white/20 text-white"
                    : "bg-background text-foreground"
                }`}
              >
                {totalUtsCount}
              </span>
            </button>
          </div>
        </div>

        {/* Search, Zonal Filter, and Sort Controls */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                value={externalSearchQuery}
                onChange={(e) => onExternalSearchChange(e.target.value)}
                placeholder="Filter by state/UT name, capital, or sport (e.g., Wrestling, Hockey)..."
                aria-label="Filter States and Union Territories"
                className="pl-9 pr-9 h-9 bg-card"
              />
              {externalSearchQuery && (
                <button
                  type="button"
                  onClick={() => onExternalSearchChange("")}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <XIcon className="size-4" />
                </button>
              )}
            </div>

            {/* Sort Control & Results Count */}
            <div className="flex flex-wrap items-center justify-between md:justify-end gap-3">
              <span className="text-xs text-muted-foreground font-mono">
                Showing{" "}
                <strong className="text-foreground">
                  {filteredRegions.length}
                </strong>{" "}
                of {INDIA_REGIONS.length} regions
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground hidden sm:inline">
                  Sort by:
                </span>
                <Select
                  items={SORT_OPTIONS}
                  value={sortBy}
                  onValueChange={(val) => {
                    if (val) setSortBy(val)
                  }}
                >
                  <SelectTrigger className="w-56 bg-card h-9 text-xs font-medium">
                    <SelectValue placeholder="Sort regions" />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectGroup>
                      {SORT_OPTIONS.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Zonal Council Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground mr-1 shrink-0">
              <FilterIcon className="size-3.5 text-ashoka-navy" />
              Zonal Council:
            </span>
            {ZONES.map((zone) => {
              const active = selectedZone === zone
              return (
                <button
                  key={zone}
                  type="button"
                  onClick={() => setSelectedZone(zone)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors shrink-0 cursor-pointer border ${
                    active
                      ? "border-ashoka-navy bg-ashoka-navy text-white"
                      : "border-border bg-card text-foreground/80 hover:bg-muted"
                  }`}
                >
                  {zone}
                </button>
              )
            })}
          </div>
        </div>

        {/* Empty Filter State */}
        {filteredRegions.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card p-12 text-center flex flex-col items-center gap-3">
            <MapPinIcon className="size-8 text-muted-foreground" />
            <h3 className="text-base font-semibold text-foreground">
              No matching State or Union Territory found
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
              No region matched &ldquo;{externalSearchQuery}&rdquo; under the
              current filter selection. Reset filters to view all 28 States and
              8 Union Territories.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="mt-1"
            >
              Reset All Filters
            </Button>
          </div>
        ) : (
          /* Main Responsive Grid of Clickable State / UT Cards */
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredRegions.map((region) => {
              const isUT = region.type === "Union Territory"
              const academyFillPercent = Math.min(
                100,
                Math.max(12, Math.round((region.registeredAcademies / 470) * 100))
              )

              const accentBorderHover =
                region.accentTone === "saffron"
                  ? "hover:border-saffron/50"
                  : region.accentTone === "green"
                    ? "hover:border-india-green/50"
                    : "hover:border-ashoka-navy/50"

              const silhouetteStroke =
                region.accentTone === "saffron"
                  ? "#EA580C"
                  : region.accentTone === "green"
                    ? "#15803D"
                    : "#0F2042"

              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => { window.location.href = "/states/" + region.id }}
                  className={`group relative flex flex-col justify-between text-left rounded-xl border border-border bg-card p-4 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ashoka-navy cursor-pointer overflow-hidden ${accentBorderHover}`}
                >
                  {/* Top Subtle Accent Hairline */}
                  <div
                    className={`absolute inset-x-0 top-0 h-0.5 transition-opacity opacity-70 group-hover:opacity-100 ${
                      region.accentTone === "saffron"
                        ? "bg-saffron"
                        : region.accentTone === "green"
                          ? "bg-india-green"
                          : "bg-ashoka-navy"
                    }`}
                    aria-hidden="true"
                  />

                  {/* Subtle Topographic Dot Pattern + Regional Map Silhouette SVG */}
                  <div
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                    aria-hidden="true"
                  >
                    <div
                      className="absolute inset-0 opacity-[0.035]"
                      style={{
                        backgroundImage:
                          "radial-gradient(#0F2042 1px, transparent 1px)",
                        backgroundSize: "14px 14px",
                      }}
                    />
                    <svg
                      viewBox="0 0 100 100"
                      className="absolute -right-3 -bottom-2 size-32 opacity-[0.08] group-hover:opacity-[0.16] group-hover:scale-105 transition-all duration-300"
                    >
                      <path
                        d={region.silhouettePath}
                        fill={silhouetteStroke}
                        stroke={silhouetteStroke}
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Card Header: Code, Type Badge, and Zone */}
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] font-bold text-ashoka-navy border border-border whitespace-nowrap">
                          {region.code}
                        </span>
                        <Badge
                          variant="secondary"
                          className={`text-[10px] font-medium px-2 py-0 h-5 whitespace-nowrap ${
                            isUT
                              ? "bg-india-green/10 text-india-green border border-india-green/25"
                              : "bg-saffron/10 text-saffron border border-saffron/25"
                          }`}
                        >
                          {region.type}
                        </Badge>
                      </div>

                      <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-0.5 group-hover:text-ashoka-navy transition-colors whitespace-nowrap">
                        {region.zone}
                        <ArrowUpRightIcon className="size-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>

                    {/* State / UT Name & Hub */}
                    <div>
                      <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-ashoka-navy transition-colors line-clamp-1">
                        {region.name}
                      </h3>
                      <p className="mt-0.5 text-xs text-muted-foreground flex items-center gap-1 line-clamp-1">
                        <MapPinIcon className="size-3 shrink-0 text-muted-foreground" />
                        <span>Hub: {region.sportsHub}</span>
                      </p>
                    </div>

                    {/* Flagship Sport Pill */}
                    <div className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-muted/50 px-2.5 py-1 text-xs w-fit max-w-full">
                      <TrophyIcon className="size-3.5 shrink-0 text-saffron" />
                      <span className="truncate font-medium text-foreground/90">
                        {region.flagshipSport}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer: Prominent 'Sample Academies' Quick Stat + Secondary Telemetry */}
                  <div className="relative z-10 mt-4 pt-3 border-t border-border/80 flex flex-col gap-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                        <Building2Icon className="size-3.5 text-ashoka-navy" />
                        Sample Academies
                      </span>
                      <span className="font-mono text-lg font-extrabold text-ashoka-navy">
                        {region.registeredAcademies}
                      </span>
                    </div>

                    {/* Subtle Progress Bar for Sample Academies */}
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          region.accentTone === "saffron"
                            ? "bg-saffron"
                            : region.accentTone === "green"
                              ? "bg-india-green"
                              : "bg-ashoka-navy"
                        }`}
                        style={{ width: `${academyFillPercent}%` }}
                      />
                    </div>

                    {/* Secondary Micro-Stats Row */}
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-0.5">
                      <span className="font-mono">
                        Sample athletes:{" "}
                        <strong className="text-foreground">
                          {region.registeredAthletes.toLocaleString("en-IN")}
                        </strong>
                      </span>
                      <span className="font-mono">
                        Sample funds:{" "}
                        <strong className="text-india-green">
                          INR {region.fundsDisbursedCr} Cr
                        </strong>
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Regional Sports Dossier Dialog when clicking any State/UT Card */}
      <Dialog
        open={Boolean(activeRegion)}
        onOpenChange={(open) => {
          if (!open) setActiveRegion(null)
        }}
      >
        {activeRegion && (
          <DialogContent className="sm:max-w-xl p-0 overflow-hidden border-border">
            <div className="h-1.5 w-full flex">
              <div className="w-1/3 bg-saffron" />
              <div className="w-1/3 bg-white border-y border-border" />
              <div className="w-1/3 bg-india-green" />
            </div>

            <div className="p-6 flex flex-col gap-5 max-h-[85vh] overflow-y-auto">
              <DialogHeader className="gap-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-ashoka-navy px-2.5 py-0.5 font-mono text-xs font-bold text-white">
                      {activeRegion.code}
                    </span>
                    <Badge
                      variant="secondary"
                      className={
                        activeRegion.type === "Union Territory"
                          ? "bg-india-green/10 text-india-green border border-india-green/25"
                          : "bg-saffron/10 text-saffron border border-saffron/25"
                      }
                    >
                      {activeRegion.type}
                    </Badge>
                    <Badge variant="outline" className="font-mono text-[11px]">
                      {activeRegion.zone} Zone
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4 pt-1">
                  <div>
                    <DialogTitle className="text-2xl font-extrabold tracking-tight text-ashoka-navy">
                      {activeRegion.name}
                    </DialogTitle>
                    <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      Capital: <strong className="text-foreground">{activeRegion.capital}</strong> · Primary Sports Hub:{" "}
                      <strong className="text-foreground">{activeRegion.sportsHub}</strong>
                    </DialogDescription>
                  </div>

                  {/* Regional Map Silhouette Emblem */}
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/40 p-2">
                    <svg viewBox="0 0 100 100" className="size-10 text-ashoka-navy">
                      <path
                        d={activeRegion.silhouettePath}
                        fill="currentColor"
                        fillOpacity="0.2"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </DialogHeader>

              {/* 4 Key Regional Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="rounded-xl border border-border bg-muted/40 p-3">
                  <span className="text-[11px] text-muted-foreground block">
                    Sample Academies
                  </span>
                  <span className="font-mono text-xl font-extrabold text-ashoka-navy">
                    {activeRegion.registeredAcademies}
                  </span>
                </div>
                <div className="rounded-xl border border-border bg-muted/40 p-3">
                  <span className="text-[11px] text-muted-foreground block">
                    Sample Athletes
                  </span>
                  <span className="font-mono text-xl font-extrabold text-saffron">
                    {activeRegion.registeredAthletes.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="rounded-xl border border-border bg-muted/40 p-3">
                  <span className="text-[11px] text-muted-foreground block">
                    Sample Funds Figure
                  </span>
                  <span className="font-mono text-xl font-extrabold text-india-green">
                    INR {activeRegion.fundsDisbursedCr} Cr
                  </span>
                </div>
                <div className="rounded-xl border border-border bg-muted/40 p-3">
                  <span className="text-[11px] text-muted-foreground block">
                    Sample Centres
                  </span>
                  <span className="font-mono text-xl font-extrabold text-foreground">
                    {activeRegion.kheloIndiaCentres}
                  </span>
                </div>
              </div>

              {/* Priority Disciplines */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Flagship & Priority Disciplines
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge className="bg-saffron text-white border-0">
                    <TrophyIcon className="mr-1 size-3" />
                    {activeRegion.flagshipSport}
                  </Badge>
                  {activeRegion.secondarySports.map((sport) => (
                    <Badge
                      key={sport}
                      variant="secondary"
                      className="font-medium text-xs"
                    >
                      {sport}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Top Accredited Academies in this State/UT */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Mapped Training Academies & High Performance Hubs
                  </span>
                  <span className="font-mono text-[11px] text-india-green flex items-center gap-1">
                    <ShieldCheckIcon className="size-3.5" />
                    Sample listings
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {activeRegion.topAcademies.map((academy, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-ashoka-navy/10 text-ashoka-navy font-mono text-xs font-bold">
                          0{idx + 1}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                            {academy.name}
                          </p>
                          <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <MapPinIcon className="size-3" />
                            {academy.city}, {activeRegion.name}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="shrink-0 font-mono text-[10px]"
                      >
                        {academy.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-2 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyDossierCode(activeRegion.code)}
                  className="font-mono text-xs"
                >
                  {copiedRegionCode === activeRegion.code ? (
                    <>
                      <CheckCircle2Icon data-icon="inline-start" className="text-india-green" />
                      Copied Registry ID ({activeRegion.code}-2026)
                    </>
                  ) : (
                    <>
                      <SparklesIcon data-icon="inline-start" />
                      Copy State Registry Code ({activeRegion.code})
                    </>
                  )}
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-ashoka-navy text-white hover:bg-ashoka-navy/90 flex-1 sm:flex-initial"
                    onClick={() => {
                      setActiveRegion(null)
                      onOpenAthleteLogin()
                    }}
                  >
                    Athlete Portal ({activeRegion.code})
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  )
}






