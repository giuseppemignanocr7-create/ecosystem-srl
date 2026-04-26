'use client'

import { useRef, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  strength?: number
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  strength = 0.25,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 160, damping: 18 })
  const springY = useSpring(y, { stiffness: 160, damping: 18 })

  function onMouseMove(e: MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ x: springX, y: springY }}
        className={className}
      >
        {children}
      </motion.a>
    )
  }
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  )
}
