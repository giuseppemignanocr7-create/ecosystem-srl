'use client'

import { notFound, useParams } from 'next/navigation'
import { BuildSuiteApp } from '@/components/demo/suites/BuildSuiteApp'
import { LegalMindApp } from '@/components/demo/suites/LegalMindApp'
import { FoodSuiteApp } from '@/components/demo/suites/FoodSuiteApp'
import { RetailSuiteApp } from '@/components/demo/suites/RetailSuiteApp'

export default function DemoSuitePage() {
  const params = useParams<{ slug: string }>()
  const slug = params.slug

  switch (slug) {
    case 'buildsuite':
      return <BuildSuiteApp />
    case 'legalmind':
      return <LegalMindApp />
    case 'foodsuite':
      return <FoodSuiteApp />
    case 'retailsuite':
      return <RetailSuiteApp />
    default:
      notFound()
  }
}
