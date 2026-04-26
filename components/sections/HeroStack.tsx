'use client'

import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion'
import { Typewriter } from '@/components/motion/Typewriter'
import {
  Brain,
  CheckCircle2,
  Search,
  Bell,
  LayoutGrid,
  Hammer,
  HardHat,
  FileText,
  TrendingUp,
  Plus,
  ShoppingCart,
  Tag,
  CreditCard,
} from 'lucide-react'

export function HeroStack() {
  const container = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const yFront = useTransform(scrollY, [0, 800], [0, -80])
  const yMid = useTransform(scrollY, [0, 800], [0, 40])
  const yBack = useTransform(scrollY, [0, 800], [0, 120])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
    stiffness: 80,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), {
    stiffness: 80,
    damping: 20,
  })

  function handleMouseMove(e: React.MouseEvent) {
    if (!container.current) return
    const rect = container.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <div
      ref={container}
      onMouseMove={handleMouseMove}
      style={{ perspective: 2400 }}
      className="relative w-full h-[420px] sm:h-[520px] lg:h-[640px] overflow-hidden sm:overflow-visible"
    >
      <motion.div
        style={{ y: yBack, rotateX, rotateY }}
        initial={{ opacity: 0, x: -60, rotate: -8 }}
        animate={{ opacity: 0.92, x: 0, rotate: -3 }}
        transition={{ duration: 1.2, ease, delay: 1.4 }}
        className="absolute left-0 bottom-0 w-[280px] lg:w-[420px] z-10"
      >
        <Window>
          <POSContent />
        </Window>
      </motion.div>

      <motion.div
        style={{ y: yMid, rotateX, rotateY }}
        initial={{ opacity: 0, x: 60, rotate: 10 }}
        animate={{ opacity: 1, x: 0, rotate: 2.5 }}
        transition={{ duration: 1.1, ease, delay: 1.2 }}
        className="absolute right-0 top-[180px] lg:top-[260px] w-[300px] lg:w-[440px] z-20"
      >
        <Window dark>
          <CoreMindContent />
        </Window>
      </motion.div>

      <motion.div
        style={{ y: yFront, rotateX, rotateY }}
        initial={{ opacity: 0, y: 60, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: -1.5 }}
        transition={{ duration: 1.3, ease, delay: 1.0 }}
        className="absolute left-[20px] lg:left-[60px] top-0 w-[320px] lg:w-[520px] z-30"
      >
        <Window>
          <BuildSuiteContent />
        </Window>
      </motion.div>
    </div>
  )
}

function Window({
  dark,
  children,
}: {
  dark?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={`rounded-xl overflow-hidden border backdrop-blur-sm ${
        dark ? 'bg-[#0A0A0F] border-white/10' : 'bg-paper border-line-strong'
      }`}
      style={{
        boxShadow:
          '0 40px 80px -20px rgba(11,11,13,0.30), 0 18px 36px -18px rgba(11,11,13,0.18)',
      }}
    >
      {/* macOS chrome */}
      <div
        className={`flex items-center gap-2 px-3 py-2 border-b ${
          dark ? 'bg-white/5 border-white/5' : 'bg-paper-2 border-line'
        }`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <div
          className={`ml-3 flex-1 px-2 py-0.5 rounded text-center text-[9px] font-mono tracking-wider ${
            dark ? 'bg-white/5 text-white/40' : 'bg-paper text-ink-400'
          }`}
        >
          app.ecosystem.org
        </div>
      </div>
      {children}
    </div>
  )
}

/* ---------- BUILDSUITE — fedele al DemoAppTemplate ---------- */
const BUILD_NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'cantieri', label: 'Cantieri', icon: Hammer, badge: '12' },
  { id: 'sicurezza', label: 'Sicurezza', icon: HardHat },
  { id: 'sal', label: 'SAL', icon: FileText, badge: '3' },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
]

function BuildSuiteContent() {
  const [activeNav, setActiveNav] = useState('dashboard')

  // Auto-rotate active nav every 3.5s for "live" effect
  useEffect(() => {
    const ids = BUILD_NAV.map((n) => n.id)
    const t = setInterval(() => {
      setActiveNav((cur) => {
        const i = ids.indexOf(cur)
        return ids[(i + 1) % ids.length]
      })
    }, 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex h-[300px] lg:h-[380px] bg-paper-2">
      {/* SIDEBAR */}
      <aside className="w-[110px] lg:w-[140px] bg-paper border-r border-line flex flex-col shrink-0">
        <div className="p-2.5 border-b border-line">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white text-[9px] font-bold">
              B
            </div>
            <div className="font-serif text-[11px] leading-none">BuildSuite</div>
          </div>
          <div className="font-mono text-[7px] tracking-[0.14em] uppercase text-ink-400 mt-1">
            EDILIZIA
          </div>
        </div>
        <nav className="flex-1 p-1.5 space-y-0.5">
          {BUILD_NAV.map((n) => {
            const Icon = n.icon
            const isActive = activeNav === n.id
            return (
              <motion.div
                key={n.id}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-[10px] cursor-pointer transition-colors ${
                  isActive ? 'bg-cyan-500/10 text-cyan-700' : 'text-ink-500'
                }`}
                animate={isActive ? { x: 1 } : { x: 0 }}
              >
                <Icon size={10} />
                <span className="flex-1 truncate font-medium">{n.label}</span>
                {n.badge && (
                  <span className="font-mono text-[8px] px-1 py-0 rounded bg-paper-2 border border-line">
                    {n.badge}
                  </span>
                )}
              </motion.div>
            )
          })}
        </nav>
        <div className="p-1.5 border-t border-line">
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-gradient-to-r from-brand-violet to-brand-violet-deep text-white text-[9px] font-medium">
            <Brain size={9} />
            CoreMind on
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-7 lg:h-8 flex items-center justify-between px-3 border-b border-line bg-paper">
          <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-paper-2 border border-line text-[9px] text-ink-400 flex-1 max-w-[140px]">
            <Search size={9} />
            <span>Cerca...</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bell size={11} className="text-ink-400" />
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-violet to-brand-violet-deep" />
          </div>
        </header>

        <div className="flex-1 p-2.5 lg:p-3.5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNav}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-between items-baseline mb-2.5">
                <h3 className="font-serif text-sm lg:text-base">
                  {activeNav === 'dashboard' && 'Portfolio attivo'}
                  {activeNav === 'cantieri' && 'Cantieri attivi'}
                  {activeNav === 'sicurezza' && 'Conformità POS'}
                  {activeNav === 'sal' && 'SAL in attesa'}
                  {activeNav === 'analytics' && 'KPI mensili'}
                </h3>
                <motion.span
                  className="font-mono text-[7px] tracking-[0.14em] uppercase text-ink-400 flex items-center gap-1"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="w-1 h-1 rounded-full bg-success" /> live
                </motion.span>
              </div>

              <div className="grid grid-cols-4 gap-1 lg:gap-1.5 mb-2.5">
                <KPI label="Valore" endValue={4.82} prefix="€" suffix="M" decimals={2} delta="↑ 12.4%" />
                <KPI label="SAL" endValue={312} prefix="€" suffix="K" delta="↑ 8.1%" />
                <KPI label="Margine" endValue={18.6} suffix="%" decimals={1} delta="↓ 1.2pp" down />
                <KPI label="Ritardi" endValue={2} suffix="gg" delta="gg medi" />
              </div>

              <div className="border border-line rounded overflow-hidden bg-paper">
                <div className="bg-paper-2 grid grid-cols-[1fr_auto_auto] px-2 py-1 font-mono text-[7px] tracking-[0.14em] uppercase text-ink-400 font-medium">
                  <span>CANTIERE</span>
                  <span className="px-1.5 lg:px-3">AVANZ.</span>
                  <span>STATO</span>
                </div>
                <ProgressRow name="Via Roma 42" target={74} status="IN CORSO" delay={0.6} color="success" />
                <ProgressRow name="Residenza Pineta" target={42} status="IN CORSO" delay={0.9} color="success" />
                <ProgressRow name="Biogas Caserta" target={91} status="REVISIONE" delay={1.2} color="warning" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function KPI({
  label,
  endValue,
  prefix = '',
  suffix = '',
  decimals = 0,
  delta,
  down = false,
}: {
  label: string
  endValue: number
  prefix?: string
  suffix?: string
  decimals?: number
  delta: string
  down?: boolean
}) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const start = Date.now()
    const duration = 1400
    const from = 0
    const id = setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(from + (endValue - from) * eased)
      if (t >= 1) clearInterval(id)
    }, 30)
    return () => clearInterval(id)
  }, [endValue])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 1.6 }}
      className="p-2 lg:p-2.5 border border-line rounded bg-paper"
    >
      <div className="font-mono text-[7px] lg:text-[8px] tracking-[0.14em] uppercase text-ink-400 mb-1">
        {label}
      </div>
      <div className="font-serif text-base lg:text-xl leading-none tabular-nums">
        {prefix}
        {value.toLocaleString('it-IT', {
          maximumFractionDigits: decimals,
          minimumFractionDigits: decimals,
        })}
        {suffix}
      </div>
      <div
        className={`font-mono text-[8px] lg:text-[9px] mt-0.5 ${
          down ? 'text-danger' : 'text-success'
        }`}
      >
        {delta}
      </div>
    </motion.div>
  )
}

function ProgressRow({
  name,
  target,
  status,
  delay,
  color,
}: {
  name: string
  target: number
  status: string
  delay: number
  color: 'success' | 'warning'
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_auto] items-center px-2.5 py-1.5 text-[10px] lg:text-xs border-t border-line">
      <span className="truncate">{name}</span>
      <div className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-4 min-w-[70px]">
        <div className="w-8 lg:w-10 h-1 bg-ink-50 rounded overflow-hidden">
          <motion.div
            className="h-full bg-accent-tech"
            initial={{ width: 0 }}
            animate={{ width: `${target}%` }}
            transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <motion.span
          className="font-mono text-[9px] lg:text-[10px] tabular-nums"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.8 }}
        >
          {target}%
        </motion.span>
      </div>
      <span
        className={`font-mono text-[7px] lg:text-[8px] tracking-wider px-1.5 py-0.5 rounded ${
          color === 'success' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
        }`}
      >
        {status}
      </span>
    </div>
  )
}

/* ---------- COREMIND: typing conversation con loop ---------- */
const COREMIND_PROMPTS = [
  {
    user: "Crea ordine fornitore per i materiali mancanti del cantiere Via Roma.",
    answer: "Fatto. 40 sacchi R32.5, 12 barre Ø16, 3 fusti. Edilizia Marra · €2.847 · 48h.",
  },
  {
    user: "Quali cantieri hanno margine sotto il 10%?",
    answer: "Trovati 3 critici: Biogas Caserta (9.1%), Scuola Sessa (7.2%), Borgo Antico (5.8%).",
  },
  {
    user: "Riepilogo SAL del mese.",
    answer: "3 SAL emessi · €312.450 totali · 2 pagati · 1 in attesa firma DL Carmine.",
  },
]

function CoreMindContent() {
  const [step, setStep] = useState(0)
  const [cycle, setCycle] = useState(0)

  // After answer is fully shown, wait then reset for next prompt
  useEffect(() => {
    if (step === 3) {
      const t = setTimeout(() => {
        setStep(0)
        setCycle((c) => (c + 1) % COREMIND_PROMPTS.length)
      }, 4000)
      return () => clearTimeout(t)
    }
  }, [step])

  const current = COREMIND_PROMPTS[cycle]

  return (
    <div className="relative p-3 lg:p-4 h-[260px] lg:h-[320px] overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-80"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(124,58,237,0.30), transparent 60%), radial-gradient(circle at 80% 80%, rgba(184,147,95,0.18), transparent 60%)',
            'radial-gradient(circle at 70% 20%, rgba(124,58,237,0.28), transparent 60%), radial-gradient(circle at 30% 90%, rgba(184,147,95,0.20), transparent 60%)',
            'radial-gradient(circle at 20% 30%, rgba(124,58,237,0.30), transparent 60%), radial-gradient(circle at 80% 80%, rgba(184,147,95,0.18), transparent 60%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative z-10 flex justify-between items-baseline border-b border-white/10 pb-2 mb-3">
        <div className="flex items-center gap-1.5">
          <Brain size={12} className="text-brand-violet" />
          <div className="font-serif text-base lg:text-lg text-white">CoreMind</div>
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-success ml-1"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </div>
        <div className="font-mono text-[8px] tracking-[0.16em] uppercase text-accent-brass flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-success animate-pulse" />
          MEMORIA AZIENDALE
        </div>
      </div>

      <div className="relative z-10 space-y-2 text-[10px] lg:text-[11px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`cycle-${cycle}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-2"
          >
            {step >= 0 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="font-mono text-[8px] tracking-[0.14em] uppercase text-brand-violet mb-1">
                  GIUSEPPE · ora
                </div>
                <div className="p-2 lg:p-2.5 rounded border border-white/10 bg-white/5 text-white/90 leading-snug">
                  <Typewriter
                    key={`u-${cycle}`}
                    text={current.user}
                    delay={500}
                    speed={22}
                    onComplete={() => setTimeout(() => setStep(1), 400)}
                  />
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="font-mono text-[8px] tracking-[0.14em] uppercase text-accent-brass mb-1">
                  COREMIND · elabora...
                </div>
                <div className="p-2 lg:p-2.5 rounded border border-white/10 bg-white/5 inline-flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-accent-brass"
                      animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
                <TimedTransition onDone={() => setStep(2)} ms={1400} />
              </motion.div>
            )}

            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="font-mono text-[8px] tracking-[0.14em] uppercase text-accent-brass mb-1 flex items-center gap-1.5">
                  <CheckCircle2 size={10} /> COREMIND · ora
                </div>
                <div className="p-2 lg:p-2.5 rounded border border-white/10 bg-white/5 text-white/90 leading-snug">
                  <Typewriter
                    key={`a-${cycle}`}
                    text={current.answer}
                    delay={200}
                    speed={16}
                    onComplete={() => setTimeout(() => setStep(3), 600)}
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function TimedTransition({ onDone, ms }: { onDone: () => void; ms: number }) {
  useEffect(() => {
    const t = setTimeout(onDone, ms)
    return () => clearTimeout(t)
  }, [onDone, ms])
  return null
}

/* ---------- POS RetailSuite con sidebar + scontrino live ---------- */
const POS_NAV = [
  { id: 'pos', label: 'POS', icon: CreditCard, active: true },
  { id: 'sales', label: 'Vendite', icon: ShoppingCart },
  { id: 'promo', label: 'Promo', icon: Tag },
]

const POS_ITEMS = [
  ['Pasta Gragnano IGP', '×2', 4.8],
  ['Olio EVO Coratina', '×1', 12.5],
  ['Parmigiano 24 mesi', '×1', 8.9],
  ['Vino Falanghina', '×2', 19.6],
  ['Pane Altamura', '×1', 3.2],
] as const

function POSContent() {
  const [visibleRows, setVisibleRows] = useState(0)

  // Loop: scrive scontrino, pausa, riavvia
  useEffect(() => {
    if (visibleRows >= POS_ITEMS.length) {
      const reset = setTimeout(() => setVisibleRows(0), 4000)
      return () => clearTimeout(reset)
    }
    const t = setTimeout(() => setVisibleRows((v) => v + 1), 700)
    return () => clearTimeout(t)
  }, [visibleRows])

  const total = POS_ITEMS.slice(0, visibleRows).reduce(
    (s, [, q, p]) => s + (q === '×2' ? 2 * (p as number) : (p as number)),
    0,
  )

  return (
    <div className="flex h-[260px] lg:h-[340px] bg-paper-2">
      {/* mini-sidebar */}
      <aside className="w-[60px] lg:w-[72px] bg-paper border-r border-line flex flex-col items-center py-2 gap-1.5 shrink-0">
        <div className="w-6 h-6 rounded bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white text-[9px] font-bold mb-1">
          R
        </div>
        {POS_NAV.map((n) => {
          const Icon = n.icon
          return (
            <div
              key={n.id}
              className={`w-9 h-9 rounded flex items-center justify-center ${
                n.active ? 'bg-pink-500/10 text-pink-700' : 'text-ink-400'
              }`}
            >
              <Icon size={13} />
            </div>
          )
        })}
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-7 flex items-center justify-between px-2.5 border-b border-line bg-paper">
          <div className="font-mono text-[8px] tracking-[0.16em] uppercase text-ink-700 flex items-center gap-1.5">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-success"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            POS · LIVE
          </div>
          <div className="font-mono text-[8px] text-ink-400">#04821</div>
        </header>

        <div className="flex-1 grid grid-cols-[1fr_auto] gap-2 p-2.5 lg:p-3 min-h-0">
          <div className="overflow-y-auto space-y-1 text-[10px] lg:text-[11px] scrollbar-hide">
            {POS_ITEMS.map(([item, q, p], i) => (
              <AnimatePresence key={i}>
                {visibleRows > i && (
                  <motion.div
                    initial={{ opacity: 0, x: -10, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-between items-center border-b border-line py-1"
                  >
                    <span className="truncate flex-1">{item}</span>
                    <span className="font-mono text-ink-400 shrink-0 ml-2">{q}</span>
                    <span className="font-mono shrink-0 ml-2 tabular-nums">€{(p as number).toFixed(2)}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
            {visibleRows >= POS_ITEMS.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[8px] text-ink-400 italic text-center pt-2"
              >
                ⟳ in attesa nuovo scontrino...
              </motion.div>
            )}
          </div>

          <div className="w-[100px] lg:w-[120px] bg-gradient-to-br from-paper to-paper-2 rounded-lg border border-line p-2 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[7px] tracking-[0.16em] uppercase text-ink-400">
                TOTALE
              </div>
              <motion.div
                key={total}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="font-serif text-2xl lg:text-3xl leading-none mt-1 tabular-nums"
              >
                €{total.toFixed(2)}
              </motion.div>
              <div className="font-mono text-[7px] text-ink-400 mt-1">
                {visibleRows} articoli
              </div>
            </div>
            <motion.button
              type="button"
              animate={
                visibleRows === POS_ITEMS.length
                  ? { scale: [1, 1.04, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 1, repeat: Infinity }}
              className="bg-pink-500 hover:bg-pink-600 text-white text-center py-1.5 rounded text-[9px] font-semibold tracking-wider"
            >
              INCASSA →
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
