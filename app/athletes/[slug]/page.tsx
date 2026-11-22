import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, BookOpen, Cake, ChevronRight, MapPin, Medal, PlayCircle, Trophy } from "lucide-react"
import {
  TIER_LABEL,
  compareAthletes,
  getAthleteById,
  getAthleteStaticParams,
  getAthletesForRegion,
  getSportCategory,
  getSportEvent,
  getSportSlug,
} from "@/lib/athlete-data"
import { getRegion, getRegionMeta } from "@/lib/region-meta"
import { formatBorn, getAthleteProfile } from "@/lib/athlete-profiles"
import { getAthleteVideos } from "@/lib/athlete-videos"
import { AthleteAvatar, AthleteCard, TierBadge } from "@/components/site/athlete-card"
import { LiteYouTube } from "@/components/athlete/lite-youtube"
import { Reveal } from "@/components/motion/motion-primitives"
import { ShareActions } from "@/components/athlete/share-actions"
import { ReportError } from "@/components/site/report-error"
import { DATA_UPDATED } from "@/lib/site-config"

export function generateStaticParams() {
  return getAthleteStaticParams()
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const athlete = getAthleteById(slug)
  if (!athlete) return {}
  const profile = getAthleteProfile(slug)
  void profile
  const image = { url: `/api/share/${slug}`, width: 1200, height: 630 }
  return { title: athlete.name, description: athlete.summary, openGraph: { images: [image] }, twitter: { card: "summary_large_image", images: [image.url] } }
}

export default async function AthletePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const athlete = getAthleteById(slug)
  if (!athlete) notFound()
  const region = getRegion(athlete.regionId)
  const meta = region ? getRegionMeta(region) : undefined
  const profile = getAthleteProfile(slug)
  const videos = getAthleteVideos(slug)
  const category = getSportCategory(athlete)
  const event = getSportEvent(athlete)
  const born = formatBorn(profile?.born)
  const story = profile?.story?.split("\n\n").filter(Boolean) ?? []
  const related = getAthletesForRegion(athlete.regionId)
    .filter((other) => other.id !== athlete.id && getSportSlug(other.sport) === getSportSlug(athlete.sport))
    .sort(compareAthletes)
    .slice(0, 4)
  const youtubeSearch = "https://www.youtube.com/results?search_query=" + encodeURIComponent(`${athlete.name} ${category} highlights`)

  const facts = [
    { icon: Medal, label: "Sport", value: event ? `${category} · ${event}` : category },
    region && { icon: MapPin, label: region.type, value: region.name, href: "/states/" + region.id },
    (athlete.hometown || profile?.birthplace) && { icon: MapPin, label: athlete.hometown ? "Hometown" : "Birthplace", value: athlete.hometown || profile?.birthplace },
    born && { icon: Cake, label: "Born", value: born },
    athlete.tier && { icon: Trophy, label: "Level", value: TIER_LABEL[athlete.tier] },
  ].filter(Boolean) as { icon: typeof Medal; label: string; value: string; href?: string }[]

  return (
    <div style={{ ["--accent-region" as string]: meta?.accent }}>
      <script
        type="application/ld+json"
        // Structured data so search engines understand the profile
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: athlete.name,
            description: athlete.summary,
            image: profile?.image?.src,
            birthDate: profile?.born,
            birthPlace: profile?.birthplace,
            nationality: "Indian",
            knowsAbout: category,
            sameAs: athlete.sources.map((s) => s.url),
          }).replace(/</g, "\\u003c"),
        }}
      />
      {/* Hero */}
      <section className="hero-surface relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="site-container relative py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-hero-muted">
            <Link href="/athletes" className="hover:text-white">Athletes</Link>
            <ChevronRight className="size-3.5" />
            {region && <><Link href={"/states/" + region.id} className="hover:text-white">{region.name}</Link><ChevronRight className="size-3.5" /></>}
            <span className="text-white">{athlete.name}</span>
          </nav>
          <div className="mt-8 grid items-end gap-8 md:grid-cols-[auto_1fr]">
            <Reveal y={16}>
              {profile?.image ? (
                <figure className="relative w-44 overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-2xl shadow-black/40 sm:w-56">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={profile.image.src} alt={`Photo of ${athlete.name}`} width={profile.image.width} height={profile.image.height} className="aspect-[4/5] w-full object-cover object-top" />
                </figure>
              ) : (
                <div className="flex aspect-[4/5] w-44 items-center justify-center rounded-3xl border border-white/15 sm:w-56" style={{ background: `linear-gradient(160deg, ${meta?.accent ?? "#13234A"}, #0B1120)` }}>
                  <AthleteAvatar name={athlete.name} accent="transparent" size="lg" />
                </div>
              )}
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow text-[#FFB366]">{category}{event ? " · " + event : ""}</p>
              <h1 className="mt-2 text-4xl font-bold text-white sm:text-6xl">{athlete.name}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-hero-muted">
                <TierBadge tier={athlete.tier} />
                {region && (
                  <Link href={"/states/" + region.id} className="inline-flex items-center gap-1.5 hover:text-white">
                    <MapPin className="size-4" /> {athlete.hometown ? athlete.hometown + ", " : ""}{region.name}
                  </Link>
                )}
                {born && <span className="inline-flex items-center gap-1.5"><Cake className="size-4" /> Born {born}</span>}
              </div>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-hero-muted">{athlete.summary}</p>
              <ShareActions id={athlete.id} name={athlete.name} />
            </Reveal>
          </div>
        </div>
      </section>

      <div className="site-container grid gap-6 py-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          {/* Story */}
          <Reveal>
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h2 className="flex items-center gap-2 text-xl font-bold"><BookOpen className="size-5 text-saffron" /> Story</h2>
              {story.length ? (
                <div className="mt-4 space-y-4 text-[15px] leading-7 text-foreground/85">
                  {story.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                  <p className="text-xs text-muted-foreground">
                    Text from{" "}
                    <a href={athlete.sources.find((s) => s.url.includes("wikipedia"))?.url ?? `https://en.wikipedia.org/wiki/${encodeURIComponent(profile!.title)}`} target="_blank" rel="noopener noreferrer" className="underline">Wikipedia</a>,
                    available under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="underline">CC BY-SA 4.0</a>.
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-[15px] leading-7 text-foreground/85">{athlete.summary}</p>
              )}
            </section>
          </Reveal>

          {/* Highlights */}
          <Reveal>
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h2 className="flex items-center gap-2 text-xl font-bold"><Trophy className="size-5 text-gold" /> Career highlights</h2>
              <ol className="mt-5 space-y-3">
                {athlete.highlights.map((item, index) => (
                  <li key={item} className="flex gap-4 rounded-xl bg-muted/60 p-4 text-sm leading-6">
                    <span className="font-mono text-xs font-semibold text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          {/* Videos */}
          <Reveal>
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h2 className="flex items-center gap-2 text-xl font-bold"><PlayCircle className="size-5 text-red-600" /> Videos</h2>
              {videos.length ? (
                <div className={"mt-5 grid gap-4 " + (videos.length > 1 ? "sm:grid-cols-2" : "")}>
                  {videos.map((video) => (
                    <div key={video.id}>
                      <LiteYouTube id={video.id} title={video.title} />
                      <p className="mt-2 text-xs text-muted-foreground">Official upload by {video.channel}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <a href={youtubeSearch} target="_blank" rel="noopener noreferrer" className="group mt-5 flex aspect-video items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 transition hover:border-red-500/50 hover:bg-red-500/5">
                  <span className="text-center">
                    <PlayCircle className="mx-auto size-12 text-red-600 transition group-hover:scale-110" />
                    <span className="mt-3 block font-semibold">Watch {athlete.name} on YouTube</span>
                    <span className="mt-1 block text-xs text-muted-foreground">Opens a YouTube search for match and medal highlights</span>
                  </span>
                </a>
              )}
            </section>
          </Reveal>
        </div>

        <aside className="space-y-6">
          <Reveal>
            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold">Profile</h2>
              <dl className="mt-4 divide-y divide-border">
                {facts.map(({ icon: Icon, label, value, href }) => (
                  <div key={label + value} className="flex items-start gap-3 py-3">
                    <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <dt className="w-24 shrink-0 text-sm text-muted-foreground">{label}</dt>
                    <dd className="text-sm font-medium">{href ? <Link href={href} className="hover:text-saffron">{value}</Link> : value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </Reveal>
          <Reveal>
            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold">Sources</h2>
              <ul className="mt-3 divide-y divide-border">
                {athlete.sources.map((source) => (
                  <li key={source.url + source.label} className="py-3">
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 text-sm font-semibold text-india-green hover:underline">
                      {source.label} <ArrowUpRight className="mt-0.5 size-3.5 shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
              {profile?.image && (
                <p className="mt-3 border-t border-border pt-3 text-xs leading-5 text-muted-foreground">
                  Photo: {profile.image.credit},{" "}
                  <a href={profile.image.page} target="_blank" rel="noopener noreferrer" className="underline">{profile.image.license}</a>, via Wikimedia Commons.
                </p>
              )}
              <p className="mt-3 rounded-lg bg-muted/60 p-3 text-xs leading-5 text-muted-foreground">This profile is selective and source-linked, not a complete career record. Last updated {DATA_UPDATED}.</p>
              <ReportError subject={`Profile: ${athlete.name}`} />
            </section>
          </Reveal>
        </aside>
      </div>

      {related.length > 0 && region && (
        <section className="site-container">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold">More {category.toLowerCase()} from {region.name}</h2>
            <Link href={"/states/" + region.id + "#sport=" + encodeURIComponent(category)} className="text-sm font-semibold hover:text-saffron">See all</Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((other) => <AthleteCard key={other.id} athlete={other} accent={meta?.accent} />)}
          </div>
        </section>
      )}

      {region && (
        <div className="site-container mt-10">
          <Link href={"/states/" + region.id} className="inline-flex items-center gap-2 text-sm font-semibold hover:text-saffron">
            <ArrowLeft className="size-4" /> Back to {region.name}
          </Link>
        </div>
      )}
    </div>
  )
}
