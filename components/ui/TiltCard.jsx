'use client'
import { useRef, useCallback } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './TiltCard.module.css'

const MAX_TILT = 12
const GLARE_OPACITY = 0.08

export function TiltCard({ children, className = '' }) {
  const cardRef = useRef(null)
  const reduced = useReducedMotion()

  const onMouseMove = useCallback((e) => {
    if (reduced) return
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width   // 0→1
    const y = (e.clientY - rect.top)  / rect.height  // 0→1
    const rotX = (y - 0.5) * -MAX_TILT * 2
    const rotY = (x - 0.5) *  MAX_TILT * 2

    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`

    // glare follows cursor
    const glare = card.querySelector('[data-glare]')
    if (glare) {
      glare.style.background = `radial-gradient(
        circle at ${x * 100}% ${y * 100}%,
        rgba(0, 255, 136, ${GLARE_OPACITY}),
        transparent 60%
      )`
    }
  }, [reduced])

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    setTimeout(() => {
      if (card) card.style.transition = ''
    }, 500)
    const glare = card.querySelector('[data-glare]')
    if (glare) glare.style.background = 'transparent'
  }, [])

  return (
    <div
      ref={cardRef}
      className={`${styles.tilt} ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ willChange: 'transform' }}
    >
      <div data-glare className={styles.glare} aria-hidden="true" />
      {children}
    </div>
  )
}
