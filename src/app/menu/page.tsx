'use client'

import { useEffect, useState } from 'react'
import { Search, XCircle } from 'lucide-react'
import { MenuItemType } from '@/types'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

// ✅ Dynamic import with SSR disabled for carousel autoplay to work on Vercel
const FoodCarousel = dynamic(() => import('@/components/FoodCarousel'), {
  ssr: false,
})

export default function MenuPage() {
  const [items, setItems] = useState<MenuItemType[]>([])
  const [filtered, setFiltered] = useState<MenuItemType[]>([])
  const [query, setQuery] = useState('')
  const { addToCart } = useCart()
  const router = useRouter()

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
    const results = items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    )
    setFiltered(results)
  }, [query, items])

  const handleClear = () => setQuery('')

  return (
    <main className='p-8 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Our Menu</h1>

      {/* ✅ Carousel now client-only to avoid SSR bugs */}
      <section className='mb-10'>
        <FoodCarousel />
      </section>

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
            <XCircle
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-red-500'
              size={18}
              onClick={handleClear}
              aria-label='Clear search'
            />
          )}
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {filtered.length === 0 ? (
          <p className='text-center text-gray-500 col-span-2'>
            No items found.
          </p>
        ) : (
          filtered.map((item) => (
            <div key={item._id} className='bg-white rounded-lg shadow p-6'>
              {item.image && (
                <div className='relative w-full h-48 mb-4'>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className='object-cover rounded border'
                    sizes='(max-width: 768px) 100vw, 50vw'
                  />
                </div>
              )}
              <h2 className='text-xl font-semibold mb-2'>{item.name}</h2>
              <p className='text-gray-600 mb-2'>{item.description}</p>
              <span className='font-bold text-green-700 block mb-3'>
                Price: R{item.price.toFixed(2)}
              </span>
              <button
                onClick={() => {
                  addToCart(item)
                  router.push('/checkout')
                }}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm transition'
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
