export interface FAQItem {
  question: string
  answer: string
  category?: string
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Posso iniziare con una sola suite e aggiungerne altre dopo?',
    answer: 'Sì. L\'architettura modulare ti permette di attivare una suite alla volta. I dati sono subito disponibili quando ne aggiungi un\'altra — non serve migrazione. Passare da Starter a Professional richiede solo un click, senza downtime.',
    category: 'Generale',
  },
  {
    question: 'Come funziona il supporto 24/7?',
    answer: 'I piani Professional ed Enterprise includono supporto tramite chat CoreMind (risposta immediata), email (SLA 2h) e telefono diretto negli orari lavorativi. Per Enterprise è incluso un account manager dedicato con reperibilità H24 per critical issues.',
    category: 'Supporto',
  },
  {
    question: 'I miei dati dove stanno e di chi sono?',
    answer: 'I tuoi dati sono tuoi, sempre. Hosting su cluster PostgreSQL dedicati in data center italiani (certificazione ISO 27001, ISO 22301, Tier IV). Export completo in formato standard (CSV, JSON, SQL) disponibile in qualsiasi momento, nessun lock-in.',
    category: 'Sicurezza',
  },
  {
    question: 'CoreMind manda i miei dati a OpenAI o Anthropic?',
    answer: 'Solo se tu lo scegli. Il piano Professional usa modelli commerciali con contratti zero-retention firmati (i tuoi dati non trainano i modelli). Il piano Enterprise può usare modelli on-premise o privati che non escono mai dai tuoi server.',
    category: 'Privacy',
  },
  {
    question: 'Quanto tempo serve per essere operativi?',
    answer: 'Mediamente 2–4 settimane. La prima settimana è diagnosi e configurazione, le successive 1–3 sono migrazione dati e formazione. Dal giorno zero hai una piattaforma funzionante con dati reali, anche se in parallelo ai vecchi sistemi.',
    category: 'Onboarding',
  },
  {
    question: 'Funziona con il mio gestionale attuale?',
    answer: 'Sì, quasi sempre. Abbiamo connettori nativi per 200+ sistemi (TeamSystem, Zucchetti, Danea, Fatture in Cloud, Shopify, WooCommerce, etc.) e un middleware per sistemi proprietari o legacy. Nella fase di diagnosi verifichiamo compatibilità e tempi.',
    category: 'Integrazioni',
  },
  {
    question: 'È conforme a GDPR, AI Act e normative di settore?',
    answer: 'Sì, by design. Siamo GDPR-compliant con DPO, AI Act ready (audit trail completo sulle decisioni AI, human oversight), pronti per HACCP (FoodSuite), CEI 64-8 (BuildSuite), codice deontologico forense (LegalMind), ISO 27001.',
    category: 'Compliance',
  },
  {
    question: 'Posso cancellarmi quando voglio?',
    answer: 'Sì. Contratti mensili senza penali di recesso. Esportazione dati completa in formato standard al momento della disdetta. Zero trattenute, zero costi nascosti. I tuoi dati vengono cancellati definitivamente entro 30 giorni.',
    category: 'Contratti',
  },
]
