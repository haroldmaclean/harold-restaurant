'use client'

import { useEffect, useState } from 'react'
import { Search, XCircle } from 'lucide-react'
import { MenuItemType } from '@/types'
import Image from 'next/image'

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

  const handleClear = () => setQuery('')

  return (
    <main className='bg-gray-50 min-h-screen py-12 px-6'>
      <h1 className='text-4xl font-bold mb-8 text-center text-orange-600'>
        Our Menu
      </h1>

      <div className='flex items-center gap-2 max-w-md mx-auto mb-10'>
        <div className='relative w-full'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search menu...'
            className='w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white'
          />
          {query && (
            <XCircle
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-red-500'
              size={18}
              onClick={handleClear}
              aria-label='Clear search'
            />
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className='text-center text-gray-500'>No items found.</p>
      ) : (
        <div className='grid gap-8 md:grid-cols-2'>
          {filtered.map((item) => (
            <div
              key={item._id}
              className='bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden'
            >
              {item.image && (
                <div className='relative w-full h-48'>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, 50vw'
                  />
                </div>
              )}
              <div className='p-5'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
                  {item.name}
                </h2>
                <p className='text-gray-600 mb-3'>{item.description}</p>
                <span className='text-green-700 font-bold'>
                  Price: R{item.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
