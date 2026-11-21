import Link from "next/link"
import { ArrowLeft, MapPin } from "lucide-react"

export default function NotFound() {
  return (
    <section className="site-container flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-8xl font-bold text-saffron/90">404</p>
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">This page is out of bounds</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you were looking for doesn't exist or has moved. Try a state or athlete instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
          <ArrowLeft className="size-4" /> Back to home
        </Link>
        <Link href="/states" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold">
          <MapPin className="size-4" /> Browse states &amp; UTs
        </Link>
      </div>
    </section>
  )
}
