'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DemoAppTemplate } from '@/components/demo/DemoAppTemplate'
import {
  buildSuiteDemo,
  legalMindDemo,
  foodSuiteDemo,
  retailSuiteDemo,
} from '@/content/demo-suites'

const SUITES = [
  { config: buildSuiteDemo, description: 'Gestione cantieri, SAL, sicurezza, BIM' },
  { config: legalMindDemo, description: 'Fascicoli, scadenzario PCT, contabilità forense' },
  { config: foodSuiteDemo, description: 'Menu, food cost, HACCP, ordini fornitori' },
  { config: retailSuiteDemo, description: 'POS, magazzino, e-commerce, loyalty' },
]

export default function DemoPage() {
  const [selected, setSelected] = useState<string | null>(null)

  if (selected) {
    const suite = SUITES.find((s) => s.config.id === selected)
    if (!suite) return null
    return (
      <div>
        <div className="fixed top-4 left-4 z-50">
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="bg-paper border border-line-strong px-3 py-2 rounded-lg text-sm hover:bg-paper-2 transition-colors shadow-md"
          >
            ← Esci dalla demo
          </button>
        </div>
        <DemoAppTemplate config={suite.config} />
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16 text-center">
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-accent-brass mb-4">
            DEMO INTERATTIVA
          </div>
          <h1 className="font-serif text-5xl lg:text-7xl mb-6">
            Quattro suite. <em className="italic text-brand-violet">Funzioni reali.</em>
          </h1>
          <p className="text-lg text-ink-700 max-w-2xl mx-auto">
            Non è un video. Non è uno screenshot. È il prodotto vero, in modalità demo, con dati di
            esempio. Apri quello del tuo settore e provalo. Cinque minuti e capisci esattamente cosa
            fa Ecosystem.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {SUITES.map((suite) => (
            <motion.button
              type="button"
              key={suite.config.id}
              onClick={() => setSelected(suite.config.id)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="group text-left p-8 rounded-2xl border-2 border-line hover:border-brand-violet/40 bg-paper transition-colors"
            >
              <div
                className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center text-white font-bold"
                style={{
                  background: `linear-gradient(135deg, ${suite.config.accent}, ${suite.config.accent}cc)`,
                }}
              >
                {suite.config.name.slice(0, 1)}
              </div>
              <h3 className="font-serif text-2xl mb-2">{suite.config.name}</h3>
              <div className="font-mono text-xs tracking-wider uppercase text-ink-400 mb-3">
                {suite.config.tagline}
              </div>
              <p className="text-sm text-ink-700 mb-5">{suite.description}</p>
              <span className="font-mono text-xs tracking-wider uppercase text-brand-violet group-hover:text-brand-violet-deep transition-colors">
                Apri demo →
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
