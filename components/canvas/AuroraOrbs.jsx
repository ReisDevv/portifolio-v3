'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './AuroraOrbs.module.css'

gsap.registerPlugin(ScrollTrigger)

const ORBS = [
  {
    size: 600,
    x: '-10%', y: '5%',
    color: 'radial-gradient(ellipse, rgba(0,255,136,0.18) 0%, transparent 70%)',
    duration: 18, xRange: 60, yRange: 40,
  },
  {
    size: 480,
    x: '55%', y: '-15%',
    color: 'radial-gradient(ellipse, rgba(0,200,100,0.12) 0%, transparent 70%)',
    duration: 22, xRange: -40, yRange: 55,
  },
  {
    size: 520,
    x: '70%', y: '45%',
    color: 'radial-gradient(ellipse, rgba(0,255,160,0.10) 0%, transparent 65%)',
    duration: 26, xRange: -50, yRange: -30,
  },
  {
    size: 340,
    x: '20%', y: '60%',
    color: 'radial-gradient(ellipse, rgba(80,255,180,0.08) 0%, transparent 70%)',
    duration: 20, xRange: 35, yRange: -45,
  },
]

export function AuroraOrbs({ sectionRef }) {
  const orbsRef = useRef([])
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
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

  if (reduced) return null

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
