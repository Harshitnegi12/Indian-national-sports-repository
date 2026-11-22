import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque, Inter, JetBrains_Mono, Mukta } from "next/font/google"
import Script from "next/script"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { MotionProvider, SpotlightTracker } from "@/components/motion/motion-primitives"
import { SITE_URL } from "@/lib/site-config"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" })
const mukta = Mukta({ subsets: ["devanagari", "latin"], weight: ["400", "600", "700"], variable: "--font-mukta", display: "swap" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Indian Sports Repository | Athletes from every state and union territory",
    template: "%s | Indian Sports Repository",
  },
  description:
    "Explore Indian athletes state by state: Olympic and Paralympic medallists, world champions and rising talent from all 28 states and 8 union territories, each linked to a public source.",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F6F2" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1120" },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${bricolage.variable} ${mukta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try { const saved = localStorage.getItem('insr-theme'); const theme = saved === 'dark' || saved === 'light' ? saved : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); document.documentElement.classList.add(theme); if (localStorage.getItem('insr-lang') === 'hi') { document.documentElement.classList.add('lang-hi'); document.documentElement.lang = 'hi' } } catch { document.documentElement.classList.add('light'); }`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-saffron/20">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:shadow-lg">
          Skip to content
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </MotionProvider>
        <SpotlightTracker />
        <SpeedInsights />
      </body>
    </html>
  )
}
