'use client'

import {
  LayoutGrid, ShoppingBag, Package, Megaphone, Brain, Plus, TrendingUp, Heart, ShoppingCart,
} from 'lucide-react'
import { DemoShell, type ModuleDef, type ShellContext, type NotificationItem } from '@/components/demo/DemoShell'
import { KpiCard } from '@/components/demo/primitives/KpiCard'
import { DataTable } from '@/components/demo/primitives/DataTable'
import { Section, StatusPill, StatChip } from '@/components/demo/primitives/Section'
import { VENDITE, PRODOTTI, CAMPAGNE, type Vendita, type Prodotto, type Campagna } from '@/content/demo-data/retail'

const ACCENT = '#EC4899'

function Dashboard({ ctx }: { ctx: ShellContext }) {
  const fatturatoOggi = VENDITE.reduce((s, v) => s + v.importo, 0)
  const carrelloMedio = fatturatoOggi / VENDITE.length
  const loyaltyPct = (VENDITE.filter((v) => v.loyalty).length / VENDITE.length) * 100
  const margineMedio = VENDITE.reduce((s, v) => s + v.margine, 0) / VENDITE.length
  const stockCritico = PRODOTTI.filter((p) => p.giacenza < p.minimo).length

  return (
    <div className="space-y-8">
      <Section
        eyebrow="DASHBOARD"
        title="Panoramica retail"
        description="POS live, magazzino, e-commerce, campagne marketing — tutto sincronizzato."
        accent={ACCENT}
        isDark={ctx.isDark}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard label="Scontrini oggi" value={VENDITE.length} delta="+9.2% vs ieri" trend="up" icon={ShoppingCart} accent={ACCENT} isDark={ctx.isDark} />
          <KpiCard label="Fatturato oggi" value={fatturatoOggi} prefix="€" delta="+€720 vs media" trend="up" icon={TrendingUp} accent={ACCENT} isDark={ctx.isDark} />
          <KpiCard label="Carrello medio" value={carrelloMedio} prefix="€" format="decimal" decimals={2} delta="+€2.30" trend="up" accent={ACCENT} isDark={ctx.isDark} />
          <KpiCard label="Margine medio" value={margineMedio} suffix="%" format="decimal" decimals={1} delta="+0.8pp" trend="up" accent="#10B981" isDark={ctx.isDark} />
          <KpiCard label="Loyalty" value={loyaltyPct} suffix="%" format="decimal" decimals={0} delta="+3pp" trend="up" icon={Heart} accent={ACCENT} isDark={ctx.isDark} />
          <KpiCard label="Resi 7gg" value={2.1} suffix="%" format="decimal" decimals={1} delta="-0.4pp" trend="down" accent="#10B981" isDark={ctx.isDark} />
          <KpiCard label="Stock critico" value={stockCritico} delta="da riassortire" trend="flat" icon={Package} accent="#F59E0B" isDark={ctx.isDark} />
          <KpiCard label="Campagne attive" value={CAMPAGNE.filter((c) => c.status === 'attiva').length} accent={ACCENT} isDark={ctx.isDark} />
        </div>
      </Section>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className={`rounded-xl border p-5 ${ctx.isDark ? 'border-white/5 bg-white/[0.02]' : 'border-line bg-white'}`}>
          <h3 className="font-serif text-lg mb-4 flex items-center gap-2">
            <TrendingUp size={16} style={{ color: ACCENT }} /> Top prodotti settimana
          </h3>
          <div className="space-y-2">
            {[...PRODOTTI].sort((a, b) => b.vendite30gg - a.vendite30gg).slice(0, 5).map((p) => (
              <div key={p.id} className={`flex items-center gap-3 p-3 rounded-lg ${ctx.isDark ? 'bg-white/[0.02]' : 'bg-paper-2'}`}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs" style={{ background: `${ACCENT}1A`, color: ACCENT }}>
                  {p.categoria.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{p.nome}</div>
                  <div className={`text-xs ${ctx.isDark ? 'text-white/50' : 'text-ink-500'}`}>€{p.prezzo.toFixed(2)} · margine {p.margine.toFixed(0)}%</div>
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
            <strong>34 clienti VIP</strong> non visitano il negozio da più di 30 giorni.
          </p>
          <p className={`text-xs mb-4 ${ctx.isDark ? 'text-white/60' : 'text-ink-500'}`}>
            Loyalty score medio: 7.8/10 — alto valore. Posso lanciare campagna SMS con voucher 15% e link personalizzato per recupero?
          </p>
          <button type="button" className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: ACCENT }}>
            Lancia campagna recupero
          </button>
        </div>
      </div>
    </div>
  )
}

function VenditeModule({ ctx }: { ctx: ShellContext }) {
  return (
    <Section
      eyebrow="VENDITE"
      title="Scontrini POS oggi"
      description="Stream live di tutte le vendite — POS fisico ed e-commerce in un'unica vista."
      accent={ACCENT}
      isDark={ctx.isDark}
    >
      <DataTable<Vendita>
        columns={[
          { key: 'scontrino', label: 'Scontrino', render: (r) => <span className="font-mono text-xs">{r.scontrino}</span> },
          { key: 'ora', label: 'Ora', sortable: true },
          { key: 'cassa', label: 'Cassa', render: (r) => (
            <span className={`font-mono text-[11px] px-2 py-0.5 rounded ${ctx.isDark ? 'bg-white/10' : 'bg-paper-2'}`}>{r.cassa}</span>
          ) },
          { key: 'articoli', label: 'Art.', align: 'center' },
          { key: 'importo', label: 'Importo', sortable: true, align: 'right', render: (r) => <span className="font-mono">€{r.importo.toFixed(2)}</span> },
          { key: 'cliente', label: 'Cliente', render: (r) => (
            <span className="inline-flex items-center gap-1.5">
              {r.cliente}
              {r.loyalty && <Heart size={11} style={{ color: ACCENT }} className="fill-current" />}
            </span>
          ) },
          { key: 'pagamento', label: 'Pagamento' },
          { key: 'margine', label: 'Marg.', align: 'right', render: (r) => (
            <span className={r.margine < 30 ? 'text-amber-500' : 'text-emerald-500'}>{r.margine.toFixed(1)}%</span>
          ) },
        ]}
        data={VENDITE}
        searchKeys={['scontrino', 'cliente', 'cassa', 'pagamento']}
        searchPlaceholder="Cerca scontrino, cliente, cassa..."
        rowKey={(r) => r.id}
        accent={ACCENT}
        isDark={ctx.isDark}
      />
    </Section>
  )
}

function MagazzinoModule({ ctx }: { ctx: ShellContext }) {
  const valoreStock = PRODOTTI.reduce((s, p) => s + p.giacenza * p.costo, 0)

  return (
    <Section
      eyebrow="MAGAZZINO"
      title={`${PRODOTTI.length} SKU a catalogo`}
      description="Gestione stock, riassortimenti automatici, valutazione magazzino in tempo reale."
      accent={ACCENT}
      isDark={ctx.isDark}
      actions={
        <button type="button" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white" style={{ background: ACCENT }}>
          <Package size={14} /> Riassortimento
        </button>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KpiCard label="SKU totali" value={PRODOTTI.length} accent={ACCENT} isDark={ctx.isDark} />
        <KpiCard label="Sotto soglia" value={PRODOTTI.filter((p) => p.giacenza < p.minimo).length} accent="#F59E0B" isDark={ctx.isDark} />
        <KpiCard label="Valore stock" value={valoreStock} prefix="€" format="integer" accent={ACCENT} isDark={ctx.isDark} />
        <KpiCard label="Top trend up" value={PRODOTTI.filter((p) => p.trend === 'up').length} accent="#10B981" isDark={ctx.isDark} />
      </div>

      <DataTable<Prodotto>
        columns={[
          { key: 'sku', label: 'SKU', render: (r) => <span className="font-mono text-xs">{r.sku}</span> },
          { key: 'nome', label: 'Prodotto', render: (r) => <span className="font-medium">{r.nome}</span> },
          { key: 'categoria', label: 'Cat.', render: (r) => (
            <span className={`font-mono text-[11px] px-2 py-0.5 rounded ${ctx.isDark ? 'bg-white/10' : 'bg-paper-2'}`}>{r.categoria}</span>
          ) },
          { key: 'prezzo', label: 'Prezzo', sortable: true, align: 'right', render: (r) => <span className="font-mono">€{r.prezzo.toFixed(2)}</span> },
          { key: 'margine', label: 'Margine', sortable: true, align: 'right', render: (r) => <span className="text-emerald-500">{r.margine.toFixed(0)}%</span> },
          { key: 'giacenza', label: 'Giacenza', sortable: true, align: 'right', render: (r) => (
            <span className={r.giacenza < r.minimo ? 'text-red-500 font-medium' : ''}>{r.giacenza}</span>
          ) },
          { key: 'vendite30gg', label: 'Vendite 30gg', sortable: true, align: 'right', render: (r) => <span className="font-mono">{r.vendite30gg}</span> },
          { key: 'trend', label: 'Trend', align: 'center', render: (r) => (
            <span className={r.trend === 'up' ? 'text-emerald-500' : r.trend === 'down' ? 'text-red-500' : 'opacity-50'}>
              {r.trend === 'up' ? '↑' : r.trend === 'down' ? '↓' : '→'}
            </span>
          ) },
        ]}
        data={PRODOTTI}
        searchKeys={['sku', 'nome', 'categoria']}
        searchPlaceholder="Cerca SKU, nome, categoria..."
        rowKey={(r) => r.id}
        accent={ACCENT}
        isDark={ctx.isDark}
      />
    </Section>
  )
}

function CampagneModule({ ctx }: { ctx: ShellContext }) {
  const totaleFatturato = CAMPAGNE.reduce((s, c) => s + c.fatturatoGenerato, 0)
  const totaleInviati = CAMPAGNE.reduce((s, c) => s + c.inviati, 0)

  return (
    <Section
      eyebrow="MARKETING"
      title="Campagne attive"
      description="Email, SMS, push e social — segmentazione, A/B test, attribution."
      accent={ACCENT}
      isDark={ctx.isDark}
      actions={
        <button type="button" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white" style={{ background: ACCENT }}>
          <Plus size={14} /> Nuova campagna
        </button>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KpiCard label="Attive" value={CAMPAGNE.filter((c) => c.status === 'attiva').length} accent="#10B981" isDark={ctx.isDark} />
        <KpiCard label="Pianificate" value={CAMPAGNE.filter((c) => c.status === 'pianificata').length} accent={ACCENT} isDark={ctx.isDark} />
        <KpiCard label="Messaggi inviati" value={totaleInviati} accent={ACCENT} isDark={ctx.isDark} />
        <KpiCard label="Fatturato generato" value={totaleFatturato} prefix="€" delta="ROI 4.2x" trend="up" accent="#10B981" isDark={ctx.isDark} />
      </div>

      <DataTable<Campagna>
        columns={[
          { key: 'nome', label: 'Nome campagna', render: (r) => <span className="font-medium">{r.nome}</span> },
          { key: 'canale', label: 'Canale', render: (r) => (
            <span className={`font-mono text-[11px] px-2 py-0.5 rounded ${ctx.isDark ? 'bg-white/10' : 'bg-paper-2'}`}>{r.canale}</span>
          ) },
          { key: 'target', label: 'Target' },
          { key: 'inviati', label: 'Inviati', sortable: true, align: 'right' },
          { key: 'aperture', label: 'Open %', sortable: true, align: 'right', render: (r) => r.aperture > 0 ? <span className="font-mono">{r.aperture.toFixed(1)}%</span> : <span className="opacity-40">—</span> },
          { key: 'conversioni', label: 'Conv %', sortable: true, align: 'right', render: (r) => r.conversioni > 0 ? <span className="font-mono text-emerald-500">{r.conversioni.toFixed(1)}%</span> : <span className="opacity-40">—</span> },
          { key: 'fatturatoGenerato', label: 'Fatturato', sortable: true, align: 'right', render: (r) => r.fatturatoGenerato > 0 ? <span className="font-mono">€{r.fatturatoGenerato.toLocaleString('it-IT')}</span> : <span className="opacity-40">—</span> },
          { key: 'status', label: 'Stato', render: (r) => {
            const map = { 'attiva': 'attivo', 'pianificata': 'pending', 'completata': 'completato', 'in pausa': 'in-pausa' } as const
            return <StatusPill status={map[r.status]} isDark={ctx.isDark} />
          } },
        ]}
        data={CAMPAGNE}
        searchKeys={['nome', 'canale', 'target']}
        searchPlaceholder="Cerca campagna, canale..."
        rowKey={(r) => r.id}
        accent={ACCENT}
        isDark={ctx.isDark}
      />
    </Section>
  )
}

const NOTIFICATIONS: NotificationItem[] = [
  { id: 'n1', title: 'Olio EVO 1L sotto soglia', description: 'Giacenza 8 vs minimo 20 - riordina', time: '12 min fa', type: 'warning' },
  { id: 'n2', title: 'Voucher VIP attivata', description: '34 clienti contattati via SMS', time: '1h fa', type: 'success' },
  { id: 'n3', title: 'Picco vendite ore 14:00', description: '+15% rispetto media oraria', time: '2h fa', type: 'info' },
  { id: 'n4', title: 'Nuova campagna pianificata', description: 'Festa della Mamma · 5 maggio', time: 'ieri', type: 'info', read: true },
]

export function RetailSuiteApp() {
  const modules: ModuleDef[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, render: (ctx) => <Dashboard ctx={ctx} /> },
    { id: 'vendite', label: 'Vendite', icon: ShoppingBag, badge: VENDITE.length, render: (ctx) => <VenditeModule ctx={ctx} /> },
    { id: 'magazzino', label: 'Magazzino', icon: Package, badge: PRODOTTI.filter((p) => p.giacenza < p.minimo).length, render: (ctx) => <MagazzinoModule ctx={ctx} /> },
    { id: 'campagne', label: 'Campagne', icon: Megaphone, badge: CAMPAGNE.filter((c) => c.status === 'attiva').length, render: (ctx) => <CampagneModule ctx={ctx} /> },
  ]

  return (
    <DemoShell
      brandName="RetailSuite"
      brandTagline="Retail & E-commerce"
      accent={ACCENT}
      modules={modules}
      notifications={NOTIFICATIONS}
    />
  )
}
