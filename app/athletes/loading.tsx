import { CardGridSkeleton, HeroSkeleton } from "@/components/site/skeletons"

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading athletes">
      <HeroSkeleton stats={false} />
      <div className="site-container space-y-6 py-10">
        <div className="skeleton h-[76px] w-full rounded-2xl" />
        <CardGridSkeleton count={12} />
      </div>
    </div>
  )
}
