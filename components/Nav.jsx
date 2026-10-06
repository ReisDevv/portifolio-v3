'use client'
import { useLanguage } from '@/context/LanguageContext'

export function Nav() {
  const { t, toggleLang } = useLanguage()
  const items = [
    ['#experience', t.nav.experience],
    ['#projects', t.nav.projects],
    ['#stack', t.nav.stack],
    ['#contact', t.nav.contact],
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 md:px-8">
        <a href="#top" className="font-semibold tracking-tight">
          Nelson Reis
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 md:flex">
            {items.map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t.nav.switchLabel}
            className="rounded-md border border-line px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-fg/30 hover:text-fg active:scale-[0.97]"
          >
            {t.nav.switchTo}
          </button>
        </div>
      </nav>
    </header>
  )
}
