'use client'

import { notFound, useParams } from 'next/navigation'
import { DemoAppTemplate } from '@/components/demo/DemoAppTemplate'
import {
  buildSuiteDemo,
  legalMindDemo,
  foodSuiteDemo,
  retailSuiteDemo,
} from '@/content/demo-suites'

const SUITE_CONFIGS = {
  buildsuite: buildSuiteDemo,
  legalmind: legalMindDemo,
  foodsuite: foodSuiteDemo,
  retailsuite: retailSuiteDemo,
} as const

export default function DemoSuitePage() {
  const params = useParams<{ slug: string }>()
  const config = SUITE_CONFIGS[params.slug as keyof typeof SUITE_CONFIGS]
  if (!config) notFound()
  return <DemoAppTemplate config={config} />
}
