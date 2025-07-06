'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import jwt from 'jsonwebtoken'

type DecodedToken = {
  email: string
  id: string
  isAdmin?: boolean
  iat?: number
  exp?: number
}

type MenuItemType = {
  _id: string
  name: string
  description: string
  price: string
}

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<DecodedToken | null>(null)
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/')
      return
    }

    try {
      const decoded = jwt.decode(token) as DecodedToken
      if (decoded?.email) {
        setUser(decoded)
      } else {
        router.push('/')
      }
    } catch (err) {
      console.error('JWT decode error:', err)
      router.push('/')
    }
  }, [router])

  useEffect(() => {
    // Fetch menu items
    const fetchMenu = async () => {
      try {
        const res = await fetch('/api/menu')
        const data = await res.json()
        setMenuItems(data)
      } catch (err) {
        console.error('Failed to fetch menu items:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [])

  if (loading) return <p className='text-center p-8'>Loading...</p>

  return (
    <main className='p-8 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>

      {user && (
        <div className='bg-white shadow p-4 rounded-lg mb-6'>
          <p className='text-gray-700'>
            ✅ Welcome, <strong>{user.email}</strong>
          </p>
          <button
            onClick={() => {
              localStorage.removeItem('token')
              window.location.href = '/'
            }}
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 float-right'
          >
            Sign Out
          </button>
        </div>
      )}

      <section>
        <h2 className='text-xl font-semibold mb-4'>📋 Menu Items</h2>
        {menuItems.length === 0 ? (
          <p className='text-gray-500'>No items found.</p>
        ) : (
          <ul className='space-y-4'>
            {menuItems.map((item) => (
              <li key={item._id} className='border p-4 rounded-md shadow-sm'>
                <h3 className='font-semibold text-lg'>{item.name}</h3>
                <p className='text-gray-600'>{item.description}</p>
                <p className='text-green-700 font-bold'>R {item.price}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className='mt-10'>
        <h2 className='text-xl font-semibold mb-4'>➕ Add New Menu Item</h2>
        <form
          className='space-y-4'
          onSubmit={async (e) => {
            e.preventDefault()
            const form = e.target as HTMLFormElement
            const name = (form.elements.namedItem('name') as HTMLInputElement)
              .value
            const description = (
              form.elements.namedItem('description') as HTMLInputElement
            ).value
            const price = (form.elements.namedItem('price') as HTMLInputElement)
              .value

            const res = await fetch('/api/menu/add', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, description, price }),
            })

            const data = await res.json()
            if (res.ok) {
              alert('Menu item added!')
              form.reset()
              window.location.reload()
            } else {
              alert(data.error || 'Failed to add')
            }
          }}
        >
          <input
            type='text'
            name='name'
            placeholder='Item Name'
            className='w-full p-2 border rounded'
            required
          />
          <input
            type='text'
            name='description'
            placeholder='Description'
            className='w-full p-2 border rounded'
            required
          />
          <input
            type='text'
            name='price'
            placeholder='Price'
            className='w-full p-2 border rounded'
            required
          />
          <button
            type='submit'
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          >
            Add Item
          </button>
        </form>
      </section>
    </main>
  )
}
