'use client'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { SectionLabel } from '@/components/ui/SectionLabel'
import styles from './Projects.module.css'

const LANG_COLORS = {
  'C#':         '#ccff00',
  'JavaScript': '#f7df1e',
  'HTML':       '#ff6a3d',
  'Java':       '#f89820',
  'CSS':        '#7eb3ff',
  'TypeScript': '#5e9eff',
}

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
)

const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

function ProjectCard({ item, index, viewRepo, featured }) {
  const langColor = LANG_COLORS[item.language] ?? 'var(--color-accent)'
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      variants={card}
    >
      <div className={styles.cardHead}>
        <span className={styles.num}>{num}</span>
        {item.language && (
          <span className={styles.lang}>
            <span className={styles.langDot} style={{ background: langColor, boxShadow: `0 0 8px ${langColor}` }} />
            {item.language}
          </span>
        )}
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{item.title}</h3>
        <p className={styles.cardDesc}>{item.description}</p>
      </div>

      <div className={styles.cardFoot}>
        <div className={styles.tags}>
          {item.tags?.slice(0, featured ? 6 : 3).map(t => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
        <span className={styles.viewLink}>
          <GitHubIcon />
          <span>{viewRepo}</span>
          <span className={styles.arrow}><ArrowIcon /></span>
        </span>
      </div>
    </motion.a>
  )
}

export function Projects() {
  const { t } = useLanguage()
  const { projects } = t

  return (
    <section id="projects" className={styles.section}>
      <SectionLabel index="02" eyebrow={projects.eyebrow} title={projects.title} />

      <motion.div
        className={styles.grid}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {projects.items.map((item, i) => (
          <ProjectCard
            key={i}
            item={item}
            index={i}
            viewRepo={projects.viewRepo}
            featured={i === 0}
          />
        ))}
      </motion.div>
    </section>
  )
}
