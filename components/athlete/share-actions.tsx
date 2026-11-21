"use client"

import * as React from "react"
import { ArrowLeftRight, Check, Download, Link2, Share2 } from "lucide-react"
import Link from "next/link"

/** Share, download card (post or story size), copy link and compare buttons for a profile. */
export function ShareActions({ id, name }: { id: string; name: string }) {
  const [copied, setCopied] = React.useState(false)
  const url = typeof window !== "undefined" ? window.location.origin + "/athletes/" + id : "/athletes/" + id
  const button = "pressable inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/10"

  async function share() {
    const text = `${name} on Indian Sports Repository`
    if (navigator.share) {
      try { await navigator.share({ title: name, text, url }) } catch {}
    } else {
      window.open("https://wa.me/?text=" + encodeURIComponent(text + " " + url), "_blank", "noopener")
    }
  }

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <button type="button" onClick={share} className="pressable inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100"><Share2 className="size-4" /> Share</button>
      <a href={`/api/share/${id}`} download={`${id}-card.png`} className={button}><Download className="size-4" /> Card</a>
      <a href={`/api/share/${id}?format=story`} download={`${id}-story.png`} className={button}><Download className="size-4" /> Story</a>
      <button type="button" className={button} onClick={() => { navigator.clipboard?.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1600) }}>
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />} {copied ? "Copied" : "Copy link"}
      </button>
      <Link href={`/compare?a=${id}`} className={button}><ArrowLeftRight className="size-4" /> Compare</Link>
    </div>
  )
}
