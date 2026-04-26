import { Metadata } from 'next'
import { Reveal } from '@/components/ui/Reveal'
import { SectionNumber } from '@/components/ui/SectionNumber'
import { Card } from '@/components/ui/Card'
import { Server, Database, Shield, Lock, Globe, Cpu } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Piattaforma · Architettura Tecnica',
  description: 'Stack tecnico, sicurezza, compliance, SLA. PostgreSQL, Redis, Kubernetes. GDPR, AI Act, ISO 27001. Data center italiani.',
}

export default function PiattaformaPage() {
  const stack = [
    { icon: Server, name: 'Next.js 14', desc: 'Frontend React con App Router' },
    { icon: Database, name: 'PostgreSQL', desc: 'Database principale con pgvector' },
    { icon: Cpu, name: 'Redis', desc: 'Cache e session management' },
    { icon: Server, name: 'Kubernetes', desc: 'Orchestrazione container' },
  ]

  const security = [
    { icon: Shield, title: 'Crittografia', desc: 'AES-256 at-rest, TLS 1.3 in-transit' },
    { icon: Lock, title: 'Autenticazione', desc: 'SSO SAML/OIDC, MFA, RBAC' },
    { icon: Database, title: 'Backup', desc: 'Hourly automated, 30 giorni retention' },
    { icon: Globe, title: 'Data Residency', desc: 'Esclusivamente data center italiani' },
  ]

  const compliance = [
    { name: 'GDPR', status: 'Compliant', desc: 'DPO, DPIA, registrazione autorità' },
    { name: 'AI Act', status: 'Ready', desc: 'Human oversight, audit trail' },
    { name: 'ISO 27001', status: 'In corso', desc: 'Certificazione prevista Q3 2024' },
    { name: 'ISO 22301', status: 'Pianificato', desc: 'Business continuity' },
  ]

  return (
    <div className="pt-24 pb-16 bg-paper min-h-screen">
      <div className="container-custom">
        <SectionNumber number="PIATTAFORMA —" label="Tecnologia" />
        
        <Reveal>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">
            Architettura.
            <em className="text-accent-tech not-italic block">Costruita per scalare.</em>
          </h1>
        </Reveal>
        
        <Reveal delay={100}>
          <p className="text-lg text-ink-500 mb-12 max-w-2xl">
            Stack moderno, infrastruttura cloud-native, sicurezza enterprise-grade. 
            Tutto in data center italiani per garantire sovranità dei dati.
          </p>
        </Reveal>
        
        {/* Stack */}
        <section className="mb-16">
          <SectionNumber number="01 —" label="Stack Tecnico" />
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl leading-[1.05] mb-8">
              Le tecnologie <em className="text-accent-tech not-italic">che usiamo</em>
            </h2>
          </Reveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stack.map((tech, index) => (
              <Reveal key={tech.name} delay={100 + index * 100}>
                <Card className="text-center">
                  <tech.icon className="w-10 h-10 text-accent-tech mx-auto mb-4" />
                  <h3 className="font-serif text-xl text-ink mb-2">{tech.name}</h3>
                  <p className="text-sm text-ink-500">{tech.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>
        
        {/* Security */}
        <section className="mb-16">
          <SectionNumber number="02 —" label="Sicurezza" />
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl leading-[1.05] mb-8">
              Security <em className="text-accent-tech not-italic">by design</em>
            </h2>
          </Reveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {security.map((item, index) => (
              <Reveal key={item.title} delay={100 + index * 100}>
                <Card className="h-full">
                  <item.icon className="w-8 h-8 text-accent-tech mb-4" />
                  <h3 className="font-medium text-ink mb-2">{item.title}</h3>
                  <p className="text-sm text-ink-500">{item.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>
        
        {/* Compliance */}
        <section className="mb-16">
          <SectionNumber number="03 —" label="Compliance" />
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl leading-[1.05] mb-8">
              Conformità <em className="text-accent-tech not-italic">normativa</em>
            </h2>
          </Reveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {compliance.map((item, index) => (
              <Reveal key={item.name} delay={100 + index * 100}>
                <Card className="text-center">
                  <h3 className="font-serif text-xl text-ink mb-2">{item.name}</h3>
                  <span className={`
                    inline-block px-3 py-1 rounded-full text-xs font-medium mb-2
                    ${item.status === 'Compliant' ? 'bg-success/10 text-success' : ''}
                    ${item.status === 'Ready' ? 'bg-accent-tech/10 text-accent-tech' : ''}
                    ${item.status === 'In corso' || item.status === 'Pianificato' ? 'bg-warning/10 text-warning' : ''}
                  `}>
                    {item.status}
                  </span>
                  <p className="text-sm text-ink-500">{item.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>
        
        {/* SLA */}
        <section>
          <SectionNumber number="04 —" label="SLA" />
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl leading-[1.05] mb-8">
              Disponibilità <em className="text-accent-tech not-italic">garantita</em>
            </h2>
          </Reveal>
          
          <Reveal delay={100}>
            <div className="grid sm:grid-cols-3 gap-6">
              <Card className="text-center">
                <p className="font-serif text-4xl text-accent-tech mb-2">99.9%</p>
                <p className="text-ink-500 mb-2">Professional</p>
                <p className="text-xs text-ink-400">~8.76h downtime/anno max</p>
              </Card>
              <Card className="text-center border-accent-brass border-2">
                <p className="font-serif text-4xl text-accent-tech mb-2">99.95%</p>
                <p className="text-ink-500 mb-2">Enterprise Standard</p>
                <p className="text-xs text-ink-400">~4.38h downtime/anno max</p>
              </Card>
              <Card className="text-center">
                <p className="font-serif text-4xl text-accent-tech mb-2">99.99%</p>
                <p className="text-ink-500 mb-2">Enterprise Premium</p>
                <p className="text-xs text-ink-400">~52.6min downtime/anno max</p>
              </Card>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  )
}
