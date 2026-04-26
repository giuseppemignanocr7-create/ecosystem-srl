'use client'

import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Play, MousePointer } from 'lucide-react'

export function DemoPreview() {
  return (
    <section className="section-padding bg-paper-2">
      <div className="container-custom">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-line shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-wider text-accent-brass mb-4">
                Non è un video
              </p>
            </Reveal>
            
            <Reveal delay={100}>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">
                Prova la tua ECO
                <br />
                <em className="text-accent-tech not-italic">un tocco, infinite possibilità.</em>
              </h2>
            </Reveal>
            
            <Reveal delay={200}>
              <p className="text-lg text-ink-500 mb-8 max-w-xl mx-auto">
                Accedi alla sandbox interattiva. Quattro suite in versione demo,
                dati finti ma funzioni reali. CoreMind attivo.
              </p>
            </Reveal>
            
            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  href="/demo/" 
                  variant="primary" 
                  size="lg"
                  icon={ArrowRight}
                  ariaLabel="Entra nella demo interattiva"
                >
                  Entra nella demo
                </Button>
              </div>
            </Reveal>
            
            <Reveal delay={400}>
              <p className="text-sm text-ink-300 mt-6 flex items-center justify-center gap-2">
                <MousePointer className="w-4 h-4" />
                Nessuna registrazione. Nessun download. Apri e prova.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
