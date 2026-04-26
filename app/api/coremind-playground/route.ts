import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export const runtime = 'edge'

async function sha256Short(input: string): Promise<string> {
  const data = new TextEncoder().encode(input)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 16)
}

// Rate limiting in-memory (per Run 1 - in Run 2 si sposta su Redis/Supabase)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT = 10 // messaggi per ora
const RATE_WINDOW = 60 * 60 * 1000 // 1 ora in ms

const SYSTEM_PROMPT = `Sei CoreMind, l'assistente AI di Ecosystem, la piattaforma gestionale multi-verticale di Ecosystem S.R.L.

Stai parlando con un visitatore del sito web che vuole capire cosa puoi fare. Sei in modalità playground pubblico: non hai accesso a dati reali, ma devi SIMULARE risposte realistiche su dati aziendali di esempio.

Regole:
1. Rispondi SEMPRE in italiano professionale.
2. Sii concreto, tecnico, denso di contenuto reale.
3. Quando l'utente chiede qualcosa di operativo ("crea un cantiere", "genera un contratto"), simula l'azione con dati realistici e mostra il risultato come se fosse stata eseguita davvero.
4. Usa terminologia italiana dei settori (SAL, POS, HACCP, ISEE, PCT, ecc.).
5. Se chiedono cose fuori scope (non business/gestionale), riportali gentilmente al prodotto.
6. Risposte medie 150-300 parole. Sii denso, non prolisso.
7. Quando ha senso, usa tabelle markdown o liste numerate.
8. Non inventare funzioni che non esistono nel sistema.
9. Chiudi spesso con un invito naturale a provare la demo o richiedere un appuntamento.

Esempi di comportamento:
- Utente: "Crea un ordine fornitore"
  Tu: Simula l'ordine con dati realistici (fornitore, prodotti, quantità, prezzi, totale)
- Utente: "Fatturato Q3"
  Tu: Simula un report con numeri realistici, trend, confronto QoQ`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Servizio temporaneamente non disponibile. Riprova più tardi.' },
        { status: 503 }
      )
    }

    const anthropic = new Anthropic({ apiKey })
    const { message, sessionId, history } = await req.json()

    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const ipHash = await sha256Short(ip)
    
    const now = Date.now()
    const record = rateLimitMap.get(ipHash)
    
    if (record && now > record.resetTime) {
      rateLimitMap.delete(ipHash)
    }
    
    const currentRecord = rateLimitMap.get(ipHash)
    const count = currentRecord ? currentRecord.count : 0
    
    if (count >= RATE_LIMIT) {
      return NextResponse.json(
        { 
          error: 'Hai raggiunto il limite di 10 messaggi all\'ora. Prenota una demo per continuare.',
          limitReached: true 
        },
        { status: 429 }
      )
    }

    // Chiamata Claude
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 800,
      system: SYSTEM_PROMPT,
      messages: [
        ...(history || []).slice(-6).map((h: { role: string; content: string }) => ({
          role: h.role === 'user' ? 'user' : 'assistant',
          content: h.content,
        })),
        { role: 'user', content: message }
      ],
    })

    // Aggiorna rate limit
    rateLimitMap.set(ipHash, {
      count: count + 1,
      resetTime: currentRecord ? currentRecord.resetTime : now + RATE_WINDOW,
    })

    const reply = response.content
      .filter((b): b is { type: 'text'; text: string } => b.type === 'text')
      .map(b => b.text)
      .join('\n')

    return NextResponse.json({ 
      reply,
      tokensUsed: response.usage,
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
