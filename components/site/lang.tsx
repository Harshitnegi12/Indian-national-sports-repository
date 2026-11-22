"use client"

import * as React from "react"
import { Languages } from "lucide-react"

/**
 * Bilingual text. Both languages are rendered and CSS shows the active one (html.lang-hi),
 * so it works inside server components and switching is instant.
 */
export function T({ en, hi }: { en: React.ReactNode; hi: React.ReactNode }) {
  return (
    <>
      <span className="t-en">{en}</span>
      <span className="t-hi font-hindi" lang="hi">{hi}</span>
    </>
  )
}

export function LanguageToggle() {
  const [lang, setLang] = React.useState<"en" | "hi">("en")
  React.useEffect(() => setLang(document.documentElement.classList.contains("lang-hi") ? "hi" : "en"), [])
  function toggle() {
    const next = lang === "en" ? "hi" : "en"
    document.documentElement.classList.toggle("lang-hi", next === "hi")
    document.documentElement.lang = next
    try { localStorage.setItem("insr-lang", next) } catch {}
    setLang(next)
  }
  return (
    <button type="button" onClick={toggle} aria-label={lang === "en" ? "हिंदी में देखें" : "Switch to English"} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 text-sm font-semibold text-muted-foreground transition hover:text-foreground">
      <Languages className="size-4" />
      <span className={lang === "en" ? "font-hindi" : ""}>{lang === "en" ? "हिं" : "EN"}</span>
    </button>
  )
}
