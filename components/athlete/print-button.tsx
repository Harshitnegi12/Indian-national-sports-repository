"use client"

import { Printer } from "lucide-react"

/** Opens the browser's print dialog; the print stylesheet gives a clean, school-project friendly PDF. */
export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="pressable inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/10">
      <Printer className="size-4" /> PDF
    </button>
  )
}
