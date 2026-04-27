'use client'

import { SectionNumber } from '@/components/ui/SectionNumber'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight, Check, X } from 'lucide-react'
import { PRICING_PLANS } from '@/content/pricing'

export function PricingTeaser() {
  return (
    <section className="section-padding bg-paper">
      <div className="container-custom">
        <SectionNumber number="05 —" label="Investimento" />
        
        <Reveal>
          <h2 className="font-serif font-normal italic tracking-[-0.01em] text-[clamp(26px,3.6vw,52px)] leading-[1.18] mt-4 mb-8 md:mb-12 max-w-5xl text-pearl-shine-dark">
            Prezzi trasparenti
            <br />
            calcolati sull&apos;uso reale
          </h2>
        </Reveal>
        
        <div className="grid md:grid-cols-3 gap-5 md:gap-8 mb-10 md:mb-12">
          {PRICING_PLANS.map((plan, index) => (
            <Reveal key={plan.id} delay={150 + index * 100}>
              <Card 
                className={`h-full flex flex-col ${plan.popular ? 'border-accent-brass border-2' : ''}`}
                hover={!plan.popular}
              >
                {plan.badge && (
                  <Badge variant={plan.popular ? 'brass' : 'default'} className="mb-4 w-fit">
                    {plan.badge}
                  </Badge>
                )}
                
                <h3 className="font-serif text-2xl text-ink mb-2">{plan.name}</h3>
                <p className="text-sm text-ink-500 mb-4">{plan.description}</p>
                
                <div className="mb-6 space-y-1">
                  {plan.pricePerUser > 0 ? (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[10px] tracking-wider uppercase text-ink-400">SETUP</span>
                        <span className="font-serif text-2xl text-ink-900">€{plan.setupFee.toLocaleString('it-IT')}</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[10px] tracking-wider uppercase text-ink-400">CANONE</span>
                        <span className="font-mono text-sm text-ink-700">da €{plan.platformFee + plan.pricePerUser * plan.minUsers}/mese</span>
                      </div>
                    </>
                  ) : (
                    <span className="font-serif text-3xl text-ink-900">Su preventivo</span>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.slice(0, 5).map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-ink-700">
                      <Check className="w-4 h-4 text-accent-tech flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  href="/pricing/" 
                  variant={plan.popular ? 'primary' : 'ghost'}
                  className="w-full"
                  ariaLabel={`Scopri il piano ${plan.name}`}
                >
                  {plan.cta}
                </Button>
              </Card>
            </Reveal>
          ))}
        </div>
        
        <Reveal delay={400}>
          <div className="text-center">
            <Button 
              href="/pricing/" 
              variant="primary" 
              size="lg"
              icon={ArrowRight}
              ariaLabel="Calcola il tuo ROI personalizzato"
            >
              Calcola il tuo ROI
            </Button>
            <p className="text-sm text-ink-400 mt-4">
              Nessun costo nascosto. Nessun vendor lock-in. Dati esportabili sempre.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
