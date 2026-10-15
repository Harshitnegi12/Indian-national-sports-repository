"use client"

import * as React from "react"
import { CENTRAL_SCHEMES } from "@/lib/india-sports-data"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  AwardIcon,
  Building2Icon,
  CheckCircle2Icon,
  ShieldCheckIcon,
  ArrowUpRightIcon,
  LandmarkIcon,
  CompassIcon,
  ActivityIcon,
  UserCheckIcon,
} from "lucide-react"

interface SchemesAndFooterProps {
  onOpenLogin: () => void
}

export function SchemesAndFooter({ onOpenLogin }: SchemesAndFooterProps) {
  return (
    <>
      {/* Active Central Schemes Section */}
      <section
        id="active-schemes"
        className="py-12 sm:py-16 border-t border-border bg-muted/30 scroll-mt-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-saffron/30 bg-saffron/10 text-saffron font-mono text-xs uppercase"
                >
                  <AwardIcon className="mr-1.5 size-3.5" />
                  Sample Programme Cards
                </Badge>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ashoka-navy">
                Sports Programme Examples
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                Example programme cards for this interface preview. Details, amounts, and eligibility are not verified and should not be used to make decisions.
              </p>
            </div>

            <Button
              onClick={onOpenLogin}
              variant="outline"
              className="self-start md:self-auto border-ashoka-navy/25 text-ashoka-navy hover:bg-ashoka-navy hover:text-white"
            >
              <UserCheckIcon data-icon="inline-start" />
              View Portal Demo
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {CENTRAL_SCHEMES.map((scheme) => {
              const topBarClass =
                scheme.accent === "saffron"
                  ? "bg-saffron"
                  : scheme.accent === "green"
                    ? "bg-india-green"
                    : "bg-ashoka-navy"

              return (
                <Card
                  key={scheme.id}
                  className="border-border bg-card shadow-2xs hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className={`h-1 w-full ${topBarClass}`} />
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-muted px-2 py-0.5 font-mono text-xs font-bold text-ashoka-navy border border-border">
                          {scheme.code}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">
                          {scheme.ministryUnit}
                        </span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-india-green/10 text-india-green border border-india-green/25 font-mono text-[11px]"
                      >
                        <CheckCircle2Icon className="mr-1 size-3" />
                        Sample entry
                      </Badge>
                    </div>

                    <CardTitle className="text-lg font-bold text-ashoka-navy pt-1">
                      {scheme.name}
                    </CardTitle>
                    <p className="font-mono text-xs text-muted-foreground">
                      {scheme.hindiTitle}
                    </p>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-4">
                    <CardDescription className="text-xs sm:text-sm leading-relaxed text-foreground/80">
                      {scheme.description}
                    </CardDescription>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 rounded-xl bg-muted/60 p-3 border border-border/70 text-xs">
                      <div>
                        <span className="text-muted-foreground block text-[11px]">
                          Example Allocation
                        </span>
                        <span className="font-mono font-bold text-ashoka-navy text-sm">
                          INR {scheme.annualAllocationCr.toFixed(1)} Cr
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[11px]">
                          Example Figure
                        </span>
                        <span className="font-mono font-semibold text-saffron">
                          {scheme.highlightMetric}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[11px]">
                          Example Coverage
                        </span>
                        <span className="font-medium text-foreground">
                          {scheme.beneficiaries}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* SAI & NCOE Infrastructure Network Banner */}
      <section
        id="infrastructure-network"
        className="py-12 sm:py-16 border-t border-border bg-card scroll-mt-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-ashoka-navy text-white p-6 sm:p-10 relative overflow-hidden shadow-sm">
            {/* Subtle Tricolor Top Accent */}
            <div className="absolute inset-x-0 top-0 h-1.5 flex">
              <div className="w-1/3 bg-saffron" />
              <div className="w-1/3 bg-white" />
              <div className="w-1/3 bg-india-green" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-saffron">
                  <CompassIcon className="size-4" />
                  Community-Mapped Sports Infrastructure
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-balance">
                  4,918 Sports Academies Indexed Across India for Easy Discovery
                </h3>
                <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
                  Built by an independent citizen creator for the people of India —
                  making it simple for aspiring players and parents in all 28 States
                  and 8 Union Territories to discover nearby training centres, stadiums,
                  and sports academies in one place.
                </p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/10 backdrop-blur-xs p-4 border border-white/15">
                  <ActivityIcon className="size-5 text-saffron mb-1.5" />
                  <div className="font-mono text-2xl font-extrabold">23</div>
                  <div className="text-xs text-white/80">
                    National Centres of Excellence Indexed
                  </div>
                </div>
                <div className="rounded-xl bg-white/10 backdrop-blur-xs p-4 border border-white/15">
                  <Building2Icon className="size-5 text-india-green mb-1.5" />
                  <div className="font-mono text-2xl font-extrabold">1,045</div>
                  <div className="text-xs text-white/80">
                    District Sports Centres Mapped
                  </div>
                </div>
                <div className="rounded-xl bg-white/10 backdrop-blur-xs p-4 border border-white/15">
                  <ShieldCheckIcon className="size-5 text-white mb-1.5" />
                  <div className="font-mono text-2xl font-extrabold">3,850</div>
                  <div className="text-xs text-white/80">
                    Private & Regional Academies Listed
                  </div>
                </div>
                <div className="rounded-xl bg-white/10 backdrop-blur-xs p-4 border border-white/15">
                  <LandmarkIcon className="size-5 text-saffron mb-1.5" />
                  <div className="font-mono text-2xl font-extrabold">100%</div>
                  <div className="text-xs text-white/80">
                    Free & Open for Every Indian Citizen
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Independent Footer */}
      <footer className="border-t border-border bg-muted/50 text-foreground">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Prominent Non-Gov Disclaimer Banner */}
          <div className="mb-8 rounded-xl border border-saffron/30 bg-card p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-3">
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-saffron/10 text-saffron font-mono text-xs font-bold border border-saffron/25">
                INFO
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Independent Private Initiative Disclaimer:</strong>{" "}
                This website is a personal, privately created project built for the people and athletes of India. It is{" "}
                <strong className="text-foreground">not affiliated with, endorsed by, or operated by the Government of India</strong>{" "}
                or any government ministry. Figures, scheme entries, and academy listings are static sample content and have not been independently verified.
              </p>
            </div>
            <Badge
              variant="outline"
              className="shrink-0 self-start sm:self-center font-mono text-[10px] border-ashoka-navy/25 text-ashoka-navy"
            >
              Non-Gov · Citizen Built
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-5 flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-ashoka-navy text-white font-bold text-xs">
                  INSR
                </div>
                <span className="font-bold text-base text-ashoka-navy">
                  Indian National Sports Repository
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                An independent, community-first sports repository and academy directory
                built privately to empower Indian athletes, coaches, and sports fans
                across all 28 States and 8 Union Territories.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground pt-1">
                <span className="inline-block size-2 rounded-full bg-saffron" />
                <span className="inline-block size-2 rounded-full bg-ashoka-navy" />
                <span className="inline-block size-2 rounded-full bg-india-green" />
                <span>Project by Harshit and Vishakha</span>
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col gap-2 text-xs">
              <span className="font-semibold uppercase tracking-wider text-ashoka-navy">
                Repository Sections
              </span>
              <a
                href="#national-overview"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                National Sports Overview
              </a>
              <a
                href="#states-ut-directory"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                28 States & 8 UTs Directory
              </a>
              <a
                href="#active-schemes"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Programme Card Examples
              </a>
              <a
                href="#infrastructure-network"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Sample Academy Listings
              </a>
            </div>

            <div className="md:col-span-4 flex flex-col gap-2 text-xs">
              <span className="font-semibold uppercase tracking-wider text-ashoka-navy">
                Athlete & Community Portal
              </span>
              <p className="text-muted-foreground leading-relaxed">
                Portal preview only. Real accounts, sign-in, bookmarks, and academy listings are not active.
              </p>
              <div className="pt-1">
                <Button
                  size="sm"
                  onClick={onOpenLogin}
                  className="bg-ashoka-navy text-white hover:bg-ashoka-navy/90"
                >
                  View Portal Demo
                  <ArrowUpRightIcon data-icon="inline-end" />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <span>
              © {new Date().getFullYear()} Indian National Sports Repository (INSR) · Independent Private Project for India.
            </span>
            <span className="font-mono text-[11px]">
              Non-Governmental Public Directory · All 28 States & 8 UTs Covered
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}



