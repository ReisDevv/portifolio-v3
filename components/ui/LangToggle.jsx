'use client'
import { useLanguage } from '@/context/LanguageContext'
import styles from './LangToggle.module.css'

/* Floating, fixed language switch — replaces the removed navbar's toggle.
   Sits top-right and stays out of the way on a single-page scroll. */
export function LangToggle() {
  const { lang, toggleLang } = useLanguage()

  return (
    <div className={styles.wrap} role="group" aria-label="Idioma / Language">
      <button
        className={`${styles.opt} ${lang === 'pt' ? styles.active : ''}`}
        onClick={() => lang !== 'pt' && toggleLang()}
        aria-pressed={lang === 'pt'}
      >
        PT
      </button>
      <span className={styles.sep} aria-hidden="true" />
      <button
        className={`${styles.opt} ${lang === 'en' ? styles.active : ''}`}
        onClick={() => lang !== 'en' && toggleLang()}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  )
}
