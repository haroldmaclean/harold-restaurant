// src/app/checkout/page.tsx
'use client'

import { useCart } from '@/context/CartContext'
import { useState } from 'react'

export default function CheckoutPage() {
  const { cartItems /*, clearCart */ } = useCart() // <-- comment if unused
  const [loading, setLoading] = useState(false)

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const handlePay = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/payfast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total.toFixed(2),
          item_name: 'Harold’s Kitchen Order',
        }),
      })

      const html = await response.text()

      const formContainer = document.createElement('div')
      formContainer.innerHTML = html
      document.body.appendChild(formContainer)
      formContainer.querySelector('form')?.submit()
    } catch (error) {
      console.error('Payment error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='p-8 max-w-3xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Checkout</h1>

      {cartItems.length === 0 ? (
        <p className='text-gray-600 text-center'>Your cart is empty.</p>
      ) : (
        <div className='space-y-4'>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className='flex justify-between items-center border-b pb-2'
            >
              <div>
                <h2 className='font-semibold'>{item.name}</h2>
                <p className='text-sm text-gray-500'>Qty: {item.quantity}</p>
              </div>
              <p className='font-semibold'>
                R{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <div className='text-right mt-6'>
            <p className='text-xl font-bold'>Total: R{total.toFixed(2)}</p>
            <button
              onClick={handlePay}
              disabled={loading}
              className='mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50'
            >
              {loading ? 'Redirecting to PayFast...' : 'Pay with PayFast'}
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
