import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  variant?: 'default' | 'dark' | 'brass'
}

export function Card({ children, className, hover = true, variant = 'default' }: CardProps) {
  const variants = {
    default: 'bg-white border-line',
    dark: 'bg-ink-2 border-ink text-white',
    brass: 'bg-accent-brass/10 border-accent-brass/30',
  }
  
  return (
    <div
      className={cn(
        'relative rounded-xl border p-6 transition-all duration-500 ease-smooth',
        hover && 'card-tilt hover:border-brand-violet/40 hover:shadow-xl hover:shadow-brand-violet/10 hover:-translate-y-1',
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  )
}
