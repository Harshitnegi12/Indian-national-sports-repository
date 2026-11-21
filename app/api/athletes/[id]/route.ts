import { getAthleteById } from "@/lib/athlete-data"
import { getAthleteProfile } from "@/lib/athlete-profiles"
import { getRegion } from "@/lib/region-meta"

// Compact athlete details for client features such as Compare.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const athlete = getAthleteById(id)
  if (!athlete) return Response.json({ error: "Not found" }, { status: 404 })
  const profile = getAthleteProfile(id)
  return Response.json({
    id: athlete.id,
    name: athlete.name,
    sport: athlete.sport,
    tier: athlete.tier ?? null,
    region: getRegion(athlete.regionId)?.name ?? athlete.regionId,
    regionId: athlete.regionId,
    hometown: athlete.hometown ?? profile?.birthplace ?? null,
    born: profile?.born ?? null,
    photo: profile?.image?.src ?? null,
    summary: athlete.summary,
    highlights: athlete.highlights,
    sources: athlete.sources,
  })
}
