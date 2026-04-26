import { Metadata } from 'next'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { SectionNumber } from '@/components/ui/SectionNumber'
import { Card } from '@/components/ui/Card'
import { COMPANY_INFO } from '@/lib/constants'
import { MessageCircle, Mail, Phone, Clock, CheckCircle, BookOpen, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Supporto · 24/7 e SLA Garantito',
  description: 'Supporto tecnico 24/7 via chat CoreMind, email con SLA 2h, telefono diretto. Account manager dedicato per Enterprise.',
}

export default function SupportoPage() {
  const channels = [
    { icon: MessageCircle, title: 'Chat CoreMind', description: 'Risposta immediata 24/7', availability: 'Always on' },
    { icon: Mail, title: 'Email', description: 'SLA 2 ore lavorative', availability: 'Lun-Ven' },
    { icon: Phone, title: 'Telefono', description: COMPANY_INFO.phone, availability: '9:00-18:00' },
    { icon: Users, title: 'Account Manager', description: 'Per clienti Enterprise', availability: 'H24 on-call' },
  ]

  const slaTiers = [
    { plan: 'Starter', response: '48h', channels: 'Email', availability: 'Lun-Ven' },
    { plan: 'Professional', response: '2h', channels: 'Email + Chat', availability: '24/7' },
    { plan: 'Enterprise', response: '15min', channels: 'Tutti i canali', availability: '24/7 + H24' },
  ]

  return (
    <div className="pt-24 pb-16 bg-paper min-h-screen">
      <div className="container-custom">
        <SectionNumber number="SUPPORTO —" label="Sempre Accanto" />
        
        <Reveal>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">
            Supporto 24/7.
            <em className="text-accent-tech not-italic block">Senza eccitazioni.</em>
          </h1>
        </Reveal>
        
        <Reveal delay={100}>
          <p className="text-lg text-ink-500 mb-12 max-w-2xl">
            Non ti lasciamo mai solo. Supporto tecnico sempre disponibile, 
            team di specialisti del tuo settore, SLA garantiti per ogni piano.
          </p>
        </Reveal>
        
        {/* Channels */}
        <section className="mb-16">
          <SectionNumber number="01 —" label="Canali" />
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl leading-[1.05] mb-8">
              Come <em className="text-accent-tech not-italic">contattarci</em>
            </h2>
          </Reveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {channels.map((channel, index) => (
              <Reveal key={channel.title} delay={100 + index * 100}>
                <Card className="h-full text-center">
                  <channel.icon className="w-10 h-10 text-accent-tech mx-auto mb-4" />
                  <h3 className="font-serif text-xl text-ink mb-2">{channel.title}</h3>
                  <p className="text-ink-500 mb-2">{channel.description}</p>
                  <p className="text-xs font-mono text-accent-brass uppercase">{channel.availability}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>
        
        {/* SLA Table */}
        <section className="mb-16">
          <SectionNumber number="02 —" label="SLA" />
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl leading-[1.05] mb-8">
              Tempi di <em className="text-accent-tech not-italic">risposta garantiti</em>
            </h2>
          </Reveal>
          
          <Reveal delay={100}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-line">
                    <th className="text-left py-4 font-mono text-xs uppercase tracking-wider text-ink-400">Piano</th>
                    <th className="text-left py-4 font-mono text-xs uppercase tracking-wider text-ink-400">Tempo Risposta</th>
                    <th className="text-left py-4 font-mono text-xs uppercase tracking-wider text-ink-400">Canali</th>
                    <th className="text-left py-4 font-mono text-xs uppercase tracking-wider text-ink-400">Disponibilità</th>
                  </tr>
                </thead>
                <tbody>
                  {slaTiers.map((tier, index) => (
                    <tr key={tier.plan} className="border-b border-line/50">
                      <td className="py-4 font-medium text-ink">{tier.plan}</td>
                      <td className="py-4 text-accent-tech font-medium">{tier.response}</td>
                      <td className="py-4 text-ink-500">{tier.channels}</td>
                      <td className="py-4 text-ink-500">{tier.availability}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>
        
        {/* Status & Resources */}
        <section>
          <SectionNumber number="03 —" label="Risorse" />
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl leading-[1.05] mb-8">
              Risorse <em className="text-accent-tech not-italic">utili</em>
            </h2>
          </Reveal>
          
          <div className="grid sm:grid-cols-3 gap-6">
            <Reveal delay={100}>
              <Card className="text-center">
                <CheckCircle className="w-10 h-10 text-success mx-auto mb-4" />
                <h3 className="font-serif text-xl text-ink mb-2">Status Page</h3>
                <p className="text-sm text-ink-500 mb-4">Monitora lo stato di tutti i servizi in tempo reale</p>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full text-xs">
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  Tutti i sistemi operativi
                </span>
              </Card>
            </Reveal>
            
            <Reveal delay={200}>
              <Card className="text-center">
                <BookOpen className="w-10 h-10 text-accent-tech mx-auto mb-4" />
                <h3 className="font-serif text-xl text-ink mb-2">Knowledge Base</h3>
                <p className="text-sm text-ink-500 mb-4">Guide, tutorial e FAQ per utilizzare al meglio la piattaforma</p>
                <Button href="#" variant="ghost" size="sm">Accedi</Button>
              </Card>
            </Reveal>
            
            <Reveal delay={300}>
              <Card className="text-center">
                <Users className="w-10 h-10 text-accent-brass mx-auto mb-4" />
                <h3 className="font-serif text-xl text-ink mb-2">Community</h3>
                <p className="text-sm text-ink-500 mb-4">Unisciti alla community di utenti e sviluppatori</p>
                <Button href="#" variant="ghost" size="sm">Unisciti</Button>
              </Card>
            </Reveal>
          </div>
        </section>
      </div>
    </div>
  )
}
