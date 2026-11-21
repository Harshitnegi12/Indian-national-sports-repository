"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Copy, Flag, Mail, X } from "lucide-react"
import { REPORT_EMAIL } from "@/lib/site-config"

/** "Report an error" button: visitors describe the problem; it opens their email app (or copies the report). */
export function ReportError({ subject, className = "" }: { subject: string; className?: string }) {
  const [open, setOpen] = React.useState(false)
  const [text, setText] = React.useState("")
  const [copied, setCopied] = React.useState(false)
  const body = () => `${text}\n\nPage: ${window.location.href}`

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={"pressable mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground " + className}>
        <Flag className="size-3.5" /> Report an error
      </button>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Report an error">
            <motion.button type="button" aria-label="Close" className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} className="relative w-full max-w-md rounded-2xl border border-border bg-popover p-6 shadow-2xl">
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"><X className="size-5" /></button>
              <h2 className="text-lg font-bold">Report an error</h2>
              <p className="mt-1 text-sm text-muted-foreground">Spotted something wrong or missing? Tell us what to fix, and add a source link if you have one.</p>
              <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} autoFocus placeholder="e.g. Hometown should be Rohtak, see …" className="mt-4 w-full resize-none rounded-xl border border-input bg-background p-3 text-sm outline-none focus:border-ring" />
              <div className="mt-4 flex flex-wrap gap-2">
                {REPORT_EMAIL && (
                  <a href={`mailto:${REPORT_EMAIL}?subject=${encodeURIComponent("Correction: " + subject)}&body=${encodeURIComponent(text)}`} onClick={(e) => { (e.currentTarget as HTMLAnchorElement).href = `mailto:${REPORT_EMAIL}?subject=${encodeURIComponent("Correction: " + subject)}&body=${encodeURIComponent(body())}` }} className="pressable inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
                    <Mail className="size-4" /> Send by email
                  </a>
                )}
                <button type="button" disabled={!text.trim()} onClick={() => { navigator.clipboard?.writeText(`Correction: ${subject}\n\n${body()}`); setCopied(true); setTimeout(() => setCopied(false), 1600) }} className="pressable inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold disabled:opacity-50">
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />} {copied ? "Copied" : "Copy report"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
