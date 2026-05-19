import { Inter } from 'next/font/google'
import { Providers } from './Providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'Nelson Reis — Backend Developer',
  description: 'Backend developer focused on C#, REST APIs and Clean Architecture. Currently at PRODAM building systems for São Paulo City Hall.',
  keywords: ['backend developer', 'C#', 'REST API', 'Clean Architecture', 'PRODAM', 'São Paulo'],
  authors: [{ name: 'Nelson Reis' }],
  openGraph: {
    title: 'Nelson Reis — Backend Developer',
    description: 'Backend developer focused on C#, REST APIs and Clean Architecture.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
        <meta name="google" content="notranslate" />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
