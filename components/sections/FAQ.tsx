'use client'

import { useState } from 'react'
import { SectionNumber } from '@/components/ui/SectionNumber'
import { Reveal } from '@/components/ui/Reveal'
import { FAQ_ITEMS } from '@/content/faq'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="section-padding bg-paper-2">
      <div className="container-custom max-w-4xl">
        <SectionNumber number="06 —" label="Domande Frequenti" />
        
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-12">
            Hai dubbi?
            <br />
            <em className="text-accent-tech not-italic">Risposte chiare.</em>
          </h2>
        </Reveal>
        
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <Reveal key={index} delay={100 + index * 50}>
              <div className="bg-white rounded-xl border border-line overflow-hidden">
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-accent-brass">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-medium text-ink">{item.question}</h3>
                  </div>
                  <ChevronDown 
                    className={cn(
                      'w-5 h-5 text-ink-300 transition-transform duration-300',
                      openIndex === index && 'rotate-180'
                    )} 
                  />
                </button>
                
                <div
                  id={`faq-answer-${index}`}
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  )}
                >
                  <div className="px-6 pb-5 pl-16">
                    <p className="text-ink-500 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
