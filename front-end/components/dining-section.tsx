"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { Carousel } from "@/components/ui/carousel"

const dinings = [
  {
    id: 1,
    name: "Chill Bites",
    description: "신선한 유기농 재료로 만든 건강한 요리를 즐길 수 있는 올데이 다이닝",
    image: "/placeholder.svg?height=600&width=800",
    hours: "06:30 - 22:30",
  },
  {
    id: 2,
    name: "Chill Garden",
    description: "자연 속에서 즐기는 힐링 다이닝, 정원 전망과 함께하는 건강식",
    image: "/placeholder.svg?height=600&width=800",
    hours: "11:30 - 22:00",
  },
  {
    id: 3,
    name: "Chill Moments",
    description: "여유로운 분위기에서 즐기는 유기농 차와 웰빙 디저트",
    image: "/placeholder.svg?height=600&width=800",
    hours: "10:00 - 24:00",
  },
  {
    id: 4,
    name: "Chill Elegance",
    description: "고급 모던 한식 및 퓨전 요리",
    image: "/placeholder.svg?height=600&width=800",
    hours: "18:00 - 22:00",
  },
]

export default function DiningSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useIntersectionObserver({ ref: sectionRef, threshold: 0.1 })
  const [hasAnimated, setHasAnimated] = useState(false)

  // Animation effect
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isVisible, hasAnimated])

  // Render dining items as React nodes for the carousel
  const diningItems = dinings.map((dining) => (
    <div key={dining.id} className="group relative overflow-hidden rounded-lg h-96 w-full">
      <div className="relative h-full w-full">
        <Image
          src={dining.image || "/placeholder.svg"}
          alt={dining.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-2xl font-bold mb-2">{dining.name}</h3>
            <p className="mb-4 max-w-md">{dining.description}</p>
            <p className="text-sm opacity-80">운영시간: {dining.hours}</p>
          </div>
          <Link
            href={`/dining#restaurant-${dining.id}`}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  ))

  return (
    <section
      ref={sectionRef}
      className={cn(
        "py-20 transition-opacity duration-1000 ease-in-out",
        isVisible || hasAnimated ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">다이닝</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            건강과 맛을 모두 생각한 Chill Haven의 다이닝 경험을 통해 몸과 마음의 균형을 찾아보세요.
          </p>
        </div>

        <Carousel autoSlideInterval={5000} slidesToShow={1} className="md:max-w-4xl mx-auto">
          {diningItems}
        </Carousel>

        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            <Link href="/dining">
              모든 다이닝 보기
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

