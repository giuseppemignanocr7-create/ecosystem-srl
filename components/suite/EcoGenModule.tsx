'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Leaf,
  Zap,
  Recycle,
  Trash2,
  Award,
  MapPin,
  Activity,
  TrendingUp,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

export interface EcoMetric {
  label: string
  value: number
  unit: string
  sublabel?: string
  decimals?: number
  icon: LucideIcon
  accent: string
}

export interface EcoTabContent {
  id: string
  label: string
  rows: { label: string; value: string; delta?: string; status?: 'good' | 'warn' | 'bad' }[]
}

export interface EcoConfig {
  sectorLabel: string
  description: string
  metrics: EcoMetric[]
  tabs: EcoTabContent[]
  predictions: string[]
}

export function EcoGenModule({ config }: { config: EcoConfig }) {
  const [active, setActive] = useState(config.tabs[0]?.id ?? 'esg')
  const [running, setRunning] = useState(false)
  const [animatedValues, setAnimatedValues] = useState<number[]>(
    config.metrics.map(() => 0),
  )

  function runAnalysis() {
    if (running) return
    setRunning(true)
    setAnimatedValues(config.metrics.map(() => 0))
    config.metrics.forEach((m, idx) => {
      const start = Date.now()
      const duration = 1400 + idx * 80
      const interval = setInterval(() => {
        const t = Math.min(1, (Date.now() - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setAnimatedValues((prev) => {
          const next = [...prev]
          next[idx] = m.value * eased
          return next
        })
        if (t >= 1) clearInterval(interval)
      }, 30)
    })
    setTimeout(() => setRunning(false), 2200)
  }

  useEffect(() => {
    const t = setTimeout(runAnalysis, 600)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const activeTab = config.tabs.find((t) => t.id === active) ?? config.tabs[0]

  return (
    <section className="relative bg-gradient-to-br from-[#0F1A1F] via-[#0B1518] to-[#0A0F12] text-white py-16 lg:py-24 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(circle at 15% 30%, rgba(16,185,129,0.25), transparent 60%), radial-gradient(circle at 85% 70%, rgba(59,130,246,0.2), transparent 60%)',
        }}
      />
      <div className="grain" aria-hidden />

      <div className="container-custom relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <Leaf size={18} className="text-white" />
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-emerald-400">
                  ECOGEN · {config.sectorLabel}
                </div>
                <h2 className="font-serif text-3xl lg:text-4xl text-white">
                  Energia, impianti e consumi predittivi
                </h2>
              </div>
            </div>
            <p className="text-sm lg:text-base text-white/60 max-w-2xl leading-relaxed">
              {config.description}
            </p>
          </div>

          <button
            type="button"
            onClick={runAnalysis}
            disabled={running}
            className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium hover:shadow-xl hover:shadow-emerald-500/30 transition-shadow disabled:opacity-70"
          >
            <Sparkles
              size={16}
              className={running ? 'animate-spin' : 'group-hover:scale-110 transition-transform'}
            />
            {running ? 'Analisi in corso...' : 'Esegui Analisi Predittiva'}
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-10">
          {config.metrics.map((m, idx) => {
            const Icon = m.icon
            const v = animatedValues[idx] ?? 0
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-sm overflow-hidden group hover:border-white/10 transition-colors"
              >
                <div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"
                  style={{ background: m.accent }}
                  aria-hidden
                />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${m.accent}22` }}
                    >
                      <Icon size={14} style={{ color: m.accent }} />
                    </div>
                    <div className="font-mono text-[8px] tracking-[0.18em] uppercase text-white/40">
                      {m.label}
                    </div>
                  </div>
                  <div className="font-serif text-3xl lg:text-4xl text-white tabular-nums leading-none">
                    {v.toLocaleString('it-IT', {
                      maximumFractionDigits: m.decimals ?? 0,
                      minimumFractionDigits: m.decimals ?? 0,
                    })}
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                      {m.unit}
                    </div>
                    {m.sublabel && (
                      <div className="text-[10px] text-white/50">{m.sublabel}</div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
          <div className="border-b border-white/5 overflow-x-auto scrollbar-hide">
            <div className="flex gap-1 p-2 min-w-max">
              {config.tabs.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    active === t.id
                      ? 'bg-emerald-500/15 text-emerald-300'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {active === 'predictions' ? (
                  <ul className="space-y-3">
                    {config.predictions.map((p, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex gap-3 p-3 rounded-lg border border-white/5 bg-gradient-to-r from-emerald-500/5 to-transparent"
                      >
                        <div className="w-7 h-7 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                          <TrendingUp size={13} className="text-emerald-400" />
                        </div>
                        <p className="text-sm text-white/80 leading-relaxed">{p}</p>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <ul className="divide-y divide-white/5">
                    {(activeTab?.rows ?? []).map((r, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              r.status === 'good'
                                ? 'bg-emerald-400'
                                : r.status === 'warn'
                                  ? 'bg-amber-400'
                                  : r.status === 'bad'
                                    ? 'bg-red-400'
                                    : 'bg-white/30'
                            }`}
                          />
                          <span className="text-sm text-white/80">{r.label}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {r.delta && (
                            <span
                              className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                                r.status === 'good'
                                  ? 'bg-emerald-500/15 text-emerald-300'
                                  : r.status === 'bad'
                                    ? 'bg-red-500/15 text-red-300'
                                    : 'bg-amber-500/15 text-amber-300'
                              }`}
                            >
                              {r.delta}
                            </span>
                          )}
                          <span className="font-mono text-sm text-white tabular-nums">
                            {r.value}
                          </span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="text-center mt-8 text-[11px] font-mono tracking-wider uppercase text-white/30">
          ECOGEN è incluso di default in ogni suite Ecosystem · CSRD/ESG ready
        </p>
      </div>
    </section>
  )
}

export const ECO_ICONS = { Zap, Recycle, Trash2, Award, MapPin, Activity }
