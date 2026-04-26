import type { Metadata } from 'next'
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SideRail } from '@/components/layout/SideRail'
import { TopBrand } from '@/components/layout/TopBrand'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/layout/CookieBanner'
import { CoreMindFloating } from '@/components/coremind/CoreMindFloating'
import { MobileNav } from '@/components/layout/MobileNav'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { ScrollProgress } from '@/components/motion/ScrollProgress'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter-tight',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ecosystem.org'),
  title: {
    default: 'Ecosystem — La piattaforma AI-native multi-verticale',
    template: '%s · Ecosystem'
  },
  description: 'Un tocco, infinite possibilità. Il sistema operativo aziendale costruito intorno a CoreMind, l\'intelligenza nativa che capisce la tua azienda. Tredici verticali. Made in Italy.',
  keywords: ['gestionale AI', 'ERP italiano', 'software aziendale', 'intelligenza artificiale', 'CoreMind', 'Ecosystem', 'piattaforma multi-verticale', 'AI-native', 'gestionale cantieri', 'software studi legali'],
  authors: [{ name: 'Ecosystem S.R.L.' }],
  creator: 'Giuseppe Mignano',
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://ecosystem.org',
    title: 'Ecosystem — Un tocco, infinite possibilità',
    description: 'La piattaforma AI-native multi-verticale. Tredici verticali di settore in un unico ecosistema.',
    siteName: 'Ecosystem',
    images: [{ url: '/og/og-default.png', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ecosystem',
    description: 'Un tocco, infinite possibilità',
    images: ['/og/og-default.png']
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: '/', languages: { 'it-IT': '/' } }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it-IT" className={`${instrumentSerif.variable} ${interTight.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-paper text-ink-900 min-h-screen">
        <LenisProvider>
          <ScrollProgress />
          <SideRail />
          <MobileNav />
          <main
            className="min-h-screen pt-14 lg:pt-0 transition-[padding] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ paddingRight: 'var(--rail-w, 0px)' }}
          >
            <TopBrand />
            {children}
          </main>
          <Footer />
          <CoreMindFloating />
          <CookieBanner />
        </LenisProvider>
      </body>
    </html>
  )
}
