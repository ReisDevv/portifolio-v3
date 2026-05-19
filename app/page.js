import { Hero }          from '@/components/sections/Hero'
import { About }         from '@/components/sections/About'
import { Projects }      from '@/components/sections/Projects'
import { Skills }        from '@/components/sections/Skills'
import { Contact }       from '@/components/sections/Contact'
import { Marquee }       from '@/components/ui/Marquee'
import { SpotlightText } from '@/components/ui/SpotlightText'

export default function Home() {
  return (
    <>
      <Hero />
      <About />

      <SpotlightText
        textPt="Backend sólido é a base de qualquer produto digital que funciona de verdade."
        textEn="Solid backend is the foundation of any digital product that truly works."
      />

      <Projects />
      <Marquee />

      <SpotlightText
        textPt="Código que resolve. Sistemas que escalam. Impacto que fica."
        textEn="Code that solves. Systems that scale. Impact that stays."
      />

      <Skills />
      <Contact />
    </>
  )
}
