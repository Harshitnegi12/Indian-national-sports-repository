"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  UserCheckIcon,
  ShieldCheckIcon,
  MenuIcon,
  XIcon,
  ArrowUpRightIcon,
  SparklesIcon,
} from "lucide-react"

interface InsrHeaderProps {
  onOpenLogin: () => void
}

export function InsrHeader({ onOpenLogin }: InsrHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const navItems = [
    { label: "National Overview", href: "#national-overview" },
    { label: "States & UTs Directory (36)", href: "#states-ut-directory" },
    { label: "Tracked Schemes", href: "#active-schemes" },
    { label: "Academy Network", href: "#infrastructure-network" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-border">
      {/* Subtle Indian Tricolor Hairline Strip */}
      <div className="h-1 w-full flex" aria-hidden="true">
        <div className="w-1/3 bg-saffron" />
        <div className="w-1/3 bg-white flex items-center justify-center">
          <div className="size-1 rounded-full bg-ashoka-navy" />
        </div>
        <div className="w-1/3 bg-india-green" />
      </div>

      {/* Independent Initiative Micro-Bar */}
      <div className="border-b border-border/60 bg-muted/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 sm:px-6 lg:px-8 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <SparklesIcon className="size-3 text-saffron" />
              Independent Citizen Initiative · Built for Indian Athletes & Citizens
            </span>
            <span className="hidden md:inline text-border">|</span>
            <span className="hidden md:inline font-mono text-[10px] tracking-wide uppercase text-muted-foreground">
              Private & Non-Governmental Public Sports Directory
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-india-green font-medium">
              <span className="size-1.5 rounded-full bg-saffron" />
              Prototype · Sample data
            </span>
            <span className="hidden sm:inline text-border">|</span>
            <a
              href="#states-ut-directory"
              className="hidden sm:inline-flex items-center gap-0.5 hover:text-foreground transition-colors font-medium"
            >
              28 States & 8 UTs Indexed
              <ArrowUpRightIcon className="size-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Clean Official Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group focus-visible:outline-none"
        >
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-ashoka-navy text-white shadow-xs ring-1 ring-ashoka-navy/20 group-hover:bg-ashoka-navy/95 transition-colors">
            {/* Custom Ashoka Chakra + Stadium Track Vector Emblem */}
            <svg
              viewBox="0 0 40 40"
              className="size-7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Top Saffron Arc */}
              <path
                d="M7 16C9.2 9.8 14.2 6 20 6C25.8 6 30.8 9.8 33 16"
                stroke="#F97316"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Bottom India Green Arc */}
              <path
                d="M7 24C9.2 30.2 14.2 34 20 34C25.8 34 30.8 30.2 33 24"
                stroke="#16A34A"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Center Ashoka Wheel */}
              <circle
                cx="20"
                cy="20"
                r="6.5"
                stroke="white"
                strokeWidth="1.6"
              />
              <circle cx="20" cy="20" r="1.8" fill="white" />
              {/* Spokes */}
              <path
                d="M20 13.5V26.5M13.5 20H26.5M15.4 15.4L24.6 24.6M24.6 15.4L15.4 24.6"
                stroke="white"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-tight text-ashoka-navy">
                INSR
              </span>
              <Badge
                variant="secondary"
                className="hidden sm:inline-flex text-[10px] font-mono px-1.5 py-0 h-4 bg-saffron/10 text-saffron border border-saffron/25"
              >
                COMMUNITY PORTAL
              </Badge>
            </div>
            <span className="text-[11px] font-medium text-muted-foreground leading-none">
              Indian National Sports Repository
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-1"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-ashoka-navy hover:bg-muted/70 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Prominent Athlete Login Button + Mobile Menu Button */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground mr-1">
            <ShieldCheckIcon className="size-3.5 text-india-green" />
            <span className="font-mono text-[11px]">INSR ID</span>
          </div>

          <Button
            onClick={onOpenLogin}
            className="bg-ashoka-navy text-white hover:bg-ashoka-navy/90 shadow-xs font-semibold px-4 h-9 cursor-pointer relative overflow-hidden group"
          >
            <span
              className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-saffron via-white to-india-green"
              aria-hidden="true"
            />
            <UserCheckIcon data-icon="inline-start" />
            <span>Portal Preview</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card px-4 py-3 flex flex-col gap-1.5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 border-t border-border mt-1 flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-mono">
              INSR Community Athlete Portal
            </span>
            <Button
              size="sm"
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenLogin()
              }}
              className="bg-saffron text-white hover:bg-saffron/90"
            >
              <UserCheckIcon data-icon="inline-start" />
              Portal Preview
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}


