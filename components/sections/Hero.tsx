'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { HeroStack } from './HeroStack'
import { MagneticButton } from '@/components/motion/MagneticButton'

export function Hero() {
  return (
    <section className="relative flex items-center py-8 lg:py-10 px-6 lg:px-12 overflow-hidden">
      <div className="mesh-bg" aria-hidden />
      <div className="grain" aria-hidden />
      <ShutterReveal />

      <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center relative z-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-accent-brass mb-6"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-brand-violet"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            LA PIATTAFORMA · AI-NATIVE · MADE IN ITALY
          </motion.div>

          <h1 className="font-serif font-normal text-[clamp(40px,5.5vw,76px)] leading-[1.0] tracking-[-0.03em] mb-8 text-ink-900">
            <RevealLine delay={1.3}>Il sistema operativo</RevealLine>
            <RevealLine delay={1.5}>
              della tua <em className="italic text-gradient-animate">azienda.</em>
            </RevealLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.9 }}
            className="text-lg lg:text-xl text-ink-700 max-w-[540px] mb-10 leading-relaxed"
          >
            Costruito intorno a CoreMind, l&apos;intelligenza nativa che capisce la tua
            azienda e la fa lavorare per te. Un unico database. Un solo login.
            Nessun limite.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.1 }}
            className="flex flex-wrap gap-3"
          >
            <MagneticButton
              href="/contatti"
              className="shimmer-cta relative inline-flex items-center gap-2 bg-ink-900 text-white px-6 py-3.5 rounded-lg text-sm font-medium hover:bg-brand-navy transition-colors shadow-lg shadow-ink-900/20"
            >
              <span className="relative z-10">Richiedi una demo →</span>
            </MagneticButton>
            <Link
              href="/demo"
              className="group relative border border-line-strong px-6 py-3.5 rounded-lg text-sm font-medium hover:bg-paper-2 transition-colors overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Prova la piattaforma live
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="mt-12 flex items-center gap-6 text-xs text-ink-500"
          >
            <div className="flex items-center gap-2">
              <LiveDot /> CoreMind in linea
            </div>
            <div className="h-3 w-px bg-line-strong" />
            <span className="font-mono">142 aziende · live adesso</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.0 }}
        >
          <HeroStack />
        </motion.div>
      </div>

      <ScrollHint />
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
        className="absolute inset-x-0 top-0 h-1/2 bg-paper z-50 pointer-events-none"
        aria-hidden
      />
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: '100%' }}
        transition={{ duration: 0.9, ease: [0.7, 0, 0.84, 0], delay: 0.2 }}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-paper z-50 pointer-events-none"
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
