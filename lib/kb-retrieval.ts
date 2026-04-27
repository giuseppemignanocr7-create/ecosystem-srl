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
import { buildSynonymIndex, expandQuery, normalize } from '@/content/synonyms'

const SYN_INDEX = buildSynonymIndex()

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
 * Score an entry against expanded query terms.
 */
function scoreEntry(entry: KBEntry, expanded: Set<string>, queryTokens: string[]): {
  score: number
  matched: string[]
} {
  const eTokens = entryTokens(entry)
  let score = 0
  const matched: string[] = []

  // Direct token overlap (synonym-expanded)
  for (const term of Array.from(expanded)) {
    if (eTokens.has(term)) {
      score += 1
      matched.push(term)
    }
  }

  // Bigram bonus: if any consecutive pair from query appears in entry's question (normalized)
  const qNorm = queryTokens.join(' ')
  const entryQNorm = normalize(entry.question)
  for (let i = 0; i < queryTokens.length - 1; i++) {
    const bigram = `${queryTokens[i]} ${queryTokens[i + 1]}`
    if (entryQNorm.includes(bigram)) {
      score += 1.5
    }
  }

  // Question prefix match (strong signal)
  for (const term of queryTokens) {
    if (entryQNorm.startsWith(term + ' ') || entryQNorm.startsWith(term)) {
      score += 0.5
      break
    }
  }

  // Fuzzy fallback for typos (only for unmatched tokens)
  if (matched.length < queryTokens.length) {
    for (const qt of queryTokens) {
      if (matched.includes(qt)) continue
      if (qt.length < 4) continue // skip short tokens
      for (const et of Array.from(eTokens)) {
        if (et.length < 4) continue
        const dist = levenshtein(qt, et, 2)
        if (dist <= 2 && dist > 0) {
          score += 0.4
          matched.push(et)
          break
        }
      }
    }
  }

  // Length normalization: avoid super-broad entries dominating
  const denom = Math.max(1, Math.sqrt(eTokens.size))
  return { score: score / denom, matched }
}

/**
 * Retrieve top-K KB entries for a user query.
 * Returns sorted hits above min score threshold.
 */
export function retrieve(query: string, topK = 4, minScore = 0.25): RetrievalHit[] {
  const expanded = expandQuery(query, SYN_INDEX)
  const queryTokens = normalize(query).split(' ').filter((t) => t.length >= 2)

  const hits: RetrievalHit[] = []
  for (const entry of KNOWLEDGE_BASE) {
    const { score, matched } = scoreEntry(entry, expanded, queryTokens)
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
  // Direct answer if top score is high and clearly dominant
  if (top.score >= 1.2 && (!second || top.score > second.score * 1.6)) {
    return top.entry.answer
  }
  return null
}
