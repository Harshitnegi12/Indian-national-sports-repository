"use client"

import { Search } from "lucide-react"

/** Big search box that opens the global search dialog in the header. */
export function SearchLauncher({ placeholder = "Search an athlete, sport or state…" }: { placeholder?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("insr:open-search"))}
      className="group flex h-14 w-full max-w-xl items-center gap-3 rounded-2xl bg-white px-5 text-left text-slate-500 shadow-xl shadow-black/20 ring-1 ring-white/20 transition hover:ring-[#FF9933]/60"
    >
      <Search className="size-5 text-slate-400 group-hover:text-[#E8731A]" />
      <span className="flex-1 truncate text-[15px]">{placeholder}</span>
      <kbd className="hidden rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] text-slate-500 sm:inline">Ctrl K</kbd>
    </button>
  )
}
