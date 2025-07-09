// src/app/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import { CartProvider } from '@/context/CartContext'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-gray-50 text-gray-800 min-h-screen`}
      >
        <CartProvider>
          <Navbar />
          <main className='pt-4 pb-16 px-4 md:px-8'>{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}
