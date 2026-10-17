# Indian National Sports Repository

A responsive directory prototype that connects India's state and union territory pages to source-linked athlete profiles.

## Project team

Developed collaboratively by Harshit and Vishakha.

## Current features

- Overview landing page with search that opens the separate regional directory.
- Hover/focus region menu with direct links to all 28 states and 8 union territories.
- Separate States & UTs, Athletes, and Data notes pages.
- Dedicated detail page for every state and union territory, with region identity, listed athletes, sports, and public directories.
- Separate region, region-and-sport, and athlete profile routes.
- Public source links for the athlete details currently included.
- Responsive layout with India map and tricolour visuals, plus custom editorial artwork and cited regional context for Haryana, Punjab, Uttarakhand, and Rajasthan.
- Athlete and academy portal preview; authentication and data storage are not connected.

## Technology

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- pnpm

## Run locally

Requirements: Node.js 20.9 or newer and pnpm 12.3.4.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Other project commands:

```bash
pnpm typecheck
pnpm build
pnpm start
```

## Project layout

```text
app/
  athletes/page.tsx     National athlete directory
  athletes/[slug]/     Individual athlete profiles
  data-notes/          Coverage notes and public sources
  states/[id]/         State and union territory pages
    sports/[sport]/    Sport rosters for a region
components/             Landing page sections and shared UI
lib/                    Region and athlete records
public/                 Images and icons
```

## Data coverage and sources

The athlete directory currently contains eleven source-linked profiles. It is a selective starting set, not a complete roster of athletes from each region. A region or sport with no listed profiles currently means the project has not yet added a verified record there.

Athlete pages link to the public sources used for their region association and listed achievements. Confirm details with those original organisations before relying on or reusing them.

The athlete list is a selective starting point, not a complete historical register of every Indian player since 1947. Empty region or sport pages mean that source-checked profiles have not yet been added there.

The athlete and academy portal is a client-side demonstration only. It does not verify identities, store accounts, or connect to an authentication service or database. Do not enter real personal information.

The project is independent and is not an official government website or service.

## Map artwork

The India flag-map SVG in `public/india-map-flag-source.svg` is sourced from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:India_Map_Flag.svg), where it is marked as CC0 1.0 Public Domain Dedication. The map asset is separate from the project's own code and branding.

## License

No license has been selected for this repository yet. Until a license is added, do not assume the project code is available for reuse. The map artwork has its own CC0 dedication noted above.
