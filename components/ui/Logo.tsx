'use client'

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  /**
   * - 'light' / 'dark': full logo with tagline (1750x899, ratio 1.948)
   * - 'mark': just the "E" symbol cropped (square)
   */
  variant?: 'light' | 'dark' | 'mark'
  size?: number
  href?: string
  className?: string
  priority?: boolean
}

/**
 * Official Ecosystem logo (JPG asset).
 * The full image is 1750x899 (aspect ~1.948).
 * For 'mark' variant we crop to the left ~22% which contains the "E" glyph.
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

  // Full logo aspect: 1750 / 899 ≈ 1.948
  const aspectFull = 1.948
  const widthFull = Math.round(size * aspectFull)

  const baseImg = (
    <Image
      src="/brand/ecosystem-logo.jpg"
      alt="Ecosystem — Un tocco, infinite possibilità"
      width={widthFull}
      height={size}
      priority={priority}
      className={className}
      unoptimized
    />
  )

  // For dark surfaces, wrap in paper chip so the cream background of the JPG
  // blends with the surrounding card instead of showing as a hard rectangle.
  const fullImg = isDark ? (
    <span className="inline-flex items-center bg-paper rounded-md px-2 py-1.5">
      {baseImg}
    </span>
  ) : (
    baseImg
  )

  if (isMark) {
    // Crop just the "E" glyph: zoom 4.5x and shift left
    return (
      <span
        className={`relative inline-block overflow-hidden ${className}`}
        style={{ width: size, height: size }}
        aria-label="Ecosystem"
      >
        <Image
          src="/brand/ecosystem-logo.jpg"
          alt="Ecosystem"
          width={Math.round(size * aspectFull * 4.5)}
          height={Math.round(size * 4.5)}
          priority={priority}
          unoptimized
          style={{
            position: 'absolute',
            left: `-${Math.round(size * 0.55)}px`,
            top: `-${Math.round(size * 1.4)}px`,
            maxWidth: 'none',
          }}
        />
      </span>
    )
  }

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
