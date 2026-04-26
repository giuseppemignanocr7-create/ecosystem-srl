'use client'

import { SectionNumber } from '@/components/ui/SectionNumber'
import { Reveal } from '@/components/ui/Reveal'
import { Search, Database, Rocket } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Diagnosi',
    duration: '1 settimana',
    description: 'Analizziamo i tuoi flussi, i tuoi software attuali, i tuoi dati. Identifichiamo quali suite servono e in che ordine attivarle.',
  },
  {
    number: '02',
    icon: Database,
    title: 'Migrazione',
    duration: '2–4 settimane',
    description: 'Importiamo tutti i dati dai sistemi legacy (gestionali, Excel, documenti). CoreMind impara la tua azienda. Tu continui a lavorare.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Operatività',
    duration: 'Da subito',
    description: 'Dashboard operativa. Formazione team. Supporto 24/7 il primo mese. SLA garantito. Nessun vendor lock-in.',
  },
]

export function HowItWorks() {
  return (
    <section className="section-padding bg-paper-2">
      <div className="container-custom">
        <SectionNumber number="03 —" label="Metodo" />
        
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] mb-12">
            Tre passi.
            <br />
            <em className="text-accent-tech not-italic">Per farti partire domani.</em>
          </h2>
        </Reveal>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={150 + index * 100}>
              <div className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-px bg-line-strong" />
                )}
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-line">
                    <step.icon className="w-10 h-10 text-accent-tech" />
                  </div>
                  <div>
                    <span className="font-mono text-4xl text-ink-100">{step.number}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-serif text-2xl text-ink mb-1">{step.title}</h3>
                  <span className="font-mono text-xs uppercase tracking-wider text-accent-brass">
                    {step.duration}
                  </span>
                </div>
                
                <p className="text-ink-500 leading-relaxed">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
