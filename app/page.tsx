import { Hero } from '@/components/sections/Hero'
import { TrustStrip } from '@/components/sections/TrustStrip'
import { CoreMindFlagship } from '@/components/sections/CoreMindFlagship'
import { SuiteGrid } from '@/components/sections/SuiteGrid'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { DemoPreview } from '@/components/sections/DemoPreview'
import { Integrations } from '@/components/sections/Integrations'
import { ManifestoQuote } from '@/components/sections/ManifestoQuote'
import { PricingTeaser } from '@/components/sections/PricingTeaser'
import { FAQ } from '@/components/sections/FAQ'
import { CTABand } from '@/components/sections/CTABand'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CoreMindFlagship />
      <SuiteGrid />
      <HowItWorks />
      <DemoPreview />
      <Integrations />
      <ManifestoQuote />
      <PricingTeaser />
      <FAQ />
      <CTABand />
    </>
  )
}
