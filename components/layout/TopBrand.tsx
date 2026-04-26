'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Logo } from '@/components/ui/Logo'
import { Activity, Cpu, Globe2, ShieldCheck, Sparkles, Users } from 'lucide-react'

const TICKERS = [
  { icon: Activity, label: 'Sistema', value: 'OPERATIVO', accent: '#10B981', live: true },
  { icon: Cpu, label: 'CoreMind', value: 'ATTIVO', accent: '#7C3AED', live: true },
  { icon: Users, label: 'Aziende live', value: '142', accent: '#3B5FE8' },
  { icon: Globe2, label: 'Hosting', value: 'EU · Italia', accent: '#06B6D4' },
  { icon: ShieldCheck, label: 'Compliance', value: 'GDPR · ISO 27001', accent: '#D4A521' },
  { icon: Sparkles, label: 'Versione', value: 'v2.0 · 2026', accent: '#EC4899' },
]

export function TopBrand() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="hidden lg:flex w-full pt-5 pb-3 px-12 relative z-20 items-center gap-8"
    >
      <Link
        href="/"
        aria-label="Ecosystem — Home"
        className="shrink-0 hover:opacity-85 transition-opacity"
      >
        <Logo variant="light" size={150} priority />
      </Link>

      {/* LIVE STATUS RAIL */}
      <div className="flex-1 grid grid-cols-3 xl:grid-cols-6 gap-3 min-w-0">
        {TICKERS.map((t, i) => {
          const Icon = t.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.07, duration: 0.5 }}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-line bg-paper/60 backdrop-blur-sm hover:bg-paper transition-colors min-w-0"
            >
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                style={{ background: `${t.accent}1A` }}
              >
                <Icon size={13} style={{ color: t.accent }} />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[8px] tracking-[0.16em] uppercase text-ink-400 truncate">
                  {t.label}
                </div>
                <div className="text-[11px] font-semibold text-ink-900 truncate flex items-center gap-1.5">
                  {t.live && (
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: t.accent }}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    />
                  )}
                  {t.value}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
