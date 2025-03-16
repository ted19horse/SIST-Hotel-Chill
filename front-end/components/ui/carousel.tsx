"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CarouselProps {
  children: ReactNode[]
  autoSlideInterval?: number
  className?: string
  slideClassName?: string
  navigationClassName?: string
  showNavigation?: boolean
  slidesToShow?: number
}

export function Carousel({
  children,
  autoSlideInterval = 5000,
  className,
  slideClassName,
  navigationClassName,
  showNavigation = true,
  slidesToShow = 1,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const totalSlides = children.length
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Clean up function to clear interval
  const clearAutoSlideInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Set up auto-sliding with proper cleanup
  useEffect(() => {
    // Clear any existing interval first
    clearAutoSlideInterval()

    // Only set up a new interval if not paused and interval is specified
    if (!isPaused && autoSlideInterval > 0) {
      intervalRef.current = setInterval(() => {
        nextSlide()
      }, autoSlideInterval)
    }

    // Clean up on component unmount or when dependencies change
    return clearAutoSlideInterval
  }, [currentIndex, isPaused, autoSlideInterval, totalSlides])

  // Memoize the visible slides calculation to avoid recalculating on every render
  const getVisibleSlides = () => {
    if (typeof window === "undefined") return slidesToShow

    if (window.innerWidth < 640) return 1
    if (window.innerWidth < 768) return Math.min(2, slidesToShow)
    return slidesToShow
  }

  const visibleSlides = getVisibleSlides()
  const slideWidth = visibleSlides > 0 ? 100 / visibleSlides : 100

  // Only render the current slide and adjacent slides to reduce memory usage
  const visibleChildren = children.slice(
    Math.max(0, currentIndex - 1),
    Math.min(totalSlides, currentIndex + visibleSlides + 1),
  )

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * slideWidth}%)`,
          width: `${(totalSlides / visibleSlides) * 100}%`,
        }}
      >
        {children.map((child, index) => (
          <div key={index} className={cn("flex-shrink-0", slideClassName)} style={{ width: `${slideWidth}%` }}>
            {/* Only render the child if it's visible or adjacent to reduce memory usage */}
            {Math.abs(index - currentIndex) <= 1 ? child : <div style={{ height: "100%" }} />}
          </div>
        ))}
      </div>

      {showNavigation && totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-neutral-800 rounded-full p-2 shadow-md z-10 transition-all",
              navigationClassName,
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-neutral-800 rounded-full p-2 shadow-md z-10 transition-all",
              navigationClassName,
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {totalSlides > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                currentIndex === index ? "bg-primary w-4" : "bg-neutral-300",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Export additional carousel components for compatibility
export function CarouselContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("carousel-content", className)}>{children}</div>
}

export function CarouselItem({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("carousel-item", className)}>{children}</div>
}

export function CarouselPrevious({ className }: { className?: string }) {
  return <button className={cn("carousel-previous", className)}>Previous</button>
}

export function CarouselNext({ className }: { className?: string }) {
  return <button className={cn("carousel-next", className)}>Next</button>
}

