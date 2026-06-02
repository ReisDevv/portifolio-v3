'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './Marquee.module.css'

const SKILLS = [
  'C#', '.NET Core', 'ASP.NET', 'Legacy ASP', 'Entity Framework',
  'SQL Server', 'MySQL', 'PostgreSQL', 'T-SQL', 'Stored Procedures',
  'Java', 'OOP', 'Algoritmos', 'Estrutura de Dados',
  'Azure', 'Docker', 'REST APIs', 'Clean Architecture', 'SOLID', 'LINQ',
  'WinForms', 'MVC', 'JavaScript', 'TypeScript', 'React', 'Next.js',
  'Node.js', 'HTML', 'CSS', 'Git', 'CI/CD', 'Linux',
  'Inglês B2', 'Weekly Meetings', 'Maratona SBC',
]

export function Marquee() {
  const trackRef = useRef(null)
  const tweenRef = useRef(null)
  const reduced  = useReducedMotion()
  const repeated = [...SKILLS, ...SKILLS]

  useEffect(() => {
    // A continuously scrolling strip is vestibular motion — skip the loop
    // entirely when the user prefers reduced motion.
    if (reduced) return
    const track = trackRef.current
    if (!track) return

    tweenRef.current = gsap.to(track, {
      xPercent: -50,
      duration: 38,
      repeat: -1,
      ease: 'none',
    })

    return () => tweenRef.current?.kill()
  }, [reduced])

  return (
    <div className={styles.outer} aria-hidden="true">
      <div
        ref={trackRef}
        className={styles.track}
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.play()}
      >
        {repeated.map((skill, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.gem}>◆</span>
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
