'use client'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Apple-style reveal — blur-out into focus with a subtle Z-depth push.
 * Mimics the way Vision Pro page content "settles" into view.
 */
export function RevealText({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 48, filter: 'blur(14px)', scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'transform, filter, opacity' }}
    >
      {children}
    </motion.div>
  )
}
