// Site-wide settings.

/** Date the athlete data was last rebuilt. Update when re-running the import scripts. */
export const DATA_UPDATED = "22 November 2026"

/** Where "Report an error" messages go. Set NEXT_PUBLIC_REPORT_EMAIL in the environment. */
export const REPORT_EMAIL = process.env.NEXT_PUBLIC_REPORT_EMAIL ?? "harshitnegi.code@gmail.com"

/** Public site URL, used for the sitemap and share links. Set NEXT_PUBLIC_SITE_URL when deploying. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://indian-national-sports-repository.vercel.app").replace(/\/$/, "")
