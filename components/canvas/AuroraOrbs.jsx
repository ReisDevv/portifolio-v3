'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './AuroraOrbs.module.css'

gsap.registerPlugin(ScrollTrigger)

/* Apple Vision Pro-style iridescent aurora — sky blue, lavender,
   pink and peach orbs drifting in parallax. */
const ORBS = [
  {
    size: 720,
    x: '-12%', y: '0%',
    color: 'radial-gradient(ellipse, rgba(94,158,255,0.32) 0%, transparent 65%)',
    duration: 20, xRange: 70, yRange: 40,
  },
  {
    size: 560,
    x: '58%', y: '-18%',
    color: 'radial-gradient(ellipse, rgba(177,140,255,0.26) 0%, transparent 68%)',
    duration: 24, xRange: -50, yRange: 60,
  },
  {
    size: 600,
    x: '72%', y: '48%',
    color: 'radial-gradient(ellipse, rgba(255,126,185,0.20) 0%, transparent 65%)',
    duration: 28, xRange: -60, yRange: -30,
  },
  {
    size: 420,
    x: '18%', y: '62%',
    color: 'radial-gradient(ellipse, rgba(250,178,138,0.18) 0%, transparent 70%)',
    duration: 22, xRange: 45, yRange: -50,
  },
]

export function AuroraOrbs({ sectionRef }) {
  const orbsRef = useRef([])
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return  // skip GSAP loops, but the orbs are still rendered below
    const els = orbsRef.current.filter(Boolean)

    els.forEach((el, i) => {
      const orb = ORBS[i]
      gsap.to(el, {
        x: orb.xRange,
        y: orb.yRange,
        duration: orb.duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })

    // fade out on scroll
    const trigger = ScrollTrigger.create({
      trigger: sectionRef?.current,
      start: 'top top',
      end: '80% top',
      scrub: true,
      onUpdate(self) {
        els.forEach(el => {
          gsap.set(el, { opacity: 1 - self.progress })
        })
      },
    })

    return () => trigger.kill()
  }, [reduced, sectionRef])

  return (
    <div className={styles.container} aria-hidden="true">
      {ORBS.map((orb, i) => (
        <div
          key={i}
          ref={el => (orbsRef.current[i] = el)}
          className={styles.orb}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
          }}
        />
      ))}
    </div>
  )
}
