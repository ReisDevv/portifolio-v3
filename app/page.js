import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Experience } from '@/components/Experience'
import { Projects } from '@/components/Projects'
import { Stack } from '@/components/Stack'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
