import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Providers } from './Providers'
import './globals.css'

export const metadata = {
  metadataBase: new URL('https://portfolio-reisdevvs-projects.vercel.app'),
  title: 'Nelson Reis | Backend Developer',
  description:
    'Desenvolvedor backend na PRODAM. C#, .NET, SQL Server e APIs REST para serviços da Prefeitura de São Paulo.',
  keywords: ['backend developer', 'C#', '.NET', 'SQL Server', 'NestJS', 'PRODAM', 'São Paulo'],
  authors: [{ name: 'Nelson Reis', url: 'https://github.com/ReisDevv' }],
  icons: { icon: '/icons/favicon.svg' },
  openGraph: {
    title: 'Nelson Reis | Backend Developer',
    description: 'Desenvolvedor backend na PRODAM. C#, .NET, SQL Server e APIs REST.',
    type: 'website',
  },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf9' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0f10' },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
