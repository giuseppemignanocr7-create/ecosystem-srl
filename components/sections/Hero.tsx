'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { HeroStack } from './HeroStack'
import { MagneticButton } from '@/components/motion/MagneticButton'

export function Hero() {
  return (
    <section className="relative py-12 lg:py-16 px-6 lg:px-12 overflow-hidden bg-gradient-to-b from-brand-navy-3 via-brand-navy to-brand-navy-2 text-white">
      {/* Subtle decorative bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        aria-hidden
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(124,58,237,0.22), transparent 55%), radial-gradient(circle at 80% 70%, rgba(59,95,232,0.22), transparent 55%)',
        }}
      />
      <div className="grain opacity-40" aria-hidden />
      <ShutterReveal />

      <div className="max-w-[1400px] mx-auto w-full relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase mb-8 text-pearl-3d"
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-brand-violet"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          LA PIATTAFORMA · AI-NATIVE · MADE IN ITALY
        </motion.div>

        <h1 className="font-serif font-normal text-[clamp(32px,4.8vw,64px)] leading-[1.1] tracking-[0.02em] uppercase mb-10 text-pearl-3d">
          <RevealLine delay={1.2}>
            L&apos;<em className="italic text-gradient-hero">ECOSISTEMA</em> DEFINITIVO PER IL TUO BUSINESS
          </RevealLine>
          <RevealLine delay={1.4}>UN SOLO CENTRO DI COMANDO</RevealLine>
          <RevealLine delay={1.6}>
            <em className="italic text-gradient-hero">INFINITE</em> POSSIBILITÀ
          </RevealLine>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.9 }}
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          <MagneticButton
            href="/contatti"
            className="shimmer-cta relative inline-flex items-center gap-2 bg-brand-violet text-white px-6 py-3.5 rounded-lg text-sm font-medium hover:bg-brand-violet-deep transition-colors shadow-lg shadow-brand-violet/40"
          >
            <span className="relative z-10">Richiedi una demo →</span>
          </MagneticButton>
          <Link
            href="/demo"
            className="group relative border border-white/20 bg-white/5 backdrop-blur-sm text-white px-6 py-3.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Prova la piattaforma live
            </span>
          </Link>
        </motion.div>

        {/* 3 card sotto il testo, tutte visibili, auto-scroll con animazioni interne intatte */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.1 }}
          className="mt-6"
        >
          <HeroStack />
        </motion.div>
      </div>
    </section>
  )
}

function LiveDot() {
  return (
    <span className="relative inline-flex">
      <span className="w-2 h-2 rounded-full bg-success" />
      <motion.span
        className="absolute inset-0 w-2 h-2 rounded-full bg-success"
        animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </span>
  )
}

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span style={{ display: 'block', overflow: 'hidden' }}>
      <motion.span
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
        style={{ display: 'inline-block' }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function ShutterReveal() {
  return (
    <>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: '-100%' }}
        transition={{ duration: 0.9, ease: [0.7, 0, 0.84, 0], delay: 0.2 }}
        className="absolute inset-x-0 top-0 h-1/2 bg-brand-navy-3 z-50 pointer-events-none"
        aria-hidden
      />
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: '100%' }}
        transition={{ duration: 0.9, ease: [0.7, 0, 0.84, 0], delay: 0.2 }}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-brand-navy-3 z-50 pointer-events-none"
        aria-hidden
      />
    </>
  )
}

function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 2.6 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-400 pointer-events-none"
    >
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase">SCROLL</span>
      <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-ink-300 to-transparent relative overflow-hidden">
        <motion.div
          className="absolute inset-x-0 top-0 h-3 bg-brand-violet"
          animate={{ y: [0, 28, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}
