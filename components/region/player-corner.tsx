"use client"

import * as React from "react"
import { LogOut, UserRound } from "lucide-react"
import { AthleteAvatar } from "@/components/site/athlete-card"

interface PlayerCard {
  name: string
  sport: string
  place: string
  note: string
}

/** Demo athlete sign-up. The card is stored only in this browser (localStorage). */
export function PlayerCorner({ regionId, regionName, sports, accent }: { regionId: string; regionName: string; sports: string[]; accent: string }) {
  const key = "insr-player-" + regionId
  const [card, setCard] = React.useState<PlayerCard | null>(null)
  const [form, setForm] = React.useState<PlayerCard>({ name: "", sport: sports[0] ?? "", place: "", note: "" })
  const [message, setMessage] = React.useState("")

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw) {
        const saved = JSON.parse(raw) as PlayerCard
        setCard(saved)
        setForm(saved)
      }
    } catch {}
  }, [key])

  function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!form.name.trim()) {
      setMessage("Please enter your name.")
      return
    }
    const next = { ...form, name: form.name.trim(), place: form.place.trim(), note: form.note.trim() }
    setCard(next)
    try {
      localStorage.setItem(key, JSON.stringify(next))
      setMessage("Your card is ready.")
    } catch {
      setMessage("Card created, but this browser could not save it.")
    }
  }

  function signOut() {
    try { localStorage.removeItem(key) } catch {}
    setCard(null)
    setMessage("")
  }

  const field = "h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-ring"

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 sm:p-8" noValidate>
        <h3 className="text-xl font-bold">Create your athlete card</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Demo only: your card is saved in this browser and is not published. A public athlete sign-up needs a backend, which can be added later.
        </p>
        <div className="mt-6 grid gap-4">
          <label className="grid gap-1.5 text-sm font-medium">
            Full name
            <input className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" maxLength={60} required />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium">
              Sport
              <select className={field} value={form.sport} onChange={(e) => setForm({ ...form, sport: e.target.value })}>
                {sports.map((sport) => <option key={sport}>{sport}</option>)}
              </select>
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Village / district
              <input className={field} value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} maxLength={60} />
            </label>
          </div>
          <label className="grid gap-1.5 text-sm font-medium">
            Your best achievement
            <textarea className={field + " h-24 resize-none py-2.5"} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} maxLength={160} />
          </label>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <button type="submit" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
            {card ? "Update card" : "Create card"}
          </button>
          <span role="status" className="text-sm text-muted-foreground">{message}</span>
        </div>
      </form>

      <div className="flex flex-col rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
        <h3 className="text-xl font-bold">Your card</h3>
        {card ? (
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="h-2" style={{ background: accent }} />
            <div className="p-6">
              <div className="flex items-center gap-4">
                <AthleteAvatar name={card.name} accent={accent} size="lg" />
                <div className="min-w-0">
                  <p className="truncate font-display text-xl font-bold">{card.name}</p>
                  <p className="text-sm text-muted-foreground">{card.sport}{card.place ? " · " + card.place : ""} · {regionName}</p>
                </div>
              </div>
              {card.note && <p className="mt-4 text-sm leading-6">{card.note}</p>}
              <button type="button" onClick={signOut} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground">
                <LogOut className="size-4" /> Remove card
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border p-10 text-center">
            <UserRound className="size-10 text-muted-foreground/60" />
            <p className="mt-3 text-sm text-muted-foreground">Fill in the form to preview your athlete card.</p>
          </div>
        )}
      </div>
    </div>
  )
}
