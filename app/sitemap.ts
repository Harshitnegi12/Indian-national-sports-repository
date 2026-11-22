import type { MetadataRoute } from "next"
import { ATHLETES, getSportCounts } from "@/lib/athlete-data"
import { INDIA_REGIONS } from "@/lib/india-sports-data"
import { DECADES } from "@/lib/decades"
import { SITE_URL } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({ url: SITE_URL + path, lastModified: now, priority })
  return [
    page("/", 1),
    ...["/states", "/athletes", "/sports", "/rankings", "/women", "/para", "/timeline", "/compare", "/data-notes", "/medals", "/about"].map((p) => page(p, 0.8)),
    ...INDIA_REGIONS.map((r) => page("/states/" + r.id, 0.8)),
    ...getSportCounts(ATHLETES).map((s) => page("/sports/" + s.slug, 0.7)),
    ...DECADES.map((d) => page("/timeline/" + d.slug, 0.6)),
    ...ATHLETES.map((a) => page("/athletes/" + a.id, 0.5)),
  ]
}
