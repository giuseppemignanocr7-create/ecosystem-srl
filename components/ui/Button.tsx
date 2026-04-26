'use client'

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'brass'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  disabled?: boolean
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  className?: string
  type?: 'button' | 'submit'
  ariaLabel?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  icon: Icon,
  iconPosition = 'right',
  className,
  type = 'button',
  ariaLabel,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-tech disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-accent-tech text-white hover:bg-accent-tech-2 border border-accent-tech',
    secondary: 'bg-ink text-white hover:bg-ink-2 border border-ink',
    ghost: 'bg-transparent text-ink hover:bg-ink/5 border border-ink-300',
    brass: 'bg-accent-brass text-ink hover:bg-accent-brass-2 border border-accent-brass',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-lg',
  }
  
  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-5 h-5 mr-2" aria-hidden="true" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-5 h-5 ml-2" aria-hidden="true" />}
    </>
  )
  
  if (href) {
    return (
      <a
        href={href}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    )
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  )
}
