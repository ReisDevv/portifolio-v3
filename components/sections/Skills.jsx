'use client'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { SectionLabel } from '@/components/ui/SectionLabel'
import styles from './Skills.module.css'

/* Category groupings — names map to hardSkills items in content.js */
const GROUPS = [
  {
    key: 'backend',
    label: { pt: 'Backend Core', en: 'Backend Core' },
    badge: '{ }',
    skills: ['C#', 'ASP.NET / Legacy ASP', 'Java', 'Entity Framework', 'LINQ', 'Clean Architecture', 'MVC', 'Web API REST'],
  },
  {
    key: 'database',
    label: { pt: 'Banco de Dados', en: 'Database' },
    badge: 'DB',
    skills: ['SQL Server', 'T-SQL', 'Stored Procedures', 'MySQL / PostgreSQL'],
  },
  {
    key: 'cloud',
    label: { pt: 'Cloud & DevOps', en: 'Cloud & DevOps' },
    badge: '☁',
    skills: ['Azure', 'Docker', 'Git', 'CI/CD', 'Linux'],
  },
  {
    key: 'frontend',
    label: { pt: 'Frontend & Web', en: 'Frontend & Web' },
    badge: '</>',
    skills: ['JavaScript / TypeScript', 'React', 'Next.js', 'Node.js', 'HTML/CSS', 'WinForms'],
  },
]

const card = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

function CategoryCard({ group, lang }) {
  return (
    <motion.div className={`${styles.cat} ${styles[group.key]}`} variants={card}>
      <div className={styles.catHead}>
        <span className={styles.badge}>{group.badge}</span>
        <span className={styles.catLabel}>{group.label[lang]}</span>
      </div>
      <div className={styles.skillList}>
        {group.skills.map(name => (
          <span key={name} className={styles.skill}>{name}</span>
        ))}
      </div>
    </motion.div>
  )
}

export function Skills() {
  const { t, lang } = useLanguage()
  const { skills } = t

  return (
    <section id="skills" className={styles.section}>
      <SectionLabel index="03" eyebrow={skills.eyebrow} title={skills.title} />

      <motion.div
        className={styles.grid}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {GROUPS.map(group => (
          <CategoryCard key={group.key} group={group} lang={lang} />
        ))}
      </motion.div>

      {/* Soft skills */}
      <h3 className={styles.softTitle}>{skills.softSkills.label}</h3>
      <motion.div
        className={styles.softGrid}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {skills.softSkills.items.map((item, i) => (
          <motion.div key={i} className={styles.softCard} variants={card}>
            <h4 className={styles.softName}>{item.name}</h4>
            <p className={styles.softDesc}>{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
