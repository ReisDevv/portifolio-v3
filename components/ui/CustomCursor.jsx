'use client'
import { useEffect, useRef, useSyncExternalStore } from 'react'
import styles from './CustomCursor.module.css'

// Read "does this device have a fine pointer?" from the platform via
// useSyncExternalStore — no setState-in-effect, and SSR renders nothing.
const POINTER_QUERY = '(pointer: fine)'
const subscribePointer = (cb) => {
  const mq = window.matchMedia(POINTER_QUERY)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const getPointerSnapshot = () => window.matchMedia(POINTER_QUERY).matches

export function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const state   = useRef({ mx: 0, my: 0, rx: 0, ry: 0, raf: null })

  // Only render a custom cursor on devices with a fine pointer (mouse/trackpad).
  // Touch devices have no cursor to replace and would just see a stuck dot.
  const enabled = useSyncExternalStore(subscribePointer, getPointerSnapshot, () => false)

  useEffect(() => {
    if (!enabled) return
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
      s.rx = lerp(s.rx, s.mx, 0.16)
      s.ry = lerp(s.ry, s.my, 0.16)
      ring.style.transform = `translate(${s.rx - 20}px, ${s.ry - 20}px)`
      s.raf = requestAnimationFrame(tick)
    }

    // Event delegation: a single pair of listeners on the document handles
    // every interactive element, including ones added after mount (chatbot
    // chips, mobile menu, etc.) — and there are no per-element listeners to
    // leak on cleanup.
    const isInteractive = (target) =>
      target?.closest?.('a, button, [role="button"], input, textarea, select')

    const onOver = (e) => {
      if (isInteractive(e.target)) {
        dot.classList.add(styles.hover)
        ring.classList.add(styles.hover)
      }
    }
    const onOut = (e) => {
      if (isInteractive(e.target) && !isInteractive(e.relatedTarget)) {
        dot.classList.remove(styles.hover)
        ring.classList.remove(styles.hover)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    s.raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(s.raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef}  className={styles.dot}  aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  )
}
