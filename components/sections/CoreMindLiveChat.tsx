'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare } from 'lucide-react'
import { Typewriter } from '@/components/motion/Typewriter'

type Step =
  | { kind: 'user'; text: string; ts: string; speed?: number }
  | { kind: 'thinking'; ms: number }
  | { kind: 'assistant'; lines: string[]; ts: string; speed?: number }

const SCRIPT: Step[] = [
  {
    kind: 'user',
    text: "Crea l'ordine fornitore per i materiali mancanti nel cantiere di Via Roma e avvisa il capocantiere.",
    ts: '14:32',
    speed: 22,
  },
  { kind: 'thinking', ms: 1400 },
  {
    kind: 'assistant',
    ts: '14:32',
    lines: [
      'Fatto. Ho incrociato il computo metrico con il magazzino: mancano 40 sacchi di cemento R32.5, 12 barre Ø16 da 12m, 3 fusti di additivo fluidificante.',
      'Ordine generato verso Edilizia Marra (fornitore abituale, consegna 48h) per €2.847. Notifica inviata a Carmine. Budget residuo cantiere: €12.180.',
    ],
    speed: 14,
  },
  {
    kind: 'user',
    text: 'Quali cantieri hanno margine sotto il 10% e scadenza entro 60 giorni?',
    ts: '14:33',
    speed: 22,
  },
  { kind: 'thinking', ms: 1100 },
  {
    kind: 'assistant',
    ts: '14:33',
    lines: [
      'Trovati 3 cantieri critici: Biogas Caserta (margine 9.1%, scade 15/06), Ampliamento Scuola Sessa (7.2%, 10/06), Recupero Borgo Antico (5.8%, 22/06).',
      'Esposizione totale: €1.84M. Vuoi che generi un piano di recupero marginalità con leve operative per ciascuno?',
    ],
    speed: 14,
  },
]

export function CoreMindLiveChat() {
  const [step, setStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new step
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [step, completedSteps])

  // Loop after script completes
  useEffect(() => {
    if (step >= SCRIPT.length) {
      const t = setTimeout(() => {
        setCompletedSteps([])
        setStep(0)
      }, 6000)
      return () => clearTimeout(t)
    }
  }, [step])

  function advance(idx: number) {
    setCompletedSteps((c) => (c.includes(idx) ? c : [...c, idx]))
    setStep((s) => Math.max(s, idx + 1))
  }

  return (
    <div className="bg-ink-2 rounded-2xl border border-white/5 overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-gradient-to-r from-ink-2 to-[#1a1a24]">
        <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-brand-violet to-brand-violet-deep flex items-center justify-center shrink-0">
          <MessageSquare className="w-5 h-5 text-white" />
          <motion.span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-ink-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-medium text-white">CoreMind</p>
            <span className="font-mono text-[9px] tracking-wider px-1.5 py-0.5 rounded bg-brand-violet/20 text-brand-violet">
              AI NATIVA
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-ink-300">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-success"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Online · live demo
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="p-5 space-y-4 min-h-[420px] max-h-[520px] overflow-y-auto">
        {SCRIPT.slice(0, step + 1).map((s, idx) => {
          const isCurrent = idx === step
          const isCompleted = completedSteps.includes(idx)

          if (s.kind === 'user') {
            return (
              <motion.div
                key={`u-${idx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-end"
              >
                <div className="bg-brand-violet/20 border border-brand-violet/30 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
                  <p className="text-sm text-white leading-relaxed">
                    {isCurrent && !isCompleted ? (
                      <Typewriter
                        text={s.text}
                        speed={s.speed ?? 22}
                        delay={150}
                        onComplete={() => advance(idx)}
                      />
                    ) : (
                      s.text
                    )}
                  </p>
                  <p className="text-[10px] text-ink-300 mt-1.5 font-mono tracking-wider">
                    GIUSEPPE · {s.ts}
                  </p>
                </div>
              </motion.div>
            )
          }

          if (s.kind === 'thinking') {
            if (!isCurrent) return null
            return (
              <motion.div
                key={`t-${idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-ink-300 text-sm pl-1"
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-2 h-2 rounded-full bg-brand-violet"
                    animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
                <span className="ml-1.5 italic">CoreMind sta pensando...</span>
                <DelayAdvance ms={s.ms} onDone={() => advance(idx)} />
              </motion.div>
            )
          }

          // assistant
          return (
            <motion.div
              key={`a-${idx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-start"
            >
              <div className="bg-ink rounded-2xl rounded-tl-sm px-4 py-3 max-w-[92%] border border-white/5">
                <p className="text-[10px] font-mono tracking-wider text-brand-violet mb-2">
                  COREMIND · {s.ts}
                </p>
                {(isCurrent && !isCompleted) ? (
                  <SequentialLines lines={s.lines} speed={s.speed ?? 14} onAllDone={() => advance(idx)} />
                ) : (
                  <div className="space-y-2">
                    {s.lines.map((l, i) => (
                      <p key={i} className="text-sm text-ink-100 leading-relaxed">
                        {highlightTokens(l)}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}

        {/* Looping cursor while idle between cycles */}
        <AnimatePresence>
          {step >= SCRIPT.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="text-center text-[10px] font-mono text-ink-400 tracking-wider pt-2"
            >
              ↻ Riavvio demo tra qualche secondo...
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function SequentialLines({
  lines,
  speed,
  onAllDone,
}: {
  lines: string[]
  speed: number
  onAllDone: () => void
}) {
  const [active, setActive] = useState(0)
  return (
    <div className="space-y-2">
      {lines.map((l, i) => {
        if (i > active) return null
        const isLast = i === lines.length - 1
        const isActive = i === active
        return (
          <p key={i} className="text-sm text-ink-100 leading-relaxed">
            {isActive ? (
              <Typewriter
                text={l}
                speed={speed}
                delay={i === 0 ? 200 : 100}
                onComplete={() => {
                  if (isLast) onAllDone()
                  else setActive(i + 1)
                }}
              />
            ) : (
              highlightTokens(l)
            )}
          </p>
        )
      })}
    </div>
  )
}

function highlightTokens(text: string) {
  // highlight monetary, supplier, and percentage tokens with subtle color
  const parts: React.ReactNode[] = []
  const regex = /(€[\d.,]+(?:K|M)?|\d+%|Edilizia Marra|Biogas Caserta|R32\.5|Ø16|Carmine)/g
  let lastIdx = 0
  let match: RegExpExecArray | null
  let i = 0
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) parts.push(text.slice(lastIdx, match.index))
    const token = match[0]
    const isMoney = token.startsWith('€')
    const isPct = token.endsWith('%')
    parts.push(
      <span
        key={i++}
        className={
          isMoney
            ? 'text-accent-brass font-medium'
            : isPct
              ? 'text-accent-tech font-medium'
              : 'text-brand-violet'
        }
      >
        {token}
      </span>,
    )
    lastIdx = regex.lastIndex
  }
  if (lastIdx < text.length) parts.push(text.slice(lastIdx))
  return parts
}

function DelayAdvance({ ms, onDone }: { ms: number; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, ms)
    return () => clearTimeout(t)
  }, [ms, onDone])
  return null
}
