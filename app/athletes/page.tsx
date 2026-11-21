import { InsrHeader } from "@/components/insr-header"
import { NationalAthleteDirectory } from "@/components/national-athlete-directory"

export default function AthletesDirectoryPage() {
  return <div className="min-h-screen bg-background/40 text-foreground"><InsrHeader /><main className="min-h-[75vh]"><div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8"><p className="text-xs font-bold uppercase tracking-[0.18em] text-india-green">National directory</p><h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ashoka-navy">Athletes across India</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Find listed athletes by name, sport, and region, then open their sourced individual profile.</p></div><NationalAthleteDirectory /></main></div>
}
