import { buildSearchIndex } from "@/lib/search-index"

export const dynamic = "force-static"

// Search data is fetched the first time someone opens search, instead of shipping with every page.
export function GET() {
  return Response.json(buildSearchIndex())
}
