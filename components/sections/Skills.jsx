'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GlassCard } from '@/components/ui/GlassCard'
import styles from './Skills.module.css'

/* Category groupings — key maps to hardSkills item names in content.js */
const GROUPS = [
  {
    key: 'backend',
    label: { pt: 'Backend Core', en: 'Backend Core' },
    color: '#00ff88',
    gridArea: 'backend',
    primary: ['C#', 'ASP.NET / Legacy ASP', 'Java', 'Entity Framework', 'LINQ'],
    extras: ['Clean Architecture', 'MVC', 'Web API REST'],
  },
  {
    key: 'database',
    label: { pt: 'Banco de Dados', en: 'Database' },
    color: '#7dd3fc',
    gridArea: 'database',
    primary: ['SQL Server', 'MySQL / PostgreSQL'],
    extras: ['T-SQL', 'Stored Procedures'],
  },
  {
    key: 'cloud',
    label: { pt: 'Cloud & DevOps', en: 'Cloud & DevOps' },
    color: '#a78bfa',
    gridArea: 'cloud',
    primary: ['Azure', 'Docker', 'Git'],
    extras: ['CI/CD', 'Linux'],
  },
  {
    key: 'frontend',
    label: { pt: 'Frontend & Web', en: 'Frontend & Web' },
    color: '#fbbf24',
    gridArea: 'frontend',
    primary: ['JavaScript / TypeScript'],
    extras: ['React', 'Next.js', 'Node.js', 'HTML/CSS', 'WinForms'],
  },
]

const softCardVariants = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

function SkillChip({ name, description, color, isPrimary }) {
  const [open, setOpen] = useState(false)
  const hasDesc = !!description

  return (
    <div className={styles.chipWrapper}>
      <button
        className={`${styles.chip} ${isPrimary ? styles.chipPrimary : styles.chipExtra} ${open ? styles.chipOpen : ''}`}
        style={isPrimary ? { '--chip-color': color, '--chip-bg': `${color}18`, '--chip-border': `${color}40` } : {}}
        onClick={() => hasDesc && setOpen(v => !v)}
        aria-expanded={hasDesc ? open : undefined}
        disabled={!hasDesc}
      >
        {isPrimary && <span className={styles.chipDot} style={{ background: color }} />}
        {name}
      </button>

      <AnimatePresence>
        {open && hasDesc && (
          <motion.div
            className={styles.chipDesc}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CategoryCard({ group, allItems, lang }) {
  const label = group.label[lang]
  const lookup = (name) => allItems.find(s => s.name === name)

  return (
    <motion.div
      className={`${styles.catCard} ${styles[group.key]}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard className={styles.catInner}>
        {/* Header */}
        <div className={styles.catHeader}>
          <span className={styles.catDot} style={{ background: group.color, boxShadow: `0 0 10px 2px ${group.color}55` }} />
          <span className={styles.catLabel} style={{ color: group.color }}>{label}</span>
        </div>

        {/* Primary skills — larger, clickable for description */}
        <div className={styles.primarySkills}>
          {group.primary.map(name => {
            const item = lookup(name)
            return (
              <SkillChip
                key={name}
                name={name}
                description={item?.description}
                color={group.color}
                isPrimary
              />
            )
          })}
        </div>

        {/* Extra / supporting skills — smaller chips */}
        {group.extras.length > 0 && (
          <div className={styles.extraSkills}>
            {group.extras.map(name => {
              const item = lookup(name)
              return (
                <SkillChip
                  key={name}
                  name={name}
                  description={item?.description}
                  color={group.color}
                  isPrimary={false}
                />
              )
            })}
          </div>
        )}
      </GlassCard>
    </motion.div>
  )
}

export function Skills() {
  const { t, lang } = useLanguage()
  const { skills } = t

  return (
    <section id="skills" className={styles.section}>
      <SectionLabel eyebrow={skills.eyebrow} title={skills.title} />

      {/* Category bento grid */}
      <div className={styles.catGrid}>
        {GROUPS.map(group => (
          <CategoryCard
            key={group.key}
            group={group}
            allItems={skills.hardSkills.items}
            lang={lang}
          />
        ))}
      </div>

      {/* Soft skills strip */}
      <h3 className={styles.softTitle}>{skills.softSkills.label}</h3>
      <motion.div
        className={styles.softGrid}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {skills.softSkills.items.map((item, i) => (
          <motion.div key={i} variants={softCardVariants}>
            <GlassCard className={styles.softCard}>
              <h4 className={styles.softName}>{item.name}</h4>
              <p className={styles.softDesc}>{item.description}</p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
