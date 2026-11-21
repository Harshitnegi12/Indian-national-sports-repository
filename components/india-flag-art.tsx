export function IndiaFlagArt() {
  return (
    <div className="pointer-events-none absolute right-[2%] top-1/2 z-0 w-[min(62vw,52rem)] -translate-y-1/2 opacity-[0.24] sm:opacity-[0.3] lg:right-[3%] lg:opacity-[0.72]" aria-hidden="true">
      <svg viewBox="0 0 900 600" className="w-full overflow-visible drop-shadow-2xl">
        <defs>
          <linearGradient id="flag-saffron" x1="0" y1="0" x2="1" y2=".3">
            <stop offset="0%" stopColor="#f8a04a" />
            <stop offset="46%" stopColor="#ff9933" />
            <stop offset="100%" stopColor="#d96d1c" />
          </linearGradient>
          <linearGradient id="flag-white" x1="0" y1="0" x2="1" y2=".15">
            <stop offset="0%" stopColor="#e8edf4" />
            <stop offset="48%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#d9e1ec" />
          </linearGradient>
          <linearGradient id="flag-green" x1="0" y1="0" x2="1" y2=".25">
            <stop offset="0%" stopColor="#16844b" />
            <stop offset="48%" stopColor="#138808" />
            <stop offset="100%" stopColor="#075b36" />
          </linearGradient>
          <linearGradient id="flag-shine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity=".34" />
            <stop offset="20%" stopColor="#ffffff" stopOpacity=".04" />
            <stop offset="43%" stopColor="#ffffff" stopOpacity=".42" />
            <stop offset="68%" stopColor="#10264c" stopOpacity=".12" />
            <stop offset="86%" stopColor="#ffffff" stopOpacity=".28" />
            <stop offset="100%" stopColor="#10264c" stopOpacity=".2" />
          </linearGradient>
          <filter id="flag-depth" x="-20%" y="-25%" width="150%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="17" />
            <feOffset dx="6" dy="24" />
            <feComponentTransfer><feFuncA type="linear" slope=".32" /></feComponentTransfer>
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <clipPath id="flag-cloth">
            <path d="M65 76 C260 118 450 30 835 83 L835 519 C584 465 344 585 65 518 Z" />
          </clipPath>
        </defs>
        <g filter="url(#flag-depth)">
          <path d="M65 76 C260 118 450 30 835 83 L835 519 C584 465 344 585 65 518 Z" fill="#10264c" opacity=".2" transform="translate(0 18)" />
          <g clipPath="url(#flag-cloth)">
            <path d="M45 60 C260 104 450 20 855 67 L855 227 C600 185 340 275 45 221 Z" fill="url(#flag-saffron)" />
            <path d="M45 221 C340 275 600 185 855 227 L855 386 C600 345 340 432 45 379 Z" fill="url(#flag-white)" />
            <path d="M45 379 C340 432 600 345 855 386 L855 540 C584 489 344 600 45 542 Z" fill="url(#flag-green)" />
            <path d="M45 60 C260 104 450 20 855 67 L855 540 C584 489 344 600 45 542 Z" fill="url(#flag-shine)" />
            <g fill="none" stroke="#15346a" strokeOpacity=".13" strokeWidth="2">
              <path d="M120 70 C300 122 482 34 790 81" />
              <path d="M120 527 C350 574 584 466 790 516" />
            </g>
            <g transform="translate(448 301)" fill="none" stroke="#1a3c78">
              <circle r="64" strokeWidth="5" />
              <circle r="7" fill="#1a3c78" stroke="none" />
              {Array.from({ length: 24 }, (_, index) => {
                const angle = (index * Math.PI) / 12
                const x = (58 * Math.cos(angle)).toFixed(6)
                const y = (58 * Math.sin(angle)).toFixed(6)
                return <line key={index} x1="0" y1="0" x2={x} y2={y} strokeWidth="2.5" />
              })}
            </g>
          </g>
          <path d="M65 76 C260 118 450 30 835 83 L835 519 C584 465 344 585 65 518 Z" fill="none" stroke="#ffffff" strokeOpacity=".55" strokeWidth="2" />
        </g>
      </svg>
    </div>
  )
}


