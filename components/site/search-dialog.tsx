"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { CornerDownLeft, MapPin, Search, User } from "lucide-react"

export interface SearchItem {
  kind: "region" | "athlete"
  title: string
  subtitle: string
  href: string
  keywords: string
}

function score(item: SearchItem, query: string) {
  const title = item.title.toLowerCase()
  if (title.startsWith(query)) return 0
  if (title.split(/\s+/).some((word) => word.startsWith(query))) return 1
  if (title.includes(query)) return 2
  if (item.keywords.includes(query)) return 3
  return -1
}

export function SearchDialog({ open, onOpenChange, items, initialQuery = "" }: { open: boolean; onOpenChange: (open: boolean) => void; items: SearchItem[]; initialQuery?: string }) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [active, setActive] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLUListElement>(null)

  React.useEffect(() => {
    if (open) {
      setQuery(initialQuery)
      setActive(0)
      const id = requestAnimationFrame(() => inputRef.current?.focus())
      document.body.style.overflow = "hidden"
      return () => {
        cancelAnimationFrame(id)
        document.body.style.overflow = ""
      }
    }
  }, [open, initialQuery])

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items.filter((item) => item.keywords.includes("featured")).slice(0, 6)
    return items
      .map((item) => ({ item, s: score(item, q) }))
      .filter((entry) => entry.s >= 0)
      .sort((a, b) => a.s - b.s || (a.item.kind === b.item.kind ? a.item.title.localeCompare(b.item.title) : a.item.kind === "region" ? -1 : 1))
      .slice(0, 12)
      .map((entry) => entry.item)
  }, [items, query])

  React.useEffect(() => setActive(0), [query])

  React.useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" })
  }, [active])

  function go(item: SearchItem | undefined) {
    if (!item) return
    onOpenChange(false)
    router.push(item.href)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search">
      <button type="button" aria-label="Close search" className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm animate-in fade-in-0" onClick={() => onOpenChange(false)} />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl animate-in fade-in-0 zoom-in-95">
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-5 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") { event.preventDefault(); setActive((i) => Math.min(i + 1, results.length - 1)) }
              if (event.key === "ArrowUp") { event.preventDefault(); setActive((i) => Math.max(i - 1, 0)) }
              if (event.key === "Enter") { event.preventDefault(); go(results[active]) }
              if (event.key === "Escape") onOpenChange(false)
            }}
            placeholder="Search an athlete, sport or state…"
            className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results"
            aria-activedescendant={results[active] ? `search-option-${active}` : undefined}
          />
          <kbd className="rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">Esc</kbd>
        </div>
        <ul ref={listRef} id="search-results" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {!query.trim() && results.length > 0 && <li className="px-3 pb-1 pt-2 text-xs font-medium text-muted-foreground">Popular champions</li>}
          {results.map((item, index) => (
            <li key={item.href} id={`search-option-${index}`} role="option" aria-selected={index === active} data-index={index}>
              <button
                type="button"
                onMouseMove={() => setActive(index)}
                onClick={() => go(item)}
                className={"flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition " + (index === active ? "bg-muted" : "")}
              >
                <span className={"flex size-9 shrink-0 items-center justify-center rounded-lg " + (item.kind === "region" ? "bg-saffron/12 text-saffron" : "bg-india-green/12 text-india-green")}>
                  {item.kind === "region" ? <MapPin className="size-4" /> : <User className="size-4" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{item.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">{item.subtitle}</span>
                </span>
                {index === active && <CornerDownLeft className="size-4 text-muted-foreground" />}
              </button>
            </li>
          ))}
          {query.trim() && results.length === 0 && (
            <li className="px-4 py-10 text-center text-sm text-muted-foreground">No athlete or state matches “{query}”.</li>
          )}
        </ul>
        <div className="flex items-center gap-4 border-t border-border bg-muted/50 px-4 py-2 text-[11px] text-muted-foreground">
          <span>↑ ↓ to move</span><span>Enter to open</span><span className="ml-auto">{items.filter((i) => i.kind === "athlete").length} athletes · 36 regions</span>
        </div>
      </div>
    </div>
  )
}
