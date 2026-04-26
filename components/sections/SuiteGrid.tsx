'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SectionNumber } from '@/components/ui/SectionNumber'
import { Reveal } from '@/components/ui/Reveal'
import { SUITES } from '@/content/suites'
import { ArrowRight, Sparkles, Boxes, Wand2, Layers, Search, Database, Rocket, Activity, BarChart3, LineChart } from 'lucide-react'

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
          <p className="text-lg text-ink-700 mt-4 mb-4 max-w-3xl leading-relaxed">
            Sviluppate con la precisione di sistemi nativi, le nostre suite operano in un
            ecosistema integrato, un unico DNA tecnologico, garantendo continuità operativa e
            intelligenza diffusa.
          </p>
          <p className="text-lg lg:text-xl text-ink-900 mb-12 max-w-3xl leading-relaxed font-medium">
            Scegli la suite più affine al tuo settore o progetta con noi la tua configurazione
            esclusiva.
          </p>
        </Reveal>

        {/* GRID DELLE SUITE — card rettangolari 4-col */}
        <Reveal delay={150}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
            {SUITES.filter((s) => s.id !== 'archon-os').map((suite, idx) => {
              const tag = suite.tag.split('·')[0].trim()
              const color = SUITE_COLORS[suite.id] ?? '#7C3AED'
              return (
                <Link
                  key={suite.id}
                  href={`/suite/${suite.id}/`}
                  className="group relative rounded-xl border border-line bg-paper hover:bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-line-strong overflow-hidden flex flex-col h-full"
                  style={{ ['--c' as string]: color }}
                >
                  {/* Strip top — neutra a riposo, colorata su hover */}
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ background: color }}
                  />

                  <div className="relative flex items-center justify-between mb-3">
                    <span
                      className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
                      style={{ background: color }}
                    />
                    <span className="font-mono text-[10px] tracking-wider text-ink-300">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h4 className="relative font-serif text-lg text-ink-900 mb-2 group-hover:text-[color:var(--c)] transition-colors">
                    {suite.name}
                  </h4>

                  <span
                    className="relative inline-block w-fit font-mono text-[9px] tracking-[0.16em] uppercase px-2 py-0.5 rounded mb-3"
                    style={{
                      color: color,
                      background: `${color}10`,
                      border: `1px solid ${color}26`,
                    }}
                  >
                    {tag}
                  </span>

                  <p className="relative text-xs text-ink-500 leading-relaxed flex-1">
                    {suite.description.split('.')[0]}.
                  </p>

                  <ArrowRight
                    size={14}
                    className="relative text-ink-300 group-hover:text-[color:var(--c)] group-hover:translate-x-1 transition-all mt-3 self-end"
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
                <p className="text-base lg:text-lg text-white mb-8 leading-relaxed max-w-lg font-medium">
                  Progetta con noi la tua suite.
                </p>

                {/* Mini step pillole: Discovery / Build / AI custom */}
                <div className="grid sm:grid-cols-3 gap-3 mb-8">
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

                {/* Tre passi del metodo — Diagnosi / Migrazione / Operatività */}
                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  {[
                    {
                      number: '01',
                      icon: Search,
                      title: 'Diagnosi',
                      duration: '1 settimana',
                      desc: 'Analizziamo i tuoi flussi, i tuoi software attuali, i tuoi dati. Identifichiamo quali suite servono e in che ordine attivarle.',
                    },
                    {
                      number: '02',
                      icon: Database,
                      title: 'Migrazione',
                      duration: '2–4 settimane',
                      desc: 'Importiamo tutti i dati dai sistemi legacy (gestionali, Excel, documenti). CoreMind impara la tua azienda. Tu continui a lavorare.',
                    },
                    {
                      number: '03',
                      icon: Rocket,
                      title: 'Operatività',
                      duration: 'Da subito',
                      desc: 'Dashboard operativa. Formazione team. Supporto 24/7 il primo mese. SLA garantito. Nessun vendor lock-in.',
                    },
                  ].map((step, i) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                      className="relative p-5 rounded-xl border border-white/15 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="font-mono text-3xl font-light text-brand-violet/80">
                          {step.number}
                        </span>
                        <step.icon size={18} className="text-brand-violet/60 mt-1" />
                      </div>
                      <h4 className="font-serif text-xl text-white mb-1">{step.title}</h4>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-violet/90">
                        {step.duration}
                      </span>
                      <p className="text-[11px] text-white/65 leading-relaxed mt-3">
                        {step.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <Link
                  href="/contatti"
                  className="inline-flex items-center gap-2 bg-brand-violet hover:bg-brand-violet-deep text-white px-6 py-3.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-brand-violet/30"
                >
                  Contattaci
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Visual: dashboard analisi dati live */}
              <div className="hidden lg:block relative">
                <DataAnalysisViz />
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

/* -------------------------------------------------------------------------
 * DataAnalysisViz — dashboard di analisi dati live
 * Bar-chart che si auto-aggiornano + line chart pulsante + KPI animate
 * Trasmette: "stiamo analizzando i tuoi dati per progettare la tua suite"
 * ------------------------------------------------------------------------- */
function DataAnalysisViz() {
  const bars = [62, 88, 45, 91, 73, 58, 84, 67]

  return (
    <div className="relative aspect-[4/5] max-w-[380px] mx-auto rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-md overflow-hidden p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <motion.span
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/80">
            Analisi · Live
          </span>
        </div>
        <Activity size={12} className="text-brand-violet/80" />
      </div>

      {/* KPI animate */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <KpiCell label="Entità" target={147} suffix="" />
        <KpiCell label="Flussi" target={42} suffix="" />
        <KpiCell label="Moduli" target={12} suffix="" />
        <KpiCell label="Match" target={94} suffix="%" />
      </div>

      {/* Bar chart che si aggiorna */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-white/50">
            Densità dati per modulo
          </span>
          <BarChart3 size={11} className="text-white/40" />
        </div>
        <div className="flex items-end gap-1 h-20">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t"
              style={{
                background: `linear-gradient(180deg, rgba(124,58,237,0.9) 0%, rgba(59,95,232,0.6) 100%)`,
              }}
              initial={{ height: '10%' }}
              animate={{ height: [`${h * 0.6}%`, `${h}%`, `${h * 0.7}%`] }}
              transition={{
                duration: 2 + (i % 3) * 0.4,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Line chart con sweep */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-white/50">
            Pattern processi
          </span>
          <LineChart size={11} className="text-white/40" />
        </div>
        <div className="relative h-16 rounded bg-black/20 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(167,139,250,0.5)" />
                <stop offset="100%" stopColor="rgba(167,139,250,0)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,28 L12,22 L24,30 L36,18 L48,24 L60,12 L72,20 L84,8 L100,14"
              fill="none"
              stroke="#A78BFA"
              strokeWidth="1.2"
              animate={{
                d: [
                  'M0,28 L12,22 L24,30 L36,18 L48,24 L60,12 L72,20 L84,8 L100,14',
                  'M0,24 L12,28 L24,16 L36,22 L48,14 L60,20 L72,10 L84,16 L100,8',
                  'M0,28 L12,22 L24,30 L36,18 L48,24 L60,12 L72,20 L84,8 L100,14',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d="M0,28 L12,22 L24,30 L36,18 L48,24 L60,12 L72,20 L84,8 L100,14 L100,40 L0,40 Z"
              fill="url(#lineGrad)"
              animate={{
                d: [
                  'M0,28 L12,22 L24,30 L36,18 L48,24 L60,12 L72,20 L84,8 L100,14 L100,40 L0,40 Z',
                  'M0,24 L12,28 L24,16 L36,22 L48,14 L60,20 L72,10 L84,16 L100,8 L100,40 L0,40 Z',
                  'M0,28 L12,22 L24,30 L36,18 L48,24 L60,12 L72,20 L84,8 L100,14 L100,40 L0,40 Z',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
          {/* sweep light */}
          <motion.div
            className="absolute inset-y-0 w-1 bg-gradient-to-b from-transparent via-violet-300/60 to-transparent"
            animate={{ left: ['-2%', '102%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Footer: log lines */}
      <div className="space-y-1 font-mono text-[9px] text-white/45">
        <LogLine text="› analisi flussi → 84%" delay={0} />
        <LogLine text="› match entità → 147 trovate" delay={1} />
        <LogLine text="› design moduli → in corso" delay={2} />
      </div>
    </div>
  )
}

function KpiCell({ label, target, suffix }: { label: string; target: number; suffix: string }) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    let raf: number
    let start: number | null = null
    const dur = 1400
    const step = (t: number) => {
      if (start === null) start = t
      const p = Math.min((t - start) / dur, 1)
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target])

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
      <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/45">{label}</div>
      <div className="font-serif text-2xl text-white tabular-nums leading-none mt-1">
        {val}
        <span className="text-brand-violet/80 text-base">{suffix}</span>
      </div>
    </div>
  )
}

function LogLine({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: [0, 1, 1, 0.5], x: 0 }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatDelay: 1,
      }}
    >
      {text}
    </motion.div>
  )
}
