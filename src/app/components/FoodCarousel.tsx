'use client'

import { useKeenSliderWithAutoplay } from '@/lib/useKeenSliderWithAutoplay'
import { useEffect, useState } from 'react'
import { MenuItemType } from '@/types'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'keen-slider/keen-slider.min.css'

export default function FoodCarousel() {
  const [sliderRef, instanceRef, currentSlide, progress, startAutoplay] =
    useKeenSliderWithAutoplay(3000)

  const [items, setItems] = useState<MenuItemType[]>([])

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch('/api/menu')
      const data = await res.json()
      setItems(data.slice(0, 5))
    }

    fetchItems()
  }, [])

  return (
    <div className='relative'>
      <div ref={sliderRef} className='keen-slider rounded-lg overflow-hidden'>
        {items.map((item, index) => (
          <div
            key={item._id}
            className='keen-slider__slide flex flex-col items-center justify-center px-4 pb-4'
          >
            <Image
              src={item.image ?? '/placeholder.jpg'}
              alt={item.name}
              width={600}
              height={400}
              priority={index === 0}
              className='rounded-lg object-cover max-h-[300px] w-full'
            />
            <h2 className='mt-2 text-lg font-semibold text-center'>
              {item.name}
            </h2>
            <p className='text-green-600 text-sm font-medium'>Special Offer!</p>
            <p className='text-blue-800 font-bold'>R{item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          instanceRef.current?.prev()
          startAutoplay()
        }}
        className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md'
        aria-label='Previous Slide'
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() => {
          instanceRef.current?.next()
          startAutoplay()
        }}
        className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md'
        aria-label='Next Slide'
      >
        <ChevronRight />
      </button>

      {/* Progress Bar */}
      <div className='h-1 w-full bg-gray-300 mt-4 rounded overflow-hidden'>
        <div
          className='h-full bg-blue-600 transition-all duration-75'
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}
