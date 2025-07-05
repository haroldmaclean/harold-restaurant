export default function HomePage() {
  return (
    <main className='p-8 max-w-5xl mx-auto text-center'>
      <section className='mb-10'>
        <h1 className='text-4xl font-bold mb-4'>
          Welcome to Harold&apos;s Kitchen
        </h1>
        <p className='text-gray-700 text-lg'>
          Serving flavorful dishes made with love. Explore our menu, learn about
          us, or get in touch.
        </p>
      </section>

      <section className='grid md:grid-cols-3 gap-6'>
        <div className='bg-white rounded-lg shadow p-6 hover:shadow-md transition'>
          <h2 className='text-xl font-semibold mb-2'>Our Menu</h2>
          <p className='text-gray-600'>Browse delicious meals we offer.</p>
        </div>
        <div className='bg-white rounded-lg shadow p-6 hover:shadow-md transition'>
          <h2 className='text-xl font-semibold mb-2'>About Us</h2>
          <p className='text-gray-600'>
            Learn who we are and what we stand for.
          </p>
        </div>
        <div className='bg-white rounded-lg shadow p-6 hover:shadow-md transition'>
          <h2 className='text-xl font-semibold mb-2'>Contact</h2>
          <p className='text-gray-600'>Need help? Reach out to us easily.</p>
        </div>
      </section>
    </main>
  )
}
