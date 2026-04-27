/**
 * Preset realistici per i moduli delle demo suite.
 *
 * Chiave di lookup:
 *  1) `${suiteId}:${moduleId}` — se presente vince (es. "retailsuite:magazzino")
 *  2) `${moduleId}` — preset condiviso tra suite (es. "fascicoli")
 *  3) `fallbackModule(label)` — stato generico derivato dalla label
 */

export type ModulePreset = {
  title: string
  subtitle?: string
  stats?: { label: string; value: string; trend?: 'up' | 'down' | 'flat' }[]
  tableTitle: string
  columns: string[]
  rows: (string | number)[][]
  coreMindHint?: string
  primaryAction?: string
  filters?: string[]
}

export const MODULE_PRESETS: Record<string, ModulePreset> = {
  // ═══════════════════ BUILDSUITE ═══════════════════
  'buildsuite:cantieri': {
    title: 'Cantieri',
    subtitle: 'Gestione operativa dei cantieri attivi e in apertura',
    stats: [
      { label: 'Attivi', value: '12', trend: 'up' },
      { label: 'In apertura', value: '3' },
      { label: 'Valore totale', value: '€4.82M', trend: 'up' },
      { label: 'Margine medio', value: '16.2%' },
    ],
    tableTitle: 'Elenco cantieri',
    columns: ['Codice', 'Denominazione', 'Cliente', 'Avanzamento', 'Budget', 'PM', 'Stato'],
    rows: [
      ['C-2406', 'Via Roma 42 · NA', 'Acme Costruzioni', '74%', '€820K', 'M. Russo', 'In corso'],
      ['C-2411', 'Residenza Pineta · LT', 'Studio Mignano', '42%', '€1.2M', 'L. Bianchi', 'In corso'],
      ['C-2398', 'Biogas Caserta', 'Green Energy S.r.l.', '91%', '€540K', 'A. Verdi', 'Chiusura'],
      ['C-2502', 'Ampliamento scuola', 'Comune Sessa A.', '28%', '€950K', 'M. Russo', 'In corso'],
      ['C-2515', 'Villa Ronchi', 'Privato', '15%', '€310K', 'G. Neri', 'Avvio'],
      ['C-2521', 'Capannone Marcianise', 'Logistics SRL', '0%', '€1.1M', 'L. Bianchi', 'In apertura'],
    ],
    coreMindHint: 'Il cantiere "Ampliamento scuola" è sotto target di +6gg · vuoi rischedulare le squadre Edil-2 e Edil-5?',
    primaryAction: 'Nuovo cantiere',
    filters: ['Tutti', 'In corso', 'In apertura', 'Chiusura', 'Sospesi'],
  },
  'buildsuite:computo': {
    title: 'Computo metrico',
    subtitle: 'Voci di capitolato, prezziario DEI regionale e varianti',
    stats: [
      { label: 'Voci totali', value: '2.418' },
      { label: 'Varianti', value: '27', trend: 'up' },
      { label: 'Importo lordo', value: '€4.82M' },
    ],
    tableTitle: 'Voci del computo',
    columns: ['Codice', 'Descrizione', 'U.M.', 'Quantità', 'Prezzo unit.', 'Totale'],
    rows: [
      ['01.A01.010', 'Scavo di sbancamento', 'mc', '1.240', '€8,40', '€10.416'],
      ['02.A02.015', 'Calcestruzzo C25/30', 'mc', '186', '€142,00', '€26.412'],
      ['03.A01.020', 'Acciaio B450C', 'kg', '14.820', '€1,18', '€17.488'],
      ['04.A03.005', 'Muratura in laterizio', 'mq', '820', '€48,50', '€39.770'],
      ['07.A12.040', 'Intonaco civile', 'mq', '1.640', '€18,20', '€29.848'],
    ],
    coreMindHint: 'Ho trovato 3 voci duplicate nel capitolato · vuoi consolidarle?',
    primaryAction: 'Nuova voce',
  },
  'buildsuite:sal': {
    title: 'SAL · Stati Avanzamento Lavori',
    subtitle: 'Certificati di pagamento emessi e in lavorazione',
    stats: [
      { label: 'In attesa', value: '3', trend: 'flat' },
      { label: 'Valore pending', value: '€186K' },
      { label: 'Emessi YTD', value: '47' },
    ],
    tableTitle: 'SAL recenti',
    columns: ['N°', 'Cantiere', 'Periodo', 'Importo', 'Ritenute', 'Stato'],
    rows: [
      ['SAL-074', 'Via Roma 42', 'Mar 2026', '€72.400', '€3.620', 'Da firmare DL'],
      ['SAL-073', 'Biogas Caserta', 'Mar 2026', '€58.900', '€2.945', 'Approvato'],
      ['SAL-072', 'Residenza Pineta', 'Feb 2026', '€54.200', '€2.710', 'Pagato'],
      ['SAL-071', 'Ampliamento scuola', 'Feb 2026', '€41.800', '€2.090', 'Contabilizzato'],
    ],
    coreMindHint: 'SAL-074 ferma la firma DL da 8gg · vuoi che invii un sollecito all\'ing. Bianchi?',
    primaryAction: 'Nuovo SAL',
  },
  'buildsuite:rfi': {
    title: 'RFI · Request For Information',
    subtitle: 'Richieste di chiarimento tecnico DL ↔ Impresa',
    stats: [
      { label: 'Aperte', value: '3' },
      { label: 'Chiuse settimana', value: '7', trend: 'up' },
      { label: 'SLA medio', value: '2,4gg' },
    ],
    tableTitle: 'RFI aperte',
    columns: ['N°', 'Cantiere', 'Oggetto', 'Destinatario', 'Apertura', 'Stato'],
    rows: [
      ['RFI-112', 'Via Roma 42', 'Quota solaio piano -1', 'DL · Ing. Rossi', '22/04', 'In attesa'],
      ['RFI-113', 'Biogas Caserta', 'Coibentazione vasca', 'Progettista', '24/04', 'In attesa'],
      ['RFI-114', 'Residenza Pineta', 'Classe di esposizione cls', 'DL · Ing. Rossi', '25/04', 'Urgente'],
    ],
    coreMindHint: 'RFI-114 è marcata urgente ed è aperta da 2gg · genero un promemoria?',
    primaryAction: 'Apri RFI',
  },
  'buildsuite:sicurezza': {
    title: 'Sicurezza · PSC & DUVRI',
    subtitle: 'POS, riunioni coordinamento, DPI e formazione',
    stats: [
      { label: 'POS validi', value: '18 / 18' },
      { label: 'Infortuni YTD', value: '0', trend: 'flat' },
      { label: 'Formazioni scad.', value: '4' },
    ],
    tableTitle: 'Adempimenti sicurezza',
    columns: ['Cantiere', 'Documento', 'Responsabile', 'Scadenza', 'Stato'],
    rows: [
      ['Via Roma 42', 'POS Impresa Edil-A', 'CSE · Ing. Conte', '12/07/2026', 'Valido'],
      ['Biogas Caserta', 'DUVRI', 'RSPP', '30/06/2026', 'Valido'],
      ['Ampliamento scuola', 'Riunione coord. n°3', 'CSE · Ing. Conte', '05/05/2026', 'Pianificato'],
      ['Residenza Pineta', 'Corso formaz. ponteggi', '4 operai', '20/05/2026', 'In scadenza'],
    ],
    coreMindHint: '4 corsi formazione scadono entro 30gg · preparo la convocazione?',
    primaryAction: 'Nuovo adempimento',
  },
  'buildsuite:fornitori': {
    title: 'Fornitori',
    subtitle: 'Anagrafica fornitori qualificati e ordini aperti',
    stats: [
      { label: 'Attivi', value: '84' },
      { label: 'Ordini aperti', value: '12', trend: 'up' },
      { label: 'Spesa YTD', value: '€1.24M' },
    ],
    tableTitle: 'Fornitori principali',
    columns: ['Ragione sociale', 'Categoria', 'Ordini aperti', 'Spesa YTD', 'Rating'],
    rows: [
      ['Italcementi SpA', 'Cemento', '3', '€184K', '★★★★★'],
      ['Edil Sud SRL', 'Ferramenta', '4', '€98K', '★★★★☆'],
      ['Noleggi Caserta', 'Mezzi', '2', '€54K', '★★★★★'],
      ['Ceramiche Vietri', 'Pavimenti', '1', '€32K', '★★★★☆'],
      ['Ferro Meridionale', 'Acciaio', '2', '€127K', '★★★☆☆'],
    ],
    coreMindHint: 'Ferro Meridionale ha 2 DDT non abbinati a OdA · li verifico io?',
    primaryAction: 'Nuovo fornitore',
  },
  'buildsuite:personale': {
    title: 'Personale',
    subtitle: 'Operai, squadre, presenze e cantieri assegnati',
    stats: [
      { label: 'Operai in forza', value: '38' },
      { label: 'Squadre attive', value: '7' },
      { label: 'Presenze oggi', value: '32 / 38' },
    ],
    tableTitle: 'Forza lavoro',
    columns: ['Dipendente', 'Qualifica', 'Squadra', 'Cantiere', 'Ore mese', 'Stato'],
    rows: [
      ['Russo M.', 'Capocantiere', 'Edil-A', 'Via Roma 42', '168', 'Presente'],
      ['Esposito G.', 'Muratore spec.', 'Edil-A', 'Via Roma 42', '172', 'Presente'],
      ['Neri S.', 'Carpentiere', 'Edil-B', 'Biogas Caserta', '160', 'Presente'],
      ['Ferretti L.', 'Apprendista', 'Edil-B', 'Biogas Caserta', '104', 'Ferie'],
      ['Conte A.', 'Gruista', 'Movim.', 'Residenza Pineta', '176', 'Presente'],
    ],
    primaryAction: 'Nuovo dipendente',
  },
  'buildsuite:mezzi': {
    title: 'Mezzi & Attrezzature',
    subtitle: 'Parco macchine, manutenzioni e revisioni',
    stats: [
      { label: 'Mezzi propri', value: '24' },
      { label: 'Revisioni scad.', value: '3' },
      { label: 'Ore macchina', value: '1.820' },
    ],
    tableTitle: 'Parco mezzi',
    columns: ['Targa/Matr.', 'Tipologia', 'Cantiere', 'Prossima manut.', 'Stato'],
    rows: [
      ['EK-432-HP', 'Escavatore cingolato', 'Biogas Caserta', '08/06/2026', 'Operativo'],
      ['GR-112', 'Gru a torre 40m', 'Via Roma 42', '22/05/2026', 'Operativo'],
      ['FB-210-RS', 'Furgone cassonato', 'Officina', '-', 'Fermo'],
      ['MUL-08', 'Muletto 3t', 'Ampliamento scuola', '30/04/2026', 'Revisione'],
    ],
    primaryAction: 'Registra mezzo',
  },
  'buildsuite:magazzino': {
    title: 'Magazzino',
    subtitle: 'Movimenti materiali e scorte cantiere',
    stats: [
      { label: 'Giacenze', value: '€82.400' },
      { label: 'Movimenti oggi', value: '14' },
      { label: 'Sottoscorta', value: '3', trend: 'down' },
    ],
    tableTitle: 'Movimenti recenti',
    columns: ['Data', 'Tipo', 'Articolo', 'Q.tà', 'Cantiere', 'Causale'],
    rows: [
      ['27/04', 'USCITA', 'Cls C25/30', '12 mc', 'Via Roma 42', 'Getto solaio'],
      ['27/04', 'ENTRATA', 'Acciaio B450C', '820 kg', 'Biogas Caserta', 'Acq. Ferro Meridionale'],
      ['26/04', 'USCITA', 'Laterizio 12x25x25', '540 pz', 'Residenza Pineta', 'Prelievo tramezze'],
      ['26/04', 'ENTRATA', 'Rete elettrosaldata', '120 mq', 'Via Roma 42', 'Acq. Edil Sud'],
    ],
    primaryAction: 'Nuovo movimento',
  },
  'buildsuite:documenti': {
    title: 'Documenti',
    subtitle: 'Archivio documentale con firma digitale e OCR',
    stats: [
      { label: 'Documenti', value: '2.841' },
      { label: 'In attesa firma', value: '12' },
      { label: 'Scadono 30gg', value: '8', trend: 'down' },
    ],
    tableTitle: 'Ultimi documenti',
    columns: ['Nome', 'Tipo', 'Cantiere', 'Caricato', 'Stato'],
    rows: [
      ['Capitolato-Via-Roma.pdf', 'Capitolato', 'Via Roma 42', '22/04', 'Firmato'],
      ['SAL-074-firmato.pdf', 'SAL', 'Via Roma 42', '24/04', 'Firmato'],
      ['DURC-AcmeCostruzioni.pdf', 'DURC', '—', '26/04', 'Valido'],
      ['Polizza-CAR-2026.pdf', 'Polizza', 'Tutti', '02/01', 'Valido'],
    ],
    primaryAction: 'Carica documento',
  },

  // ═══════════════════ LEGALMIND ═══════════════════
  'legalmind:fascicoli': {
    title: 'Fascicoli',
    subtitle: 'Pratiche giudiziali e stragiudiziali',
    stats: [
      { label: 'Attivi', value: '47', trend: 'up' },
      { label: 'Archiviati YTD', value: '18' },
      { label: 'Valore cause', value: '€1.82M' },
    ],
    tableTitle: 'Fascicoli recenti',
    columns: ['N° ruolo', 'Cliente', 'Materia', 'Controparte', 'Autorità', 'Stato'],
    rows: [
      ['R.G. 4821/2026', 'Rossi M.', 'Civile · Locazione', 'Bianchi Imm.', 'Trib. Napoli', 'Udienza 12/06'],
      ['R.G. 3912/2026', 'Ferretti SRL', 'Lavoro · Licenziamento', 'Dip. XY', 'Trib. SMCV', 'Memoria'],
      ['R.G. 5102/2026', 'Conte SpA', 'Societario', 'Soci di minoranza', 'Trib. Napoli sez. spec.', 'Udienza 04/07'],
      ['Stragiud.-112', 'Esposito A.', 'Recupero crediti', 'Debitore ZZ', '—', 'Diffida inviata'],
      ['R.G. 2140/2025', 'Comune Sessa A.', 'Amministrativo', 'Privato', 'TAR Campania', 'Deposito repliche'],
    ],
    coreMindHint: 'Fascicolo 5102 ha udienza tra 9gg · genero il brogliaccio con giurisprudenza collegata?',
    primaryAction: 'Nuovo fascicolo',
    filters: ['Tutti', 'Civile', 'Lavoro', 'Amministrativo', 'Stragiudiziale'],
  },
  'legalmind:atti': {
    title: 'Atti & Documenti',
    subtitle: 'Atti depositati e da depositare via PCT',
    stats: [
      { label: 'Depositi mese', value: '34' },
      { label: 'In bozza', value: '6' },
      { label: 'Errori PCT', value: '0', trend: 'flat' },
    ],
    tableTitle: 'Atti recenti',
    columns: ['Atto', 'Fascicolo', 'Deposito', 'Autorità', 'Stato'],
    rows: [
      ['Memoria ex art. 183 VI c.p.c.', 'R.G. 4821/2026', '24/04/2026', 'Trib. Napoli', 'Depositato'],
      ['Comparsa conclusionale', 'R.G. 3912/2026', '20/04/2026', 'Trib. SMCV', 'Depositato'],
      ['Ricorso TAR', 'R.G. 2140/2025', 'Bozza', 'TAR Campania', 'In revisione'],
      ['Memoria di replica', 'R.G. 5102/2026', 'Bozza', 'Trib. Napoli', 'In revisione'],
    ],
    coreMindHint: 'Ho redatto una bozza di replica per 5102 sulla base delle difese controparte · vuoi vederla?',
    primaryAction: 'Nuovo atto',
  },
  'legalmind:scadenziario': {
    title: 'Scadenziario',
    subtitle: 'Termini processuali, adempimenti e tasks',
    stats: [
      { label: 'Prossime 7gg', value: '14', trend: 'up' },
      { label: 'Scadute', value: '0', trend: 'flat' },
      { label: 'Calendarizzate', value: '186' },
    ],
    tableTitle: 'Scadenze imminenti',
    columns: ['Data', 'Adempimento', 'Fascicolo', 'Tipo', 'Assegnato'],
    rows: [
      ['29/04', 'Deposito memoria 183', 'R.G. 3912/2026', 'Termine processuale', 'Avv. Russo'],
      ['03/05', 'Risposta diffida', 'Stragiud.-112', 'Termine contrattuale', 'Avv. Mignano'],
      ['10/05', 'Scadenza appello', 'R.G. 2810/2025', 'Termine processuale', 'Avv. Mignano'],
      ['15/05', 'AML rinnovo annuale', 'Ferretti SRL', 'Compliance', 'Segreteria'],
    ],
    coreMindHint: 'Il termine "deposito memoria 183" scade tra 2gg e non ci sono allegati · serve il tuo OK?',
    primaryAction: 'Nuova scadenza',
  },
  'legalmind:clienti': {
    title: 'Clienti',
    subtitle: 'Anagrafica clienti, antiriciclaggio e mandati',
    stats: [
      { label: 'Attivi', value: '218' },
      { label: 'Mandati aperti', value: '47' },
      { label: 'AML completi', value: '100%', trend: 'flat' },
    ],
    tableTitle: 'Ultimi clienti',
    columns: ['Cliente', 'Tipo', 'Mandati', 'Fatturato', 'AML', 'Ultima attività'],
    rows: [
      ['Rossi Mario', 'Privato', '1', '€4.200', '✓', '22/04/2026'],
      ['Ferretti SRL', 'Società', '3', '€18.400', '✓', '24/04/2026'],
      ['Conte SpA', 'Società', '2', '€42.800', '✓', '25/04/2026'],
      ['Esposito Anna', 'Privato', '1', '€1.800', '✓', '21/04/2026'],
      ['Comune Sessa A.', 'Ente', '4', '€28.100', '—', '20/04/2026'],
    ],
    primaryAction: 'Nuovo cliente',
  },
  'legalmind:contabilita': {
    title: 'Contabilità forense',
    subtitle: 'Parcelle DM 55/2014, proforma, fatture elettroniche',
    stats: [
      { label: 'Fatturato mese', value: '€42.400', trend: 'up' },
      { label: 'Proforma aperte', value: '8' },
      { label: 'Scaduto', value: '€6.200', trend: 'down' },
    ],
    tableTitle: 'Parcelle recenti',
    columns: ['N°', 'Cliente', 'Descrizione', 'Imponibile', 'Totale', 'Stato'],
    rows: [
      ['2026/084', 'Conte SpA', 'Consulenza societaria Q1', '€4.800', '€5.856', 'Saldata'],
      ['2026/083', 'Ferretti SRL', 'Assistenza lavoro 4821', '€2.400', '€2.928', 'Emessa'],
      ['2026/082', 'Rossi M.', 'Memoria civile', '€1.200', '€1.464', 'Saldata'],
      ['PRO-2026/041', 'Comune Sessa A.', 'Ricorso TAR', '€3.400', '€4.148', 'Proforma'],
    ],
    coreMindHint: 'Ho pronto il calcolo DM 55/2014 per PRO-2026/041 (scaglione €2.600-€5.200) · applico?',
    primaryAction: 'Nuova parcella',
  },
  'legalmind:pct': {
    title: 'PCT · Processo Civile Telematico',
    subtitle: 'Depositi, notifiche PEC e consultazione registri',
    stats: [
      { label: 'Depositi oggi', value: '3' },
      { label: 'Notifiche PEC', value: '14' },
      { label: 'Errori', value: '0', trend: 'flat' },
    ],
    tableTitle: 'Depositi telematici',
    columns: ['Data/Ora', 'Atto', 'Fascicolo', 'Autorità', 'Ricevuta'],
    rows: [
      ['27/04 10:22', 'Memoria 183', 'R.G. 4821/2026', 'Trib. Napoli', 'RdAC accettata'],
      ['26/04 15:48', 'Comparsa costituzione', 'R.G. 5102/2026', 'Trib. Napoli', 'RdAC accettata'],
      ['26/04 09:14', 'Ricorso urgente', 'R.G. 2812/2026', 'Trib. SMCV', 'RdAC accettata'],
      ['25/04 17:05', 'Istanza anticipata', 'R.G. 2140/2025', 'TAR Campania', 'RdAC accettata'],
    ],
    primaryAction: 'Nuovo deposito',
  },
  'legalmind:osservatorio': {
    title: 'Osservatorio normativo',
    subtitle: 'Alert su modifiche legislative e circolari rilevanti',
    stats: [
      { label: 'Alert settimana', value: '18' },
      { label: 'Di interesse', value: '4', trend: 'up' },
      { label: 'Fonti monitorate', value: '42' },
    ],
    tableTitle: 'Alert normativi recenti',
    columns: ['Data', 'Fonte', 'Norma', 'Materia', 'Impatto'],
    rows: [
      ['26/04', 'G.U.', 'D.Lgs. 82/2026', 'Lavoro · Licenziamenti', 'Alto'],
      ['25/04', 'Ag. Entrate', 'Circ. 8/E', 'Fiscale · Forfettari', 'Medio'],
      ['23/04', 'Cass. S.U.', 'Sent. 12410/2026', 'Civile · Locazioni', 'Alto'],
      ['22/04', 'Garante Priv.', 'Provv. 184/2026', 'GDPR · Sanità', 'Medio'],
    ],
    coreMindHint: 'La sentenza S.U. 12410/2026 impatta 4 tuoi fascicoli di locazione · vuoi la sintesi?',
    primaryAction: 'Nuovo alert',
  },
  'legalmind:giurisprudenza': {
    title: 'Giurisprudenza',
    subtitle: 'Ricerca semantica su sentenze Cassazione, merito e TAR',
    stats: [
      { label: 'Sentenze indicizzate', value: '1.8M' },
      { label: 'Ricerche mese', value: '142' },
      { label: 'Salvate', value: '38' },
    ],
    tableTitle: 'Ricerche recenti',
    columns: ['Query', 'Risultati', 'Fascicolo', 'Data', 'Rilevanza top'],
    rows: [
      ['"Morosità parziale locazione commerciale"', '184', 'R.G. 4821/2026', '24/04', '94%'],
      ['"Licenziamento ritorsivo onere prova"', '412', 'R.G. 3912/2026', '23/04', '91%'],
      ['"Impugnazione delibera assembleare S.p.A."', '268', 'R.G. 5102/2026', '22/04', '88%'],
      ['"Silenzio-assenso urbanistica"', '96', 'R.G. 2140/2025', '20/04', '96%'],
    ],
    coreMindHint: 'Posso sintetizzare in 5 punti le 10 sentenze più rilevanti sulla locazione commerciale · procedo?',
    primaryAction: 'Nuova ricerca',
  },
  'legalmind:gdpr': {
    title: 'Privacy & GDPR',
    subtitle: 'Registro trattamenti, DPIA, data breach e consensi',
    stats: [
      { label: 'Trattamenti', value: '28' },
      { label: 'DPIA attive', value: '3' },
      { label: 'Data breach YTD', value: '0', trend: 'flat' },
    ],
    tableTitle: 'Registro trattamenti',
    columns: ['Trattamento', 'Base giuridica', 'Categorie dati', 'Responsabile', 'Ultimo audit'],
    rows: [
      ['Anagrafica clienti', 'Contratto', 'Identificativi · Contatto', 'Studio Mignano', '12/03/2026'],
      ['Fascicoli giudiziali', 'Obbligo legale', 'Giudiziari · Particolari', 'Studio Mignano', '12/03/2026'],
      ['Marketing DEM', 'Consenso', 'Contatto · Preferenze', 'Studio Mignano', '12/03/2026'],
      ['Video-sorveglianza', 'Legittimo interesse', 'Immagini', 'Studio Mignano', '12/03/2026'],
    ],
    primaryAction: 'Nuovo trattamento',
  },

  // ═══════════════════ FOODSUITE ═══════════════════
  'foodsuite:menu': {
    title: 'Menu',
    subtitle: 'Piatti, allergeni e composizione food-cost',
    stats: [
      { label: 'Piatti attivi', value: '64' },
      { label: 'Food-cost medio', value: '28,4%', trend: 'down' },
      { label: 'Out of stock', value: '2' },
    ],
    tableTitle: 'Piatti del menu',
    columns: ['Piatto', 'Categoria', 'Prezzo', 'Food-cost', 'Allergeni', 'Stato'],
    rows: [
      ['Spaghetti allo scoglio', 'Primi', '€18,00', '24%', 'Crostacei, Glutine', 'Attivo'],
      ['Tagliata di manzo', 'Secondi', '€24,00', '34%', '—', 'Attivo'],
      ['Pizza Margherita', 'Pizze', '€8,00', '22%', 'Glutine, Lattic.', 'Attivo'],
      ['Tiramisù', 'Dolci', '€6,00', '18%', 'Uova, Lattic., Glutine', 'Attivo'],
      ['Branzino al sale', 'Secondi', '€26,00', '31%', 'Pesce', 'Out of stock'],
    ],
    coreMindHint: 'La tagliata ha food-cost 34% (>30% target) · vuoi che ricalcoli il prezzo?',
    primaryAction: 'Nuovo piatto',
  },
  'foodsuite:ordini': {
    title: 'Ordini fornitori',
    subtitle: 'Approvvigionamento ingredienti e bevande',
    stats: [
      { label: 'Ordini aperti', value: '7' },
      { label: 'Valore settimana', value: '€3.420' },
      { label: 'Consegne oggi', value: '3' },
    ],
    tableTitle: 'Ordini in corso',
    columns: ['Fornitore', 'Categoria', 'Importo', 'Consegna', 'Stato'],
    rows: [
      ['Cooperativa Pesca Sud', 'Ittico fresco', '€420', '27/04 h.6:00', 'Confermato'],
      ['Caseificio Battipaglia', 'Latticini', '€185', '27/04 h.7:30', 'In transito'],
      ['Az. Agr. Irpinia', 'Ortofrutta', '€280', '28/04 h.6:30', 'Confermato'],
      ['Macelleria Conte', 'Carni', '€540', '28/04 h.8:00', 'Confermato'],
      ['Cantine Mastroberardino', 'Vini', '€820', '30/04', 'In preparazione'],
    ],
    coreMindHint: 'Lo stock di branzino finirà oggi · aggiungo 4kg all\'ordine Pesca Sud?',
    primaryAction: 'Nuovo ordine',
  },
  'foodsuite:magazzino': {
    title: 'Magazzino food & beverage',
    subtitle: 'Scorte alimentari, bevande e monouso',
    stats: [
      { label: 'Valore stock', value: '€18.400' },
      { label: 'Sottoscorta', value: '6', trend: 'down' },
      { label: 'In scadenza', value: '3' },
    ],
    tableTitle: 'Articoli sottoscorta',
    columns: ['Articolo', 'Categoria', 'Giacenza', 'Minimo', 'Riordino'],
    rows: [
      ['Olio EVO 5L', 'Condimenti', '4', '8', 'Auto'],
      ['Farina 00 25kg', 'Pane/Pizza', '2', '6', 'Auto'],
      ['Vino Aglianico', 'Bevande', '8', '20', 'Manuale'],
      ['Mozzarella Bufala', 'Latticini', '3 kg', '8 kg', 'Auto · Caseif. Battip.'],
    ],
    primaryAction: 'Nuovo riordino',
  },
  'foodsuite:haccp': {
    title: 'HACCP',
    subtitle: 'Controlli temperature, igiene e tracciabilità',
    stats: [
      { label: 'Registri oggi', value: '12 / 12', trend: 'flat' },
      { label: 'Anomalie mese', value: '0' },
      { label: 'Formazioni scad.', value: '2' },
    ],
    tableTitle: 'Registri controllo',
    columns: ['Data', 'Area', 'Parametro', 'Valore', 'Responsabile', 'Esito'],
    rows: [
      ['27/04 08:00', 'Frigo cucina', 'Temperatura', '+4°C', 'A. Russo', 'OK'],
      ['27/04 08:00', 'Abbattitore', 'Temperatura', '-22°C', 'A. Russo', 'OK'],
      ['27/04 12:00', 'Cottura pollame', 'Temp. al cuore', '76°C', 'Chef G.', 'OK'],
      ['26/04 22:00', 'Sanificazione', 'Protocollo', 'Completo', 'L. Bianchi', 'OK'],
    ],
    coreMindHint: 'La formazione HACCP di 2 operatori scade il 10/05 · prenoto il corso online?',
    primaryAction: 'Nuovo controllo',
  },
  'foodsuite:foodcost': {
    title: 'Food Cost',
    subtitle: 'Analisi marginalità per piatto, categoria e scenario',
    stats: [
      { label: 'F.C. medio', value: '28,4%', trend: 'down' },
      { label: 'Piatti >30%', value: '8' },
      { label: 'Margine medio', value: '71,6%' },
    ],
    tableTitle: 'Piatti a marginalità critica',
    columns: ['Piatto', 'Prezzo', 'Costo mat.', 'Food-cost', 'Margine', 'Suggerimento AI'],
    rows: [
      ['Tagliata di manzo', '€24,00', '€8,16', '34%', '€15,84', 'Aumenta a €26,50'],
      ['Branzino al sale', '€26,00', '€8,06', '31%', '€17,94', 'Rivaluta fornitore'],
      ['Paella valenciana', '€22,00', '€6,82', '31%', '€15,18', 'OK · popolare'],
      ['Fritto misto', '€20,00', '€6,00', '30%', '€14,00', 'OK'],
    ],
    coreMindHint: 'Portando la tagliata a €26,50 recuperi 2,4pp di marginalità · elasticità prevista -3%.',
    primaryAction: 'Simula scenario',
  },
  'foodsuite:fornitori': {
    title: 'Fornitori food',
    subtitle: 'Fornitori locali, tracciabilità filiera corta',
    stats: [
      { label: 'Fornitori', value: '18' },
      { label: 'Km 0', value: '11', trend: 'up' },
      { label: 'Spesa mese', value: '€14.200' },
    ],
    tableTitle: 'Fornitori',
    columns: ['Fornitore', 'Categoria', 'Km', 'Ordini mese', 'Spesa', 'Rating'],
    rows: [
      ['Cooperativa Pesca Sud', 'Ittico', '14', '8', '€3.100', '★★★★★'],
      ['Caseificio Battipaglia', 'Latticini', '42', '6', '€1.800', '★★★★★'],
      ['Az. Agr. Irpinia', 'Ortofrutta', '28', '10', '€2.400', '★★★★☆'],
      ['Cantine Mastroberardino', 'Vini', '52', '2', '€1.640', '★★★★★'],
    ],
    primaryAction: 'Nuovo fornitore',
  },
  'foodsuite:personale': {
    title: 'Personale sala & cucina',
    subtitle: 'Turni, buste paga ridotte e presenze',
    stats: [
      { label: 'In forza', value: '14' },
      { label: 'Turni settimana', value: '82' },
      { label: 'Ore straordinario', value: '12' },
    ],
    tableTitle: 'Turni di oggi',
    columns: ['Dipendente', 'Ruolo', 'Turno', 'Ore', 'Stato'],
    rows: [
      ['Russo A.', 'Chef', '16:00-00:00', '8', 'Presente'],
      ['Bianchi L.', 'Sous chef', '16:00-00:00', '8', 'Presente'],
      ['Neri S.', 'Cameriere', '18:00-00:30', '6,5', 'Presente'],
      ['Conte G.', 'Sommelier', '19:00-00:00', '5', 'Presente'],
      ['Esposito M.', 'Lavapiatti', '18:30-00:00', '5,5', 'Ritardo'],
    ],
    primaryAction: 'Nuovo turno',
  },
  'foodsuite:riservazioni': {
    title: 'Riservazioni',
    subtitle: 'Prenotazioni sala, planimetria e gestione coperti',
    stats: [
      { label: 'Coperti stasera', value: '72 / 90' },
      { label: 'Settimana', value: '184' },
      { label: 'No-show', value: '3,2%' },
    ],
    tableTitle: 'Prenotazioni oggi',
    columns: ['Ora', 'Cliente', 'Coperti', 'Tavolo', 'Note', 'Stato'],
    rows: [
      ['20:00', 'Fam. Rossi', '4', 'T-12', 'Compleanno', 'Confermata'],
      ['20:30', 'Ditta Conte', '8', 'T-Sala priv.', 'Aziendale', 'Confermata'],
      ['21:00', 'Esposito A.', '2', 'T-04', 'Anniversario', 'Confermata'],
      ['21:15', 'Bianchi M.', '3', 'T-07', 'Allerg. glutine', 'Confermata'],
      ['21:30', 'Walk-in', '—', '—', '—', 'Lista attesa'],
    ],
    primaryAction: 'Nuova prenotazione',
  },

  // ═══════════════════ RETAILSUITE ═══════════════════
  'retailsuite:vendite': {
    title: 'Vendite',
    subtitle: 'Performance giornaliera, settimanale e per negozio',
    stats: [
      { label: 'Fatt. oggi', value: '€8.420', trend: 'up' },
      { label: 'Scontrino medio', value: '€42,10' },
      { label: 'Conversion', value: '38,4%', trend: 'up' },
    ],
    tableTitle: 'Vendite recenti',
    columns: ['N°', 'Ora', 'Canale', 'Articoli', 'Totale', 'Cliente'],
    rows: [
      ['04821', '14:32', 'POS Napoli', '5', '€49,00', 'M. Verdi (VIP)'],
      ['04820', '14:21', 'POS Napoli', '3', '€28,50', 'Anonimo'],
      ['ECM-2140', '14:18', 'E-commerce', '2', '€68,00', 'Rossi A.'],
      ['04819', '14:02', 'POS Roma', '7', '€124,80', 'Anonimo'],
      ['ECM-2139', '13:55', 'E-commerce', '1', '€39,90', 'Conte F.'],
    ],
    coreMindHint: 'Conversion e-commerce +4,2% vs settimana scorsa · articolo trainante: Felpa M/L maglia.',
    primaryAction: 'Nuova vendita',
  },
  'retailsuite:pos': {
    title: 'POS · Live',
    subtitle: 'Casse aperte, venditori attivi e storni',
    stats: [
      { label: 'Casse aperte', value: '4 / 5' },
      { label: 'Venditori', value: '7' },
      { label: 'Storni oggi', value: '2' },
    ],
    tableTitle: 'Casse attive',
    columns: ['Cassa', 'Negozio', 'Venditore', 'Scontrini', 'Incasso', 'Stato'],
    rows: [
      ['POS-01', 'Napoli Centro', 'G. Russo', '47', '€2.140', 'Operativa'],
      ['POS-02', 'Napoli Centro', 'L. Bianchi', '38', '€1.820', 'Operativa'],
      ['POS-03', 'Roma Trastevere', 'A. Verdi', '52', '€2.680', 'Operativa'],
      ['POS-04', 'Roma Trastevere', 'M. Neri', '29', '€1.480', 'Operativa'],
      ['POS-05', 'Milano Buenos A.', '—', '—', '—', 'Chiusa'],
    ],
    primaryAction: 'Apri cassa',
  },
  'retailsuite:magazzino': {
    title: 'Magazzino multi-negozio',
    subtitle: 'Stock per SKU, trasferimenti e inventari',
    stats: [
      { label: 'Giacenze', value: '€248.400' },
      { label: 'Trasferimenti', value: '4' },
      { label: 'Da riassortire', value: '28', trend: 'down' },
    ],
    tableTitle: 'Stock per negozio',
    columns: ['SKU', 'Articolo', 'Napoli', 'Roma', 'Milano', 'Warehouse'],
    rows: [
      ['SKU-8421', 'Felpa M/L maglia', '42', '38', '44', '124'],
      ['SKU-8422', 'T-shirt basic', '180', '128', '110', '418'],
      ['SKU-8424', 'Sneakers low', '12', '8', '18', '38'],
      ['SKU-8425', 'Borsa a tracolla', '0', '0', '0', '0'],
    ],
    primaryAction: 'Nuovo trasferimento',
  },
  'retailsuite:clienti': {
    title: 'Clienti & CRM',
    subtitle: 'Anagrafica clienti, segmenti e fidelity',
    stats: [
      { label: 'Attivi', value: '8.412' },
      { label: 'VIP', value: '318' },
      { label: 'LTV medio', value: '€284' },
    ],
    tableTitle: 'Clienti top',
    columns: ['Cliente', 'Segmento', 'Spesa YTD', 'Ultima visita', 'Punti', 'NPS'],
    rows: [
      ['Verdi M.', 'VIP Gold', '€2.140', '27/04/2026', '1.820', '10'],
      ['Rossi A.', 'VIP Silver', '€1.480', '26/04/2026', '1.240', '9'],
      ['Conte F.', 'Fedele', '€820', '26/04/2026', '680', '8'],
      ['Neri S.', 'Nuovo', '€184', '22/04/2026', '140', '—'],
    ],
    coreMindHint: 'Verdi M. non acquista dal negozio fisico da 45gg · lancio un voucher personalizzato?',
    primaryAction: 'Nuovo cliente',
  },
  'retailsuite:ecommerce': {
    title: 'E-commerce',
    subtitle: 'Shopify/WooCommerce sync, carrelli abbandonati, spedizioni',
    stats: [
      { label: 'Ordini oggi', value: '48', trend: 'up' },
      { label: 'Carrelli abband.', value: '14' },
      { label: 'Conversion', value: '3,8%', trend: 'up' },
    ],
    tableTitle: 'Ordini e-commerce',
    columns: ['N°', 'Cliente', 'Totale', 'Canale', 'Spedizione', 'Stato'],
    rows: [
      ['ECM-2140', 'Rossi A.', '€68,00', 'Shopify', 'BRT · 28/04', 'Preparazione'],
      ['ECM-2139', 'Conte F.', '€39,90', 'Shopify', 'GLS · 29/04', 'Spedito'],
      ['ECM-2138', 'Neri S.', '€184,00', 'Amazon', 'FBA', 'Consegnato'],
      ['ECM-2137', 'Verdi M.', '€420,00', 'Sito proprio', 'Poste · 30/04', 'In lavorazione'],
    ],
    coreMindHint: '14 carrelli abbandonati nelle ultime 24h · lancio la campagna di recupero con sconto 10%?',
    primaryAction: 'Nuovo ordine',
  },
  'retailsuite:loyalty': {
    title: 'Loyalty',
    subtitle: 'Programma fedeltà, punti e premi',
    stats: [
      { label: 'Iscritti', value: '6.240' },
      { label: 'Punti attivi', value: '1,2M' },
      { label: 'Premi riscossi mese', value: '218' },
    ],
    tableTitle: 'Top membri',
    columns: ['Cliente', 'Livello', 'Punti', 'Premio disponibile', 'Ultimo uso'],
    rows: [
      ['Verdi M.', 'Gold', '1.820', 'Buono €50', '26/04/2026'],
      ['Rossi A.', 'Silver', '1.240', 'Buono €25', '24/04/2026'],
      ['Conte F.', 'Bronze', '680', 'Sconto 10%', '22/04/2026'],
      ['Neri S.', 'Starter', '140', 'Welcome gift', '—'],
    ],
    primaryAction: 'Nuovo premio',
  },
  'retailsuite:campagne': {
    title: 'Campagne marketing',
    subtitle: 'Email, SMS, push e campagne segmentate',
    stats: [
      { label: 'Attive', value: '4' },
      { label: 'Open rate medio', value: '32,4%', trend: 'up' },
      { label: 'Revenue attrib.', value: '€18.400' },
    ],
    tableTitle: 'Campagne recenti',
    columns: ['Campagna', 'Canale', 'Segmento', 'Invii', 'Open', 'CTR', 'Revenue'],
    rows: [
      ['Spring Collection 2026', 'Email', 'VIP + Fedeli', '1.840', '38%', '12%', '€8.200'],
      ['Carrello abbandonato', 'Email', 'Automation', '420', '52%', '24%', '€3.180'],
      ['Flash sale weekend', 'SMS', 'Tutti attivi', '6.240', '—', '8%', '€4.820'],
      ['Push compleanno', 'Push app', 'Mese corrente', '184', '—', '18%', '€2.240'],
    ],
    coreMindHint: 'La campagna "Flash sale weekend" ha CTR inferiore alla media · posso riscrivere il copy?',
    primaryAction: 'Nuova campagna',
  },
  'retailsuite:analytics': {
    title: 'Analytics',
    subtitle: 'KPI, heatmap vendite, funnel conversion',
    stats: [
      { label: 'Dashboard', value: '18' },
      { label: 'Report schedulati', value: '12' },
      { label: 'Export mese', value: '42' },
    ],
    tableTitle: 'Dashboard disponibili',
    columns: ['Dashboard', 'Tipo', 'Frequenza', 'Ultimo run', 'Destinatari'],
    rows: [
      ['Vendite giornaliere', 'Operativo', 'Daily', '27/04 23:59', 'Gestione · 4 utenti'],
      ['Performance negozi', 'Manageriale', 'Weekly', '26/04', 'Direzione'],
      ['Funnel e-commerce', 'Marketing', 'Weekly', '26/04', 'Marketing'],
      ['Bilancio cat. merce.', 'Direzionale', 'Monthly', '01/04', 'CFO'],
    ],
    primaryAction: 'Nuova dashboard',
  },
}

/**
 * Fallback: genera un modulo utilizzabile a partire dalla label quando
 * l'id non ha un preset dedicato.
 */
export function fallbackModule(label: string, sublabel?: string): ModulePreset {
  return {
    title: label,
    subtitle: `Modulo ${label.toLowerCase()} — vista operativa`,
    stats: [
      { label: 'Totale', value: sublabel ?? '—' },
      { label: 'Aggiornati oggi', value: '—' },
      { label: 'In revisione', value: '—' },
    ],
    tableTitle: `Elenco ${label.toLowerCase()}`,
    columns: ['Codice', 'Denominazione', 'Proprietario', 'Aggiornato', 'Stato'],
    rows: [
      ['—', `${label} 01`, 'Sistema', 'oggi', 'Attivo'],
      ['—', `${label} 02`, 'Sistema', 'ieri', 'Attivo'],
      ['—', `${label} 03`, 'Sistema', '3gg fa', 'Da rivedere'],
    ],
    primaryAction: `Nuovo ${label.toLowerCase()}`,
  }
}

/**
 * Lookup preset: prova prima scoped (`suiteId:moduleId`), poi `moduleId`,
 * infine fallback basato sulla label.
 */
export function getModulePreset(
  suiteId: string,
  moduleId: string,
  label: string,
  sublabel?: string,
): ModulePreset {
  const scoped = MODULE_PRESETS[`${suiteId}:${moduleId}`]
  if (scoped) return scoped
  const generic = MODULE_PRESETS[moduleId]
  if (generic) return generic
  return fallbackModule(label, sublabel)
}
