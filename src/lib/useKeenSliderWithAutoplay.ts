'use client'

import { useKeenSlider } from 'keen-slider/react'
import { useRef } from 'react'
import { KeenSliderPlugin } from 'keen-slider'

const autoplay =
  (delay = 2000): KeenSliderPlugin =>
  (slider) => {
    let timeout: ReturnType<typeof setTimeout>
    let mouseOver = false

    function clearNextTimeout() {
      clearTimeout(timeout)
    }

    function nextTimeout() {
      clearTimeout(timeout)
      if (mouseOver) return
      timeout = setTimeout(() => {
        slider.next()
      }, delay)
    }

    slider.on('created', () => {
      slider.container.addEventListener('mouseover', () => {
        mouseOver = true
        clearNextTimeout()
      })
      slider.container.addEventListener('mouseout', () => {
        mouseOver = false
        nextTimeout()
      })
      nextTimeout()
    })

    slider.on('dragStarted', clearNextTimeout)
    slider.on('animationEnded', nextTimeout)
    slider.on('updated', nextTimeout)
  }

export function useKeenSliderWithAutoplay(delay = 2000) {
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: {
        perView: 3,
        spacing: 16,
      },
      renderMode: 'performance',
      drag: true,
    },
    [autoplay(delay)]
  )

  return [sliderRef, sliderRef] as const
}
