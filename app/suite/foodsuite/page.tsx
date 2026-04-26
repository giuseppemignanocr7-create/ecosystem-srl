import { Metadata } from 'next'
import { SuitePageTemplate } from '@/components/templates/SuitePageTemplate'
import { getSuiteBySlug } from '@/content/suites'

export const metadata: Metadata = {
  title: 'FoodSuite · Gestionale per Ristorazione',
  description: 'FoodSuite gestisce ordini fornitori, menu engineering, HACCP digitale, food cost, inventory, analytics sala e cucina.',
}

export default function FoodSuitePage() {
  const suite = getSuiteBySlug('foodsuite')
  if (!suite) return null
  return <SuitePageTemplate suite={suite} />
}
