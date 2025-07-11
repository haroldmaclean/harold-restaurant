// src/app/success/page.tsx
import Link from 'next/link'
export default function SuccessPage() {
  return (
    <main className='p-8 max-w-2xl mx-auto text-center'>
      <h1 className='text-3xl font-bold mb-4'>🎉 Payment Successful!</h1>
      <p className='text-gray-600 mb-6'>
        Thank you for your order. We&apos;ll start preparing your delicious food
        right away!
      </p>

      <Link href='/' className='inline-block'>
        Back to Home
      </Link>
    </main>
  )
}
