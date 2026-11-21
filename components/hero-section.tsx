"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { IndiaFlagArt } from "@/components/india-flag-art"
import { Button } from "@/components/ui/button"
import { INDIA_REGIONS } from "@/lib/india-sports-data"
import { ATHLETES } from "@/lib/athlete-data"
import { ArrowRight, MapPin, Search, Users } from "lucide-react"

interface HeroSectionProps {
  onOpenLogin: () => void
}

export function HeroSection({ onOpenLogin }: HeroSectionProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")

  const goToDirectory = (value: string) => {
    router.push("/states?search=" + encodeURIComponent(value))
  }

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    goToDirectory(query)
  }

  const stateCount = INDIA_REGIONS.filter((region) => region.type === "State").length
  const utCount = INDIA_REGIONS.filter((region) => region.type === "Union Territory").length
  const profileRegionCount = new Set(ATHLETES.map((athlete) => athlete.regionId)).size

  return (
    <section id="national-overview" className="relative overflow-hidden border-b border-border bg-gradient-to-b from-white/50 via-background/40 to-muted/20 py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-28 -top-28 size-96 rounded-full bg-saffron/10 blur-3xl" />
        <div className="absolute -right-24 top-1/4 size-96 rounded-full bg-india-green/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(to right, #0F2042 1px, transparent 1px), linear-gradient(to bottom, #0F2042 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <IndiaFlagArt />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-saffron/30 bg-saffron/10 px-3 py-1 text-xs font-semibold text-saffron">Indian Sports Directory</span>
            <span className="rounded-full border border-india-green/30 bg-india-green/10 px-3 py-1 text-xs font-medium text-india-green">28 states · 8 union territories</span>
          </div>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight text-ashoka-navy sm:text-5xl lg:text-6xl">
            Explore India&apos;s sporting journeys, region by region.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Browse every state and union territory, then open source-linked profiles for athletes whose public records are included in this growing directory.
          </p>

          <form onSubmit={submit} className="mt-7 flex max-w-2xl flex-col gap-2 sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">Search regions or listed athletes</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a state, capital, or listed athlete" className="h-12 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm shadow-sm outline-none focus:ring-2 focus:ring-ashoka-navy/20" />
            </label>
            <Button type="submit" className="h-12 rounded-xl bg-ashoka-navy px-5 text-white hover:bg-ashoka-navy/90">Search directory <ArrowRight className="ml-2 size-4" /></Button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="mr-1 inline-flex items-center gap-1 text-muted-foreground"><MapPin className="size-3.5 text-saffron" />Quick jump</span>
            {["Haryana", "Assam", "Manipur", "Telangana"].map((name) => (
              <button key={name} type="button" onClick={() => goToDirectory(name)} className="rounded-md border border-border bg-card px-2.5 py-1.5 font-medium text-foreground/80 transition hover:border-ashoka-navy/40 hover:text-ashoka-navy">{name}</button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "States", value: stateCount },
              { label: "Union territories", value: utCount },
              { label: "Region pages", value: INDIA_REGIONS.length },
              { label: "Source-linked athlete profiles", value: ATHLETES.length },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card/90 p-4 shadow-sm">
                <p className="text-2xl font-extrabold text-ashoka-navy">{stat.value}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-5 text-muted-foreground">{profileRegionCount} regions currently have at least one source-linked athlete profile. Coverage is selective and still growing.</p>
        </div>

        <aside className="flex flex-col gap-4 lg:col-span-4">
          <div className="rounded-2xl border border-border bg-card/90 p-5 shadow-sm backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-india-green/10 text-india-green"><Users className="size-5" /></span>
              <div><p className="font-semibold text-ashoka-navy">Athlete & academy portal</p><p className="text-xs text-muted-foreground">Preview only · no accounts are stored</p></div>
            </div>
            <Button type="button" variant="outline" onClick={onOpenLogin} className="mt-5 w-full">Open portal preview <ArrowRight className="ml-2 size-4" /></Button>
          </div>
          <div className="rounded-2xl border border-saffron/25 bg-saffron/5 p-5">
            <p className="text-sm font-semibold text-ashoka-navy">How to explore</p>
            <ol className="mt-3 space-y-2 text-xs leading-5 text-muted-foreground">
              <li>1. Choose a state or union territory below.</li>
              <li>2. Open a listed athlete&apos;s profile.</li>
              <li>3. Follow the source links to check each highlight.</li>
            </ol>
          </div>
        </aside>
      </div>
    </section>
  )
}

