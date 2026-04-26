# Dossier di Audit · Ecosystem Website

**Data audit:** 26/04/2026  
**Run:** 1/2 (Frontend completo + Playground live + Demo sandbox)  
**Stato generale:** Codice completo, dev server attivo su `http://localhost:3000`  
**Blocco build produzione:** Errore filesystem exFAT su `node_modules\next\dist\pages\_app.js` (EISDIR)

---

## 1. Struttura del progetto

```
sito ecosystem/
├── app/                          # Next.js 14 App Router
│   ├── api/coremind-playground/  # Endpoint Claude con rate limit
│   ├── azienda/                  # Chi siamo
│   ├── contatti/                 # Form demo (mock Run 1)
│   ├── coremind/                 # Pagina CoreMind + Playground live
│   ├── demo/                     # Sandbox 4 suite interattive
│   ├── integrazioni/             # 200+ integrazioni
│   ├── piattaforma/              # Stack, sicurezza, SLA
│   ├── pricing/                  # Piani + calcolatore ROI
│   ├── supporto/                 # Canali supporto + SLA
│   ├── suite/                    # Landing + 13 pagine vertical
│   │   ├── buildsuite/
│   │   ├── legalmind/
│   │   ├── dentalsuite/
│   │   ├── foodsuite/
│   │   ├── okchef/
│   │   ├── fishsuite/
│   │   ├── retailsuite/
│   │   ├── rentsuite/
│   │   ├── techsuite/
│   │   ├── consulente-virtuale/
│   │   ├── civiccore/
│   │   ├── petverse/
│   │   └── archon-os/
│   ├── globals.css               # Design tokens, utilities
│   ├── layout.tsx                # Root layout + SEO
│   ├── not-found.tsx             # 404
│   ├── page.tsx                  # Homepage (11 sezioni)
│   ├── robots.ts                 # Robots dinamici
│   └── sitemap.ts                # Sitemap dinamica
├── components/
│   ├── layout/                   # Navbar, Footer, CookieBanner
│   ├── sections/                 # 11 sezioni homepage
│   ├── templates/                # SuitePageTemplate
│   └── ui/                       # Button, Card, Badge, SectionNumber, Reveal
├── content/                      # Suites, pricing, FAQ, integrations (IT)
├── lib/                          # utils.ts, constants.ts
├── public/                       # Assets statici
├── next.config.js                # output: 'export', distDir: 'dist'
├── tailwind.config.ts            # Design system completo
├── tsconfig.json                 # strict TS
└── .env.local.example            # Variabili ambiente
```

---

## 2. Pagine create (22 totali)

### 2.1 Homepage (`/`)
11 sezioni in sequenza:

| # | Sezione | File | Note |
|---|---------|------|------|
| 01 | Hero | `components/sections/Hero.tsx` | H1 + CTA doppio + dashboard mockup animato |
| 02 | TrustStrip | `components/sections/TrustStrip.tsx` | €50M+, 13 verticali, stats chiave |
| 03 | CoreMindFlagship | `components/sections/CoreMindFlagship.tsx` | Dark section con chat mockup |
| 04 | SuiteGrid | `components/sections/SuiteGrid.tsx` | 13 card + "il tuo settore" |
| 05 | HowItWorks | `components/sections/HowItWorks.tsx` | 3 step metodo |
| 06 | DemoPreview | `components/sections/DemoPreview.tsx` | CTA verso sandbox |
| 07 | Integrations | `components/sections/Integrations.tsx` | Grid 32 integrazioni popolari |
| 08 | ManifestoQuote | `components/sections/ManifestoQuote.tsx` | Citazione fondatore |
| 09 | PricingTeaser | `components/sections/PricingTeaser.tsx` | 3 piani + CTA ROI |
| 10 | FAQ | `components/sections/FAQ.tsx` | 8 domande con accordion |
| 11 | CTABand | `components/sections/CTABand.tsx` | Prenota demo + telefono |

### 2.2 Pagine istituzionali

| Route | File | Contenuto |
|-------|------|-----------|
| `/coremind` | `app/coremind/page.tsx` | Hero + 12 capabilities + Playground live Claude + Security + CTA |
| `/demo` | `app/demo/page.tsx` | 4 suite sandbox (BuildSuite, LegalMind, FoodSuite, RetailSuite) con dati seed + tour + chat widget + export PDF |
| `/suite` | `app/suite/page.tsx` | Landing portfolio con 13 card |
| `/pricing` | `app/pricing/page.tsx` | 3 piani + calcolatore utenti/suite + add-ons |
| `/azienda` | `app/azienda/page.tsx` | Team (SB, GM, DM), valori, dati legali |
| `/contatti` | `app/contatti/page.tsx` | Form 7 campi (mock Run 1) + contatti diretti |
| `/integrazioni` | `app/integrazioni/page.tsx` | 200+ integrazioni per categoria |
| `/supporto` | `app/supporto/page.tsx` | 4 canali + SLA table + risorse |
| `/piattaforma` | `app/piattaforma/page.tsx` | Stack, security, compliance (GDPR, AI Act, ISO), SLA 99.9-99.99% |

### 2.3 Pagine Suite (13)

Tutte usano `components/templates/SuitePageTemplate.tsx` con dati da `content/suites.ts`:

1. `/suite/buildsuite/` · Edilizia e Cantieri
2. `/suite/legalmind/` · Studi Legali
3. `/suite/dentalsuite/` · Odontoiatria
4. `/suite/foodsuite/` · Ristorazione
5. `/suite/okchef/` · Approvvigionamento
6. `/suite/fishsuite/` · Settore Ittico
7. `/suite/retailsuite/` · Retail/E-commerce
8. `/suite/rentsuite/` · Property Management
9. `/suite/techsuite/` · Software House/IT
10. `/suite/consulente-virtuale/` · Consulenza Lavoro
11. `/suite/civiccore/` · PA/CAF/Patronati
12. `/suite/petverse/` · Veterinaria/Petshop
13. `/suite/archon-os/` · Business OS multi-entity

Ogni pagina suite ha 8 sezioni: Hero → Pain Points → Moduli → Features → CoreMind Use Cases → Case Study → Integrazioni → FAQ → Pricing → CTA.

---

## 3. Funzionalità tecniche

### 3.1 CoreMind Playground Live (`/api/coremind-playground`)

- **Runtime:** Edge
- **Modello:** `claude-3-5-sonnet-20241022`
- **System prompt:** Dedicato con regole per simulazioni realistiche (SAL, POS, HACCP, ISEE)
- **Rate limit:** 10 messaggi/ora per IP (hash SHA-256), in-memory Map
- **Context window:** Ultimi 6 messaggi
- **Fallback:** Messaggi errore chiari se API key mancante o rate reached

### 3.2 Demo Sandbox (`/demo`)

- **4 suite interattive** con dati seed realistici (cantieri, pratiche, menu, vendite)
- **Persistenza:** `sessionStorage` (no backend)
- **Chat widget:** CoreMind simulato per ciascuna suite
- **Tour guidato:** Overlay modal 4-step
- **Export PDF:** jsPDF con report demo
- **CTA sticky:** Prenota demo reale

### 3.3 SEO & Meta

- `app/sitemap.ts` dinamico (22 pagine)
- `app/robots.ts` con disallow /api
- Metadata per pagina (title template, OG, Twitter)
- `lang="it-IT"`, hreflang IT
- Metadata base URL: `https://ecosystem.com`

### 3.4 Design System

**Tipografia:**
- Instrument Serif (serif headline, italic accent)
- Inter Tight (sans body)
- JetBrains Mono (code/meta)

**Palette:**
- `ink` (testo principale)
- `paper`, `paper-2` (sfondi)
- `accent-tech` (blu), `accent-brass` (ottone)
- `success`, `warning`, `danger`

**Componenti UI:**
- `Button` (4 varianti, 3 size, icon support)
- `Card` (3 varianti, hover)
- `Badge` (tech/brass/default)
- `SectionNumber` (mono-uppercase)
- `Reveal` (IntersectionObserver)

---

## 4. Issue correnti

### 4.1 Build di produzione bloccato

**Sintomo:**
```
Error: EISDIR: illegal operation on a directory, readlink
'X:\DEV\Repos\sito ecosystem\node_modules\next\dist\pages\_app.js'
```

**Causa:** Bug di Webpack/Next.js su drive exFAT dove i simlink non sono supportati nativamente e `_app.js` viene erroneamente interpretato come directory.

**Workaround possibili:**
1. **Spostare il progetto su partizione NTFS** (consigliato)
2. Usare `next dev` invece di `next build` (in uso ora)
3. Deploy direttamente su Vercel: il build avviene sulla loro infrastruttura Linux → nessun problema

### 4.2 Warning IDE

- `moduleResolution: "node"` applicato dopo errori `bundler`
- Lint TypeScript strict passa

---

## 5. Anteprima live

**Dev server:** `http://localhost:3000` (attivo ora)

### Route da visitare nella preview

| Priorità | URL | Cosa mostra |
|----------|-----|-------------|
| ★★★ | `/` | Homepage 11 sezioni |
| ★★★ | `/coremind/` | Playground live Claude |
| ★★★ | `/demo/` | Sandbox 4 suite interattive |
| ★★ | `/suite/` | Portfolio 13 verticali |
| ★★ | `/suite/buildsuite/` | Esempio pagina suite |
| ★★ | `/pricing/` | Piani + calcolatore |
| ★ | `/contatti/` | Form demo |
| ★ | `/azienda/` | Team + valori |
| ★ | `/integrazioni/` | 200+ integrazioni |
| ★ | `/piattaforma/` | Stack tecnico |
| ★ | `/supporto/` | Canali + SLA |

---

## 6. Pronto per Run 2

Alla conclusione di Run 1, Run 2 dovrà:

1. **Backend forms** · `/api/contact`, `/api/demo-request`, `/api/newsletter` con Supabase + Resend
2. **Rate limit persistente** · Da in-memory Map a Redis/Upstash
3. **Logging playground** · Salvare conversazioni su Supabase `playground_logs`
4. **Analytics** · Vercel Analytics + eventi custom
5. **Domain + Deploy** · `ecosystem.com` su Vercel con env vars reali
6. **Testing** · Playwright E2E, Lighthouse audit, axe-core a11y

---

## 7. Checklist qualità Run 1

- [x] 22 pagine totali create
- [x] 11 sezioni homepage
- [x] 13 pagine suite dettagliate
- [x] Demo sandbox funzionante con 4 suite
- [x] CoreMind playground live con Claude + rate limit
- [x] Design system completo (colori, tipo, componenti)
- [x] Responsive mobile-first
- [x] Accessibilità base (aria-label, focus ring, keyboard nav)
- [x] SEO base (metadata, sitemap, robots, OG)
- [x] Contenuti italiani professionali, zero lorem ipsum
- [x] Mock forms con conferma UX
- [x] Cookie banner
- [ ] Build produzione (bloccato da filesystem - deploy Vercel lo risolverà)
- [ ] Asset OG reali (placeholder path `/og/og-default.png`)
- [ ] Favicon e app icons
- [ ] Test E2E (Run 2)
- [ ] Lighthouse > 90 (da verificare dopo deploy)

---

## 8. Raccomandazioni immediate

1. **Testare la preview** su `http://localhost:3000` con il pulsante browser preview
2. **Spostare il repo** su partizione NTFS per sbloccare `npm run build` locale
3. **Aggiungere favicon** e `og-default.png` 1200x630 in `public/og/`
4. **Configurare `.env.local`** con `ANTHROPIC_API_KEY` per testare il playground
5. **Quando soddisfatto**, procedere con Run 2 (backend + deploy)
