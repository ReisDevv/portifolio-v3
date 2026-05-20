'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './GeometricShape.module.css'

export function GeometricShape() {
  const wrapRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!wrapRef.current) return
    const el = wrapRef.current

    if (reduced) {
      // Honor reduced-motion but keep the cube on screen at a static
      // 3-quarter angle so the page still has visual depth.
      gsap.set(el, { rotateY: 28, rotateX: 14 })
      return
    }

    gsap.to(el, {
      rotateY: 360,
      duration: 28,
      repeat: -1,
      ease: 'none',
    })

    gsap.to(el, {
      rotateX: 15,
      duration: 14,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to(el.parentElement, {
      y: -24,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [reduced])

  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.floatWrapper}>
        <div ref={wrapRef} className={styles.cube}>
          {/* 6 faces of a subtle wireframe cube */}
          <div className={`${styles.face} ${styles.front}`}  />
          <div className={`${styles.face} ${styles.back}`}   />
          <div className={`${styles.face} ${styles.right}`}  />
          <div className={`${styles.face} ${styles.left}`}   />
          <div className={`${styles.face} ${styles.top}`}    />
          <div className={`${styles.face} ${styles.bottom}`} />
        </div>
      </div>
    </div>
  )
}
