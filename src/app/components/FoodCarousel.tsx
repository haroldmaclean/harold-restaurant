'use client'

import { useKeenSliderWithAutoplay } from '@/lib/useKeenSliderWithAutoplay'
import { useEffect, useState } from 'react'
import { MenuItemType } from '@/types'
import Image from 'next/image'
import 'keen-slider/keen-slider.min.css'

export default function FoodCarousel() {
  // 👇 Autoplay set to 2000ms (2 seconds)
  const [sliderRef, containerRef] = useKeenSliderWithAutoplay(2000)
  const [items, setItems] = useState<MenuItemType[]>([])

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch('/api/menu')
      const data = await res.json()
      setItems(data.slice(0, 5)) // Limit to 5 items for carousel
    }

    fetchItems()
  }, [])

  return (
    <div ref={containerRef} className='keen-slider rounded-lg overflow-hidden'>
      {items.map((item) => (
        <div
          key={item._id}
          className='keen-slider__slide flex flex-col items-center justify-center px-4'
        >
          <Image
            src={item.image!} // 👈 Non-null assertion
            alt={item.name}
            width={600}
            height={400}
            className='rounded-lg object-cover max-h-[300px] w-full'
          />

          <h2 className='mt-2 text-lg font-semibold text-center'>
            {item.name}
          </h2>
        </div>
      ))}
    </div>
  )
}
