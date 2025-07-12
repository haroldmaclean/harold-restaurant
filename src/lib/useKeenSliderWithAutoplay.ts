'use client'

import { useKeenSlider } from 'keen-slider/react'
import { useRef, useEffect, useState } from 'react'

export function useKeenSliderWithAutoplay(interval = 2000) {
  const timer = useRef<NodeJS.Timeout | null>(null)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
  })

  useEffect(() => {
    if (!instanceRef.current) return

    timer.current = setInterval(() => {
      instanceRef.current?.next()
    }, interval)

    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [instanceRef, interval])

  return [sliderRef, sliderRef] as const
}
