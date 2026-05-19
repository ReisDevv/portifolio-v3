'use client'
import { LanguageProvider } from '@/context/LanguageContext'
import { useLenis } from '@/hooks/useLenis'

function LenisInit() {
  useLenis()
  return null
}

export function Providers({ children }) {
  return (
    <LanguageProvider>
      <LenisInit />
      {children}
    </LanguageProvider>
  )
}
