export interface Suite {
  id: string
  name: string
  tag: string
  description: string
  longDescription: string
  icon: string
  features: string[]
  modules: { name: string; description: string }[]
  painPoints: { problem: string; solution: string }[]
  useCases: string[]
  integrations: string[]
  pricing: {
    starter: string
    professional: string
    enterprise: string
  }
  caseStudy?: {
    company: string
    location: string
    challenge: string
    solution: string
    results: string[]
  }
}

export const SUITES: Suite[] = [
  {
    id: 'buildsuite',
    name: 'BuildSuite',
    tag: 'EDILIZIA · COSTRUZIONI',
    description: 'Cantieri, SAL, computi metrici, sicurezza, BIM, cronoprogramma. Direzione lavori assistita da AI.',
    longDescription: 'BuildSuite è il gestionale completo per imprese edili, direzione lavori e studi di architettura. Gestisce computi metrici, sicurezza cantieri (DUVRI, DVR), cronoprogramma Gantt, SAL, libretti delle misure e integrazione BIM. CoreMind assiste la direzione lavori con query naturali su avanzamenti, costi e scadenze.',
    icon: 'Building2',
    features: [
      'Computo metrico integrato con prezzari DEI/CM',
      'Cronoprogramma Gantt interattivo',
      'Sicurezza cantieri: DUVRI, DVR, POS',
      'Libretti delle misure digitali',
      'Contabilità lavori e certificati di pagamento',
      'Integrazione ACCA, CerTus, PriMus',
      'BIM viewer integrato',
    ],
    modules: [
      { name: 'Computi e Contabilità', description: 'Computi metrici, contabilità lavori, varianti, riserve' },
      { name: 'Sicurezza', description: 'DUVRI, DVR, POS, formazione, DPI' },
      { name: 'Cronoprogramma', description: 'Gantt interattivo, milestone, dipendenze' },
      { name: 'Documenti', description: 'Libretti misure, certificati, allegati' },
    ],
    painPoints: [
      { problem: 'Excel con formule che si rompono', solution: 'Database relazionale con validazione automatica' },
      { problem: 'Scadenze sicurezza dimenticate', solution: 'Alert automatici con priorità AI' },
      { problem: 'Ritardi non rilevati in tempo', solution: 'Dashboard avanzamenti real-time' },
    ],
    useCases: [
      'Genera SAL con calcolo automatico ritenute e IVAs',
      'Analizza scostamenti costi previsti vs reali',
      'Crea DUVRI da precedenti cantieri simili',
      'Traccia scadenze scadenziario sicurezza',
    ],
    integrations: ['ACCA', 'CerTus', 'PriMus', 'AutoCAD', 'Revit', 'Teamsystem', 'Zucchetti'],
    pricing: {
      starter: 'da €49/mese',
      professional: 'da €129/mese',
      enterprise: 'su preventivo',
    },
    caseStudy: {
      company: 'Edilprogetti S.p.A.',
      location: 'Napoli, IT',
      challenge: 'Gestione simultanea di 12 cantieri con team dispersi',
      solution: 'BuildSuite con CoreMind per coordinamento automatico',
      results: ['-40% tempi reporting', '+25% rispetto scadenze', 'Zero sanzioni sicurezza'],
    },
  },
  {
    id: 'legalmind',
    name: 'LegalMind',
    tag: 'STUDI LEGALI · AVVOCATURA',
    description: 'Fascicoli, scadenzario PCT, parcellazione, PEC AI, analisi documentale semantica.',
    longDescription: 'LegalMind è il software gestionale per studi legali di ogni dimensione. Gestisce fascicoli, scadenzario PCT con notifiche intelligenti, parcellazione e fatturazione, PEC integrata con analisi AI delle notifiche. L\'analisi documentale semantica con RAG permette di interrogare migliaia di atti in linguaggio naturale.',
    icon: 'Scale',
    features: [
      'Fascicoli digitali con versionamento',
      'Scadenzario PCT automatico con alert',
      'Parcellazione D.M. 55/2014 e parametri forensi',
      'PEC con AI per estrazione dati notifiche',
      'RAG documentale: interrogazione atti in NLP',
      'Generazione atti da template',
      'Contabilità studio e reverse charge',
    ],
    modules: [
      { name: 'Fascicoli', description: 'Gestione pratiche, atti, udienze, contatti' },
      { name: 'Scadenze', description: 'PCT, perizie, impugnazioni, termini processuali' },
      { name: 'Parcelle', description: 'Parcellazione, fatturazione, incassi' },
      { name: 'Documentale', description: 'RAG, estrazione dati, template atti' },
    ],
    painPoints: [
      { problem: 'Termini processuali persi', solution: 'Alert multi-canale con escalation' },
      { problem: 'Ricerca lenta nei fascicoli', solution: 'RAG semantico su tutti i documenti' },
      { problem: 'Parcellazione complessa', solution: 'Calcolo automatico parametri forensi' },
    ],
    useCases: [
      'Trova tutti i contratti con clausola X in 12 anni di pratiche',
      'Genera ricorso da template con dati fascicolo',
      'Calcola parcella perizia con DM 55/2014',
      'Estrai scadenze da notifiche PEC in arrivo',
    ],
    integrations: ['InfoCert', 'Aruba PEC', 'Fatture in Cloud', 'Adobe Sign', 'DocuSign'],
    pricing: {
      starter: 'da €69/mese',
      professional: 'da €149/mese',
      enterprise: 'su preventivo',
    },
  },
  {
    id: 'dentalsuite',
    name: 'DentalSuite',
    tag: 'ODONTOIATRIA',
    description: 'Cartelle cliniche digitali, piano terapeutico, agenda smart, fatturazione elettronica, recall pazienti.',
    longDescription: 'DentalSuite è la piattaforma completa per studi odontoiatrici e centri dentali. Gestisce cartelle cliniche digitali complete con imaging, piani terapeutici con preventivi, agenda smart ottimizzata da AI, fatturazione elettronica e SSN, recall automatico pazienti per trattamenti ricorrenti.',
    icon: 'Smile',
    features: [
      'Cartella clinica digitale con imaging',
      'Piano terapeutico con preventivi',
      'Agenda smart ottimizzata AI',
      'Fatturazione elettronica e SSN',
      'Recall automatico pazienti',
      'Integrazione RX, OPT, TAC',
      'Analisi KPi clinici e finanziari',
    ],
    modules: [
      { name: 'Cartella Clinica', description: 'Anamnesi, esami, diagnosi, piani' },
      { name: 'Agenda', description: 'Prenotazioni, ottimizzazione slot, promemoria' },
      { name: 'Fatturazione', description: 'FE, SSN, convenzioni, pagamenti' },
      { name: 'Recall', description: 'Promemoria automatici, marketing' },
    ],
    painPoints: [
      { problem: 'Agenda disorganizzata', solution: 'Ottimizzazione AI slot e tempi' },
      { problem: 'Recall manuali dimenticate', solution: 'Automazione multi-canale' },
      { problem: 'Cartelle cartacee', solution: 'Digitale completo con backup' },
    ],
    useCases: [
      'Analizza tasso conversione preventivi',
      'Ottimizza agenda per massimizzare ricavi',
      'Genera recall per recall checkup annuale',
      'Calcola margine per tipo di trattamento',
    ],
    integrations: ['Varetti', 'Cefla', 'Sirona', 'KaVo', 'Invisalign', 'Fatture in Cloud'],
    pricing: {
      starter: 'da €59/mese',
      professional: 'da €119/mese',
      enterprise: 'su preventivo',
    },
  },
  {
    id: 'foodsuite',
    name: 'FoodSuite',
    tag: 'HORECA · RISTORAZIONE',
    description: 'Ordini fornitori, menu engineering, HACCP digitale, food cost, inventory, analytics sala e cucina.',
    longDescription: 'FoodSuite è il gestionale per ristoranti, trattorie, pizzerie e catene. Gestisce ordini fornitori, menu engineering con analisi margini, HACCP digitale con schede automatiche, food cost di ogni ricetta, inventory magazzino, analytics sala e cucina. CoreMind suggerisce ottimizzazioni menu e acquisti.',
    icon: 'Utensils',
    features: [
      'Ordini fornitori con liste automatiche',
      'Menu engineering: margini e mix di vendita',
      'HACCP digitale con schede automatiche',
      'Food cost ricette con analisi dettagliata',
      'Magazzino e schede tecniche',
      'Integrazione POS e delivery',
      'Analytics sala, cucina, delivery',
    ],
    modules: [
      { name: 'Magazzino', description: 'Giacenze, ordini, schede tecniche' },
      { name: 'Menu', description: 'Ricette, food cost, allergeni, QBR' },
      { name: 'HACCP', description: 'Schede autocontrollo, tracciabilità' },
      { name: 'Vendite', description: 'POS, delivery, analytics' },
    ],
    painPoints: [
      { problem: 'Food cost incerto', solution: 'Calcolo preciso per ogni piatto' },
      { problem: 'HACCP cartacea dispersa', solution: 'Digitale con alert compliance' },
      { problem: 'Ordini inefficienti', solution: 'Liste basate su previsioni AI' },
    ],
    useCases: [
      'Calcola food cost nuovo piatto in tempo reale',
      'Analizza mix vendite per ottimizzare menu',
      'Genera ordine fornitori basato su previsioni',
      'Traccia HACCP con alert scadenze',
    ],
    integrations: ['Toast', 'Square', 'Deliveroo', 'Just Eat', 'Glovo', 'Uber Eats'],
    pricing: {
      starter: 'da €39/mese',
      professional: 'da €99/mese',
      enterprise: 'su preventivo',
    },
  },
  {
    id: 'okchef',
    name: 'OK Chef',
    tag: 'HORECA · APPROVVIGIONAMENTO',
    description: 'Catalogo 80+ fornitori, ordini smart con AI, gestione magazzino, analytics acquisti, integrazione contabile.',
    longDescription: 'OK Chef è la piattaforma di approvvigionamento per ristoranti che aggrega 80+ fornitori in un unico catalogo digitale. Ordini smart con AI che predice necessità, gestione magazzino multi-fornitore, analytics acquisti per ottimizzare spese, integrazione contabile automatica.',
    icon: 'ChefHat',
    features: [
      'Catalogo unificato 80+ fornitori',
      'Ordini smart con predizione AI',
      'Confronto prezzi tra fornitori',
      'Magazzino multi-fornitore',
      'Analytics acquisti e spese',
      'Integrazione contabile automatica',
      'App mobile per ordini in cucina',
    ],
    modules: [
      { name: 'Catalogo', description: 'Ricerca, confronto, preferiti' },
      { name: 'Ordini', description: 'Smart order, programmati, urgenti' },
      { name: 'Magazzino', description: 'Giacenze, scadenze, rotazione' },
      { name: 'Analytics', description: 'Spend, trend, ottimizzazioni' },
    ],
    painPoints: [
      { problem: 'Multipli portali fornitori', solution: 'Unico catalogo aggregato' },
      { problem: 'Ordini dimenticati', solution: 'Predizione e alert automatici' },
      { problem: 'Non si confrontano prezzi', solution: 'Benchmark automatico' },
    ],
    useCases: [
      'Predici necessità settimanali con AI',
      'Confronta prezzi uova tra 5 fornitori',
      'Analizza trend spesa per categoria',
      'Ottimizza ordini per free shipping',
    ],
    integrations: ['Metropolis', 'Gruppo Gabrielli', 'Citterio', 'Fatture in Cloud'],
    pricing: {
      starter: '€0 + commissioni',
      professional: 'da €79/mese',
      enterprise: 'su preventivo',
    },
  },
  {
    id: 'fishsuite',
    name: 'FishSuite',
    tag: 'ITTICO · PESCA',
    description: 'Tracciabilità CE, catena del freddo IoT, gestione flotta, HACCP mare, analytics filiera, royalty model.',
    longDescription: 'FishSuite è la piattaforma dedicata al settore ittico: pesca, acquacoltura, lavorazione e distribuzione. Gestisce tracciabilità CE completa, catena del freddo con sensori IoT, flotta peschereccia, HACCP specifica per mare, analytics di filiera. Include royalty model integrato per cooperative.',
    icon: 'Fish',
    features: [
      'Tracciabilità CE lotto completa',
      'Catena freddo IoT con alert',
      'Gestione flotta pescherecci',
      'HACCP specifica settore ittico',
      'Royalty model per cooperative',
      'Analytics filiera: cattura a vendita',
      'Certificazioni MSC, ASC, BIO',
    ],
    modules: [
      { name: 'Tracciabilità', description: 'Lot tracking, CE, etichettatura' },
      { name: 'Flotta', description: 'Pescherecci, rotte, catture' },
      { name: 'Freddo', description: 'Sensori IoT, alert, HACCP' },
      { name: 'Royalty', description: 'Calcolo quote, pagamenti cooperative' },
    ],
    painPoints: [
      { problem: 'Tracciabilità manuale', solution: 'Digitale end-to-end con QR' },
      { problem: 'Rotte flotta disperse', solution: 'Dashboard flotta real-time' },
      { problem: 'Calcolo royalty complesso', solution: 'Automazione cooperative' },
    ],
    useCases: [
      'Traccia sgombro da cattura a banco',
      'Monitora catena freddo in tempo reale',
      'Calcola royalty pescatori per lotto',
      'Genera certificazione BIO per export',
    ],
    integrations: ['AIS marittimo', 'Satelliti', 'IoT sensori', 'Ministero MIT'],
    pricing: {
      starter: 'da €79/mese',
      professional: 'da €149/mese',
      enterprise: 'su preventivo',
    },
  },
  {
    id: 'retailsuite',
    name: 'RetailSuite',
    tag: 'RETAIL · E-COMMERCE',
    description: 'POS, e-commerce, magazzino, CRM, loyalty, analytics omnichannel. Multi-store unificata, sincronizzazione real-time.',
    longDescription: 'RetailSuite è la piattaforma omnichannel per negozi fisici, e-commerce e retail multi-store. POS completo, e-commerce integrato, magazzino unificato, CRM e programma fedeltà, analytics omnichannel che unifica dati da tutti i canali. Sincronizzazione real-time tra negozi e online.',
    icon: 'ShoppingCart',
    features: [
      'POS completo fisso e mobile',
      'E-commerce nativo integrato',
      'Magazzino unificato multi-store',
      'CRM e loyalty program',
      'Analytics omnichannel',
      'Sincronizzazione real-time',
      'Marketplace integration',
    ],
    modules: [
      { name: 'Vendite', description: 'POS, online, marketplace' },
      { name: 'Magazzino', description: 'Multi-store, transfer, giacenze' },
      { name: 'Clienti', description: 'CRM, loyalty, marketing' },
      { name: 'Analytics', description: 'Omnichannel, forecasting' },
    ],
    painPoints: [
      { problem: 'Dati negozio vs online separati', solution: 'Unificazione omnichannel' },
      { problem: 'Giacenze non allineate', solution: 'Sync real-time magazzino' },
      { problem: 'Clienti non riconosciuti', solution: 'CRM unico cross-channel' },
    ],
    useCases: [
      'Analizza cliente che compra online e in negozio',
      'Sincronizza giacenze 5 negozi + online',
      'Predici demand per riordino automatico',
      'Personalizza offerte loyalty per segmento',
    ],
    integrations: ['Shopify', 'WooCommerce', 'Magento', 'Stripe', 'SumUp', 'Nexi'],
    pricing: {
      starter: 'da €59/mese',
      professional: 'da €129/mese',
      enterprise: 'su preventivo',
    },
  },
  {
    id: 'rentsuite',
    name: 'RentSuite',
    tag: 'IMMOBILIARE · PROPERTY MGMT',
    description: 'Property management, locazioni, condomini, manutenzione predittiva, portale inquilini, contabilità immobiliare.',
    longDescription: 'RentSuite è la piattaforma per agenzie immobiliari, property manager e amministratori di condominio. Gestisce portafoglio immobili, locazioni con contratti digitali, condominio e ripartizione spese, manutenzione predittiva con IoT, portale inquilini self-service, contabilità immobiliare completa.',
    icon: 'Home',
    features: [
      'Portafoglio immobili completo',
      'Locazioni: contratti, scadenze, solleciti',
      'Condominio: ripartizioni, assemblee, contabilità',
      'Manutenzione predittiva IoT',
      'Portale inquilini self-service',
      'Contabilità immobiliare separata',
      'Analytics redditività per immobile',
    ],
    modules: [
      { name: 'Immobili', description: 'Anagrafiche, documenti, planimetrie' },
      { name: 'Locazioni', description: 'Contratti, inquilini, pagamenti' },
      { name: 'Condominio', description: 'Riparizioni, assemblee, conti' },
      { name: 'Manutenzione', description: 'Ticket, predittiva, IoT' },
    ],
    painPoints: [
      { problem: 'Scadenze locazioni dimenticate', solution: 'Alert automatici multi-livello' },
      { problem: 'Condomini complessi', solution: 'Automazione ripartizioni' },
      { problem: 'Inquilini con richieste continue', solution: 'Portale self-service' },
    ],
    useCases: [
      'Genera contratto locazione da template',
      'Calcola ripartizione spese condominio',
      'Predici manutenzione caldaia con IoT',
      'Analizza redditività portafoglio',
    ],
    integrations: ['SIAE', 'Agenzia Entrate', 'Fatture in Cloud', 'DocuSign'],
    pricing: {
      starter: 'da €49/mese',
      professional: 'da €109/mese',
      enterprise: 'su preventivo',
    },
  },
  {
    id: 'techsuite',
    name: 'TechSuite',
    tag: 'IT · SOFTWARE HOUSE',
    description: 'Project management IT, ticketing, time tracking, code review, sprint planning, DevOps dashboard, CI/CD integrato.',
    longDescription: 'TechSuite è il gestionale per software house, team IT e DevOps. Project management agile, ticketing con SLA, time tracking, code review integrata, sprint planning, DevOps dashboard con metriche CI/CD, integrazione Git e deploy automatizzato.',
    icon: 'Code2',
    features: [
      'Project management agile/Scrum',
      'Ticketing con SLA e escalation',
      'Time tracking e costi progetto',
      'Code review e quality gate',
      'Sprint planning e velocity',
      'DevOps dashboard CI/CD',
      'Integrazione Git, Jira, Slack',
    ],
    modules: [
      { name: 'Progetti', description: 'Agile, Kanban, Gantt, budget' },
      { name: 'Ticket', description: 'SLA, routing, knowledge base' },
      { name: 'Time', description: 'Tracking, costi, fatturazione' },
      { name: 'DevOps', description: 'CI/CD, deploy, monitoring' },
    ],
    painPoints: [
      { problem: 'Progetti in ritardo', solution: 'Tracking real-time e alert' },
      { problem: 'Time tracking sporadico', solution: 'Timer integrato e reminder' },
      { problem: 'Deploy caotici', solution: 'Pipeline CI/CD integrate' },
    ],
    useCases: [
      'Track velocity team per sprint',
      'Analizza profitability per progetto',
      'Genera report SLA mensile',
      'Deploy automatizzato con approval',
    ],
    integrations: ['GitHub', 'GitLab', 'Bitbucket', 'Jira', 'Slack', 'Discord'],
    pricing: {
      starter: 'da €29/mese',
      professional: 'da €89/mese',
      enterprise: 'su preventivo',
    },
  },
  {
    id: 'consulente-virtuale',
    name: 'Consulente Virtuale',
    tag: 'CONSULENZA LAVORO/FISCO',
    description: 'Paghe, contributi, dichiarazioni, pratiche CdL e commercialisti. AI normativa aggiornata in tempo reale.',
    longDescription: 'Consulente Virtuale è la piattaforma per consulenti del lavoro, commercialisti e CAF. Gestisce paghe, contributi, dichiarazioni fiscali, pratiche CdL e patronati. CoreMind è addestrato su normativa sempre aggiornata: contratti, CCNL, leggi fiscali. Interroga la normativa in linguaggio naturale.',
    icon: 'FileText',
    features: [
      'Paghe e contributi automatizzati',
      'Dichiarazioni fiscali integrate',
      'Pratiche CdL e patronati',
      'AI normativa aggiornata real-time',
      'Scadenziario fiscale personalizzato',
      'Integrazione INPS, Agenzia Entrate',
      'Portale dipendenti e clienti',
    ],
    modules: [
      { name: 'Paghe', description: 'Buste, contributi, CUD, 770' },
      { name: 'Fisco', description: '730, UNICO, IVA, dichiarazioni' },
      { name: 'Pratiche', description: 'CdL, patronato, successioni' },
      { name: 'Normativa', description: 'AI aggiornata, query in NLP' },
    ],
    painPoints: [
      { problem: 'Normativa che cambia', solution: 'AI sempre aggiornata automaticamente' },
      { problem: 'Scadenze fiscali', solution: 'Scadenziario personalizzato per cliente' },
      { problem: 'Ricerca normativa lenta', solution: 'Query naturali in linguaggio umano' },
    ],
    useCases: [
      'Calcola TFR con normativa aggiornata',
      'Spieghi novità CCNL in linguaggio semplice',
      'Genera dichiarazione 730 da dati',
      'Verifica scadenze fiscali cliente',
    ],
    integrations: ['INPS', 'Agenzia Entrate', 'INAIL', 'Cassa Edile'],
    pricing: {
      starter: 'da €69/mese',
      professional: 'da €149/mese',
      enterprise: 'su preventivo',
    },
  },
  {
    id: 'civiccore',
    name: 'CivicCore',
    tag: 'PA · CAF · PATRONATI',
    description: 'Pratiche ISEE, 730, successioni, RED. Sportello digitale cittadino-ente, gestione flussi CAF e patronati.',
    longDescription: 'CivicCore è la piattaforma per Pubbliche Amministrazioni, CAF e patronati. Gestisce pratiche ISEE, 730 precompilato, successioni, RED e tutte le pratiche sociali. Sportello digitale cittadino-ente con prenotazioni, gestione flussi per CAF e patronati multi-sede.',
    icon: 'Shield',
    features: [
      'Pratiche ISEE, 730, successioni',
      'RED e pratiche sociali',
      'Sportello digitale cittadino',
      'Prenotazioni e precompilato',
      'Gestione flussi CAF/patronati',
      'Multi-sede e turnazione',
      'Integrazione INPS, Agenzia Entrate',
    ],
    modules: [
      { name: 'Pratiche', description: 'ISEE, 730, successioni, RED' },
      { name: 'Cittadino', description: 'Portale, prenotazioni, tracking' },
      { name: 'Flussi', description: 'Multi-sede, turni, reporting' },
      { name: 'Integrazioni', description: 'INPS, AE, PagoPA' },
    ],
    painPoints: [
      { problem: 'Code agli sportelli', solution: 'Prenotazione digitale e calendar' },
      { problem: 'Pratiche duplicate', solution: 'Tracking univoco pratica-cittadino' },
      { problem: 'Flussi disorganizzati', solution: 'Dashboard flussi multi-sede' },
    ],
    useCases: [
      'Genera ISEE da precompilato INPS',
      'Traccia stato pratica per cittadino',
      'Ottimizza turnazione operatori',
      'Report pratiche per sede/mese',
    ],
    integrations: ['INPS', 'Agenzia Entrate', 'PagoPA', 'SPID', 'CIE'],
    pricing: {
      starter: 'da €89/mese',
      professional: 'da €179/mese',
      enterprise: 'su preventivo',
    },
  },
  {
    id: 'petverse',
    name: 'PetVerse',
    tag: 'VETERINARIA · PETCARE',
    description: 'Cartelle cliniche veterinarie, agenda, vaccini, anagrafe canina, e-commerce petshop, telemedicina.',
    longDescription: 'PetVerse è la piattaforma per studi veterinari, cliniche animali e petshop. Gestisce cartelle cliniche veterinarie complete, agenda smart, vaccini con scadenze, anagrafe canina e felina, e-commerce petshop integrato, telemedicina per consulenze remote.',
    icon: 'PawPrint',
    features: [
      'Cartella clinica veterinaria digitale',
      'Agenda smart per visite e chirurgie',
      'Vaccini con scadenze e alert',
      'Anagrafe canina e felina',
      'E-commerce petshop integrato',
      'Telemedicina e consulenze remote',
      'Analytics clinica e retail',
    ],
    modules: [
      { name: 'Clinica', description: 'Cartelle, visite, chirurgie' },
      { name: 'Agenda', description: 'Prenotazioni, promemoria' },
      { name: 'Vaccini', description: 'Scadenze, anagrafe, certificati' },
      { name: 'Petshop', description: 'E-commerce, inventario' },
    ],
    painPoints: [
      { problem: 'Cartelle disorganizzate', solution: 'Digitale con imaging integrato' },
      { problem: 'Vaccini scaduti dimenticati', solution: 'Alert automatici ai proprietari' },
      { problem: 'Telefonate continue', solution: 'Portale proprietario e telemedicina' },
    ],
    useCases: [
      'Genera certificato vaccinazione',
      'Agenda ottimizzata per tipo visita',
      'Teleconsulto per follow-up',
      'Analizza vendite petshop per categoria',
    ],
    integrations: ['Anagrafe canina', 'Zooplus', 'Fatture in Cloud'],
    pricing: {
      starter: 'da €49/mese',
      professional: 'da €99/mese',
      enterprise: 'su preventivo',
    },
  },
  {
    id: 'archon-os',
    name: 'Archon OS',
    tag: 'BUSINESS OS · MULTI-ENTITY',
    description: 'Il layer di orchestrazione per aziende multi-società. Dashboard esecutiva, consolidato, governance centralizzata.',
    longDescription: 'Archon OS è il sistema di orchestrazione per holding, gruppi aziendali e strutture multi-società. Dashboard esecutiva unificata, consolidato bilanci, intercompany automation, governance centralizzata con ruoli e permessi, compliance group-level.',
    icon: 'Network',
    features: [
      'Dashboard esecutiva multi-società',
      'Consolidato bilanci automatico',
      'Intercompany automation',
      'Governance centralizzata',
      'Ruoli e permessi group-level',
      'Compliance e audit trail',
      'Reporting regulatori e ESG',
    ],
    modules: [
      { name: 'Consolidato', description: 'Bilanci, eliminazioni, reporting' },
      { name: 'Intercompany', description: 'Flussi, reconciliation, netting' },
      { name: 'Governance', description: 'Ruoli, policy, approval workflow' },
      { name: 'Compliance', description: 'Audit, ESG, regulatori' },
    ],
    painPoints: [
      { problem: 'Dati società disperse', solution: 'Dashboard unificata real-time' },
      { problem: 'Consolidato manuale', solution: 'Automazione eliminazioni intercompany' },
      { problem: 'Governance frammentata', solution: 'Policy centralizzate e audit' },
    ],
    useCases: [
      'Genera consolidato gruppo 5 società',
      'Reconcile flussi intercompany',
      'Dashboard KPI group-level',
      'Report ESG per compliance',
    ],
    integrations: ['Cerved', 'InfoCamere', 'Agenzia Entrate', 'Banche'],
    pricing: {
      starter: 'su preventivo',
      professional: 'su preventivo',
      enterprise: 'su preventivo',
    },
  },
]

export const getSuiteBySlug = (slug: string): Suite | undefined => {
  return SUITES.find(suite => suite.id === slug)
}
