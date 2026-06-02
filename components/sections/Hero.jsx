'use client'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import styles from './Hero.module.css'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 34, filter: 'blur(8px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Hero() {
  const { t } = useLanguage()
  const { hero } = t

  return (
    <section id="hero" className={styles.hero}>
      {/* Ambient lime glow */}
      <div className={styles.glow} aria-hidden="true" />

      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Status + location row */}
        <motion.div className={styles.meta} variants={item}>
          <span className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            {hero.eyebrow}
          </span>
          <span className={styles.location}>{hero.location}</span>
        </motion.div>

        {/* Giant name */}
        <h1 className={styles.name}>
          <motion.span className={styles.nameLine} variants={item}>
            {hero.firstName}
          </motion.span>
          <motion.span className={`${styles.nameLine} ${styles.nameOutline}`} variants={item}>
            {hero.lastName}
          </motion.span>
        </h1>

        {/* Role + tagline */}
        <motion.div className={styles.roleRow} variants={item}>
          <span className={styles.roleBadge}>{hero.role}</span>
          <p className={styles.tagline}>{hero.tagline}</p>
        </motion.div>

        {/* CTAs */}
        <motion.div className={styles.cta} variants={item}>
          <button className="btn-primary" onClick={() => scrollTo('projects')}>
            {hero.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
          <button className="btn-ghost" onClick={() => scrollTo('contact')}>
            {hero.ctaSecondary}
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className={styles.scrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className={styles.scrollText}>{hero.scrollHint}</span>
        <span className={styles.scrollLine} />
      </motion.div>
    </section>
  )
}
