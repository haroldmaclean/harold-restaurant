import Link from 'next/link'
import { siteConfig } from '@/config/site'

export default function HomePage() {
  return (
    <main className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <section className='bg-gradient-to-r from-orange-100 to-yellow-50 py-20 px-6 text-center'>
        <h1 className='text-5xl font-extrabold text-orange-600 mb-4'>
          Welcome to {siteConfig.businessName}
        </h1>
        <p className='text-gray-700 text-lg max-w-2xl mx-auto'>
          {siteConfig.description} Explore our menu, learn about us, or get in
          touch!
        </p>
        <div className='mt-8 flex justify-center gap-4'>
          <Link
            href='/menu'
            className='bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition shadow'
          >
            View Menu
          </Link>
          <Link
            href='/contact'
            className='bg-white border border-orange-400 text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-100 transition'
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Info Cards */}
      <section className='max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-8 text-center'>
        <Link href='/menu'>
          <div className='bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition cursor-pointer'>
            <h2 className='text-2xl font-semibold text-orange-600 mb-2'>
              Our Menu
            </h2>
            <p className='text-gray-600'>Browse delicious meals we offer.</p>
          </div>
        </Link>

        <Link href='/about'>
          <div className='bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition cursor-pointer'>
            <h2 className='text-2xl font-semibold text-orange-600 mb-2'>
              About Us
            </h2>
            <p className='text-gray-600'>
              Learn who we are and what we stand for.
            </p>
          </div>
        </Link>

        <Link href='/contact'>
          <div className='bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition cursor-pointer'>
            <h2 className='text-2xl font-semibold text-orange-600 mb-2'>
              Contact
            </h2>
            <p className='text-gray-600'>Find us at {siteConfig.address}</p>
          </div>
        </Link>
      </section>

      {/* Admin Call-to-Action */}
      <section className='bg-white py-16 px-6 text-center'>
        <p className='text-gray-700 text-lg mb-6'>
          Want to manage your restaurant or explore admin features?
        </p>
        <div className='flex justify-center gap-4'>
          <Link
            href='/auth/register'
            className='px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition'
          >
            Register
          </Link>
          <Link
            href='/auth/login'
            className='px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
          >
            Login
          </Link>
        </div>
      </section>
    </main>
  )
}
