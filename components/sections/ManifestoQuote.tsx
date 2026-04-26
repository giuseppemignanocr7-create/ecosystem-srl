'use client'

import { Reveal } from '@/components/ui/Reveal'

export function ManifestoQuote() {
  return (
    <section className="section-padding bg-paper-2">
      <div className="container-custom">
        <Reveal>
          <blockquote className="max-w-4xl mx-auto text-center">
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] text-ink mb-8">
              &ldquo;Non abbiamo costruito un altro gestionale.
              <br />
              <em className="text-accent-tech not-italic">Abbiamo costruito il modo in cui il software</em>
              <br />
              aziendale funzionerà nel prossimo decennio.&rdquo;
            </p>
            <footer className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-accent-tech rounded-full flex items-center justify-center text-white font-serif text-lg">
                G
              </div>
              <div className="text-left">
                <cite className="font-medium text-ink not-italic">Giuseppe Mignano</cite>
                <p className="text-sm text-ink-500">Amministratore & Founder, Ecosystem S.R.L.</p>
              </div>
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
