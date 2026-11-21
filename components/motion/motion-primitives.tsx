"use client"

import * as React from "react"
import { MotionConfig, animate, motion, useInView, useReducedMotion, type HTMLMotionProps } from "motion/react"

const EASE = [0.22, 1, 0.36, 1] as const

/** Respects the visitor's "reduce motion" setting for every animation below. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user" transition={{ ease: EASE }}>{children}</MotionConfig>
}

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({ children, delay = 0, y = 18, className, ...rest }: { children: React.ReactNode; delay?: number; y?: number; className?: string } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Grid/list whose direct <StaggerItem> children animate in one after another. */
export function Stagger({ children, className, gap = 0.06 }: { children: React.ReactNode; className?: string; gap?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
    >
      {children}
    </motion.div>
  )
}

/** Counts up from 0 to `value` when it becomes visible. Non-numeric values are shown as-is. */
export function AnimatedNumber({ value, className, duration = 1.2 }: { value: number | string; className?: string; duration?: number }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" })
  const reduce = useReducedMotion()
  const numeric = typeof value === "number" ? value : Number.NaN

  React.useEffect(() => {
    const el = ref.current
    if (!el || !inView || Number.isNaN(numeric)) return
    if (reduce) {
      el.textContent = String(numeric)
      return
    }
    const controls = animate(0, numeric, {
      duration,
      ease: EASE,
      onUpdate: (latest) => { el.textContent = String(Math.round(latest)) },
    })
    return () => controls.stop()
  }, [inView, numeric, duration, reduce])

  return (
    <span ref={ref} className={"tabular-nums " + (className ?? "")}>
      {Number.isNaN(numeric) ? value : 0}
    </span>
  )
}

/** Headline that reveals word by word on first load. */
export function WordReveal({ lines, className }: { lines: { text: string; className?: string }[]; className?: string }) {
  let index = 0
  return (
    <span className={className}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.text.split(" ").map((word) => {
            const i = index++
            return (
              <span key={word + i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className={"inline-block " + (line.className ?? "")}
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.08 + i * 0.07, ease: EASE }}
                >
                  {word}
                  {" "}
                </motion.span>
              </span>
            )
          })}
        </span>
      ))}
    </span>
  )
}

/** Updates --mx/--my on any `.spotlight` element under the cursor (one listener for the whole page). */
export function SpotlightTracker() {
  React.useEffect(() => {
    let frame = 0
    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return
      const target = (event.target as Element | null)?.closest?.(".spotlight") as HTMLElement | null
      if (!target) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect()
        target.style.setProperty("--mx", `${event.clientX - rect.left}px`)
        target.style.setProperty("--my", `${event.clientY - rect.top}px`)
      })
    }
    document.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      document.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(frame)
    }
  }, [])
  return null
}
