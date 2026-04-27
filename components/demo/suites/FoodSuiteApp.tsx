'use client'

import {
  LayoutGrid, ChefHat, Truck, ShieldCheck, Package, Brain, Plus, Star, AlertTriangle, TrendingUp,
} from 'lucide-react'
import { DemoShell, type ModuleDef, type ShellContext, type NotificationItem } from '@/components/demo/DemoShell'
import { KpiCard } from '@/components/demo/primitives/KpiCard'
import { DataTable } from '@/components/demo/primitives/DataTable'
import { Section, StatusPill, StatChip } from '@/components/demo/primitives/Section'
import { MENU, ORDINI, HACCP, type PiattoMenu, type OrdineFornitore, type HACCPCheck } from '@/content/demo-data/food'

const ACCENT = '#F59E0B'

function Dashboard({ ctx }: { ctx: ShellContext }) {
  const venditeMese = MENU.reduce((s, p) => s + p.vendite30gg * p.prezzo, 0)
  const foodCostMedio = MENU.reduce((s, p) => s + (p.costo / p.prezzo) * 100 * p.vendite30gg, 0) / MENU.reduce((s, p) => s + p.vendite30gg, 0)
  const haccpOk = HACCP.filter((h) => h.status === 'ok').length
  const haccpCritici = HACCP.filter((h) => h.status === 'critico').length

  return (
    <div className="space-y-8">
      <Section
        eyebrow="DASHBOARD"
        title="Panoramica ristorante"
        description="Coperti, food cost, ordini fornitori, HACCP — tutto in tempo reale."
        accent={ACCENT}
        isDark={ctx.isDark}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard label="Coperti oggi" value={124} delta="+12% vs ieri" trend="up" accent={ACCENT} isDark={ctx.isDark} />
          <KpiCard label="Food cost medio" value={foodCostMedio} suffix="%" format="decimal" decimals={1} delta="-1.6pp vs target" trend="down" accent="#10B981" isDark={ctx.isDark} />
          <KpiCard label="Ricavi 30gg" value={venditeMese} prefix="€" delta="+€8.2K vs prev" trend="up" icon={TrendingUp} accent={ACCENT} isDark={ctx.isDark} />
          <KpiCard label="Ordini pending" value={ORDINI.filter((o) => o.status === 'pending').length} delta={`€${ORDINI.filter((o) => o.status === 'pending').reduce((s, o) => s + o.importo, 0).toFixed(0)} totale`} trend="flat" icon={Truck} accent={ACCENT} isDark={ctx.isDark} />
          <KpiCard label="Piatti attivi" value={MENU.filter((m) => m.attivo).length} delta="su 64 totali" trend="flat" icon={ChefHat} accent={ACCENT} isDark={ctx.isDark} />
          <KpiCard label="HACCP OK" value={haccpOk} suffix={`/${HACCP.length}`} accent="#10B981" isDark={ctx.isDark} />
          <KpiCard label="Critici" value={haccpCritici} delta="da gestire" trend={haccpCritici > 0 ? 'down' : 'flat'} icon={AlertTriangle} accent="#EF4444" isDark={ctx.isDark} />
          <KpiCard label="Riservazioni" value={24} delta="domani sera" trend="up" accent={ACCENT} isDark={ctx.isDark} />
        </div>
      </Section>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className={`rounded-xl border p-5 ${ctx.isDark ? 'border-white/5 bg-white/[0.02]' : 'border-line bg-white'}`}>
          <h3 className="font-serif text-lg mb-4 flex items-center gap-2">
            <Star size={16} style={{ color: ACCENT }} />
            Top piatti settimana
          </h3>
          <div className="space-y-2">
            {[...MENU].sort((a, b) => b.vendite30gg - a.vendite30gg).slice(0, 5).map((p) => (
              <div key={p.id} className={`flex items-center gap-3 p-3 rounded-lg ${ctx.isDark ? 'bg-white/[0.02]' : 'bg-paper-2'}`}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm" style={{ background: `${ACCENT}1A`, color: ACCENT }}>
                  {p.categoria[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{p.nome}</div>
                  <div className={`text-xs ${ctx.isDark ? 'text-white/50' : 'text-ink-500'}`}>{p.categoria} · €{p.prezzo.toFixed(2)}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono font-medium">{p.vendite30gg}</div>
                  <div className="text-[10px] opacity-60">unità</div>
                </div>
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
            <strong>Risotto al tartufo</strong> ha food cost 41% — sopra soglia 30%.
          </p>
          <p className={`text-xs mb-4 ${ctx.isDark ? 'text-white/60' : 'text-ink-500'}`}>
            Costo tartufo +18% questo mese. Posso proporti 3 varianti di menu con food cost target 30% mantenendo posizionamento gourmet?
          </p>
          <button type="button" className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: ACCENT }}>
            Genera varianti menu
          </button>
        </div>
      </div>
    </div>
  )
}

function MenuModule({ ctx }: { ctx: ShellContext }) {
  return (
    <Section
      eyebrow="MENU"
      title={`${MENU.length} piatti in carta`}
      description="Gestione completa menu con food cost, margine e analitiche di vendita."
      accent={ACCENT}
      isDark={ctx.isDark}
      actions={
        <button type="button" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white" style={{ background: ACCENT }}>
          <Plus size={14} /> Nuovo piatto
        </button>
      }
    >
      <DataTable<PiattoMenu>
        columns={[
          { key: 'nome', label: 'Piatto', render: (r) => <span className="font-medium">{r.nome}</span> },
          { key: 'categoria', label: 'Cat.', render: (r) => (
            <span className={`font-mono text-[11px] px-2 py-0.5 rounded ${ctx.isDark ? 'bg-white/10' : 'bg-paper-2'}`}>{r.categoria}</span>
          ) },
          { key: 'prezzo', label: 'Prezzo', sortable: true, align: 'right', render: (r) => <span className="font-mono">€{r.prezzo.toFixed(2)}</span> },
          { key: 'costo', label: 'Costo', sortable: true, align: 'right', render: (r) => <span className="font-mono opacity-70">€{r.costo.toFixed(2)}</span> },
          { key: 'margine', label: 'Margine', sortable: true, align: 'right', render: (r) => (
            <span className={r.margine < 60 ? 'text-amber-500 font-medium' : 'text-emerald-500'}>{r.margine.toFixed(1)}%</span>
          ) },
          { key: 'vendite30gg', label: 'Vendite 30gg', sortable: true, align: 'right', render: (r) => <span className="font-mono">{r.vendite30gg}</span> },
          { key: 'rating', label: 'Rating', align: 'center', render: (r) => (
            <span className="inline-flex items-center gap-1">
              <Star size={11} className="fill-current" style={{ color: ACCENT }} />
              <span className="font-mono">{r.rating}</span>
            </span>
          ) },
          { key: 'attivo', label: 'Stato', render: (r) => <StatusPill status={r.attivo ? 'attivo' : 'in-pausa'} isDark={ctx.isDark} /> },
        ]}
        data={MENU}
        searchKeys={['nome', 'categoria']}
        searchPlaceholder="Cerca piatto o categoria..."
        rowKey={(r) => r.id}
        accent={ACCENT}
        isDark={ctx.isDark}
      />
    </Section>
  )
}

function OrdiniModule({ ctx }: { ctx: ShellContext }) {
  return (
    <Section
      eyebrow="ORDINI FORNITORI"
      title={`${ORDINI.length} ordini in corso`}
      description="Tracking real-time degli ordini, dalle conferme alle consegne."
      accent={ACCENT}
      isDark={ctx.isDark}
      actions={
        <button type="button" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white" style={{ background: ACCENT }}>
          <Plus size={14} /> Nuovo ordine
        </button>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KpiCard label="In transito" value={ORDINI.filter((o) => o.status === 'in-transito').length} accent={ACCENT} isDark={ctx.isDark} />
        <KpiCard label="Confermati" value={ORDINI.filter((o) => o.status === 'confermato').length} accent="#10B981" isDark={ctx.isDark} />
        <KpiCard label="Pending" value={ORDINI.filter((o) => o.status === 'pending').length} accent="#F59E0B" isDark={ctx.isDark} />
        <KpiCard label="Importo settimana" value={ORDINI.reduce((s, o) => s + o.importo, 0)} prefix="€" format="integer" accent={ACCENT} isDark={ctx.isDark} />
      </div>

      <DataTable<OrdineFornitore>
        columns={[
          { key: 'numero', label: 'N. Ordine', render: (r) => <span className="font-mono text-xs">{r.numero}</span> },
          { key: 'fornitore', label: 'Fornitore', render: (r) => <span className="font-medium">{r.fornitore}</span> },
          { key: 'categoria', label: 'Cat.', render: (r) => (
            <span className={`font-mono text-[11px] px-2 py-0.5 rounded ${ctx.isDark ? 'bg-white/10' : 'bg-paper-2'}`}>{r.categoria}</span>
          ) },
          { key: 'articoli', label: 'Art.', align: 'center', render: (r) => <span className="font-mono">{r.articoli}</span> },
          { key: 'importo', label: 'Importo', sortable: true, align: 'right', render: (r) => <span className="font-mono">€{r.importo.toFixed(2)}</span> },
          { key: 'consegna', label: 'Consegna', sortable: true, render: (r) => <span className="font-mono text-xs">{r.consegna}</span> },
          { key: 'status', label: 'Stato', render: (r) => {
            const map = { 'confermato': 'confermato', 'in-transito': 'in-corso', 'pending': 'pending', 'in-revisione': 'in-revisione' } as const
            return <StatusPill status={map[r.status]} isDark={ctx.isDark} />
          } },
        ]}
        data={ORDINI}
        searchKeys={['numero', 'fornitore', 'categoria']}
        searchPlaceholder="Cerca fornitore, ordine, categoria..."
        rowKey={(r) => r.id}
        accent={ACCENT}
        isDark={ctx.isDark}
      />
    </Section>
  )
}

function HACCPModule({ ctx }: { ctx: ShellContext }) {
  return (
    <Section
      eyebrow="HACCP"
      title={`${HACCP.length} controlli registrati`}
      description="Tracciabilità HACCP: temperature, sanificazioni, audit interni."
      accent={ACCENT}
      isDark={ctx.isDark}
      actions={
        <button type="button" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white" style={{ background: ACCENT }}>
          <ShieldCheck size={14} /> Registra controllo
        </button>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KpiCard label="OK" value={HACCP.filter((h) => h.status === 'ok').length} accent="#10B981" isDark={ctx.isDark} />
        <KpiCard label="Warning" value={HACCP.filter((h) => h.status === 'warning').length} accent="#F59E0B" isDark={ctx.isDark} />
        <KpiCard label="Critici" value={HACCP.filter((h) => h.status === 'critico').length} accent="#EF4444" isDark={ctx.isDark} />
        <KpiCard label="Aree coperte" value={new Set(HACCP.map((h) => h.area)).size} accent={ACCENT} isDark={ctx.isDark} />
      </div>

      <DataTable<HACCPCheck>
        columns={[
          { key: 'area', label: 'Area', render: (r) => (
            <span className={`font-mono text-[11px] px-2 py-0.5 rounded ${ctx.isDark ? 'bg-white/10' : 'bg-paper-2'}`}>{r.area}</span>
          ) },
          { key: 'controllo', label: 'Controllo', render: (r) => <span className="font-medium">{r.controllo}</span> },
          { key: 'ultimoControllo', label: 'Ultimo', sortable: true, render: (r) => <span className="font-mono text-xs">{r.ultimoControllo}</span> },
          { key: 'temperatura', label: 'Temp.', render: (r) => r.temperatura ? <span className="font-mono">{r.temperatura}</span> : <span className="opacity-40 text-xs">—</span> },
          { key: 'responsabile', label: 'Responsabile', render: (r) => <span className="text-xs">{r.responsabile}</span> },
          { key: 'status', label: 'Stato', render: (r) => (
            <StatusPill status={r.status === 'ok' ? 'attivo' : r.status === 'warning' ? 'in-revisione' : 'critico'} isDark={ctx.isDark} />
          ) },
        ]}
        data={HACCP}
        searchKeys={['area', 'controllo', 'responsabile']}
        searchPlaceholder="Cerca area, controllo, responsabile..."
        rowKey={(r) => r.id}
        accent={ACCENT}
        isDark={ctx.isDark}
      />
    </Section>
  )
}

const NOTIFICATIONS: NotificationItem[] = [
  { id: 'n1', title: 'Frigo pesce sotto soglia', description: '+1.1°C - controllare termostato', time: '8 min fa', type: 'critical' },
  { id: 'n2', title: 'Pesce in arrivo', description: 'Cooperativa Pesca Sud · h 06:00', time: '15 min fa', type: 'info' },
  { id: 'n3', title: 'Risotto tartufo: food cost 41%', description: 'Suggerimento CoreMind disponibile', time: '1h fa', type: 'warning' },
  { id: 'n4', title: 'HACCP completati', description: '12/12 controlli pulizia chiusura', time: '2h fa', type: 'success', read: true },
]

export function FoodSuiteApp() {
  const modules: ModuleDef[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, render: (ctx) => <Dashboard ctx={ctx} /> },
    { id: 'menu', label: 'Menu', icon: ChefHat, badge: MENU.length, render: (ctx) => <MenuModule ctx={ctx} /> },
    { id: 'ordini', label: 'Ordini fornitori', icon: Truck, badge: ORDINI.filter((o) => o.status === 'pending').length, render: (ctx) => <OrdiniModule ctx={ctx} /> },
    { id: 'haccp', label: 'HACCP', icon: ShieldCheck, badge: HACCP.filter((h) => h.status === 'critico').length || undefined, render: (ctx) => <HACCPModule ctx={ctx} /> },
  ]

  return (
    <DemoShell
      brandName="FoodSuite"
      brandTagline="Ristorazione"
      accent={ACCENT}
      modules={modules}
      notifications={NOTIFICATIONS}
    />
  )
}
