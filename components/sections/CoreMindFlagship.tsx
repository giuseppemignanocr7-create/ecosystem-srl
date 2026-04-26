'use client'

import { SectionNumber } from '@/components/ui/SectionNumber'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { ArrowRight, MessageSquare, Database, BarChart3, Workflow, Server } from 'lucide-react'
import { CoreMindLiveChat } from './CoreMindLiveChat'

const capabilities = [
  {
    icon: MessageSquare,
    title: 'Conversazione naturale',
    description: 'Parla in italiano con il tuo gestionale. Zero comandi da imparare, zero menù da navigare. CoreMind capisce il contesto aziendale e ricorda ogni interazione.',
  },
  {
    icon: Database,
    title: 'CRUD cross-module',
    description: 'Create, read, update, delete su qualsiasi entità — clienti, fatture, cantieri, ordini, pratiche, cartelle cliniche — attraversando più moduli in una sola istruzione.',
  },
  {
    icon: BarChart3,
    title: 'Query complesse & reporting',
    description: '"Confronta il fatturato Q3 vs Q2 per cliente", "chi sono i 5 clienti con più insoluti": risposte strutturate con grafici, tabelle, export PDF/Excel generati in tempo reale.',
  },
  {
    icon: Workflow,
    title: 'Orchestrazione multi-agente',
    description: 'CoreMind coordina catene di azioni attraverso gestionale, cantieri, HR, contabilità, documenti. Ogni passaggio è auditabile, reversibile, firmato.',
  },
  {
    icon: Server,
    title: 'Provider-agnostic',
    description: 'Costruito su Claude, GPT, Gemini o modelli locali self-hosted. Scegli tu il motore — CoreMind resta identico nella logica e nel comportamento.',
  },
]

export function CoreMindFlagship() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-brand-navy-3 via-brand-navy to-brand-navy-2 text-white">
      {/* Glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-tech/25 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-brass/15 rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative z-10">
        <SectionNumber number="01 —" label="INTELLIGENCE" light />
        
        <Reveal>
          <h2 className="font-serif font-normal uppercase tracking-[0.02em] text-[clamp(32px,4.6vw,64px)] leading-[1.08] mb-16 max-w-5xl text-pearl-3d">
            UN CERVELLO.
            <br />
            CHE <em className="italic text-gradient-hero">CONOSCE</em> LA TUA AZIENDA
            <br />
            MEGLIO DI TE.
          </h2>
        </Reveal>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Live chat mockup */}
          <Reveal delay={100}>
            <CoreMindLiveChat />
          </Reveal>
          
          {/* Right - Capabilities */}
          <Reveal delay={200}>
            <div className="space-y-6">
              {capabilities.map((cap, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-ink-2 rounded-lg flex items-center justify-center border border-ink">
                    <cap.icon className="w-5 h-5 text-accent-brass" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-mono text-xs text-accent-brass">{String(index + 1).padStart(2, '0')}</span>
                      <h3 className="font-medium text-white">{cap.title}</h3>
                    </div>
                    <p className="text-sm text-ink-300 leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              ))}
              
              <div className="pt-4">
                <Button 
                  href="/coremind/" 
                  variant="primary" 
                  size="lg"
                  icon={ArrowRight}
                  className="bg-accent-tech hover:bg-accent-tech-2"
                  ariaLabel="Scopri tutte le funzionalità di CoreMind"
                >
                  Scopri CoreMind
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
