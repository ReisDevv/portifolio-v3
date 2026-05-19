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

const TAG_COLORS = {
  'C#':         'rgba(155, 77, 202, 0.15)',
  'JavaScript': 'rgba(241, 224, 90, 0.12)',
  'HTML':       'rgba(227, 76, 38, 0.12)',
  'Java':       'rgba(176, 114, 25, 0.12)',
  'Node.js':    'rgba(104, 160, 99, 0.15)',
  '.NET':       'rgba(89, 0, 204, 0.12)',
  'WinForms':   'rgba(0, 120, 212, 0.12)',
  'default':    'rgba(255, 255, 255, 0.06)',
}

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

function TagChip({ tag }) {
  const bg = TAG_COLORS[tag] ?? TAG_COLORS.default
  return (
    <span className={styles.tag} style={{ background: bg }}>
      {tag}
    </span>
  )
}

function FeaturedCard({ item, viewRepo, eyebrow }) {
  const langColor = LANG_COLORS[item.language] ?? 'var(--color-accent)'

  return (
    <motion.div
      className={styles.featuredWrapper}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard className={styles.featuredTilt}>
        <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.featuredLink}>
          <GlassCard className={styles.featured} elevated>
            {/* left: content */}
            <div className={styles.featuredContent}>
              <span className={styles.featuredEyebrow}>{eyebrow}</span>
              <h3 className={styles.featuredTitle}>{item.title}</h3>
              <p className={styles.featuredDesc}>{item.description}</p>
              <div className={styles.featuredTags}>
                {item.tags?.map(t => <TagChip key={t} tag={t} />)}
              </div>
              <span className={styles.viewLink}>
                <GitHubIcon /> {viewRepo} <ArrowIcon />
              </span>
            </div>

            {/* right: decorative terminal-like display */}
            <div className={styles.featuredDeco} aria-hidden="true">
              <div className={styles.decoBar}>
                <span className={styles.decoDot} style={{ background: '#ff5f57' }} />
                <span className={styles.decoDot} style={{ background: '#febc2e' }} />
                <span className={styles.decoDot} style={{ background: '#28c840' }} />
              </div>
              <div className={styles.decoBody}>
                <div className={styles.decoRow}>
                  <span className={styles.decoKw}>namespace</span>
                  <span className={styles.decoTxt}> SmartCities</span>
                </div>
                <div className={styles.decoRow}>
                  <span className={styles.decoBrace}>{'{'}</span>
                </div>
                <div className={styles.decoRow} style={{ paddingLeft: 16 }}>
                  <span className={styles.decoKw}>class</span>
                  <span className={styles.decoMethod}> EnergyDashboard</span>
                </div>
                <div className={styles.decoRow} style={{ paddingLeft: 16 }}>
                  <span className={styles.decoBrace}>{'{'}</span>
                </div>
                <div className={styles.decoRow} style={{ paddingLeft: 32 }}>
                  <span className={styles.decoKw}>public</span>
                  <span className={styles.decoTxt}> Form1()</span>
                </div>
                <div className={styles.decoRow} style={{ paddingLeft: 32 }}>
                  <span className={styles.decoMethod}>  InitComponent</span>
                  <span className={styles.decoTxt}>();</span>
                </div>
                <div className={styles.decoRow} style={{ paddingLeft: 16 }}>
                  <span className={styles.decoBrace}>{'}'}</span>
                </div>
                <div className={styles.decoRow}>
                  <span className={styles.decoBrace}>{'}'}</span>
                </div>
                <div className={styles.decoRow}>
                  <span className={styles.decoAccent}>▌</span>
                </div>
              </div>
              {item.language && (
                <div className={styles.decoLang}>
                  <span
                    className={styles.decoLangDot}
                    style={{ background: langColor, boxShadow: `0 0 8px 2px ${langColor}55` }}
                  />
                  {item.language}
                </div>
              )}
            </div>
          </GlassCard>
        </a>
      </TiltCard>
    </motion.div>
  )
}

function ProjectCard({ item, viewRepo, delay }) {
  const langColor = LANG_COLORS[item.language] ?? 'var(--color-text-muted)'

  return (
    <motion.div
      className={styles.cardWrapper}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      <TiltCard className={styles.tiltOuter}>
        <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
          <GlassCard className={styles.card}>
            <div className={styles.cardTop}>
              {item.language && (
                <span className={styles.lang}>
                  <span
                    className={styles.langDot}
                    style={{ background: langColor, boxShadow: `0 0 8px 2px ${langColor}55` }}
                  />
                  {item.language}
                </span>
              )}
            </div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDesc}>{item.description}</p>
            <div className={styles.cardTags}>
              {item.tags?.slice(0, 3).map(t => <TagChip key={t} tag={t} />)}
            </div>
            <span className={styles.viewLink}>
              <GitHubIcon /> {viewRepo} <ArrowIcon />
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
  const [featured, ...rest] = projects.items

  return (
    <section id="projects" className={styles.section}>
      <SectionLabel eyebrow={projects.eyebrow} title={projects.title} />

      {/* Featured first project */}
      <FeaturedCard item={featured} viewRepo={projects.viewRepo} eyebrow={projects.eyebrow} />

      {/* Remaining projects in 3-column bento grid */}
      <div className={styles.grid}>
        {rest.map((item, i) => (
          <ProjectCard key={i} item={item} viewRepo={projects.viewRepo} delay={i * 0.07} />
        ))}
      </div>
    </section>
  )
}
