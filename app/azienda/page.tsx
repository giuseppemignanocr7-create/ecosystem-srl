import { Metadata } from 'next'
import { Reveal } from '@/components/ui/Reveal'
import { SectionNumber } from '@/components/ui/SectionNumber'
import { Card } from '@/components/ui/Card'
import { COMPANY_INFO, TEAM } from '@/lib/constants'
import { Target, Users, Shield, Heart, Award, Building } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Azienda · Chi Siamo',
  description: 'Ecosystem S.R.L. · La piattaforma AI-native multi-verticale Made in Italy. Team, valori, dati societari.',
}

export default function AziendaPage() {
  const team = TEAM

  const values = [
    { icon: Target, title: 'Ingegneria Pura', description: 'Zero compromessi tecnici. Ogni riga di codice è progettata per durare.' },
    { icon: Shield, title: 'Trasparenza', description: 'Prezzi chiari, codice open-core, nessun vendor lock-in.' },
    { icon: Heart, title: 'AI Etica', description: 'Privacy by design, human-in-the-loop, zero bias.' },
    { icon: Building, title: 'Made in Italy', description: 'Sviluppato e ospitato in Italia. Supporto in italiano, nativo.' },
  ]

  return (
    <div className="pt-24 pb-16 bg-paper min-h-screen">
      <div className="container-custom">
        <SectionNumber number="AZIENDA —" label="Chi Siamo" />
        
        <Reveal>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">
            Ecosystem.
            <em className="text-brand-violet not-italic block">Le persone dietro la piattaforma.</em>
          </h1>
        </Reveal>
        
        <Reveal delay={100}>
          <p className="text-lg text-ink-500 mb-12 max-w-2xl">
            Siamo un team di ingegneri e sviluppatori che crede nel software come 
            strumento di trasformazione aziendale. Non vendiamo licenze. 
            Costruiamo partnership.
          </p>
        </Reveal>
        
        {/* Stats */}
        <Reveal delay={200}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <Card className="text-center">
              <p className="font-serif text-4xl text-accent-tech mb-1">{COMPANY_INFO.experienceYears}+</p>
              <p className="text-sm text-ink-400">Anni di esperienza</p>
            </Card>
            <Card className="text-center">
              <p className="font-serif text-4xl text-accent-tech mb-1">{COMPANY_INFO.projectsCount}+</p>
              <p className="text-sm text-ink-400">Progetti completati</p>
            </Card>
            <Card className="text-center">
              <p className="font-serif text-4xl text-accent-tech mb-1">€{COMPANY_INFO.projectsValue}</p>
              <p className="text-sm text-ink-400">Valore gestito</p>
            </Card>
            <Card className="text-center">
              <p className="font-serif text-4xl text-accent-tech mb-1">13</p>
              <p className="text-sm text-ink-400">Suite verticali</p>
            </Card>
          </div>
        </Reveal>
        
        {/* Team */}
        <section className="mb-16">
          <SectionNumber number="01 —" label="Team" />
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl leading-[1.05] mb-8">
              Le persone <em className="text-accent-tech not-italic">dietro al codice</em>
            </h2>
          </Reveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={100 + index * 100}>
                <Card className="text-center h-full">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${member.accent}1A` }}
                  >
                    <span
                      className="font-serif text-2xl"
                      style={{ color: member.accent }}
                    >
                      {member.initials}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-ink-900 mb-1">{member.name}</h3>
                  <p
                    className="font-mono text-[10px] tracking-[0.16em] uppercase mb-3"
                    style={{ color: member.accent }}
                  >
                    {member.role}
                  </p>
                  <p className="text-sm text-ink-500 leading-relaxed">{member.bio}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>
        
        {/* Values */}
        <section className="mb-16">
          <SectionNumber number="02 —" label="Valori" />
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl leading-[1.05] mb-8">
              Ciò che <em className="text-accent-tech not-italic">ci guida</em>
            </h2>
          </Reveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={100 + index * 100}>
                <Card className="h-full">
                  <value.icon className="w-10 h-10 text-accent-tech mb-4" />
                  <h3 className="font-serif text-xl text-ink mb-2">{value.title}</h3>
                  <p className="text-sm text-ink-500">{value.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>
        
        {/* Legal */}
        <section>
          <SectionNumber number="03 —" label="Dati Societari" />
          <Reveal>
            <Card>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-ink-400 mb-1">Ragione Sociale</p>
                  <p className="text-ink">{COMPANY_INFO.name}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-ink-400 mb-1">P.IVA</p>
                  <p className="text-ink">{COMPANY_INFO.piva}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-ink-400 mb-1">REA</p>
                  <p className="text-ink">{COMPANY_INFO.rea}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-ink-400 mb-1">PEC</p>
                  <p className="text-ink">{COMPANY_INFO.pec}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-ink-400 mb-1">Sede Legale</p>
                  <p className="text-ink">{COMPANY_INFO.address.legal}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-ink-400 mb-1">Sede Operativa</p>
                  <p className="text-ink">{COMPANY_INFO.address.operational}</p>
                </div>
              </div>
            </Card>
          </Reveal>
        </section>
      </div>
    </div>
  )
}
