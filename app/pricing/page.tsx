'use client'

import { useState, useMemo } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { SectionNumber } from '@/components/ui/SectionNumber'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PRICING_PLANS, ADDONS, PRICING_NOTES } from '@/content/pricing'
import { Check, X, Calculator, Zap, LifeBuoy, Building2 } from 'lucide-react'
import Link from 'next/link'

function fmt(v: number) {
  return v.toLocaleString('it-IT', { maximumFractionDigits: 0 })
}

export default function PricingPage() {
  const [users, setUsers] = useState(8)
  const [suites, setSuites] = useState(2)
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual')

  // Determina il piano consigliato
  const plan = useMemo(() => {
    if (users <= 5 && suites <= 1) return PRICING_PLANS[0]
    if (users <= 25 && suites <= 3) return PRICING_PLANS[1]
    return PRICING_PLANS[2]
  }, [users, suites])

  const monthly = useMemo(() => {
    if (plan.id === 'enterprise') return null
    return plan.platformFee + plan.pricePerUser * users
  }, [plan, users])

  const annual = monthly ? monthly * 12 * 0.9 : null
  const yearTotal = billing === 'annual' ? annual : monthly ? monthly * 12 : null
  const setup = plan.id === 'enterprise' ? null : plan.setupFee
  const firstYear = setup !== null && yearTotal !== null ? setup + yearTotal : null

  return (
    <div className="pt-24 pb-20 bg-paper min-h-screen">
      <div className="container-custom">
        <SectionNumber number="05 —" label="Investimento" />

        <Reveal>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">
            Prezzi reali.
            <em className="text-brand-violet not-italic block">
              Setup, canone, assistenza.
            </em>
          </h1>
        </Reveal>

        <Reveal delay={100}>
          <p className="text-lg text-ink-700 mb-12 max-w-2xl">
            Nessuna fee nascosta, un piano di costi definito per una libertà decisionale assoluta.
            Valorizziamo il vostro tempo con un modello chiaro: setup su misura, canone ricorrente
            e assistenza inclusa. La trasparenza è il nostro standard di fiducia.
          </p>
        </Reveal>

        {/* PIANI */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {PRICING_PLANS.map((p, idx) => {
            const isEnterprise = p.id === 'enterprise'
            const isPopular = p.popular
            return (
              <Reveal key={p.id} delay={150 + idx * 100}>
                <Card
                  className={`relative h-full flex flex-col ${
                    isPopular ? 'border-brand-violet border-2 shadow-xl shadow-brand-violet/10' : ''
                  }`}
                >
                  {p.badge && (
                    <Badge
                      variant={isPopular ? 'brass' : 'default'}
                      className={`mb-4 w-fit ${isPopular ? 'bg-brand-violet text-white' : ''}`}
                    >
                      {p.badge}
                    </Badge>
                  )}

                  <h2 className="font-serif text-2xl text-ink-900 mb-2">{p.name}</h2>
                  <p className="text-sm text-ink-500 mb-5 min-h-[42px]">{p.description}</p>

                  {/* Setup + canone visibile */}
                  <div className="space-y-3 mb-5 pb-5 border-b border-line">
                    {isEnterprise ? (
                      <div>
                        <span className="font-serif text-3xl text-ink-900">Su preventivo</span>
                        <div className="text-xs text-ink-400 mt-1">
                          dimensionato sul tuo gruppo
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-baseline justify-between">
                          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink-400">
                            SETUP UNA TANTUM
                          </span>
                          <span className="font-serif text-2xl text-ink-900">
                            €{fmt(p.setupFee)}
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between">
                          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink-400">
                            CANONE PIATTAFORMA
                          </span>
                          <span className="font-mono text-sm">€{p.platformFee}/mese</span>
                        </div>
                        <div className="flex items-baseline justify-between">
                          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink-400">
                            PER UTENTE
                          </span>
                          <span className="font-mono text-sm">€{p.pricePerUser}/mese</span>
                        </div>
                        <div className="text-[11px] text-ink-500 pt-1">
                          {p.minUsers}–{p.maxUsers} utenti · {p.includedSuites} suite
                        </div>
                      </>
                    )}
                  </div>

                  {/* Assistenza */}
                  <div className="flex items-start gap-2 mb-5 p-3 rounded-lg bg-paper-2 border border-line">
                    <LifeBuoy size={16} className="text-brand-violet mt-0.5 shrink-0" />
                    <div className="text-xs leading-relaxed">
                      <div className="font-medium text-ink-900 mb-0.5">Assistenza inclusa</div>
                      <div className="text-ink-500">
                        {p.support.channel} · SLA {p.support.sla}
                      </div>
                      <div className="text-ink-500">
                        Onboarding {p.support.onboardingHours}h ·{' '}
                        {p.support.monthlyHoursIncluded}h/mese
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-6 flex-grow">
                    {p.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-ink-700"
                      >
                        <Check size={14} className="text-success mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                    {p.notIncluded?.map((f, i) => (
                      <li
                        key={`ni-${i}`}
                        className="flex items-start gap-2 text-sm text-ink-300 line-through"
                      >
                        <X size={14} className="mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contatti"
                    className={`text-center px-4 py-3 rounded-lg font-medium transition-colors ${
                      isPopular
                        ? 'bg-brand-violet text-white hover:bg-brand-violet-deep'
                        : 'border border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white'
                    }`}
                  >
                    {p.cta} →
                  </Link>
                </Card>
              </Reveal>
            )
          })}
        </div>

        {/* CALCOLATORE */}
        <Reveal delay={300}>
          <div className="rounded-2xl border border-line-strong bg-gradient-to-br from-bg-ink to-[#1a1a24] text-white p-8 lg:p-10 mb-20 relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 70%)',
              }}
            />

            <div className="relative grid lg:grid-cols-[1fr_1.2fr] gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-violet/20 flex items-center justify-center">
                    <Calculator size={22} className="text-brand-violet" />
                  </div>
                  <div>
                    <h2 className="font-serif text-3xl">Calcolatore investimento</h2>
                    <p className="text-xs font-mono tracking-wider uppercase text-brand-violet">
                      ESTIMATO IN TEMPO REALE
                    </p>
                  </div>
                </div>
                <p className="text-ink-300 mb-6">
                  Imposta utenti e suite. Ti mostro setup iniziale, canone, e costo totale del
                  primo anno. Senza preventivi, senza chiamate, senza email.
                </p>

                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-xs font-mono tracking-wider uppercase text-ink-400 mb-2">
                      <span>Numero utenti</span>
                      <span className="text-white tabular-nums">{users}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={users}
                      onChange={(e) => setUsers(parseInt(e.target.value))}
                      className="w-full accent-brand-violet"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-mono tracking-wider uppercase text-ink-400 mb-2">
                      <span>Suite verticali</span>
                      <span className="text-white tabular-nums">{suites}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="13"
                      value={suites}
                      onChange={(e) => setSuites(parseInt(e.target.value))}
                      className="w-full accent-brand-violet"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setBilling('monthly')}
                      className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        billing === 'monthly'
                          ? 'bg-brand-violet text-white'
                          : 'border border-white/20 text-ink-300 hover:border-white/40'
                      }`}
                    >
                      Fatturazione mensile
                    </button>
                    <button
                      type="button"
                      onClick={() => setBilling('annual')}
                      className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        billing === 'annual'
                          ? 'bg-brand-violet text-white'
                          : 'border border-white/20 text-ink-300 hover:border-white/40'
                      }`}
                    >
                      Annuale (-10%)
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-brand-violet mb-2">
                    PIANO CONSIGLIATO
                  </div>
                  <div className="font-serif text-3xl mb-1">{plan.name}</div>
                  <div className="text-sm text-ink-300">{plan.description}</div>
                </div>

                {plan.id !== 'enterprise' ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink-400 mb-1">
                          SETUP UNA TANTUM
                        </div>
                        <div className="font-serif text-2xl text-white tabular-nums">
                          €{fmt(setup ?? 0)}
                        </div>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink-400 mb-1">
                          CANONE MENSILE
                        </div>
                        <div className="font-serif text-2xl text-white tabular-nums">
                          €{fmt(monthly ?? 0)}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-brand-violet/40 bg-gradient-to-br from-brand-violet/20 to-brand-violet-deep/10 p-5">
                      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-brand-violet mb-1">
                        TOTALE PRIMO ANNO ({billing === 'annual' ? 'annuale' : 'mensile'})
                      </div>
                      <div className="font-serif text-4xl text-white tabular-nums">
                        €{fmt(firstYear ?? 0)}
                      </div>
                      <div className="text-[11px] text-ink-300 mt-1">
                        Setup + 12 mesi di canone · iva esclusa
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="rounded-xl border border-brand-violet/40 bg-gradient-to-br from-brand-violet/20 to-brand-violet-deep/10 p-6 text-center">
                    <Building2 size={28} className="mx-auto mb-3 text-brand-violet" />
                    <div className="font-serif text-2xl mb-2">Preventivo personalizzato</div>
                    <div className="text-sm text-ink-300 mb-4">
                      Per gruppi multi-entity, on-premise, esigenze regolatorie specifiche.
                      Tipicamente: setup €15K–€80K, canone da €1.500/mese.
                    </div>
                    <Link
                      href="/contatti"
                      className="inline-block bg-brand-violet text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-brand-violet-deep transition-colors"
                    >
                      Parla con vendite →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ADDONS */}
        <Reveal delay={400}>
          <h2 className="font-serif text-2xl lg:text-3xl text-ink-900 mb-2">Add-on disponibili</h2>
          <p className="text-sm text-ink-500 mb-8">
            Componibili su qualsiasi piano. Attivabili in autonomia dalla console.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {ADDONS.map((addon) => (
              <Card key={addon.id} className="h-full">
                <div className="flex items-start gap-2 mb-2">
                  <Zap size={14} className="text-brand-violet mt-0.5 shrink-0" />
                  <h3 className="font-medium text-ink-900 text-sm">{addon.name}</h3>
                </div>
                <p className="text-xs text-ink-500 mb-3 leading-relaxed">{addon.description}</p>
                <p className="font-mono text-xs text-brand-violet">{addon.price}</p>
              </Card>
            ))}
          </div>
        </Reveal>

        {/* NOTE */}
        <Reveal delay={500}>
          <div className="rounded-xl border border-line bg-paper-2 p-6">
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-400 mb-3">
              CONDIZIONI E NOTE
            </div>
            <ul className="space-y-2 text-sm text-ink-700">
              {PRICING_NOTES.map((n, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-brand-violet mt-1">•</span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
