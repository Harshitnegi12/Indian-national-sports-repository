"use client"

import * as React from "react"
import { Play } from "lucide-react"

/** Lightweight YouTube embed: shows the thumbnail and only loads the player when clicked. */
export function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = React.useState(false)
  return (
    <div className="group relative aspect-video overflow-hidden rounded-xl bg-black">
      {playing ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="absolute inset-0 size-full" aria-label={"Play video: " + title}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="size-full object-cover opacity-90 transition duration-300 group-hover:scale-[1.03] group-hover:opacity-100" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition group-hover:scale-110">
            <Play className="ml-1 size-7 fill-current" />
          </span>
          <span className="absolute inset-x-0 bottom-0 line-clamp-2 p-4 text-left text-sm font-semibold text-white">{title}</span>
        </button>
      )}
    </div>
  )
}
