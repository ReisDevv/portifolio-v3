'use client'
import { useState, useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>{}[]|/\\'

export function useScrambleText(text, { delay = 0, duration = 1200, reduced = false } = {}) {
  // When reduced motion is on, never animate — return the final text as-is.
  // No state or effect is involved on that path, so there is no cascading
  // render and no setState-in-effect.
  const [display, setDisplay] = useState('')
  const frameRef = useRef(null)

  useEffect(() => {
    if (reduced) return

    let startTime = null

    const delayTimer = setTimeout(() => {
      const animate = (now) => {
        if (!startTime) startTime = now
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)

        const resolved = Math.floor(progress * text.length)
        const scrambled = text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < resolved) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')

        setDisplay(scrambled)

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate)
        } else {
          setDisplay(text)
        }
      }
      frameRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(delayTimer)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [text, delay, duration, reduced])

  return reduced ? text : display
}
