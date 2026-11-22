"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { Cake } from "lucide-react"
import { AthleteAvatar } from "@/components/site/athlete-card"

interface Person { id: string; name: string; sport: string; region?: string; year: number; photo: string | null }

/** "Aaj ka din": athletes born on today's date (visitor's local date). */
export function TodayInSport() {
  const [data, setData] = React.useState<{ label: string; people: Person[] } | null>(null)

  React.useEffect(() => {
    const now = new Date()
    const md = String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0")
    const label = now.toLocaleDateString("en-IN", { day: "numeric", month: "long" })
    fetch("/api/today?md=" + md).then((r) => r.json()).then((d) => setData({ label, people: d.people ?? [] })).catch(() => {})
  }, [])

  if (!data) return <div className="skeleton h-40 w-full rounded-3xl" />
  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="eyebrow text-saffron">Aaj ka din · आज का दिन</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Born on {data.label}</h2>
        </div>
        <Cake className="size-8 text-saffron" />
      </div>
      {data.people.length ? (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.people.map((p, i) => (
            <motion.li key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={"/athletes/" + p.id} className="group pressable flex items-center gap-3 rounded-2xl border border-border p-3 transition hover:border-foreground/20 hover:bg-muted/50">
                <AthleteAvatar name={p.name} photo={p.photo ?? undefined} />
                <span className="min-w-0">
                  <span className="block truncate font-semibold group-hover:text-saffron">{p.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">{p.sport} · born {p.year}</span>
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">No birthdays from our listed athletes today. Check back tomorrow!</p>
      )}
    </div>
  )
}
