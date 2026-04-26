import { Metadata } from 'next'
import { SuitePageTemplate } from '@/components/templates/SuitePageTemplate'
import { getSuiteBySlug } from '@/content/suites'

export const metadata: Metadata = {
  title: 'BuildSuite · Gestionale per Edilizia e Cantieri',
  description: 'BuildSuite gestisce cantieri, SAL, computi metrici, sicurezza, BIM, cronoprogramma. Direzione lavori assistita da AI.',
}

export default function BuildSuitePage() {
  const suite = getSuiteBySlug('buildsuite')
  if (!suite) return null
  return <SuitePageTemplate suite={suite} />
}
