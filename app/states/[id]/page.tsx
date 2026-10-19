import { notFound } from "next/navigation"
import { INDIA_REGIONS } from "@/lib/india-sports-data"

export function generateStaticParams() {
  return INDIA_REGIONS.map((region) => ({ id: region.id }))
}

export default async function RegionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const region = INDIA_REGIONS.find((item) => item.id === id)
  if (!region) notFound()

  // Haryana keeps the supplied page. Every other region uses the same full
  // Khiladi experience, with its own region data loaded by the shared template.
  const src = region.id === "haryana"
    ? "/haryana-khiladi/index.html"
    : "/region-khiladi/index.html?region=" + encodeURIComponent(region.id)

  return <iframe
    title={`${region.name} Khiladi`}
    src={src}
    className="fixed inset-0 z-[100] h-dvh w-full border-0 bg-white"
  />
}
