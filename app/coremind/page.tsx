'use client'

import { useState, useRef, useEffect } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { SectionNumber } from '@/components/ui/SectionNumber'
import { ArrowRight, MessageSquare, Shield, Lock, Eye, FileText, Server, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

const capabilities = [
  { icon: MessageSquare, title: 'Gestione cantieri tramite voce', description: 'Parla con CoreMind mentre sei in cantiere' },
  { icon: FileText, title: 'Generazione documenti legali', description: 'Atti, pareri, ricorsi da template' },
  { icon: Eye, title: 'Query fatturato complesse', description: 'Analisi multidimensionale in linguaggio naturale' },
  { icon: Shield, title: 'Analisi food cost con suggerimenti', description: 'Ottimizzazione menu e margini' },
  { icon: Lock, title: 'Assegnazione task a personale', description: 'Workflow automatici e tracking' },
  { icon: Server, title: 'Export report personalizzati', description: 'PDF, Excel, CSV in un comando' },
  { icon: MessageSquare, title: 'Alert anomalie automatici', description: 'Rilevazione outlier in tempo reale' },
  { icon: FileText, title: 'Onboarding clienti guidato', description: 'Procedura step-by-step automatica' },
  { icon: Eye, title: 'Revisione contratti', description: 'Analisi clausole e rischi' },
  { icon: Shield, title: 'Pianificazione fornitori', description: 'Previsione e ottimizzazione ordini' },
  { icon: Lock, title: 'Diagnostica tecnica IT', description: 'Analisi log e suggerimenti fix' },
  { icon: Server, title: 'Comunicazione clienti automatica', description: 'Email, SMS, WhatsApp integrati' },
]

const suggestions = [
  'Mostrami una query sul fatturato',
  'Genera un contratto NDA',
  'Pianifica un cantiere da 500k€',
  'Analizza il food cost di un menu',
]

export default function CoreMindPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Ciao! Sono CoreMind, l\'assistente AI di Ecosystem. Come posso aiutarti oggi?' },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage = { role: 'user' as const, content }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/coremind-playground/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          sessionId: 'demo-session',
          history: messages.slice(-6),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (errorData.limitReached) {
          setError('Hai raggiunto il limite di 10 messaggi all\'ora. Prenota una demo per continuare.')
        } else {
          setError('CoreMind temporaneamente non disponibile. Riprova tra poco.')
        }
        return
      }

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setError('Errore di connessione. Verifica la tua connessione internet.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend(input)
  }

  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-brand-navy-3 via-brand-navy to-brand-navy-2 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-tech/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-brass/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative z-10">
          <Reveal>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] mb-6 max-w-4xl text-pearl-shine">
              CoreMind.
              <br />
              <em className="text-accent-tech not-italic">L&apos;intelligenza che lavora per te.</em>
            </h1>
          </Reveal>
          
          <Reveal delay={100}>
            <p className="text-lg text-white/75 mb-8 max-w-2xl">
              Non è un chatbot. È un agente AI nativo che comprende la tua azienda, 
              opera sui tuoi dati e coordina azioni complesse attraverso tutto l&apos;ecosistema.
            </p>
          </Reveal>
          
          <Reveal delay={200}>
            <Button 
              href="#playground" 
              variant="primary" 
              size="lg"
              icon={ArrowRight}
              className="bg-accent-tech hover:bg-accent-tech-2"
            >
              Prova subito
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Architecture diagram */}
      <section className="section-padding bg-paper">
        <div className="container-custom">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.05] mb-12 text-center">
              Come funziona
            </h2>
          </Reveal>
          
          <Reveal delay={100}>
            <div className="bg-white rounded-2xl border border-line p-8 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                <div className="flex-1">
                  <div className="w-16 h-16 bg-accent-tech/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <MessageSquare className="w-8 h-8 text-accent-tech" />
                  </div>
                  <p className="font-medium text-ink">Utente</p>
                  <p className="text-xs text-ink-400">Interfaccia naturale</p>
                </div>
                
                <div className="hidden md:block text-ink-300">→</div>
                
                <div className="flex-1">
                  <div className="w-16 h-16 bg-accent-brass/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-8 h-8 text-accent-brass" />
                  </div>
                  <p className="font-medium text-ink">CoreMind Router</p>
                  <p className="text-xs text-ink-400">Intent & context</p>
                </div>
                
                <div className="hidden md:block text-ink-300">→</div>
                
                <div className="flex-1">
                  <div className="w-16 h-16 bg-ink rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Server className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-medium text-ink">AI Engine</p>
                  <p className="text-xs text-ink-400">CoreMind · Memoria Aziendale</p>
                </div>
                
                <div className="hidden md:block text-ink-300">→</div>
                
                <div className="flex-1">
                  <div className="w-16 h-16 bg-accent-tech/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <DatabaseIcon />
                  </div>
                  <p className="font-medium text-ink">Database</p>
                  <p className="text-xs text-ink-400">Cross-module actions</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-padding bg-paper-2">
        <div className="container-custom">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.05] mb-12 text-center">
              12 modi in cui CoreMind <em className="text-accent-tech not-italic">trasforma il lavoro</em>
            </h2>
          </Reveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {capabilities.map((cap, index) => (
              <Reveal key={index} delay={100 + index * 50}>
                <div className="bg-white rounded-xl p-6 border border-line hover:border-accent-tech transition-colors">
                  <cap.icon className="w-8 h-8 text-accent-tech mb-4" />
                  <h3 className="font-medium text-ink mb-2">{cap.title}</h3>
                  <p className="text-sm text-ink-500">{cap.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Playground */}
      <section id="playground" className="section-padding bg-paper">
        <div className="container-custom">
          <SectionNumber number="PLAYGROUND —" label="Prova Live" />
          
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.05] mb-6">
              Tocca con mano.
              <em className="text-accent-tech not-italic block">Parla con CoreMind.</em>
            </h2>
          </Reveal>
          
          <Reveal delay={100}>
            <p className="text-ink-500 mb-8 max-w-xl">
              Questo è un vero endpoint AI con rate limiting. Puoi fare fino a 10 domande all&apos;ora. 
              Prova con una delle suggestion o chiedi quello che vuoi.
            </p>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl border border-line shadow-xl overflow-hidden">
                {/* Chat header */}
                <div className="bg-ink px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-tech rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">CoreMind Playground</p>
                      <p className="text-xs text-ink-300">AI nativa · Demo mode</p>
                    </div>
                  </div>
                  <div className="text-xs text-ink-300">
                    Limit: 10 msg/ora
                  </div>
                </div>
                
                {/* Messages */}
                <div className="h-96 overflow-y-auto p-6 space-y-4 bg-paper-2">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex',
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[85%] rounded-2xl px-4 py-3',
                          msg.role === 'user'
                            ? 'bg-accent-tech text-white rounded-tr-sm'
                            : 'bg-white border border-line rounded-tl-sm'
                        )}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-line rounded-2xl rounded-tl-sm px-4 py-3">
                        <div className="flex items-center gap-2 text-ink-300">
                          <span className="w-2 h-2 bg-accent-tech rounded-full animate-pulse" />
                          <span className="w-2 h-2 bg-accent-tech rounded-full animate-pulse delay-75" />
                          <span className="w-2 h-2 bg-accent-tech rounded-full animate-pulse delay-150" />
                          <span className="ml-1 text-sm">CoreMind sta pensando...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {error && (
                    <div className="bg-danger/10 border border-danger/20 rounded-lg p-3">
                      <p className="text-sm text-danger">{error}</p>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Suggestions */}
                <div className="px-6 py-3 border-t border-line bg-white">
                  <p className="text-xs text-ink-400 mb-2">Prova a chiedere:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSend(suggestion)}
                        disabled={isLoading}
                        className="text-xs bg-paper-2 hover:bg-accent-tech/10 text-ink-600 hover:text-accent-tech px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-line">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Scrivi un messaggio..."
                      disabled={isLoading}
                      className="flex-1 px-4 py-3 bg-paper-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-tech disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="px-4 py-3 bg-accent-tech text-white rounded-lg hover:bg-accent-tech-2 transition-colors disabled:opacity-50"
                      aria-label="Invia messaggio"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Security */}
      <section className="section-padding bg-paper-2">
        <div className="container-custom">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.05] mb-12 text-center">
              Sicurezza & <em className="text-accent-tech not-italic">Privacy by Design</em>
            </h2>
          </Reveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Zero-retention contracts', desc: 'I tuoi dati non trainano i modelli AI' },
              { icon: Lock, title: 'GDPR by design', desc: 'DPO dedicato, privacy impact assessment' },
              { icon: Eye, title: 'AI Act compliant', desc: 'Audit trail completo sulle decisioni AI' },
              { icon: Server, title: 'On-premise option', desc: 'Modelli privati che non escono mai dai tuoi server' },
            ].map((item, index) => (
              <Reveal key={index} delay={100 + index * 100}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <item.icon className="w-8 h-8 text-accent-tech" />
                  </div>
                  <h3 className="font-medium text-ink mb-2">{item.title}</h3>
                  <p className="text-sm text-ink-500">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-brand-navy-3 via-brand-navy to-brand-navy-2 text-white">
        <div className="container-custom text-center">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.05] mb-6 text-pearl-shine">
              Vuoi vedere CoreMind <em className="text-accent-tech not-italic">sui tuoi dati?</em>
            </h2>
          </Reveal>
          
          <Reveal delay={100}>
            <Button 
              href="/contatti/" 
              variant="primary" 
              size="lg"
              icon={ArrowRight}
              className="bg-accent-tech hover:bg-accent-tech-2"
            >
              Richiedi una demo personalizzata
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

function DatabaseIcon() {
  return (
    <svg className="w-8 h-8 text-accent-tech" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  )
}
