'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './CodeTerminal.module.css'

const LINES = [
  { type: 'comment', text: '// UserService — PRODAM API' },
  { type: 'keyword', text: 'public async Task<IActionResult>' },
  { type: 'method',  text: '  GetProfile(int userId)' },
  { type: 'brace',   text: '{' },
  { type: 'normal',  text: '  var user = await _repo' },
  { type: 'method',  text: '    .FindAsync(userId);' },
  { type: 'brace',   text: '' },
  { type: 'keyword', text: '  if (user is null)' },
  { type: 'string',  text: '    return NotFound();' },
  { type: 'brace',   text: '' },
  { type: 'keyword', text: '  return Ok(user);' },
  { type: 'brace',   text: '}' },
]

export function CodeTerminal() {
  const wrapRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !wrapRef.current) return
    const el = wrapRef.current

    gsap.fromTo(
      el,
      { opacity: 0, x: -28 },
      { opacity: 1, x: 0, duration: 1.2, delay: 1.8, ease: 'expo.out' }
    )

    gsap.to(el, {
      y: -18,
      duration: 5.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.8,
    })
  }, [reduced])

  if (reduced) return null

  return (
    <div ref={wrapRef} className={styles.terminal} aria-hidden="true" style={{ opacity: 0 }}>
      <div className={styles.titleBar}>
        <span className={styles.dot} style={{ background: '#ff5f57' }} />
        <span className={styles.dot} style={{ background: '#febc2e' }} />
        <span className={styles.dot} style={{ background: '#28c840' }} />
        <span className={styles.filename}>UserService.cs</span>
      </div>

      <div className={styles.body}>
        {LINES.map((line, i) => (
          <div key={i} className={`${styles.line} ${styles[line.type]}`}>
            <span className={styles.lineNum}>{i + 1}</span>
            <span>{line.text}</span>
          </div>
        ))}

        <div className={styles.cursorLine}>
          <span className={styles.lineNum}>{LINES.length + 1}</span>
          <span className={styles.termCursor} />
        </div>
      </div>
    </div>
  )
}
