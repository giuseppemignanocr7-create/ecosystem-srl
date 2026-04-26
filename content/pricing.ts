export interface PricingPlan {
  id: string
  name: string
  badge?: string
  description: string
  /** Setup una tantum (€) */
  setupFee: number
  /** Canone mensile per utente (€) */
  pricePerUser: number
  /** Canone fisso piattaforma (hosting + AI tokens base) (€/mese) */
  platformFee: number
  minUsers: number
  maxUsers: number | null
  includedSuites: number
  features: string[]
  notIncluded?: string[]
  support: {
    channel: string
    sla: string
    onboardingHours: number
    monthlyHoursIncluded: number
  }
  cta: string
  popular?: boolean
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Una sola suite per piccoli team che vogliono partire subito.',
    setupFee: 1490,
    pricePerUser: 39,
    platformFee: 49,
    minUsers: 1,
    maxUsers: 5,
    includedSuites: 1,
    features: [
      '1 suite verticale a scelta',
      'CoreMind base (chat testuale, 500 query/mese)',
      'Fino a 5 utenti',
      'Backup giornaliero · cifratura at-rest',
      'App mobile (iOS + Android)',
      'API REST in lettura',
      'Hosting EU + GDPR ready',
    ],
    notIncluded: [
      'CoreMind Voice',
      'Supporto telefonico',
      'Integrazioni custom',
      'SSO SAML/OIDC',
    ],
    support: {
      channel: 'Email',
      sla: '48h lavorative',
      onboardingHours: 4,
      monthlyHoursIncluded: 1,
    },
    cta: 'Parti con Starter',
  },
  {
    id: 'business',
    name: 'Business',
    badge: 'PIÙ SCELTO',
    description: 'Multi-suite per aziende strutturate. Il punto di equilibrio.',
    setupFee: 3900,
    pricePerUser: 79,
    platformFee: 149,
    minUsers: 5,
    maxUsers: 25,
    includedSuites: 3,
    features: [
      'Fino a 3 suite verticali',
      'CoreMind full + Voice (5.000 query/mese)',
      'Fino a 25 utenti',
      'Backup orario · disaster recovery',
      'API REST + Webhook',
      'Integrazioni native (Stripe, Aruba, Agyo, ecc.)',
      'Report avanzati + export PDF/Excel',
      'Onboarding strutturato 16h',
      'Account manager dedicato',
    ],
    support: {
      channel: 'Email · Chat · Telefono',
      sla: '4h lavorative · 8h h24',
      onboardingHours: 16,
      monthlyHoursIncluded: 4,
    },
    popular: true,
    cta: 'Richiedi preventivo',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'CUSTOM',
    description: 'Per gruppi multi-entity, on-premise o esigenze regolatorie.',
    setupFee: 0, // su preventivo
    pricePerUser: 0, // su preventivo
    platformFee: 0, // su preventivo
    minUsers: 25,
    maxUsers: null,
    includedSuites: 999,
    features: [
      'Suite illimitate (incluse custom su misura)',
      'CoreMind con modelli privati / self-hosted',
      'Utenti illimitati · multi-tenant',
      'SSO SAML 2.0 · OIDC · Active Directory',
      'Audit log esteso (retention 7 anni)',
      'SLA 99.9% contrattuale con penali',
      'Self-hosted o cloud privato (AWS / Azure / OVH)',
      'On-site training & change management',
      'Integrazioni custom illimitate',
      'Penetration test annuale incluso',
    ],
    support: {
      channel: 'Telefono dedicato · Slack condiviso · On-site',
      sla: '1h lavorative · 4h h24 con escalation',
      onboardingHours: 80,
      monthlyHoursIncluded: 16,
    },
    cta: 'Parla con vendite',
  },
]

export const ADDONS = [
  {
    id: 'coremind-voice',
    name: 'CoreMind Voice',
    description: 'Interfaccia vocale (parla, dettatura, comandi)',
    price: '+€19 /utente/mese',
    availableFor: ['starter', 'business', 'enterprise'],
  },
  {
    id: 'coremind-tokens',
    name: 'CoreMind Tokens Pack',
    description: '+10.000 query AI/mese aggiuntive',
    price: '+€99 /mese',
    availableFor: ['starter', 'business', 'enterprise'],
  },
  {
    id: 'sso',
    name: 'SSO Advanced',
    description: 'SAML 2.0, OIDC, integrazione Active Directory',
    price: '+€249 /mese',
    availableFor: ['business', 'enterprise'],
  },
  {
    id: 'audit-log',
    name: 'Audit Log Esteso',
    description: 'Retention 7 anni, export forense, ricerca avanzata',
    price: '+€179 /mese',
    availableFor: ['business', 'enterprise'],
  },
  {
    id: 'api-premium',
    name: 'API Premium',
    description: 'Rate limit aumentato (10x), webhook dedicati, sandbox',
    price: '+€129 /mese',
    availableFor: ['starter', 'business', 'enterprise'],
  },
  {
    id: 'support-premium',
    name: 'Supporto Premium',
    description: 'Risposta entro 30 minuti H24/7 + manager dedicato',
    price: '+€399 /mese',
    availableFor: ['business', 'enterprise'],
  },
  {
    id: 'data-migration',
    name: 'Migrazione Dati',
    description: 'Import da sistema esistente con quality check',
    price: 'da €1.500 una tantum',
    availableFor: ['starter', 'business', 'enterprise'],
  },
  {
    id: 'training-onsite',
    name: 'Formazione On-Site',
    description: 'Giornata di training in azienda (1 trainer)',
    price: '€890 /giornata',
    availableFor: ['starter', 'business', 'enterprise'],
  },
]

export const PRICING_NOTES = [
  'Tutti i prezzi sono iva esclusa.',
  'Setup pagabile alla firma. Canone mensile fatturato anticipato in unica soluzione annuale (-10%) o trimestrale.',
  'Le ore di assistenza incluse non sono cumulabili tra mesi diversi.',
  'Il numero di query CoreMind oltre soglia viene fatturato a consumo (€0.012/query).',
  'Disdetta libera dopo i primi 12 mesi con preavviso di 60 giorni.',
]
