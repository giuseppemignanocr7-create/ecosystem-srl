import { Metadata } from 'next'
import Link from 'next/link'
import { SUITES } from '@/content/suites'
import { SectionNumber } from '@/components/ui/SectionNumber'
import { Reveal } from '@/components/ui/Reveal'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Building2, Scale, Smile, Utensils, ChefHat, Fish, ShoppingCart, Home, Code2, FileText, Shield, PawPrint, Network, ArrowRight, Plus } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Le Suite · 13 verticali di settore',
  description: 'Scopri le 13 suite verticali di Ecosystem. Ogni suite è costruita con la profondità di un software dedicato.',
}

const suiteIcons: Record<string, React.ElementType> = {
  buildsuite: Building2,
  legalmind: Scale,
  dentalsuite: Smile,
  foodsuite: Utensils,
  okchef: ChefHat,
  fishsuite: Fish,
  retailsuite: ShoppingCart,
  rentsuite: Home,
  techsuite: Code2,
  'consulente-virtuale': FileText,
  civiccore: Shield,
  petverse: PawPrint,
  'archon-os': Network,
}

export default function SuitePage() {
  return (
    <div className="pt-24 pb-16 bg-paper">
      <div className="container-custom">
        <SectionNumber number="02 —" label="Il Portafoglio" />
        
        <Reveal>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] mb-6 max-w-4xl">
            Tredici verticali.
            <br />
            <em className="text-accent-tech not-italic">Un&apos;unica piattaforma.</em>
          </h1>
        </Reveal>
        
        <Reveal delay={100}>
          <p className="text-lg text-ink-500 mb-12 max-w-2xl">
            Ogni suite è costruita con la profondità di un software dedicato. 
            Tutte condividono lo stesso database, la stessa AI, la stessa 
            esperienza utente.
          </p>
        </Reveal>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SUITES.map((suite, index) => {
            const Icon = suiteIcons[suite.id]
            return (
              <Reveal key={suite.id} delay={150 + index * 50}>
                <Link href={`/suite/${suite.id}/`} className="block h-full">
                  <Card className="h-full flex flex-col group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-paper-2 rounded-lg flex items-center justify-center group-hover:bg-accent-tech/10 transition-colors">
                        {Icon && <Icon className="w-6 h-6 text-accent-tech" />}
                      </div>
                      <span className="font-mono text-xs text-ink-300">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <Badge variant="brass" className="mb-3 w-fit">{suite.tag.split('·')[0].trim()}</Badge>
                    <h2 className="font-serif text-xl text-ink mb-2">{suite.name}</h2>
                    <p className="text-sm text-ink-500 leading-relaxed flex-grow">{suite.description}</p>
                    <div className="mt-4 pt-4 border-t border-line">
                      <span className="text-accent-tech text-sm font-medium flex items-center gap-1 group-hover:underline">
                        Scopri {suite.name} <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </Reveal>
            )
          })}
          
          {/* Custom suite card */}
          <Reveal delay={150 + SUITES.length * 50}>
            <Link href="/contatti/" className="block h-full">
              <Card className="h-full flex flex-col justify-center items-center text-center bg-ink text-white border-ink group hover:border-accent-brass">
                <div className="w-16 h-16 bg-accent-brass/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-brass/30 transition-colors">
                  <Plus className="w-8 h-8 text-accent-brass" />
                </div>
                <h2 className="font-serif text-xl text-white mb-2">Il tuo settore</h2>
                <p className="text-sm text-ink-300 mb-4">
                  Non c&apos;è il tuo verticale?<br />
                  Lo costruiamo su misura.
                </p>
                <span className="text-accent-brass text-sm font-medium group-hover:underline">
                  Parliamone →
                </span>
              </Card>
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
