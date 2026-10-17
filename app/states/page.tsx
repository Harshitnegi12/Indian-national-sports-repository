import { Suspense } from "react"
import { InsrHeader } from "@/components/insr-header"
import { StatesDirectoryRoute } from "@/components/states-directory-route"

export default function StatesDirectoryPage() {
  return <div className="min-h-screen bg-background/40 text-foreground">
    <InsrHeader />
    <main className="min-h-[75vh]"><div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8"><p className="text-xs font-bold uppercase tracking-[0.18em] text-saffron">Choose a region</p><h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ashoka-navy">States &amp; Union Territories</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Each region opens a dedicated page with its local profile, sports directory, athletes, and official links.</p></div><Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-12 text-sm text-muted-foreground">Loading regions...</div>}><StatesDirectoryRoute /></Suspense></main>
  </div>
}
