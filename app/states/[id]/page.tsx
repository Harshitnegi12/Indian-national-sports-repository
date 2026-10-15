import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, MapPin, Building2, Users, IndianRupee, Trophy } from "lucide-react"
import { INDIA_REGIONS } from "@/lib/india-sports-data"

export function generateStaticParams() {
  return INDIA_REGIONS.map((region) => ({ id: region.id }))
}

export default async function RegionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const region = INDIA_REGIONS.find((item) => item.id === id)
  if (!region) notFound()

  const stats = [
    { label: "Sample athlete count", value: region.registeredAthletes.toLocaleString("en-IN"), icon: Users },
    { label: "Sample academy count", value: region.registeredAcademies.toLocaleString("en-IN"), icon: Building2 },
    { label: "Sample funding figure", value: "₹" + region.fundsDisbursedCr + " Cr", icon: IndianRupee },
    { label: "Sample centre count", value: region.kheloIndiaCentres.toLocaleString("en-IN"), icon: Trophy },
  ]

  return (
    <main className="min-h-screen bg-background/40 text-foreground">
      <header className="border-b border-border bg-white/65">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-ashoka-navy hover:opacity-75">
            <ArrowLeft size={17} /> India sports directory
          </Link>
          <span className="text-xs text-muted-foreground">Independent public information directory</span>
        </div>
      </header>
      <section className="border-b border-border bg-gradient-to-br from-white/40 via-background/40 to-emerald-50/20">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-saffron">{region.type} · {region.zone}</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-ashoka-navy sm:text-6xl">{region.name}</h1>
          <p className="mt-4 flex items-center gap-2 text-muted-foreground"><MapPin size={17} /> Capital: {region.capital} <span className="px-1">·</span> Sports hub: {region.sportsHub}</p>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">Explore this prototype directory for {region.name}, with sample sports, training centre, and academy information.</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <article key={label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <Icon className="mb-5 text-india-green" size={20} />
              <p className="text-2xl font-bold text-ashoka-navy">{value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{label}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-saffron">Sports profile</p>
            <h2 className="mt-2 text-xl font-bold text-ashoka-navy">Priority disciplines</h2>
            <p className="mt-4 text-sm"><strong>Flagship:</strong> {region.flagshipSport}</p>
            <div className="mt-4 flex flex-wrap gap-2">{region.secondarySports.map((sport) => <span key={sport} className="rounded-full bg-muted px-3 py-1.5 text-xs">{sport}</span>)}</div>
          </article>
          <article className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-india-green">Training network</p>
            <h2 className="mt-2 text-xl font-bold text-ashoka-navy">Academies & centres</h2>
            <ul className="mt-4 divide-y divide-border">{region.topAcademies.map((academy) => <li key={academy.name} className="py-3"><p className="font-semibold text-sm">{academy.name}</p><p className="mt-1 text-xs text-muted-foreground">{academy.city} · {academy.category}</p></li>)}</ul>
          </article>
        </div>
        <p className="mt-8 rounded-xl border border-saffron/30 bg-saffron/5 p-4 text-xs leading-6 text-muted-foreground">These figures and listings are currently static starter data and have not been source-verified. They are shown as a prototype directory, not as official government records.</p>
      </section>
    </main>
  )
}



