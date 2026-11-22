/** Placeholder layouts shown while a page is loading. */

export function HeroSkeleton({ stats = true }: { stats?: boolean }) {
  return (
    <section className="hero-surface relative overflow-hidden">
      <div className="site-container grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div className="space-y-4">
          <div className="h-5 w-40 rounded-md bg-white/10" />
          <div className="h-16 w-3/4 rounded-xl bg-white/10" />
          <div className="h-9 w-1/3 rounded-lg bg-white/[0.07]" />
          <div className="h-4 w-full max-w-xl rounded bg-white/[0.07]" />
          <div className="h-4 w-5/6 max-w-lg rounded bg-white/[0.07]" />
          <div className="flex gap-3 pt-4"><div className="h-12 w-44 rounded-xl bg-white/15" /><div className="h-12 w-32 rounded-xl bg-white/[0.07]" /></div>
        </div>
        {stats && (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }, (_, i) => <div key={i} className="h-28 rounded-2xl bg-white/[0.06]" />)}
          </div>
        )}
      </div>
    </section>
  )
}

export function CardGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex justify-between"><div className="skeleton size-11" /><div className="skeleton h-5 w-24 rounded-full" /></div>
          <div className="skeleton mt-4 h-5 w-2/3" />
          <div className="skeleton mt-2 h-4 w-1/2" />
          <div className="skeleton mt-4 h-4 w-full" />
          <div className="skeleton mt-2 h-4 w-4/5" />
        </div>
      ))}
    </div>
  )
}

export function ChipRowSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      {[88, 110, 96, 120, 84, 104, 92].map((w, i) => <div key={i} className="skeleton h-9 rounded-full" style={{ width: w }} />)}
    </div>
  )
}
