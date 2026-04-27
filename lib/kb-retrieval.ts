/**
 * CoreMind KB Retrieval Engine.
 *
 * Algorithm:
 * 1. Normalize and tokenize the user query.
 * 2. Expand tokens with synonym clusters (Italian).
 * 3. Score each KB entry against expanded query:
 *    - Token-overlap on (question + aliases + tags)
 *    - Bigram overlap bonus (for multi-word matches)
 *    - Levenshtein-based fuzzy fallback for typos
 *    - Category boost when query mentions topic words
 * 4. Return top-K above threshold.
 *
 * No external deps, runs at the edge.
 */

import { KNOWLEDGE_BASE, KBEntry } from '@/content/knowledge-base'
import { SYNONYMS, buildSynonymIndex, normalize } from '@/content/synonyms'

const SYN_INDEX = buildSynonymIndex()

// Italian stop-words: ignored for matching but kept in display
const STOPWORDS = new Set([
  'il', 'la', 'lo', 'le', 'gli', 'un', 'una', 'uno', 'di', 'da', 'del', 'della',
  'dei', 'delle', 'degli', 'in', 'su', 'per', 'con', 'che', 'chi', 'cui',
  'è', 'e', 'ed', 'o', 'ma', 'se', 'al', 'ai', 'agli', 'alle', 'allo', 'alla',
  'mi', 'ti', 'si', 'ci', 'vi', 'ne',
  'cosa', 'come', 'dove', 'quando', 'quanto', 'quale', 'quali', 'perche', 'perché',
  'mio', 'mia', 'tuo', 'tua', 'suo', 'sua',
  'ho', 'ha', 'hai', 'fa', 'fare', 'fate', 'fanno',
  'spiegami', 'spiega', 'dimmi', 'dimi', 'puoi', 'puo', 'voglio', 'vorrei',
  'punti', 'punto', 'breve', 'sintesi',
])

/**
 * Returns the synonym cluster ids a token belongs to (or null).
 */
function clustersFor(token: string): number[] | null {
  return SYN_INDEX.get(token) ?? null
}

/**
 * Tells if a query token (or any of its synonym siblings) is present in entry tokens.
 */
function tokenMatchesEntry(qToken: string, eTokens: Set<string>): { matched: boolean; viaSynonym: boolean } {
  if (eTokens.has(qToken)) return { matched: true, viaSynonym: false }
  const clusters = clustersFor(qToken)
  if (!clusters) return { matched: false, viaSynonym: false }
  for (const c of clusters) {
    for (const sib of SYNONYMS[c]) {
      const norm = normalize(sib)
      if (norm === qToken) continue
      if (eTokens.has(norm)) return { matched: true, viaSynonym: true }
    }
  }
  return { matched: false, viaSynonym: false }
}

export interface RetrievalHit {
  entry: KBEntry
  score: number
  matchedTokens: string[]
}

/**
 * Levenshtein distance (capped) for fuzzy single-token match.
 */
function levenshtein(a: string, b: string, max = 2): number {
  if (Math.abs(a.length - b.length) > max) return max + 1
  if (a === b) return 0
  const m = a.length
  const n = b.length
  if (m === 0) return n
  if (n === 0) return m
  let prev = Array.from({ length: n + 1 }, (_, i) => i)
  let curr = new Array<number>(n + 1)
  for (let i = 1; i <= m; i++) {
    curr[0] = i
    let rowMin = i
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost)
      if (curr[j] < rowMin) rowMin = curr[j]
    }
    if (rowMin > max) return max + 1
    ;[prev, curr] = [curr, prev]
  }
  return prev[n]
}

/**
 * Tokenize entry's searchable text (question + aliases + tags).
 */
function entryTokens(entry: KBEntry): Set<string> {
  const blobs: string[] = [entry.question, ...(entry.aliases ?? []), ...(entry.tags ?? []), entry.category]
  const tokens = new Set<string>()
  for (const blob of blobs) {
    const norm = normalize(blob)
    for (const t of norm.split(' ')) {
      if (t.length >= 2) tokens.add(t)
    }
  }
  return tokens
}

/**
 * Score an entry against the query.
 *
 * Key design choices to avoid past pathologies:
 *  - Each query token can contribute AT MOST ONCE to the match score
 *    (no per-synonym-sibling double counting).
 *  - Direct token match is worth more than synonym-mediated match.
 *  - Bigram and full-phrase question-text matches dominate the score:
 *    if the user's phrase appears verbatim in entry.question, that's
 *    overwhelming evidence regardless of single-token noise.
 *  - Coverage ratio (matchedContent / contentTokens) shapes the result,
 *    NOT raw token count, so adding extra aliases does not silently boost
 *    or penalize entries.
 */
function scoreEntry(entry: KBEntry, contentTokens: string[]): {
  score: number
  matched: string[]
} {
  const eTokens = entryTokens(entry)
  const entryQ = normalize(entry.question)
  const entryAliases = (entry.aliases ?? []).map(normalize)
  const matched = new Set<string>()
  let score = 0

  // 1) Direct or synonym-mediated token overlap (counted once per query token).
  for (const qt of contentTokens) {
    const r = tokenMatchesEntry(qt, eTokens)
    if (r.matched) {
      score += r.viaSynonym ? 0.6 : 1.0
      matched.add(qt)
    }
  }

  // 2) Bigram bonus on question + aliases (stronger signal than single tokens).
  for (let i = 0; i < contentTokens.length - 1; i++) {
    const bigram = `${contentTokens[i]} ${contentTokens[i + 1]}`
    if (entryQ.includes(bigram)) score += 1.4
    else if (entryAliases.some((a) => a.includes(bigram))) score += 0.9
  }

  // 3) Trigram / phrase super-bonus when 3+ consecutive query tokens hit the question.
  for (let i = 0; i < contentTokens.length - 2; i++) {
    const trig = `${contentTokens[i]} ${contentTokens[i + 1]} ${contentTokens[i + 2]}`
    if (entryQ.includes(trig)) score += 2.5
  }

  // 4) Fuzzy fallback only for query tokens not yet matched (typos).
  for (const qt of contentTokens) {
    if (matched.has(qt) || qt.length < 5) continue
    for (const et of Array.from(eTokens)) {
      if (et.length < 5) continue
      const d = levenshtein(qt, et, 2)
      if (d > 0 && d <= 2) {
        score += 0.35
        matched.add(qt)
        break
      }
    }
  }

  // 5) Coverage ratio: how much of the meaningful query did we cover?
  //    This is the dominant multiplier, so a 1-token incidental match cannot
  //    out-rank an entry that covers most of the query.
  const coverage = contentTokens.length > 0 ? matched.size / contentTokens.length : 0
  score *= 0.5 + coverage // [0.5x .. 1.5x]

  return { score, matched: Array.from(matched) }
}

/**
 * Retrieve top-K KB entries for a user query.
 * Returns sorted hits above min score threshold.
 */
export function retrieve(query: string, topK = 4, minScore = 0.6): RetrievalHit[] {
  const allTokens = normalize(query).split(' ').filter((t) => t.length >= 2)
  // Drop stop-words: they are noise that previously boosted bad entries.
  const contentTokens = allTokens.filter((t) => !STOPWORDS.has(t))
  // Fall back to all tokens if the query is entirely stop-words.
  const tokens = contentTokens.length > 0 ? contentTokens : allTokens

  const hits: RetrievalHit[] = []
  for (const entry of KNOWLEDGE_BASE) {
    const { score, matched } = scoreEntry(entry, tokens)
    if (score >= minScore) {
      hits.push({ entry, score, matchedTokens: matched })
    }
  }

  hits.sort((a, b) => b.score - a.score)
  return hits.slice(0, topK)
}

/**
 * Build a context block for the LLM from top retrieval hits.
 */
export function buildContextBlock(hits: RetrievalHit[]): string {
  if (hits.length === 0) return ''
  const lines: string[] = ['## CONOSCENZA RILEVANTE DAL SITO']
  hits.forEach((h, i) => {
    lines.push(`\n### ${i + 1}. [${h.entry.category}] ${h.entry.question}`)
    lines.push(h.entry.answer)
  })
  return lines.join('\n')
}

/**
 * High-confidence direct answer: only used when one entry strongly dominates.
 * Returns null when LLM should be invoked.
 */
export function maybeDirectAnswer(hits: RetrievalHit[]): string | null {
  if (hits.length === 0) return null
  const top = hits[0]
  const second = hits[1]
  // Direct answer ONLY when:
  //  - score is very high (phrase-level match likely),
  //  - AND clearly dominant over the runner-up (>= 2x).
  // Otherwise we always go through the LLM so it can synthesise from
  // multiple hits and answer the actual user intent (e.g. "in 3 punti").
  if (top.score >= 2.5 && (!second || top.score > second.score * 2.0)) {
    return top.entry.answer
  }
  return null
}
