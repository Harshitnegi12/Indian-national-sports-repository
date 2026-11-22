# Indian National Sports Repository

A state-by-state directory of Indian athletes from 1947 to today. Every state and union territory has its own page with an interactive district map, every athlete has a profile with a photo, story and sources, and the site adds sport guides, rankings, a decade timeline and more.

## Project team

Developed by Harshit.

## Features

- **Home:** interactive map of India (official boundaries), search (Ctrl K), champions, sports and zones, and "Aaj ka din" birthdays.
- **State pages (all 36):** state switcher, interactive district map that filters athletes, champions, every athlete with sport filters, academies, Player Corner (demo), sources.
- **Athlete profiles:** free-licence photo, story, birth date and place, highlights, official YouTube videos, share cards (post and story size), compare, report an error.
- **Sports:** a page per sport with history in India, rules, governing bodies, leading states and top players.
- **Explore:** state rankings and medal tally, Women in Sports, Para Champions, compare two players, decade timeline, data notes.
- **Hindi / English** toggle for navigation and headings, light and dark themes, motion that respects "reduce motion".
- SEO: sitemap, robots, structured data and share images.

## Technology

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion, pnpm.

## Run locally

Requirements: Node.js 20.9 or newer and pnpm 12.3.4.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm typecheck
pnpm build && pnpm start
```

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL of the site (sitemap, share links), e.g. `https://example.vercel.app` |
| `NEXT_PUBLIC_REPORT_EMAIL` | Email that receives "Report an error" messages. Without it, the button copies the report instead. |

## Data

| File | What it holds | Built by |
|---|---|---|
| `lib/athlete-data.ts`, `lib/data/haryana.ts`, `lib/data/athletes-batch-*.ts` | Hand-written, source-linked athletes | by hand |
| `lib/data/athletes-wiki.json` | Athletes of every era from Wikipedia's "&lt;sport&gt; players from &lt;state&gt;" categories | `scripts/import-wikipedia-athletes.js` |
| `lib/data/athlete-profiles.json` | Photos (free licences only), stories, birth date/place, gender | `scripts/enrich-athlete-profiles.js` |
| `lib/data/athlete-videos.json` | Official YouTube videos for top athletes | `scripts/find-athlete-videos.js` |
| `lib/data/india-map-shapes.json` | India state boundaries (official) | `scripts/build-india-map.js` |
| `lib/data/district-maps.json` | District boundaries per state (Census 2011) | `scripts/build-district-maps.js` |

Check the sources of hand-written athletes with `node scripts/check-athlete-sources.js`.

The directory is growing and is not a complete register of every Indian athlete. An empty sport or state means records have not been added yet.

## Credits and licences

- Map boundaries: [DataMeet India maps](https://github.com/datameet/maps), CC BY 4.0.
- Athlete summaries and stories: Wikipedia, CC BY-SA 4.0 (credited on each profile).
- Photos: Wikimedia Commons, free licences only, credited on each profile.
- Birth data and gender: Wikidata, CC0.

The project is independent and is not an official government website or service. No licence has been chosen yet for the project's own code.
