"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Medal, Users } from "lucide-react"

export interface MapRegionInfo {
  id: string
  name: string
  hindi: string
  type: string
  zone: string
  count: number
  medallists: number
}

export function IndiaMapInteractive({ regions, children }: { regions: MapRegionInfo[]; children: React.ReactNode }) {
  const router = useRouter()
  const wrapRef = React.useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = React.useState<string | null>(null)
  const [selected, setSelected] = React.useState<string>("haryana")
  const [pos, setPos] = React.useState({ x: 0, y: 0 })
  const lastPointer = React.useRef<string>("mouse")
  const byId = React.useMemo(() => new Map(regions.map((region) => [region.id, region])), [regions])

  const activeId = hovered ?? selected
  const tooltipInfo = hovered ? byId.get(hovered) : undefined
  const panelInfo = byId.get(activeId) ?? regions[0]

  // Mark the active region's shapes so CSS can highlight them and dim the rest.
  React.useEffect(() => {
    const root = wrapRef.current
    if (!root) return
    root.querySelectorAll("[data-active]").forEach((el) => el.removeAttribute("data-active"))
    if (hovered) root.querySelectorAll(`[data-region="${hovered}"]`).forEach((el) => el.setAttribute("data-active", ""))
    root.querySelectorAll("[data-selected]").forEach((el) => el.removeAttribute("data-selected"))
    root.querySelectorAll(`[data-region="${selected}"]`).forEach((el) => el.setAttribute("data-selected", ""))
  }, [hovered, selected])

  function regionFrom(target: EventTarget | null) {
    return (target as Element | null)?.closest?.("[data-region]")?.getAttribute("data-region") ?? null
  }

  function place(clientX: number, clientY: number) {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (rect) setPos({ x: clientX - rect.left, y: clientY - rect.top })
  }

  return (
    <div>
      <div
        ref={wrapRef}
        className="relative select-none"
        onPointerMove={(event) => {
          lastPointer.current = event.pointerType
          if (event.pointerType !== "mouse") return
          const id = regionFrom(event.target)
          setHovered(id)
          if (id) place(event.clientX, event.clientY)
        }}
        onPointerDown={(event) => { lastPointer.current = event.pointerType }}
        onPointerLeave={() => setHovered(null)}
        onClick={(event) => {
          const id = regionFrom(event.target)
          if (!id) return
          // Touch: first tap selects and shows the card below, second tap opens.
          if (lastPointer.current !== "mouse" && selected !== id) {
            setSelected(id)
            return
          }
          router.push("/states/" + id)
        }}
        onFocus={(event) => {
          const id = regionFrom(event.target)
          if (!id) return
          setSelected(id)
          const box = (event.target as Element).getBoundingClientRect()
          place(box.left + box.width / 2, box.top + box.height / 2)
          setHovered(id)
        }}
        onBlur={() => setHovered(null)}
        onKeyDown={(event) => {
          const id = regionFrom(event.target)
          if (id && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault()
            router.push("/states/" + id)
          }
        }}
      >
        {children}
        <AnimatePresence>
          {tooltipInfo && (
            <motion.div
              key="tip"
              initial={{ opacity: 0, x: pos.x, y: pos.y }}
              animate={{ opacity: 1, x: pos.x, y: pos.y }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ type: "spring", stiffness: 520, damping: 38, mass: 0.6 }}
              className="pointer-events-none absolute left-0 top-0 z-20"
            >
              <div className={"w-56 -translate-x-1/2 rounded-xl " + (pos.y < 170 ? "translate-y-5" : "-translate-y-[calc(100%+16px)]") + " border border-white/15 bg-slate-950/90 p-3.5 text-white shadow-2xl backdrop-blur-md"}>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/55">{tooltipInfo.type} · {tooltipInfo.zone}</p>
                <p className="mt-0.5 font-display text-base font-bold leading-tight">{tooltipInfo.name}</p>
                <p className="font-hindi text-sm text-white/60">{tooltipInfo.hindi}</p>
                <div className="mt-2 flex gap-4 text-xs text-white/80">
                  <span className="inline-flex items-center gap-1"><Users className="size-3.5" /> {tooltipInfo.count} {tooltipInfo.count === 1 ? "athlete" : "athletes"}</span>
                  {tooltipInfo.medallists > 0 && <span className="inline-flex items-center gap-1"><Medal className="size-3.5 text-[#FFC266]" /> {tooltipInfo.medallists}</span>}
                </div>
                <p className="mt-2 text-[11px] font-medium text-[#FFB366]">Click to open →</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={panelInfo.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="min-w-0 flex-1"
          >
            <p className="text-[11px] font-medium uppercase tracking-wider text-hero-muted">{panelInfo.type} · {panelInfo.zone}</p>
            <p className="mt-0.5 truncate font-display text-lg font-bold leading-tight text-white">
              {panelInfo.name} <span className="font-hindi text-sm font-normal text-white/55">{panelInfo.hindi}</span>
            </p>
            <p className="text-sm text-white/75">
              <strong className="text-white">{panelInfo.count}</strong> {panelInfo.count === 1 ? "athlete" : "athletes"}
              {panelInfo.medallists > 0 && <> · <strong className="text-white">{panelInfo.medallists}</strong> Olympic &amp; Para medallists</>}
            </p>
          </motion.div>
        </AnimatePresence>
        <Link href={"/states/" + panelInfo.id} className="pressable inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-[#FFE2C4]">
          Open <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="mt-3 flex items-center gap-3 text-[11px] text-hero-muted">
        <span className="whitespace-nowrap">Fewer athletes</span>
        <span className="h-1.5 w-24 rounded-full" style={{ background: "linear-gradient(90deg in oklch, var(--map-low), var(--map-high))" }} />
        <span>More</span>
        <span className="ml-auto hidden sm:inline">Boundaries are indicative</span>
      </div>
    </div>
  )
}
