/** Logo: a navy tile with a tricolour arc and an Ashoka-chakra-inspired wheel. */
export function BrandMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#13234A" />
      <path d="M8 27a12 12 0 0 1 24 0" fill="none" stroke="#FF9933" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M12.5 27a7.5 7.5 0 0 1 15 0" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M16.6 27a3.4 3.4 0 0 1 6.8 0" fill="none" stroke="#2BAA4A" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="20" cy="27" r="1.4" fill="#FFFFFF" />
      <path d="M6 31h28" stroke="#FFFFFF" strokeOpacity=".25" strokeWidth="1.2" />
    </svg>
  )
}
