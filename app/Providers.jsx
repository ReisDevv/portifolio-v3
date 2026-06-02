'use client'
import { MotionConfig } from 'framer-motion'
import { LanguageProvider } from '@/context/LanguageContext'
import { useLenis } from '@/hooks/useLenis'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { LangToggle } from '@/components/ui/LangToggle'

function LenisInit() {
  useLenis()
  return null
}

export function Providers({ children }) {
  return (
    <LanguageProvider>
      {/* reducedMotion="user" lets Framer Motion automatically strip
          transform-based animation (x/y/scale/rotate) for visitors who set
          prefers-reduced-motion, keeping only opacity — applied across every
          motion component without per-component branching. */}
      <MotionConfig reducedMotion="user">
        <LenisInit />
        <ScrollProgress />
        <CustomCursor />
        <LangToggle />
        {children}
      </MotionConfig>
    </LanguageProvider>
  )
}
