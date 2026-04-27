'use client'

import { Reveal } from '@/components/ui/Reveal'
import { MetricCountUp } from '@/components/motion/MetricCountUp'

export function TrustStrip() {
  const stats = [
    { value: 50, prefix: '€', suffix: 'M+', label: 'VALORE GESTITO', sublabel: 'IN PROGETTI' },
    { value: 13, label: 'VERTICALI', sublabel: 'ATTIVI' },
    { value: 393, label: 'TABELLE DB', sublabel: 'PRODUTTIVE' },
    { value: 100, suffix: '%', label: 'AI-NATIVE', sublabel: 'BY DESIGN' },
  ]

  return (
    <section className="py-8 md:py-12 border-y border-line bg-paper-2">
      <div className="container-custom">
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center lg:text-left">
                <div className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ink-900 mb-2">
                  <MetricCountUp
                    value={stat.value}
                    prefix={stat.prefix ?? ''}
                    suffix={stat.suffix ?? ''}
                  />
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="hidden lg:block w-px h-4 bg-accent-brass" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-ink-500">
                      {stat.label}
                    </p>
                    <p className="font-mono text-xs text-ink-300">{stat.sublabel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
