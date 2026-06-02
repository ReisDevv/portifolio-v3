'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './AuroraOrbs.module.css'

gsap.registerPlugin(ScrollTrigger)

/* Apple Vision Pro-style iridescent aurora — sky blue, lavender,
   pink and peach orbs drifting in parallax. */
/* Soft, low-saturation Liquid-Glass aurora. Two cool tones (blue + lavender)
   kept faint so the background reads as elegant ambient light rather than
   loud coloured blobs. */
const ORBS = [
  {
    size: 820,
    x: '-8%', y: '-6%',
    color: 'radial-gradient(ellipse, rgba(94,158,255,0.16) 0%, transparent 70%)',
    duration: 26, xRange: 50, yRange: 30,
  },
  {
    size: 700,
    x: '70%', y: '0%',
    color: 'radial-gradient(ellipse, rgba(177,140,255,0.13) 0%, transparent 72%)',
    duration: 32, xRange: -40, yRange: 45,
  },
  {
    size: 620,
    x: '50%', y: '70%',
    color: 'radial-gradient(ellipse, rgba(94,158,255,0.10) 0%, transparent 72%)',
    duration: 30, xRange: 35, yRange: -35,
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
