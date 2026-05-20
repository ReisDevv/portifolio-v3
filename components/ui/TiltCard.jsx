'use client'
import { useRef, useCallback } from 'react'
import styles from './TiltCard.module.css'

const MAX_TILT = 10
const GLARE_OPACITY = 0.14

export function TiltCard({ children, className = '' }) {
  const cardRef = useRef(null)

  const onMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top)  / rect.height
    const rotX = (y - 0.5) * -MAX_TILT * 2
    const rotY = (x - 0.5) *  MAX_TILT * 2

    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(12px)`

    const glare = card.querySelector('[data-glare]')
    if (glare) {
      glare.style.background = `radial-gradient(
        circle at ${x * 100}% ${y * 100}%,
        rgba(94, 158, 255, ${GLARE_OPACITY}) 0%,
        rgba(177, 140, 255, ${GLARE_OPACITY * 0.75}) 25%,
        rgba(255, 126, 185, ${GLARE_OPACITY * 0.45}) 45%,
        transparent 65%
      )`
    }
  }, [])

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    card.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
    setTimeout(() => {
      if (card) card.style.transition = ''
    }, 600)
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
