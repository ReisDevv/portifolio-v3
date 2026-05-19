'use client'
import { useEffect, useRef } from 'react'
import styles from './CustomCursor.module.css'

export function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const state   = useRef({ mx: 0, my: 0, rx: 0, ry: 0, raf: null })

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const s = state.current

    const onMove = (e) => {
      s.mx = e.clientX
      s.my = e.clientY
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const tick = () => {
      s.rx = lerp(s.rx, s.mx, 0.12)
      s.ry = lerp(s.ry, s.my, 0.12)
      ring.style.transform = `translate(${s.rx - 20}px, ${s.ry - 20}px)`
      s.raf = requestAnimationFrame(tick)
    }

    const addHover = () => {
      dot.classList.add(styles.hover)
      ring.classList.add(styles.hover)
    }
    const rmHover = () => {
      dot.classList.remove(styles.hover)
      ring.classList.remove(styles.hover)
    }

    const attachHover = (root = document) => {
      root.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', rmHover)
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    attachHover()
    s.raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(s.raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className={styles.dot}  aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  )
}
