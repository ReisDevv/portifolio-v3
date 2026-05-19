import { Hero }     from '@/components/sections/Hero'
import { About }    from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Skills }   from '@/components/sections/Skills'
import { Contact }  from '@/components/sections/Contact'
import { Marquee }  from '@/components/ui/Marquee'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Marquee />
      <Skills />
      <Contact />
    </>
  )
}
