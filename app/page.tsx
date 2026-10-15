"use client"

import * as React from "react"
import { InsrHeader } from "@/components/insr-header"
import { HeroSection } from "@/components/hero-section"
import { StatesUtGrid } from "@/components/states-ut-grid"
import { SchemesAndFooter } from "@/components/schemes-and-footer"
import { AthleteLoginDialog } from "@/components/athlete-login-dialog"

export default function IndianSportsRepositoryPage() {
  const [loginOpen, setLoginOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  return (
    <div className="min-h-screen flex flex-col bg-background/45 text-foreground">
      <InsrHeader onOpenLogin={() => setLoginOpen(true)} />

      <main className="flex-1">
        <HeroSection
          onQuickSearchRegion={(query) => setSearchQuery(query)}
          onOpenLogin={() => setLoginOpen(true)}
        />

        <StatesUtGrid
          externalSearchQuery={searchQuery}
          onExternalSearchChange={setSearchQuery}
          onOpenAthleteLogin={() => setLoginOpen(true)}
        />

        <SchemesAndFooter onOpenLogin={() => setLoginOpen(true)} />
      </main>

      <AthleteLoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </div>
  )
}


