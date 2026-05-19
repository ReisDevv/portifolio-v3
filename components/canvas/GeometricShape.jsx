'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './GeometricShape.module.css'

export function GeometricShape() {
  const wrapRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !wrapRef.current) return
    const el = wrapRef.current

    // continuous slow rotation
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

    // float up/down
    gsap.to(el.parentElement, {
      y: -24,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [reduced])

  if (reduced) return null

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
