'use client'
import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const PARTICLE_COUNT_TARGET = 450
const SAMPLE_STEP = 5
const SPRING_STIFFNESS = 0.055
const FRICTION = 0.84
const CONVERGENCE_DURATION = 2200
const ACCENT_COLOR = '#00ff88'
const TEXT_COLOR = '#f0f0f5'

class Particle {
  constructor(tx, ty, canvasW, canvasH) {
    this.targetX = tx
    this.targetY = ty
    this.x = Math.random() * canvasW
    this.y = Math.random() * canvasH
    this.vx = 0
    this.vy = 0
    this.radius = Math.random() * 1.5 + 0.8
    this.isAccent = Math.random() < 0.4
    this.alpha = Math.random() * 0.4 + 0.6
    this.scatterX = tx
    this.scatterY = ty
  }

  updateTarget(tx, ty) {
    this.targetX = tx
    this.targetY = ty
  }

  tick(progress) {
    const tx = this.targetX + (this.scatterX - this.targetX) * progress
    const ty = this.targetY + (this.scatterY - this.targetY) * progress

    this.vx += (tx - this.x) * SPRING_STIFFNESS
    this.vy += (ty - this.y) * SPRING_STIFFNESS
    this.vx *= FRICTION
    this.vy *= FRICTION
    this.x += this.vx
    this.y += this.vy
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.isAccent
      ? `rgba(0, 255, 136, ${this.alpha})`
      : `rgba(232, 240, 234, ${this.alpha * 0.6})`
    ctx.fill()

    if (this.isAccent) {
      ctx.shadowBlur = 6
      ctx.shadowColor = ACCENT_COLOR
      ctx.fill()
      ctx.shadowBlur = 0
    }
  }
}

function sampleLetterform(text, canvasW, canvasH) {
  const off = document.createElement('canvas')
  const fontSize = Math.min(canvasW * 0.55, 260)
  off.width = canvasW
  off.height = canvasH
  const ctx = off.getContext('2d')
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, off.width, off.height)
  ctx.fillStyle = '#fff'
  ctx.font = `900 ${fontSize}px Inter, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, canvasW / 2, canvasH / 2)

  const data = ctx.getImageData(0, 0, canvasW, canvasH).data
  const points = []
  for (let y = 0; y < canvasH; y += SAMPLE_STEP) {
    for (let x = 0; x < canvasW; x += SAMPLE_STEP) {
      if (data[(y * canvasW + x) * 4] > 128) {
        points.push({ x, y })
      }
    }
  }

  // sub-sample to PARTICLE_COUNT_TARGET
  if (points.length > PARTICLE_COUNT_TARGET) {
    const step = Math.ceil(points.length / PARTICLE_COUNT_TARGET)
    return points.filter((_, i) => i % step === 0)
  }
  return points
}

export function HeroCanvas({ sectionRef }) {
  const canvasRef = useRef(null)
  const stateRef = useRef({
    particles: [],
    rafId: null,
    scrollProgress: 0,
    converged: false,
    startTime: null,
  })
  const reduced = useReducedMotion()

  const buildParticles = useCallback((canvas) => {
    const dpr = window.devicePixelRatio || 1
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)

    const points = sampleLetterform('NR', w, h)
    const particles = points.map(p => {
      const part = new Particle(p.x, p.y, w, h)
      // random scatter destination
      part.scatterX = p.x + (Math.random() - 0.5) * w * 2.5
      part.scatterY = p.y + (Math.random() - 0.5) * h * 2.5
      return part
    })
    stateRef.current.particles = particles
    return { ctx, w, h }
  }, [])

  const drawStatic = useCallback((canvas) => {
    const { ctx, w, h } = buildParticles(canvas)
    stateRef.current.particles.forEach(p => {
      p.x = p.targetX
      p.y = p.targetY
      p.draw(ctx)
    })
  }, [buildParticles])

  const startAnimation = useCallback((canvas) => {
    const { ctx, w, h } = buildParticles(canvas)
    const state = stateRef.current
    state.startTime = performance.now()
    state.converged = false

    function loop(now) {
      if (!state.startTime) state.startTime = now
      const elapsed = now - state.startTime
      const convergenceProgress = Math.min(elapsed / CONVERGENCE_DURATION, 1)

      ctx.clearRect(0, 0, w, h)

      // eased convergence: particles move to target, then scatter via scroll
      const sp = state.scrollProgress
      state.particles.forEach(p => {
        const tx = p.targetX * (1 - sp) + p.scatterX * sp
        const ty = p.targetY * (1 - sp) + p.scatterY * sp

        // during convergence, override target to lerp from random → letterform
        if (convergenceProgress < 1) {
          p.x = p.x + (tx - p.x) * (SPRING_STIFFNESS * 1.2)
          p.y = p.y + (ty - p.y) * (SPRING_STIFFNESS * 1.2)
        } else {
          p.vx += (tx - p.x) * SPRING_STIFFNESS
          p.vy += (ty - p.y) * SPRING_STIFFNESS
          p.vx *= FRICTION
          p.vy *= FRICTION
          p.x += p.vx
          p.y += p.vy
        }
        p.draw(ctx)
      })

      if (convergenceProgress < 1 || sp > 0) {
        state.rafId = requestAnimationFrame(loop)
      } else {
        state.converged = true
        // stop RAF — ScrollTrigger drives updates now
      }
    }

    state.rafId = requestAnimationFrame(loop)
  }, [buildParticles])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (reduced) {
      drawStatic(canvas)
      return
    }

    startAnimation(canvas)

    // ScrollTrigger for scatter on scroll
    const trigger = ScrollTrigger.create({
      trigger: sectionRef?.current || canvas.parentElement,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate(self) {
        stateRef.current.scrollProgress = self.progress

        // if RAF stopped (converged), restart for scroll-driven update
        if (stateRef.current.converged) {
          const canvas = canvasRef.current
          if (!canvas) return
          const dpr = window.devicePixelRatio || 1
          const w = canvas.offsetWidth
          const h = canvas.offsetHeight
          const ctx = canvas.getContext('2d')
          ctx.clearRect(0, 0, w * dpr, h * dpr)
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
          const sp = stateRef.current.scrollProgress
          stateRef.current.particles.forEach(p => {
            p.x = p.targetX * (1 - sp) + p.scatterX * sp
            p.y = p.targetY * (1 - sp) + p.scatterY * sp
            p.draw(ctx)
          })
        }
      },
    })

    // resize
    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        cancelAnimationFrame(stateRef.current.rafId)
        stateRef.current.startTime = null
        stateRef.current.converged = false
        startAnimation(canvas)
      }, 250)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(stateRef.current.rafId)
      trigger.kill()
      window.removeEventListener('resize', onResize)
      clearTimeout(resizeTimer)
    }
  }, [reduced, startAnimation, drawStatic, sectionRef])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  )
}
