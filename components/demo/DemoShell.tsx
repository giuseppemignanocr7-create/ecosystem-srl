'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Sun, Moon, Bell, Search, ArrowLeft, type LucideIcon } from 'lucide-react'

export interface ModuleDef {
  id: string
  label: string
  icon: LucideIcon
  badge?: string | number
  render: (ctx: ShellContext) => React.ReactNode
}

export interface NotificationItem {
  id: string
  title: string
  description: string
  time: string
  type: 'info' | 'warning' | 'critical' | 'success'
  read?: boolean
}

export interface ShellContext {
  isDark: boolean
  accent: string
  setActiveModule: (id: string) => void
}

export interface DemoShellProps {
  brandName: string
  brandTagline: string
  accent: string
  modules: ModuleDef[]
  notifications: NotificationItem[]
  defaultModule?: string
  userInitial?: string
}

export function DemoShell({
  brandName,
  brandTagline,
  accent,
  modules,
  notifications,
  defaultModule,
  userInitial = 'D',
}: DemoShellProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [activeModule, setActiveModule] = useState(defaultModule ?? modules[0]?.id)
  const [search, setSearch] = useState('')
  const [showNotifs, setShowNotifs] = useState(false)
  const [showCmdK, setShowCmdK] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isDark = theme === 'dark'
  const ctx: ShellContext = useMemo(() => ({ isDark, accent, setActiveModule }), [isDark, accent])
  const current = modules.find((m) => m.id === activeModule) ?? modules[0]

  // ⌘K palette
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowCmdK(true)
      }
      if (e.key === 'Escape') {
        setShowCmdK(false)
        setShowNotifs(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const unread = notifications.filter((n) => !n.read).length

  const filteredCmdK = useMemo(() => {
    if (!search.trim()) return modules
    const q = search.toLowerCase()
    return modules.filter((m) => m.label.toLowerCase().includes(q))
  }, [search, modules])

  return (
    <div className={`min-h-screen flex ${isDark ? 'bg-[#0A0A0F] text-white' : 'bg-paper-2 text-ink-900'}`}>
      {/* SIDEBAR */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } fixed lg:static z-40 inset-y-0 left-0 w-64 transition-transform duration-300 ease-out border-r ${
          isDark ? 'border-white/5 bg-[#0F0F15]' : 'border-line bg-white'
        } flex flex-col shrink-0`}
      >
        <div className={`p-5 flex items-center gap-2.5 border-b ${isDark ? 'border-white/5' : 'border-line'}`}>
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}
          >
            {brandName.slice(0, 1)}
          </div>
          <div className="min-w-0">
            <div className="font-serif text-lg leading-none">{brandName}</div>
            <div className={`font-mono text-[9px] tracking-wider uppercase mt-1 ${isDark ? 'text-white/40' : 'text-ink-400'}`}>
              {brandTagline}
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {modules.map((item) => {
            const Icon = item.icon
            const active = activeModule === item.id
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => {
                  setActiveModule(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 text-sm transition-colors ${
                  active
                    ? isDark
                      ? 'bg-white/10 text-white'
                      : 'bg-ink-900/[0.06] text-ink-900'
                    : isDark
                      ? 'text-white/60 hover:bg-white/5'
                      : 'text-ink-500 hover:bg-paper-2'
                }`}
                style={active ? { color: accent } : undefined}
              >
                <Icon size={15} className="shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                      active
                        ? 'text-white'
                        : isDark
                          ? 'bg-white/10'
                          : 'bg-paper-2'
                    }`}
                    style={active ? { background: accent } : undefined}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        <div className={`p-3 border-t ${isDark ? 'border-white/5' : 'border-line'} space-y-2`}>
          <div className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-gradient-to-r from-brand-violet to-brand-violet-deep text-white text-sm font-medium">
            <Brain size={16} />
            CoreMind AI attivo
          </div>
          <Link
            href="/demo"
            className={`flex items-center gap-2 text-xs ${isDark ? 'text-white/50 hover:text-white' : 'text-ink-500 hover:text-ink-900'}`}
          >
            <ArrowLeft size={12} />
            Cambia suite
          </Link>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">
        <header
          className={`h-14 flex items-center gap-3 px-3 lg:px-5 border-b ${
            isDark ? 'border-white/5 bg-[#0F0F15]' : 'border-line bg-white'
          }`}
        >
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className={`lg:hidden w-9 h-9 rounded-lg flex items-center justify-center ${
              isDark ? 'hover:bg-white/10' : 'hover:bg-paper-2'
            }`}
            aria-label="Apri menu"
          >
            <span className="block w-4 h-[2px] bg-current relative">
              <span className="absolute -top-1.5 left-0 right-0 h-[2px] bg-current" />
              <span className="absolute top-1.5 left-0 right-0 h-[2px] bg-current" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowCmdK(true)}
            className={`flex-1 max-w-md flex items-center gap-2 px-3 py-1.5 rounded-lg border text-left ${
              isDark ? 'border-white/10 bg-white/5 hover:bg-white/10' : 'border-line bg-paper-2 hover:bg-paper-3'
            }`}
          >
            <Search size={14} className="opacity-50" />
            <span className={`text-sm flex-1 ${isDark ? 'text-white/40' : 'text-ink-400'}`}>Cerca o vai a...</span>
            <kbd className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${isDark ? 'bg-white/10' : 'bg-white'}`}>⌘K</kbd>
          </button>

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${isDark ? 'hover:bg-white/10' : 'hover:bg-paper-2'}`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifs((v) => !v)}
                className={`relative w-9 h-9 rounded-lg flex items-center justify-center ${isDark ? 'hover:bg-white/10' : 'hover:bg-paper-2'}`}
                aria-label="Notifiche"
              >
                <Bell size={16} />
                {unread > 0 && (
                  <span
                    className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                    style={{ background: accent }}
                  >
                    {unread}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {showNotifs && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute right-0 top-12 w-80 rounded-xl shadow-2xl z-50 border overflow-hidden ${
                      isDark ? 'bg-[#15151D] border-white/10' : 'bg-white border-line'
                    }`}
                  >
                    <div className={`px-4 py-3 border-b font-medium text-sm ${isDark ? 'border-white/5' : 'border-line'}`}>
                      Notifiche · {unread} nuove
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className={`p-6 text-sm text-center ${isDark ? 'text-white/40' : 'text-ink-400'}`}>
                          Nessuna notifica
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            className={`px-4 py-3 border-b text-sm ${
                              isDark ? 'border-white/5 hover:bg-white/[0.03]' : 'border-line hover:bg-paper-2'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <span
                                className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                                style={{
                                  background:
                                    n.type === 'critical'
                                      ? '#EF4444'
                                      : n.type === 'warning'
                                        ? '#F59E0B'
                                        : n.type === 'success'
                                          ? '#10B981'
                                          : accent,
                                }}
                              />
                              <div className="min-w-0">
                                <div className="font-medium">{n.title}</div>
                                <div className={`text-xs mt-0.5 ${isDark ? 'text-white/60' : 'text-ink-500'}`}>{n.description}</div>
                                <div className={`font-mono text-[10px] mt-1 ${isDark ? 'text-white/40' : 'text-ink-400'}`}>{n.time}</div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold"
              style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}
            >
              {userInitial}
            </div>
          </div>
        </header>

        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-medium tracking-wide py-2 px-5 flex items-center justify-between gap-3">
          <span className="truncate">🎯 Modalità Demo — i dati sono di esempio, le funzioni sono reali</span>
          <Link href="/contatti" className="bg-white/20 hover:bg-white/30 px-3 py-0.5 rounded transition-colors shrink-0">
            Demo reale →
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current?.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {current?.render(ctx)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ⌘K Palette */}
      <AnimatePresence>
        {showCmdK && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCmdK(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-32 px-6"
          >
            <motion.div
              initial={{ scale: 0.96, y: -8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: -8 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-xl rounded-xl shadow-2xl overflow-hidden border ${
                isDark ? 'bg-[#15151D] border-white/10 text-white' : 'bg-white border-line text-ink-900'
              }`}
            >
              <div className={`flex items-center gap-3 px-5 py-4 border-b ${isDark ? 'border-white/10' : 'border-line'}`}>
                <Search size={16} className="opacity-50" />
                <input
                  type="text"
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cerca moduli, azioni..."
                  className="flex-1 bg-transparent border-none outline-none placeholder:opacity-50"
                />
                <kbd className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${isDark ? 'bg-white/10' : 'bg-paper-2'}`}>ESC</kbd>
              </div>
              <div className="max-h-80 overflow-y-auto p-2">
                {filteredCmdK.map((m) => {
                  const Icon = m.icon
                  return (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => {
                        setActiveModule(m.id)
                        setShowCmdK(false)
                        setSearch('')
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left ${
                        isDark ? 'hover:bg-white/5' : 'hover:bg-paper-2'
                      }`}
                    >
                      <Icon size={15} style={{ color: accent }} />
                      <span className="flex-1">{m.label}</span>
                      <span className={`font-mono text-[10px] ${isDark ? 'text-white/30' : 'text-ink-400'}`}>↵</span>
                    </button>
                  )
                })}
                {filteredCmdK.length === 0 && (
                  <div className={`p-6 text-center text-sm ${isDark ? 'text-white/40' : 'text-ink-400'}`}>
                    Nessun risultato per &ldquo;{search}&rdquo;
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
