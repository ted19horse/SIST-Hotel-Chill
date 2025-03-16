"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { Carousel } from "@/components/ui/carousel"

const categories = [
  {
    id: 1,
    name: "Chill Haven 시그니처 컬렉션",
    description: "호텔 로고와 시그니처 향이 담긴 제품들",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 2,
    name: "힐링 & 웰니스 컬렉션",
    description: "마음의 평화와 힐링을 위한 제품들",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 3,
    name: "에코 & 지속가능한 라이프스타일 제품",
    description: "환경을 생각하는 지속가능한 제품들",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 4,
    name: "휴식을 위한 식음료 제품",
    description: "차와 음식으로 즐기는 휴식",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 5,
    name: "객실 등급별 맞춤 컬렉션",
    description: "객실 타입에 맞는 특별 제품들",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 6,
    name: "메모리 & 컬렉터블 아이템",
    description: "특별한 기념품과 컬렉션 아이템",
    image: "/placeholder.svg?height=600&width=800",
  },
]

export default function GiftShopSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useIntersectionObserver({ ref: sectionRef, threshold: 0.1 })
  const [hasAnimated, setHasAnimated] = useState(false)

  // Animation effect
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isVisible, hasAnimated])

  // Render category items as React nodes for the carousel
  const categoryItems = categories.map((category) => (
    <div key={category.id} className="group relative overflow-hidden rounded-lg h-96 w-full">
      <div className="relative h-full w-full">
        <Image
          src={category.image || "/placeholder.svg"}
          alt={category.name}
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
            <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
            <p className="mb-4 max-w-md">{category.description}</p>
          </div>
          <Link
            href={`/gift-shop/products?category=${category.id}`}
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
        "py-20 bg-neutral-50 transition-opacity duration-1000 ease-in-out",
        isVisible || hasAnimated ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">기프트샵</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Chill Haven의 힐링 경험을 집에서도 이어갈 수 있는 특별한 제품들을 만나보세요.
          </p>
        </div>

        <Carousel autoSlideInterval={5000} slidesToShow={1} className="md:max-w-4xl mx-auto">
          {categoryItems}
        </Carousel>

        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            <Link href="/gift-shop/products">
              기프트샵 방문하기
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

