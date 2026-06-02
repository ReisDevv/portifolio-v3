'use client'
import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { Laptop } from './Laptop'
import { scrollStore } from '@/hooks/useScrollProgress'

/* Per-section poses for the laptop. Index = section (0 hero … 4 contact).
   The rig damps toward the pose matching the current scroll position, so
   scrolling "flies" the laptop around the screen and reorients it. */
const POSES = [
  { pos: [1.7, -0.1, 0],   rot: [0.2, -0.7, 0.05], scale: 1.0 },  // hero — right side
  { pos: [-1.9, -0.2, 0.5], rot: [0.15, 0.7, -0.05], scale: 0.85 }, // about — left
  { pos: [1.9, 0.1, 0.3],  rot: [0.25, -0.5, 0.04], scale: 0.8 },  // projects — right
  { pos: [0, -0.3, 1.0],   rot: [0.1, Math.PI * 1.05, 0], scale: 0.95 }, // skills — center, back of lid
  { pos: [-1.6, 0, 0.4],   rot: [0.2, 0.6, -0.04], scale: 0.9 },   // contact — left
]

const N = POSES.length

function lerp(a, b, t) { return a + (b - a) * t }

function damp(current, target, lambda, dt) {
  return THREE.MathUtils.damp(current, target, lambda, dt)
}

function LaptopRig() {
  const rig = useRef(null)
  // mouse parallax target
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((state, dt) => {
    if (!rig.current) return
    const p = THREE.MathUtils.clamp(scrollStore.progress, 0, 1)

    // Map global progress onto segment between two poses
    const seg = p * (N - 1)
    const i = Math.min(Math.floor(seg), N - 2)
    const f = seg - i
    const a = POSES[i]
    const b = POSES[i + 1]

    const tx = lerp(a.pos[0], b.pos[0], f) + mouse.current.x * 0.18
    const ty = lerp(a.pos[1], b.pos[1], f) - mouse.current.y * 0.12
    const tz = lerp(a.pos[2], b.pos[2], f)
    const rx = lerp(a.rot[0], b.rot[0], f) + mouse.current.y * 0.05
    const ry = lerp(a.rot[1], b.rot[1], f) + mouse.current.x * 0.12
    const rz = lerp(a.rot[2], b.rot[2], f)
    const sc = lerp(a.scale, b.scale, f)

    const lam = 3.5
    rig.current.position.x = damp(rig.current.position.x, tx, lam, dt)
    rig.current.position.y = damp(rig.current.position.y, ty, lam, dt)
    rig.current.position.z = damp(rig.current.position.z, tz, lam, dt)
    rig.current.rotation.x = damp(rig.current.rotation.x, rx, lam, dt)
    rig.current.rotation.y = damp(rig.current.rotation.y, ry, lam, dt)
    rig.current.rotation.z = damp(rig.current.rotation.z, rz, lam, dt)
    const s = damp(rig.current.scale.x, sc, lam, dt)
    rig.current.scale.set(s, s, s)
  })

  return (
    <group ref={rig}>
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.4}>
        <Laptop />
      </Float>
    </group>
  )
}

export function Scene3D({ quality = 'high' }) {
  const dpr = quality === 'low' ? [1, 1.2] : [1, 1.8]

  return (
    <Canvas
      className="scene3d"
      dpr={dpr}
      gl={{ antialias: quality !== 'low', alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6], fov: 38 }}
    >
      {/* Manual three-point lighting — no external HDR, so it works offline
          and adds zero network cost. */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-5, 2, -3]} intensity={0.7} color="#ccff00" />
      <pointLight position={[0, 2, 3]} intensity={0.5} color="#ffffff" />

      <LaptopRig />

      {quality !== 'low' && (
        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.35}
          scale={10}
          blur={2.6}
          far={4}
          color="#000000"
        />
      )}
    </Canvas>
  )
}
