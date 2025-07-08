'use client'

import { useEffect, useState } from 'react'
import { Search, XCircle } from 'lucide-react'
import { MenuItemType } from '@/types'

export default function MenuPage() {
  const [items, setItems] = useState<MenuItemType[]>([])
  const [filtered, setFiltered] = useState<MenuItemType[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/menu')
        const data = await res.json()
        setItems(data)
        setFiltered(data)
      } catch (err) {
        console.error('Error fetching menu:', err)
      }
    }

    fetchItems()
  }, [])

  useEffect(() => {
    const filteredResults = items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    )
    setFiltered(filteredResults)
  }, [query, items])

  const handleClear = () => {
    setQuery('')
  }

  return (
    <main className='p-8 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Our Menu</h1>

      <div className='flex items-center gap-2 max-w-md mx-auto mb-6'>
        <div className='relative w-full'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search menu...'
            className='w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300'
          />
          {query && (
            <span title='Clear search'>
              <XCircle
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-red-500'
                size={18}
                onClick={handleClear}
              />
            </span>
          )}
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {filtered.map((item) => (
          <div key={item._id} className='bg-white rounded-lg shadow p-6'>
            <h2 className='text-xl font-semibold mb-2'>{item.name}</h2>
            <p className='text-gray-600 mb-2'>{item.description}</p>
            <span className='font-bold text-green-700'>R{item.price}</span>
          </div>
        ))}
      </div>
    </main>
  )
}
