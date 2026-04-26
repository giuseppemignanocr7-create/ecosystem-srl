'use client'

import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Phone } from 'lucide-react'
import { COMPANY_INFO } from '@/lib/constants'

export function CTABand() {
  return (
    <section className="py-24 lg:py-32 bg-ink text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-tech/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] mb-6">
              Prenota 30 minuti.
              <br />
              <em className="text-accent-tech not-italic">Ti mostriamo tutto.</em>
            </h2>
          </Reveal>
          
          <Reveal delay={100}>
            <p className="text-lg text-ink-300 mb-8 max-w-xl mx-auto">
              Demo personalizzata sui tuoi dati. Con noi, non con un 
              commerciale. Tecnica, diretta, senza slide inutili.
            </p>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                href="/contatti/" 
                variant="primary" 
                size="lg"
                icon={ArrowRight}
                className="bg-white text-ink hover:bg-paper"
                ariaLabel="Prenota una demo personalizzata"
              >
                Prenota ora
              </Button>
            </div>
          </Reveal>
          
          <Reveal delay={300}>
            <div className="mt-8 flex items-center justify-center gap-2 text-ink-300">
              <Phone className="w-4 h-4" />
              <span>O chiama</span>
              <a href={`tel:${COMPANY_INFO.phone}`} className="text-white hover:text-accent-tech transition-colors">
                {COMPANY_INFO.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
