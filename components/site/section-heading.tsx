import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function SectionHeading({
  eyebrow,
  title,
  text,
  action,
  eyebrowClassName = "text-saffron",
}: {
  eyebrow: string
  title: string
  text?: string
  action?: { href: string; label: string }
  eyebrowClassName?: string
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div className="max-w-2xl">
        <p className={"eyebrow " + eyebrowClassName}>{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
        {text && <p className="mt-3 text-base leading-7 text-muted-foreground">{text}</p>}
      </div>
      {action && (
        <Link href={action.href} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold hover:text-saffron">
          {action.label} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  )
}
