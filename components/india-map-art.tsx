export function IndiaMapArt() {
  const outline = "M113 23 L148 31 L177 47 L205 50 L224 66 L247 70 L261 83 L283 89 L297 110 L317 119 L329 142 L323 164 L338 184 L330 203 L345 217 L337 236 L352 250 L347 269 L361 281 L354 297 L365 312 L351 326 L340 346 L323 357 L315 378 L303 397 L289 422 L275 445 L261 425 L252 400 L241 378 L229 355 L219 333 L207 310 L195 288 L183 269 L168 251 L151 232 L132 214 L114 198 L94 184 L77 168 L60 151 L50 131 L55 111 L70 96 L75 76 L91 61 L94 43 Z M329 178 L351 171 L372 178 L381 194 L369 207 L345 204 Z"
  return (
    <div className="india-map-art pointer-events-none absolute right-[-3rem] top-1/2 hidden w-[min(40vw,26rem)] -translate-y-1/2 lg:block" aria-hidden="true">
      <div className="absolute inset-8 rounded-full bg-saffron/20 blur-3xl" />
      <svg viewBox="0 0 410 490" className="relative w-full overflow-visible drop-shadow-2xl">
        <defs>
          <linearGradient id="india-top" x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#ffd5a8" />
            <stop offset="43%" stopColor="#f7f8fa" />
            <stop offset="100%" stopColor="#a5dfbd" />
          </linearGradient>
          <linearGradient id="india-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#263f70" />
            <stop offset="100%" stopColor="#0b1733" />
          </linearGradient>
          <filter id="map-shadow" x="-35%" y="-25%" width="180%" height="180%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="12" />
            <feOffset dx="0" dy="16" />
            <feComponentTransfer><feFuncA type="linear" slope="0.26" /></feComponentTransfer>
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g filter="url(#map-shadow)" transform="translate(8 9)">
          <path d={outline} transform="translate(0 17)" fill="url(#india-edge)" stroke="#0b1733" strokeWidth="5" strokeLinejoin="round" />
          <path d={outline} fill="url(#india-top)" stroke="#ffffff" strokeOpacity=".9" strokeWidth="2.5" strokeLinejoin="round" />
          <g fill="none" stroke="#17325e" strokeOpacity=".2" strokeWidth="1.2">
            <path d="M93 80 152 91 208 79 260 105 309 129" />
            <path d="M61 137 117 132 170 151 222 133 282 151 329 164" />
            <path d="M88 183 144 170 196 194 247 176 326 203" />
            <path d="M128 219 177 211 222 234 290 224 344 242" />
            <path d="M164 255 212 251 263 274 349 281" />
            <path d="M191 291 244 292 321 314" />
          </g>
          <circle cx="204" cy="182" r="27" fill="#17325e" fillOpacity=".08" stroke="#17325e" strokeOpacity=".25" />
          <circle cx="204" cy="182" r="16" fill="none" stroke="#17325e" strokeOpacity=".35" strokeWidth="2" />
          <circle cx="204" cy="182" r="3" fill="#17325e" fillOpacity=".45" />
          <g stroke="#17325e" strokeOpacity=".35" strokeWidth="1.5">
            <path d="M204 166v32M188 182h32M193 171l22 22M215 171l-22 22" />
          </g>
          <circle cx="125" cy="115" r="4" fill="#e87829" />
          <circle cx="276" cy="151" r="4" fill="#1d8a53" />
          <circle cx="222" cy="269" r="4" fill="#1d8a53" />
          <circle cx="294" cy="222" r="4" fill="#e87829" />
        </g>
      </svg>
    </div>
  )
}
