'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GlassCard } from '@/components/ui/GlassCard'
import styles from './Skills.module.css'

const pillContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

const cardContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

function HardSkillPill({ item }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.pillWrapper}>
      <motion.button
        className={`${styles.pill} ${open ? styles.pillActive : ''}`}
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        aria-expanded={open}
      >
        {item.name}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.pillDesc}
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>{item.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Skills() {
  const { t } = useLanguage()
  const { skills } = t

  return (
    <section id="skills" className={styles.section}>
      <SectionLabel eyebrow={skills.eyebrow} title={skills.title} />

      <div className={styles.columns}>
        <div className={styles.hardCol}>
          <h3 className={styles.colTitle}>{skills.hardSkills.label}</h3>
          <motion.div
            className={styles.pills}
            variants={pillContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {skills.hardSkills.items.map((item, i) => (
              <motion.div key={i} variants={pillVariants}>
                <HardSkillPill item={item} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className={styles.softCol}>
          <h3 className={styles.colTitle}>{skills.softSkills.label}</h3>
          <motion.div
            className={styles.softGrid}
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {skills.softSkills.items.map((item, i) => (
              <motion.div key={i} variants={cardVariants}>
                <GlassCard className={styles.softCard}>
                  <h4 className={styles.softTitle}>{item.name}</h4>
                  <p className={styles.softDesc}>{item.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
