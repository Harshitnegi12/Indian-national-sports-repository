"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Crown, Flame } from "lucide-react"
import type { AthleteRecord } from "@/lib/athlete-data"
import { AthleteCard } from "@/components/site/athlete-card"

/** "Top 10" (today's stars) and "Legends" (earlier generations) for a state, in two tabs. */
export function TopAndLegends({ top, legends, accent, regionName }: { top: AthleteRecord[]; legends: AthleteRecord[]; accent: string; regionName: string }) {
  const [tab, setTab] = React.useState<"top" | "legends">(top.length ? "top" : "legends")
  const list = tab === "top" ? top : legends
  const tabs = [
    { key: "top" as const, label: "Top 10", icon: Flame, count: top.length, text: `Today's leading athletes from ${regionName}` },
    { key: "legends" as const, label: "Legends", icon: Crown, count: legends.length, text: `Greats from earlier generations` },
  ].filter((t) => t.count)
  if (!tabs.length) return null

  return (
    <div>
      <div className="inline-flex rounded-2xl border border-border bg-muted p-1" role="tablist">
        {tabs.map((t) => (
          <button key={t.key} role="tab" aria-selected={tab === t.key} onClick={() => setTab(t.key)} className={"relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors " + (tab === t.key ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
            {tab === t.key && <motion.span layoutId="top-legends-pill" className="absolute inset-0 rounded-xl bg-card shadow-sm" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
            <t.icon className="relative size-4" style={{ color: tab === t.key ? accent : undefined }} />
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{tabs.find((t) => t.key === tab)?.text}</p>
      <AnimatePresence mode="wait">
        <motion.ol key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {list.map((athlete, index) => (
            <li key={athlete.id} className="relative">
              <span className="absolute -left-2 -top-2 z-10 flex size-8 items-center justify-center rounded-full font-display text-sm font-bold text-white shadow-lg" style={{ background: accent }}>{index + 1}</span>
              <AthleteCard athlete={athlete} accent={accent} />
            </li>
          ))}
        </motion.ol>
      </AnimatePresence>
    </div>
  )
}
