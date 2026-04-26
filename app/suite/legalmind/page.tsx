import { Metadata } from 'next'
import { SuitePageTemplate } from '@/components/templates/SuitePageTemplate'
import { getSuiteBySlug } from '@/content/suites'

export const metadata: Metadata = {
  title: 'LegalMind · Software per Studi Legali',
  description: 'LegalMind gestisce fascicoli, scadenzario PCT, parcellazione, PEC AI, analisi documentale semantica per studi legali.',
}

export default function LegalMindPage() {
  const suite = getSuiteBySlug('legalmind')
  if (!suite) return null
  return <SuitePageTemplate suite={suite} />
}
