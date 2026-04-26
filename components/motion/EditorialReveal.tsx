'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface EditorialRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'div'
}

export function EditorialReveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'h2',
}: EditorialRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      <Tag className={className}>{children}</Tag>
    </motion.div>
  )
}
