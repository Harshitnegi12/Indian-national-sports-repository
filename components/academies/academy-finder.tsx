"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Building2, GraduationCap } from "lucide-react"
import type { AcademyEntry } from "@/lib/academies"

export interface AcademyView extends AcademyEntry { regionName: string; alumniNames: { id: string; name: string }[] }

/** Filterable list of academies by state, sport and type. */
export function AcademyFinder({ academies, states, sports }: { academies: AcademyView[]; states: { id: string; name: string }[]; sports: string[] }) {
  const [state, setState] = React.useState("all")
  const [sport, setSport] = React.useState("all")
  const [type, setType] = React.useState("all")
  const list = academies.filter((a) => (state === "all" || a.regionId === state) && (sport === "all" || a.sports.includes(sport)) && (type === "all" || a.type === type))
  const select = "h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring"
  return (
    <div>
      <div className="grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-3 sm:p-5">
        <select aria-label="State" value={state} onChange={(e) => setState(e.target.value)} className={select}>
          <option value="all">All states &amp; UTs</option>
          {states.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select aria-label="Sport" value={sport} onChange={(e) => setSport(e.target.value)} className={select}>
          <option value="all">All sports</option>
          {sports.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select aria-label="Type" value={type} onChange={(e) => setType(e.target.value)} className={select}>
          <option value="all">Government, private and corporate</option>
          {["Government", "Services", "Private", "Corporate"].map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <p className="mt-5 text-sm text-muted-foreground" aria-live="polite">{list.length} academies</p>
      <motion.div layout className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((a) => (
            <motion.article key={a.name} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="group spotlight flex flex-col rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted"><Building2 className="size-5 text-foreground/70" /></span>
                <div className="min-w-0">
                  <h3 className="font-bold leading-snug">{a.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.city} · <Link href={"/states/" + a.regionId} className="hover:text-saffron">{a.regionName}</Link></p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="rounded-md bg-saffron/12 px-2 py-0.5 text-xs font-semibold text-saffron">{a.type}</span>
                {a.sports.map((s) => <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground/75">{s}</span>)}
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{a.description}</p>
              {a.alumniNames.length > 0 && (
                <p className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                  <GraduationCap className="size-3.5 text-muted-foreground" />
                  {a.alumniNames.map((p, i) => <span key={p.id}><Link href={"/athletes/" + p.id} className="font-semibold hover:text-saffron">{p.name}</Link>{i < a.alumniNames.length - 1 ? "," : ""}</span>)}
                </p>
              )}
              <a href={a.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-india-green hover:underline">Learn more <ArrowUpRight className="size-3.5" /></a>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      {!list.length && <p className="mt-6 rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">No academy listed for this combination yet. Try the SAI directory or your state sports department.</p>}
    </div>
  )
}
