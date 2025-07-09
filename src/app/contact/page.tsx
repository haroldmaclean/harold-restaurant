import { siteConfig } from '@/config/site'
import {
  Facebook,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  MessageSquareText,
} from 'lucide-react'

export default function ContactPage() {
  return (
    <main className='min-h-screen bg-gray-50 py-16 px-6'>
      <div className='max-w-3xl mx-auto bg-white rounded-xl shadow p-8'>
        <h1 className='text-4xl font-bold mb-4 text-orange-600 text-center'>
          Contact Us
        </h1>
        <p className='text-gray-700 mb-8 text-center'>
          We’d love to hear from you! Reach us via phone, WhatsApp, or visit us
          in person.
        </p>

        {/* Contact Info */}
        <ul className='space-y-4 text-gray-700 text-lg'>
          <li className='flex items-center gap-3'>
            <Phone className='text-orange-500' />
            <span>
              <strong>Phone:</strong> {siteConfig.contactNumber}
            </span>
          </li>
          <li className='flex items-center gap-3'>
            <MessageCircle className='text-green-500' />
            <span>
              <strong>WhatsApp:</strong>{' '}
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target='_blank'
                rel='noopener noreferrer'
                className='text-green-600 underline hover:text-green-700'
              >
                Message Us
              </a>
            </span>
          </li>
          <li className='flex items-center gap-3'>
            <MapPin className='text-blue-500' />
            <span>
              <strong>Address:</strong> {siteConfig.address}
            </span>
          </li>
        </ul>

        {/* Social Media */}
        <div className='mt-10 text-center'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>
            Follow Us
          </h2>
          <div className='flex justify-center gap-6'>
            <a
              href='https://wa.me/your-number-here'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition'
            >
              <Send size={18} />
              WhatsApp
            </a>

            <a
              href='https://facebook.com/your-page-here'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition'
            >
              <Facebook size={18} />
              Facebook
            </a>

            <a
              href='https://www.tiktok.com/@your-username'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition'
            >
              <MessageSquareText size={18} />
              TikTok
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
