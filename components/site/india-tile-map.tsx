"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export interface MapTile {
  id: string
  name: string
  hindi: string
  short: string
  type: string
  zone: string
  count: number
  col: number
  row: number
}

/** Tile-grid map: one square per state/UT, placed roughly geographically and shaded by athlete count. */
export function IndiaTileMap({ tiles }: { tiles: MapTile[] }) {
  const [activeId, setActiveId] = React.useState("haryana")
  const active = tiles.find((tile) => tile.id === activeId) ?? tiles[0]
  const max = Math.max(1, ...tiles.map((tile) => tile.count))

  // Log scale from steel blue (few athletes) to saffron (many), so one big state doesn't wash out the rest.
  function shade(count: number) {
    if (!count) return "rgb(255 255 255 / 0.06)"
    const strength = Math.log(count + 1) / Math.log(max + 1)
    return `color-mix(in oklch, #F2861E ${Math.round(strength * 100)}%, #1F6F78)`
  }

  return (
    <div className="relative">
      <div
        className="grid gap-1.5 sm:gap-2"
        style={{ gridTemplateColumns: "repeat(9, minmax(0, 1fr))", gridTemplateRows: "repeat(8, minmax(0, 1fr))" }}
      >
        {tiles.map((tile) => (
          <Link
            key={tile.id}
            href={"/states/" + tile.id}
            onMouseEnter={() => setActiveId(tile.id)}
            onFocus={() => setActiveId(tile.id)}
            aria-label={`${tile.name}: ${tile.count} athletes`}
            className={
              "group relative flex aspect-square flex-col items-center justify-center rounded-md text-[10px] font-bold tracking-wide text-white/90 ring-1 ring-inset transition duration-150 sm:rounded-lg sm:text-xs " +
              (tile.id === active.id ? "z-10 scale-110 ring-2 ring-white shadow-lg shadow-black/30" : "ring-white/10 hover:ring-white/40")
            }
            style={{ gridColumnStart: tile.col + 1, gridRowStart: tile.row + 1, background: shade(tile.count) }}
          >
            <span>{tile.short}</span>
            {tile.count > 0 && <span className="hidden text-[9px] font-semibold text-white/75 sm:block">{tile.count}</span>}
          </Link>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur" aria-live="polite">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-wider text-hero-muted">{active.type} · {active.zone}</p>
          <p className="mt-0.5 truncate font-display text-lg font-bold leading-tight text-white">
            {active.name} <span className="font-hindi text-sm font-normal text-white/60">{active.hindi}</span>
          </p>
          <p className="text-sm text-white/75"><strong className="text-white">{active.count}</strong> athletes listed</p>
        </div>
        <Link href={"/states/" + active.id} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-[#FFE2C4]">
          Open <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="mt-4 flex items-center gap-3 text-[11px] text-hero-muted">
        <span>Fewer athletes</span>
        <span className="h-2 w-28 rounded-full" style={{ background: "linear-gradient(90deg in oklch, #1F6F78, #F2861E)" }} />
        <span>More</span>
        <span className="ml-auto hidden sm:inline">Tap any tile to open that state</span>
      </div>
    </div>
  )
}
