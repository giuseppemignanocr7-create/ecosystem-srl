'use client'

import { SectionNumber } from '@/components/ui/SectionNumber'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { INTEGRATIONS } from '@/content/integrations'

export function Integrations() {
  const popularIntegrations = INTEGRATIONS.filter(i => i.popular).slice(0, 32)

  return (
    <section className="section-padding bg-paper">
      <div className="container-custom">
        <SectionNumber number="04 —" label="Connessioni" />
        
        <Reveal delay={100}>
          <h2 className="font-serif font-normal italic tracking-[-0.01em] text-[clamp(28px,3.6vw,52px)] leading-[1.18] mt-4 mb-12 max-w-5xl text-pearl-shine-dark">
            Si integra con oltre 200 sistemi esterni attraverso API native, connettori certificati e middleware personalizzabili.
          </h2>
        </Reveal>
        
        <Reveal delay={200}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-12">
            {popularIntegrations.map((integration, index) => (
              <div 
                key={integration.name}
                className="bg-white rounded-lg p-4 border border-line hover:border-accent-tech hover:shadow-md transition-all duration-300 text-center"
              >
                <p className="font-medium text-sm text-ink">{integration.name}</p>
                <p className="text-xs text-ink-400 mt-1">{integration.category}</p>
              </div>
            ))}
          </div>
        </Reveal>
        
        <Reveal delay={300}>
          <Button 
            href="/integrazioni/" 
            variant="ghost" 
            size="lg"
            icon={ArrowRight}
            ariaLabel="Vedi tutte le integrazioni disponibili"
          >
            Vedi tutte le integrazioni
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
