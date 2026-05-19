'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { HeroCanvas } from '@/components/canvas/HeroCanvas'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './Hero.module.css'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

const letterVariants = {
  hidden: { opacity: 0, y: 60 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

function CharSplit({ text, className }) {
  return (
    <motion.span
      className={className}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.025 } } }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export function Hero() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()

  return (
    <div id="hero" className={styles.scrollContainer}>
      <div className={styles.sticky} ref={sectionRef}>
        <HeroCanvas sectionRef={sectionRef} />

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
            {reduced ? (
              t.hero.title
            ) : (
              <motion.span
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.025, delayChildren: 0.2 } } }}
                initial="hidden"
                animate="show"
              >
                {t.hero.title.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    variants={letterVariants}
                    style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            )}
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

          <motion.div className={styles.scrollHint} variants={itemVariants}>
            <span className={styles.scrollLine} />
            <span className={styles.scrollText}>{t.hero.scrollHint}</span>
          </motion.div>
        </motion.div>

        {/* Gradient overlay bottom */}
        <div className={styles.bottomFade} aria-hidden="true" />
      </div>
    </div>
  )
}
