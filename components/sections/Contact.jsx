'use client'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { RevealText } from '@/components/ui/RevealText'
import { GlassCard } from '@/components/ui/GlassCard'
import styles from './Contact.module.css'

const ICONS = {
  linkedin: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  email: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  phone: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6 6l.93-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.99 16.9z" />
    </svg>
  ),
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 12, scale: 0.94 },
  show:   {
    opacity: 1, y: 0, rotateX: 0, scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

export function Contact() {
  const { t } = useLanguage()
  const { contact } = t

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <RevealText delay={0}>
          <span className={styles.eyebrow}>{contact.eyebrow}</span>
        </RevealText>

        <RevealText delay={0.1}>
          <h2 className={styles.headline}>{contact.headline}</h2>
        </RevealText>

        <motion.div
          className={styles.cards}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {contact.items.map((item, i) => (
            <motion.a
              key={i}
              href={item.url}
              target={item.icon === 'email' || item.icon === 'phone' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className={styles.cardLink}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
            >
              <GlassCard className={styles.card}>
                <span className={styles.icon}>{ICONS[item.icon]}</span>
                <div className={styles.cardText}>
                  <span className={styles.label}>{item.label}</span>
                  <span className={styles.value}>{item.value}</span>
                </div>
              </GlassCard>
            </motion.a>
          ))}
        </motion.div>

        <RevealText delay={0.3}>
          <div className={styles.ctaRow}>
            <a href="/assets/resume.pdf" download className="btn-primary">
              ↓ {contact.downloadCta}
            </a>
          </div>
        </RevealText>
      </div>
    </section>
  )
}
