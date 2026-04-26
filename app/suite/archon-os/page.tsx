import { Metadata } from 'next'
import { SuitePageTemplate } from '@/components/templates/SuitePageTemplate'
import { getSuiteBySlug } from '@/content/suites'

export const metadata: Metadata = {
  title: 'Archon OS · Business OS per Multi-Entity',
  description: 'Archon OS è il layer di orchestrazione per aziende multi-società. Dashboard esecutiva, consolidato, governance centralizzata.',
}

export default function ArchonOSPage() {
  const suite = getSuiteBySlug('archon-os')
  if (!suite) return null
  return <SuitePageTemplate suite={suite} />
}
