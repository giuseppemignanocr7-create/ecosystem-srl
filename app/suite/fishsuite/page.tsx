import { Metadata } from 'next'
import { SuitePageTemplate } from '@/components/templates/SuitePageTemplate'
import { getSuiteBySlug } from '@/content/suites'

export const metadata: Metadata = {
  title: 'FishSuite · Gestionale per Settore Ittico',
  description: 'FishSuite gestisce tracciabilità CE, catena del freddo IoT, flotta pescherecci, HACCP mare, analytics filiera.',
}

export default function FishSuitePage() {
  const suite = getSuiteBySlug('fishsuite')
  if (!suite) return null
  return <SuitePageTemplate suite={suite} />
}
