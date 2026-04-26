interface SectionNumberProps {
  number: string
  label: string
  light?: boolean
}

export function SectionNumber({ number, label, light = false }: SectionNumberProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className={`font-mono text-sm ${light ? 'text-accent-brass' : 'text-accent-brass'}`}>
        {number}
      </span>
      <span className="w-8 h-px bg-current opacity-30" />
      <span className={`font-mono text-xs uppercase tracking-wider ${light ? 'text-white/70' : 'text-ink-500'}`}>
        {label}
      </span>
    </div>
  )
}
