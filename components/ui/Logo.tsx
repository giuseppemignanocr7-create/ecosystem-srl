'use client'

import Link from 'next/link'

interface LogoProps {
  /**
   * - 'light' / 'dark': full logo with tagline (1429x734, ratio ~1.948)
   * - 'mark': just the "E" symbol cropped (square)
   */
  variant?: 'light' | 'dark' | 'mark'
  size?: number
  href?: string
  className?: string
  priority?: boolean
}

/**
 * Official Ecosystem logo (SVG asset).
 * The full SVG is 1429x734 (aspect ~1.948).
 * For 'mark' variant we crop to the left ~50% which contains the "E" glyph.
 */
export function Logo({
  variant = 'light',
  size = 40,
  href,
  className = '',
  priority = false,
}: LogoProps) {
  const isDark = variant === 'dark'
  const isMark = variant === 'mark'

  // Full logo aspect: 1429 / 734 ≈ 1.948
  const aspectFull = 1.948
  const widthFull = Math.round(size * aspectFull)

  const img = (
    <img
      src="/brand/logo.svg"
      alt="Ecosystem — Un tocco, infinite possibilità"
      width={isMark ? size : widthFull}
      height={size}
      className={`logo-shimmer ${isMark ? 'object-cover object-left' : ''} ${className}`}
      loading={priority ? 'eager' : 'lazy'}
    />
  )

  if (isMark) {
    return (
      <span
        className="inline-block overflow-hidden rounded-lg"
        style={{ width: size, height: size }}
        aria-label="Ecosystem"
      >
        {img}
      </span>
    )
  }

  const fullImg = isDark ? (
    <span className="inline-flex items-center bg-paper rounded-md px-2 py-1.5">
      {img}
    </span>
  ) : (
    img
  )

  if (href) {
    return (
      <Link
        href={href}
        aria-label="Ecosystem — Home"
        className="inline-flex items-center"
      >
        {fullImg}
      </Link>
    )
  }
  return fullImg
}
