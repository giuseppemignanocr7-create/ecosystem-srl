import { Metadata } from 'next'
import { SuitePageTemplate } from '@/components/templates/SuitePageTemplate'
import { getSuiteBySlug } from '@/content/suites'

export const metadata: Metadata = {
  title: 'TechSuite · Gestionale per Software House e IT',
  description: 'TechSuite gestisce project management IT, ticketing, time tracking, code review, sprint planning, DevOps dashboard.',
}

export default function TechSuitePage() {
  const suite = getSuiteBySlug('techsuite')
  if (!suite) return null
  return <SuitePageTemplate suite={suite} />
}
