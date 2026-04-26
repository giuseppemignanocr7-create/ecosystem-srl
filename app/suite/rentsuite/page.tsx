import { Metadata } from 'next'
import { SuitePageTemplate } from '@/components/templates/SuitePageTemplate'
import { getSuiteBySlug } from '@/content/suites'

export const metadata: Metadata = {
  title: 'RentSuite · Property Management e Immobiliare',
  description: 'RentSuite gestisce property management, locazioni, condomini, manutenzione predittiva, portale inquilini.',
}

export default function RentSuitePage() {
  const suite = getSuiteBySlug('rentsuite')
  if (!suite) return null
  return <SuitePageTemplate suite={suite} />
}
