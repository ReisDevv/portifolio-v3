'use client'
import { useEffect } from 'react'

/**
 * Module-level scroll store. The page scroll position (0→1) is written here
 * on every scroll event and read by the 3D scene inside its render loop, so
 * the heavy per-frame work never touches React's commit path. A singleton
 * (rather than a passed ref) lets the fixed Canvas and the scrolling page
 * communicate without prop drilling through Providers.
 */
export const scrollStore = { progress: 0 }

export function useScrollProgressTracker() {
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollStore.progress = max > 0 ? window.scrollY / max : 0
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
}
