import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'OpsBoard | Sua operação, organizada',
  description: 'A plataforma de gestão operacional que centraliza rotinas, responsáveis e indicadores para equipes que precisam fazer a operação acontecer.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans bg-bg text-ink`}>
        {children}
      </body>
    </html>
  )
}
