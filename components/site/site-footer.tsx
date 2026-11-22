import Link from "next/link"
import { BrandMark } from "@/components/site/brand-mark"
import { REGIONS_SORTED } from "@/lib/region-meta"

export function SiteFooter() {
  const states = REGIONS_SORTED.filter((region) => region.type === "State")
  const uts = REGIONS_SORTED.filter((region) => region.type === "Union Territory")
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="site-container grid gap-10 py-14 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <BrandMark />
            <span className="font-display text-lg font-bold">Indian Sports Repository</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            A state-by-state directory of Indian athletes, with every profile linked to a public source.
            An independent community project by Harshit, not an official government service.
          </p>
          <nav aria-label="Footer" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
            <Link href="/states" className="hover:text-saffron">States &amp; UTs</Link>
            <Link href="/athletes" className="hover:text-saffron">Athletes</Link>
            <Link href="/sports" className="hover:text-saffron">Sports</Link>
            <Link href="/rankings" className="hover:text-saffron">Rankings</Link>
            <Link href="/women" className="hover:text-saffron">Women in Sports</Link>
            <Link href="/para" className="hover:text-saffron">Para Champions</Link>
            <Link href="/timeline" className="hover:text-saffron">Timeline</Link>
            <Link href="/compare" className="hover:text-saffron">Compare</Link>
            <Link href="/medals" className="hover:text-saffron">Medal wall</Link>
            <Link href="/about" className="hover:text-saffron">About</Link>
            <Link href="/data-notes" className="hover:text-saffron">Data notes &amp; sources</Link>
          </nav>
        </div>
        <div className="grid gap-8 sm:grid-cols-[2fr_1fr]">
          <div>
            <p className="eyebrow text-muted-foreground">States</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm sm:grid-cols-3">
              {states.map((region) => (
                <li key={region.id}><Link href={"/states/" + region.id} className="text-foreground/75 hover:text-foreground">{region.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">Union territories</p>
            <ul className="mt-3 grid gap-y-1.5 text-sm">
              {uts.map((region) => (
                <li key={region.id}><Link href={"/states/" + region.id} className="text-foreground/75 hover:text-foreground">{region.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="site-container flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Details should be confirmed against the linked primary record. Player Corner sign-in is a demo and stays in your browser. Map data: DataMeet, CC BY 4.0.</p>
          <div className="tricolor-rule w-16 rounded-full" aria-hidden="true" />
        </div>
      </div>
    </footer>
  )
}
