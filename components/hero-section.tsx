"use client"

import * as React from "react"
import { IndiaFlagArt } from "@/components/india-flag-art"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NATIONAL_SUMMARY } from "@/lib/india-sports-data"
import {
  UsersIcon,
  IndianRupeeIcon,
  AwardIcon,
  Building2Icon,
  TrendingUpIcon,
  SearchIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  SparklesIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from "lucide-react"

interface HeroSectionProps {
  onQuickSearchRegion: (query: string) => void
  onOpenLogin: () => void
}

export function HeroSection({
  onQuickSearchRegion,
  onOpenLogin,
}: HeroSectionProps) {
  const [period, setPeriod] = React.useState<"allTime" | "fy2627">("allTime")
  const [heroSearch, setHeroSearch] = React.useState("")

  const currentStats = NATIONAL_SUMMARY[period]

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onQuickSearchRegion(heroSearch)
    const el = document.getElementById("states-ut-directory")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleQuickTag = (tag: string) => {
    setHeroSearch(tag)
    onQuickSearchRegion(tag)
    const el = document.getElementById("states-ut-directory")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="national-overview"
      className="relative overflow-hidden border-b border-border bg-gradient-to-b from-white/45 via-background/40 to-muted/20 pt-8 pb-12 sm:pt-12 sm:pb-16"
    >
      {/* Subtle Tricolor Ambient Wash + Geometric Chakra Watermark */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-28 -left-28 size-96 rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "oklch(0.64 0.185 44)" }}
        />
        <div
          className="absolute top-1/4 -right-28 size-96 rounded-full opacity-[0.06] blur-3xl"
          style={{ background: "oklch(0.51 0.135 156)" }}
        />
        {/* Subtle Architectural Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0F2042 1px, transparent 1px), linear-gradient(to bottom, #0F2042 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <IndiaFlagArt />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Row: Editorial Heading + Period Toggle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-saffron/30 bg-saffron/10 px-3 py-1 text-xs font-semibold text-saffron">
                <span className="size-2 rounded-full bg-saffron" />
                Indian Sports Directory · Prototype
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-india-green/30 bg-india-green/10 px-3 py-1 text-xs font-medium text-india-green">
                <CheckCircle2Icon className="size-3.5" />
                28 States & 8 UTs Mapped
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ashoka-navy text-balance leading-[1.12]">
              India&apos;s Sports Directory for{" "}
              <span className="underline decoration-saffron/60 decoration-2 underline-offset-8">
                Athletes, Academies
              </span>{" "}
              & Sports Resources.
            </h1>

            <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty">
              Explore sample state and territory profiles, academy listings, and sports programme cards. Figures on this page are illustrative prototype data.
            </p>

            {/* Quick Search & Jump Bar */}
            <form
              onSubmit={handleHeroSearchSubmit}
              className="mt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-2xl"
            >
              <div className="relative flex-1">
                <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Search any State, UT, Capital, or Sport (e.g. Haryana, Manipur, Hockey, Shooting)..."
                  aria-label="Search States, Union Territories, or Sports"
                  className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm text-foreground shadow-2xs placeholder:text-muted-foreground focus:border-ashoka-navy focus:outline-none focus:ring-2 focus:ring-ashoka-navy/20"
                />
              </div>
              <Button
                type="submit"
                className="h-11 px-5 rounded-xl bg-ashoka-navy text-white hover:bg-ashoka-navy/90 font-semibold cursor-pointer shrink-0"
              >
                Explore Directory
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
            </form>

            {/* Quick Region Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-muted-foreground font-medium mr-1 flex items-center gap-1">
                <MapPinIcon className="size-3.5 text-saffron" />
                Quick Jump:
              </span>
              {[
                "Haryana",
                "Maharashtra",
                "Odisha",
                "Manipur",
                "Karnataka",
                "Delhi (NCT)",
                "Ladakh",
              ].map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => handleQuickTag(region)}
                  className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground/80 hover:border-ashoka-navy/40 hover:text-ashoka-navy hover:bg-muted/60 transition-colors cursor-pointer"
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Telemetry Mode Switcher & Athlete Verification Callout */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between gap-4">
            <div className="w-full rounded-xl border border-border bg-card p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Public Data Snapshot
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] text-india-green font-medium">
                  <SparklesIcon className="size-3" />
                  Sample Metrics
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 rounded-lg bg-muted p-1">
                <button
                  type="button"
                  onClick={() => setPeriod("allTime")}
                  className={`rounded-md py-1.5 px-2.5 text-xs font-semibold transition-all cursor-pointer ${
                    period === "allTime"
                      ? "bg-ashoka-navy text-white shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All-time sample
                </button>
                <button
                  type="button"
                  onClick={() => setPeriod("fy2627")}
                  className={`rounded-md py-1.5 px-2.5 text-xs font-semibold transition-all cursor-pointer ${
                    period === "fy2627"
                      ? "bg-ashoka-navy text-white shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  FY 2026–27 sample
                </button>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-border/80 text-xs">
                <span className="text-muted-foreground">Portal Demo</span>
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="font-semibold text-saffron hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  Open Portal Preview
                  <ArrowRightIcon className="size-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Aggregated National Sports Data — 4 Aesthetic Stat Cards */}
        <div
          aria-label="Aggregated National Sports Metrics"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Card 1: Sample Athlete Profiles (Saffron Accent) */}
          <Card className="relative overflow-hidden border-border bg-card shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="h-1 w-full bg-saffron shrink-0" aria-hidden="true" />
            <CardContent className="p-5 flex flex-col justify-between flex-1 gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Sample Athlete Profiles
                  </span>
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-saffron/10 text-saffron ring-1 ring-saffron/20">
                    <UsersIcon className="size-4" />
                  </div>
                </div>

                <div className="flex flex-wrap items-baseline justify-between gap-2 pt-1">
                  <div className="font-mono text-2xl xl:text-[26px] font-extrabold tracking-tight text-ashoka-navy leading-none">
                    {currentStats.totalAthletes}
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-india-green/10 text-india-green border border-india-green/25 font-mono text-[10px] px-1.5 py-0"
                  >
                    <TrendingUpIcon className="mr-1 size-3" />
                    {currentStats.totalAthletesDelta}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {currentStats.totalAthletesSub}
                </p>
              </div>

              <div className="rounded-lg bg-muted/60 p-2.5 flex flex-col gap-1.5 border border-border/50">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground font-medium">
                    Sample men: <strong className="text-foreground font-mono">56.8%</strong>
                  </span>
                  <span className="text-muted-foreground font-medium">
                    Sample women: <strong className="text-saffron font-mono">43.2%</strong>
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-border flex">
                  <div className="h-full bg-ashoka-navy" style={{ width: "56.8%" }} />
                  <div className="h-full bg-saffron" style={{ width: "43.2%" }} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Total Example Funding Figure (India Green Accent) */}
          <Card className="relative overflow-hidden border-border bg-card shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="h-1 w-full bg-india-green shrink-0" aria-hidden="true" />
            <CardContent className="p-5 flex flex-col justify-between flex-1 gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Example Funding Figure
                  </span>
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-india-green/10 text-india-green ring-1 ring-india-green/20">
                    <IndianRupeeIcon className="size-4" />
                  </div>
                </div>

                <div className="flex flex-wrap items-baseline justify-between gap-2 pt-1">
                  <div className="font-mono text-2xl xl:text-[26px] font-extrabold tracking-tight text-ashoka-navy leading-none">
                    {currentStats.fundsDisbursed}
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-india-green/10 text-india-green border border-india-green/25 font-mono text-[10px] px-1.5 py-0"
                  >
                    {currentStats.fundsDisbursedDelta}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {currentStats.fundsDisbursedSub}
                </p>
              </div>

              <div className="rounded-lg bg-muted/60 p-2.5 flex flex-col gap-1.5 border border-border/50">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground font-medium">
                    Sample athlete share: <strong className="text-india-green font-mono">62%</strong>
                  </span>
                  <span className="text-muted-foreground font-medium">
                    Sample infrastructure share: <strong className="text-foreground font-mono">38%</strong>
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-border flex">
                  <div className="h-full bg-india-green" style={{ width: "62%" }} />
                  <div className="h-full bg-ashoka-navy/60" style={{ width: "38%" }} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Sample Programme Entries (Ashoka Navy Accent) */}
          <Card className="relative overflow-hidden border-border bg-card shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="h-1 w-full bg-ashoka-navy shrink-0" aria-hidden="true" />
            <CardContent className="p-5 flex flex-col justify-between flex-1 gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Sample Programme Entries
                  </span>
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-ashoka-navy/10 text-ashoka-navy ring-1 ring-ashoka-navy/20">
                    <AwardIcon className="size-4" />
                  </div>
                </div>

                <div className="flex flex-wrap items-baseline justify-between gap-2 pt-1">
                  <div className="font-mono text-2xl xl:text-[26px] font-extrabold tracking-tight text-ashoka-navy leading-none">
                    {currentStats.activeSchemes}
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-ashoka-navy/10 text-ashoka-navy border border-ashoka-navy/20 font-mono text-[10px] px-1.5 py-0"
                  >
                    {currentStats.activeSchemesDelta}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {currentStats.activeSchemesSub}
                </p>
              </div>

              <div className="rounded-lg bg-muted/60 p-2 flex flex-wrap items-center gap-1.5 border border-border/50">
                {["TOPS Core", "Khelo India", "KIRTI", "ASMITA", "NSRDF"].map(
                  (scheme) => (
                    <span
                      key={scheme}
                      className="rounded bg-card px-2 py-0.5 font-mono text-[10px] font-medium text-ashoka-navy border border-border"
                    >
                      {scheme}
                    </span>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Sample Academy Listings & NCOEs (Tricolor Gradient Accent) */}
          <Card className="relative overflow-hidden border-border bg-card shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div
              className="h-1 w-full bg-gradient-to-r from-saffron via-ashoka-navy to-india-green shrink-0"
              aria-hidden="true"
            />
            <CardContent className="p-5 flex flex-col justify-between flex-1 gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Sample Academy Listings
                  </span>
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-saffron/10 text-ashoka-navy ring-1 ring-ashoka-navy/20">
                    <Building2Icon className="size-4" />
                  </div>
                </div>

                <div className="flex flex-wrap items-baseline justify-between gap-2 pt-1">
                  <div className="font-mono text-2xl xl:text-[26px] font-extrabold tracking-tight text-ashoka-navy leading-none">
                    {currentStats.registeredAcademies}
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-saffron/10 text-saffron border border-saffron/25 font-mono text-[10px] px-1.5 py-0"
                  >
                    {currentStats.registeredAcademiesDelta}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {currentStats.registeredAcademiesSub}
                </p>
              </div>

              <div className="rounded-lg bg-muted/60 p-2.5 flex items-center justify-between text-[11px] border border-border/50">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <ShieldCheckIcon className="size-3.5 text-india-green shrink-0" />
                  Sample NCOEs: <strong className="text-foreground font-mono">23</strong>
                </span>
                <span className="text-muted-foreground">
                  Sample centres: <strong className="text-foreground font-mono">1,045</strong>
                </span>
                <span className="text-muted-foreground">
                  State: <strong className="text-foreground font-mono">3,850</strong>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}








