"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { MapPin, Users } from "lucide-react"

export interface DistrictInfo {
  name: string
  count: number
  top: { name: string; sport: string }[]
}

/** Hover a district to see its athletes; click/tap to filter the athlete list below to that district. */
export function StateMapInteractive({ districts, mapped, total, children }: { districts: DistrictInfo[]; mapped: number; total: number; children: React.ReactNode }) {
  const wrapRef = React.useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = React.useState<string | null>(null)
  const [selected, setSelected] = React.useState<string | null>(null)
  const [pos, setPos] = React.useState({ x: 0, y: 0 })
  const byName = React.useMemo(() => new Map(districts.map((d) => [d.name, d])), [districts])
  const ranked = React.useMemo(() => [...districts].filter((d) => d.count).sort((a, b) => b.count - a.count), [districts])

  React.useEffect(() => {
    const root = wrapRef.current
    if (!root) return
    root.querySelectorAll("[data-active]").forEach((el) => el.removeAttribute("data-active"))
    const id = hovered ?? selected
    if (id) root.querySelectorAll(`[data-district="${CSS.escape(id)}"]`).forEach((el) => el.setAttribute("data-active", ""))
  }, [hovered, selected])

  function districtFrom(target: EventTarget | null) {
    return (target as Element | null)?.closest?.("[data-district]")?.getAttribute("data-district") ?? null
  }
  function choose(name: string) {
    setSelected(name)
    window.location.hash = "district=" + encodeURIComponent(name)
  }
  const info = hovered ? byName.get(hovered) : undefined
  const panel = byName.get(selected ?? hovered ?? "") ?? ranked[0]

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
      <div
        ref={wrapRef}
        className="relative rounded-2xl border border-border bg-card p-4 sm:p-6"
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse") return
          const name = districtFrom(event.target)
          setHovered(name)
          const rect = wrapRef.current?.getBoundingClientRect()
          if (name && rect) setPos({ x: event.clientX - rect.left, y: event.clientY - rect.top })
        }}
        onPointerLeave={() => setHovered(null)}
        onClick={(event) => { const name = districtFrom(event.target); if (name) choose(name) }}
        onKeyDown={(event) => { const name = districtFrom(event.target); if (name && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); choose(name) } }}
        onFocus={(event) => { const name = districtFrom(event.target); if (name) setSelected(name) }}
      >
        {children}
        <AnimatePresence>
          {info && (
            <motion.div key="tip" initial={{ opacity: 0, x: pos.x, y: pos.y }} animate={{ opacity: 1, x: pos.x, y: pos.y }} exit={{ opacity: 0, transition: { duration: 0.1 } }} transition={{ type: "spring", stiffness: 520, damping: 38, mass: 0.6 }} className="pointer-events-none absolute left-0 top-0 z-20">
              <div className="w-56 -translate-x-1/2 -translate-y-[calc(100%+14px)] rounded-xl border border-white/15 bg-slate-950/90 p-3 text-white shadow-2xl backdrop-blur-md">
                <p className="font-display text-sm font-bold">{info.name}</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-white/75"><Users className="size-3.5" /> {info.count} {info.count === 1 ? "athlete" : "athletes"} listed</p>
                {info.top.length > 0 && <ul className="mt-1.5 space-y-0.5 text-xs text-white/85">{info.top.map((a) => <li key={a.name} className="truncate">{a.name} <span className="text-white/50">· {a.sport}</span></li>)}</ul>}
                <p className="mt-1.5 text-[11px] font-medium text-[#FFB366]">Click to filter athletes →</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="eyebrow text-muted-foreground">Top districts</p>
        <ol className="mt-3 space-y-1">
          {ranked.slice(0, 8).map((d, index) => (
            <li key={d.name}>
              <button type="button" onClick={() => choose(d.name)} onMouseEnter={() => setHovered(d.name)} onMouseLeave={() => setHovered(null)} className={"pressable flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-muted " + (panel?.name === d.name ? "bg-muted" : "")}>
                <span className="w-5 font-mono text-xs text-muted-foreground">{index + 1}</span>
                <MapPin className="size-3.5 text-muted-foreground" />
                <span className="flex-1 truncate font-medium">{d.name}</span>
                <span className="rounded-md bg-background px-2 py-0.5 font-mono text-xs">{d.count}</span>
              </button>
            </li>
          ))}
          {!ranked.length && <li className="text-sm text-muted-foreground">Athletes haven&apos;t been matched to districts yet.</li>}
        </ol>
        <p className="mt-4 border-t border-border pt-3 text-xs leading-5 text-muted-foreground">
          {mapped} of {total} athletes matched to a district from their hometown or birthplace. Census 2011 district boundaries.
        </p>
      </div>
    </div>
  )
}
