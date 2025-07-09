'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AddMenuItemPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image:
      'https://images.unsplash.com/photo-1604908177522-402950b6f2f5?w=800&h=600&fit=crop',
  })

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/menu/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
        }),
      })

      if (res.ok) {
        router.push('/admin')
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to add item')
      }
    } catch (err) {
      console.error('Add item error:', err)
      setError('Server error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className='max-w-xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Add New Menu Item</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Image URL input */}
        <div>
          <label className='block mb-1 font-medium'>Image URL</label>
          <input
            name='image'
            type='url'
            value={form.image}
            onChange={handleChange}
            className='w-full border px-3 py-2 rounded'
            placeholder='https://example.com/image.jpg'
          />
          {form.image && (
            <div className='mt-4'>
              <p className='mb-1 text-sm text-gray-500'>Preview:</p>
              <div className='w-full h-48 relative'>
                <Image
                  src={form.image}
                  alt='Image preview'
                  fill
                  className='rounded object-cover border'
                />
              </div>
            </div>
          )}
        </div>

        {/* Name */}
        <div>
          <label className='block mb-1 font-medium'>Name</label>
          <input
            name='name'
            value={form.name}
            onChange={handleChange}
            className='w-full border px-3 py-2 rounded'
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className='block mb-1 font-medium'>Description</label>
          <textarea
            name='description'
            value={form.description}
            onChange={handleChange}
            className='w-full border px-3 py-2 rounded'
            rows={3}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className='block mb-1 font-medium'>Price (R)</label>
          <input
            name='price'
            type='number'
            step='0.01'
            value={form.price}
            onChange={handleChange}
            className='w-full border px-3 py-2 rounded'
            required
          />
        </div>

        {/* Submit */}
        <button
          type='submit'
          disabled={submitting}
          className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50'
        >
          {submitting ? 'Adding...' : 'Add Item'}
        </button>

        {/* Error */}
        {error && <p className='text-red-600 mt-2'>{error}</p>}
      </form>
    </main>
  )
}
