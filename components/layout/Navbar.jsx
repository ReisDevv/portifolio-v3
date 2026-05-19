'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import styles from './Navbar.module.css'

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export function Navbar() {
  const { t, toggleLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNav = useCallback((id) => {
    setMenuOpen(false)
    setTimeout(() => scrollToSection(id), 100)
  }, [])

  const navLinks = [
    { key: 'about',    id: 'about',    label: t.nav.about },
    { key: 'projects', id: 'projects', label: t.nav.projects },
    { key: 'skills',   id: 'skills',   label: t.nav.skills },
    { key: 'contact',  id: 'contact',  label: t.nav.contact },
  ]

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <button
          className={styles.logo}
          onClick={() => scrollToSection('hero')}
          aria-label="Início"
        >
          NR
        </button>

        <ul className={styles.links}>
          {navLinks.map(({ key, id, label }) => (
            <li key={key}>
              <button onClick={() => handleNav(id)} className={styles.link}>
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button onClick={toggleLang} className={styles.langBtn} aria-label="Trocar idioma">
            {t.nav.langLabel}
          </button>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className={styles.mobileLinks}>
              {navLinks.map(({ key, id, label }, i) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <button onClick={() => handleNav(id)} className={styles.mobileLink}>
                    {label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.3 }}
              >
                <button onClick={toggleLang} className={styles.mobileLang}>
                  {t.nav.langLabel}
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
