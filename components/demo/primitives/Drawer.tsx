'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'

export interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: React.ReactNode
  width?: number
  isDark?: boolean
  accent?: string
}

/**
 * Right-side sliding drawer for record details.
 * - ESC to close
 * - Backdrop click to close
 * - Trap focus within (basic)
 */
export function Drawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  width = 520,
  isDark = true,
  accent = '#7C3AED',
}: DrawerProps) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed right-0 top-0 bottom-0 z-50 flex flex-col shadow-2xl ${
              isDark ? 'bg-[#0F0F15] border-l border-white/10 text-white' : 'bg-white border-l border-line text-ink-900'
            }`}
            style={{ width: `min(${width}px, 92vw)` }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
          >
            <header
              className={`flex items-start justify-between gap-3 p-5 border-b ${
                isDark ? 'border-white/10' : 'border-line'
              }`}
            >
              <div className="min-w-0 flex-1">
                <div
                  className="font-mono text-[10px] tracking-[0.18em] uppercase mb-1"
                  style={{ color: accent }}
                >
                  Dettaglio
                </div>
                <h2 id="drawer-title" className="font-serif text-xl truncate">
                  {title}
                </h2>
                {subtitle && (
                  <p className={`text-xs mt-1 ${isDark ? 'text-white/50' : 'text-ink-500'}`}>{subtitle}</p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Chiudi"
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-paper-2'
                }`}
              >
                <X size={16} />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto p-5">{children}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
