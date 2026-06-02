'use client'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { RevealText } from '@/components/ui/RevealText'
import styles from './Contact.module.css'

const ICONS = {
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  email: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  phone: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6 6l.93-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.99 16.9z" />
    </svg>
  ),
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export function Contact() {
  const { t } = useLanguage()
  const { contact } = t
  const email = contact.items.find(i => i.icon === 'email')

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <RevealText delay={0}>
          <span className="mono-label">{contact.eyebrow}</span>
        </RevealText>

        <RevealText delay={0.08}>
          <h2 className={styles.headline}>{contact.headline}</h2>
        </RevealText>

        {/* Giant clickable email */}
        {email && (
          <RevealText delay={0.16}>
            <a href={email.url} className={styles.emailLink}>
              {email.value}
            </a>
          </RevealText>
        )}

        {/* Quick action buttons */}
        <motion.div
          className={styles.cards}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {contact.items.map((item, i) => (
            <motion.a
              key={i}
              href={item.url}
              target={item.icon === 'linkedin' ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className={styles.card}
              variants={cardVariants}
            >
              <span className={styles.icon}>{ICONS[item.icon]}</span>
              <span className={styles.cardText}>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.value}>{item.value}</span>
              </span>
            </motion.a>
          ))}
        </motion.div>

        <RevealText delay={0.3}>
          <a href="/assets/resume.pdf" download className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M12 3v12" /><polyline points="7 10 12 15 17 10" /><line x1="5" y1="21" x2="19" y2="21" />
            </svg>
            {contact.downloadCta}
          </a>
        </RevealText>
      </div>
    </section>
  )
}
