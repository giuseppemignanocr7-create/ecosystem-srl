'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-br from-brand-navy-3 via-brand-navy to-brand-navy-2 text-white z-50"
      role="dialog"
      aria-label="Informativa cookie"
    >
      <div className="container-custom py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-ink-100">
              Utilizziamo cookie tecnici necessari al funzionamento del sito e cookie analitici 
              per migliorare l&apos;esperienza. Per maggiori informazioni consulta la{' '}
              <a href="/cookie/" className="text-accent-tech hover:underline">Cookie Policy</a>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm text-ink-300 hover:text-white transition-colors"
              aria-label="Rifiuta cookie non necessari"
            >
              Solo tecnici
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm bg-accent-tech text-white rounded-lg hover:bg-accent-tech-2 transition-colors"
              aria-label="Accetta tutti i cookie"
            >
              Accetta tutti
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 text-ink-300 hover:text-white transition-colors"
              aria-label="Chiudi banner cookie"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
