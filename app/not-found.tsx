import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="font-serif text-8xl text-brand-violet mb-4">404</h1>
        <h2 className="font-serif text-3xl text-ink-900 mb-4">Pagina non trovata</h2>
        <p className="text-ink-500 mb-8">
          La pagina che stai cercando non esiste o è stata spostata.
          Torna alla homepage o esplora le nostre suite.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-brand-navy text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-navy-2 transition-colors"
          >
            ← Torna alla home
          </Link>
          <Link
            href="/suite"
            className="inline-flex items-center justify-center border border-line-strong px-6 py-3 rounded-lg font-medium hover:bg-paper-2 transition-colors"
          >
            Esplora le suite
          </Link>
        </div>
      </div>
    </div>
  )
}
