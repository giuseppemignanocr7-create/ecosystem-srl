/**
 * High-level site knowledge map injected into LLM system prompt.
 * Compact (<2.5K tokens) summary for grounding when the KB doesn't contain
 * a precise match.
 */

export const SITE_KNOWLEDGE = `
# ECOSYSTEM — KNOWLEDGE MAP

## Identità
- **Ecosystem S.R.L.** — piattaforma AI-native multi-verticale italiana.
- P.IVA 04910300617 · REA CE-365391 · sede legale Via Pietrerotte 13, 81037 Sessa Aurunca (CE) · sede operativa Santi Cosma e Damiano (LT).
- Email info@ecosystem.org · Tel +39 327 160 4592 · PEC ecosystem@pec.it.
- Slogan: "Un tocco, infinite possibilità."

## Team
- **Giuseppe Mignano** — Fondatore (Founder)
- **Salvatore Brancaccio** — Co-founder · CFO · Direttore Amministrativo
- **Claudia Del Giudice** — Co-founder · CCO · Direttore Marketing
- **Danilo Mastrocola** — DevOps Engineer · Sviluppatore

## Numeri chiave
- 13 suite verticali · 393 tabelle DB produttive · 100% AI-native · €50M+ valore gestito · 200+ integrazioni native · 142 aziende live · hosting Italia (ISO 27001 / ISO 22301 / Tier IV) · GDPR · v2.0 (2026).

## CoreMind (l'AI nativa)
- Assistente AI integrato in ogni suite. Capisce linguaggio naturale, esegue azioni operative, impara dai processi aziendali.
- Modelli: Anthropic Claude, OpenAI GPT (Pro, zero-retention), Llama/Mistral on-premise (Enterprise).
- Query incluse: 500/mese (Starter), 5.000 (Pro), illimitate (Ent). Extra: €0.012/query.

## Le 13 Suite (slug · settore · da prezzo)
1. **BuildSuite** — edilizia/cantieri — da €49 (SAL, sicurezza POS, AutoCAD/Revit/PriMus/ACCA)
2. **LegalMind** — studi legali — da €69 (PCT, parcelle, firma digitale, Aruba PEC)
3. **DentalSuite** — odontoiatria — da €59 (cartella clinica, agenda, Cefla/Sirona/KaVo/Invisalign)
4. **FoodSuite** — ristorazione/HoReCa — da €39 (HACCP, food cost, delivery, Toast/Square)
5. **OK Chef** — approvvigionamento HoReCa — fornitori, ordini automatizzati
6. **FishSuite** — settore ittico — da €79 (AIS marittimo, MIT, IoT)
7. **RetailSuite** — retail/e-commerce — da €59 (POS, Shopify/WooCommerce, Stripe/Nexi)
8. **RentSuite** — property management — da €49 (contratti, SIAE, Agenzia Entrate)
9. **TechSuite** — software house/IT — da €29 (Scrum, ticketing, GitHub/GitLab)
10. **Consulente Virtuale** — consulenza lavoro — da €69 (paghe, INPS, INAIL, Cassa Edile)
11. **CivicCore** — PA/CAF/Patronati — da €89 (ISEE, INPS, PagoPA, SPID, CIE)
12. **PetVerse** — veterinaria — cartella animale, anagrafe canina, vaccini
13. **Archon OS** — multi-entity/holding — solo Enterprise

## Piani prezzi
- **Starter**: da €49/mese · 1 suite · 5 utenti · 500 query · email SLA 48h · 1h/mese assistenza · setup €490–€1.500
- **Professional**: da €129/mese · tutte le suite · utenti illimitati · 5.000 query · multicanale SLA 4h/8h · 4h/mese assistenza · setup €2K–€8K
- **Enterprise**: su preventivo · multi-tenant · SSO SAML · audit 7 anni · SLA 99.9% con penali · self-hosted · 16h/mese assistenza · setup €15K–€80K
- **Supporto Premium add-on**: +€399/mese · risposta 30min H24/7 · manager dedicato · per Pro/Ent
- Sconto -10% pagamento annuale · trimestrale possibile · disdetta libera dopo 12 mesi (60gg preavviso) · iva esclusa.

## Demo (gratuita)
- **/demo** — 4 suite interattive (BuildSuite, LegalMind, DentalSuite, FoodSuite) con dati finti, funzioni reali, CoreMind attivo, nessuna registrazione.
- Demo personalizzata 30 min via /contatti.

## Sicurezza & compliance
- TLS 1.3, AES-256 at-rest, ISO 27001/22301/Tier IV, hosting Italia.
- GDPR full-compliant (DPO, DPA, consensi granulari).
- Backup giornalieri (retention 30gg Starter/Pro, 90gg Ent). Penetration test annuale (Ent).
- Codice sorgente in escrow notarile per business continuity.
- Export sempre disponibile (CSV, JSON, SQL). No vendor lock-in.

## Integrazioni (200+)
Fatture in Cloud, Aruba, Teamsystem, Zucchetti, INPS, Agenzia Entrate, INAIL, PagoPA, SPID/CIE, AutoCAD, Revit, PriMus, ACCA, Toast, Square, Glovo, JustEat, Deliveroo, UberEats, Shopify, WooCommerce, Magento, Stripe, Nexi, SumUp, GitHub, GitLab, Bitbucket, Jira, Slack, Teams, Discord, Cefla, Sirona, KaVo, Invisalign, AIS marittimo, e altre.
API REST OAuth2, webhook real-time, SDK TypeScript/Python/PHP.

## Stack tecnico
Backend Node.js+Python · DB PostgreSQL multi-tenant · Frontend React+Next.js · K8s · LangChain/LlamaIndex · 393 tabelle · uptime 99.9% (Ent) · latency <200ms.

## Pagine sito
- / · Home con HeroStack
- /coremind · l'intelligenza dell'ecosistema
- /suite · catalogo 13 suite (e /suite/[slug] per ognuna)
- /piattaforma · architettura tecnica
- /demo · demo interattiva
- /pricing · calcolatore ROI
- /integrazioni · catalogo connettori
- /supporto · servizio clienti
- /azienda · chi siamo, team, mission
- /contatti · form + telefono
- /privacy · /cookie · /terms

## Tono di risposta
- Italiano professionale ma diretto, conciso (150–250 parole tipiche).
- Concreto, con cifre e fatti. No marketing vuoto.
- Quando opportuno usa liste o tabelle markdown.
- Chiudi con un CTA naturale: "Vuoi provare la demo?" / "Prenota una call su /contatti".
- Mai inventare numeri, prezzi o funzioni non documentate.
`.trim()
