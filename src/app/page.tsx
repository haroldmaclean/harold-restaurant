import Link from 'next/link'
import { siteConfig } from '@/config/site'

export default function HomePage() {
  return (
    <main className='p-8 max-w-5xl mx-auto text-center'>
      <section className='mb-10'>
        <h1 className='text-4xl font-bold mb-4'>
          Welcome to {siteConfig.businessName}
        </h1>
        <p className='text-gray-700 text-lg'>
          {siteConfig.description} Explore our menu, learn about us, or get in
          touch.
        </p>
      </section>

      <section className='grid md:grid-cols-3 gap-6'>
        <Link href='/menu'>
          <div className='bg-white rounded-lg shadow p-6 hover:shadow-md transition cursor-pointer'>
            <h2 className='text-xl font-semibold mb-2'>Our Menu</h2>
            <p className='text-gray-600'>Browse delicious meals we offer.</p>
          </div>
        </Link>

        <Link href='/about'>
          <div className='bg-white rounded-lg shadow p-6 hover:shadow-md transition cursor-pointer'>
            <h2 className='text-xl font-semibold mb-2'>About Us</h2>
            <p className='text-gray-600'>
              Learn who we are and what we stand for.
            </p>
          </div>
        </Link>

        <Link href='/contact'>
          <div className='bg-white rounded-lg shadow p-6 hover:shadow-md transition cursor-pointer'>
            <h2 className='text-xl font-semibold mb-2'>Contact</h2>
            <p className='text-gray-600'>Find us at {siteConfig.address}</p>
          </div>
        </Link>
      </section>
      <section className='mt-12 text-center'>
        <p className='text-gray-700 mb-4'>
          Want to manage your restaurant or explore admin features?
        </p>
        <div className='flex justify-center gap-4'>
          <Link
            href='/auth/register'
            className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition'
          >
            Register
          </Link>
          <Link
            href='/auth/login'
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
          >
            Login
          </Link>
        </div>
      </section>
    </main>
  )
}
