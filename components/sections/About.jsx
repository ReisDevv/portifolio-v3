'use client'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { RevealText } from '@/components/ui/RevealText'
import { SectionLabel } from '@/components/ui/SectionLabel'
import styles from './About.module.css'

export function About() {
  const { t } = useLanguage()
  const { about } = t

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            <Image
              src="/assets/profile.jpeg"
              alt="Nelson Reis"
              fill
              className={styles.photo}
              sizes="(max-width: 900px) 100vw, 45vw"
              priority={false}
            />
            <div className={styles.imageGlow} aria-hidden="true" />
          </div>

          <div className={styles.stats}>
            {about.stats.map((stat, i) => (
              <RevealText key={i} delay={0.1 * i}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              </RevealText>
            ))}
          </div>
        </div>

        <div className={styles.textCol}>
          <SectionLabel eyebrow="SOBRE MIM" title={about.headline} />

          <div className={styles.paragraphs}>
            {about.paragraphs.map((p, i) => (
              <RevealText key={i} delay={0.1 + i * 0.1}>
                <p className={styles.paragraph}>{p}</p>
              </RevealText>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
