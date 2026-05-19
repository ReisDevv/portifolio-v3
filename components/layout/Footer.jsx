'use client'
import { useLanguage } from '@/context/LanguageContext'
import styles from './Footer.module.css'

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>NR</span>
          <span className={styles.name}>Nelson Reis</span>
          <span className={styles.role}>{t.footer.role}</span>
        </div>

        <nav className={styles.nav} aria-label="Footer navigation">
          <div className={styles.navCol}>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className={styles.navLink}
            >
              {t.footer.nav.about}
            </button>
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className={styles.navLink}
            >
              {t.footer.nav.projects}
            </button>
            <button
              onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
              className={styles.navLink}
            >
              {t.footer.nav.skills}
            </button>
          </div>
          <div className={styles.navCol}>
            <a href="mailto:nelsondosreisgomessouza@gmail.com" className={styles.navLink}>
              {t.footer.nav.email}
            </a>
            <a
              href="https://www.linkedin.com/in/nelsonreisgomes/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navLink}
            >
              {t.footer.nav.linkedin}
            </a>
            <a
              href="https://github.com/ReisDevv"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navLink}
            >
              {t.footer.nav.github}
            </a>
          </div>
        </nav>
      </div>

      <div className={styles.bottom}>
        <span>© {year} Nelson Reis. Todos os direitos reservados.</span>
      </div>
    </footer>
  )
}
