'use client'
import { useLanguage } from '@/context/LanguageContext'
import { Reveal } from './Reveal'

export function Experience() {
  const { t } = useLanguage()
  const { experience } = t

  return (
    <section id="experience" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <Reveal className="md:col-span-4">
          <h2 className="text-3xl font-semibold tracking-tight md:sticky md:top-28 md:text-4xl">
            {experience.title}
          </h2>
        </Reveal>

        <ol className="md:col-span-8">
          {experience.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.org}
              delay={i * 0.06}
              className="grid gap-3 border-line py-8 first:pt-0 not-last:border-b sm:grid-cols-[1fr_auto] sm:gap-x-8"
            >
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{item.org}</h3>
                <p className="mt-1 text-muted">{item.role}</p>
              </div>
              <p className="font-mono text-xs text-muted sm:pt-2 sm:text-right">{item.period}</p>
              <p className="max-w-[60ch] leading-relaxed sm:col-span-2">{item.text}</p>
              <ul className="flex flex-wrap gap-2 sm:col-span-2">
                {item.tags.map(tag => (
                  <li key={tag} className="rounded-full bg-surface px-3 py-1 font-mono text-xs text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
