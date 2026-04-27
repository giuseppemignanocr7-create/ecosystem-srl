'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Brain,
  Sun,
  Moon,
  Bell,
  Search,
  Plus,
  Download,
  RefreshCw,
  Filter,
  MoreHorizontal,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { getModulePreset, type ModulePreset } from './module-presets'

export type DemoSuiteConfig = {
  id: 'buildsuite' | 'legalmind' | 'foodsuite' | 'retailsuite'
  name: string
  tagline: string
  accent: string
  sidebar: { id: string; label: string; sublabel?: string }[]
  kpis: { label: string; value: string; delta?: string; trend?: 'up' | 'down' | 'flat' }[]
  quickActions: { label: string; icon: LucideIcon }[]
  table: {
    title: string
    columns: string[]
    rows: (string | number)[][]
  }
  panels: { title: string; content: React.ReactNode }[]
}

export function DemoAppTemplate({ config }: { config: DemoSuiteConfig }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [activeNav, setActiveNav] = useState(config.sidebar[0].id)

  const isDark = theme === 'dark'

  return (
    <div
      className={`min-h-screen ${
        isDark ? 'bg-[#0A0A0F] text-white' : 'bg-paper-2 text-ink-900'
      } flex`}
    >
      {/* SIDEBAR */}
      <aside
        className={`w-60 border-r ${
          isDark ? 'border-white/5 bg-[#0F0F15]' : 'border-line bg-paper'
        } flex flex-col shrink-0`}
      >
        <div
          className={`p-5 flex items-center gap-2.5 border-b ${
            isDark ? 'border-white/5' : 'border-line'
          }`}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: `linear-gradient(135deg, ${config.accent}, ${config.accent}cc)` }}
          >
            {config.name.slice(0, 1)}
          </div>
          <div>
            <div className="font-serif text-lg leading-none">{config.name}</div>
            <div
              className={`font-mono text-[9px] tracking-wider uppercase mt-1 ${
                isDark ? 'text-white/40' : 'text-ink-400'
              }`}
            >
              {config.tagline}
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {config.sidebar.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between text-sm transition-colors ${
                activeNav === item.id
                  ? isDark
                    ? 'bg-white/10 text-white'
                    : 'bg-ink-900/5 text-ink-900'
                  : isDark
                    ? 'text-white/60 hover:bg-white/5'
                    : 'text-ink-500 hover:bg-paper-2'
              }`}
              style={activeNav === item.id ? { color: config.accent } : undefined}
            >
              <span>{item.label}</span>
              {item.sublabel && (
                <span
                  className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                    isDark ? 'bg-white/10' : 'bg-ink-50'
                  }`}
                >
                  {item.sublabel}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className={`p-3 border-t ${isDark ? 'border-white/5' : 'border-line'}`}>
          <div className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-gradient-to-r from-brand-violet to-brand-violet-deep text-white text-sm font-medium">
            <Brain size={16} />
            CoreMind AI attivo
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">
        <header
          className={`h-14 flex items-center justify-between px-5 border-b ${
            isDark ? 'border-white/5 bg-[#0F0F15]' : 'border-line bg-paper'
          }`}
        >
          <div
            className={`flex-1 max-w-md flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
              isDark ? 'border-white/10 bg-white/5' : 'border-line bg-paper-2'
            }`}
          >
            <Search size={14} className="opacity-50" />
            <span className={`text-sm ${isDark ? 'text-white/40' : 'text-ink-400'}`}>Cerca...</span>
            <kbd
              className={`ml-auto font-mono text-[10px] px-1.5 py-0.5 rounded ${
                isDark ? 'bg-white/10' : 'bg-ink-50'
              }`}
            >
              ⌘K
            </kbd>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                isDark ? 'hover:bg-white/10' : 'hover:bg-paper-2'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              type="button"
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                isDark ? 'hover:bg-white/10' : 'hover:bg-paper-2'
              }`}
              aria-label="Notifiche"
            >
              <Bell size={16} />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-violet to-brand-violet-deep flex items-center justify-center text-white text-sm font-semibold">
              D
            </div>
          </div>
        </header>

        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-medium tracking-wide py-2 px-5 flex items-center justify-between">
          <span>🎯 Modalità Demo — i dati non vengono salvati</span>
          <Link
            href="/contatti"
            className="bg-white/20 hover:bg-white/30 px-3 py-0.5 rounded transition-colors"
          >
            Richiedi demo reale →
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          {activeNav === config.sidebar[0].id ? (
            <DashboardView config={config} isDark={isDark} />
          ) : (
            <ModuleView
              suiteId={config.id}
              accent={config.accent}
              isDark={isDark}
              navItem={config.sidebar.find((s) => s.id === activeNav)!}
            />
          )}

          <div className="fixed bottom-6 right-6 lg:right-24 z-20">
            <Link
              href="/contatti"
              className="bg-gradient-to-r from-brand-violet to-brand-violet-deep text-white px-5 py-3 rounded-full text-sm font-medium shadow-2xl hover:shadow-brand-violet/40 transition-shadow flex items-center gap-2"
            >
              Ti piace? Prenota la demo reale →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// ═════════════════════════ DASHBOARD VIEW ═════════════════════════
function DashboardView({
  config,
  isDark,
}: {
  config: DemoSuiteConfig
  isDark: boolean
}) {
  return (
    <>
      <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
        <div>
          <div
            className="font-mono text-xs tracking-[0.2em] uppercase mb-2"
            style={{ color: config.accent }}
          >
            DASHBOARD
          </div>
          <h1 className="font-serif text-3xl lg:text-4xl">Panoramica · {config.name}</h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border ${
              isDark ? 'border-white/10 hover:bg-white/5' : 'border-line hover:bg-paper-2'
            }`}
          >
            <Download size={14} /> Esporta
          </button>
          <button
            type="button"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border ${
              isDark ? 'border-white/10 hover:bg-white/5' : 'border-line hover:bg-paper-2'
            }`}
          >
            <RefreshCw size={14} /> Aggiorna
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-white font-medium"
            style={{ background: config.accent }}
          >
            <Plus size={14} /> Aggiungi
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-8">
        {config.kpis.map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className={`p-4 rounded-xl border ${
              isDark ? 'border-white/5 bg-white/[0.02]' : 'border-line bg-paper'
            }`}
          >
            <div
              className={`font-mono text-[9px] tracking-[0.16em] uppercase mb-2 ${
                isDark ? 'text-white/40' : 'text-ink-400'
              }`}
            >
              {kpi.label}
            </div>
            <div className="font-serif text-2xl mb-1" style={{ color: config.accent }}>
              {kpi.value}
            </div>
            {kpi.delta && (
              <div
                className={`text-[10px] font-mono ${
                  kpi.trend === 'up'
                    ? 'text-success'
                    : kpi.trend === 'down'
                      ? 'text-danger'
                      : isDark
                        ? 'text-white/50'
                        : 'text-ink-500'
                }`}
              >
                {kpi.delta}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mb-8">
        <div
          className={`flex items-center gap-2 mb-3 font-mono text-xs tracking-[0.18em] uppercase ${
            isDark ? 'text-white/50' : 'text-ink-400'
          }`}
        >
          <span style={{ color: config.accent }}>⚡</span> AZIONI RAPIDE
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-2.5">
          {config.quickActions.map((qa, i) => {
            const Icon = qa.icon
            return (
              <button
                type="button"
                key={i}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm transition-colors ${
                  isDark
                    ? 'border-white/5 bg-white/[0.02] hover:bg-white/5'
                    : 'border-line bg-paper hover:bg-paper-2'
                }`}
              >
                <Icon size={16} />
                {qa.label}
              </button>
            )
          })}
        </div>
      </div>

      <DataTableCard
        title={config.table.title}
        columns={config.table.columns}
        rows={config.table.rows}
        isDark={isDark}
      />

      <div className="grid lg:grid-cols-2 gap-4">
        {config.panels.map((panel, i) => (
          <div
            key={i}
            className={`p-5 rounded-xl border ${
              isDark ? 'border-white/5 bg-white/[0.02]' : 'border-line bg-paper'
            }`}
          >
            <h3 className="font-serif text-lg mb-3">{panel.title}</h3>
            {panel.content}
          </div>
        ))}
      </div>
    </>
  )
}

// ═════════════════════════ MODULE VIEW ═════════════════════════
function ModuleView({
  suiteId,
  accent,
  isDark,
  navItem,
}: {
  suiteId: string
  accent: string
  isDark: boolean
  navItem: { id: string; label: string; sublabel?: string }
}) {
  const preset: ModulePreset = getModulePreset(suiteId, navItem.id, navItem.label, navItem.sublabel)

  return (
    <>
      {/* HEADER */}
      <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
        <div>
          <div
            className="font-mono text-xs tracking-[0.2em] uppercase mb-2"
            style={{ color: accent }}
          >
            {navItem.label.toUpperCase()}
          </div>
          <h1 className="font-serif text-3xl lg:text-4xl">{preset.title}</h1>
          {preset.subtitle && (
            <p className={`text-sm mt-2 max-w-2xl ${isDark ? 'text-white/50' : 'text-ink-500'}`}>
              {preset.subtitle}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border ${
              isDark ? 'border-white/10 hover:bg-white/5' : 'border-line hover:bg-paper-2'
            }`}
          >
            <Filter size={14} /> Filtri
          </button>
          <button
            type="button"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border ${
              isDark ? 'border-white/10 hover:bg-white/5' : 'border-line hover:bg-paper-2'
            }`}
          >
            <Download size={14} /> Esporta
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-white font-medium"
            style={{ background: accent }}
          >
            <Plus size={14} /> {preset.primaryAction ?? 'Nuovo'}
          </button>
        </div>
      </div>

      {/* FILTERS */}
      {preset.filters && preset.filters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {preset.filters.map((f, i) => (
            <button
              type="button"
              key={f}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                i === 0
                  ? 'text-white'
                  : isDark
                    ? 'border-white/10 text-white/60 hover:bg-white/5'
                    : 'border-line text-ink-500 hover:bg-paper-2'
              }`}
              style={i === 0 ? { background: accent, borderColor: accent } : undefined}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* STATS */}
      {preset.stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {preset.stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`p-4 rounded-xl border ${
                isDark ? 'border-white/5 bg-white/[0.02]' : 'border-line bg-paper'
              }`}
            >
              <div
                className={`font-mono text-[9px] tracking-[0.16em] uppercase mb-2 ${
                  isDark ? 'text-white/40' : 'text-ink-400'
                }`}
              >
                {s.label}
              </div>
              <div className="font-serif text-2xl" style={{ color: accent }}>
                {s.value}
              </div>
              {s.trend && (
                <div
                  className={`text-[10px] font-mono mt-1 ${
                    s.trend === 'up'
                      ? 'text-success'
                      : s.trend === 'down'
                        ? 'text-danger'
                        : isDark
                          ? 'text-white/50'
                          : 'text-ink-500'
                  }`}
                >
                  {s.trend === 'up' ? '▲' : s.trend === 'down' ? '▼' : '▬'} trend
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* CORE MIND HINT */}
      {preset.coreMindHint && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-6 p-4 rounded-xl border border-brand-violet/30 bg-gradient-to-r from-brand-violet/10 to-brand-violet-deep/5 flex items-start gap-3"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-violet to-brand-violet-deep flex items-center justify-center shrink-0">
            <Sparkles size={16} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-brand-violet mb-1">
              CoreMind suggerisce
            </div>
            <p className={`text-sm ${isDark ? 'text-white/85' : 'text-ink-800'}`}>
              {preset.coreMindHint}
            </p>
          </div>
          <button
            type="button"
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-brand-violet text-white hover:bg-brand-violet-deep transition-colors shrink-0"
          >
            Procedi
          </button>
        </motion.div>
      )}

      {/* TABLE */}
      <DataTableCard
        title={preset.tableTitle}
        columns={preset.columns}
        rows={preset.rows}
        isDark={isDark}
      />
    </>
  )
}

// ═════════════════════════ DATA TABLE CARD ═════════════════════════
function DataTableCard({
  title,
  columns,
  rows,
  isDark,
}: {
  title: string
  columns: string[]
  rows: (string | number)[][]
  isDark: boolean
}) {
  return (
    <div
      className={`rounded-xl border overflow-hidden mb-6 ${
        isDark ? 'border-white/5 bg-white/[0.02]' : 'border-line bg-paper'
      }`}
    >
      <div
        className={`p-4 border-b flex items-center justify-between ${
          isDark ? 'border-white/5' : 'border-line'
        }`}
      >
        <h3 className="font-serif text-lg">{title}</h3>
        <button
          type="button"
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isDark ? 'hover:bg-white/5' : 'hover:bg-paper-2'
          }`}
          aria-label="Altre azioni"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className={isDark ? 'border-b border-white/5' : 'border-b border-line'}>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`text-left px-4 py-2.5 font-mono text-[10px] tracking-[0.16em] uppercase font-medium ${
                    isDark ? 'text-white/40' : 'text-ink-400'
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`${
                  isDark
                    ? 'border-b border-white/5 hover:bg-white/[0.02]'
                    : 'border-b border-line hover:bg-paper-2'
                } transition-colors`}
              >
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
