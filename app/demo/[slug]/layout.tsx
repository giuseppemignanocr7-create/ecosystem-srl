'use client'

import { useEffect } from 'react'

/**
 * Demo suite immersive layout — temporarily hides the global SideRail
 * and MobileNav so the demo app is full-screen.
 */
export default function DemoSuiteLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Force rail width to 0 while inside a demo suite
    const html = document.documentElement
    const prev = html.style.getPropertyValue('--rail-w')
    html.style.setProperty('--rail-w', '0px')
    document.body.classList.add('demo-immersive')
    return () => {
      html.style.setProperty('--rail-w', prev)
      document.body.classList.remove('demo-immersive')
    }
  }, [])

  return <>{children}</>
}
