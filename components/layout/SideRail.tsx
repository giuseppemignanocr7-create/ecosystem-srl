'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutGrid,
  Sparkles,
  Play,
  Tag,
  Building2,
  Phone,
  Search,
  ChevronRight,
  ChevronDown,
  Menu,
  Cpu,
  type LucideIcon,
} from 'lucide-react'
import { Logo } from '@/components/ui/Logo'

type SubItem = { label: string; href: string; description?: string }
type RailItem = {
  id: string
  label: string
  icon: LucideIcon
  href?: string
  submenu?: SubItem[]
}

const ITEMS: RailItem[] = [
  { id: 'home', label: 'Home', icon: LayoutGrid, href: '/' },
  {
    id: 'suite',
    label: 'Suite',
    icon: Sparkles,
    submenu: [
      { label: 'BuildSuite', href: '/suite/buildsuite', description: 'Edilizia & Cantieri' },
      { label: 'LegalMind', href: '/suite/legalmind', description: 'Studi Legali' },
      { label: 'DentalSuite', href: '/suite/dentalsuite', description: 'Odontoiatria' },
      { label: 'FoodSuite', href: '/suite/foodsuite', description: 'Ristorazione' },
      { label: 'OK Chef', href: '/suite/okchef', description: 'Approvvigionamento HoReCa' },
      { label: 'FishSuite', href: '/suite/fishsuite', description: 'Settore Ittico' },
      { label: 'RetailSuite', href: '/suite/retailsuite', description: 'Retail & E-commerce' },
      { label: 'RentSuite', href: '/suite/rentsuite', description: 'Property Management' },
      { label: 'TechSuite', href: '/suite/techsuite', description: 'Software House' },
      { label: 'Consulente Virtuale', href: '/suite/consulente-virtuale', description: 'Lavoro' },
      { label: 'CivicCore', href: '/suite/civiccore', description: 'PA & CAF' },
      { label: 'PetVerse', href: '/suite/petverse', description: 'Veterinaria' },
      { label: 'Archon OS', href: '/suite/archon-os', description: 'Multi-entity' },
      { label: 'Tutte le suite →', href: '/suite' },
    ],
  },
  {
    id: 'platform',
    label: 'Piattaforma',
    icon: Cpu,
    submenu: [
      { label: 'CoreMind', href: '/coremind', description: "L'intelligenza dell'ecosistema" },
      { label: 'Architettura', href: '/piattaforma', description: 'Stack & sicurezza' },
      { label: 'Integrazioni', href: '/integrazioni', description: '200+ connettori' },
      { label: 'Supporto', href: '/supporto', description: '24/7 + SLA' },
    ],
  },
  { id: 'demo', label: 'Demo', icon: Play, href: '/demo' },
  { id: 'pricing', label: 'Prezzi', icon: Tag, href: '/pricing' },
  { id: 'company', label: 'Azienda', icon: Building2, href: '/azienda' },
  { id: 'contact', label: 'Contatti', icon: Phone, href: '/contatti' },
]

export function SideRail() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  // Persist collapsed pref + expose width via CSS variable so layout auto-adjusts
  useEffect(() => {
    const saved = localStorage.getItem('rail-collapsed')
    if (saved === '1') setCollapsed(true)
  }, [])

  useEffect(() => {
    function applyVar() {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        document.documentElement.style.setProperty('--rail-w', collapsed ? '72px' : '288px')
      } else {
        document.documentElement.style.setProperty('--rail-w', '0px')
      }
    }
    applyVar()
    window.addEventListener('resize', applyVar)
    localStorage.setItem('rail-collapsed', collapsed ? '1' : '0')
    return () => window.removeEventListener('resize', applyVar)
  }, [collapsed])

  useEffect(() => {
    setExpandedId(null)
  }, [pathname])

  // Auto-close submenu when collapsing
  useEffect(() => {
    if (collapsed) setExpandedId(null)
  }, [collapsed])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setExpandedId(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* DESKTOP RAIL — ESPANSO */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 288 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex fixed top-0 right-0 bottom-0 z-40 flex-col bg-paper/90 backdrop-blur-xl border-l border-line overflow-hidden"
        aria-label="Navigazione principale"
      >
        {/* Collapse toggle - big blue pulsing hamburger */}
        <motion.button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className={`absolute top-4 w-12 h-12 rounded-xl flex items-center justify-center z-10 shadow-lg shadow-brand-violet/30 ${
            collapsed ? 'left-1/2 -translate-x-1/2' : 'right-4'
          }`}
          style={{
            background: 'linear-gradient(135deg, #3B5FE8 0%, #1A2750 100%)',
          }}
          aria-label={collapsed ? 'Espandi menu' : 'Riduci menu'}
          animate={{
            boxShadow: [
              '0 4px 14px 0 rgba(59,95,232,0.35)',
              '0 4px 24px 4px rgba(59,95,232,0.55)',
              '0 4px 14px 0 rgba(59,95,232,0.35)',
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu size={22} style={{ color: '#E8EBF2', strokeWidth: 2.4 }} />
        </motion.button>

        {!collapsed && (
          <div className="mt-20" aria-hidden />
        )}

        {collapsed && <div className="mt-20" aria-hidden />}

        <nav className={`flex-1 overflow-y-auto ${collapsed ? 'px-2' : 'px-3'}`}>
          {ITEMS.map((item, idx) => {
            const Icon = item.icon
            const isActive =
              item.href === pathname ||
              (item.submenu?.some((s) => s.href === pathname) ?? false)
            const isExpanded = expandedId === item.id
            // Alternating colors for collapsed state: blue / pearl
            const isBlue = idx % 2 === 0
            const collapsedIconColor = isBlue ? '#3B5FE8' : '#A8B0BD'

            if (item.href) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all mb-0.5 ${
                    collapsed ? 'justify-center' : ''
                  } ${
                    isActive
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'text-ink-700 hover:bg-paper-2'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  {collapsed && !isActive ? (
                    <motion.span
                      className="shrink-0 inline-flex"
                      animate={{ scale: [1, 1.12, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.18 }}
                    >
                      <Icon size={20} style={{ color: collapsedIconColor, strokeWidth: 2 }} />
                    </motion.span>
                  ) : (
                    <Icon size={collapsed ? 20 : 18} className="shrink-0" />
                  )}
                  {!collapsed && (
                    <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                  )}
                  {collapsed && (
                    <span className="absolute right-full mr-3 px-2 py-1 bg-ink-900 text-white text-xs font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                      {item.label}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="railActiveGlow"
                      className="absolute inset-0 rounded-lg ring-1 ring-brand-violet/40 pointer-events-none"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </Link>
              )
            }

            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    if (collapsed) {
                      setCollapsed(false)
                      setTimeout(() => setExpandedId(item.id), 200)
                    } else {
                      setExpandedId(isExpanded ? null : item.id)
                    }
                  }}
                  className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all mb-0.5 ${
                    collapsed ? 'justify-center' : ''
                  } ${
                    isActive || isExpanded
                      ? 'bg-brand-navy text-white'
                      : 'text-ink-700 hover:bg-paper-2'
                  }`}
                  aria-expanded={isExpanded}
                  title={collapsed ? item.label : undefined}
                >
                  {collapsed && !(isActive || isExpanded) ? (
                    <motion.span
                      className="shrink-0 inline-flex"
                      animate={{ scale: [1, 1.12, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.18 }}
                    >
                      <Icon size={20} style={{ color: collapsedIconColor, strokeWidth: 2 }} />
                    </motion.span>
                  ) : (
                    <Icon size={collapsed ? 20 : 18} className="shrink-0" />
                  )}
                  {!collapsed && (
                    <>
                      <span className="text-sm font-medium flex-1 text-left whitespace-nowrap">{item.label}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </>
                  )}
                  {collapsed && (
                    <span className="absolute right-full mr-3 px-2 py-1 bg-ink-900 text-white text-xs font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                      {item.label}
                    </span>
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && !collapsed && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pr-1 py-1 space-y-0.5">
                        {item.submenu?.map((s, idx) => (
                          <motion.li
                            key={s.href}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.025, duration: 0.3 }}
                          >
                            <Link
                              href={s.href}
                              className="group block px-3 py-1.5 rounded text-[13px] text-ink-500 hover:text-ink-900 hover:bg-paper-2 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{s.label}</span>
                                <ChevronRight
                                  size={11}
                                  className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all"
                                />
                              </div>
                              {s.description && (
                                <div className="text-[10px] text-ink-400 mt-0.5 group-hover:text-ink-500">
                                  {s.description}
                                </div>
                              )}
                            </Link>
                          </motion.li>
                        ))}
                      </div>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </nav>

        <div className={`border-t border-line space-y-2 ${collapsed ? 'p-2' : 'p-3'}`}>
          {!collapsed && (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg border border-line bg-paper-2 hover:bg-paper-3 transition-colors text-ink-500"
            >
              <Search size={14} />
              <span className="text-xs flex-1 text-left">Cerca...</span>
              <kbd className="font-mono text-[10px] px-1 py-0.5 bg-paper border border-line rounded">
                ⌘K
              </kbd>
            </button>
          )}
          {collapsed && (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center justify-center w-12 h-12 rounded-lg hover:bg-paper-2 text-ink-500 transition-colors"
              aria-label="Cerca"
              title="Cerca"
            >
              <Search size={16} />
            </button>
          )}

          <Link
            href="/contatti"
            className={`group relative block ${collapsed ? 'px-2 py-3' : 'px-4 py-3'} rounded-lg bg-gradient-to-br from-brand-violet via-brand-violet to-brand-violet-deep text-white text-sm font-semibold text-center overflow-hidden`}
            title={collapsed ? 'Richiedi demo' : undefined}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              aria-hidden
            />
            <span className="relative">{collapsed ? '→' : 'Richiedi demo →'}</span>
          </Link>
        </div>
      </motion.aside>

      <AnimatePresence>
        {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

function SearchModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-ink-900/80 backdrop-blur-sm flex items-start justify-center pt-32 px-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        className="w-full max-w-xl bg-paper border border-line-strong rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-line">
          <Search size={18} className="text-ink-400" />
          <input
            type="text"
            autoFocus
            placeholder="Cerca pagine, suite, funzionalità..."
            className="flex-1 bg-transparent border-none outline-none text-ink-900 placeholder:text-ink-300"
          />
          <kbd className="font-mono text-[10px] px-1.5 py-0.5 border border-line rounded">ESC</kbd>
        </div>
        <div className="p-5 text-sm text-ink-500">
          <p className="font-mono text-xs tracking-[0.18em] uppercase text-ink-400 mb-3">
            SUGGERIMENTI
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/coremind" className="hover:text-ink-900" onClick={onClose}>
                CoreMind — l&apos;intelligenza dell&apos;ecosistema
              </Link>
            </li>
            <li>
              <Link href="/demo" className="hover:text-ink-900" onClick={onClose}>
                Demo interattiva — provala adesso
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-ink-900" onClick={onClose}>
                Prezzi — calcolatore ROI
              </Link>
            </li>
            <li>
              <Link href="/suite" className="hover:text-ink-900" onClick={onClose}>
                Tutte le 13 suite
              </Link>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}
