import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { IndiaMapBackground } from '@/components/india-map-background'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'INSR | Indian National Sports Repository — Directory Prototype',
  description:
    'A responsive prototype with sample state and territory profiles, academy listings, and sports programme cards. Figures and entries are illustrative and not independently verified.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0F2042',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`light ${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-saffron/15 selection:text-ashoka-navy">
        <IndiaMapBackground />
        <div className="relative z-10">
          <aside role="status" className="border-b border-saffron/30 bg-amber-50/95 px-4 py-2.5 text-center text-xs leading-relaxed text-foreground sm:text-sm">
            <strong>Prototype preview:</strong> figures, academy listings, and programme details are sample content and are not independently verified. Portal sign-in is demonstration only.
          </aside>
          {children}
        </div>
      </body>
    </html>
  )
}






