import { Metadata } from 'next'
import { SuitePageTemplate } from '@/components/templates/SuitePageTemplate'
import { getSuiteBySlug } from '@/content/suites'

export const metadata: Metadata = {
  title: 'DentalSuite · Gestionale per Studi Odontoiatrici',
  description: 'DentalSuite gestisce cartelle cliniche digitali, piani terapeutici, agenda smart, fatturazione elettronica, recall pazienti.',
}

export default function DentalSuitePage() {
  const suite = getSuiteBySlug('dentalsuite')
  if (!suite) return null
  return <SuitePageTemplate suite={suite} />
}
