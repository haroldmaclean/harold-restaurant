'use client'

import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const { cartItems, incrementQty, decrementQty, removeFromCart } = useCart()

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  if (cartItems.length === 0) {
    return (
      <main className='p-8 max-w-4xl mx-auto text-center'>
        <h1 className='text-3xl font-bold mb-6'>Your Cart</h1>
        <p className='text-gray-600'>Your cart is currently empty.</p>
        <Link
          href='/menu'
          className='inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
        >
          Back to Menu
        </Link>
      </main>
    )
  }

  return (
    <main className='p-8 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Your Cart</h1>

      <div className='space-y-6'>
        {cartItems.map((item) => (
          <div
            key={item._id}
            className='flex flex-col sm:flex-row gap-4 items-center bg-white shadow rounded p-4'
          >
            {item.image ? (
              <div className='relative w-20 h-20'>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className='rounded object-cover border'
                  sizes='80px'
                />
              </div>
            ) : (
              <div className='w-20 h-20 bg-gray-100 rounded border flex items-center justify-center text-gray-400 text-xs'>
                No Image
              </div>
            )}

            <div className='flex-1 text-center sm:text-left'>
              <h2 className='font-semibold text-lg'>{item.name}</h2>
              <p className='text-sm text-gray-500'>
                Price: R{item.price.toFixed(2)}
              </p>
              <div className='mt-2 flex justify-center sm:justify-start items-center gap-2'>
                <button
                  onClick={() => decrementQty(item._id)}
                  className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300'
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => incrementQty(item._id)}
                  className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300'
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item._id)}
              className='text-red-600 text-sm hover:underline'
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className='mt-8 text-right'>
        <p className='text-xl font-semibold'>
          Total: <span className='text-green-700'>R{total.toFixed(2)}</span>
        </p>
        <Link
          href='/checkout'
          className='inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition'
        >
          Proceed to Checkout
        </Link>
      </div>
    </main>
  )
}
