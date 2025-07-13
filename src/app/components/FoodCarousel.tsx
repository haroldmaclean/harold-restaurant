'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useKeenSliderWithAutoplay } from '@/lib/useKeenSliderWithAutoplay'
import { MenuItemType } from '@/types'
import 'keen-slider/keen-slider.min.css'

export default function FoodCarousel() {
  const [items, setItems] = useState<MenuItemType[]>([])

  const [sliderRef, instanceRef, currentSlide, progress, startAutoplay] =
    useKeenSliderWithAutoplay(3000)

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch('/api/menu')
      const data = await res.json()
      setItems(data.slice(0, 5)) // Limit to 5
    }

    fetchItems()
  }, [])

  return (
    <div className='relative'>
      <div ref={sliderRef} className='keen-slider rounded-lg overflow-hidden'>
        {items.map((item, index) => (
          <div
            key={item._id}
            className='keen-slider__slide flex flex-col items-center justify-center px-4'
          >
            <Image
              src={item.image!}
              alt={item.name}
              width={600}
              height={400}
              priority={index === 0}
              className='rounded-lg object-cover max-h-[300px] w-full'
            />
            <h2 className='mt-2 text-lg font-semibold text-center'>
              {item.name}
            </h2>
          </div>
        ))}
      </div>

      {/* Arrows */}
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
      <div className='w-full h-1 bg-gray-200 mt-4 rounded overflow-hidden'>
        <div
          className='h-full bg-blue-600 transition-all duration-100 ease-linear'
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
