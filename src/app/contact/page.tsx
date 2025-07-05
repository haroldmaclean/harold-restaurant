import { siteConfig } from '@/config/site'

export default function ContactPage() {
  return (
    <main className='p-8 max-w-3xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Contact Us</h1>
      <p className='text-gray-700 mb-4'>
        We&apos;d love to hear from you! Reach us via WhatsApp, phone, or visit
        us at our location.
      </p>
      <ul className='space-y-2'>
        <li>
          <strong>Phone:</strong> {siteConfig.contactNumber}
        </li>
        <li>
          <strong>WhatsApp:</strong> {siteConfig.whatsappNumber}
        </li>
        <li>
          <strong>Address:</strong> {siteConfig.address}
        </li>
      </ul>
    </main>
  )
}
