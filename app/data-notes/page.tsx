import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { ATHLETES, isMedallist } from "@/lib/athlete-data"
import { INDIA_REGIONS } from "@/lib/india-sports-data"
import { PageHero } from "@/components/site/page-hero"

export const metadata: Metadata = { title: "Data notes & sources" }

const SOURCES = [
  { title: "Indian Olympic Association: athlete profiles and Games records", url: "https://olympic.ind.in/athlete/" },
  { title: "Ministry of Youth Affairs and Sports: official reports and awards", url: "https://yas.nic.in/sports/awards-awardees" },
  { title: "Sports Authority of India: NCOEs and training programmes", url: "https://sportsauthorityofindia.nic.in/sainew/ncoe" },
  { title: "Indian Olympic Association: State Olympic associations", url: "https://olympic.ind.in/members/" },
  { title: "Olympics.com athlete profiles", url: "https://olympics.com/en/athletes/" },
  { title: "Prasar Bharati: DD Archives", url: "https://prasarbharati.gov.in/prasar-bharati-archives/dd-archives/" },
]

export default function DataNotesPage() {
  const regionsWithAthletes = INDIA_REGIONS.filter((region) => ATHLETES.some((athlete) => athlete.regionId === region.id)).length
  return (
    <>
      <PageHero eyebrow="Transparency" title="Data notes & sources" text="This is a growing public directory. An athlete is added once a public source supports the achievement and the state connection shown." />
      <div className="site-container max-w-5xl py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            [ATHLETES.length, "source-linked athlete profiles"],
            [ATHLETES.filter(isMedallist).length, "Olympic and Paralympic medallists"],
            [`${regionsWithAthletes} / 36`, "states and UTs with athletes listed"],
          ].map(([value, label]) => (
            <article key={String(label)} className="rounded-2xl border border-border bg-card p-6">
              <p className="font-display text-4xl font-bold">{value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </article>
          ))}
        </div>

        <section className="mt-10 rounded-2xl border border-saffron/30 bg-saffron/5 p-6 sm:p-8">
          <h2 className="text-xl font-bold">Coverage limits</h2>
          <p className="mt-3 text-sm leading-7 text-foreground/80">
            The directory is not a complete record of every Indian athlete since 1947. There is no single public, verified, state-wise registry
            covering every sport, level and decade. Empty sports or region pages mean records have not yet been sourced and entered; they do not mean there are no athletes.
          </p>
          <p className="mt-3 text-sm leading-7 text-foreground/80">
            Birthplace, home state, training location and representing state can differ. Each profile should state which connection its cited source supports.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Public records used</h2>
          <ul className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card px-6">
            {SOURCES.map((source) => (
              <li key={source.url} className="py-4">
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-india-green hover:underline">
                  {source.title} <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 text-xs leading-6 text-muted-foreground">
          This is an independent community project, not an official government service. Details should be confirmed against the linked primary record.
        </p>
        <p className="mt-3 text-xs leading-6 text-muted-foreground">
          Map boundaries from the{" "}
          <a href="https://github.com/datameet/maps" target="_blank" rel="noopener noreferrer" className="underline">DataMeet India maps</a>{" "}
          States dataset (<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="underline">CC BY 4.0</a>), showing India&apos;s official boundaries with 28 states and 8 union territories. Shapes are simplified for the web.
        </p>
      </div>
    </>
  )
}
