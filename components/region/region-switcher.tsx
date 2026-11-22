"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronsUpDown, Search } from "lucide-react"

export interface SwitcherRegion {
  id: string
  name: string
  type: string
  zone: string
  count: number
}

/** Dropdown to jump straight to any other state or union territory. */
export function RegionSwitcher({ current, regions }: { current: string; regions: SwitcherRegion[] }) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [active, setActive] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const currentRegion = regions.find((region) => region.id === current)

  const filtered = regions.filter((region) => region.name.toLowerCase().includes(query.trim().toLowerCase()))

  React.useEffect(() => {
    if (!open) return
    setQuery("")
    setActive(Math.max(0, regions.findIndex((region) => region.id === current)))
    requestAnimationFrame(() => inputRef.current?.focus())
    function onDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [open, current, regions])

  React.useEffect(() => {
    ref.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" })
  }, [active])

  function go(id: string | undefined) {
    if (!id) return
    setOpen(false)
    if (id !== current) router.push("/states/" + id)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-9 min-w-[12rem] items-center justify-between gap-2 rounded-lg border border-border bg-card px-3 text-sm font-semibold transition hover:border-foreground/25"
      >
        <span className="truncate">{currentRegion?.name ?? "Choose a state"}</span>
        <ChevronsUpDown className="size-4 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute right-0 z-30 mt-2 w-72 overflow-hidden rounded-xl border border-border bg-popover shadow-2xl animate-in fade-in-0 zoom-in-95">
          <div className="flex items-center gap-2 border-b border-border px-3">
            <Search className="size-4 text-muted-foreground" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => { setQuery(event.target.value); setActive(0) }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") { event.preventDefault(); setActive((i) => Math.min(i + 1, filtered.length - 1)) }
                if (event.key === "ArrowUp") { event.preventDefault(); setActive((i) => Math.max(i - 1, 0)) }
                if (event.key === "Enter") { event.preventDefault(); go(filtered[active]?.id) }
                if (event.key === "Escape") setOpen(false)
              }}
              placeholder="Jump to a state or UT…"
              className="h-10 flex-1 bg-transparent text-sm outline-none"
              aria-label="Filter states"
            />
          </div>
          <ul role="listbox" className="max-h-80 overflow-y-auto p-1.5">
            {filtered.map((region, index) => (
              <li key={region.id} role="option" aria-selected={region.id === current} data-index={index}>
                <button
                  type="button"
                  onMouseMove={() => setActive(index)}
                  onClick={() => go(region.id)}
                  className={"flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm " + (index === active ? "bg-muted" : "")}
                >
                  <span className="flex size-4 items-center justify-center">{region.id === current && <Check className="size-4 text-saffron" />}</span>
                  <span className="flex-1 truncate">{region.name}</span>
                  <span className="text-[11px] text-muted-foreground">{region.type === "State" ? "State" : "UT"}</span>
                  {region.count > 0 && <span className="rounded bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">{region.count}</span>}
                </button>
              </li>
            ))}
            {!filtered.length && <li className="px-3 py-6 text-center text-sm text-muted-foreground">No match</li>}
          </ul>
        </div>
      )}
    </div>
  )
}
