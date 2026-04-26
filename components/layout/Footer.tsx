import Link from 'next/link'
import { COMPANY_INFO, NAV_LINKS, SUITE_LINKS } from '@/lib/constants'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'

export function Footer() {
  return (
    <footer className="bg-ink text-white" role="contentinfo">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex mb-6" aria-label="Ecosystem - Home">
              <Logo variant="dark" size={36} />
            </Link>
            <p className="text-ink-300 text-sm mb-6 max-w-sm">
              La piattaforma AI-native multi-verticale per ogni settore. 
              Un unico ecosistema, tredici verticali di specializzazione.
            </p>
            <div className="space-y-3 text-sm">
              <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-2 text-ink-300 hover:text-white transition-colors">
                <Phone className="w-4 h-4" aria-hidden="true" />
                {COMPANY_INFO.phone}
              </a>
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-2 text-ink-300 hover:text-white transition-colors">
                <Mail className="w-4 h-4" aria-hidden="true" />
                {COMPANY_INFO.email}
              </a>
              <div className="flex items-start gap-2 text-ink-300">
                <MapPin className="w-4 h-4 mt-0.5" aria-hidden="true" />
                <span>{COMPANY_INFO.address.legal}</span>
              </div>
            </div>
          </div>

          {/* Suite Links */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent-brass mb-4">Suite</h3>
            <ul className="space-y-2">
              {SUITE_LINKS.slice(0, 7).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Suite Links */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent-brass mb-4">Altre Suite</h3>
            <ul className="space-y-2">
              {SUITE_LINKS.slice(7).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent-brass mb-4">Azienda</h3>
            <ul className="space-y-2">
              <li><Link href="/azienda/" className="text-sm text-ink-300 hover:text-white transition-colors">Chi siamo</Link></li>
              <li><Link href="/piattaforma/" className="text-sm text-ink-300 hover:text-white transition-colors">Piattaforma</Link></li>
              <li><Link href="/integrazioni/" className="text-sm text-ink-300 hover:text-white transition-colors">Integrazioni</Link></li>
              <li><Link href="/supporto/" className="text-sm text-ink-300 hover:text-white transition-colors">Supporto</Link></li>
              <li><Link href="/contatti/" className="text-sm text-ink-300 hover:text-white transition-colors">Contatti</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-ink-2">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-ink-300 text-center md:text-left">
              © {new Date().getFullYear()} {COMPANY_INFO.name} · P.IVA {COMPANY_INFO.piva} · REA {COMPANY_INFO.rea}
            </p>
            <div className="flex items-center gap-6 text-xs text-ink-300">
              <Link href="/privacy/" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/cookie/" className="hover:text-white transition-colors">Cookie Policy</Link>
              <Link href="/terms/" className="hover:text-white transition-colors">Termini di Servizio</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
