"use client"

import * as React from "react"
import { motion, useScroll, useSpring } from "motion/react"
import { T } from "@/components/site/lang"

/** Sticky in-page menu that highlights the section in view, plus a reading-progress bar. */
export function SectionNav({ sections, accent }: { sections: { id: string; label: string; hi?: string }[]; accent: string }) {
  const [active, setActive] = React.useState(sections[0]?.id)
  const navRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  // The active section is the last one whose top has passed a line just below the sticky bars.
  React.useEffect(() => {
    let frame = 0
    function update() {
      const line = 180
      let current = sections[0]?.id
      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el && el.getBoundingClientRect().top <= line) current = section.id
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = sections[sections.length - 1]?.id
      setActive(current)
    }
    function onScroll() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [sections])

  // Keep the active item visible in the horizontally scrolling bar on phones.
  React.useEffect(() => {
    const item = navRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`)
    const bar = navRef.current
    if (item && bar) bar.scrollTo({ left: item.offsetLeft - bar.clientWidth / 2 + item.clientWidth / 2, behavior: "smooth" })
  }, [active])

  return (
    <div className="sticky top-[67px] z-30 border-b border-border bg-background/85 backdrop-blur-xl">
      <nav ref={navRef} aria-label="On this page" className="site-container no-scrollbar flex gap-1 overflow-x-auto py-2">
        {sections.map((section) => {
          const isActive = active === section.id
          return (
            <a
              key={section.id}
              data-id={section.id}
              href={"#" + section.id}
              aria-current={isActive ? "true" : undefined}
              onClick={() => setActive(section.id)}
              className={"pressable relative shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors " + (isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              {isActive && <motion.span layoutId="section-pill" className="absolute inset-0 rounded-lg bg-muted" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
              <span className="relative">{section.hi ? <T en={section.label} hi={section.hi} /> : section.label}</span>
            </a>
          )
        })}
      </nav>
      <motion.div className="absolute inset-x-0 bottom-0 h-0.5 origin-left" style={{ scaleX: progress, background: accent }} aria-hidden="true" />
    </div>
  )
}
