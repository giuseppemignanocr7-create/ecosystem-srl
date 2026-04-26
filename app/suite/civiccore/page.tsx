import { Metadata } from 'next'
import { SuitePageTemplate } from '@/components/templates/SuitePageTemplate'
import { getSuiteBySlug } from '@/content/suites'

export const metadata: Metadata = {
  title: 'CivicCore · Piattaforma per PA, CAF e Patronati',
  description: 'CivicCore gestisce pratiche ISEE, 730, successioni, RED. Sportello digitale cittadino-ente, gestione flussi CAF.',
}

export default function CivicCorePage() {
  const suite = getSuiteBySlug('civiccore')
  if (!suite) return null
  return <SuitePageTemplate suite={suite} />
}
