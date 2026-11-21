"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { StatesUtGrid } from "@/components/states-ut-grid"

export function StatesDirectoryRoute() {
  const params = useSearchParams()
  const [query, setQuery] = React.useState(params.get("search") ?? "")
  return <StatesUtGrid externalSearchQuery={query} onExternalSearchChange={setQuery} />
}
