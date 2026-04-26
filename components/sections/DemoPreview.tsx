'use client'

import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Play, MousePointer } from 'lucide-react'

export function DemoPreview() {
  return (
    <section className="section-padding bg-gradient-to-br from-brand-navy-3 via-brand-navy to-brand-navy-2 text-white relative overflow-hidden">
      {/* Soft glow decorative */}
      <div
        className="absolute -top-32 -right-20 w-[500px] h-[500px] rounded-full opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-32 -left-20 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,95,232,0.6) 0%, transparent 70%)' }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-wider text-brand-violet mb-4">
              Non è un video
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-serif font-normal italic tracking-[-0.01em] text-[clamp(28px,3.6vw,52px)] leading-[1.18] mb-6 text-pearl-shine">
              Prova la tua ECO — un tocco, infinite possibilità.
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
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
            <p className="text-sm text-white/50 mt-6 flex items-center justify-center gap-2">
              <MousePointer className="w-4 h-4" />
              Nessuna registrazione. Nessun download. Apri e prova.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
