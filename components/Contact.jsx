'use client'
import { useState, useEffect } from 'react'
import { Check, Copy, DownloadSimple, GithubLogo, LinkedinLogo, Phone } from '@phosphor-icons/react'
import { useLanguage } from '@/context/LanguageContext'
import { links } from '@/data/content'
import { Reveal } from './Reveal'

export function Contact() {
  const { t } = useLanguage()
  const { contact } = t
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(id)
  }, [copied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${links.email}`
    }
  }

  const channels = [
    { href: links.linkedin, label: 'LinkedIn', Icon: LinkedinLogo, external: true },
    { href: links.github, label: 'GitHub', Icon: GithubLogo, external: true },
    { href: links.phoneHref, label: `${contact.phone} ${links.phone}`, Icon: Phone },
  ]

  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-32">
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-tighter md:text-6xl">{contact.title}</h2>
          <p className="mt-5 max-w-[52ch] text-lg text-muted">{contact.sub}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${links.email}`}
            className="text-xl font-medium tracking-tight break-all underline decoration-line decoration-2 underline-offset-8 transition-colors hover:decoration-accent md:text-3xl"
          >
            {links.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:text-fg active:scale-[0.97]"
          >
            {copied ? <Check size={14} weight="bold" className="text-accent" /> : <Copy size={14} />}
            <span aria-live="polite">{copied ? contact.copied : contact.copy}</span>
          </button>
        </Reveal>

        <Reveal delay={0.14} className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href={links.resume}
            download="CV_Nelson.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          >
            <DownloadSimple size={16} weight="bold" aria-hidden="true" />
            {contact.resume}
          </a>
          {channels.map(({ href, label, Icon, external }) => (
            <a
              key={href}
              href={href}
              {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-fg/40 active:scale-[0.98]"
            >
              <Icon size={16} aria-hidden="true" />
              {label}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
