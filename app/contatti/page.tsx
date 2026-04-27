'use client'

import { useState } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { SectionNumber } from '@/components/ui/SectionNumber'
import { Card } from '@/components/ui/Card'
import { COMPANY_INFO } from '@/lib/constants'
import { Phone, Mail, MapPin, Send, Check } from 'lucide-react'
import { SUITES } from '@/content/suites'

export default function ContattiPage() {
  const [formData, setFormData] = useState({
    nome: '',
    azienda: '',
    email: '',
    telefono: '',
    suite: '',
    dimensione: '',
    messaggio: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Mock submission - in Run 2 sarà una vera chiamata API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Demo form submission:', formData)
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="pt-24 pb-16 bg-paper min-h-screen">
      <div className="container-custom">
        <SectionNumber number="CONTATTI —" label="Richiedi Demo" />
        
        <Reveal>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">
            Prenota una demo.
            <em className="text-accent-tech not-italic block">Gratuita e personalizzata.</em>
          </h1>
        </Reveal>
        
        <Reveal delay={100}>
          <p className="text-lg text-ink-500 mb-12 max-w-2xl">
            Compila il form per richiedere una demo personalizzata sui tuoi dati. 
            Ti contatteremo entro 24 ore per fissare un appuntamento.
          </p>
        </Reveal>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <Reveal delay={200}>
            {isSubmitted ? (
              <Card className="bg-success/5 border-success/20">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="font-serif text-2xl text-ink mb-2">Grazie!</h3>
                  <p className="text-ink-500">
                    La tua richiesta è stata ricevuta. Ti contatteremo presto.
                  </p>
                </div>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-ink mb-2">
                      Nome e Cognome *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-tech"
                    />
                  </div>
                  <div>
                    <label htmlFor="azienda" className="block text-sm font-medium text-ink mb-2">
                      Azienda *
                    </label>
                    <input
                      type="text"
                      id="azienda"
                      required
                      value={formData.azienda}
                      onChange={(e) => setFormData({ ...formData, azienda: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-tech"
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-tech"
                    />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-ink mb-2">
                      Telefono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-tech"
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="suite" className="block text-sm font-medium text-ink mb-2">
                      Suite di interesse
                    </label>
                    <select
                      id="suite"
                      value={formData.suite}
                      onChange={(e) => setFormData({ ...formData, suite: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-tech"
                    >
                      <option value="">Seleziona una suite</option>
                      {SUITES.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dimensione" className="block text-sm font-medium text-ink mb-2">
                      Dimensione azienda
                    </label>
                    <select
                      id="dimensione"
                      value={formData.dimensione}
                      onChange={(e) => setFormData({ ...formData, dimensione: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-tech"
                    >
                      <option value="">Seleziona</option>
                      <option value="1-10">1-10 dipendenti</option>
                      <option value="11-50">11-50 dipendenti</option>
                      <option value="51-200">51-200 dipendenti</option>
                      <option value="200+">200+ dipendenti</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="messaggio" className="block text-sm font-medium text-ink mb-2">
                    Messaggio
                  </label>
                  <textarea
                    id="messaggio"
                    rows={4}
                    value={formData.messaggio}
                    onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-tech resize-none"
                  />
                </div>
                
                <Button 
                  type="submit"
                  variant="primary" 
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Invio in corso...' : 'Invia richiesta'}
                </Button>
              </form>
            )}
          </Reveal>
          
          {/* Contact info */}
          <Reveal delay={300}>
            <div className="space-y-6">
              <Card>
                <h3 className="font-serif text-xl text-ink mb-4">Contatti diretti</h3>
                <div className="space-y-4">
                  <a 
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="flex items-center gap-3 text-ink-700 hover:text-accent-tech transition-colors"
                  >
                    <div className="w-10 h-10 bg-paper-2 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-accent-tech" />
                    </div>
                    <span>{COMPANY_INFO.phone}</span>
                  </a>
                  <a 
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="flex items-center gap-3 text-ink-700 hover:text-accent-tech transition-colors"
                  >
                    <div className="w-10 h-10 bg-paper-2 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-accent-tech" />
                    </div>
                    <span>{COMPANY_INFO.email}</span>
                  </a>
                  <div className="flex items-start gap-3 text-ink-700">
                    <div className="w-10 h-10 bg-paper-2 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-accent-tech" />
                    </div>
                    <div>
                      <p className="font-medium">Sede legale</p>
                      <p className="text-sm text-ink-400">{COMPANY_INFO.address.legal}</p>
                      <p className="font-medium mt-2">Sede operativa</p>
                      <p className="text-sm text-ink-400">{COMPANY_INFO.address.operational}</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="bg-gradient-to-br from-brand-navy-3 via-brand-navy to-brand-navy-2 text-white border-brand-navy-3">
                <h3 className="font-serif text-xl mb-2 text-pearl-shine">Preferisci una demo immediata?</h3>
                <p className="text-white/75 mb-4">
                  Prova la nostra sandbox interattiva con dati finti ma funzioni reali. 
                  Nessuna registrazione richiesta.
                </p>
                <Button 
                  href="/demo/" 
                  variant="primary"
                  className="bg-accent-tech hover:bg-accent-tech-2"
                >
                  Prova la demo
                </Button>
              </Card>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
