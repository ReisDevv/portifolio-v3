'use client'
import { useLanguage } from '@/context/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:justify-between md:px-8">
        <p>© {new Date().getFullYear()} Nelson Reis</p>
        <p>{t.footer.built}</p>
      </div>
    </footer>
  )
}
