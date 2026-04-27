/**
 * LegalMind — datasets realistici.
 */

export type FascicoloTipo = 'Civile' | 'Penale' | 'Lavoro' | 'Famiglia' | 'Tributario' | 'Amministrativo'
export type FascicoloStatus = 'aperta' | 'in-corso' | 'in-revisione' | 'chiusa'

export interface Fascicolo {
  id: string
  rg: string
  cliente: string
  controparte?: string
  tipo: FascicoloTipo
  foro: string
  giudice?: string
  valore?: number
  apertura: string
  prossimaUdienza?: string
  status: FascicoloStatus
  oreFatturate: number
  parcellaPreventivata: number
}

export const FASCICOLI: Fascicolo[] = [
  { id: 'f1', rg: '1234/2026', cliente: 'Rossi Mario', controparte: 'Bianchi Carlo', tipo: 'Civile', foro: 'Tribunale Napoli', giudice: 'Dott.ssa Esposito', valore: 85_000, apertura: '2025-09-12', prossimaUdienza: '2026-05-02', status: 'in-corso', oreFatturate: 28, parcellaPreventivata: 4_500 },
  { id: 'f2', rg: '987/2025', cliente: 'Bianchi S.r.l.', controparte: 'Dipendente XY', tipo: 'Lavoro', foro: 'Tribunale del Lavoro Roma', valore: 42_300, apertura: '2025-04-18', prossimaUdienza: '2026-05-06', status: 'in-corso', oreFatturate: 64, parcellaPreventivata: 8_200 },
  { id: 'f3', rg: '456/2026', cliente: 'Verdi Anna', controparte: 'Verdi Mario', tipo: 'Famiglia', foro: 'Tribunale Caserta', apertura: '2026-01-08', prossimaUdienza: '2026-05-12', status: 'in-corso', oreFatturate: 18, parcellaPreventivata: 3_200 },
  { id: 'f4', rg: '2210/2024', cliente: 'Imputato XY', tipo: 'Penale', foro: 'GIP Roma', giudice: 'Dott. Russo', apertura: '2024-11-22', prossimaUdienza: '2026-05-15', status: 'in-corso', oreFatturate: 92, parcellaPreventivata: 12_500 },
  { id: 'f5', rg: '78/2026', cliente: 'Alfa S.p.A.', controparte: 'Agenzia Entrate', tipo: 'Tributario', foro: 'Commissione Tributaria Regionale Lazio', valore: 156_000, apertura: '2026-02-03', prossimaUdienza: '2026-05-22', status: 'in-corso', oreFatturate: 36, parcellaPreventivata: 9_800 },
  { id: 'f6', rg: '3421/2025', cliente: 'Studio Medico Rossi', controparte: 'ASL', tipo: 'Amministrativo', foro: 'TAR Campania', valore: 28_500, apertura: '2025-11-04', prossimaUdienza: '2026-06-04', status: 'aperta', oreFatturate: 8, parcellaPreventivata: 4_200 },
  { id: 'f7', rg: '1567/2026', cliente: 'Costruzioni Sud S.r.l.', controparte: 'Privato', tipo: 'Civile', foro: 'Tribunale Napoli', valore: 240_000, apertura: '2026-03-15', prossimaUdienza: '2026-06-10', status: 'aperta', oreFatturate: 12, parcellaPreventivata: 11_500 },
  { id: 'f8', rg: '892/2024', cliente: 'Ferraro Group', tipo: 'Civile', foro: 'Corte Appello Roma', valore: 380_000, apertura: '2024-06-22', status: 'in-revisione', oreFatturate: 142, parcellaPreventivata: 18_500 },
  { id: 'f9', rg: '2104/2025', cliente: 'Verde Luca', controparte: 'INAIL', tipo: 'Lavoro', foro: 'Tribunale Lavoro Napoli', valore: 18_500, apertura: '2025-07-30', prossimaUdienza: '2026-06-18', status: 'in-corso', oreFatturate: 24, parcellaPreventivata: 3_800 },
  { id: 'f10', rg: '675/2024', cliente: 'Pizzeria Da Mario', tipo: 'Tributario', foro: 'CTP Caserta', valore: 14_200, apertura: '2024-09-12', status: 'chiusa', oreFatturate: 28, parcellaPreventivata: 2_400 },
  { id: 'f11', rg: '3890/2026', cliente: 'Banco Sud S.p.A.', controparte: 'Debitore PMI', tipo: 'Civile', foro: 'Tribunale Napoli', valore: 58_000, apertura: '2026-02-28', prossimaUdienza: '2026-07-04', status: 'aperta', oreFatturate: 6, parcellaPreventivata: 4_900 },
  { id: 'f12', rg: '442/2026', cliente: 'Famiglia Conte', tipo: 'Famiglia', foro: 'Tribunale Famiglia Napoli', apertura: '2026-01-22', prossimaUdienza: '2026-05-28', status: 'in-corso', oreFatturate: 22, parcellaPreventivata: 4_200 },
]

export interface Scadenza {
  id: string
  fascicoloRg: string
  cliente: string
  tipo: 'Memoria 183 c.p.c.' | 'Comparsa di costituzione' | 'Ricorso' | 'Memoria difensiva' | 'Note conclusionali' | 'Atto di appello' | 'Reclamo' | 'Istanza'
  data: string
  ora?: string
  priorita: 'alta' | 'media' | 'bassa'
  status: 'pending' | 'risolto' | 'scaduto'
  note?: string
}

export const SCADENZE: Scadenza[] = [
  { id: 'sc1', fascicoloRg: '1234/2026', cliente: 'Rossi Mario', tipo: 'Memoria 183 c.p.c.', data: '2026-04-28', ora: '09:00', priorita: 'alta', status: 'pending', note: 'Da depositare via PCT' },
  { id: 'sc2', fascicoloRg: '987/2025', cliente: 'Bianchi S.r.l.', tipo: 'Comparsa di costituzione', data: '2026-04-28', priorita: 'alta', status: 'pending' },
  { id: 'sc3', fascicoloRg: '78/2026', cliente: 'Alfa S.p.A.', tipo: 'Ricorso', data: '2026-05-02', priorita: 'alta', status: 'pending', note: 'CTR Lazio - termine perentorio' },
  { id: 'sc4', fascicoloRg: '2210/2024', cliente: 'Imputato XY', tipo: 'Memoria difensiva', data: '2026-05-08', priorita: 'media', status: 'pending' },
  { id: 'sc5', fascicoloRg: '892/2024', cliente: 'Ferraro Group', tipo: 'Note conclusionali', data: '2026-05-10', priorita: 'media', status: 'pending' },
  { id: 'sc6', fascicoloRg: '456/2026', cliente: 'Verdi Anna', tipo: 'Istanza', data: '2026-04-30', priorita: 'media', status: 'pending' },
  { id: 'sc7', fascicoloRg: '675/2024', cliente: 'Pizzeria Da Mario', tipo: 'Reclamo', data: '2026-04-20', priorita: 'alta', status: 'risolto' },
  { id: 'sc8', fascicoloRg: '3421/2025', cliente: 'Studio Medico Rossi', tipo: 'Memoria difensiva', data: '2026-05-15', priorita: 'media', status: 'pending' },
]

export interface PCTDeposito {
  id: string
  fascicoloRg: string
  atto: string
  data: string
  ufficio: string
  status: 'depositato' | 'in-elaborazione' | 'rifiutato'
  ricevutaAccettazione?: string
  note?: string
}

export const PCT_DEPOSITI: PCTDeposito[] = [
  { id: 'pct1', fascicoloRg: '1234/2026', atto: 'Atto di citazione', data: '2026-04-15 14:32', ufficio: 'Tribunale Napoli', status: 'depositato', ricevutaAccettazione: 'PCT-2026-984321' },
  { id: 'pct2', fascicoloRg: '987/2025', atto: 'Memoria difensiva', data: '2026-04-22 11:08', ufficio: 'Tribunale Lavoro Roma', status: 'depositato', ricevutaAccettazione: 'PCT-2026-987654' },
  { id: 'pct3', fascicoloRg: '78/2026', atto: 'Ricorso CTR', data: '2026-04-26 09:18', ufficio: 'CTR Lazio', status: 'in-elaborazione' },
  { id: 'pct4', fascicoloRg: '456/2026', atto: 'Comparsa di risposta', data: '2026-04-10 16:45', ufficio: 'Tribunale Caserta', status: 'depositato', ricevutaAccettazione: 'PCT-2026-985112' },
  { id: 'pct5', fascicoloRg: '2210/2024', atto: 'Memoria 415 bis c.p.p.', data: '2026-04-25 18:02', ufficio: 'GIP Roma', status: 'rifiutato', note: 'Procura speciale mancante - da reinviare' },
  { id: 'pct6', fascicoloRg: '892/2024', atto: 'Note conclusionali', data: '2026-04-19 10:30', ufficio: 'Corte Appello Roma', status: 'depositato', ricevutaAccettazione: 'PCT-2026-984888' },
]
