import {
  Plus,
  FileText,
  Calendar,
  BarChart3,
  Search,
  Users,
  Wallet,
  Folder,
  Receipt,
  Tag,
  Truck,
  ChefHat,
  Scale,
  ShoppingBag,
  Package,
  Heart,
} from 'lucide-react'
import type { DemoSuiteConfig } from '@/components/demo/DemoAppTemplate'

export const buildSuiteDemo: DemoSuiteConfig = {
  id: 'buildsuite',
  name: 'BuildSuite',
  tagline: 'Edilizia & Costruzioni',
  accent: '#06B6D4',
  sidebar: [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'cantieri', label: 'Cantieri', sublabel: '12' },
    { id: 'computo', label: 'Computo metrico' },
    { id: 'sal', label: 'SAL', sublabel: '3' },
    { id: 'rfi', label: 'RFI', sublabel: '3' },
    { id: 'sicurezza', label: 'Sicurezza' },
    { id: 'fornitori', label: 'Fornitori' },
    { id: 'personale', label: 'Personale' },
    { id: 'mezzi', label: 'Mezzi & Attrezzature' },
    { id: 'magazzino', label: 'Magazzino' },
    { id: 'documenti', label: 'Documenti' },
  ],
  kpis: [
    { label: 'Cantieri attivi', value: '12', delta: '+2 questo mese', trend: 'up' },
    { label: 'Budget totale', value: '€4.82M', delta: '+12.4%', trend: 'up' },
    { label: 'SAL in attesa', value: '3', delta: '€186K', trend: 'flat' },
    { label: 'Varianti pending', value: '5', delta: '2 critiche', trend: 'flat' },
    { label: 'RFI aperte', value: '3', delta: '-2 vs scorsa sett', trend: 'down' },
    { label: 'Punch list', value: '47', delta: '12 chiusi oggi', trend: 'up' },
  ],
  quickActions: [
    { label: 'Nuovo cantiere', icon: Plus },
    { label: 'Nuovo SAL', icon: FileText },
    { label: 'Calendario', icon: Calendar },
    { label: 'Report', icon: BarChart3 },
    { label: 'Cerca', icon: Search },
    { label: 'Personale', icon: Users },
  ],
  table: {
    title: 'Cantieri attivi',
    columns: ['Cantiere', 'Cliente', 'Avanzamento', 'Margine', 'Scadenza'],
    rows: [
      ['Via Roma 42 · Napoli', 'Acme Costruzioni', '74%', '18.9%', '22 lug 2026'],
      ['Residenza Pineta · LT', 'Studio Mignano', '42%', '21.4%', '14 giu 2026'],
      ['Biogas Caserta', 'Green Energy', '91%', '9.1%', '15 giu 2026'],
      ['Ampliamento scuola', 'Comune Sessa', '28%', '7.2%', '10 giu 2026'],
      ['Villa Ronchi', 'Privato', '15%', '24.8%', '21 ago 2026'],
    ],
  },
  panels: [
    {
      title: 'Scadenze imminenti',
      content: (
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>Consegna SAL #7 · Via Roma</span>
            <span className="opacity-60">30 apr</span>
          </li>
          <li className="flex justify-between">
            <span>Verifica sicurezza · Biogas</span>
            <span className="opacity-60">5 mag</span>
          </li>
          <li className="flex justify-between">
            <span>Scadenza DURC fornitore</span>
            <span className="opacity-60">12 mag</span>
          </li>
        </ul>
      ),
    },
    {
      title: 'CoreMind suggerisce',
      content: (
        <div className="text-sm space-y-2">
          <p>
            Il cantiere <strong>Biogas Caserta</strong> ha margine sotto il 10%.
          </p>
          <p className="opacity-70">
            Causa principale: extra-costi materiali del 14% vs stima. Vuoi che generi un&apos;analisi
            di recupero marginalità?
          </p>
        </div>
      ),
    },
  ],
}

export const legalMindDemo: DemoSuiteConfig = {
  id: 'legalmind',
  name: 'LegalMind',
  tagline: 'Studi Legali',
  accent: '#D4A521',
  sidebar: [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'fascicoli', label: 'Fascicoli', sublabel: '47' },
    { id: 'atti', label: 'Atti & Documenti' },
    { id: 'scadenziario', label: 'Scadenziario', sublabel: '5' },
    { id: 'clienti', label: 'Clienti' },
    { id: 'contabilita', label: 'Contabilità forense' },
    { id: 'pct', label: 'PCT Telematico' },
    { id: 'osservatorio', label: 'Osservatorio Normativo' },
    { id: 'giurisprudenza', label: 'Giurisprudenza' },
    { id: 'gdpr', label: 'Privacy & GDPR' },
  ],
  kpis: [
    { label: 'Fascicoli attivi', value: '47', delta: '+3 questa sett', trend: 'up' },
    { label: 'Scadenze oggi', value: '5', delta: '2 urgenti', trend: 'flat' },
    { label: 'Udienze settimana', value: '8', delta: '3 telematiche', trend: 'flat' },
    { label: 'Fatturato mese', value: '€24.5K', delta: '+8.7%', trend: 'up' },
    { label: 'Ore fatturate', value: '142h', delta: '92% recuperabili', trend: 'up' },
    { label: 'AI queries', value: '89', delta: 'CoreMind attivo', trend: 'flat' },
  ],
  quickActions: [
    { label: 'Nuovo fascicolo', icon: Plus },
    { label: 'Atto da template', icon: FileText },
    { label: 'Scadenziario', icon: Calendar },
    { label: 'Nuovo cliente', icon: Users },
    { label: 'Cerca giurisprudenza', icon: Search },
    { label: 'Parcella', icon: Wallet },
  ],
  table: {
    title: 'Fascicoli con scadenza imminente',
    columns: ['N. RG', 'Tipo', 'Cliente', 'Foro', 'Valore', 'Prossima udienza'],
    rows: [
      ['1234/2026', 'Civile', 'Rossi Mario', 'Tribunale Napoli', '€85.000', '02 mag 2026'],
      ['987/2025', 'Lavoro', 'Bianchi S.r.l.', 'Trib. Lavoro Roma', '€42.300', '06 mag 2026'],
      ['456/2026', 'Famiglia', 'Verdi Anna', 'Trib. Caserta', '—', '12 mag 2026'],
      ['2210/2024', 'Penale', 'Imputato XY', 'GIP Roma', '—', '15 mag 2026'],
      ['78/2026', 'Tributario', 'Alfa S.p.A.', 'CTR Lazio', '€156.000', '22 mag 2026'],
    ],
  },
  panels: [
    {
      title: 'Scadenze critiche (24h)',
      content: (
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>Memoria 183 c.p.c. · 1234/2026</span>
            <span className="opacity-60 text-danger">Domani 09:00</span>
          </li>
          <li className="flex justify-between">
            <span>Comparsa di costituzione</span>
            <span className="opacity-60">28 apr</span>
          </li>
          <li className="flex justify-between">
            <span>Ricorso CTR · Alfa S.p.A.</span>
            <span className="opacity-60">02 mag</span>
          </li>
        </ul>
      ),
    },
    {
      title: 'CoreMind suggerisce',
      content: (
        <div className="text-sm space-y-2">
          <p>
            Trovate <strong>3 sentenze recenti</strong> della Cassazione rilevanti per il fascicolo
            1234/2026.
          </p>
          <p className="opacity-70">
            Sez. III Civ. n. 12.847/2026 modifica l&apos;orientamento sulla responsabilità
            condominiale. Vuoi che integri la massima nella memoria in preparazione?
          </p>
        </div>
      ),
    },
  ],
}

export const foodSuiteDemo: DemoSuiteConfig = {
  id: 'foodsuite',
  name: 'FoodSuite',
  tagline: 'Ristorazione',
  accent: '#F59E0B',
  sidebar: [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'menu', label: 'Menu', sublabel: '64' },
    { id: 'ordini', label: 'Ordini fornitori', sublabel: '7' },
    { id: 'magazzino', label: 'Magazzino' },
    { id: 'haccp', label: 'HACCP' },
    { id: 'foodcost', label: 'Food Cost' },
    { id: 'fornitori', label: 'Fornitori' },
    { id: 'personale', label: 'Personale' },
    { id: 'riservazioni', label: 'Riservazioni', sublabel: '24' },
  ],
  kpis: [
    { label: 'Coperti oggi', value: '124', delta: '+12% vs ieri', trend: 'up' },
    { label: 'Food cost medio', value: '28.4%', delta: '-1.6pp', trend: 'down' },
    { label: 'Margine sala', value: '€2.840', delta: '+€340', trend: 'up' },
    { label: 'Ordini pendenti', value: '7', delta: '€1.230 totale', trend: 'flat' },
    { label: 'Stock critico', value: '4', delta: 'da riordinare', trend: 'flat' },
    { label: 'HACCP check', value: '12/12', delta: 'tutti ok', trend: 'up' },
  ],
  quickActions: [
    { label: 'Nuovo ordine', icon: Plus },
    { label: 'Aggiorna menu', icon: ChefHat },
    { label: 'Riservazioni', icon: Calendar },
    { label: 'Verifica HACCP', icon: FileText },
    { label: 'Inventario', icon: Package },
    { label: 'Fornitori', icon: Truck },
  ],
  table: {
    title: 'Ordini fornitori in corso',
    columns: ['Fornitore', 'Categoria', 'Importo', 'Consegna', 'Stato'],
    rows: [
      ['Cooperativa Pesca Sud', 'Ittico fresco', '€420', '27 apr h.6:00', 'Confermato'],
      ['Caseificio Battipaglia', 'Latticini', '€185', '27 apr h.7:30', 'In transito'],
      ['Vinicola del Sannio', 'Vini', '€340', '28 apr', 'In preparazione'],
      ['Forno Antico', 'Pane', '€95', 'Quotidiano h.5:00', 'Ricorrente'],
      ['Ortofrutta Caserta', 'Frutta & Verdura', '€210', '27 apr h.5:30', 'Confermato'],
    ],
  },
  panels: [
    {
      title: 'Stock sotto soglia',
      content: (
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>Olio EVO Coratina · 2L</span>
            <span className="opacity-60 text-danger">Critico</span>
          </li>
          <li className="flex justify-between">
            <span>Parmigiano 24m · 1.2kg</span>
            <span className="opacity-60 text-warning">Basso</span>
          </li>
          <li className="flex justify-between">
            <span>Tonno fresco · 0.8kg</span>
            <span className="opacity-60 text-warning">Basso</span>
          </li>
        </ul>
      ),
    },
    {
      title: 'CoreMind suggerisce',
      content: (
        <div className="text-sm space-y-2">
          <p>
            Il piatto <strong>&quot;Risotto al tartufo&quot;</strong> ha food cost 41% — sopra
            soglia.
          </p>
          <p className="opacity-70">
            Costo tartufo +18% questo mese. Vuoi che proponga 3 varianti di menu con food cost
            target del 30%?
          </p>
        </div>
      ),
    },
  ],
}

export const retailSuiteDemo: DemoSuiteConfig = {
  id: 'retailsuite',
  name: 'RetailSuite',
  tagline: 'Retail & E-commerce',
  accent: '#EC4899',
  sidebar: [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'vendite', label: 'Vendite' },
    { id: 'pos', label: 'POS', sublabel: 'Live' },
    { id: 'magazzino', label: 'Magazzino' },
    { id: 'clienti', label: 'Clienti' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'loyalty', label: 'Loyalty' },
    { id: 'campagne', label: 'Campagne' },
    { id: 'analytics', label: 'Analytics' },
  ],
  kpis: [
    { label: 'Scontrini oggi', value: '184', delta: '+9.2%', trend: 'up' },
    { label: 'Fatturato giornaliero', value: '€8.420', delta: '+€720', trend: 'up' },
    { label: 'Carrello medio', value: '€45,76', delta: '+€2,30', trend: 'up' },
    { label: 'Margine medio', value: '34.2%', delta: '+0.8pp', trend: 'up' },
    { label: 'Clienti loyalty', value: '67%', delta: '+3pp', trend: 'up' },
    { label: 'Resi 7gg', value: '2.1%', delta: '-0.4pp', trend: 'down' },
  ],
  quickActions: [
    { label: 'Nuova vendita', icon: Plus },
    { label: 'Riassortimento', icon: Package },
    { label: 'Nuova campagna', icon: Tag },
    { label: 'Cliente VIP', icon: Heart },
    { label: 'Listini', icon: Receipt },
    { label: 'Report', icon: BarChart3 },
  ],
  table: {
    title: 'Ultime vendite POS',
    columns: ['Scontrino', 'Ora', 'Articoli', 'Importo', 'Cliente', 'Pagamento'],
    rows: [
      ['#04821', '14:32', '5', '€49,00', 'M.Verdi (VIP)', 'Carta'],
      ['#04820', '14:21', '3', '€28,50', 'Anonimo', 'Contanti'],
      ['#04819', '14:08', '7', '€84,30', 'L.Russo', 'Carta'],
      ['#04818', '13:55', '2', '€16,40', 'Anonimo', 'Pay'],
      ['#04817', '13:40', '4', '€62,80', 'C.Bianchi (VIP)', 'Carta'],
    ],
  },
  panels: [
    {
      title: 'Top performer settimana',
      content: (
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>Pasta Gragnano IGP</span>
            <span className="opacity-60">142 unità</span>
          </li>
          <li className="flex justify-between">
            <span>Olio EVO Coratina 0.5L</span>
            <span className="opacity-60">98 unità</span>
          </li>
          <li className="flex justify-between">
            <span>Vino Falanghina del Sannio</span>
            <span className="opacity-60">76 unità</span>
          </li>
        </ul>
      ),
    },
    {
      title: 'CoreMind suggerisce',
      content: (
        <div className="text-sm space-y-2">
          <p>
            <strong>34 clienti VIP</strong> non visitano il negozio da più di 30 giorni.
          </p>
          <p className="opacity-70">
            Loyalty score medio: 7.8/10. Vuoi che generi una campagna SMS con voucher 15% e link
            personalizzato?
          </p>
        </div>
      ),
    },
  ],
}
