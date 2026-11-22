import { ATHLETES } from "@/lib/athlete-data"

export const dynamic = "force-dynamic"

// "Random player": redirects to a random athlete profile (photos first, so the surprise looks good).
export function GET(req: Request) {
  const withPhoto = ATHLETES.filter((a) => a.photo)
  const pool = withPhoto.length > 50 ? withPhoto : ATHLETES
  const athlete = pool[Math.floor(Math.random() * pool.length)]
  return Response.redirect(new URL("/athletes/" + athlete.id, req.url), 307)
}
