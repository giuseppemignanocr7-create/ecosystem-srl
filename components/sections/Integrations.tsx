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
        
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] mb-6 max-w-4xl">
            Parla con tutto
            <br />
            <em className="text-accent-tech not-italic">quello che già usi.</em>
          </h2>
        </Reveal>
        
        <Reveal delay={100}>
          <p className="text-lg text-ink-500 mb-12 max-w-2xl">
            Ecosystem non ti chiede di abbandonare i tuoi strumenti. 
            Si integra con oltre 200 sistemi esterni attraverso API native, 
            connettori certificati e middleware personalizzabili.
          </p>
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
