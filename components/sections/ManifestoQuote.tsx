'use client'

import { Reveal } from '@/components/ui/Reveal'

export function ManifestoQuote() {
  return (
    <section className="section-padding bg-gradient-to-br from-brand-navy-3 via-brand-navy to-brand-navy-2 text-white relative overflow-hidden">
      <div
        className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.45) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-32 -right-20 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,95,232,0.6) 0%, transparent 70%)' }}
      />

      <div className="container-custom relative z-10">
        <Reveal>
          <blockquote className="max-w-5xl mx-auto text-center">
            <p className="font-serif italic font-normal tracking-[-0.01em] text-[clamp(28px,3.6vw,56px)] leading-[1.18] mb-10 text-pearl-shine">
              &ldquo;Eco supera i limiti del software tradizionale per tracciare le <em className="not-italic">coordinate tecnologiche</em> destinate a definire gli standard del futuro.&rdquo;
            </p>
            <footer className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-serif text-lg" style={{ background: 'linear-gradient(135deg, #3B5FE8 0%, #1A2750 100%)' }}>
                G
              </div>
              <div className="text-left">
                <cite className="font-medium text-white not-italic">Giuseppe Mignano</cite>
                <p className="text-sm text-white/60">Fondatore — Founder, Ecosystem S.R.L.</p>
              </div>
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
