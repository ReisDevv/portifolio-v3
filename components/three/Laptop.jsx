'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'

const ACCENT = '#ccff00'
const BODY = '#1a1a1a'
const BODY_DARK = '#0f0f0f'

/* Lines of "code" painted on the screen — purely decorative. */
const CODE_LINES = [
  { x: -0.62, w: 0.30, c: '#ff7ab2' },
  { x: -0.40, w: 0.55, c: '#9ad', },
  { x: -0.30, w: 0.40, c: ACCENT },
  { x: -0.50, w: 0.22, c: '#888' },
  { x: -0.40, w: 0.62, c: '#9ad' },
  { x: -0.30, w: 0.34, c: ACCENT },
  { x: -0.50, w: 0.48, c: '#ff7ab2' },
  { x: -0.40, w: 0.28, c: '#888' },
]

function ScreenCode() {
  // Build small bars as code lines on the screen plane.
  return (
    <group position={[0, 0, 0.001]}>
      {CODE_LINES.map((l, i) => (
        <mesh key={i} position={[l.x + l.w / 2, 0.34 - i * 0.085, 0]}>
          <planeGeometry args={[l.w, 0.028]} />
          <meshBasicMaterial color={l.c} toneMapped={false} transparent opacity={0.92} />
        </mesh>
      ))}
      {/* blinking-ish cursor block */}
      <mesh position={[-0.30 + 0.34 + 0.02, 0.34 - 5 * 0.085, 0]}>
        <planeGeometry args={[0.02, 0.03]} />
        <meshBasicMaterial color={ACCENT} toneMapped={false} />
      </mesh>
    </group>
  )
}

/**
 * Stylised laptop modelled from primitives:
 *  - base (keyboard deck) tilted slightly
 *  - screen hinged up, emitting a soft lime glow
 *  - "NR" monogram + code lines on the display
 * The whole rig gently bobs/rotates; parent drives the scroll transform.
 */
export function Laptop(props) {
  const group = useRef(null)
  const screenMat = useRef(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (group.current) {
      group.current.rotation.z = Math.sin(t * 0.5) * 0.02
    }
    if (screenMat.current) {
      // subtle screen-glow pulsing
      screenMat.current.emissiveIntensity = 0.5 + Math.sin(t * 2) * 0.08
    }
  })

  const screenTilt = useMemo(() => -0.32, [])

  return (
    <group ref={group} {...props}>
      {/* Base / keyboard deck */}
      <group rotation={[-0.04, 0, 0]}>
        <RoundedBox args={[2.2, 0.09, 1.5]} radius={0.04} smoothness={4} position={[0, 0, 0]}>
          <meshStandardMaterial color={BODY} metalness={0.7} roughness={0.35} />
        </RoundedBox>
        {/* trackpad */}
        <mesh position={[0, 0.05, 0.42]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.7, 0.5]} />
          <meshStandardMaterial color={BODY_DARK} metalness={0.5} roughness={0.5} />
        </mesh>
        {/* keyboard hint grid */}
        <mesh position={[0, 0.051, -0.18]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.8, 0.7]} />
          <meshStandardMaterial color={'#161616'} metalness={0.4} roughness={0.6} />
        </mesh>
      </group>

      {/* Screen — hinged at the back edge of the base */}
      <group position={[0, 0, -0.74]} rotation={[screenTilt, 0, 0]}>
        <group position={[0, 0.66, 0]}>
          {/* screen shell */}
          <RoundedBox args={[2.2, 1.4, 0.06]} radius={0.04} smoothness={4}>
            <meshStandardMaterial color={BODY} metalness={0.7} roughness={0.35} />
          </RoundedBox>
          {/* glowing display */}
          <mesh position={[0, 0, 0.035]}>
            <planeGeometry args={[2.0, 1.22]} />
            <meshStandardMaterial
              ref={screenMat}
              color={'#0a0e08'}
              emissive={ACCENT}
              emissiveIntensity={0.5}
              toneMapped={false}
            />
          </mesh>
          {/* code + monogram live just in front of the display */}
          <group position={[0, 0, 0.04]}>
            <ScreenCode />
            <Text
              position={[0.55, -0.34, 0]}
              fontSize={0.24}
              color={ACCENT}
              anchorX="center"
              anchorY="middle"
            >
              {'</>'}
            </Text>
          </group>
        </group>
      </group>
    </group>
  )
}
