import { Metadata } from 'next'
import { SuitePageTemplate } from '@/components/templates/SuitePageTemplate'
import { getSuiteBySlug } from '@/content/suites'

export const metadata: Metadata = {
  title: 'PetVerse · Gestionale per Veterinaria e Petcare',
  description: 'PetVerse gestisce cartelle cliniche veterinarie, agenda, vaccini, anagrafe canina, e-commerce petshop, telemedicina.',
}

export default function PetVersePage() {
  const suite = getSuiteBySlug('petverse')
  if (!suite) return null
  return <SuitePageTemplate suite={suite} />
}
