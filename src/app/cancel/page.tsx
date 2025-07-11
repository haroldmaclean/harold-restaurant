// src/app/cancel/page.tsx
'use client'

import Link from 'next/link'

export default function CancelPage() {
  return (
    <main className='p-8 max-w-2xl mx-auto text-center'>
      <h1 className='text-3xl font-bold text-red-600 mb-4'>
        Transaction Cancelled
      </h1>
      <p className='text-gray-700 mb-6'>
        Your payment was not completed. You can return to the menu to try again
        or contact us if you need help.
      </p>

      <div className='flex justify-center gap-4'>
        <Link
          href='/menu'
          className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
        >
          Back to Menu
        </Link>
        <Link
          href='/'
          className='px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition'
        >
          Home
        </Link>
      </div>
    </main>
  )
}
