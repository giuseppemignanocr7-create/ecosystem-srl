'use client'

import { useState } from 'react'
import {
  LayoutGrid, Folder, Calendar, FileText, Send, Brain, Plus, Download, AlertTriangle, Clock, Wallet,
} from 'lucide-react'
import { DemoShell, type ModuleDef, type ShellContext, type NotificationItem } from '@/components/demo/DemoShell'
import { KpiCard } from '@/components/demo/primitives/KpiCard'
import { DataTable } from '@/components/demo/primitives/DataTable'
import { Drawer } from '@/components/demo/primitives/Drawer'
import { Section, StatusPill, StatChip } from '@/components/demo/primitives/Section'
import { FASCICOLI, SCADENZE, PCT_DEPOSITI, type Fascicolo, type Scadenza, type PCTDeposito } from '@/content/demo-data/legal'

const ACCENT = '#D4A521'

function Dashboard({ ctx }: { ctx: ShellContext }) {
  const oreFatturate = FASCICOLI.reduce((s, f) => s + f.oreFatturate, 0)
  const valoreCause = FASCICOLI.reduce((s, f) => s + (f.valore ?? 0), 0)
  const scadenzeUrgenti = SCADENZE.filter((s) => s.priorita === 'alta' && s.status === 'pending').length

  return (
    <div className="space-y-8">
      <Section
        eyebrow="DASHBOARD"
        title="Panoramica studio"
        description="Tutti i fascicoli, le scadenze processuali e i depositi PCT in un'unica vista."
        accent={ACCENT}
        isDark={ctx.isDark}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard label="Fascicoli attivi" value={FASCICOLI.filter((f) => f.status !== 'chiusa').length} delta="+3 questa sett" trend="up" icon={Folder} accent={ACCENT} isDark={ctx.isDark} />
          <KpiCard label="Scadenze 7gg" value={SCADENZE.filter((s) => s.status === 'pending').length} delta={`${scadenzeUrgenti} urgenti`} trend={scadenzeUrgenti > 0 ? 'down' : 'flat'} icon={Calendar} accent="#EF4444" isDark={ctx.isDark} />
          <KpiCard label="Valore cause" value={valoreCause / 1000} prefix="€" suffix="K" format="decimal" decimals={1} delta="totale gestito" trend="flat" icon={Wallet} accent={ACCENT} isDark={ctx.isDark} />
          <KpiCard label="Ore fatturabili" value={oreFatturate} suffix="h" delta="92% recuperabili" trend="up" icon={Clock} accent={ACCENT} isDark={ctx.isDark} />
          <KpiCard label="Depositi PCT 30gg" value={PCT_DEPOSITI.length} delta={`${PCT_DEPOSITI.filter((p) => p.status === 'depositato').length} depositati`} trend="up" icon={Send} accent={ACCENT} isDark={ctx.isDark} />
          <KpiCard label="Udienze settimana" value={8} delta="3 telematiche" trend="flat" icon={Calendar} accent={ACCENT} isDark={ctx.isDark} />
          <KpiCard label="AI queries" value={89} delta="CoreMind attivo" trend="flat" icon={Brain} accent={ACCENT} isDark={ctx.isDark} />
          <KpiCard label="Fatturato mese" value={24500} prefix="€" delta="+8.7%" trend="up" icon={Wallet} accent="#10B981" isDark={ctx.isDark} />
        </div>
      </Section>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className={`rounded-xl border p-5 ${ctx.isDark ? 'border-white/5 bg-white/[0.02]' : 'border-line bg-white'}`}>
          <h3 className="font-serif text-lg mb-4">Scadenze critiche 24h</h3>
          <div className="space-y-2">
            {SCADENZE.filter((s) => s.status === 'pending').slice(0, 4).map((s) => (
              <div key={s.id} className={`flex items-center gap-3 p-3 rounded-lg ${ctx.isDark ? 'bg-white/[0.02]' : 'bg-paper-2'}`}>
                <AlertTriangle size={16} className={s.priorita === 'alta' ? 'text-red-500' : 'text-amber-500'} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{s.tipo}</div>
                  <div className={`text-xs ${ctx.isDark ? 'text-white/50' : 'text-ink-500'}`}>{s.fascicoloRg} · {s.cliente}</div>
                </div>
                <span className={`font-mono text-xs ${s.priorita === 'alta' ? 'text-red-500 font-semibold' : ''}`}>
                  {s.data}{s.ora && ` ${s.ora}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-xl border p-5 ${ctx.isDark ? 'border-white/5 bg-white/[0.02]' : 'border-line bg-white'}`}>
          <div className="flex items-center gap-2 mb-3">
            <Brain size={16} style={{ color: ACCENT }} />
            <h3 className="font-serif text-lg">CoreMind suggerisce</h3>
          </div>
          <p className={`text-sm mb-3 ${ctx.isDark ? 'text-white/80' : 'text-ink-700'}`}>
            Trovate <strong>3 sentenze recenti</strong> Cassazione rilevanti per il fascicolo 1234/2026.
          </p>
          <p className={`text-xs mb-4 ${ctx.isDark ? 'text-white/60' : 'text-ink-500'}`}>
            Sez. III Civ. n. 12.847/2026 modifica l&apos;orientamento sulla responsabilità condominiale. Vuoi integri la massima nella memoria 183 c.p.c. in preparazione?
          </p>
          <button type="button" className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: ACCENT }}>
            Integra giurisprudenza
          </button>
        </div>
      </div>
    </div>
  )
}

function FascicoliModule({ ctx }: { ctx: ShellContext }) {
  const [selected, setSelected] = useState<Fascicolo | null>(null)

  return (
    <Section
      eyebrow="FASCICOLI"
      title={`${FASCICOLI.length} fascicoli totali`}
      description="Gestione completa pratiche civili, penali, lavoro, famiglia, tributario."
      accent={ACCENT}
      isDark={ctx.isDark}
      actions={
        <button type="button" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white" style={{ background: ACCENT }}>
          <Plus size={14} /> Nuovo fascicolo
        </button>
      }
    >
      <DataTable<Fascicolo>
        columns={[
          { key: 'rg', label: 'N. RG', render: (r) => <span className="font-mono text-xs">{r.rg}</span> },
          { key: 'cliente', label: 'Cliente', render: (r) => (
            <div>
              <div className="font-medium">{r.cliente}</div>
              {r.controparte && <div className={`text-xs ${ctx.isDark ? 'text-white/50' : 'text-ink-500'}`}>vs {r.controparte}</div>}
            </div>
          ) },
          { key: 'tipo', label: 'Tipo', render: (r) => (
            <span className={`font-mono text-[11px] px-2 py-0.5 rounded ${ctx.isDark ? 'bg-white/10' : 'bg-paper-2'}`}>{r.tipo}</span>
          ) },
          { key: 'foro', label: 'Foro', render: (r) => <span className="text-xs">{r.foro}</span> },
          { key: 'valore', label: 'Valore', sortable: true, align: 'right', render: (r) => r.valore ? <span className="font-mono">€{r.valore.toLocaleString('it-IT')}</span> : <span className="opacity-40">—</span> },
          { key: 'prossimaUdienza', label: 'Prossima udienza', sortable: true, render: (r) => r.prossimaUdienza ? <span className="font-mono text-xs">{r.prossimaUdienza}</span> : <span className="opacity-40">—</span> },
          { key: 'status', label: 'Stato', render: (r) => <StatusPill status={r.status} isDark={ctx.isDark} /> },
        ]}
        data={FASCICOLI}
        searchKeys={['rg', 'cliente', 'controparte', 'tipo', 'foro']}
        searchPlaceholder="Cerca per RG, cliente, foro..."
        onRowClick={setSelected}
        rowKey={(r) => r.id}
        accent={ACCENT}
        isDark={ctx.isDark}
      />

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.cliente}` : ''}
        subtitle={selected ? `RG ${selected.rg} · ${selected.tipo}` : undefined}
        accent={ACCENT}
        isDark={ctx.isDark}
      >
        {selected && (
          <div className="space-y-5 text-sm">
            <div className="flex flex-wrap gap-2">
              <StatChip label="Tipo" value={selected.tipo} isDark={ctx.isDark} />
              <StatChip label="Foro" value={selected.foro} isDark={ctx.isDark} />
              {selected.giudice && <StatChip label="Giudice" value={selected.giudice} isDark={ctx.isDark} />}
              {selected.valore && <StatChip label="Valore" value={`€${selected.valore.toLocaleString('it-IT')}`} tone="success" isDark={ctx.isDark} />}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg ${ctx.isDark ? 'bg-white/5' : 'bg-paper-2'}`}>
                <div className={`font-mono text-[10px] tracking-wider uppercase mb-1 ${ctx.isDark ? 'text-white/40' : 'text-ink-400'}`}>Apertura</div>
                <div className="font-medium">{selected.apertura}</div>
              </div>
              <div className={`p-3 rounded-lg ${ctx.isDark ? 'bg-white/5' : 'bg-paper-2'}`}>
                <div className={`font-mono text-[10px] tracking-wider uppercase mb-1 ${ctx.isDark ? 'text-white/40' : 'text-ink-400'}`}>Prossima udienza</div>
                <div className="font-medium">{selected.prossimaUdienza ?? '—'}</div>
              </div>
              <div className={`p-3 rounded-lg ${ctx.isDark ? 'bg-white/5' : 'bg-paper-2'}`}>
                <div className={`font-mono text-[10px] tracking-wider uppercase mb-1 ${ctx.isDark ? 'text-white/40' : 'text-ink-400'}`}>Ore fatturate</div>
                <div className="font-serif text-xl">{selected.oreFatturate}h</div>
              </div>
              <div className={`p-3 rounded-lg ${ctx.isDark ? 'bg-white/5' : 'bg-paper-2'}`}>
                <div className={`font-mono text-[10px] tracking-wider uppercase mb-1 ${ctx.isDark ? 'text-white/40' : 'text-ink-400'}`}>Parcella</div>
                <div className="font-serif text-xl">€{selected.parcellaPreventivata.toLocaleString('it-IT')}</div>
              </div>
            </div>

            <div className={`p-4 rounded-lg border ${ctx.isDark ? 'border-white/10 bg-amber-500/[0.04]' : 'border-amber-200 bg-amber-50'}`}>
              <div className="flex items-center gap-2 mb-2">
                <Brain size={14} style={{ color: ACCENT }} />
                <span className="font-medium text-sm">CoreMind</span>
              </div>
              <p className={`text-sm ${ctx.isDark ? 'text-white/80' : 'text-ink-700'}`}>
                Per il fascicolo {selected.rg} suggerisco di {selected.tipo === 'Civile' ? 'verificare i precedenti Cass. Sez. III Civ. ultimi 6 mesi' : selected.tipo === 'Penale' ? 'preparare memoria 415 bis con focus su prove documentali' : 'consultare la giurisprudenza CGUE recente in materia'}.
              </p>
            </div>

            <div className="flex gap-2">
              <button type="button" className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: ACCENT }}>Apri fascicolo</button>
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

function ScadenzeModule({ ctx }: { ctx: ShellContext }) {
  return (
    <Section
      eyebrow="SCADENZIARIO"
      title="Scadenze processuali"
      description="Tutti i termini perentori, ordinatori e di prescrizione in un'unica vista cronologica."
      accent={ACCENT}
      isDark={ctx.isDark}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KpiCard label="Pending" value={SCADENZE.filter((s) => s.status === 'pending').length} accent={ACCENT} isDark={ctx.isDark} />
        <KpiCard label="Alta priorità" value={SCADENZE.filter((s) => s.priorita === 'alta' && s.status === 'pending').length} accent="#EF4444" isDark={ctx.isDark} />
        <KpiCard label="Risolte 30gg" value={SCADENZE.filter((s) => s.status === 'risolto').length} accent="#10B981" isDark={ctx.isDark} />
        <KpiCard label="Scadute" value={SCADENZE.filter((s) => s.status === 'scaduto').length} accent="#EF4444" isDark={ctx.isDark} />
      </div>

      <DataTable<Scadenza>
        columns={[
          { key: 'data', label: 'Data', sortable: true, render: (r) => (
            <div className="font-mono text-xs">
              {r.data}
              {r.ora && <div className="opacity-60">{r.ora}</div>}
            </div>
          ) },
          { key: 'tipo', label: 'Atto', render: (r) => <span className="font-medium">{r.tipo}</span> },
          { key: 'fascicoloRg', label: 'RG', render: (r) => <span className="font-mono text-xs">{r.fascicoloRg}</span> },
          { key: 'cliente', label: 'Cliente' },
          { key: 'priorita', label: 'Priorità', render: (r) => (
            <span className={`text-xs font-medium uppercase ${
              r.priorita === 'alta' ? 'text-red-500' : r.priorita === 'media' ? 'text-amber-500' : 'text-emerald-500'
            }`}>{r.priorita}</span>
          ) },
          { key: 'status', label: 'Stato', render: (r) => <StatusPill status={r.status} isDark={ctx.isDark} /> },
        ]}
        data={SCADENZE}
        searchKeys={['fascicoloRg', 'cliente', 'tipo']}
        searchPlaceholder="Cerca per fascicolo, cliente, atto..."
        rowKey={(r) => r.id}
        accent={ACCENT}
        isDark={ctx.isDark}
      />
    </Section>
  )
}

function PCTModule({ ctx }: { ctx: ShellContext }) {
  return (
    <Section
      eyebrow="PCT"
      title="Processo Civile Telematico"
      description="Storico depositi telematici, ricevute di accettazione e atti rifiutati."
      accent={ACCENT}
      isDark={ctx.isDark}
      actions={
        <button type="button" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white" style={{ background: ACCENT }}>
          <Send size={14} /> Nuovo deposito
        </button>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KpiCard label="Depositati 30gg" value={PCT_DEPOSITI.filter((p) => p.status === 'depositato').length} accent="#10B981" isDark={ctx.isDark} />
        <KpiCard label="In elaborazione" value={PCT_DEPOSITI.filter((p) => p.status === 'in-elaborazione').length} accent="#F59E0B" isDark={ctx.isDark} />
        <KpiCard label="Rifiutati" value={PCT_DEPOSITI.filter((p) => p.status === 'rifiutato').length} accent="#EF4444" isDark={ctx.isDark} />
        <KpiCard label="Uffici attivi" value={new Set(PCT_DEPOSITI.map((p) => p.ufficio)).size} accent={ACCENT} isDark={ctx.isDark} />
      </div>

      <DataTable<PCTDeposito>
        columns={[
          { key: 'data', label: 'Data deposito', sortable: true, render: (r) => <span className="font-mono text-xs">{r.data}</span> },
          { key: 'atto', label: 'Atto', render: (r) => <span className="font-medium">{r.atto}</span> },
          { key: 'fascicoloRg', label: 'RG', render: (r) => <span className="font-mono text-xs">{r.fascicoloRg}</span> },
          { key: 'ufficio', label: 'Ufficio' },
          { key: 'status', label: 'Stato', render: (r) => {
            const map = { 'depositato': 'completato', 'in-elaborazione': 'pending', 'rifiutato': 'critico' } as const
            return <StatusPill status={map[r.status]} isDark={ctx.isDark} />
          } },
          { key: 'ricevutaAccettazione', label: 'Ricevuta', render: (r) => r.ricevutaAccettazione ? <span className="font-mono text-[10px] opacity-70">{r.ricevutaAccettazione}</span> : <span className="opacity-40 text-xs">—</span> },
        ]}
        data={PCT_DEPOSITI}
        searchKeys={['atto', 'fascicoloRg', 'ufficio']}
        searchPlaceholder="Cerca per atto, RG, ufficio..."
        rowKey={(r) => r.id}
        accent={ACCENT}
        isDark={ctx.isDark}
      />
    </Section>
  )
}

const NOTIFICATIONS: NotificationItem[] = [
  { id: 'n1', title: 'Memoria 183 in scadenza', description: 'Fascicolo 1234/2026 · domani 09:00', time: '5 min fa', type: 'critical' },
  { id: 'n2', title: 'PCT rifiutato', description: 'Memoria 415 bis · procura mancante', time: '1h fa', type: 'critical' },
  { id: 'n3', title: 'Cassazione · nuova sentenza', description: 'Sez. III Civ. 12.847/2026 rilevante', time: '3h fa', type: 'info' },
  { id: 'n4', title: 'PCT accettato', description: 'Comparsa di risposta · Trib. Caserta', time: 'ieri', type: 'success', read: true },
]

export function LegalMindApp() {
  const modules: ModuleDef[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, render: (ctx) => <Dashboard ctx={ctx} /> },
    { id: 'fascicoli', label: 'Fascicoli', icon: Folder, badge: FASCICOLI.filter((f) => f.status !== 'chiusa').length, render: (ctx) => <FascicoliModule ctx={ctx} /> },
    { id: 'scadenze', label: 'Scadenziario', icon: Calendar, badge: SCADENZE.filter((s) => s.priorita === 'alta' && s.status === 'pending').length, render: (ctx) => <ScadenzeModule ctx={ctx} /> },
    { id: 'pct', label: 'PCT Telematico', icon: Send, render: (ctx) => <PCTModule ctx={ctx} /> },
  ]

  return (
    <DemoShell
      brandName="LegalMind"
      brandTagline="Studi Legali"
      accent={ACCENT}
      modules={modules}
      notifications={NOTIFICATIONS}
    />
  )
}
