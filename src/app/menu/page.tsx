export default function MenuPage() {
  return (
    <main className='p-8 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Our Menu</h1>
      <div className='grid md:grid-cols-2 gap-6'>
        <div className='border p-4 rounded-lg shadow'>
          <h2 className='text-xl font-semibold'>Grilled Chicken</h2>
          <p className='text-gray-600'>
            Juicy grilled chicken served with chips and salad.
          </p>
          <span className='block mt-2 font-bold'>R85.00</span>
        </div>
        <div className='border p-4 rounded-lg shadow'>
          <h2 className='text-xl font-semibold'>Beef Burger</h2>
          <p className='text-gray-600'>
            Classic beef burger with lettuce, tomato, and cheese.
          </p>
          <span className='block mt-2 font-bold'>R70.00</span>
        </div>
        {/* Add more items later */}
      </div>
    </main>
  )
}
