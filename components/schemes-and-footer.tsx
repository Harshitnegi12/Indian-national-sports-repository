import Link from "next/link"

export function SchemesAndFooter() {
  return <footer className="border-t border-border bg-muted/40 py-8">
    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
      <div><p className="font-bold text-ashoka-navy">Indian National Sports Repository</p><p className="mt-1 text-xs text-muted-foreground">Independent community project by Harshit and Vishakha.</p></div>
      <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-4"><Link href="/states" className="text-xs font-medium text-muted-foreground hover:text-foreground">States &amp; UTs</Link><Link href="/athletes" className="text-xs font-medium text-muted-foreground hover:text-foreground">Athletes</Link><Link href="/data-notes" className="text-xs font-medium text-muted-foreground hover:text-foreground">Data notes</Link></nav>
    </div>
  </footer>
}
