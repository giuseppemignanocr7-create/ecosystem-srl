import { NextRequest, NextResponse } from 'next/server'
import { retrieve, buildContextBlock, maybeDirectAnswer } from '@/lib/kb-retrieval'
import { SITE_KNOWLEDGE } from '@/lib/site-knowledge'

export const runtime = 'edge'

// ============ RATE LIMITING ============
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 15
const RATE_WINDOW = 60 * 60 * 1000

async function sha256Short(input: string): Promise<string> {
  const data = new TextEncoder().encode(input)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 16)
}

// ============ SYSTEM PROMPT ============
function buildSystemPrompt(kbContext: string): string {
  return `Sei **CoreMind**, l'assistente AI ufficiale di Ecosystem (la piattaforma gestionale multi-verticale di Ecosystem S.R.L.).

Stai parlando con un visitatore del sito ecosystem-srl.vercel.app che vuole capire cosa fa Ecosystem. Sei in modalità playground pubblico.

## REGOLE FONDAMENTALI
1. Rispondi SEMPRE in italiano professionale ma diretto.
2. Sii concreto, denso di fatti. 100–250 parole tipiche.
3. Usa le informazioni nel blocco "CONOSCENZA RILEVANTE DAL SITO" come fonte primaria — è il contenuto autorevole del sito.
4. Se la domanda riguarda funzioni operative ("crea un cantiere", "fattura cliente"), simula l'azione con dati realistici di esempio.
5. NON inventare prezzi, funzioni o numeri non presenti nel knowledge map. Se non sai, dillo e suggerisci di contattare info@ecosystem.org o /contatti.
6. Quando opportuno usa **liste**, **tabelle markdown** o **link** alle pagine del sito (/demo, /pricing, /suite, /contatti).
7. Chiudi con un CTA naturale: "Vuoi provare la demo gratuita su /demo?" oppure "Prenota una call su /contatti".

## SITE KNOWLEDGE MAP
${SITE_KNOWLEDGE}

${kbContext ? `\n${kbContext}\n` : ''}`.trim()
}

// ============ LLM PROVIDERS ============

interface LLMMessage {
  role: 'user' | 'assistant'
  content: string
}

async function callGroq(systemPrompt: string, history: LLMMessage[], message: string): Promise<string | null> {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) return null

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 700,
      temperature: 0.4,
      messages: [
        { role: 'system', content: systemPrompt },
        ...history.slice(-4),
        { role: 'user', content: message },
      ],
    }),
  })

  if (!res.ok) {
    console.error('[groq]', res.status, await res.text())
    return null
  }

  const data = await res.json()
  return data?.choices?.[0]?.message?.content ?? null
}

async function callAnthropic(systemPrompt: string, history: LLMMessage[], message: string): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return null

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 700,
      system: systemPrompt,
      messages: [
        ...history.slice(-4),
        { role: 'user', content: message },
      ],
    }),
  })

  if (!res.ok) {
    console.error('[anthropic]', res.status, await res.text())
    return null
  }

  const data = await res.json()
  const block = data?.content?.find((b: { type: string }) => b.type === 'text')
  return block?.text ?? null
}

// ============ HANDLER ============

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json() as {
      message: string
      sessionId?: string
      history?: LLMMessage[]
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Messaggio vuoto.' }, { status: 400 })
    }

    // Rate limit
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const ipHash = await sha256Short(ip)
    const now = Date.now()
    const record = rateLimitMap.get(ipHash)
    if (record && now > record.resetTime) rateLimitMap.delete(ipHash)
    const current = rateLimitMap.get(ipHash)
    const count = current?.count ?? 0
    if (count >= RATE_LIMIT) {
      return NextResponse.json(
        {
          error: `Hai raggiunto il limite di ${RATE_LIMIT} messaggi all'ora. Prenota una demo per continuare su /contatti.`,
          limitReached: true,
        },
        { status: 429 }
      )
    }

    // ============ STEP 1: KB RETRIEVAL ============
    const hits = retrieve(message, 4, 0.25)

    // STEP 2: high-confidence direct answer
    const direct = maybeDirectAnswer(hits)
    if (direct) {
      rateLimitMap.set(ipHash, {
        count: count + 1,
        resetTime: current?.resetTime ?? now + RATE_WINDOW,
      })
      return NextResponse.json({
        reply: direct,
        source: 'kb',
        matches: hits.slice(0, 2).map((h) => h.entry.id),
        remaining: RATE_LIMIT - count - 1,
      })
    }

    // STEP 3: LLM with retrieved context
    const kbContext = buildContextBlock(hits)
    const systemPrompt = buildSystemPrompt(kbContext)
    const safeHistory = (history ?? []).slice(-4)

    let reply = await callGroq(systemPrompt, safeHistory, message)
    let provider = 'groq'

    if (!reply) {
      reply = await callAnthropic(systemPrompt, safeHistory, message)
      provider = 'anthropic'
    }

    // STEP 4: ultimate fallback — top KB hit if LLMs unavailable
    if (!reply) {
      if (hits.length > 0) {
        reply = `${hits[0].entry.answer}\n\n_(Servizio AI temporaneamente non disponibile, ho risposto con il match più vicino dalla nostra knowledge base.)_`
        provider = 'kb-fallback'
      } else {
        reply = "Non sono riuscito a trovare una risposta. Puoi contattarci direttamente:\n- Email: info@ecosystem.org\n- Telefono: +39 327 160 4592\n- Form: /contatti\n\nOppure esplora la demo gratuita su /demo."
        provider = 'no-match'
      }
    }

    rateLimitMap.set(ipHash, {
      count: count + 1,
      resetTime: current?.resetTime ?? now + RATE_WINDOW,
    })

    return NextResponse.json({
      reply,
      source: provider,
      matches: hits.slice(0, 3).map((h) => ({ id: h.entry.id, score: Number(h.score.toFixed(2)) })),
      remaining: RATE_LIMIT - count - 1,
    })
  } catch (err) {
    console.error('[coremind-playground]', err)
    return NextResponse.json(
      { error: 'CoreMind temporaneamente non disponibile. Riprova tra poco.' },
      { status: 500 }
    )
  }
}
