import { Metadata } from 'next'
import { SuitePageTemplate } from '@/components/templates/SuitePageTemplate'
import { getSuiteBySlug } from '@/content/suites'

export const metadata: Metadata = {
  title: 'RetailSuite · Gestionale per Retail e E-commerce',
  description: 'RetailSuite gestisce POS, e-commerce, magazzino, CRM, loyalty, analytics omnichannel. Multi-store unificata.',
}

export default function RetailSuitePage() {
  const suite = getSuiteBySlug('retailsuite')
  if (!suite) return null
  return <SuitePageTemplate suite={suite} />
}
