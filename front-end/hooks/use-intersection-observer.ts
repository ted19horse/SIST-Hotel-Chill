"use client"

import { useState, useEffect, type RefObject } from "react"

interface UseIntersectionObserverProps {
  ref: RefObject<Element>
  options?: IntersectionObserverInit
  threshold?: number
  rootMargin?: string
}

export function useIntersectionObserver({
  ref,
  options,
  threshold = 0.1,
  rootMargin = "0px",
}: UseIntersectionObserverProps): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Use provided options or create default options
    const observerOptions = options || {
      threshold,
      rootMargin,
    }

    const observer = new IntersectionObserver(([entry]) => {
      // Update state when intersection changes
      setIsIntersecting(entry.isIntersecting)
    }, observerOptions)

    observer.observe(element)

    // Clean up the observer when component unmounts
    return () => {
      observer.disconnect()
    }
  }, [ref, options, threshold, rootMargin])

  return isIntersecting
}

