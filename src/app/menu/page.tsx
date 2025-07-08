'use client'

import { useEffect, useState } from 'react'
import { MenuItemType } from '@/types'

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/api/menu')
        const data = await res.json()
        setMenuItems(data)
      } catch (err) {
        console.error('Failed to load menu:', err)
      }
    }

    fetchMenu()
  }, [])

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className='p-8 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Our Menu</h1>

      <div className='mb-6'>
        <input
          type='text'
          placeholder='Search menu...'
          className='w-full border rounded px-4 py-2'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredItems.length === 0 ? (
        <p className='text-center text-gray-500'>No items found.</p>
      ) : (
        <div className='grid gap-6 md:grid-cols-2'>
          {filteredItems.map((item) => (
            <div key={item._id} className='bg-white rounded-lg shadow p-6'>
              <h2 className='text-xl font-semibold mb-2'>{item.name}</h2>
              <p className='text-gray-600 mb-2'>{item.description}</p>
              <span className='font-bold text-green-700'>
                R{item.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
