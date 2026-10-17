"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { INDIA_REGIONS } from "@/lib/india-sports-data"
import { ChevronDown, Menu, UserRound, X } from "lucide-react"

interface InsrHeaderProps {
  onOpenLogin?: () => void
}

export function InsrHeader({ onOpenLogin }: InsrHeaderProps) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [mobileStatesOpen, setMobileStatesOpen] = React.useState(false)
  const regions = [...INDIA_REGIONS].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="flex h-1 w-full" aria-hidden="true"><span className="w-1/3 bg-saffron" /><span className="w-1/3 bg-white" /><span className="w-1/3 bg-india-green" /></div>
      <div className="border-b border-border/60 bg-muted/40"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-[11px] text-muted-foreground sm:px-6 lg:px-8"><span>Independent Indian sports directory</span><span className="font-medium text-india-green">Source-linked profiles · growing coverage</span></div></div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-ashoka-navy text-sm font-extrabold text-white">IN</span>
          <span><span className="block font-bold tracking-tight text-ashoka-navy">Indian National Sports Repository</span><span className="block text-[11px] text-muted-foreground">Regions · athletes · public sources</span></span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          <Link href="/" className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-muted hover:text-ashoka-navy">Overview</Link>
          <div className="group relative py-3">
            <Link href="/states" className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-muted hover:text-ashoka-navy focus:outline-none focus:ring-2 focus:ring-ashoka-navy/30" aria-haspopup="true">
              States &amp; UTs <ChevronDown className="size-4 transition group-hover:rotate-180 group-focus-within:rotate-180" />
            </Link>
            <div className="invisible absolute left-0 top-full z-50 w-[min(90vw,520px)] translate-y-2 rounded-2xl border border-border bg-card p-4 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="mb-3 flex items-center justify-between border-b border-border pb-3"><div><p className="font-bold text-ashoka-navy">Choose a region</p><p className="text-xs text-muted-foreground">28 states and 8 union territories</p></div><Link href="/states" className="text-xs font-semibold text-india-green hover:underline">All regions</Link></div>
              <div className="grid max-h-[65vh] grid-cols-2 gap-1 overflow-y-auto">
                {regions.map((region) => <Link key={region.id} href={"/states/" + region.id} className="rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-india-green/10 hover:text-ashoka-navy"><span className="block font-medium">{region.name}</span><span className="text-[10px] text-muted-foreground">{region.type}</span></Link>)}
              </div>
            </div>
          </div>
          <Link href="/athletes" className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-muted hover:text-ashoka-navy">Athletes</Link>
          <Link href="/data-notes" className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-muted hover:text-ashoka-navy">Data notes</Link>
        </nav>
        <div className="flex items-center gap-2">
          {onOpenLogin && <Button onClick={onOpenLogin} className="hidden bg-ashoka-navy text-white hover:bg-ashoka-navy/90 sm:inline-flex"><UserRound className="mr-2 size-4" />Portal preview</Button>}
          <Button variant="outline" size="icon" className="lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {menuOpen && <div className="max-h-[75vh] overflow-y-auto border-t border-border bg-card px-4 py-3 lg:hidden">
        <Link href="/" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Overview</Link>
        <div className="flex items-center">
          <Link href="/states" onClick={() => setMenuOpen(false)} className="flex-1 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">States &amp; UTs</Link>
          <button type="button" aria-label="Show states and union territories" aria-expanded={mobileStatesOpen} onClick={() => setMobileStatesOpen((open) => !open)} className="rounded-lg p-2 hover:bg-muted"><ChevronDown className={"size-4 transition " + (mobileStatesOpen ? "rotate-180" : "")} /></button>
        </div>
        {mobileStatesOpen && <div className="grid grid-cols-2 gap-1 rounded-xl bg-muted/50 p-2">{regions.map((region) => <Link key={region.id} href={"/states/" + region.id} onClick={() => setMenuOpen(false)} className="rounded-md px-2 py-2 text-xs font-medium hover:bg-card">{region.name}</Link>)}</div>}
        <Link href="/athletes" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Athletes</Link>
        <Link href="/data-notes" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Data notes</Link>
        {onOpenLogin && <Button onClick={() => { setMenuOpen(false); onOpenLogin() }} variant="outline" className="mt-2 w-full">Portal preview</Button>}
      </div>}
    </header>
  )
}
