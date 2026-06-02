'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { AuroraOrbs } from '@/components/canvas/AuroraOrbs'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrambleText } from '@/hooks/useScrambleText'
import styles from './Hero.module.css'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)',
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

function ScrambleTitle({ text, reduced }) {
  const display = useScrambleText(text, { delay: 400, duration: 1400, reduced })
  return (
    <span className={styles.scramble} aria-label={text}>
      {display}
    </span>
  )
}

export function Hero() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()

  return (
    <div id="hero" className={styles.scrollContainer}>
      <div className={styles.sticky} ref={sectionRef}>
        {/* Soft Liquid-Glass aurora — the only background element */}
        <AuroraOrbs sectionRef={sectionRef} />

        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.span className={styles.eyebrow} variants={itemVariants}>
            {t.hero.eyebrow}
          </motion.span>

          <h1 className={styles.title}>
            {reduced ? t.hero.title : <ScrambleTitle text={t.hero.title} reduced={reduced} />}
          </h1>

          <motion.p className={styles.subtitle} variants={itemVariants}>
            {t.hero.subtitle}
            <span className={styles.cursor} aria-hidden="true" />
          </motion.p>

          <motion.div className={styles.cta} variants={itemVariants}>
            <button
              className="btn-primary"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.hero.cta}
            </button>
          </motion.div>
        </motion.div>

        <div className={styles.bottomFade} aria-hidden="true" />
      </div>
    </div>
  )
}
