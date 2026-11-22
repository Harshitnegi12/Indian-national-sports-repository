import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Database, Map, ShieldCheck, Users } from "lucide-react"
import { ATHLETES } from "@/lib/athlete-data"
import { PageHero } from "@/components/site/page-hero"
import { Reveal } from "@/components/motion/motion-primitives"

export const metadata: Metadata = { title: "About", description: "Why the Indian Sports Repository exists, who built it and how its data is collected." }

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="About this project" hindi="इस परियोजना के बारे में" text="A free, state-by-state home for the stories of India's athletes, from village akhadas to Olympic podiums." />
      <div className="site-container max-w-4xl space-y-10 py-12">
        <Reveal>
          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-2xl font-bold">Why it exists</h2>
            <p className="mt-3 text-[15px] leading-7 text-foreground/85">
              India has produced thousands of remarkable athletes since 1947, but their stories are scattered across federation sites, newspapers and archives.
              Many state and district heroes are hard to find at all. This project brings them together in one place, organised by state and district,
              so that fans, students and young athletes can discover who came before them and where they trained.
            </p>
          </section>
        </Reveal>
        <Reveal>
          <section className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Users, title: `${ATHLETES.length.toLocaleString("en-IN")} athletes`, text: "From every state and union territory, across 29 sports and every era since independence." },
              { icon: Map, title: "Official maps", text: "India and district boundaries from DataMeet, following the Survey of India outline." },
              { icon: Database, title: "Open sources", text: "Athlete lists and stories from Wikipedia, birth data and awards from Wikidata, photos from Wikimedia Commons, plus federation and government records." },
              { icon: ShieldCheck, title: "Checked and credited", text: "Every profile links to its sources and credits text and photo licences. Mistakes can be reported from any page." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6">
                <span className="flex size-10 items-center justify-center rounded-xl bg-muted"><Icon className="size-5" /></span>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            ))}
          </section>
        </Reveal>
        <Reveal>
          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-2xl font-bold">How the data is collected</h2>
            <ol className="mt-4 space-y-3 text-[15px] leading-7 text-foreground/85">
              <li><strong>1. Hand-checked profiles.</strong> Key athletes were added by hand with links to the Indian Olympic Association, Sports Authority of India, federations and Olympics.com.</li>
              <li><strong>2. State lists.</strong> Wikipedia&apos;s &quot;sportspeople from each state&quot; lists were read sport by sport, and only real sportspeople were kept.</li>
              <li><strong>3. Details.</strong> Birth dates, birthplaces, awards and official social accounts come from Wikidata; photos only when they carry a free licence.</li>
              <li><strong>4. Districts.</strong> Each athlete is placed in a district from their hometown or birthplace, and left unplaced rather than guessed when that isn&apos;t known.</li>
            </ol>
            <p className="mt-4 text-sm text-muted-foreground">The directory keeps growing and is not a complete register. An empty sport or district means records haven&apos;t been added yet.</p>
          </section>
        </Reveal>
        <Reveal>
          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-2xl font-bold">Who built it</h2>
            <p className="mt-3 text-[15px] leading-7 text-foreground/85">
              Created by <strong>Harshit</strong> as an independent community project. It is not an official government website or service.
              Suggestions and corrections are welcome through the &quot;Report an error&quot; button on every profile.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/data-notes" className="pressable inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Data notes &amp; sources <ArrowRight className="size-4" /></Link>
              <Link href="/states" className="pressable inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold">Explore the states</Link>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  )
}
