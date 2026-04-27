'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Hammer, Scale, ChefHat, ShoppingBag, ArrowRight } from 'lucide-react'

const SUITES = [
  {
    slug: 'buildsuite',
    name: 'BuildSuite',
    tagline: 'Edilizia & Cantieri',
    icon: Hammer,
    accent: '#06B6D4',
    description: 'Gestione cantieri, SAL automatici, sicurezza POS/PSC, magazzino materiali con CoreMind che monitora margini in tempo reale.',
    modules: ['Dashboard', 'Cantieri', 'SAL', 'Sicurezza', 'Magazzino'],
  },
  {
    slug: 'legalmind',
    name: 'LegalMind',
    tagline: 'Studi Legali',
    icon: Scale,
    accent: '#D4A521',
    description: 'Fascicoli con scadenziario PCT, depositi telematici, parcelle e contabilità forense, integrazione giurisprudenza Cassazione.',
    modules: ['Dashboard', 'Fascicoli', 'Scadenziario', 'PCT Telematico'],
  },
  {
    slug: 'foodsuite',
    name: 'FoodSuite',
    tagline: 'Ristorazione',
    icon: ChefHat,
    accent: '#F59E0B',
    description: 'Menu con food cost real-time, ordini fornitori multi-canale, conformità HACCP automatizzata, riservazioni e POS sala.',
    modules: ['Dashboard', 'Menu', 'Ordini fornitori', 'HACCP'],
  },
  {
    slug: 'retailsuite',
    name: 'RetailSuite',
    tagline: 'Retail & E-commerce',
    icon: ShoppingBag,
    accent: '#EC4899',
    description: 'POS multi-cassa, magazzino sincronizzato, e-commerce, campagne marketing segmentate con loyalty program.',
    modules: ['Dashboard', 'Vendite', 'Magazzino', 'Campagne'],
  },
]

export default function DemoIndexPage() {
  return (
    <div className="min-h-screen bg-paper px-4 sm:px-6 py-12 lg:py-20">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16 text-center"
        >
          <div className="font-mono text-[10px] sm:text-xs tracking-[0.22em] uppercase text-brand-violet mb-4">
            DEMO INTERATTIVE · DATI FINTI · FUNZIONI REALI
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl leading-[1.05] mb-5 max-w-4xl mx-auto">
            Quattro suite. <em className="italic text-brand-violet">Funzioni reali.</em>
          </h1>
          <p className="text-base sm:text-lg text-ink-700 max-w-2xl mx-auto">
            Non sono video, non sono screenshot. Sono il prodotto vero in modalità demo. Click sulla
            suite del tuo settore, esplora ogni modulo, prova ricerca, sort, drawer di dettaglio,
            CoreMind. Cinque minuti per capire come lavora Ecosystem.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
          {SUITES.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                <Link
                  href={`/demo/${s.slug}`}
                  className="group block p-6 lg:p-8 rounded-2xl border-2 border-line hover:border-brand-violet/40 bg-white transition-all hover:shadow-lg"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                      style={{ background: `linear-gradient(135deg, ${s.accent}, ${s.accent}cc)` }}
                    >
                      <Icon size={26} className="text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-serif text-2xl lg:text-3xl mb-1">{s.name}</h2>
                      <div className="font-mono text-[10px] sm:text-xs tracking-wider uppercase text-ink-400">
                        {s.tagline}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-ink-700 mb-5 leading-relaxed">{s.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {s.modules.map((m) => (
                      <span
                        key={m}
                        className="font-mono text-[10px] tracking-wide uppercase px-2 py-0.5 rounded-md bg-paper-2 text-ink-500"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <div
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase font-medium group-hover:gap-3 transition-all"
                    style={{ color: s.accent }}
                  >
                    Apri demo
                    <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-ink-500 mb-3">Servono altre suite o configurazioni custom?</p>
          <Link
            href="/contatti"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-violet text-white text-sm font-medium hover:bg-brand-violet-deep transition-colors"
          >
            Prenota demo personalizzata <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
