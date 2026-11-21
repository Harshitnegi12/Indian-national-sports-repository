"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { ChevronDown, Menu, Search, X } from "lucide-react"
import { INDIA_REGIONS, type ZoneType } from "@/lib/india-sports-data"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { SearchDialog, type SearchItem } from "@/components/site/search-dialog"
import { BrandMark } from "@/components/site/brand-mark"

const ZONE_ORDER: ZoneType[] = ["North", "North-East", "East", "Central", "West", "South", "Coastal & Islands"]

const NAV = [
  { href: "/", label: "Home" },
  { href: "/athletes", label: "Athletes" },
  { href: "/sports", label: "Sports" },
  { href: "/data-notes", label: "Data notes" },
]

export function SiteHeader() {
  const [searchItems, setSearchItems] = React.useState<SearchItem[]>([])
  const pathname = usePathname()
  const [statesOpen, setStatesOpen] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [initialQuery, setInitialQuery] = React.useState("")
  const [scrolled, setScrolled] = React.useState(false)
  const statesRef = React.useRef<HTMLDivElement>(null)

  // Load the search index the first time search is opened.
  React.useEffect(() => {
    if (!searchOpen || searchItems.length) return
    fetch("/api/search").then((res) => res.json()).then(setSearchItems).catch(() => {})
  }, [searchOpen, searchItems.length])

  // Close menus whenever the route changes.
  React.useEffect(() => {
    setStatesOpen(false)
    setMobileOpen(false)
  }, [pathname])

  React.useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setStatesOpen(false)
        setMobileOpen(false)
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setInitialQuery("")
        setSearchOpen(true)
      }
      if (event.key === "/" && !(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)) {
        event.preventDefault()
        setSearchOpen(true)
      }
    }
    function onClick(event: MouseEvent) {
      if (statesRef.current && !statesRef.current.contains(event.target as Node)) setStatesOpen(false)
    }
    const openSearch = (event: Event) => { setInitialQuery(typeof (event as CustomEvent).detail === "string" ? (event as CustomEvent).detail : ""); setSearchOpen(true) }
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onClick)
    window.addEventListener("insr:open-search", openSearch)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onClick)
      window.removeEventListener("insr:open-search", openSearch)
    }
  }, [])

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const byZone = ZONE_ORDER.map((zone) => ({
    zone,
    regions: INDIA_REGIONS.filter((region) => region.zone === zone).sort((a, b) => a.name.localeCompare(b.name)),
  }))

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))
  const statesActive = pathname.startsWith("/states")

  return (
    <header className="sticky top-0 z-40">
      <div className="tricolor-rule" aria-hidden="true" />
      <div className={"border-b bg-background/85 backdrop-blur-xl transition-[box-shadow,border-color] duration-300 supports-[backdrop-filter]:bg-background/70 " + (scrolled ? "border-border shadow-[0_8px_30px_-12px_rgb(15_23_42/0.18)]" : "border-transparent")}>
        <div className="site-container flex h-16 items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Indian National Sports Repository, home">
            <BrandMark />
            <span className="hidden whitespace-nowrap leading-tight sm:block">
              <span className="block font-display text-[15px] font-bold tracking-tight text-foreground">Indian Sports Repository</span>
              <span className="block text-[11px] text-muted-foreground">States · Athletes · Sources</span>
            </span>
          </Link>

          <nav aria-label="Main" className="ml-4 hidden items-center gap-0.5 whitespace-nowrap lg:flex xl:ml-8">
            <NavLink href="/" active={isActive("/")}>Home</NavLink>
            <div ref={statesRef} className="relative">
              <button
                type="button"
                aria-expanded={statesOpen}
                aria-controls="states-menu"
                onClick={() => setStatesOpen((open) => !open)}
                className={"inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition " + (statesActive ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
              >
                States &amp; UTs
                <ChevronDown className={"size-4 transition " + (statesOpen ? "rotate-180" : "")} />
                {statesActive && <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-saffron" />}
              </button>
              <AnimatePresence>
              {statesOpen && (
                <motion.div id="states-menu" initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.12 } }} transition={{ type: "spring", stiffness: 420, damping: 32 }} className="absolute left-1/2 top-full mt-3 w-[min(92vw,960px)] rounded-2xl border border-border bg-popover p-6 shadow-2xl shadow-black/10" style={{ x: "-50%" }}>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">28 states and 8 union territories</p>
                    <Link href="/states" className="text-sm font-semibold text-saffron hover:underline">View all with filters →</Link>
                  </div>
                  <div className="grid grid-cols-4 gap-x-6 gap-y-5">
                    {byZone.map(({ zone, regions }) => (
                      <div key={zone}>
                        <p className="eyebrow mb-2 text-muted-foreground">{zone}</p>
                        <ul className="space-y-0.5">
                          {regions.map((region) => (
                            <li key={region.id}>
                              <Link href={"/states/" + region.id} className={"block rounded-md px-2 py-1 text-sm transition hover:bg-muted " + (pathname === "/states/" + region.id ? "font-semibold text-saffron" : "text-foreground/85")}>
                                {region.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              </AnimatePresence>
            </div>
            {NAV.slice(1).map((item) => (
              <NavLink key={item.href} href={item.href} active={isActive(item.href)}>{item.label}</NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm text-muted-foreground transition hover:border-foreground/25 hover:text-foreground"
              aria-label="Search states and athletes"
            >
              <Search className="size-4" />
              <span className="hidden whitespace-nowrap xl:inline">Search athletes, states…</span>
              <kbd className="ml-3 hidden whitespace-nowrap rounded border border-border bg-muted px-1.5 font-mono text-[10px] xl:inline">Ctrl K</kbd>
            </button>
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background lg:hidden">
            <nav aria-label="Mobile" className="site-container py-4">
              <ul className="grid gap-1">
                <li><Link href="/" className="block rounded-lg px-3 py-2.5 font-medium hover:bg-muted">Home</Link></li>
                <li><Link href="/states" className="block rounded-lg px-3 py-2.5 font-medium hover:bg-muted">All states &amp; UTs</Link></li>
                {NAV.slice(1).map((item) => (
                  <li key={item.href}><Link href={item.href} className="block rounded-lg px-3 py-2.5 font-medium hover:bg-muted">{item.label}</Link></li>
                ))}
              </ul>
              <div className="mt-4 border-t border-border pt-4">
                {byZone.map(({ zone, regions }) => (
                  <details key={zone} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-muted">
                      {zone} <ChevronDown className="size-4 transition group-open:rotate-180" />
                    </summary>
                    <ul className="grid grid-cols-2 gap-1 px-2 pb-2">
                      {regions.map((region) => (
                        <li key={region.id}><Link href={"/states/" + region.id} className="block rounded-md px-2 py-1.5 text-sm text-foreground/85 hover:bg-muted">{region.name}</Link></li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} items={searchItems} initialQuery={initialQuery} />
    </header>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={"relative rounded-lg px-3 py-2 text-sm font-medium transition " + (active ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
    >
      {children}
      {active && <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-saffron" />}
    </Link>
  )
}
