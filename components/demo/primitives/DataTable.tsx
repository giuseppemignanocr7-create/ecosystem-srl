'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, Filter } from 'lucide-react'

export interface Column<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  align?: 'left' | 'right' | 'center'
  render?: (row: T) => React.ReactNode
  className?: string
  // Custom getter for nested data, used for sort/search
  accessor?: (row: T) => string | number
}

export interface DataTableProps<T> {
  title?: string
  columns: Column<T>[]
  data: T[]
  searchable?: boolean
  searchPlaceholder?: string
  searchKeys?: (keyof T)[]
  onRowClick?: (row: T, index: number) => void
  emptyText?: string
  isDark?: boolean
  accent?: string
  pageSize?: number
  rowKey?: (row: T, idx: number) => string | number
  toolbar?: React.ReactNode
}

/**
 * Production-grade data table:
 * - Click-to-sort columns (asc/desc/none cycle)
 * - Live search across configured keys
 * - Pagination
 * - Row click handler
 * - Smooth row reveal animation
 */
export function DataTable<T extends object>({
  title,
  columns,
  data,
  searchable = true,
  searchPlaceholder = 'Cerca...',
  searchKeys,
  onRowClick,
  emptyText = 'Nessun risultato',
  isDark = true,
  accent = '#7C3AED',
  pageSize = 10,
  rowKey = (_, i) => i,
  toolbar,
}: DataTableProps<T>) {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(0)

  const filtered = useMemo(() => {
    let rows = data
    if (searchable && query.trim()) {
      const q = query.toLowerCase()
      rows = rows.filter((row) => {
        const keys = (searchKeys ?? Object.keys(row)) as (keyof T)[]
        return keys.some((k) => {
          const v = row[k]
          if (v == null) return false
          return String(v).toLowerCase().includes(q)
        })
      })
    }
    if (sortKey) {
      const col = columns.find((c) => String(c.key) === sortKey)
      const accessor = col?.accessor ?? ((row: T) => row[sortKey as keyof T] as string | number)
      rows = [...rows].sort((a, b) => {
        const av = accessor(a) as number | string
        const bv = accessor(b) as number | string
        if (typeof av === 'number' && typeof bv === 'number') {
          return sortDir === 'asc' ? av - bv : bv - av
        }
        const sa = String(av).toLowerCase()
        const sb = String(bv).toLowerCase()
        if (sa < sb) return sortDir === 'asc' ? -1 : 1
        if (sa > sb) return sortDir === 'asc' ? 1 : -1
        return 0
      })
    }
    return rows
  }, [data, query, searchable, searchKeys, sortKey, sortDir, columns])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, totalPages - 1)
  const paginated = filtered.slice(safePage * pageSize, (safePage + 1) * pageSize)

  function toggleSort(key: string) {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir('asc')
    } else if (sortDir === 'asc') {
      setSortDir('desc')
    } else {
      setSortKey(null)
    }
  }

  return (
    <div
      className={`rounded-xl border overflow-hidden ${
        isDark ? 'border-white/5 bg-white/[0.02]' : 'border-line bg-white'
      }`}
    >
      {(title || searchable || toolbar) && (
        <div
          className={`flex flex-wrap items-center gap-3 px-4 py-3 border-b ${
            isDark ? 'border-white/5' : 'border-line'
          }`}
        >
          {title && <h3 className="font-serif text-base shrink-0">{title}</h3>}
          {searchable && (
            <div
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg flex-1 min-w-[180px] max-w-md border ${
                isDark ? 'border-white/10 bg-white/5' : 'border-line bg-paper-2'
              }`}
            >
              <Search size={13} className="opacity-50" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setPage(0)
                }}
                placeholder={searchPlaceholder}
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:opacity-50"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="text-[10px] font-mono opacity-60 hover:opacity-100"
                  aria-label="Pulisci ricerca"
                >
                  ESC
                </button>
              )}
            </div>
          )}
          {toolbar && <div className="flex items-center gap-2">{toolbar}</div>}
          <div className={`ml-auto text-[11px] font-mono ${isDark ? 'text-white/40' : 'text-ink-400'}`}>
            {filtered.length} risultat{filtered.length === 1 ? 'o' : 'i'}
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className={isDark ? 'border-b border-white/5' : 'border-b border-line'}>
              {columns.map((col) => {
                const sortable = col.sortable !== false
                const active = sortKey === String(col.key)
                return (
                  <th
                    key={String(col.key)}
                    className={`px-4 py-2.5 font-mono text-[10px] tracking-[0.16em] uppercase font-medium select-none ${
                      isDark ? 'text-white/50' : 'text-ink-500'
                    } ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'} ${
                      sortable ? 'cursor-pointer hover:text-current' : ''
                    } ${col.className ?? ''}`}
                    onClick={() => sortable && toggleSort(String(col.key))}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      {sortable && (
                        active ? (
                          sortDir === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />
                        ) : (
                          <ChevronsUpDown size={11} className="opacity-30" />
                        )
                      )}
                    </span>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className={`px-4 py-8 text-center text-sm ${
                    isDark ? 'text-white/40' : 'text-ink-400'
                  }`}
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              paginated.map((row, i) => (
                <motion.tr
                  key={rowKey(row, i)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02, duration: 0.3 }}
                  onClick={() => onRowClick?.(row, i)}
                  className={`${
                    isDark ? 'border-b border-white/5 hover:bg-white/[0.04]' : 'border-b border-line hover:bg-paper-2'
                  } ${onRowClick ? 'cursor-pointer' : ''} transition-colors`}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={`px-4 py-3 ${
                        col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                      } ${col.className ?? ''}`}
                    >
                      {col.render ? col.render(row) : String(row[col.key as keyof T] ?? '')}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div
          className={`flex items-center justify-between px-4 py-2.5 border-t text-xs ${
            isDark ? 'border-white/5 text-white/50' : 'border-line text-ink-500'
          }`}
        >
          <span className="font-mono">
            Pag. {safePage + 1} / {totalPages}
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              disabled={safePage === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className={`px-2.5 py-1 rounded font-mono disabled:opacity-30 ${
                isDark ? 'hover:bg-white/10' : 'hover:bg-paper-2'
              }`}
            >
              ← Prec
            </button>
            <button
              type="button"
              disabled={safePage >= totalPages - 1}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              className={`px-2.5 py-1 rounded font-mono disabled:opacity-30 ${
                isDark ? 'hover:bg-white/10' : 'hover:bg-paper-2'
              }`}
              style={safePage < totalPages - 1 ? { color: accent } : undefined}
            >
              Succ →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
