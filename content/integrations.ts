export interface Integration {
  name: string
  category: string
  description: string
  type: 'native' | 'connector' | 'middleware'
  popular?: boolean
}

export const INTEGRATIONS: Integration[] = [
  // ERP
  { name: 'SAP', category: 'ERP', description: 'Integrazione nativa S/4HANA', type: 'native', popular: true },
  { name: 'Oracle', category: 'ERP', description: 'Oracle NetSuite e Oracle Fusion', type: 'native' },
  { name: 'TeamSystem', category: 'ERP', description: 'Connettore ufficiale TeamSystem', type: 'native', popular: true },
  { name: 'Zucchetti', category: 'ERP', description: 'Infinity e AziendaWEB', type: 'native', popular: true },
  { name: 'Danea', category: 'ERP', description: 'Easyfatt e Fatture & Preventivi', type: 'native' },
  { name: 'Microsoft Dynamics', category: 'ERP', description: 'Business Central e NAV', type: 'native' },
  
  // Contabilità
  { name: 'Aruba Fatturazione', category: 'Contabilità', description: 'Fatturazione elettronica', type: 'native', popular: true },
  { name: 'Fatture in Cloud', category: 'Contabilità', description: 'Piattaforma contabile cloud', type: 'native', popular: true },
  { name: 'FattureWeb', category: 'Contabilità', description: 'Fatturazione elettronica PA', type: 'native' },
  { name: 'InfoCert', category: 'Contabilità', description: 'FatturaPA e conservazione', type: 'native' },
  { name: 'Agenzia Entrate', category: 'Contabilità', description: 'FatturaPA, liquidazioni, cassetto', type: 'native' },
  
  // CRM
  { name: 'HubSpot', category: 'CRM', description: 'CRM marketing e sales', type: 'native', popular: true },
  { name: 'Salesforce', category: 'CRM', description: 'Enterprise CRM', type: 'native', popular: true },
  { name: 'Pipedrive', category: 'CRM', description: 'Sales pipeline management', type: 'native' },
  { name: 'Zoho CRM', category: 'CRM', description: 'CRM completo per PMI', type: 'native' },
  
  // E-commerce
  { name: 'Shopify', category: 'E-commerce', description: 'Piattaforma e-commerce', type: 'native', popular: true },
  { name: 'WooCommerce', category: 'E-commerce', description: 'Plugin WordPress', type: 'native', popular: true },
  { name: 'Magento', category: 'E-commerce', description: 'Adobe Commerce', type: 'native' },
  { name: 'PrestaShop', category: 'E-commerce', description: 'Open source e-commerce', type: 'native' },
  { name: 'BigCommerce', category: 'E-commerce', description: 'SaaS e-commerce', type: 'native' },
  
  // Pagamenti
  { name: 'Stripe', category: 'Pagamenti', description: 'Pagamenti online', type: 'native', popular: true },
  { name: 'Nexi', category: 'Pagamenti', description: 'Carte e POS italiano', type: 'native', popular: true },
  { name: 'Satispay', category: 'Pagamenti', description: 'Pagamenti da app', type: 'native' },
  { name: 'PayPal', category: 'Pagamenti', description: 'Pagamenti internazionali', type: 'native' },
  { name: 'SumUp', category: 'Pagamenti', description: 'POS mobile', type: 'native' },
  
  // Hardware
  { name: 'SumUp Reader', category: 'Hardware', description: 'Lettore carte mobile', type: 'connector' },
  { name: 'Epson POS', category: 'Hardware', description: 'Stampanti fiscali', type: 'connector', popular: true },
  { name: 'Zebra', category: 'Hardware', description: 'Stampanti etichette', type: 'connector' },
  { name: 'Ingenico', category: 'Hardware', description: 'POS tradizionali', type: 'connector' },
  { name: 'Datalogic', category: 'Hardware', description: 'Scanner barcode', type: 'connector' },
  
  // AI Providers
  { name: 'Anthropic', category: 'AI Providers', description: 'Claude API', type: 'native', popular: true },
  { name: 'OpenAI', category: 'AI Providers', description: 'GPT API', type: 'native', popular: true },
  { name: 'Google AI', category: 'AI Providers', description: 'Gemini API', type: 'native' },
  { name: 'Mistral', category: 'AI Providers', description: 'Modelli europei', type: 'native' },
  { name: 'Azure OpenAI', category: 'AI Providers', description: 'GPT su Azure', type: 'native' },
  
  // PA Italiana
  { name: 'SDI', category: 'PA Italiana', description: 'Sistema FatturaPA', type: 'native', popular: true },
  { name: 'PEC', category: 'PA Italiana', description: 'Posta certificata', type: 'native', popular: true },
  { name: 'SPID', category: 'PA Italiana', description: 'Identità digitale', type: 'native' },
  { name: 'CIE', category: 'PA Italiana', description: 'Carta Identità Elettronica', type: 'native' },
  { name: 'PagoPA', category: 'PA Italiana', description: 'Pagamenti PA', type: 'native' },
  { name: 'INPS', category: 'PA Italiana', description: 'Gestione contributi', type: 'native' },
  { name: 'INAIL', category: 'PA Italiana', description: 'Gestione infortuni', type: 'native' },
  
  // Comunicazione
  { name: 'Telegram', category: 'Comunicazione', description: 'Bot e notifiche', type: 'native' },
  { name: 'WhatsApp Business', category: 'Comunicazione', description: 'API ufficiale Meta', type: 'native', popular: true },
  { name: 'Slack', category: 'Comunicazione', description: 'Workspace integration', type: 'native', popular: true },
  { name: 'Microsoft Teams', category: 'Comunicazione', description: 'Office 365 integration', type: 'native', popular: true },
  { name: 'Discord', category: 'Comunicazione', description: 'Community e support', type: 'native' },
  
  // Storage
  { name: 'Google Drive', category: 'Storage', description: 'Cloud storage', type: 'native' },
  { name: 'Dropbox', category: 'Storage', description: 'Cloud storage', type: 'native' },
  { name: 'OneDrive', category: 'Storage', description: 'Microsoft cloud', type: 'native' },
  { name: 'AWS S3', category: 'Storage', description: 'Object storage', type: 'native' },
  
  // Firma
  { name: 'DocuSign', category: 'Firma', description: 'Firma elettronica', type: 'native', popular: true },
  { name: 'Adobe Sign', category: 'Firma', description: 'Firma digitale', type: 'native' },
  { name: 'InfoCert Firma', category: 'Firma', description: 'Firma digitale italiana', type: 'native' },
]

export const CATEGORIES = Array.from(new Set(INTEGRATIONS.map(i => i.category)))
