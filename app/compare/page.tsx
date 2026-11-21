import type { Metadata } from "next"
import { Suspense } from "react"
import { PageHero } from "@/components/site/page-hero"
import { CompareTool } from "@/components/compare/compare-tool"

export const metadata: Metadata = { title: "Compare players", description: "Put two Indian athletes side by side: sport, state, era, highest level and career highlights." }

export default function ComparePage() {
  return (
    <>
      <PageHero eyebrow="Compare" title="Compare two players" hindi="दो खिलाड़ियों की तुलना" text="Pick any two athletes to see their sport, state, era, highest level and highlights side by side. Share the link to show a friend." />
      <div className="site-container py-12">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
          <CompareTool />
        </Suspense>
      </div>
    </>
  )
}
