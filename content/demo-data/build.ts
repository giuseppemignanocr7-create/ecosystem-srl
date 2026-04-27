/**
 * BuildSuite — datasets realistici per modalità demo.
 */

export type CantiereStatus = 'in-corso' | 'completato' | 'in-pausa' | 'critico'

export interface Cantiere {
  id: string
  codice: string
  nome: string
  cliente: string
  citta: string
  budget: number
  speso: number
  avanzamento: number // %
  margine: number // %
  status: CantiereStatus
  scadenza: string
  responsabile: string
  workers: number
  ore: number
}

export const CANTIERI: Cantiere[] = [
  {
    id: 'c1',
    codice: 'NA-2025-014',
    nome: 'Via Roma 42',
    cliente: 'Acme Costruzioni S.r.l.',
    citta: 'Napoli',
    budget: 1_240_000,
    speso: 918_400,
    avanzamento: 74,
    margine: 18.9,
    status: 'in-corso',
    scadenza: '2026-07-22',
    responsabile: 'Ing. Marco Lupo',
    workers: 18,
    ore: 4_240,
  },
  {
    id: 'c2',
    codice: 'LT-2026-002',
    nome: 'Residenza Pineta',
    cliente: 'Studio Mignano',
    citta: 'Latina',
    budget: 680_000,
    speso: 285_600,
    avanzamento: 42,
    margine: 21.4,
    status: 'in-corso',
    scadenza: '2026-06-14',
    responsabile: 'Geom. Anna Esposito',
    workers: 11,
    ore: 1_980,
  },
  {
    id: 'c3',
    codice: 'CE-2025-022',
    nome: 'Biogas Caserta',
    cliente: 'Green Energy S.p.A.',
    citta: 'Caserta',
    budget: 2_100_000,
    speso: 1_911_000,
    avanzamento: 91,
    margine: 9.1,
    status: 'critico',
    scadenza: '2026-06-15',
    responsabile: 'Ing. Roberto Galli',
    workers: 24,
    ore: 8_120,
  },
  {
    id: 'c4',
    codice: 'CE-2026-007',
    nome: 'Ampliamento scuola',
    cliente: 'Comune di Sessa Aurunca',
    citta: 'Sessa Aurunca',
    budget: 480_000,
    speso: 134_400,
    avanzamento: 28,
    margine: 7.2,
    status: 'in-corso',
    scadenza: '2026-06-10',
    responsabile: 'Ing. Lucia Romano',
    workers: 9,
    ore: 1_120,
  },
  {
    id: 'c5',
    codice: 'NA-2026-011',
    nome: 'Villa Ronchi',
    cliente: 'Privato',
    citta: 'Napoli',
    budget: 320_000,
    speso: 48_000,
    avanzamento: 15,
    margine: 24.8,
    status: 'in-corso',
    scadenza: '2026-08-21',
    responsabile: 'Arch. Sara Conte',
    workers: 6,
    ore: 480,
  },
  {
    id: 'c6',
    codice: 'CE-2025-031',
    nome: 'Rifacimento facciata',
    cliente: 'Condominio Falcone',
    citta: 'Caserta',
    budget: 95_000,
    speso: 95_000,
    avanzamento: 100,
    margine: 16.5,
    status: 'completato',
    scadenza: '2026-04-02',
    responsabile: 'Geom. Paolo Bruno',
    workers: 5,
    ore: 920,
  },
  {
    id: 'c7',
    codice: 'NA-2026-002',
    nome: 'Capannone industriale',
    cliente: 'Logistica Mediterranea',
    citta: 'Pozzuoli',
    budget: 1_850_000,
    speso: 740_000,
    avanzamento: 40,
    margine: 14.6,
    status: 'in-corso',
    scadenza: '2026-12-05',
    responsabile: 'Ing. Marco Lupo',
    workers: 22,
    ore: 5_360,
  },
  {
    id: 'c8',
    codice: 'LT-2025-019',
    nome: 'Ristrutturazione hotel',
    cliente: 'Hotel Tirreno',
    citta: 'Sperlonga',
    budget: 740_000,
    speso: 333_000,
    avanzamento: 45,
    margine: 12.3,
    status: 'in-pausa',
    scadenza: '2026-09-18',
    responsabile: 'Arch. Sara Conte',
    workers: 0,
    ore: 2_280,
  },
  {
    id: 'c9',
    codice: 'CE-2026-014',
    nome: 'Centro commerciale',
    cliente: 'Real Estate Italia',
    citta: 'Caserta',
    budget: 4_200_000,
    speso: 1_092_000,
    avanzamento: 26,
    margine: 19.8,
    status: 'in-corso',
    scadenza: '2027-03-30',
    responsabile: 'Ing. Roberto Galli',
    workers: 36,
    ore: 6_720,
  },
  {
    id: 'c10',
    codice: 'NA-2025-038',
    nome: 'Strada provinciale 87',
    cliente: 'Provincia Napoli',
    citta: 'Acerra',
    budget: 540_000,
    speso: 432_000,
    avanzamento: 80,
    margine: 11.2,
    status: 'in-corso',
    scadenza: '2026-05-28',
    responsabile: 'Ing. Lucia Romano',
    workers: 14,
    ore: 3_120,
  },
  {
    id: 'c11',
    codice: 'CE-2026-021',
    nome: 'Asilo nido San Marco',
    cliente: 'Comune Caserta',
    citta: 'Caserta',
    budget: 380_000,
    speso: 38_000,
    avanzamento: 10,
    margine: 22.0,
    status: 'in-corso',
    scadenza: '2026-11-12',
    responsabile: 'Geom. Anna Esposito',
    workers: 8,
    ore: 320,
  },
  {
    id: 'c12',
    codice: 'NA-2026-018',
    nome: 'Demolizione e bonifica',
    cliente: 'TechBuild S.r.l.',
    citta: 'Napoli',
    budget: 220_000,
    speso: 187_000,
    avanzamento: 85,
    margine: 8.4,
    status: 'in-corso',
    scadenza: '2026-05-05',
    responsabile: 'Geom. Paolo Bruno',
    workers: 12,
    ore: 1_840,
  },
]

export interface SAL {
  id: string
  numero: string
  cantiere: string
  cantiereCodice: string
  importo: number
  data: string
  scadenza: string
  status: 'pending' | 'confermato' | 'in-revisione' | 'scaduto'
  approvatore?: string
}

export const SALS: SAL[] = [
  { id: 's1', numero: 'SAL-014/7', cantiere: 'Via Roma 42', cantiereCodice: 'NA-2025-014', importo: 92_400, data: '2026-04-22', scadenza: '2026-04-30', status: 'pending', approvatore: 'D.L. Direttore Lavori' },
  { id: 's2', numero: 'SAL-022/9', cantiere: 'Biogas Caserta', cantiereCodice: 'CE-2025-022', importo: 145_800, data: '2026-04-18', scadenza: '2026-04-28', status: 'in-revisione', approvatore: 'Ing. Galli' },
  { id: 's3', numero: 'SAL-031/4', cantiere: 'Capannone industriale', cantiereCodice: 'NA-2026-002', importo: 218_000, data: '2026-04-20', scadenza: '2026-05-05', status: 'pending' },
  { id: 's4', numero: 'SAL-014/6', cantiere: 'Via Roma 42', cantiereCodice: 'NA-2025-014', importo: 78_900, data: '2026-03-25', scadenza: '2026-04-02', status: 'confermato', approvatore: 'Comune Napoli' },
  { id: 's5', numero: 'SAL-022/8', cantiere: 'Biogas Caserta', cantiereCodice: 'CE-2025-022', importo: 124_500, data: '2026-03-15', scadenza: '2026-03-22', status: 'confermato', approvatore: 'Green Energy' },
  { id: 's6', numero: 'SAL-038/3', cantiere: 'Strada provinciale 87', cantiereCodice: 'NA-2025-038', importo: 89_200, data: '2026-04-10', scadenza: '2026-04-19', status: 'scaduto' },
]

export interface SicurezzaCheck {
  id: string
  cantiere: string
  cantiereCodice: string
  tipo: 'POS' | 'PSC' | 'DPI' | 'Visita medica' | 'Formazione' | 'Audit ASL'
  ultima: string
  prossima: string
  responsabile: string
  status: 'ok' | 'warning' | 'critico'
  note?: string
}

export const SICUREZZA: SicurezzaCheck[] = [
  { id: 'sec1', cantiere: 'Via Roma 42', cantiereCodice: 'NA-2025-014', tipo: 'POS', ultima: '2026-03-15', prossima: '2026-09-15', responsabile: 'RSPP Marco Bianchi', status: 'ok' },
  { id: 'sec2', cantiere: 'Biogas Caserta', cantiereCodice: 'CE-2025-022', tipo: 'PSC', ultima: '2026-04-02', prossima: '2026-05-02', responsabile: 'CSE Ing. Verdi', status: 'warning', note: 'Aggiornamento richiesto post variante' },
  { id: 'sec3', cantiere: 'Capannone industriale', cantiereCodice: 'NA-2026-002', tipo: 'DPI', ultima: '2026-04-15', prossima: '2026-04-22', responsabile: 'Capocantiere Galli', status: 'critico', note: '3 caschi danneggiati da sostituire' },
  { id: 'sec4', cantiere: 'Residenza Pineta', cantiereCodice: 'LT-2026-002', tipo: 'Formazione', ultima: '2026-02-10', prossima: '2026-08-10', responsabile: 'RSPP Marco Bianchi', status: 'ok' },
  { id: 'sec5', cantiere: 'Villa Ronchi', cantiereCodice: 'NA-2026-011', tipo: 'Visita medica', ultima: '2026-04-01', prossima: '2027-04-01', responsabile: 'Med. Comp. Dr. Rossi', status: 'ok' },
  { id: 'sec6', cantiere: 'Via Roma 42', cantiereCodice: 'NA-2025-014', tipo: 'Audit ASL', ultima: '2026-01-20', prossima: '2026-05-20', responsabile: 'ASL NA1', status: 'warning', note: 'Audit a campione previsto' },
]

export interface MagazzinoItem {
  id: string
  codice: string
  descrizione: string
  categoria: 'Cemento' | 'Ferro' | 'Inerti' | 'Isolanti' | 'Impianti' | 'Finiture'
  uds: string
  giacenza: number
  minimo: number
  prezzoMedio: number
  ultimoCarico: string
  fornitore: string
}

export const MAGAZZINO: MagazzinoItem[] = [
  { id: 'm1', codice: 'CEM-R32-25', descrizione: 'Cemento R32.5 - sacco 25kg', categoria: 'Cemento', uds: 'sacco', giacenza: 220, minimo: 50, prezzoMedio: 8.4, ultimoCarico: '2026-04-12', fornitore: 'Edilizia Marra' },
  { id: 'm2', codice: 'FER-B450-16', descrizione: 'Tondo per c.a. B450C Ø16', categoria: 'Ferro', uds: 'kg', giacenza: 1820, minimo: 500, prezzoMedio: 1.18, ultimoCarico: '2026-04-08', fornitore: 'SiderSud' },
  { id: 'm3', codice: 'INE-PIE-30', descrizione: 'Pietrisco 0/30 mm', categoria: 'Inerti', uds: 'm³', giacenza: 84, minimo: 30, prezzoMedio: 22.0, ultimoCarico: '2026-04-15', fornitore: 'Cave Caserta' },
  { id: 'm4', codice: 'ISO-XPS-50', descrizione: 'Pannello XPS 50mm 1.25x0.6m', categoria: 'Isolanti', uds: 'pz', giacenza: 28, minimo: 40, prezzoMedio: 14.5, ultimoCarico: '2026-03-22', fornitore: 'Termoedil' },
  { id: 'm5', codice: 'IMP-CAV-NYM', descrizione: 'Cavo unipolare 2.5mm² NYM-J', categoria: 'Impianti', uds: 'm', giacenza: 1450, minimo: 500, prezzoMedio: 0.62, ultimoCarico: '2026-04-05', fornitore: 'Elettro Caserta' },
  { id: 'm6', codice: 'FIN-PIA-CER', descrizione: 'Piastrelle ceramica 30x60', categoria: 'Finiture', uds: 'm²', giacenza: 12, minimo: 30, prezzoMedio: 18.9, ultimoCarico: '2026-03-30', fornitore: 'Marazzi Distribution' },
  { id: 'm7', codice: 'FER-RET-200', descrizione: 'Rete elettrosaldata Ø8 20x20', categoria: 'Ferro', uds: 'pz', giacenza: 95, minimo: 30, prezzoMedio: 28.4, ultimoCarico: '2026-04-10', fornitore: 'SiderSud' },
  { id: 'm8', codice: 'CEM-MAL-PR', descrizione: 'Malta pronta premiscelata 25kg', categoria: 'Cemento', uds: 'sacco', giacenza: 145, minimo: 60, prezzoMedio: 9.8, ultimoCarico: '2026-04-14', fornitore: 'Edilizia Marra' },
  { id: 'm9', codice: 'FIN-PIT-AC', descrizione: 'Pittura lavabile bianca 14L', categoria: 'Finiture', uds: 'lt', giacenza: 86, minimo: 40, prezzoMedio: 4.2, ultimoCarico: '2026-04-02', fornitore: 'Sikkens Pro' },
  { id: 'm10', codice: 'IMP-TUB-MULT', descrizione: 'Tubo multistrato 16x2 - 200m', categoria: 'Impianti', uds: 'rotolo', giacenza: 8, minimo: 5, prezzoMedio: 145.0, ultimoCarico: '2026-03-28', fornitore: 'TermoIdraulica Sud' },
]
