// src/app/admin/edit/[id]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface EditForm {
  name: string
  description: string
  price: string
}

export default function EditMenuItem() {
  const params = useParams()
  const id = params?.id as string // cast it explicitly
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<EditForm>({
    name: '',
    description: '',
    price: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/menu/${id}`)
        if (!res.ok) throw new Error('Item not found')
        const data = await res.json()
        setForm({
          name: data.name,
          description: data.description,
          price: data.price.toString(),
        })
      } catch (err) {
        console.error('Fetch error:', err)
        setError('Item not found or server error.')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchItem()
  }, [id])

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
      const payload = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
      }

      const res = await fetch(`/api/menu/${id}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        router.push('/admin')
      } else {
        setError('❌ Failed to update item.')
      }
    } catch (err) {
      console.error('Update failed:', err)
      setError('❌ Server error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p className='p-4'>Loading...</p>
  if (error) return <p className='p-4 text-red-600'>{error}</p>

  return (
    <main className='max-w-xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Edit Menu Item</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
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

        <button
          type='submit'
          disabled={submitting}
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50'
        >
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>

        {error && <p className='text-red-600 mt-2'>{error}</p>}
      </form>
    </main>
  )
}
