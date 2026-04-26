'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import {
  Brain,
  X,
  Maximize2,
  Minimize2,
  Volume2,
  MoreHorizontal,
  Paperclip,
  Mic,
  Send,
  ChevronLeft,
} from 'lucide-react'

type Msg = { role: 'user' | 'assistant'; content: string; ts: string }

const DEFAULT_GREETING: Msg = {
  role: 'assistant',
  content: 'Ciao! Sono CoreMind, il tuo assistente AI. Come posso aiutarti oggi?',
  ts: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
}

function getQuickActions(pathname: string): { label: string; prompt: string }[] {
  if (pathname.includes('/buildsuite')) {
    return [
      { label: 'Mostra cantieri', prompt: 'Mostrami i cantieri attivi' },
      { label: 'Crea computo', prompt: 'Genera un computo metrico per villa 200mq' },
      { label: 'Analizza margini', prompt: 'Quali cantieri hanno margine sotto il 10%?' },
    ]
  }
  if (pathname.includes('/legalmind')) {
    return [
      { label: 'Cerca fascicolo', prompt: 'Mostrami i fascicoli con scadenza nei prossimi 7 giorni' },
      { label: 'Analizza contratto', prompt: 'Riassumimi le clausole principali di un contratto NDA' },
      { label: 'Giurisprudenza', prompt: 'Trova sentenze su responsabilità condominiale' },
    ]
  }
  if (pathname.includes('/foodsuite')) {
    return [
      { label: 'Food cost', prompt: 'Analizza il food cost del menu attuale' },
      { label: 'Ordini fornitori', prompt: 'Genera ordine fornitori per la prossima settimana' },
      { label: 'HACCP', prompt: 'Verifica conformità HACCP delle ultime 48 ore' },
    ]
  }
  if (pathname.includes('/coremind')) {
    return [
      { label: 'Esempi', prompt: 'Dammi 5 esempi pratici di uso di CoreMind in azienda' },
      { label: 'Tecnologia', prompt: 'Su quale stack tecnico è costruito CoreMind?' },
      { label: 'Sicurezza', prompt: 'Come gestite la privacy dei dati con CoreMind?' },
    ]
  }
  return [
    { label: 'Cosa fa Ecosystem?', prompt: 'Spiegami in 3 punti cosa fa Ecosystem' },
    { label: 'Quale suite?', prompt: 'Lavoro in edilizia, quale suite mi consigli?' },
    { label: 'Quanto costa?', prompt: 'Quali sono i piani di prezzo disponibili?' },
  ]
}

export function CoreMindFloating() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([DEFAULT_GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const sessionRef = useRef<string>('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    sessionRef.current = `web_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  async function send(text: string) {
    if (!text.trim() || loading) return
    setError(null)
    const userMsg: Msg = {
      role: 'user',
      content: text,
      ts: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = [...messages, userMsg]
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content }))
      const res = await fetch('/api/coremind-playground', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId: sessionRef.current, history }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Errore di rete. Riprova.')
        setLoading(false)
        return
      }
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: data.reply,
          ts: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } catch {
      setError('Connessione fallita. Riprova tra poco.')
    } finally {
      setLoading(false)
    }
  }

  const quickActions = getQuickActions(pathname)

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-brand-violet to-brand-violet-deep shadow-lg shadow-brand-violet/30 hover:shadow-xl hover:shadow-brand-violet/40 flex items-center justify-center text-white transition-[right,shadow] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ right: 'calc(var(--rail-w, 0px) + 1.5rem)' }}
            aria-label="Apri CoreMind AI"
          >
            <Brain size={24} />
            <motion.span
              className="absolute inset-0 rounded-full bg-brand-violet"
              animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              aria-hidden
            />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed z-50 bg-paper border border-line-strong rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
              expanded
                ? 'inset-4 lg:left-12 lg:top-12 lg:bottom-12'
                : 'bottom-6 w-[360px] sm:w-[420px] h-[580px] max-h-[calc(100vh-3rem)]'
            }`}
            style={{
              right: expanded
                ? 'calc(var(--rail-w, 0px) + 1rem)'
                : 'calc(var(--rail-w, 0px) + 1.5rem)',
            }}
            role="dialog"
            aria-label="CoreMind Chat"
          >
            <header className="bg-gradient-to-br from-brand-violet to-brand-violet-deep text-white p-4 flex items-center gap-3">
              <button
                type="button"
                className="hover:bg-white/10 p-1.5 rounded transition-colors"
                aria-label="Menu conversazioni"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Brain size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">CoreMind AI</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 bg-white/20 rounded tracking-wider">
                    v2.0
                  </span>
                </div>
                <span className="text-[11px] opacity-80">Nuova conversazione</span>
              </div>
              <button
                type="button"
                className="hover:bg-white/10 p-1.5 rounded transition-colors"
                aria-label="Audio"
              >
                <Volume2 size={16} />
              </button>
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="hover:bg-white/10 p-1.5 rounded transition-colors"
                aria-label={expanded ? 'Riduci' : 'Espandi'}
              >
                {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button
                type="button"
                className="hover:bg-white/10 p-1.5 rounded transition-colors"
                aria-label="Altre opzioni"
              >
                <MoreHorizontal size={16} />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="hover:bg-white/10 p-1.5 rounded transition-colors"
                aria-label="Chiudi"
              >
                <X size={16} />
              </button>
            </header>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-paper">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {m.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-brand-violet/10 flex items-center justify-center shrink-0">
                      <Brain size={14} className="text-brand-violet" />
                    </div>
                  )}
                  <div className="max-w-[80%]">
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                        m.role === 'user'
                          ? 'bg-brand-navy text-white rounded-tr-sm'
                          : 'bg-ink-50 text-ink-900 rounded-tl-sm'
                      }`}
                    >
                      {m.content}
                    </div>
                    <div className="text-[10px] text-ink-400 mt-1 px-1">{m.ts}</div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-brand-violet/10 flex items-center justify-center">
                    <Brain size={14} className="text-brand-violet" />
                  </div>
                  <div className="px-3.5 py-3 rounded-2xl rounded-tl-sm bg-ink-50">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-brand-violet"
                          animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="text-xs text-danger bg-danger/10 px-3 py-2 rounded-lg">{error}</div>
              )}
            </div>

            <div className="border-t border-line p-3 bg-paper">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  send(input)
                }}
                className="flex items-center gap-2 px-3 py-2 border border-line-strong rounded-full bg-paper-2 focus-within:border-brand-violet transition-colors"
              >
                <button
                  type="button"
                  className="text-ink-400 hover:text-ink-700 transition-colors"
                  aria-label="Allega file"
                >
                  <Paperclip size={16} />
                </button>
                <button
                  type="button"
                  className="text-ink-400 hover:text-ink-700 transition-colors"
                  aria-label="Microfono"
                >
                  <Mic size={16} />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Chiedimi qualsiasi cosa..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-ink-900 placeholder:text-ink-400"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 rounded-full bg-brand-violet text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand-violet-deep transition-colors"
                  aria-label="Invia"
                >
                  <Send size={14} />
                </button>
              </form>

              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {quickActions.map((qa) => (
                  <button
                    key={qa.label}
                    type="button"
                    onClick={() => send(qa.prompt)}
                    disabled={loading}
                    className="text-[11px] px-2.5 py-1.5 rounded-full border border-line bg-paper hover:bg-paper-2 hover:border-brand-violet/40 transition-colors text-ink-700 disabled:opacity-50"
                  >
                    {qa.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
