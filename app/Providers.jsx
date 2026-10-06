'use client'
import { MotionConfig } from 'motion/react'
import { LanguageProvider } from '@/context/LanguageContext'

export function Providers({ children }) {
  return (
    <LanguageProvider>
      {/* Strips transform animations for visitors who prefer reduced motion. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LanguageProvider>
  )
}
