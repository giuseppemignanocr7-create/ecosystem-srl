export const BRAND = {
  name: 'Ecosystem',
  tagline: 'Un tocco, infinite possibilità',
  taglineEn: 'One touch, infinite possibilities',
  domain: 'ecosystem.org',
  url: 'https://ecosystem.org',
  email: 'info@ecosystem.org',
  pec: 'ecosystem@pec.it',
  phone: '+39 327 160 4592',
  legal: {
    company: 'Ecosystem S.R.L.',
    vat: '04910300617',
    rea: 'CE-365391',
    pec: 'ecosystem@pec.it',
    legalAddress: 'Via Pietrerotte 13, 81037 Sessa Aurunca (CE)',
    operationalAddress: 'Santi Cosma e Damiano (LT)',
  },
} as const

export const TEAM = [
  {
    name: 'Giuseppe Mignano',
    role: 'Fondatore — Founder',
    bio: 'Fondatore di Ecosystem. 7+ anni di consulenza aziendale, 37 progetti gestiti per oltre €50M di valore. Visione: portare l’intelligenza artificiale in ogni PMI italiana.',
    initials: 'GM',
    accent: '#3B5FE8',
  },
  {
    name: 'Salvatore Brancaccio',
    role: 'Co-founder · CFO · Direttore Amministrativo',
    bio: 'Co-founder e partner strategico. Definisce l’architettura di prodotto e le verticalizzazioni di settore.',
    initials: 'SB',
    accent: '#3B5FE8',
  },
  {
    name: 'Claudia Del Giudice',
    role: 'Co-founder · CCO · Direttore Marketing',
    bio: 'Strategia di posizionamento, comunicazione e brand. Coordina le campagne di acquisizione e la voce di Ecosystem sul mercato.',
    initials: 'CD',
    accent: '#3B5FE8',
  },
  {
    name: 'Danilo Mastrocola',
    role: 'DevOps Engineer · Sviluppatore',
    bio: 'Sviluppo e mantenimento dei moduli verticali. Supporta tecnicamente i team di onboarding e l’evoluzione di CoreMind.',
    initials: 'DM',
    accent: '#3B5FE8',
  },
] as const

export const COMPANY_INFO = {
  name: 'Ecosystem S.R.L.',
  nameShort: 'Ecosystem',
  piva: '04910300617',
  rea: 'CE-365391',
  pec: 'ecosystem@pec.it',
  email: 'info@ecosystem.org',
  phone: '+39 327 160 4592',
  address: {
    legal: 'Via Pietrerotte 13, 81037 Sessa Aurunca (CE)',
    operational: 'Santi Cosma e Damiano (LT)'
  },
  founded: 2024,
  projectsValue: '50M+',
  projectsCount: 37,
  experienceYears: 7,
} as const

export const PLATFORM_STATS = {
  verticals: 13,
  databaseTables: 393,
  aiNative: '100%',
} as const

export const NAV_LINKS = [
  { href: '/coremind/', label: 'CoreMind', description: 'Intelligenza artificiale' },
  { href: '/suite/', label: 'Suite', description: '13 verticali di settore', hasDropdown: true },
  { href: '/demo/', label: 'Demo', description: 'Prova interattiva' },
  { href: '/pricing/', label: 'Prezzi', description: 'Piani trasparenti' },
  { href: '/azienda/', label: 'Azienda', description: 'Chi siamo' },
  { href: '/contatti/', label: 'Contatti', description: 'Richiedi demo' },
] as const

export const SUITE_LINKS = [
  { href: '/suite/buildsuite/', label: 'BuildSuite', tag: 'EDILIZIA' },
  { href: '/suite/legalmind/', label: 'LegalMind', tag: 'STUDI LEGALI' },
  { href: '/suite/dentalsuite/', label: 'DentalSuite', tag: 'ODONTOIATRIA' },
  { href: '/suite/foodsuite/', label: 'FoodSuite', tag: 'HORECA' },
  { href: '/suite/okchef/', label: 'OK Chef', tag: 'APPROVVIGIONAMENTO' },
  { href: '/suite/fishsuite/', label: 'FishSuite', tag: 'ITTICO' },
  { href: '/suite/retailsuite/', label: 'RetailSuite', tag: 'RETAIL' },
  { href: '/suite/rentsuite/', label: 'RentSuite', tag: 'IMMOBILIARE' },
  { href: '/suite/techsuite/', label: 'TechSuite', tag: 'IT' },
  { href: '/suite/consulente-virtuale/', label: 'Consulente Virtuale', tag: 'CONSULENZA' },
  { href: '/suite/civiccore/', label: 'CivicCore', tag: 'PA/CAF' },
  { href: '/suite/petverse/', label: 'PetVerse', tag: 'VETERINARIA' },
  { href: '/suite/archon-os/', label: 'Archon OS', tag: 'MULTI-ENTITY' },
] as const
