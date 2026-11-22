import { ImageResponse } from "next/og"
import { TIER_LABEL, getAthleteById, getSportCategory } from "@/lib/athlete-data"
import { getAthleteProfile } from "@/lib/athlete-profiles"
import { getRegion, getRegionMeta } from "@/lib/region-meta"

// Wikimedia rejects image requests without a User-Agent, so the photo is fetched here and inlined.
// If it can't be fetched (or is an unsupported format), the card falls back to the athlete's initials.
async function loadPhoto(src?: string) {
  if (!src) return undefined
  try {
    const res = await fetch(src, { headers: { "User-Agent": "IndianSportsRepository/1.0 (share cards)" }, signal: AbortSignal.timeout(6000) })
    const type = res.headers.get("content-type") ?? ""
    if (!res.ok || !/image\/(jpeg|png)/.test(type)) return undefined
    const buf = Buffer.from(await res.arrayBuffer())
    return `data:${type.split(";")[0]};base64,${buf.toString("base64")}`
  } catch {
    return undefined
  }
}

// Share card for an athlete. Default 1200x630 (link previews, WhatsApp); ?format=story gives 1080x1920 (Instagram stories).
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const athlete = getAthleteById(id)
  if (!athlete) return new Response("Not found", { status: 404 })
  const story = new URL(req.url).searchParams.get("format") === "story"
  const profile = getAthleteProfile(id)
  const region = getRegion(athlete.regionId)
  const accent = region ? getRegionMeta(region).accent : "#E8731A"
  const photo = await loadPhoto(profile?.image?.src)
  const width = story ? 1080 : 1200
  const height = story ? 1920 : 630
  const highlight = athlete.highlights[0] ?? athlete.summary

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: story ? "column" : "row", background: "#0B1328", color: "white", fontFamily: "sans-serif", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 12, display: "flex" }}>
          <div style={{ flex: 1, background: "#FF9933" }} /><div style={{ flex: 1, background: "#FFFFFF" }} /><div style={{ flex: 1, background: "#138808" }} />
        </div>
        <div style={{ display: "flex", width: story ? "100%" : 460, height: story ? 1080 : "100%", background: `linear-gradient(160deg, ${accent}, #0B1328)`, alignItems: "center", justifyContent: "center" }}>
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          ) : (
            <div style={{ fontSize: story ? 260 : 180, fontWeight: 800, opacity: 0.9 }}>{athlete.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}</div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: story ? "70px 80px" : "60px 64px", flex: 1, gap: story ? 28 : 18 }}>
          <div style={{ fontSize: story ? 34 : 24, color: "#FFB366", letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>{getSportCategory(athlete)}</div>
          <div style={{ fontSize: story ? 104 : 72, fontWeight: 800, lineHeight: 1.02 }}>{athlete.name}</div>
          <div style={{ fontSize: story ? 38 : 28, color: "#C9D2E3" }}>{[athlete.hometown, region?.name].filter(Boolean).join(", ")}</div>
          {athlete.tier && <div style={{ display: "flex" }}><div style={{ fontSize: story ? 30 : 22, background: "rgba(255,255,255,0.12)", borderRadius: 999, padding: "8px 22px" }}>{TIER_LABEL[athlete.tier]}</div></div>}
          <div style={{ fontSize: story ? 36 : 26, lineHeight: 1.35, color: "#E5EAF3", maxWidth: 900 }}>{highlight.length > 160 ? highlight.slice(0, 157) + "…" : highlight}</div>
          <div style={{ marginTop: story ? 40 : 12, fontSize: story ? 28 : 20, color: "#8FA0BF" }}>Indian Sports Repository</div>
        </div>
      </div>
    ),
    { width, height, headers: { "Cache-Control": "public, max-age=86400, immutable" } },
  )
}
