'use client'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GlassCard } from '@/components/ui/GlassCard'
import { TiltCard } from '@/components/ui/TiltCard'
import styles from './Projects.module.css'

const LANG_COLORS = {
  'C#':         '#9b4dca',
  'JavaScript': '#f1e05a',
  'HTML':       '#e34c26',
  'Java':       '#b07219',
  'CSS':        '#563d7c',
  'TypeScript': '#3178c6',
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

function ProjectCard({ item, viewRepo }) {
  const langColor = LANG_COLORS[item.language] || 'var(--color-text-muted)'

  return (
    <motion.div className={styles.cardWrapper} variants={cardVariants}>
      <TiltCard className={styles.tiltOuter}>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cardLink}
        >
          <GlassCard className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              {item.language && (
                <span className={styles.lang}>
                  <span
                    className={styles.langDot}
                    style={{
                      background: langColor,
                      boxShadow: `0 0 8px 2px ${langColor}55`,
                    }}
                  />
                  {item.language}
                </span>
              )}
            </div>
            <p className={styles.cardDesc}>{item.description}</p>
            <span className={styles.viewLink}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              {viewRepo}
            </span>
          </GlassCard>
        </a>
      </TiltCard>
    </motion.div>
  )
}

export function Projects() {
  const { t } = useLanguage()
  const { projects } = t

  return (
    <section id="projects" className={styles.section}>
      <SectionLabel eyebrow={projects.eyebrow} title={projects.title} />

      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
      >
        {projects.items.map((item, i) => (
          <ProjectCard key={i} item={item} viewRepo={projects.viewRepo} />
        ))}
      </motion.div>
    </section>
  )
}
