"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { ArrowLeftRight, Search, X } from "lucide-react"
import type { SearchItem } from "@/components/site/search-dialog"
import { TIER_LABEL } from "@/lib/athlete-utils"
import type { AthleteTier } from "@/lib/athlete-data"

interface Detail {
  id: string
  name: string
  sport: string
  tier: AthleteTier | null
  region: string
  regionId: string
  hometown: string | null
  born: string | null
  photo: string | null
  summary: string
  highlights: string[]
}

const TIER_RANK: Record<string, number> = { "olympic-medal": 5, "paralympic-medal": 5, "world-champion": 4, international: 3, national: 2 }

function Picker({ value, onPick, items, label }: { value: string | null; onPick: (id: string | null) => void; items: SearchItem[]; label: string }) {
  const [query, setQuery] = React.useState("")
  const results = query.trim().length < 2 ? [] : items.filter((i) => i.title.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 8)
  if (value) return null
  return (
    <div className="relative">
      <label className="relative block">
        <span className="sr-only">{label}</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={label} className="h-12 w-full rounded-xl border border-input bg-card pl-9 pr-3 text-sm outline-none focus:border-ring focus:ring-4 focus:ring-ring/15" />
      </label>
      {results.length > 0 && (
        <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-2xl">
          {results.map((r) => (
            <li key={r.href}>
              <button type="button" onClick={() => { onPick(r.href.replace("/athletes/", "")); setQuery("") }} className="w-full rounded-lg px-3 py-2 text-left hover:bg-muted">
                <span className="block text-sm font-semibold">{r.title}</span>
                <span className="block truncate text-xs text-muted-foreground">{r.subtitle}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function age(born: string | null) {
  if (!born) return null
  const year = Number(born.slice(0, 4))
  return year ? year : null
}

export function CompareTool() {
  const router = useRouter()
  const params = useSearchParams()
  const [items, setItems] = React.useState<SearchItem[]>([])
  const ids = [params.get("a"), params.get("b")]
  const [details, setDetails] = React.useState<(Detail | null)[]>([null, null])

  React.useEffect(() => {
    fetch("/api/search").then((r) => r.json()).then((all: SearchItem[]) => setItems(all.filter((i) => i.kind === "athlete"))).catch(() => {})
  }, [])

  React.useEffect(() => {
    ids.forEach((id, index) => {
      if (!id) { setDetails((d) => { const n = [...d]; n[index] = null; return n }); return }
      fetch("/api/athletes/" + id).then((r) => (r.ok ? r.json() : null)).then((data) => setDetails((d) => { const n = [...d]; n[index] = data; return n }))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids[0], ids[1]])

  function setId(index: number, id: string | null) {
    const next = new URLSearchParams(params.toString())
    const key = index === 0 ? "a" : "b"
    if (id) next.set(key, id)
    else next.delete(key)
    router.replace("/compare?" + next.toString(), { scroll: false })
  }

  const [a, b] = details
  const rows: { label: string; get: (d: Detail) => string; better?: (x: Detail, y: Detail) => number }[] = [
    { label: "Sport", get: (d) => d.sport },
    { label: "State", get: (d) => d.region },
    { label: "Hometown", get: (d) => d.hometown ?? "—" },
    { label: "Born", get: (d) => (age(d.born) ? String(age(d.born)) : "—") },
    { label: "Highest level", get: (d) => (d.tier ? TIER_LABEL[d.tier] : "—"), better: (x, y) => (TIER_RANK[x.tier ?? ""] ?? 0) - (TIER_RANK[y.tier ?? ""] ?? 0) },
    { label: "Listed highlights", get: (d) => String(d.highlights.length), better: (x, y) => x.highlights.length - y.highlights.length },
  ]

  return (
    <div>
      <div className="grid items-start gap-4 md:grid-cols-[1fr_auto_1fr]">
        {[0, 1].map((index) => {
          const d = details[index]
          return (
            <div key={index} className="min-w-0">
              <Picker value={ids[index]} onPick={(id) => setId(index, id)} items={items} label={index === 0 ? "Choose the first athlete…" : "Choose the second athlete…"} />
              <AnimatePresence mode="wait">
                {d && (
                  <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative overflow-hidden rounded-2xl border border-border bg-card">
                    <button type="button" onClick={() => setId(index, null)} aria-label="Remove" className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60"><X className="size-4" /></button>
                    <div className="hero-surface flex items-end gap-4 p-5">
                      {d.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={d.photo} alt="" className="size-24 rounded-2xl object-cover object-top ring-2 ring-white/20" />
                      ) : (
                        <span className="flex size-24 items-center justify-center rounded-2xl bg-white/10 font-display text-3xl font-bold text-white">{d.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}</span>
                      )}
                      <div className="min-w-0">
                        <Link href={"/athletes/" + d.id} className="block truncate font-display text-2xl font-bold text-white hover:underline">{d.name}</Link>
                        <p className="truncate text-sm text-hero-muted">{d.sport} · {d.region}</p>
                      </div>
                    </div>
                    <p className="line-clamp-3 p-5 text-sm leading-6 text-foreground/80">{d.summary}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
        <div className="hidden h-full items-center justify-center md:flex"><span className="flex size-12 items-center justify-center rounded-full border border-border bg-card"><ArrowLeftRight className="size-5 text-muted-foreground" /></span></div>
      </div>

      {a && b && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="w-1/3 p-4 text-left font-semibold">{a.name}</th>
                <th className="p-4 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">Compare</th>
                <th className="w-1/3 p-4 text-right font-semibold">{b.name}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const diff = row.better ? row.better(a, b) : 0
                return (
                  <tr key={row.label} className="border-b border-border last:border-0">
                    <td className={"p-4 " + (diff > 0 ? "font-semibold text-india-green" : "")}>{row.get(a)}</td>
                    <td className="p-4 text-center text-xs text-muted-foreground">{row.label}</td>
                    <td className={"p-4 text-right " + (diff < 0 ? "font-semibold text-india-green" : "")}>{row.get(b)}</td>
                  </tr>
                )
              })}
              <tr>
                <td className="p-4 align-top"><ul className="space-y-2">{a.highlights.map((h) => <li key={h} className="rounded-lg bg-muted/60 p-2.5 text-xs leading-5">{h}</li>)}</ul></td>
                <td className="p-4 text-center align-top text-xs text-muted-foreground">Highlights</td>
                <td className="p-4 align-top"><ul className="space-y-2">{b.highlights.map((h) => <li key={h} className="rounded-lg bg-muted/60 p-2.5 text-right text-xs leading-5">{h}</li>)}</ul></td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      )}
      {!(a && b) && (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
          Pick two athletes to see them side by side. Try{" "}
          <button type="button" className="font-semibold text-saffron hover:underline" onClick={() => router.replace("/compare?a=neeraj-chopra&b=manu-bhaker")}>Neeraj Chopra vs Manu Bhaker</button>{" "}or{" "}
          <button type="button" className="font-semibold text-saffron hover:underline" onClick={() => router.replace("/compare?a=pv-sindhu&b=saina-nehwal")}>P. V. Sindhu vs Saina Nehwal</button>.
        </div>
      )}
    </div>
  )
}
