'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { ChatBot } from '@/components/ui/ChatBot'
import { SectionLabel } from '@/components/ui/SectionLabel'
import styles from './About.module.css'

function useCountUp(target, duration = 1400) {
  const [count, setCount] = useState(0)
  const [active, setActive] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.6 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!active) return
    const numeric = parseInt(target, 10)
    if (isNaN(numeric)) return
    let start
    const raf = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setCount(Math.floor(numeric * p))
      if (p < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [active, target, duration])

  return { ref, count, active }
}

function StatCard({ value, label, delay }) {
  const numeric = parseInt(value, 10)
  const hasSuffix = value.includes('+')
  const isNumeric = !isNaN(numeric)
  const { ref, count, active } = useCountUp(value)

  const display = isNumeric
    ? `${active ? count : 0}${hasSuffix ? '+' : ''}`
    : value

  return (
    <motion.div
      ref={ref}
      className={`${styles.cell} ${styles.statCell}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <span className={styles.statValue}>{display}</span>
      <span className={styles.statLabel}>{label}</span>
    </motion.div>
  )
}

const cell = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export function About() {
  const { t, lang } = useLanguage()
  const { about } = t

  return (
    <section id="about" className={styles.section}>
      <SectionLabel index="01" eyebrow={about.title} title={about.headline} />

      <motion.div
        className={styles.bento}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Photo */}
        <motion.div className={`${styles.cell} ${styles.photoCell}`} variants={cell}>
          <Image
            src="/assets/profile.jpeg"
            alt="Nelson Reis"
            fill
            sizes="(max-width: 900px) 100vw, 320px"
            className={styles.photo}
            priority
          />
          <div className={styles.photoOverlay}>
            <span className={styles.photoName}>Nelson Reis</span>
            <span className={styles.photoRole}>{t.footer.role}</span>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div className={`${styles.cell} ${styles.bioCell}`} variants={cell}>
          {about.paragraphs.map((p, i) => (
            <p key={i} className={styles.paragraph}>{p}</p>
          ))}
        </motion.div>

        {/* Stats */}
        {about.stats.map((stat, i) => (
          <StatCard key={i} value={stat.value} label={stat.label} delay={0.1 + i * 0.05} />
        ))}

        {/* Chatbot */}
        <motion.div className={`${styles.cell} ${styles.chatCell}`} variants={cell}>
          <ChatBot key={lang} />
        </motion.div>
      </motion.div>
    </section>
  )
}
