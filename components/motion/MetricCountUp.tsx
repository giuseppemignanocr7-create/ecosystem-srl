'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

interface MetricCountUpProps {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  duration?: number
}

export function MetricCountUp({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 1.4,
}: MetricCountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [inView, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString('it-IT', {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  )
}
