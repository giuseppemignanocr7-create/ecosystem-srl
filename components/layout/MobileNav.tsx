'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight, LayoutGrid, Sparkles, Play, Tag, Building2, Phone, Cpu } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'

const ITEMS = [
  { id:'home', label:'Home', icon:LayoutGrid, href:'/' },
  { id:'suite', label:'Suite', icon:Sparkles, href:'/suite' },
  { id:'platform', label:'Piattaforma', icon:Cpu, href:'/piattaforma' },
  { id:'demo', label:'Demo', icon:Play, href:'/demo' },
  { id:'pricing', label:'Prezzi', icon:Tag, href:'/pricing' },
  { id:'company', label:'Azienda', icon:Building2, href:'/azienda' },
  { id:'contact', label:'Contatti', icon:Phone, href:'/contatti' },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 bg-paper/80 backdrop-blur-xl border-b border-line">
        <Link href="/" aria-label="Ecosystem — Home" className="flex items-center">
          <Logo variant="light" size={100} priority />
        </Link>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-lg bg-paper border border-line flex items-center justify-center text-ink-700 shadow-sm"
          aria-label={open ? 'Chiudi menu' : 'Apri menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-40 bg-gradient-to-br from-brand-navy-3 via-brand-navy to-brand-navy-2 pt-14"
          >
            <nav className="h-full overflow-y-auto px-6 py-8">
              <div className="space-y-1">
                {ITEMS.map((item) => {
                  const Icon = item.icon
                  const isActive = item.href === pathname
                  return (
                    <Link
                      key={item.id}
                      href={item.href!}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                      <ChevronRight size={16} className="ml-auto opacity-50" />
                    </Link>
                  )
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href="/contatti"
                  onClick={() => setOpen(false)}
                  className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-violet to-brand-violet-deep text-white text-center font-semibold text-sm shadow-lg shadow-brand-violet/25"
                >
                  Richiedi una demo →
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
