/**
 * FoodSuite — datasets realistici.
 */

export interface PiattoMenu {
  id: string
  nome: string
  categoria: 'Antipasto' | 'Primo' | 'Secondo' | 'Pizza' | 'Dolce' | 'Bevanda'
  prezzo: number
  costo: number // food cost
  margine: number // %
  vendite30gg: number
  rating: number // 1-5
  attivo: boolean
}

export const MENU: PiattoMenu[] = [
  { id: 'pm1', nome: 'Tartare di tonno con avocado', categoria: 'Antipasto', prezzo: 16.0, costo: 5.8, margine: 63.7, vendite30gg: 184, rating: 4.7, attivo: true },
  { id: 'pm2', nome: 'Burrata pugliese e pomodorini', categoria: 'Antipasto', prezzo: 12.0, costo: 3.4, margine: 71.7, vendite30gg: 220, rating: 4.8, attivo: true },
  { id: 'pm3', nome: 'Risotto al tartufo nero', categoria: 'Primo', prezzo: 22.0, costo: 9.1, margine: 58.6, vendite30gg: 96, rating: 4.5, attivo: true },
  { id: 'pm4', nome: 'Spaghetti vongole e bottarga', categoria: 'Primo', prezzo: 18.0, costo: 5.4, margine: 70.0, vendite30gg: 312, rating: 4.9, attivo: true },
  { id: 'pm5', nome: 'Pasta fresca al ragù di cinghiale', categoria: 'Primo', prezzo: 14.0, costo: 4.2, margine: 70.0, vendite30gg: 198, rating: 4.6, attivo: true },
  { id: 'pm6', nome: 'Branzino in crosta di sale', categoria: 'Secondo', prezzo: 26.0, costo: 8.8, margine: 66.2, vendite30gg: 88, rating: 4.7, attivo: true },
  { id: 'pm7', nome: 'Filetto di manzo al pepe verde', categoria: 'Secondo', prezzo: 28.0, costo: 11.4, margine: 59.3, vendite30gg: 120, rating: 4.6, attivo: true },
  { id: 'pm8', nome: 'Tagliata di tonno scottato', categoria: 'Secondo', prezzo: 24.0, costo: 8.2, margine: 65.8, vendite30gg: 92, rating: 4.5, attivo: true },
  { id: 'pm9', nome: 'Pizza Margherita DOP', categoria: 'Pizza', prezzo: 9.0, costo: 1.8, margine: 80.0, vendite30gg: 540, rating: 4.8, attivo: true },
  { id: 'pm10', nome: 'Pizza Tartufata', categoria: 'Pizza', prezzo: 14.0, costo: 4.8, margine: 65.7, vendite30gg: 142, rating: 4.6, attivo: true },
  { id: 'pm11', nome: 'Pizza Mare e Monti', categoria: 'Pizza', prezzo: 13.0, costo: 4.4, margine: 66.2, vendite30gg: 168, rating: 4.7, attivo: true },
  { id: 'pm12', nome: 'Tiramisù della casa', categoria: 'Dolce', prezzo: 7.0, costo: 1.4, margine: 80.0, vendite30gg: 282, rating: 4.9, attivo: true },
  { id: 'pm13', nome: 'Cannolo siciliano', categoria: 'Dolce', prezzo: 6.0, costo: 1.2, margine: 80.0, vendite30gg: 184, rating: 4.7, attivo: true },
  { id: 'pm14', nome: 'Falanghina del Sannio DOC', categoria: 'Bevanda', prezzo: 24.0, costo: 7.0, margine: 70.8, vendite30gg: 96, rating: 4.6, attivo: true },
  { id: 'pm15', nome: 'Aglianico Riserva', categoria: 'Bevanda', prezzo: 32.0, costo: 11.5, margine: 64.1, vendite30gg: 64, rating: 4.7, attivo: true },
]

export interface OrdineFornitore {
  id: string
  numero: string
  fornitore: string
  categoria: 'Pesce' | 'Carne' | 'Verdura' | 'Latticini' | 'Vino' | 'Pane' | 'Surgelati' | 'Drogheria'
  importo: number
  consegna: string
  status: 'confermato' | 'in-transito' | 'pending' | 'in-revisione'
  articoli: number
}

export const ORDINI: OrdineFornitore[] = [
  { id: 'or1', numero: 'PO-2026-0418', fornitore: 'Cooperativa Pesca Sud', categoria: 'Pesce', importo: 420.0, consegna: '2026-04-27 06:00', status: 'confermato', articoli: 8 },
  { id: 'or2', numero: 'PO-2026-0419', fornitore: 'Caseificio Battipaglia', categoria: 'Latticini', importo: 185.0, consegna: '2026-04-27 07:30', status: 'in-transito', articoli: 12 },
  { id: 'or3', numero: 'PO-2026-0420', fornitore: 'Vinicola del Sannio', categoria: 'Vino', importo: 340.0, consegna: '2026-04-28 10:00', status: 'pending', articoli: 6 },
  { id: 'or4', numero: 'PO-2026-0421', fornitore: 'Forno Antico', categoria: 'Pane', importo: 95.0, consegna: '2026-04-27 05:00', status: 'confermato', articoli: 4 },
  { id: 'or5', numero: 'PO-2026-0422', fornitore: 'Ortofrutta Caserta', categoria: 'Verdura', importo: 210.0, consegna: '2026-04-27 05:30', status: 'confermato', articoli: 18 },
  { id: 'or6', numero: 'PO-2026-0423', fornitore: 'Macelleria Sapore', categoria: 'Carne', importo: 480.0, consegna: '2026-04-28 06:30', status: 'pending', articoli: 9 },
  { id: 'or7', numero: 'PO-2026-0424', fornitore: 'Surgelati Pro', categoria: 'Surgelati', importo: 320.0, consegna: '2026-04-29 14:00', status: 'pending', articoli: 14 },
  { id: 'or8', numero: 'PO-2026-0425', fornitore: 'Drogheria Italia', categoria: 'Drogheria', importo: 145.0, consegna: '2026-04-28 11:00', status: 'in-revisione', articoli: 22 },
]

export interface HACCPCheck {
  id: string
  area: 'Cucina' | 'Magazzino' | 'Frigorifero' | 'Sala' | 'Bagni' | 'Spogliatoio'
  controllo: string
  ultimoControllo: string
  responsabile: string
  status: 'ok' | 'warning' | 'critico'
  temperatura?: string
  note?: string
}

export const HACCP: HACCPCheck[] = [
  { id: 'h1', area: 'Frigorifero', controllo: 'Temperatura frigo carni', ultimoControllo: '2026-04-26 08:30', responsabile: 'Chef Marco', status: 'ok', temperatura: '+2.4°C' },
  { id: 'h2', area: 'Frigorifero', controllo: 'Temperatura frigo pesce', ultimoControllo: '2026-04-26 08:32', responsabile: 'Chef Marco', status: 'warning', temperatura: '+1.1°C', note: 'Limite inferiore - controllare termostato' },
  { id: 'h3', area: 'Cucina', controllo: 'Pulizia piani cottura', ultimoControllo: '2026-04-26 23:45', responsabile: 'Sous Chef Anna', status: 'ok' },
  { id: 'h4', area: 'Magazzino', controllo: 'Verifica scadenze conserve', ultimoControllo: '2026-04-25 17:00', responsabile: 'Magazziniere Luca', status: 'ok' },
  { id: 'h5', area: 'Cucina', controllo: 'Sanificazione utensili', ultimoControllo: '2026-04-26 23:50', responsabile: 'Lavapiatti Team', status: 'ok' },
  { id: 'h6', area: 'Sala', controllo: 'Pulizia tavoli e sedute', ultimoControllo: '2026-04-26 22:30', responsabile: 'Sala Team', status: 'ok' },
  { id: 'h7', area: 'Bagni', controllo: 'Sanificazione bagni clienti', ultimoControllo: '2026-04-26 21:00', responsabile: 'Pulizie Marta', status: 'ok' },
  { id: 'h8', area: 'Frigorifero', controllo: 'Temperatura frigo latticini', ultimoControllo: '2026-04-26 08:34', responsabile: 'Chef Marco', status: 'ok', temperatura: '+3.8°C' },
  { id: 'h9', area: 'Spogliatoio', controllo: 'Pulizia spogliatoi staff', ultimoControllo: '2026-04-25 22:00', responsabile: 'Pulizie Marta', status: 'warning', note: 'Da rifare oggi' },
  { id: 'h10', area: 'Cucina', controllo: 'Olio friggitrice - pulizia', ultimoControllo: '2026-04-26 14:15', responsabile: 'Chef Marco', status: 'ok' },
  { id: 'h11', area: 'Magazzino', controllo: 'Disinfestazione preventiva', ultimoControllo: '2026-04-20 09:00', responsabile: 'Ditta esterna', status: 'critico', note: 'Trattamento previsto domani' },
  { id: 'h12', area: 'Frigorifero', controllo: 'Temperatura cella freezer', ultimoControllo: '2026-04-26 08:36', responsabile: 'Chef Marco', status: 'ok', temperatura: '-22.4°C' },
]
