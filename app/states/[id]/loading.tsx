import { CardGridSkeleton, ChipRowSkeleton, HeroSkeleton } from "@/components/site/skeletons"

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading state page">
      <div className="h-[61px] border-b border-border bg-card/60" />
      <HeroSkeleton />
      <div className="site-container space-y-6 py-16">
        <div className="skeleton h-9 w-72" />
        <ChipRowSkeleton />
        <CardGridSkeleton />
      </div>
    </div>
  )
}
