'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/context/LanguageContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './SpotlightText.module.css'

gsap.registerPlugin(ScrollTrigger)

export function SpotlightText({ textPt, textEn }) {
  const { lang } = useLanguage()
  const reduced   = useReducedMotion()
  const sectionRef = useRef(null)
  const text = lang === 'pt' ? textPt : textEn

  useEffect(() => {
    if (reduced || !sectionRef.current) return

    const wordEls = sectionRef.current.querySelectorAll('[data-word]')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordEls,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.07,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            end: 'bottom 35%',
            scrub: 1.5,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, text])

  const words = text.split(' ')

  return (
    <section ref={sectionRef} className={styles.section} aria-label={text}>
      <p className={styles.text}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`} data-word className={styles.word}>
            {word}{' '}
          </span>
        ))}
      </p>
    </section>
  )
}
