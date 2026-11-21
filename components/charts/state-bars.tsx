"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "motion/react"

export interface StateBarRow {
  id: string
  name: string
  values: Record<string, number>
}

/** Ranked horizontal bars of states, one measure at a time (single hue, value labels in text ink). */
export function StateBars({ rows, measures, color = "var(--saffron)" }: { rows: StateBarRow[]; measures: { key: string; label: string }[]; color?: string }) {
  const [measure, setMeasure] = React.useState(measures[0].key)
  const [hover, setHover] = React.useState<string | null>(null)
  const sorted = [...rows].filter((r) => r.values[measure] > 0).sort((a, b) => b.values[measure] - a.values[measure]).slice(0, 15)
  const max = Math.max(1, ...sorted.map((r) => r.values[measure]))

  return (
    <div>
      <div className="inline-flex flex-wrap gap-1 rounded-xl border border-border bg-muted p-1" role="tablist" aria-label="Measure">
        {measures.map((m) => (
          <button key={m.key} role="tab" aria-selected={measure === m.key} onClick={() => setMeasure(m.key)} className={"relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors " + (measure === m.key ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
            {measure === m.key && <motion.span layoutId="bars-tab" className="absolute inset-0 rounded-lg bg-card shadow-sm" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
            <span className="relative">{m.label}</span>
          </button>
        ))}
      </div>
      <ol className="mt-6 space-y-2">
        {sorted.map((row, index) => {
          const value = row.values[measure]
          return (
            <li key={row.id} onMouseEnter={() => setHover(row.id)} onMouseLeave={() => setHover(null)}>
              <Link href={"/states/" + row.id} className="group grid grid-cols-[1.5rem_8rem_1fr_2.5rem] items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted sm:grid-cols-[1.5rem_11rem_1fr_3rem]">
                <span className="font-mono text-xs text-muted-foreground">{index + 1}</span>
                <span className="truncate text-sm font-medium group-hover:text-saffron">{row.name}</span>
                <span className="h-3 rounded-r-[4px] bg-transparent">
                  <motion.span
                    className="block h-full rounded-r-[4px]"
                    style={{ background: color, opacity: hover && hover !== row.id ? 0.45 : 1 }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(value / max) * 100}%` }}
                    transition={{ duration: 0.6, delay: index * 0.025, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
                <span className="text-right font-mono text-sm tabular-nums">{value}</span>
              </Link>
            </li>
          )
        })}
        {!sorted.length && <li className="text-sm text-muted-foreground">No data yet.</li>}
      </ol>
    </div>
  )
}
