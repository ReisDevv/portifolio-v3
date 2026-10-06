'use client'
import { motion, useReducedMotion } from 'motion/react'

const ease = [0.16, 1, 0.3, 1]

// Fades content up as it enters the viewport, once.
export function Reveal({ children, delay = 0, className, as = 'div' }) {
  const Tag = motion[as]
  const reduce = useReducedMotion()
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={reduce ? { duration: 0 } : { duration: 0.7, delay, ease }}
    >
      {children}
    </Tag>
  )
}
