import Link from "next/link"
import { InsrHeader } from "@/components/insr-header"
import { ArrowUpRight } from "lucide-react"
import { ATHLETES } from "@/lib/athlete-data"

const SOURCES = [
  { title: "Indian Olympic Association: athlete profiles and Games records", url: "https://olympic.ind.in/athlete/" },
  { title: "Ministry of Youth Affairs and Sports: official reports and awards", url: "https://yas.nic.in/sports/awards-awardees" },
  { title: "Sports Authority of India: NCOEs and training programmes", url: "https://sportsauthorityofindia.nic.in/sainew/ncoe" },
  { title: "Indian Olympic Association: State Olympic associations", url: "https://olympic.ind.in/members/" },
  { title: "Prasar Bharati: DD Archives", url: "https://prasarbharati.gov.in/prasar-bharati-archives/dd-archives/" },
]

export default function DataNotesPage() {
  return <div className="min-h-screen bg-background/40 text-foreground"><InsrHeader /><main className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-india-green">Transparency</p><h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ashoka-navy sm:text-5xl">Data notes &amp; sources</h1>
    <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">This project is a growing public directory. Entries are added when a public source supports the achievement or region association shown on the page.</p>
    <div className="mt-8 grid gap-4 sm:grid-cols-2"><article className="rounded-2xl border border-border bg-card p-6"><p className="text-3xl font-extrabold text-ashoka-navy">{ATHLETES.length}</p><p className="mt-1 text-sm text-muted-foreground">source-linked athlete profiles currently listed</p></article><article className="rounded-2xl border border-border bg-card p-6"><p className="text-3xl font-extrabold text-ashoka-navy">36</p><p className="mt-1 text-sm text-muted-foreground">state and union territory pages</p></article></div>
    <section className="mt-10 rounded-2xl border border-saffron/30 bg-saffron/5 p-6 sm:p-8"><h2 className="text-xl font-bold text-ashoka-navy">Coverage limits</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">The directory is not a complete record of every Indian athlete from 1947 to today. I have not found one public, verified, state-wise registry covering every sport, level, and decade. Empty sports or region pages mean records have not yet been sourced and entered; they do not mean there are no athletes.</p><p className="mt-3 text-sm leading-7 text-muted-foreground">Birthplace, home state, training location, and representing state can differ. Each profile should state which connection its cited source supports. Do not treat an absent profile as an absence of sporting history.</p></section>
    <section className="mt-10"><h2 className="text-2xl font-bold text-ashoka-navy">Public records used in this project</h2><ul className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card px-5">{SOURCES.map((source) => <li key={source.url} className="py-4"><a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-india-green hover:underline">{source.title}<ArrowUpRight size={15}/></a></li>)}</ul></section>
    <p className="mt-10 text-xs leading-6 text-muted-foreground">This is an independent community project, not an official government service. Details should be confirmed against the linked primary record.</p>
    <Link href="/" className="mt-6 inline-flex text-sm font-semibold text-india-green hover:underline">Back to overview</Link>
  </main></div>
}
