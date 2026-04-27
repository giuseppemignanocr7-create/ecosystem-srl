'use client'

import Link from 'next/link'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { SectionNumber } from '@/components/ui/SectionNumber'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Suite } from '@/content/suites'
import { FAQ_ITEMS } from '@/content/faq'
import { EcoGenModule } from '@/components/suite/EcoGenModule'
import { ECO_PRESETS, ECO_DEFAULT_PRESET } from '@/content/eco-presets'

interface SuitePageTemplateProps {
  suite: Suite
}

export function SuitePageTemplate({ suite }: SuitePageTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // FAQ specifiche per suite (prime 4 generiche + custom se disponibili)
  const suiteFaqs = FAQ_ITEMS.slice(0, 4)

  // EcoGen config: preset specifico se disponibile, altrimenti default contestualizzato
  const ecoConfig = ECO_PRESETS[suite.id] ?? ECO_DEFAULT_PRESET(suite.tag.split('·')[0].trim())

  return (
    <div className="pt-24 pb-16 bg-paper">
      {/* Hero */}
      <section className="container-custom mb-16">
        <div className="max-w-4xl">
          <Reveal>
            <Badge variant="brass" className="mb-4">{suite.tag}</Badge>
          </Reveal>
          
          <Reveal delay={100}>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] mb-6">
              {suite.name}
            </h1>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-xl text-ink-500 mb-8 max-w-2xl leading-relaxed">
              {suite.longDescription}
            </p>
          </Reveal>
          
          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                href="/demo/" 
                variant="primary" 
                size="lg"
                icon={ArrowRight}
                ariaLabel={`Prova ${suite.name} in demo`}
              >
                Prova in demo
              </Button>
              <Button 
                href="/contatti/" 
                variant="ghost" 
                size="lg"
                ariaLabel={`Richiedi informazioni su ${suite.name}`}
              >
                Richiedi info
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cosa risolve */}
      <section className="section-padding bg-paper-2">
        <div className="container-custom">
          <SectionNumber number="01 —" label="Problemi & Soluzioni" />
          
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.05] mb-12">
              Cosa risolve <em className="text-accent-tech not-italic">{suite.name}</em>
            </h2>
          </Reveal>
          
          <div className="grid md:grid-cols-3 gap-8">
            {suite.painPoints.map((point, index) => (
              <Reveal key={index} delay={150 + index * 100}>
                <Card className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 bg-danger/10 rounded-lg flex items-center justify-center text-danger text-lg">
                      ✕
                    </span>
                    <h3 className="font-medium text-ink">Problema</h3>
                  </div>
                  <p className="text-ink-500 mb-6">{point.problem}</p>
                  
                  <div className="border-t border-line pt-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center text-success">
                        <Check className="w-5 h-5" />
                      </span>
                      <h3 className="font-medium text-ink">Soluzione</h3>
                    </div>
                    <p className="text-ink-700">{point.solution}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Moduli inclusi */}
      <section className="section-padding bg-paper">
        <div className="container-custom">
          <SectionNumber number="02 —" label="Moduli" />
          
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.05] mb-12">
              Tutto quello che <em className="text-accent-tech not-italic">serve</em>
            </h2>
          </Reveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {suite.modules.map((module, index) => (
              <Reveal key={index} delay={100 + index * 50}>
                <Card className="h-full">
                  <span className="font-mono text-xs text-accent-brass mb-2 block">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-serif text-xl text-ink mb-2">{module.name}</h3>
                  <p className="text-sm text-ink-500">{module.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Feature list */}
      <section className="section-padding bg-paper-2">
        <div className="container-custom">
          <SectionNumber number="03 —" label="Funzionalità" />
          
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.05] mb-12">
              Ogni dettaglio <em className="text-accent-tech not-italic">pensato</em>
            </h2>
          </Reveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suite.features.map((feature, index) => (
              <Reveal key={index} delay={50 + index * 30}>
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-line">
                  <Check className="w-5 h-5 text-accent-tech flex-shrink-0 mt-0.5" />
                  <span className="text-ink-700">{feature}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CoreMind per questa suite */}
      <section className="section-padding bg-gradient-to-br from-brand-navy-3 via-brand-navy to-brand-navy-2 text-white">
        <div className="container-custom">
          <SectionNumber number="04 —" label="CoreMind" light />
          
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.05] mb-12 text-pearl-shine">
              CoreMind per <em className="text-accent-tech not-italic">{suite.name}</em>
            </h2>
          </Reveal>
          
          <div className="grid md:grid-cols-2 gap-6">
            {suite.useCases.map((useCase, index) => (
              <Reveal key={index} delay={100 + index * 100}>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm">
                  <span className="font-mono text-xs text-accent-brass mb-2 block">
                    USE CASE {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-white">{useCase}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      {suite.caseStudy && (
        <section className="section-padding bg-paper">
          <div className="container-custom">
            <SectionNumber number="05 —" label="Case Study" />
            
            <Reveal>
              <Card className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-serif text-2xl text-ink mb-2">{suite.caseStudy.company}</h3>
                    <p className="text-ink-400 mb-4">{suite.caseStudy.location}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-mono uppercase tracking-wider text-accent-brass mb-1">Sfida</p>
                        <p className="text-ink-500">{suite.caseStudy.challenge}</p>
                      </div>
                      <div>
                        <p className="text-xs font-mono uppercase tracking-wider text-accent-brass mb-1">Soluzione</p>
                        <p className="text-ink-500">{suite.caseStudy.solution}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-paper-2 rounded-xl p-6">
                    <p className="text-xs font-mono uppercase tracking-wider text-accent-brass mb-4">Risultati</p>
                    <ul className="space-y-3">
                      {suite.caseStudy.results.map((result, index) => (
                        <li key={index} className="flex items-center gap-2 text-ink-700">
                          <span className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center text-success text-sm">
                            ✓
                          </span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>
        </section>
      )}

      {/* Integrazioni */}
      <section className="section-padding bg-paper-2">
        <div className="container-custom">
          <SectionNumber number="06 —" label="Integrazioni" />
          
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.05] mb-8">
              Si integra con <em className="text-accent-tech not-italic">tutto</em>
            </h2>
          </Reveal>
          
          <Reveal delay={100}>
            <div className="flex flex-wrap gap-3">
              {suite.integrations.map((integration, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white rounded-lg border border-line text-ink-700 hover:border-accent-tech transition-colors"
                >
                  {integration}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-paper">
        <div className="container-custom max-w-3xl">
          <SectionNumber number="07 —" label="Domande Frequenti" />
          
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.05] mb-8">
              Dubbi su <em className="text-accent-tech not-italic">{suite.name}</em>?
            </h2>
          </Reveal>
          
          <div className="space-y-4">
            {suiteFaqs.map((faq, index) => (
              <Reveal key={index} delay={100 + index * 50}>
                <div className="bg-white rounded-xl border border-line overflow-hidden">
                  <button
                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-medium text-ink pr-4">{faq.question}</span>
                    <ChevronDown className={cn(
                      'w-5 h-5 text-ink-400 flex-shrink-0 transition-transform',
                      openFaq === index && 'rotate-180'
                    )} />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-ink-500 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing specifico */}
      <section className="section-padding bg-paper-2">
        <div className="container-custom max-w-3xl text-center">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.05] mb-6">
              Prezzi <em className="text-accent-tech not-italic">{suite.name}</em>
            </h2>
          </Reveal>
          
          <Reveal delay={100}>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <Card>
                <p className="text-xs font-mono uppercase tracking-wider text-ink-400 mb-2">Starter</p>
                <p className="font-serif text-2xl text-ink mb-1">{suite.pricing.starter}</p>
                <p className="text-sm text-ink-400">per utente</p>
              </Card>
              <Card className="border-accent-brass border-2">
                <p className="text-xs font-mono uppercase tracking-wider text-accent-brass mb-2">Professional</p>
                <p className="font-serif text-2xl text-ink mb-1">{suite.pricing.professional}</p>
                <p className="text-sm text-ink-400">per utente</p>
              </Card>
              <Card>
                <p className="text-xs font-mono uppercase tracking-wider text-ink-400 mb-2">Enterprise</p>
                <p className="font-serif text-2xl text-ink mb-1">{suite.pricing.enterprise}</p>
                <p className="text-sm text-ink-400">personalizzato</p>
              </Card>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <Button 
              href="/pricing/" 
              variant="ghost" 
              size="lg"
              icon={ArrowRight}
            >
              Vedi tutti i piani
            </Button>
          </Reveal>
        </div>
      </section>

      {/* EcoGen — modulo ESG sempre incluso */}
      <EcoGenModule config={ecoConfig} />

      {/* CTA finale */}
      <section className="section-padding bg-gradient-to-br from-brand-navy-3 via-brand-navy to-brand-navy-2 text-white">
        <div className="container-custom text-center">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.05] mb-6 text-pearl-shine">
              Pronto per provare <em className="text-accent-tech not-italic">{suite.name}</em>?
            </h2>
          </Reveal>
          
          <Reveal delay={100}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                href="/demo/" 
                variant="primary" 
                size="lg"
                className="bg-accent-tech hover:bg-accent-tech-2"
                icon={ArrowRight}
              >
                Prova in demo
              </Button>
              <Button 
                href="/contatti/" 
                variant="ghost" 
                size="lg"
                className="text-white border-white/30 hover:bg-white/10"
              >
                Parla con un esperto
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
