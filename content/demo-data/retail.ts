/**
 * RetailSuite — datasets realistici.
 */

export interface Vendita {
  id: string
  scontrino: string
  data: string
  ora: string
  articoli: number
  importo: number
  cliente: string
  loyalty: boolean
  pagamento: 'Carta' | 'Contanti' | 'ApplePay' | 'GooglePay' | 'Satispay' | 'Bonifico'
  cassa: 'Cassa 1' | 'Cassa 2' | 'Cassa 3' | 'E-commerce'
  margine: number // %
}

export const VENDITE: Vendita[] = [
  { id: 'v1', scontrino: '#04821', data: '2026-04-26', ora: '14:32', articoli: 5, importo: 49.0, cliente: 'M. Verdi', loyalty: true, pagamento: 'Carta', cassa: 'Cassa 1', margine: 36.4 },
  { id: 'v2', scontrino: '#04820', data: '2026-04-26', ora: '14:21', articoli: 3, importo: 28.5, cliente: 'Anonimo', loyalty: false, pagamento: 'Contanti', cassa: 'Cassa 2', margine: 31.2 },
  { id: 'v3', scontrino: '#04819', data: '2026-04-26', ora: '14:08', articoli: 7, importo: 84.3, cliente: 'L. Russo', loyalty: true, pagamento: 'Carta', cassa: 'Cassa 1', margine: 38.7 },
  { id: 'v4', scontrino: '#04818', data: '2026-04-26', ora: '13:55', articoli: 2, importo: 16.4, cliente: 'Anonimo', loyalty: false, pagamento: 'ApplePay', cassa: 'Cassa 3', margine: 28.1 },
  { id: 'v5', scontrino: '#04817', data: '2026-04-26', ora: '13:40', articoli: 4, importo: 62.8, cliente: 'C. Bianchi', loyalty: true, pagamento: 'Carta', cassa: 'Cassa 2', margine: 35.5 },
  { id: 'v6', scontrino: '#04816', data: '2026-04-26', ora: '13:22', articoli: 8, importo: 124.6, cliente: 'F. Gallo', loyalty: true, pagamento: 'Carta', cassa: 'Cassa 1', margine: 33.9 },
  { id: 'v7', scontrino: '#04815', data: '2026-04-26', ora: '12:58', articoli: 1, importo: 9.0, cliente: 'Anonimo', loyalty: false, pagamento: 'Satispay', cassa: 'Cassa 3', margine: 42.0 },
  { id: 'v8', scontrino: '#04814', data: '2026-04-26', ora: '12:45', articoli: 6, importo: 78.5, cliente: 'P. Esposito', loyalty: true, pagamento: 'Carta', cassa: 'Cassa 2', margine: 37.1 },
  { id: 'v9', scontrino: 'EC-2421', data: '2026-04-26', ora: '12:18', articoli: 4, importo: 56.0, cliente: 'A. Conte', loyalty: true, pagamento: 'Carta', cassa: 'E-commerce', margine: 39.8 },
  { id: 'v10', scontrino: '#04813', data: '2026-04-26', ora: '11:42', articoli: 3, importo: 32.4, cliente: 'Anonimo', loyalty: false, pagamento: 'Contanti', cassa: 'Cassa 1', margine: 30.5 },
  { id: 'v11', scontrino: '#04812', data: '2026-04-26', ora: '11:20', articoli: 9, importo: 142.8, cliente: 'R. Mancini', loyalty: true, pagamento: 'Carta', cassa: 'Cassa 2', margine: 40.2 },
  { id: 'v12', scontrino: 'EC-2420', data: '2026-04-26', ora: '11:05', articoli: 2, importo: 24.0, cliente: 'M. Lupo', loyalty: false, pagamento: 'Bonifico', cassa: 'E-commerce', margine: 33.5 },
  { id: 'v13', scontrino: '#04811', data: '2026-04-26', ora: '10:48', articoli: 5, importo: 67.2, cliente: 'S. Greco', loyalty: true, pagamento: 'GooglePay', cassa: 'Cassa 3', margine: 35.8 },
  { id: 'v14', scontrino: '#04810', data: '2026-04-26', ora: '10:30', articoli: 4, importo: 48.6, cliente: 'Anonimo', loyalty: false, pagamento: 'Carta', cassa: 'Cassa 1', margine: 32.4 },
]

export interface Prodotto {
  id: string
  sku: string
  nome: string
  categoria: 'Pasta' | 'Olio' | 'Vino' | 'Conserve' | 'Salumi' | 'Formaggi' | 'Dolci' | 'Bevande'
  prezzo: number
  costo: number
  margine: number // %
  giacenza: number
  minimo: number
  vendite30gg: number
  trend: 'up' | 'down' | 'flat'
}

export const PRODOTTI: Prodotto[] = [
  { id: 'p1', sku: 'PST-GRG-IGP-500', nome: 'Pasta Gragnano IGP - 500g', categoria: 'Pasta', prezzo: 4.20, costo: 1.85, margine: 56.0, giacenza: 412, minimo: 100, vendite30gg: 320, trend: 'up' },
  { id: 'p2', sku: 'OLI-EVO-COR-05', nome: 'Olio EVO Coratina 0.5L', categoria: 'Olio', prezzo: 12.50, costo: 5.40, margine: 56.8, giacenza: 184, minimo: 60, vendite30gg: 198, trend: 'up' },
  { id: 'p3', sku: 'VIN-FAL-DOC-75', nome: 'Falanghina del Sannio DOC 0.75L', categoria: 'Vino', prezzo: 12.00, costo: 4.20, margine: 65.0, giacenza: 96, minimo: 30, vendite30gg: 142, trend: 'up' },
  { id: 'p4', sku: 'OLI-EVO-COR-1L', nome: 'Olio EVO Coratina 1L', categoria: 'Olio', prezzo: 22.00, costo: 9.80, margine: 55.5, giacenza: 8, minimo: 20, vendite30gg: 86, trend: 'down' },
  { id: 'p5', sku: 'CON-POM-SM-400', nome: 'Pomodorini San Marzano DOP', categoria: 'Conserve', prezzo: 4.80, costo: 1.95, margine: 59.4, giacenza: 245, minimo: 80, vendite30gg: 178, trend: 'flat' },
  { id: 'p6', sku: 'SAL-PRO-CRD-100', nome: 'Prosciutto Crudo di Parma DOP - 100g', categoria: 'Salumi', prezzo: 8.40, costo: 4.20, margine: 50.0, giacenza: 38, minimo: 30, vendite30gg: 92, trend: 'up' },
  { id: 'p7', sku: 'FRM-PARM-24M', nome: 'Parmigiano Reggiano 24 mesi - 1kg', categoria: 'Formaggi', prezzo: 28.00, costo: 14.80, margine: 47.1, giacenza: 22, minimo: 15, vendite30gg: 48, trend: 'flat' },
  { id: 'p8', sku: 'VIN-AGL-RIS-75', nome: 'Aglianico Riserva 0.75L', categoria: 'Vino', prezzo: 18.00, costo: 7.50, margine: 58.3, giacenza: 64, minimo: 25, vendite30gg: 78, trend: 'up' },
  { id: 'p9', sku: 'CON-PES-AL', nome: 'Pesto alla Genovese DOP - 180g', categoria: 'Conserve', prezzo: 6.20, costo: 2.80, margine: 54.8, giacenza: 142, minimo: 50, vendite30gg: 124, trend: 'up' },
  { id: 'p10', sku: 'DOL-CAN-SIC', nome: 'Cantucci alle mandorle - 250g', categoria: 'Dolci', prezzo: 5.80, costo: 2.20, margine: 62.1, giacenza: 96, minimo: 40, vendite30gg: 86, trend: 'flat' },
  { id: 'p11', sku: 'BEV-LIM-AM-50', nome: 'Limoncello Amalfi 0.5L', categoria: 'Bevande', prezzo: 14.50, costo: 6.00, margine: 58.6, giacenza: 84, minimo: 30, vendite30gg: 64, trend: 'up' },
  { id: 'p12', sku: 'PST-GRG-IGP-1K', nome: 'Pasta Gragnano IGP - 1kg', categoria: 'Pasta', prezzo: 7.50, costo: 3.20, margine: 57.3, giacenza: 156, minimo: 50, vendite30gg: 142, trend: 'up' },
]

export interface Campagna {
  id: string
  nome: string
  canale: 'Email' | 'SMS' | 'Push' | 'Social'
  status: 'attiva' | 'pianificata' | 'completata' | 'in pausa'
  target: string
  inviati: number
  aperture: number // %
  conversioni: number // %
  fatturatoGenerato: number
  inizio: string
  fine?: string
}

export const CAMPAGNE: Campagna[] = [
  { id: 'k1', nome: 'Promo Pasqua VIP', canale: 'Email', status: 'completata', target: 'Cliente loyalty Gold', inviati: 480, aperture: 64.2, conversioni: 18.4, fatturatoGenerato: 6_840, inizio: '2026-03-25', fine: '2026-04-04' },
  { id: 'k2', nome: 'Voucher 15% inattivi 30gg', canale: 'SMS', status: 'attiva', target: '34 clienti VIP inattivi', inviati: 34, aperture: 92.0, conversioni: 0, fatturatoGenerato: 0, inizio: '2026-04-25' },
  { id: 'k3', nome: 'Lancio nuova selezione vini', canale: 'Email', status: 'attiva', target: 'Cluster wine-lovers', inviati: 1240, aperture: 41.8, conversioni: 8.9, fatturatoGenerato: 4_320, inizio: '2026-04-20' },
  { id: 'k4', nome: 'Cross-sell formaggi+vino', canale: 'Push', status: 'pianificata', target: 'Cluster acquirenti formaggi 90gg', inviati: 0, aperture: 0, conversioni: 0, fatturatoGenerato: 0, inizio: '2026-04-30' },
  { id: 'k5', nome: 'Festa della Mamma', canale: 'Social', status: 'pianificata', target: 'Pubblico locale + look-alike', inviati: 0, aperture: 0, conversioni: 0, fatturatoGenerato: 0, inizio: '2026-05-05' },
  { id: 'k6', nome: 'Recupero carrello e-commerce', canale: 'Email', status: 'attiva', target: 'Carrelli abbandonati >€30', inviati: 142, aperture: 58.5, conversioni: 22.5, fatturatoGenerato: 1_920, inizio: '2026-04-15' },
  { id: 'k7', nome: 'Black Weekend Settembre', canale: 'Email', status: 'pianificata', target: 'Tutti i loyalty', inviati: 0, aperture: 0, conversioni: 0, fatturatoGenerato: 0, inizio: '2026-09-12' },
]
