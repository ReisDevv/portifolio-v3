'use client'
import { useLanguage } from '@/context/LanguageContext'
import { Reveal } from './Reveal'

export function Stack() {
  const { t } = useLanguage()
  const { stack } = t

  return (
    <section id="stack" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{stack.title}</h2>
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {stack.groups.map((group, i) => (
            <Reveal key={group.name} delay={i * 0.06} className="border-t-2 border-fg pt-4">
              <h3 className="font-semibold">{group.name}</h3>
              <ul className="mt-4 space-y-2 text-muted">
                {group.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-muted">
          <span className="font-semibold text-fg">{stack.languagesLabel}</span>
          {stack.languages}
        </Reveal>
      </div>
    </section>
  )
}
