import { Metadata } from 'next'
import { SuitePageTemplate } from '@/components/templates/SuitePageTemplate'
import { getSuiteBySlug } from '@/content/suites'

export const metadata: Metadata = {
  title: 'Consulente Virtuale · AI per Consulenza Lavoro e Fisco',
  description: 'Consulente Virtuale gestisce paghe, contributi, dichiarazioni, pratiche CdL. AI normativa aggiornata in tempo reale.',
}

export default function ConsulenteVirtualePage() {
  const suite = getSuiteBySlug('consulente-virtuale')
  if (!suite) return null
  return <SuitePageTemplate suite={suite} />
}
