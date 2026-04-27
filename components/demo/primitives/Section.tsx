'use client'

import { motion } from 'framer-motion'

export interface SectionProps {
  eyebrow?: string
  title: string
  description?: string
  actions?: React.ReactNode
  accent?: string
  children: React.ReactNode
  isDark?: boolean
}

export function Section({ eyebrow, title, description, actions, accent = '#7C3AED', children, isDark }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-5"
    >
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          {eyebrow && (
            <div
              className="font-mono text-[10px] tracking-[0.2em] uppercase mb-1"
              style={{ color: accent }}
            >
              {eyebrow}
            </div>
          )}
          <h2 className="font-serif text-2xl lg:text-3xl">{title}</h2>
          {description && (
            <p className={`text-sm mt-1 max-w-2xl ${isDark ? 'text-white/60' : 'text-ink-500'}`}>{description}</p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </header>
      {children}
    </motion.section>
  )
}

export function StatChip({
  label,
  value,
  tone = 'neutral',
  isDark = true,
}: {
  label: string
  value: string | number
  tone?: 'neutral' | 'success' | 'warning' | 'danger'
  isDark?: boolean
}) {
  const palette = {
    neutral: isDark ? 'bg-white/5 text-white/70' : 'bg-paper-2 text-ink-700',
    success: 'bg-emerald-500/10 text-emerald-500',
    warning: 'bg-amber-500/10 text-amber-500',
    danger: 'bg-red-500/10 text-red-500',
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono tracking-wide ${palette[tone]}`}
    >
      <span className="opacity-70">{label}</span>
      <span className="font-semibold tabular-nums">{value}</span>
    </span>
  )
}

export function StatusPill({
  status,
  isDark = true,
}: {
  status: 'attivo' | 'in-corso' | 'in corso' | 'completato' | 'in-pausa' | 'in pausa' | 'critico' | 'scaduto' | 'in-revisione' | 'in revisione' | 'confermato' | 'pending' | 'risolto' | 'aperta' | 'chiusa' | string
  isDark?: boolean
}) {
  const norm = status.toLowerCase().replace(/\s+/g, '-')
  const map: Record<string, { color: string; label: string }> = {
    'attivo': { color: '#10B981', label: 'Attivo' },
    'in-corso': { color: '#3B82F6', label: 'In corso' },
    'completato': { color: '#10B981', label: 'Completato' },
    'in-pausa': { color: '#F59E0B', label: 'In pausa' },
    'critico': { color: '#EF4444', label: 'Critico' },
    'scaduto': { color: '#EF4444', label: 'Scaduto' },
    'in-revisione': { color: '#F59E0B', label: 'In revisione' },
    'confermato': { color: '#10B981', label: 'Confermato' },
    'pending': { color: '#F59E0B', label: 'Pending' },
    'risolto': { color: '#10B981', label: 'Risolto' },
    'aperta': { color: '#3B82F6', label: 'Aperta' },
    'chiusa': { color: '#6B7280', label: 'Chiusa' },
  }
  const cfg = map[norm] ?? { color: '#6B7280', label: status }
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium"
      style={{ background: `${cfg.color}1A`, color: cfg.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color }} />
      {cfg.label}
    </span>
  )
}

export function ProgressBar({
  value,
  max = 100,
  accent = '#7C3AED',
  isDark = true,
  showValue = true,
}: {
  value: number
  max?: number
  accent?: string
  isDark?: boolean
  showValue?: boolean
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="flex items-center gap-2 min-w-[100px]">
      <div className={`h-1.5 flex-1 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-paper-2'}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ background: accent }}
        />
      </div>
      {showValue && (
        <span className={`text-xs font-mono tabular-nums ${isDark ? 'text-white/60' : 'text-ink-500'}`}>
          {pct.toFixed(0)}%
        </span>
      )}
    </div>
  )
}
