import { siteConfig } from '@/config/site'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <main className='p-8 max-w-3xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>About Us</h1>

      <Image
        src={siteConfig.aboutImage}
        alt={`${siteConfig.businessName} interior`}
        width={800}
        height={450}
        className='rounded-lg mb-6 w-full object-cover'
      />

      <p className='text-gray-700 leading-relaxed mb-6'>{siteConfig.about}</p>

      <blockquote className='italic text-lg text-gray-600 border-l-4 border-yellow-500 pl-4'>
        {siteConfig.quote}
      </blockquote>
    </main>
  )
}
