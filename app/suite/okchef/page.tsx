import { Metadata } from 'next'
import { SuitePageTemplate } from '@/components/templates/SuitePageTemplate'
import { getSuiteBySlug } from '@/content/suites'

export const metadata: Metadata = {
  title: 'OK Chef · Piattaforma di Approvvigionamento',
  description: 'OK Chef aggrega 80+ fornitori, ordini smart con AI, gestione magazzino, analytics acquisti per ristoranti.',
}

export default function OKChefPage() {
  const suite = getSuiteBySlug('okchef')
  if (!suite) return null
  return <SuitePageTemplate suite={suite} />
}
