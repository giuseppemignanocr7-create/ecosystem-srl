/**
 * Italian synonym/alias dictionary for CoreMind retrieval.
 * Each cluster groups words that should match each other.
 * The retrieval engine expands query tokens to include all cluster siblings.
 */
export const SYNONYMS: string[][] = [
  // Pricing
  ['prezzo', 'prezzi', 'costo', 'costi', 'tariffa', 'tariffe', 'listino', 'quotazione', 'spesa', 'investimento', 'budget', 'canone', 'abbonamento', 'piano', 'piani'],
  ['gratis', 'gratuito', 'gratuita', 'free', 'omaggio', 'senza costo'],
  ['sconto', 'sconti', 'promozione', 'offerta', 'risparmio'],
  ['fattura', 'fatturazione', 'fatturare', 'fatturato', 'invoicing'],
  ['pagamento', 'pagamenti', 'pagare', 'paga', 'addebito', 'metodo di pagamento'],

  // Demo / trial
  ['demo', 'prova', 'provare', 'test', 'testare', 'trial', 'dimostrazione', 'tour', 'preview', 'anteprima'],
  ['gratis', 'free', 'senza impegno'],

  // Suite & products
  ['suite', 'modulo', 'moduli', 'verticale', 'verticali', 'prodotto', 'prodotti', 'soluzione', 'soluzioni', 'gestionale', 'software'],
  ['edilizia', 'cantiere', 'cantieri', 'costruzioni', 'buildsuite', 'build suite', 'costruttore'],
  ['legale', 'studio', 'avvocato', 'avvocati', 'legalmind', 'legal mind', 'studio legale'],
  ['dentista', 'dentale', 'dental', 'odontoiatria', 'odontoiatra', 'dentalsuite'],
  ['ristorante', 'ristorazione', 'cucina', 'food', 'foodsuite', 'horeca', 'pizzeria', 'bar'],
  ['retail', 'negozio', 'punto vendita', 'pos', 'cassa', 'ecommerce', 'e-commerce', 'shop', 'retailsuite'],
  ['immobiliare', 'affitto', 'rent', 'rentsuite', 'property', 'gestione immobili', 'locazione'],
  ['it', 'software house', 'devops', 'sviluppo', 'techsuite', 'sviluppatori'],
  ['pa', 'pubblica amministrazione', 'comune', 'caf', 'patronato', 'civiccore', 'consulente del lavoro'],
  ['veterinaria', 'veterinario', 'animale', 'animali', 'pet', 'petverse', 'clinica veterinaria'],
  ['pesca', 'ittico', 'fishsuite', 'mare', 'porto'],
  ['ok chef', 'okchef', 'approvvigionamento', 'cucina professionale'],
  ['archon', 'archon os', 'multi-entity', 'gruppo', 'holding'],

  // CoreMind / AI
  ['ai', 'ia', 'intelligenza artificiale', 'machine learning', 'ml', 'coremind', 'core mind', 'assistente'],
  ['chat', 'chatbot', 'conversazione', 'messaggio', 'messaggi'],
  ['gpt', 'claude', 'llm', 'modello'],

  // Integrations
  ['integrazione', 'integrazioni', 'connettore', 'connettori', 'api', 'webhook', 'collegamento', 'collegare', 'integrare', 'sincronizzazione'],
  ['fatture in cloud', 'fic', 'aruba', 'teamsystem', 'zucchetti', 'sap'],

  // Security / privacy / compliance
  ['sicurezza', 'sicuro', 'protezione', 'crittografia', 'cifratura', 'encryption'],
  ['privacy', 'gdpr', 'dati personali', 'consenso'],
  ['compliance', 'conformità', 'normativa', 'norme', 'regolamento'],
  ['backup', 'backup automatico', 'salvataggio', 'ripristino', 'disaster recovery'],
  ['hosting', 'server', 'cloud', 'data center', 'aws', 'azure'],
  ['dati', 'database', 'archiviazione', 'storage', 'esportare', 'export', 'csv', 'json'],

  // Support
  ['supporto', 'assistenza', 'help', 'aiuto', 'customer care', 'servizio clienti', 'helpdesk'],
  ['sla', 'tempi di risposta', 'risposta', 'tempistica', 'urgenza'],
  ['onboarding', 'attivazione', 'setup', 'configurazione', 'avvio', 'iniziare', 'partire'],
  ['training', 'formazione', 'corso', 'tutorial', 'manuale', 'documentazione'],

  // Contact
  ['contatto', 'contatti', 'contattare', 'chiamare', 'scrivere', 'email', 'mail', 'telefono', 'numero'],
  ['appuntamento', 'meeting', 'riunione', 'call', 'videocall', 'videochiamata'],
  ['indirizzo', 'sede', 'ufficio', 'azienda', 'dove siete'],

  // Company
  ['ecosystem', 'eco', 'azienda', 'società', 'srl', 's.r.l', 'team', 'fondatore', 'founder', 'staff'],
  ['storia', 'mission', 'visione', 'chi siete', 'about'],

  // Technical
  ['installazione', 'installare', 'installare il software', 'download', 'scaricare'],
  ['cloud', 'on-premise', 'on premise', 'self-hosted', 'self hosted', 'saas'],
  ['utenti', 'utente', 'login', 'accesso', 'account', 'profilo', 'sso'],
  ['mobile', 'app', 'smartphone', 'telefono', 'ios', 'android'],
  ['browser', 'chrome', 'firefox', 'safari', 'edge', 'compatibilità'],
  ['velocità', 'performance', 'lentezza', 'lento', 'veloce'],
  ['errore', 'bug', 'problema', 'malfunzionamento', 'non funziona', 'crash'],

  // Common verbs
  ['creare', 'crea', 'aggiungere', 'aggiungi', 'inserire', 'inserisci', 'nuovo'],
  ['eliminare', 'elimina', 'cancellare', 'cancella', 'rimuovere', 'rimuovi'],
  ['modificare', 'modifica', 'cambiare', 'cambia', 'aggiornare', 'aggiorna', 'editare'],
  ['cercare', 'cerca', 'trovare', 'trova', 'filtrare', 'filtra'],
  ['esportare', 'export', 'scaricare', 'download', 'estrarre'],
  ['importare', 'import', 'caricare', 'upload'],

  // Roles
  ['amministratore', 'admin', 'super user', 'titolare'],
  ['utente standard', 'collaboratore', 'dipendente', 'team member'],

  // Time / scheduling
  ['quando', 'tempo', 'durata', 'quanto tempo', 'quanto ci vuole'],
  ['oggi', 'subito', 'immediato', 'istantaneo', 'real-time', 'tempo reale'],

  // Categories of features
  ['report', 'reportistica', 'analisi', 'analytics', 'dashboard', 'kpi', 'statistiche', 'metriche'],
  ['notifica', 'notifiche', 'avviso', 'avvisi', 'alert', 'reminder', 'promemoria'],
  ['calendario', 'agenda', 'appuntamenti', 'scadenze', 'eventi'],
  ['documento', 'documenti', 'file', 'pdf', 'allegato', 'allegati'],
  ['firma', 'firmare', 'firma digitale', 'firma elettronica', 'docusign'],
  ['workflow', 'flusso', 'processo', 'automazione', 'automatico'],

  // Specific products
  ['sal', 'stato avanzamento lavori', 'avanzamento'],
  ['haccp', 'igiene alimentare', 'sicurezza alimentare'],
  ['pct', 'processo civile telematico', 'deposito telematico'],
  ['isee', 'modello isee', 'reddito'],
  ['privacy', 'gdpr', 'consenso informato'],
]

/**
 * Build a flat reverse-index: word → cluster index
 */
export function buildSynonymIndex(): Map<string, number[]> {
  const idx = new Map<string, number[]>()
  SYNONYMS.forEach((cluster, i) => {
    cluster.forEach((word) => {
      const key = normalize(word)
      const existing = idx.get(key) ?? []
      if (!existing.includes(i)) existing.push(i)
      idx.set(key, existing)
    })
  })
  return idx
}

/**
 * Lowercase, strip Italian diacritics, collapse whitespace.
 */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Tokenize and expand with synonyms.
 * Returns Set of normalized terms relevant to the query.
 */
export function expandQuery(query: string, idx?: Map<string, number[]>): Set<string> {
  const synIdx = idx ?? buildSynonymIndex()
  const norm = normalize(query)
  const tokens = norm.split(' ').filter((t) => t.length >= 2)
  const expanded = new Set<string>(tokens)

  for (const tok of tokens) {
    const clusters = synIdx.get(tok)
    if (clusters) {
      for (const c of clusters) {
        for (const sib of SYNONYMS[c]) {
          expanded.add(normalize(sib))
        }
      }
    }
  }

  // Also try bigrams (for multi-word synonyms like "studio legale")
  for (let i = 0; i < tokens.length - 1; i++) {
    const bigram = `${tokens[i]} ${tokens[i + 1]}`
    const clusters = synIdx.get(bigram)
    if (clusters) {
      for (const c of clusters) {
        for (const sib of SYNONYMS[c]) {
          expanded.add(normalize(sib))
        }
      }
    }
  }

  return expanded
}
