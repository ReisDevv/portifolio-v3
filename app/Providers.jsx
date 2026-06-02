'use client'
import { MotionConfig } from 'framer-motion'
import { LanguageProvider } from '@/context/LanguageContext'
import { useLenis } from '@/hooks/useLenis'
import { useScrollProgressTracker } from '@/hooks/useScrollProgress'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { LangToggle } from '@/components/ui/LangToggle'
import { Scene3DLayer } from '@/components/three/Scene3DLayer'

function Init() {
  useLenis()
  useScrollProgressTracker()
  return null
}

export function Providers({ children }) {
  return (
    <LanguageProvider>
      {/* reducedMotion="user" lets Framer Motion automatically strip
          transform-based animation for visitors who set prefers-reduced-motion. */}
      <MotionConfig reducedMotion="user">
        <Init />
        <Scene3DLayer />
        <ScrollProgress />
        <CustomCursor />
        <LangToggle />
        {children}
      </MotionConfig>
    </LanguageProvider>
  )
}
