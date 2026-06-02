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
        textPt="Por trás de cada interface fluida existe um backend que não pode falhar."
        textEn="Behind every seamless interface is a backend that simply cannot fail."
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
