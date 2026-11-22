import socials from "@/lib/data/athlete-socials.json"

// Official social accounts from Wikidata (scripts/fetch-athlete-socials.js). Nothing is shown when none is known.

type Socials = { instagram?: string; x?: string; facebook?: string; youtube?: string }

const ICONS: Record<keyof Socials, { label: string; url: (v: string) => string; path: string }> = {
  instagram: {
    label: "Instagram",
    url: (v) => "https://www.instagram.com/" + v,
    path: "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.9-7.8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21 8.3c-.1-1.5-.4-2.8-1.5-3.8S17.2 3.1 15.7 3c-1.5-.1-6-.1-7.4 0-1.5.1-2.8.4-3.8 1.5S3.1 6.8 3 8.3c-.1 1.5-.1 6 0 7.4.1 1.5.4 2.8 1.5 3.8s2.3 1.4 3.8 1.5c1.5.1 6 .1 7.4 0 1.5-.1 2.8-.4 3.8-1.5s1.4-2.3 1.5-3.8c.1-1.5.1-5.9 0-7.4Zm-2 9.5a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.3.4s-4.1.1-5.3-.4a3 3 0 0 1-1.7-1.7c-.5-1.2-.4-4-.4-5.3s-.1-4.1.4-5.3a3 3 0 0 1 1.7-1.7c1.2-.5 4-.4 5.3-.4s4.1-.1 5.3.4a3 3 0 0 1 1.7 1.7c.5 1.2.4 4 .4 5.3s.1 4.1-.4 5.3Z",
  },
  x: {
    label: "X (Twitter)",
    url: (v) => "https://x.com/" + v,
    path: "M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.5l11.2 14.5Z",
  },
  facebook: {
    label: "Facebook",
    url: (v) => "https://www.facebook.com/" + v,
    path: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z",
  },
  youtube: {
    label: "YouTube",
    url: (v) => "https://www.youtube.com/channel/" + v,
    path: "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-4.8.5-4.8s0-3.2-.5-4.8ZM9.8 15V9l5.7 3-5.7 3Z",
  },
}

export function getAthleteSocials(id: string): Socials | undefined {
  return (socials as Record<string, Socials>)[id]
}

export function SocialLinks({ id, name }: { id: string; name: string }) {
  const s = getAthleteSocials(id)
  if (!s) return null
  const items = (Object.keys(ICONS) as (keyof Socials)[]).filter((k) => s[k])
  return (
    <div className="mt-5 flex items-center gap-2">
      <span className="text-xs text-hero-muted">Follow</span>
      {items.map((k) => (
        <a
          key={k}
          href={ICONS[k].url(s[k]!)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on ${ICONS[k].label}`}
          title={`${ICONS[k].label}${k === "youtube" ? "" : ": @" + s[k]}`}
          className="pressable flex size-9 items-center justify-center rounded-full border border-white/20 text-white/85 transition hover:border-white/50 hover:bg-white/10 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true"><path d={ICONS[k].path} /></svg>
        </a>
      ))}
    </div>
  )
}
