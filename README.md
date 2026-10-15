# Indian National Sports Repository

A responsive web prototype for exploring sports information, training centres, and public sports programmes across India.

## Project team

Developed collaboratively by Harshit and Vishakha.

## Features

- National overview landing page with a search interface.
- Directory covering India's 28 states and 8 union territories.
- Region pages with example sports, academy listings, and summary metrics.
- Search and filtering for the regional directory.
- National sports programme cards.
- Athlete and academy portal interface for demonstrating a future sign-in flow.
- Responsive layout with India map and tricolour visuals.

## Technology

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- pnpm

## Run locally

### Requirements

- Node.js 20.9 or newer
- pnpm 12.3.4 (the version recorded by this project)

### Install and start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Project commands

```bash
pnpm dev       # Start the development server
pnpm typecheck # Check TypeScript types
pnpm build     # Create a production build
pnpm start     # Serve the production build
```

## Project layout

```text
app/                 App Router pages, layout, and global styles
  states/[id]/       Regional detail page
components/          Page sections and reusable UI components
lib/                 Regional and national programme starter data
public/              Static images and icons
```

## Data and demo limitations

This repository is currently a frontend prototype. Figures, academy entries, and programme details in the starter dataset are static examples and have not been independently source-verified. They should not be treated as official, current, or complete government data.

The athlete and academy portal is a client-side demonstration only. It does not verify identities, store accounts, or connect to an authentication service or database. Do not enter real personal information. An API, verified data sources, and production authentication would be needed before using this as a live service.

The project is an independent prototype and is not an official government website or service.

## Map artwork

The India flag-map SVG in `public/india-map-flag-source.svg` is sourced from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:India_Map_Flag.svg), where it is marked as CC0 1.0 Public Domain Dedication. The map asset is separate from the project's own code and branding.

## License

No license has been selected for this repository yet. Until a license is added, do not assume the project code is available for reuse. The map artwork has its own CC0 dedication noted above.


