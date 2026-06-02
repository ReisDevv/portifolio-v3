'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { content } from '@/data/content'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('pt')
  const toggleLang = () => setLang(l => (l === 'pt' ? 'en' : 'pt'))

  // Keep the document language in sync for accessibility and SEO — screen
  // readers and search engines rely on <html lang> matching the visible copy.
  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: content[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
