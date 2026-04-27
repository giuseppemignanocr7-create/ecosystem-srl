'use client'

import { SectionNumber } from '@/components/ui/SectionNumber'
import { Reveal } from '@/components/ui/Reveal'
import { Mail, MessageCircle, Phone, Headphones } from 'lucide-react'

const TIERS = [
  {
    icon: Mail,
    plan: 'Starter',
    channel: 'Email',
    sla: 'SLA 48h lavorative',
    hours: '1h/mese inclusa',
  },
  {
    icon: MessageCircle,
    plan: 'Professional',
    channel: 'Email · Chat · Telefono',
    sla: 'SLA 4h lavorative · 8h h24',
    hours: '4h/mese incluse',
  },
  {
    icon: Phone,
    plan: 'Enterprise',
    channel: 'Telefono dedicato · Slack condiviso · On-site',
    sla: 'SLA 1h lavorative · 4h h24 con escalation',
    hours: '16h/mese incluse',
  },
  {
    icon: Headphones,
    plan: 'Supporto Premium',
    channel: 'Manager dedicato H24/7',
    sla: 'Risposta entro 30 minuti',
    hours: 'Add-on per Business & Enterprise',
  },
]

export function Support() {
  return (
    <section className="section-padding bg-paper">
      <div className="container-custom">
        <SectionNumber number="07 —" label="Assistenza" />

        <Reveal>
          <h2 className="font-serif font-normal italic tracking-[-0.01em] text-[clamp(28px,3.6vw,52px)] leading-[1.18] mt-4 mb-6 max-w-5xl text-pearl-shine-dark">
            Servizio clienti
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="text-lg text-ink-500 max-w-3xl mb-12 leading-relaxed">
            I piani Professional ed Enterprise includono supporto multicanale — email, chat e
            telefono — con SLA contrattuali, ore di assistenza incluse e onboarding dedicato.
            Per esigenze H24/7 è disponibile il pacchetto Supporto Premium con manager dedicato e
            risposta entro 30 minuti.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TIERS.map((t, i) => {
            const Icon = t.icon
            return (
              <Reveal key={t.plan} delay={150 + i * 80}>
                <div className="h-full rounded-2xl border border-line bg-white p-6 hover:border-brand-violet/30 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-brand-violet/10 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-brand-violet" />
                  </div>
                  <h3 className="font-serif text-xl text-ink-900 mb-2">{t.plan}</h3>
                  <p className="text-sm text-ink-500 mb-3">{t.channel}</p>
                  <div className="space-y-1 pt-3 border-t border-line">
                    <p className="font-mono text-[11px] tracking-wider uppercase text-ink-400">{t.sla}</p>
                    <p className="font-mono text-[11px] tracking-wider uppercase text-ink-400">{t.hours}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
