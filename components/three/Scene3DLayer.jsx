'use client'
import { useEffect, useRef, useSyncExternalStore, lazy, Suspense } from 'react'
import { scrollStore } from '@/hooks/useScrollProgress'
import * as THREE from 'three'
import { SceneErrorBoundary } from './SceneErrorBoundary'
import styles from './Scene3DLayer.module.css'

const Scene3D = lazy(() =>
  import('./Scene3D').then(m => ({ default: m.Scene3D }))
)

/* Background tones per section — the page "bleeds" between these as you
   scroll, the way the Fizzi site shifts colour per scene. Kept dark and
   subtle so text stays readable; lime stays the constant accent. */
const BG_COLORS = ['#0a0a0a', '#0b0e07', '#0a0a0a', '#0d0a10', '#0a0a0a']

function bgColorAt(p) {
  const n = BG_COLORS.length
  const seg = THREE.MathUtils.clamp(p, 0, 1) * (n - 1)
  const i = Math.min(Math.floor(seg), n - 2)
  const f = seg - i
  const a = new THREE.Color(BG_COLORS[i])
  const b = new THREE.Color(BG_COLORS[i + 1])
  return a.lerp(b, f)
}

/* Decide render quality from device capability. Memoised after first call so
   useSyncExternalStore gets a stable snapshot (it must not change unless we
   notify). */
let cachedMode
function detectMode() {
  if (cachedMode) return cachedMode
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) { cachedMode = 'off'; return cachedMode }
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const narrow = window.innerWidth < 768
  const cores = navigator.hardwareConcurrency || 4
  cachedMode = (coarse || narrow || cores <= 4) ? 'low' : 'high'
  return cachedMode
}

// Subscribe is a no-op: capability is detected once and never changes
// mid-session. getServerSnapshot returns 'off' so SSR and the first client
// paint agree (no hydration mismatch); the client then reads the real mode.
const noopSubscribe = () => () => {}

export function Scene3DLayer() {
  const mode = useSyncExternalStore(noopSubscribe, detectMode, () => 'off')
  const rafRef = useRef(null)

  // Drive the body background colour from scroll on a rAF loop.
  useEffect(() => {
    if (mode === 'off') return
    const tick = () => {
      const c = bgColorAt(scrollStore.progress)
      document.body.style.backgroundColor = `#${c.getHexString()}`
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      document.body.style.backgroundColor = ''
    }
  }, [mode])

  if (mode === 'off') return null

  return (
    <div className={styles.layer} aria-hidden="true">
      <SceneErrorBoundary>
        <Suspense fallback={null}>
          <Scene3D quality={mode} />
        </Suspense>
      </SceneErrorBoundary>
    </div>
  )
}
