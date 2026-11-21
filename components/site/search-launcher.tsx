"use client"

import { Search } from "lucide-react"

function openSearch(query = "") {
  window.dispatchEvent(new CustomEvent("insr:open-search", { detail: query }))
}

/** Big search box that opens the global search dialog in the header. */
export function SearchLauncher({ placeholder = "Search an athlete, sport or state…" }: { placeholder?: string }) {
  return (
    <button
      type="button"
      onClick={() => openSearch()}
      className="pressable group flex h-14 w-full max-w-xl items-center gap-3 rounded-2xl bg-white px-5 text-left text-slate-500 shadow-xl shadow-black/20 ring-1 ring-white/20 hover:shadow-2xl hover:ring-4 hover:ring-[#FF9933]/40"
    >
      <Search className="size-5 text-slate-400 transition group-hover:scale-110 group-hover:text-[#E8731A]" />
      <span className="flex-1 truncate text-[15px]">{placeholder}</span>
      <kbd className="hidden rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] text-slate-500 sm:inline">Ctrl K</kbd>
    </button>
  )
}

/** Small chip that opens search with a query already typed in. */
export function SearchSuggestion({ term }: { term: string }) {
  return (
    <button
      type="button"
      onClick={() => openSearch(term)}
      className="pressable rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[13px] font-medium text-white/85 hover:border-[#FF9933]/60 hover:bg-white/10 hover:text-white"
    >
      {term}
    </button>
  )
}
