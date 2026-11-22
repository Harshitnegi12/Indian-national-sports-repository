import { ATHLETES, compareAthletes } from "@/lib/athlete-data"
import { getAthleteProfile } from "@/lib/athlete-profiles"
import { getRegion } from "@/lib/region-meta"

// Athletes born on a given day (?md=MM-DD), best known first.
export function GET(req: Request) {
  const md = new URL(req.url).searchParams.get("md") ?? ""
  if (!/^\d{2}-\d{2}$/.test(md)) return Response.json({ error: "md must be MM-DD" }, { status: 400 })
  const people = ATHLETES.map((a) => ({ a, born: getAthleteProfile(a.id)?.born }))
    .filter(({ born }) => born && born.length >= 10 && born.slice(5, 10) === md)
    .sort((x, y) => compareAthletes(x.a, y.a))
    .slice(0, 8)
    .map(({ a, born }) => ({ id: a.id, name: a.name, sport: a.sport.split("·")[0].trim(), region: getRegion(a.regionId)?.name, year: Number(born!.slice(0, 4)), photo: a.photo ?? null, tier: a.tier ?? null }))
  return Response.json({ md, people }, { headers: { "Cache-Control": "public, max-age=3600" } })
}
