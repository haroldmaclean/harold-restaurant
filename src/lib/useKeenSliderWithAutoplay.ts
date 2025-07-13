'use client'

import { useKeenSlider } from 'keen-slider/react'
import { useRef, useEffect, useState } from 'react'
import type { KeenSliderInstance } from 'keen-slider'

export function useKeenSliderWithAutoplay(interval = 3000) {
  const instanceRef = useRef<KeenSliderInstance | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(Date.now())

  const [currentSlide, setCurrentSlide] = useState(0)
  const [progress, setProgress] = useState(0)

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    created(slider) {
      instanceRef.current = slider
      setCurrentSlide(slider.track.details.rel)

      const updateSlide = () => {
        slider.next()
        startTimeRef.current = Date.now()
      }

      timerRef.current = setInterval(updateSlide, interval)

      slider.on('slideChanged', () => {
        setCurrentSlide(slider.track.details.rel)
        startTimeRef.current = Date.now()
        setProgress(0)
      })

      const animate = () => {
        const elapsed = Date.now() - startTimeRef.current
        setProgress(Math.min((elapsed / interval) * 100, 100))
        animationRef.current = requestAnimationFrame(animate)
      }

      animationRef.current = requestAnimationFrame(animate)
    },
    destroyed() {
      clearInterval(timerRef.current!)
      cancelAnimationFrame(animationRef.current!)
    },
  })

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current!)
      cancelAnimationFrame(animationRef.current!)
    }
  }, [])

  const startAutoplay = () => {
    clearInterval(timerRef.current!)
    startTimeRef.current = Date.now()
    timerRef.current = setInterval(() => {
      instanceRef.current?.next()
      startTimeRef.current = Date.now()
    }, interval)
  }

  return [
    sliderRef,
    instanceRef,
    currentSlide,
    progress,
    startAutoplay,
  ] as const
}
