import { Metadata } from 'next'
import { Reveal } from '@/components/ui/Reveal'
import { SectionNumber } from '@/components/ui/SectionNumber'
import { INTEGRATIONS, CATEGORIES } from '@/content/integrations'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Integrazioni · 200+ Sistemi Connessi',
  description: 'Ecosystem si integra con ERP, CRM, e-commerce, pagamenti, hardware, AI providers e sistemi PA.',
}

export default function IntegrazioniPage() {
  return (
    <div className="pt-24 pb-16 bg-paper min-h-screen">
      <div className="container-custom">
        <SectionNumber number="INTEGRAZIONI —" label="Connesso con Tutto" />
        
        <Reveal>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">
            200+ integrazioni.
            <em className="text-accent-tech not-italic block">Zero silos.</em>
          </h1>
        </Reveal>
        
        <Reveal delay={100}>
          <p className="text-lg text-ink-500 mb-12 max-w-2xl">
            Connettori nativi, API aperte, middleware personalizzabile. 
            Ecosystem parla con tutto il tuo stack tecnologico.
          </p>
        </Reveal>
        
        {/* Categories */}
        {CATEGORIES.map((category, catIndex) => {
          const categoryIntegrations = INTEGRATIONS.filter(i => i.category === category)
          
          return (
            <section key={category} className="mb-12">
              <Reveal delay={catIndex * 100}>
                <h2 className="font-serif text-2xl text-ink mb-4">{category}</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {categoryIntegrations.map((integration, index) => (
                    <div
                      key={integration.name}
                      className={cn(
                        'p-4 bg-white rounded-lg border border-line hover:border-accent-tech transition-colors',
                        integration.popular && 'border-accent-brass/30 bg-accent-brass/5'
                      )}
                    >
                      <p className="font-medium text-ink text-sm">{integration.name}</p>
                      <p className="text-xs text-ink-400 mt-1">{integration.description}</p>
                      {integration.popular && (
                        <span className="inline-block mt-2 text-xs text-accent-brass font-mono">POPULAR</span>
                      )}
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>
          )
        })}
      </div>
    </div>
  )
}
