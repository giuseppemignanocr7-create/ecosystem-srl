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
    <section className="section-padding bg-gradient-to-br from-brand-navy-3 via-brand-navy to-brand-navy-2 text-white relative overflow-hidden">
      {/* Soft glow decorative */}
      <div
        className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-32 -right-20 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,95,232,0.6) 0%, transparent 70%)' }}
      />

      <div className="container-custom max-w-4xl relative z-10">
        <SectionNumber number="06 —" label="Domande Frequenti" light />

        <Reveal>
          <h2 className="font-serif font-normal italic tracking-[-0.01em] text-[clamp(28px,3.6vw,52px)] leading-[1.18] mt-4 mb-12 max-w-3xl text-pearl-shine">
            FAQ
          </h2>
        </Reveal>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <Reveal key={index} delay={100 + index * 50}>
              <div className="rounded-xl border border-white/15 bg-white/[0.04] backdrop-blur-sm overflow-hidden hover:border-white/25 transition-colors">
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-brand-violet">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-medium text-white">{item.question}</h3>
                  </div>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-white/50 transition-transform duration-300',
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
                    <p className="text-white/70 leading-relaxed">{item.answer}</p>
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
