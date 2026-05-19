'use client'
import { useState, useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>{}[]|/\\'

export function useScrambleText(text, { delay = 0, duration = 1200, reduced = false } = {}) {
  const [display, setDisplay] = useState(reduced ? text : '')
  const frameRef = useRef(null)

  useEffect(() => {
    if (reduced) { setDisplay(text); return }

    let startTime = null
    let started = false

    const delayTimer = setTimeout(() => {
      started = true
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

  return display
}
