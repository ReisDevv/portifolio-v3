'use client'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDownRight } from '@phosphor-icons/react'
import { useLanguage } from '@/context/LanguageContext'

const ease = [0.16, 1, 0.3, 1]
const enter = (i, reduce) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: reduce ? { duration: 0 } : { duration: 0.8, delay: 0.08 * i, ease },
})

export function Hero() {
  const { t } = useLanguage()
  const { hero } = t
  const reduce = useReducedMotion()

  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pt-16 pb-20 md:px-8 md:pt-24 md:pb-28">
      <motion.p {...enter(0, reduce)} className="flex items-center gap-2 text-sm text-muted">
        {/* Real availability flag, not decoration */}
        <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
        {hero.eyebrow}
      </motion.p>

      <motion.h1
        {...enter(1, reduce)}
        className="mt-6 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tighter text-balance md:text-6xl lg:text-7xl"
      >
        {hero.headline}
      </motion.h1>

      <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-12 md:items-end">
        <motion.p
          {...enter(2, reduce)}
          className="max-w-[52ch] text-lg leading-relaxed text-muted md:col-span-7"
        >
          {hero.sub}
        </motion.p>

        <motion.div {...enter(3, reduce)} className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          >
            {hero.primary}
            <ArrowDownRight size={16} weight="bold" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-fg/40 active:scale-[0.98]"
          >
            {hero.secondary}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
