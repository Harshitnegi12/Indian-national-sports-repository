import { notFound, redirect } from "next/navigation"
import { SPORT_CATEGORIES, getSportSlug } from "@/lib/athlete-data"
import { getRegion } from "@/lib/region-meta"

// Old per-sport URLs now open the state page with that sport already selected.
export default async function RegionSportPage({ params }: { params: Promise<{ id: string; sport: string }> }) {
  const { id, sport } = await params
  const title = SPORT_CATEGORIES.find((item) => getSportSlug(item) === sport)
  if (!getRegion(id) || !title) notFound()
  redirect(`/states/${id}#sport=${encodeURIComponent(title)}`)
}
