'use client'

import { useState } from 'react'
import {
  LayoutGrid, Hammer, FileText, HardHat, Users, Package, Truck, Calendar,
  AlertTriangle, TrendingUp, Plus, Download, Brain, ArrowRight,
} from 'lucide-react'
import { DemoShell, type ModuleDef, type ShellContext, type NotificationItem } from '@/components/demo/DemoShell'
import { KpiCard } from '@/components/demo/primitives/KpiCard'
import { DataTable } from '@/components/demo/primitives/DataTable'
import { Drawer } from '@/components/demo/primitives/Drawer'
import { Section, StatusPill, StatChip, ProgressBar } from '@/components/demo/primitives/Section'
import { CANTIERI, SALS, SICUREZZA, MAGAZZINO, type Cantiere, type SAL, type SicurezzaCheck, type MagazzinoItem } from '@/content/demo-data/build'

const ACCENT = '#06B6D4'

// ============ Dashboard ============
function Dashboard({ ctx }: { ctx: ShellContext }) {
  const totalBudget = CANTIERI.reduce((s, c) => s + c.budget, 0)
  const totalSpent = CANTIERI.reduce((s, c) => s + c.speso, 0)
  const activeCount = CANTIERI.filter((c) => c.status === 'in-corso').length
  const criticalCount = CANTIERI.filter((c) => c.status === 'critico').length
  const salPending = SALS.filter((s) => s.status === 'pending' || s.status === 'in-revisione').length
  const salImporto = SALS.filter((s) => s.status === 'pending' || s.status === 'in-revisione').reduce((s, x) => s + x.importo, 0)

  return (
    <div className="space-y-8">
      <Section
        eyebrow="DASHBOARD"
        title="Panoramica BuildSuite"
        description="Tutti i cantieri attivi, lo stato dei SAL, i KPI di margine e produttività in un'unica vista."
        accent={ACCENT}
        isDark={ctx.isDark}
        actions={
          <button
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border ${
              ctx.isDark ? 'border-white/10 hover:bg-white/5' : 'border-line hover:bg-paper-2'
            }`}
          >
            <Download size={14} /> Esporta PDF
          </button>
        }
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard label="Cantieri attivi" value={activeCount} delta="+2 questo mese" trend="up" icon={Hammer} accent={ACCENT} isDark={ctx.isDark} />
          <KpiCard label="Budget totale" value={totalBudget / 1_000_000} prefix="€" suffix="M" delta="+12.4%" trend="up" icon={TrendingUp} accent={ACCENT} format="decimal" decimals={2} isDark={ctx.isDark} />
          <KpiCard label="Speso" value={totalSpent / 1_000_000} prefix="€" suffix="M" delta={`${((totalSpent / totalBudget) * 100).toFixed(0)}% impiegato`} trend="flat" icon={TrendingUp} accent={ACCENT} format="decimal" decimals={2} isDark={ctx.isDark} />
          <KpiCard label="Cantieri critici" value={criticalCount} delta="margine < 10%" trend={criticalCount > 0 ? 'down' : 'flat'} icon={AlertTriangle} accent="#EF4444" isDark={ctx.isDark} />
          <KpiCard label="SAL in attesa" value={salPending} delta={`€${(salImporto / 1000).toFixed(0)}K totale`} trend="flat" icon={FileText} accent={ACCENT} isDark={ctx.isDark} />
          <KpiCard label="Personale attivo" value={CANTIERI.reduce((s, c) => s + c.workers, 0)} delta="su 12 cantieri" trend="up" icon={Users} accent={ACCENT} isDark={ctx.isDark} />
          <KpiCard label="Ore lavorate" value={CANTIERI.reduce((s, c) => s + c.ore, 0)} delta="settimana corrente" trend="flat" icon={Calendar} accent={ACCENT} isDark={ctx.isDark} />
          <KpiCard label="Stock critico" value={MAGAZZINO.filter((m) => m.giacenza < m.minimo).length} delta="da riordinare" trend="flat" icon={Package} accent="#F59E0B" isDark={ctx.isDark} />
        </div>
      </Section>

      <Section eyebrow="AZIONI RAPIDE" title="Cosa vuoi fare?" accent={ACCENT} isDark={ctx.isDark}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <QuickAction icon={Plus} label="Nuovo cantiere" onClick={() => ctx.setActiveModule('cantieri')} accent={ACCENT} isDark={ctx.isDark} />
          <QuickAction icon={FileText} label="Nuovo SAL" onClick={() => ctx.setActiveModule('sal')} accent={ACCENT} isDark={ctx.isDark} />
          <QuickAction icon={HardHat} label="Verifica sicurezza" onClick={() => ctx.setActiveModule('sicurezza')} accent={ACCENT} isDark={ctx.isDark} />
          <QuickAction icon={Package} label="Ordini magazzino" onClick={() => ctx.setActiveModule('magazzino')} accent={ACCENT} isDark={ctx.isDark} />
        </div>
      </Section>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className={`lg:col-span-2 rounded-xl border p-5 ${ctx.isDark ? 'border-white/5 bg-white/[0.02]' : 'border-line bg-white'}`}>
          <h3 className="font-serif text-lg mb-4">Cantieri con margine sotto soglia</h3>
          <div className="space-y-3">
            {CANTIERI.filter((c) => c.margine < 12).slice(0, 4).map((c) => (
              <div key={c.id} className={`flex items-center gap-3 p-3 rounded-lg ${ctx.isDark ? 'bg-white/[0.02]' : 'bg-paper-2'}`}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${ACCENT}1A` }}>
                  <Hammer size={16} style={{ color: ACCENT }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{c.nome}</div>
                  <div className={`text-xs ${ctx.isDark ? 'text-white/50' : 'text-ink-500'}`}>{c.cliente} · {c.citta}</div>
                </div>
                <StatChip label="Margine" value={`${c.margine.toFixed(1)}%`} tone={c.margine < 10 ? 'danger' : 'warning'} isDark={ctx.isDark} />
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-xl border p-5 ${ctx.isDark ? 'border-white/5 bg-white/[0.02]' : 'border-line bg-white'}`}>
          <div className="flex items-center gap-2 mb-3">
            <Brain size={16} style={{ color: ACCENT }} />
            <h3 className="font-serif text-base">CoreMind suggerisce</h3>
          </div>
          <p className={`text-sm mb-3 ${ctx.isDark ? 'text-white/80' : 'text-ink-700'}`}>
            Il cantiere <strong>Biogas Caserta</strong> ha margine 9.1% — sotto soglia 10%.
          </p>
          <p className={`text-xs mb-4 ${ctx.isDark ? 'text-white/60' : 'text-ink-500'}`}>
            Causa principale: extra-costi materiali +14% vs stima. Posso generarti un&apos;analisi di recupero marginalità con focus su rinegoziazione fornitori e ottimizzazione logistica?
          </p>
          <button
            type="button"
            className="w-full px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: ACCENT }}
          >
            Genera analisi
          </button>
        </div>
      </div>
    </div>
  )
}

function QuickAction({ icon: Icon, label, onClick, accent, isDark }: { icon: typeof Plus; label: string; onClick?: () => void; accent: string; isDark: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all ${
        isDark ? 'border-white/5 bg-white/[0.02] hover:bg-white/5' : 'border-line bg-white hover:bg-paper-2'
      }`}
    >
      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${accent}1A` }}>
        <Icon size={15} style={{ color: accent }} />
      </div>
      <span className="flex-1 text-left">{label}</span>
      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: accent }} />
    </button>
  )
}

// ============ Cantieri ============
function CantieriModule({ ctx }: { ctx: ShellContext }) {
  const [selected, setSelected] = useState<Cantiere | null>(null)

  return (
    <Section
      eyebrow="CANTIERI"
      title={`${CANTIERI.length} cantieri totali`}
      description="Gestisci tutti i cantieri attivi, completati e critici. Click sulla riga per il dettaglio."
      accent={ACCENT}
      isDark={ctx.isDark}
      actions={
        <button type="button" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white" style={{ background: ACCENT }}>
          <Plus size={14} /> Nuovo cantiere
        </button>
      }
    >
      <DataTable<Cantiere>
        columns={[
          { key: 'codice', label: 'Codice', sortable: true, render: (r) => <span className="font-mono text-xs">{r.codice}</span> },
          { key: 'nome', label: 'Cantiere', sortable: true, render: (r) => (
            <div>
              <div className="font-medium">{r.nome}</div>
              <div className={`text-xs ${ctx.isDark ? 'text-white/50' : 'text-ink-500'}`}>{r.cliente}</div>
            </div>
          ) },
          { key: 'citta', label: 'Città', sortable: true },
          { key: 'budget', label: 'Budget', sortable: true, align: 'right', render: (r) => <span className="font-mono">€{(r.budget / 1000).toFixed(0)}K</span> },
          { key: 'avanzamento', label: 'Avanz.', sortable: true, render: (r) => <ProgressBar value={r.avanzamento} accent={ACCENT} isDark={ctx.isDark} /> },
          { key: 'margine', label: 'Margine', sortable: true, align: 'right', render: (r) => (
            <span className={r.margine < 10 ? 'text-red-500 font-medium' : r.margine < 15 ? 'text-amber-500 font-medium' : 'text-emerald-500'}>
              {r.margine.toFixed(1)}%
            </span>
          ) },
          { key: 'status', label: 'Stato', render: (r) => <StatusPill status={r.status} isDark={ctx.isDark} /> },
          { key: 'scadenza', label: 'Scadenza', sortable: true, render: (r) => <span className="font-mono text-xs">{r.scadenza}</span> },
        ]}
        data={CANTIERI}
        searchable
        searchPlaceholder="Cerca per nome, cliente, città..."
        searchKeys={['nome', 'cliente', 'citta', 'codice', 'responsabile']}
        onRowClick={setSelected}
        rowKey={(r) => r.id}
        accent={ACCENT}
        isDark={ctx.isDark}
        pageSize={8}
      />

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.nome ?? ''}
        subtitle={selected ? `${selected.codice} · ${selected.citta}` : undefined}
        accent={ACCENT}
        isDark={ctx.isDark}
      >
        {selected && (
          <div className="space-y-5 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg ${ctx.isDark ? 'bg-white/5' : 'bg-paper-2'}`}>
                <div className={`font-mono text-[10px] tracking-wider uppercase mb-1 ${ctx.isDark ? 'text-white/40' : 'text-ink-400'}`}>Cliente</div>
                <div className="font-medium">{selected.cliente}</div>
              </div>
              <div className={`p-3 rounded-lg ${ctx.isDark ? 'bg-white/5' : 'bg-paper-2'}`}>
                <div className={`font-mono text-[10px] tracking-wider uppercase mb-1 ${ctx.isDark ? 'text-white/40' : 'text-ink-400'}`}>Responsabile</div>
                <div className="font-medium">{selected.responsabile}</div>
              </div>
              <div className={`p-3 rounded-lg ${ctx.isDark ? 'bg-white/5' : 'bg-paper-2'}`}>
                <div className={`font-mono text-[10px] tracking-wider uppercase mb-1 ${ctx.isDark ? 'text-white/40' : 'text-ink-400'}`}>Budget</div>
                <div className="font-serif text-xl">€{selected.budget.toLocaleString('it-IT')}</div>
              </div>
              <div className={`p-3 rounded-lg ${ctx.isDark ? 'bg-white/5' : 'bg-paper-2'}`}>
                <div className={`font-mono text-[10px] tracking-wider uppercase mb-1 ${ctx.isDark ? 'text-white/40' : 'text-ink-400'}`}>Speso</div>
                <div className="font-serif text-xl">€{selected.speso.toLocaleString('it-IT')}</div>
              </div>
            </div>

            <div>
              <div className={`font-mono text-[10px] tracking-wider uppercase mb-2 ${ctx.isDark ? 'text-white/40' : 'text-ink-400'}`}>Avanzamento lavori</div>
              <ProgressBar value={selected.avanzamento} accent={ACCENT} isDark={ctx.isDark} />
            </div>

            <div className="flex flex-wrap gap-2">
              <StatChip label="Margine" value={`${selected.margine.toFixed(1)}%`} tone={selected.margine < 10 ? 'danger' : selected.margine < 15 ? 'warning' : 'success'} isDark={ctx.isDark} />
              <StatChip label="Workers" value={selected.workers} isDark={ctx.isDark} />
              <StatChip label="Ore" value={selected.ore.toLocaleString('it-IT')} isDark={ctx.isDark} />
              <StatChip label="Scadenza" value={selected.scadenza} isDark={ctx.isDark} />
            </div>

            <div className={`p-4 rounded-lg border ${ctx.isDark ? 'border-white/10 bg-gradient-to-br from-cyan-500/5 to-cyan-500/[0.02]' : 'border-cyan-200 bg-cyan-50'}`}>
              <div className="flex items-center gap-2 mb-2">
                <Brain size={14} style={{ color: ACCENT }} />
                <span className="font-medium text-sm">CoreMind</span>
              </div>
              <p className={`text-sm ${ctx.isDark ? 'text-white/80' : 'text-ink-700'}`}>
                {selected.margine < 10
                  ? `Margine sotto soglia. Suggerisco analisi extra-costi materiali e rinegoziazione con fornitori top-3.`
                  : selected.avanzamento > 80
                    ? `Cantiere in chiusura: predisporre punch list e SAL finale.`
                    : `Andamento regolare. Prossima milestone tra ${Math.floor(Math.random() * 14) + 7} giorni.`}
              </p>
            </div>

            <div className="flex gap-2">
              <button type="button" className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: ACCENT }}>
                Apri scheda completa
              </button>
              <button type="button" className={`px-4 py-2 rounded-lg text-sm border ${ctx.isDark ? 'border-white/10 hover:bg-white/5' : 'border-line hover:bg-paper-2'}`}>
                <Download size={14} />
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </Section>
  )
}

// ============ SAL ============
function SalModule({ ctx }: { ctx: ShellContext }) {
  return (
    <Section
      eyebrow="SAL"
      title={`${SALS.length} SAL · ${SALS.filter((s) => s.status === 'pending').length} pending`}
      description="Stati di Avanzamento Lavori. Genera, controlla e approva SAL con firma digitale integrata."
      accent={ACCENT}
      isDark={ctx.isDark}
      actions={
        <button type="button" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white" style={{ background: ACCENT }}>
          <Plus size={14} /> Nuovo SAL
        </button>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KpiCard label="SAL Pending" value={SALS.filter((s) => s.status === 'pending').length} accent={ACCENT} isDark={ctx.isDark} />
        <KpiCard label="In revisione" value={SALS.filter((s) => s.status === 'in-revisione').length} accent="#F59E0B" isDark={ctx.isDark} />
        <KpiCard label="Confermati 30gg" value={SALS.filter((s) => s.status === 'confermato').length} accent="#10B981" isDark={ctx.isDark} />
        <KpiCard label="Importo pending" value={SALS.filter((s) => s.status === 'pending').reduce((a, b) => a + b.importo, 0) / 1000} prefix="€" suffix="K" format="decimal" decimals={1} accent={ACCENT} isDark={ctx.isDark} />
      </div>

      <DataTable<SAL>
        columns={[
          { key: 'numero', label: 'N. SAL', render: (r) => <span className="font-mono text-xs">{r.numero}</span> },
          { key: 'cantiere', label: 'Cantiere', render: (r) => (
            <div>
              <div className="font-medium">{r.cantiere}</div>
              <div className={`text-xs ${ctx.isDark ? 'text-white/50' : 'text-ink-500'}`}>{r.cantiereCodice}</div>
            </div>
          ) },
          { key: 'importo', label: 'Importo', sortable: true, align: 'right', render: (r) => <span className="font-mono">€{r.importo.toLocaleString('it-IT')}</span> },
          { key: 'data', label: 'Data', sortable: true },
          { key: 'scadenza', label: 'Scadenza', sortable: true },
          { key: 'status', label: 'Stato', render: (r) => <StatusPill status={r.status} isDark={ctx.isDark} /> },
        ]}
        data={SALS}
        searchKeys={['numero', 'cantiere', 'cantiereCodice']}
        searchPlaceholder="Cerca SAL o cantiere..."
        rowKey={(r) => r.id}
        accent={ACCENT}
        isDark={ctx.isDark}
      />
    </Section>
  )
}

// ============ Sicurezza ============
function SicurezzaModule({ ctx }: { ctx: ShellContext }) {
  return (
    <Section
      eyebrow="SICUREZZA"
      title="Conformità POS / PSC / DPI"
      description="Controlli periodici, verifiche ASL, formazione lavoratori e sicurezza cantiere."
      accent={ACCENT}
      isDark={ctx.isDark}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KpiCard label="Verifiche OK" value={SICUREZZA.filter((s) => s.status === 'ok').length} accent="#10B981" isDark={ctx.isDark} />
        <KpiCard label="Warning" value={SICUREZZA.filter((s) => s.status === 'warning').length} accent="#F59E0B" isDark={ctx.isDark} />
        <KpiCard label="Critici" value={SICUREZZA.filter((s) => s.status === 'critico').length} accent="#EF4444" isDark={ctx.isDark} />
        <KpiCard label="Cantieri coperti" value={new Set(SICUREZZA.map((s) => s.cantiereCodice)).size} accent={ACCENT} isDark={ctx.isDark} />
      </div>

      <DataTable<SicurezzaCheck>
        columns={[
          { key: 'cantiere', label: 'Cantiere', render: (r) => <span className="font-medium">{r.cantiere}</span> },
          { key: 'tipo', label: 'Tipo', render: (r) => (
            <span className={`font-mono text-[11px] px-2 py-0.5 rounded ${ctx.isDark ? 'bg-white/10' : 'bg-paper-2'}`}>{r.tipo}</span>
          ) },
          { key: 'ultima', label: 'Ultima', sortable: true },
          { key: 'prossima', label: 'Prossima', sortable: true, render: (r) => {
            const days = Math.floor((new Date(r.prossima).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
            const tone = days < 0 ? 'text-red-500 font-medium' : days < 14 ? 'text-amber-500' : ''
            return <span className={tone}>{r.prossima} {days >= 0 && `(${days}gg)`}</span>
          } },
          { key: 'responsabile', label: 'Responsabile' },
          { key: 'status', label: 'Stato', render: (r) => (
            <StatusPill status={r.status === 'ok' ? 'attivo' : r.status === 'warning' ? 'in-revisione' : 'critico'} isDark={ctx.isDark} />
          ) },
        ]}
        data={SICUREZZA}
        searchKeys={['cantiere', 'tipo', 'responsabile']}
        searchPlaceholder="Cerca cantiere o tipo controllo..."
        rowKey={(r) => r.id}
        accent={ACCENT}
        isDark={ctx.isDark}
      />
    </Section>
  )
}

// ============ Magazzino ============
function MagazzinoModule({ ctx }: { ctx: ShellContext }) {
  const critici = MAGAZZINO.filter((m) => m.giacenza < m.minimo)
  const valoreTotale = MAGAZZINO.reduce((s, m) => s + m.giacenza * m.prezzoMedio, 0)

  return (
    <Section
      eyebrow="MAGAZZINO"
      title={`${MAGAZZINO.length} articoli a stock · ${critici.length} sotto soglia`}
      description="Inventario materiali con livelli minimi, ultimo carico e fornitore di riferimento."
      accent={ACCENT}
      isDark={ctx.isDark}
      actions={
        <button type="button" className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border ${ctx.isDark ? 'border-white/10 hover:bg-white/5' : 'border-line hover:bg-paper-2'}`}>
          <Truck size={14} /> Genera ordine
        </button>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KpiCard label="Articoli totali" value={MAGAZZINO.length} accent={ACCENT} isDark={ctx.isDark} />
        <KpiCard label="Sotto soglia" value={critici.length} accent="#F59E0B" isDark={ctx.isDark} />
        <KpiCard label="Valore stock" value={valoreTotale} prefix="€" format="integer" accent={ACCENT} isDark={ctx.isDark} />
        <KpiCard label="Fornitori attivi" value={new Set(MAGAZZINO.map((m) => m.fornitore)).size} accent={ACCENT} isDark={ctx.isDark} />
      </div>

      <DataTable<MagazzinoItem>
        columns={[
          { key: 'codice', label: 'Codice', render: (r) => <span className="font-mono text-xs">{r.codice}</span> },
          { key: 'descrizione', label: 'Descrizione', render: (r) => <span className="font-medium">{r.descrizione}</span> },
          { key: 'categoria', label: 'Categoria', render: (r) => (
            <span className={`font-mono text-[11px] px-2 py-0.5 rounded ${ctx.isDark ? 'bg-white/10' : 'bg-paper-2'}`}>{r.categoria}</span>
          ) },
          { key: 'giacenza', label: 'Giacenza', sortable: true, align: 'right', render: (r) => (
            <span className={r.giacenza < r.minimo ? 'text-red-500 font-medium' : ''}>
              {r.giacenza} {r.uds}
            </span>
          ) },
          { key: 'minimo', label: 'Min', align: 'right', render: (r) => <span className="font-mono text-xs opacity-60">{r.minimo}</span> },
          { key: 'prezzoMedio', label: 'P.medio', sortable: true, align: 'right', render: (r) => <span className="font-mono">€{r.prezzoMedio.toFixed(2)}</span> },
          { key: 'fornitore', label: 'Fornitore', render: (r) => <span className="text-xs">{r.fornitore}</span> },
          { key: 'ultimoCarico', label: 'Ult. carico' },
        ]}
        data={MAGAZZINO}
        searchKeys={['codice', 'descrizione', 'categoria', 'fornitore']}
        searchPlaceholder="Cerca articolo, codice, fornitore..."
        rowKey={(r) => r.id}
        accent={ACCENT}
        isDark={ctx.isDark}
      />
    </Section>
  )
}

// ============ App ============
const NOTIFICATIONS: NotificationItem[] = [
  { id: 'n1', title: 'SAL #014/7 in scadenza', description: 'Cantiere Via Roma · scadenza 30 apr', time: '12 min fa', type: 'warning' },
  { id: 'n2', title: 'Margine sotto soglia', description: 'Biogas Caserta · 9.1% (target 10%)', time: '1h fa', type: 'critical' },
  { id: 'n3', title: 'DPI sotto soglia', description: 'Capannone industriale: 3 caschi danneggiati', time: '2h fa', type: 'critical' },
  { id: 'n4', title: 'Pittura ricevuta', description: 'Sikkens Pro · ordine #4218', time: '3h fa', type: 'success', read: true },
  { id: 'n5', title: 'Nuovo cantiere assegnato', description: 'Asilo nido San Marco · 380K budget', time: 'ieri', type: 'info', read: true },
]

export function BuildSuiteApp() {
  const modules: ModuleDef[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, render: (ctx) => <Dashboard ctx={ctx} /> },
    { id: 'cantieri', label: 'Cantieri', icon: Hammer, badge: CANTIERI.filter((c) => c.status === 'in-corso').length, render: (ctx) => <CantieriModule ctx={ctx} /> },
    { id: 'sal', label: 'SAL', icon: FileText, badge: SALS.filter((s) => s.status === 'pending').length, render: (ctx) => <SalModule ctx={ctx} /> },
    { id: 'sicurezza', label: 'Sicurezza', icon: HardHat, render: (ctx) => <SicurezzaModule ctx={ctx} /> },
    { id: 'magazzino', label: 'Magazzino', icon: Package, badge: MAGAZZINO.filter((m) => m.giacenza < m.minimo).length, render: (ctx) => <MagazzinoModule ctx={ctx} /> },
  ]

  return (
    <DemoShell
      brandName="BuildSuite"
      brandTagline="Edilizia & Cantieri"
      accent={ACCENT}
      modules={modules}
      notifications={NOTIFICATIONS}
    />
  )
}
