// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import { CartProvider } from '@/context/CartContext'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Harold's Kitchen – Restaurant SaaS Template",
  description:
    'A beautiful restaurant site with admin dashboard, built using Next.js and MongoDB.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body
        className={`${inter.variable} ${robotoMono.variable} font-sans antialiased bg-gray-50 text-gray-800 min-h-screen`}
      >
        <CartProvider>
          <Navbar />
          <main className='pt-4 pb-16 px-4 md:px-8'>{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}
