'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface TypewriterProps {
  text: string
  delay?: number
  speed?: number
  onComplete?: () => void
  cursor?: boolean
  className?: string
}

export function Typewriter({
  text,
  delay = 0,
  speed = 28,
  onComplete,
  cursor = true,
  className = '',
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) {
      if (!done) {
        setDone(true)
        onComplete?.()
      }
      return
    }
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)
    return () => clearTimeout(t)
  }, [started, displayed, text, speed, onComplete, done])

  return (
    <span className={className}>
      {displayed}
      {cursor && started && !done && (
        <motion.span
          className="inline-block w-[2px] h-[1em] bg-current align-middle ml-[1px]"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          aria-hidden
        />
      )}
    </span>
  )
}
