"use client"

import * as React from "react"
import { InsrHeader } from "@/components/insr-header"
import { HeroSection } from "@/components/hero-section"
import { SchemesAndFooter } from "@/components/schemes-and-footer"
import { AthleteLoginDialog } from "@/components/athlete-login-dialog"

export default function IndianSportsRepositoryPage() {
  const [loginOpen, setLoginOpen] = React.useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-background/45 text-foreground">
      <InsrHeader onOpenLogin={() => setLoginOpen(true)} />
      <main className="flex-1">
        <HeroSection onOpenLogin={() => setLoginOpen(true)} />
        <SchemesAndFooter />
      </main>
      <AthleteLoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </div>
  )
}
