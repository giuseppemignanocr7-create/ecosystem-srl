import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'tech' | 'brass' | 'default'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-ink-100 text-ink-700',
    tech: 'bg-accent-tech/10 text-accent-tech border border-accent-tech/20',
    brass: 'bg-accent-brass/10 text-accent-brass-2 border border-accent-brass/20',
  }
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded text-xs font-mono uppercase tracking-wider',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
