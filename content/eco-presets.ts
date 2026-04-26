import { Zap, Recycle, Trash2, Award, MapPin, Activity } from 'lucide-react'
import type { EcoConfig } from '@/components/suite/EcoGenModule'

const baseTabs = (variant: string) => [
  { id: 'esg', label: 'ESG Carbon' },
  { id: 'consumi', label: 'Consumi' },
  { id: 'rifiuti', label: 'Rifiuti' },
  { id: 'cert', label: 'Certificazioni' },
  { id: 'siti', label: 'Siti Energia' },
  { id: 'letture', label: 'Letture' },
  { id: 'predictions', label: 'Predizioni AI' },
]

const ECO_DEFAULT: Omit<EcoConfig, 'sectorLabel' | 'description' | 'metrics' | 'tabs' | 'predictions'> = {}

function build(
  sectorLabel: string,
  description: string,
  metrics: EcoConfig['metrics'],
  tabsData: Record<string, EcoConfig['tabs'][number]['rows']>,
  predictions: string[],
): EcoConfig {
  const tabs = baseTabs(sectorLabel).map((t) => ({
    ...t,
    rows: tabsData[t.id] ?? [],
  }))
  return { sectorLabel, description, metrics, tabs, predictions, ...ECO_DEFAULT }
}

export const ECO_PRESETS: Record<string, EcoConfig> = {
  buildsuite: build(
    'EDILIZIA',
    'Monitora consumi cantieri, gestione rifiuti edili, certificazioni ambientali (LEED, CAM) e impatto CO₂. CoreMind prevede sprechi e ottimizza la logistica.',
    [
      { label: 'Energia', value: 142500, unit: 'kWh', sublabel: 'mese', icon: Zap, accent: '#FBBF24' },
      { label: 'Riciclo', value: 78, unit: '%', sublabel: '12.4 ton riciclate', icon: Recycle, decimals: 0, accent: '#10B981' },
      { label: 'Rifiuti', value: 18.6, unit: 'ton', decimals: 1, sublabel: 'C&D', icon: Trash2, accent: '#F97316' },
      { label: 'Certif.', value: 5, unit: 'attive', sublabel: 'CAM · LEED', icon: Award, accent: '#3B82F6' },
      { label: 'Siti', value: 12, unit: 'attivi', sublabel: 'cantieri', icon: MapPin, accent: '#8B5CF6' },
      { label: 'Potenza', value: 240, unit: 'kW', sublabel: 'picco', icon: Activity, accent: '#EC4899' },
    ],
    {
      esg: [
        { label: 'Emissioni Scope 1 (gasolio mezzi)', value: '8.2 tCO₂e', delta: '-12%', status: 'good' },
        { label: 'Emissioni Scope 2 (elettricità)', value: '14.6 tCO₂e', delta: '-4%', status: 'good' },
        { label: 'Emissioni Scope 3 (materiali)', value: '142.8 tCO₂e', delta: '+2%', status: 'warn' },
      ],
      consumi: [
        { label: 'Cantiere Via Roma', value: '38.4 MWh', delta: '+8%', status: 'warn' },
        { label: 'Cantiere Biogas Caserta', value: '52.1 MWh', delta: '-3%', status: 'good' },
        { label: 'Cantiere Residenza Pineta', value: '24.0 MWh', delta: '-1%', status: 'good' },
      ],
      rifiuti: [
        { label: 'Inerti recuperati (CER 17 01)', value: '12.4 ton', delta: '78%', status: 'good' },
        { label: 'Imballaggi misti', value: '2.1 ton', delta: '12%', status: 'good' },
        { label: 'Rifiuti pericolosi', value: '0.4 ton', delta: '2%', status: 'warn' },
      ],
      cert: [
        { label: 'CAM Edilizia (DM 23/06/22)', value: 'Conforme', status: 'good' },
        { label: 'LEED Gold Cantiere Pineta', value: 'In corso', status: 'warn' },
        { label: 'ISO 14001', value: 'Valida 2027', status: 'good' },
        { label: 'Albo Gestori Ambientali', value: 'Cat. 2-bis', status: 'good' },
        { label: 'F-Gas certificazione', value: 'Valida', status: 'good' },
      ],
      siti: [
        { label: 'Via Roma 42 · Napoli', value: '38.4 MWh' },
        { label: 'Biogas Caserta', value: '52.1 MWh' },
        { label: 'Residenza Pineta · LT', value: '24.0 MWh' },
      ],
      letture: [
        { label: 'Contatore principale · oggi 06:00', value: '2.847 kWh' },
        { label: 'Contatore principale · ieri 18:00', value: '2.612 kWh' },
        { label: 'Generatore mobile · ultima', value: '180 L gasolio' },
      ],
    },
    [
      'Risparmio stimato €4.200/mese sostituendo i 3 generatori più vecchi con modelli ibridi.',
      'Cantiere Biogas Caserta: rischio superamento soglia rumore-emissioni nelle ore 14:00–16:00.',
      'Recupero 22% extra rifiuti inerti possibile con nuova filiera proposta a Sessa Aurunca.',
    ],
  ),

  legalmind: build(
    'STUDI LEGALI',
    'Carbon footprint di studio: consumi ufficio, paperless score, viaggi clienti, archiviazione digitale. Pratiche dematerializzate e impatto reale.',
    [
      { label: 'Energia', value: 8420, unit: 'kWh', sublabel: 'mese', icon: Zap, accent: '#FBBF24' },
      { label: 'Paperless', value: 94, unit: '%', sublabel: '6% cartaceo residuo', icon: Recycle, accent: '#10B981' },
      { label: 'Carta', value: 0.3, unit: 'ton', decimals: 1, sublabel: 'anno', icon: Trash2, accent: '#F97316' },
      { label: 'Certif.', value: 2, unit: 'attive', sublabel: 'GDPR · ISO', icon: Award, accent: '#3B82F6' },
      { label: 'Sedi', value: 3, unit: 'attive', sublabel: 'Roma · NA · CE', icon: MapPin, accent: '#8B5CF6' },
      { label: 'Picco', value: 14, unit: 'kW', sublabel: 'condizionamento', icon: Activity, accent: '#EC4899' },
    ],
    {
      esg: [
        { label: 'Emissioni viaggi udienze', value: '1.8 tCO₂e', delta: '-22%', status: 'good' },
        { label: 'Emissioni elettricità sedi', value: '3.4 tCO₂e', delta: '-6%', status: 'good' },
        { label: 'Stampa & cartaceo residuo', value: '0.4 tCO₂e', delta: '-44%', status: 'good' },
      ],
      consumi: [
        { label: 'Sede Roma', value: '4.2 MWh' },
        { label: 'Sede Napoli', value: '2.8 MWh' },
        { label: 'Sede Caserta', value: '1.4 MWh' },
      ],
      rifiuti: [
        { label: 'Carta riciclata', value: '0.28 ton', delta: '94%', status: 'good' },
        { label: 'Toner & cartucce', value: '24 unità', status: 'good' },
      ],
      cert: [
        { label: 'GDPR DPO interno', value: 'Conforme', status: 'good' },
        { label: 'ISO 27001 documentale', value: 'In rinnovo', status: 'warn' },
      ],
      siti: [
        { label: 'Sede Roma EUR', value: '4.2 MWh' },
        { label: 'Sede Napoli', value: '2.8 MWh' },
        { label: 'Sede Caserta', value: '1.4 MWh' },
      ],
      letture: [
        { label: 'Smart meter Roma · oggi', value: '142 kWh' },
        { label: 'Smart meter Napoli · oggi', value: '98 kWh' },
      ],
    },
    [
      'Riduzione 18% emissioni sostituendo 12 udienze fisiche/mese con telematiche (PCT).',
      'ROI fotovoltaico sede Roma: payback 6.4 anni con risparmio €5.800/anno.',
      'Archivio cartaceo residuo: digitalizzando i 4.200 fascicoli storici risparmi 1.6 ton CO₂/anno.',
    ],
  ),

  foodsuite: build(
    'RISTORAZIONE',
    'Food waste, consumi cucina, refrigerazione, certificazioni HACCP/biologico, tracciabilità filiera corta. CoreMind ottimizza menu engineering.',
    [
      { label: 'Energia', value: 28400, unit: 'kWh', sublabel: 'mese', icon: Zap, accent: '#FBBF24' },
      { label: 'Riciclo', value: 82, unit: '%', sublabel: 'organico differenziato', icon: Recycle, accent: '#10B981' },
      { label: 'Food waste', value: 1.2, unit: 'ton', decimals: 1, sublabel: 'mese', icon: Trash2, accent: '#F97316' },
      { label: 'Certif.', value: 4, unit: 'attive', sublabel: 'HACCP · BIO', icon: Award, accent: '#3B82F6' },
      { label: 'Punti', value: 2, unit: 'attivi', sublabel: 'sale + cucina', icon: MapPin, accent: '#8B5CF6' },
      { label: 'Picco', value: 48, unit: 'kW', sublabel: 'cucina servizio', icon: Activity, accent: '#EC4899' },
    ],
    {
      esg: [
        { label: 'Refrigerazione (F-gas)', value: '2.4 tCO₂e', delta: '-8%', status: 'good' },
        { label: 'Cottura (gas naturale)', value: '4.1 tCO₂e', delta: '+1%', status: 'warn' },
        { label: 'Trasporto fornitori', value: '1.6 tCO₂e', delta: '-14%', status: 'good' },
      ],
      consumi: [
        { label: 'Cucina', value: '18.4 MWh' },
        { label: 'Sala & climatizzazione', value: '7.6 MWh' },
        { label: 'Lavaggio', value: '2.4 MWh' },
      ],
      rifiuti: [
        { label: 'Organico (FORSU)', value: '0.98 ton' },
        { label: 'Olio esausto', value: '120 L' },
        { label: 'Vetro', value: '0.42 ton' },
      ],
      cert: [
        { label: 'HACCP autocontrollo', value: 'Aggiornato 2026', status: 'good' },
        { label: 'BIO ICEA', value: '32 prodotti', status: 'good' },
        { label: 'KM0 Slow Food', value: 'Aderente', status: 'good' },
        { label: 'Filiera Pesca Sostenibile', value: 'In corso', status: 'warn' },
      ],
      siti: [
        { label: 'Locale principale', value: '28.4 MWh' },
        { label: 'Magazzino refrigerato', value: '4.1 MWh' },
      ],
      letture: [
        { label: 'Cucina · oggi pranzo', value: '486 kWh' },
        { label: 'Frigo banchi · ultime 24h', value: '142 kWh' },
      ],
    },
    [
      'Sostituendo 2 frigo da 12 anni: risparmio €2.400/anno + -1.8 tCO₂e.',
      'Food cost piatto "Risotto al tartufo" 41% — proposta variante stagionale a 28%.',
      'Spostando ordini ortofrutta a fornitore 12km vs 80km: -2.4 tCO₂e/anno.',
    ],
  ),

  retailsuite: build(
    'RETAIL',
    'Consumi punto vendita, illuminazione, refrigerazione, packaging sostenibile, e-commerce delivery footprint. ROI green per ogni store.',
    [
      { label: 'Energia', value: 18200, unit: 'kWh', sublabel: 'mese', icon: Zap, accent: '#FBBF24' },
      { label: 'Riciclo', value: 71, unit: '%', sublabel: 'imballaggi', icon: Recycle, accent: '#10B981' },
      { label: 'Rifiuti', value: 2.4, unit: 'ton', decimals: 1, sublabel: 'mese', icon: Trash2, accent: '#F97316' },
      { label: 'Certif.', value: 3, unit: 'attive', sublabel: 'B Corp · FSC', icon: Award, accent: '#3B82F6' },
      { label: 'Store', value: 6, unit: 'attivi', sublabel: 'multi-brand', icon: MapPin, accent: '#8B5CF6' },
      { label: 'Picco', value: 32, unit: 'kW', sublabel: 'sabato pom', icon: Activity, accent: '#EC4899' },
    ],
    {
      esg: [
        { label: 'Illuminazione & climatizzazione', value: '5.8 tCO₂e' },
        { label: 'Logistica e-commerce', value: '3.2 tCO₂e', delta: '-9%', status: 'good' },
        { label: 'Packaging consegne', value: '0.8 tCO₂e', delta: '-22%', status: 'good' },
      ],
      consumi: [
        { label: 'Store flagship Napoli', value: '6.4 MWh' },
        { label: 'Store Caserta Vanvitelli', value: '4.2 MWh' },
        { label: 'Magazzino centrale', value: '3.8 MWh' },
      ],
      rifiuti: [
        { label: 'Cartone riciclato', value: '1.6 ton', status: 'good' },
        { label: 'Plastica imballaggi', value: '0.4 ton' },
      ],
      cert: [
        { label: 'B Corp Pending', value: 'Score 78', status: 'warn' },
        { label: 'FSC Packaging', value: 'Conforme', status: 'good' },
        { label: 'Carbon Neutral Delivery', value: 'Attivo', status: 'good' },
      ],
      siti: [
        { label: 'Flagship Napoli Chiaia', value: '6.4 MWh' },
        { label: 'Store Caserta', value: '4.2 MWh' },
        { label: 'Pop-up Roma', value: '1.8 MWh' },
      ],
      letture: [
        { label: 'POS principale · oggi', value: '184 scontrini' },
        { label: 'Climatizzazione store · ora', value: '14.2 kW' },
      ],
    },
    [
      'Switch LED full su 4 store residui: -38% consumo illuminazione, payback 14 mesi.',
      'Spostando 12% ordini e-commerce a corrieri elettrici last-mile: -1.4 tCO₂e/mese.',
      'Pakaging compostabile per linea food: +€0.12/spedizione, -22% peso rifiuti totali.',
    ],
  ),
}

// Default fallback for suites without a custom preset
export const ECO_DEFAULT_PRESET = (sectorLabel: string): EcoConfig => ({
  sectorLabel,
  description:
    "EcoGen porta il monitoraggio ESG dentro la tua suite. Consumi energetici, rifiuti, certificazioni, predizioni AI sui costi e sull'impatto ambientale. Tutto integrato, niente fogli Excel paralleli.",
  metrics: [
    { label: 'Energia', value: 12400, unit: 'kWh', sublabel: 'mese', icon: Zap, accent: '#FBBF24' },
    { label: 'Riciclo', value: 64, unit: '%', sublabel: 'differenziato', icon: Recycle, accent: '#10B981' },
    { label: 'Rifiuti', value: 0.8, unit: 'ton', decimals: 1, sublabel: 'mese', icon: Trash2, accent: '#F97316' },
    { label: 'Certif.', value: 2, unit: 'attive', sublabel: 'ISO 14001', icon: Award, accent: '#3B82F6' },
    { label: 'Siti', value: 1, unit: 'attivi', sublabel: 'sede unica', icon: MapPin, accent: '#8B5CF6' },
    { label: 'Picco', value: 18, unit: 'kW', sublabel: 'medio', icon: Activity, accent: '#EC4899' },
  ],
  tabs: [
    { id: 'esg', label: 'ESG Carbon', rows: [
      { label: 'Emissioni Scope 1', value: '1.2 tCO₂e', delta: '-4%', status: 'good' },
      { label: 'Emissioni Scope 2', value: '4.8 tCO₂e', delta: '-2%', status: 'good' },
      { label: 'Emissioni Scope 3', value: '9.2 tCO₂e', delta: '+1%', status: 'warn' },
    ]},
    { id: 'consumi', label: 'Consumi', rows: [
      { label: 'Sede principale', value: '12.4 MWh' },
    ]},
    { id: 'rifiuti', label: 'Rifiuti', rows: [
      { label: 'Differenziata', value: '0.5 ton', status: 'good' },
      { label: 'Indifferenziato', value: '0.3 ton', status: 'warn' },
    ]},
    { id: 'cert', label: 'Certificazioni', rows: [
      { label: 'ISO 14001', value: 'Valida', status: 'good' },
      { label: 'GDPR', value: 'Conforme', status: 'good' },
    ]},
    { id: 'siti', label: 'Siti Energia', rows: [
      { label: 'Sede principale', value: '12.4 MWh' },
    ]},
    { id: 'letture', label: 'Letture', rows: [
      { label: 'Contatore generale · oggi', value: '412 kWh' },
    ]},
    { id: 'predictions', label: 'Predizioni AI', rows: [] },
  ],
  predictions: [
    'Risparmio 14% potenziale switching fornitore energia con gara CoreMind.',
    'Compliance CSRD: pronta entro Q4 2026 con dati attuali.',
    'Rotazione fornitori km0: -8% emissioni Scope 3 stimato.',
  ],
})
