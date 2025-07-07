'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type MenuItem = {
  _id: string
  name: string
  description: string
  price: string
}

export default function EditMenuItem({ params }: { params: { id: string } }) {
  const [item, setItem] = useState<MenuItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', description: '', price: '' })
  const router = useRouter()

  // Fetch the current item
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/menu/${params.id}`)
        const data = await res.json()
        setItem(data)
        setForm({
          name: data.name,
          description: data.description,
          price: data.price,
        })
      } catch (err) {
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [params.id])

  // Handle form input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch(`/api/menu/${params.id}/edit`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      router.push('/admin') // Go back to admin dashboard
    } else {
      console.error('Update failed')
    }
  }

  if (loading) return <p className='p-4'>Loading...</p>
  if (!item) return <p className='p-4 text-red-600'>Item not found</p>

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
            value={form.price}
            onChange={handleChange}
            className='w-full border px-3 py-2 rounded'
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          Save Changes
        </button>
      </form>
    </main>
  )
}
