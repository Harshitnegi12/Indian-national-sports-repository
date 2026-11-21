/** Compact dark banner used at the top of directory pages. */
export function PageHero({ eyebrow, title, hindi, text, children }: { eyebrow: string; title: string; hindi?: string; text?: string; children?: React.ReactNode }) {
  return (
    <section className="hero-surface relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="site-container relative py-12 sm:py-16">
        <p className="eyebrow text-[#FFB366]">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">{title}</h1>
        {hindi && <p className="mt-1 font-hindi text-xl text-white/55">{hindi}</p>}
        {text && <p className="mt-4 max-w-2xl text-base leading-7 text-hero-muted">{text}</p>}
        {children}
      </div>
    </section>
  )
}
