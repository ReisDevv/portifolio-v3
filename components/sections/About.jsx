'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { ChatBot } from '@/components/ui/ChatBot'
import { RevealText } from '@/components/ui/RevealText'
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

function StatItem({ value, label }) {
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
      className={styles.stat}
      initial={{ opacity: 0, y: 30, rotateX: 18, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <span className={styles.statValue}>{display}</span>
      <span className={styles.statLabel}>{label}</span>
    </motion.div>
  )
}

export function About() {
  const { t } = useLanguage()
  const { about } = t

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>

        {/* Left — sticky chatbot */}
        <div className={styles.chatCol}>
          <motion.div
            className={styles.chatWrapper}
            initial={{ opacity: 0, x: -48, rotateY: 8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d', transformOrigin: 'left center' }}
          >
            <ChatBot />
          </motion.div>
        </div>

        {/* Right — text + stats */}
        <div className={styles.textCol}>
          <SectionLabel eyebrow="SOBRE MIM" title={about.headline} />

          <div className={styles.paragraphs}>
            {about.paragraphs.map((p, i) => (
              <RevealText key={i} delay={0.1 + i * 0.1}>
                <p className={styles.paragraph}>{p}</p>
              </RevealText>
            ))}
          </div>

          <div className={styles.stats}>
            {about.stats.map((stat, i) => (
              <StatItem key={i} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
