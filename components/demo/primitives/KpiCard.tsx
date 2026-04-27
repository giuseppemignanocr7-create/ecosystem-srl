'use client'

import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from 'lucide-react'

export interface KpiCardProps {
  label: string
  value: number | string
  prefix?: string
  suffix?: string
  delta?: string
  trend?: 'up' | 'down' | 'flat'
  icon?: LucideIcon
  accent?: string
  format?: 'integer' | 'decimal' | 'currency' | 'percent' | 'string'
  decimals?: number
  isDark?: boolean
}

/**
 * Animated KPI card with smooth count-up on mount/inView.
 * Uses framer-motion useInView for trigger-once behavior.
 */
export function KpiCard({
  label,
  value,
  prefix = '',
  suffix = '',
  delta,
  trend = 'flat',
  icon: Icon,
  accent = '#7C3AED',
  format = 'integer',
  decimals = 0,
  isDark = true,
}: KpiCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  const isNumeric = typeof value === 'number'
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState(isNumeric ? '0' : String(value))

  useEffect(() => {
    if (!inView || !isNumeric) return
    const controls = animate(motionValue, value as number, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        setDisplay(formatNumber(v, format, decimals))
      },
    })
    return () => controls.stop()
  }, [inView, isNumeric, value, format, decimals, motionValue])

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor =
    trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-red-500' : isDark ? 'text-white/40' : 'text-ink-400'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative p-4 rounded-xl border overflow-hidden ${
        isDark ? 'border-white/5 bg-white/[0.02]' : 'border-line bg-white'
      }`}
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ background: `radial-gradient(circle at 80% 0%, ${accent}, transparent 60%)` }}
      />

      <div className="relative flex items-start justify-between mb-2">
        <span
          className={`font-mono text-[9px] tracking-[0.16em] uppercase ${
            isDark ? 'text-white/40' : 'text-ink-400'
          }`}
        >
          {label}
        </span>
        {Icon && (
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
            style={{ background: `${accent}1A` }}
          >
            <Icon size={13} style={{ color: accent }} />
          </div>
        )}
      </div>

      <div className="relative font-serif text-2xl tabular-nums" style={{ color: accent }}>
        {prefix}
        {isNumeric ? display : value}
        {suffix}
      </div>

      {delta && (
        <div className={`relative flex items-center gap-1 mt-1 text-[11px] font-mono ${trendColor}`}>
          <TrendIcon size={11} />
          {delta}
        </div>
      )}
    </motion.div>
  )
}

function formatNumber(v: number, format: KpiCardProps['format'], decimals: number): string {
  switch (format) {
    case 'currency':
      return v.toLocaleString('it-IT', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    case 'percent':
      return v.toFixed(decimals)
    case 'decimal':
      return v.toFixed(decimals)
    default:
      return Math.round(v).toLocaleString('it-IT')
  }
}
