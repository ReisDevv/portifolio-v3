'use client'
import { LanguageProvider } from '@/context/LanguageContext'
import { useLenis } from '@/hooks/useLenis'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

function LenisInit() {
  useLenis()
  return null
}

export function Providers({ children }) {
  return (
    <LanguageProvider>
      <LenisInit />
      <ScrollProgress />
      <CustomCursor />
      {children}
    </LanguageProvider>
  )
}
