'use client'
import { useEffect, useRef } from 'react'

/**
 * Mouse-driven 3D parallax hook (Apple Vision Pro-style).
 *
 * Attaches a global mousemove listener that lerps the cursor's
 * normalized position (-0.5 → 0.5) and writes it to two CSS custom
 * properties on the target element each animation frame:
 *
 *   --mx: horizontal axis in range [-1, 1]
 *   --my: vertical axis   in range [-1, 1]
 *
 * Children inside the target can then read these via CSS to translate
 * or rotate themselves at different depths, creating a layered effect.
 */
export function useMouseParallax(ref, { strength = 1, ease = 0.08 } = {}) {
  const state = useRef({ tx: 0, ty: 0, cx: 0, cy: 0, raf: null })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const s = state.current

    const onMove = (e) => {
      const w = window.innerWidth
      const h = window.innerHeight
      s.tx = ((e.clientX / w) - 0.5) * 2 * strength
      s.ty = ((e.clientY / h) - 0.5) * 2 * strength
    }

    const tick = () => {
      s.cx += (s.tx - s.cx) * ease
      s.cy += (s.ty - s.cy) * ease
      el.style.setProperty('--mx', s.cx.toFixed(4))
      el.style.setProperty('--my', s.cy.toFixed(4))
      s.raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    s.raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(s.raf)
    }
  }, [ref, strength, ease])
}
