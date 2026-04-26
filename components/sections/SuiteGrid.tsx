'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SectionNumber } from '@/components/ui/SectionNumber'
import { Reveal } from '@/components/ui/Reveal'
import { SUITES } from '@/content/suites'
import { ArrowRight, Sparkles, Boxes, Wand2, Layers } from 'lucide-react'

// Palette per settore — armonica con i brand colors del sito
const SUITE_COLORS: Record<string, string> = {
  buildsuite: '#06B6D4',          // ciano edilizia
  legalmind: '#D4A521',            // oro legale
  dentalsuite: '#14B8A6',          // teal odontoiatria
  foodsuite: '#F59E0B',            // ambra ristorazione
  okchef: '#EAB308',               // giallo chef
  fishsuite: '#0EA5E9',            // blu mare
  retailsuite: '#EC4899',          // rosa retail
  rentsuite: '#8B5CF6',            // viola immobiliare
  techsuite: '#6366F1',            // indaco IT
  'consulente-virtuale': '#3B82F6', // blu consulenza
  civiccore: '#10B981',            // verde PA
  petverse: '#F97316',             // arancio pet
  'archon-os': '#7C3AED',          // viola brand multi-entity
}

export function SuiteGrid() {
  return (
    <section className="section-padding bg-paper relative overflow-hidden">
      <div className="container-custom relative z-10">
        <SectionNumber number="02 —" label="La Piattaforma" />

        <Reveal delay={100}>
          <p className="text-lg lg:text-xl text-ink-900 mt-4 mb-12 max-w-3xl leading-relaxed font-medium">
            Scegli la suite più affine al tuo settore o progetta con noi la tua configurazione
            esclusiva.
          </p>
        </Reveal>

        {/* GRID DELLE SUITE — card rettangolari 4-col */}
        <Reveal delay={150}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
            {SUITES.map((suite, idx) => {
              const tag = suite.tag.split('·')[0].trim()
              const color = SUITE_COLORS[suite.id] ?? '#7C3AED'
              return (
                <Link
                  key={suite.id}
                  href={`/suite/${suite.id}/`}
                  className="group relative rounded-xl border border-line bg-paper-2 hover:bg-paper p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg overflow-hidden flex flex-col h-full"
                  style={{ ['--c' as string]: color }}
                >
                  {/* Strip top colorata */}
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ background: color }}
                  />

                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="w-2 h-2 rounded-full transition-transform group-hover:scale-150"
                      style={{ background: color }}
                    />
                    <span className="font-mono text-[10px] tracking-wider text-ink-300">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg text-ink-900 mb-2 group-hover:text-[color:var(--c)] transition-colors">
                    {suite.name}
                  </h4>

                  <span
                    className="inline-block w-fit font-mono text-[9px] tracking-[0.16em] uppercase px-2 py-0.5 rounded mb-3"
                    style={{
                      color: color,
                      background: `${color}14`,
                      border: `1px solid ${color}33`,
                    }}
                  >
                    {tag}
                  </span>

                  <p className="text-xs text-ink-500 leading-relaxed flex-1">
                    {suite.description.split('.')[0]}.
                  </p>

                  <ArrowRight
                    size={14}
                    className="text-ink-300 group-hover:text-[color:var(--c)] group-hover:translate-x-1 transition-all mt-3 self-end"
                  />
                </Link>
              )
            })}
          </div>
        </Reveal>

        {/* SUITE SU MISURA — sfondo navy come hero */}
        <Reveal delay={250}>
          <div className="relative rounded-2xl bg-gradient-to-br from-brand-navy-3 via-brand-navy to-brand-navy-2 text-white p-8 lg:p-12 mb-6 overflow-hidden">
            <div
              className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-30 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 70%)' }}
            />
            <div
              className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(59,95,232,0.6) 0%, transparent 70%)' }}
            />

            <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-brand-violet mb-5 px-3 py-1.5 rounded-full bg-brand-violet/10 border border-brand-violet/30">
                  <Wand2 size={12} /> SUITE SU MISURA
                </div>
                <h3 className="font-serif text-3xl lg:text-5xl leading-[1.05] mb-5">
                  Il tuo settore
                  <br />
                  <em className="italic text-brand-violet">non è in lista?</em>
                </h3>
                <p className="text-base lg:text-lg text-white/70 mb-8 leading-relaxed max-w-lg">
                  Studiamo i tuoi flussi, mappiamo le entità, progettiamo i moduli. CoreMind apprende
                  il tuo dominio e il prodotto cresce con te. <strong className="text-white">Stessa
                  piattaforma, stessa AI, esperienza pensata su misura.</strong>
                </p>

                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { icon: Layers, title: 'Discovery', desc: 'Mappiamo processi e dati' },
                    { icon: Boxes, title: 'Build', desc: 'Moduli e UI dedicati' },
                    { icon: Sparkles, title: 'AI custom', desc: 'CoreMind sul tuo dominio' },
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                      className="p-3 rounded-lg border border-white/10 bg-white/5"
                    >
                      <step.icon size={16} className="text-brand-violet mb-2" />
                      <div className="text-xs font-semibold text-white">{step.title}</div>
                      <div className="text-[10px] text-white/50">{step.desc}</div>
                    </motion.div>
                  ))}
                </div>

                <Link
                  href="/contatti"
                  className="inline-flex items-center gap-2 bg-brand-violet hover:bg-brand-violet-deep text-white px-6 py-3.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-brand-violet/30"
                >
                  Raccontaci il tuo settore
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="hidden lg:block relative">
                <div className="relative aspect-square max-w-[360px] mx-auto">
                  <motion.div
                    className="absolute inset-0 rounded-full border border-brand-violet/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute inset-8 rounded-full border border-brand-blue/30"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute inset-16 rounded-full border border-brand-violet/40"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-violet to-brand-violet-deep flex items-center justify-center shadow-2xl shadow-brand-violet/40">
                      <Wand2 size={42} className="text-white" />
                    </div>
                  </div>
                  {SUITES.slice(0, 8).map((s, i) => {
                    const angle = (i / 8) * Math.PI * 2
                    const r = 150
                    return (
                      <motion.div
                        key={s.id}
                        className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-brand-violet"
                        style={{
                          x: Math.cos(angle) * r - 4,
                          y: Math.sin(angle) * r - 4,
                        }}
                        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <p className="mt-6 text-center text-xs text-ink-500">
            Ogni suite è personalizzabile su misura del tuo flusso operativo ·
            <Link href="/suite" className="text-brand-violet hover:underline ml-1">
              Esplora tutte →
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
