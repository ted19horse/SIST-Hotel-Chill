"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

const featuredProducts = [
  {
    id: 1,
    name: "Peaceful Moment Aroma Diffuser Set",
    description: "Our signature diffuser with 3 essential oil blends to create a peaceful atmosphere at home",
    price: 85,
    images: ["/placeholder.svg?height=600&width=600"],
    isNew: true,
    category: "signature-collection",
  },
  {
    id: 2,
    name: "Chill Comfort Premium Bathrobe",
    description: "The same luxurious bathrobe you enjoyed during your stay, made from 100% organic cotton",
    price: 95,
    images: ["/placeholder.svg?height=600&width=600"],
    category: "signature-collection",
  },
  {
    id: 3,
    name: "Deep Rest Sleep Kit",
    description: "Everything you need for a restful night's sleep: eye mask, pillow mist, and relaxation guide",
    price: 65,
    images: ["/placeholder.svg?height=600&width=600"],
    category: "healing-wellness",
  },
  {
    id: 4,
    name: "Chill Tea Signature Tea Collection",
    description: "A set of our five most popular tea blends served in our restaurants and lounges",
    price: 45,
    images: ["/placeholder.svg?height=600&width=600"],
    category: "food-beverage",
  },
  {
    id: 5,
    name: "Forest Gift Aromatherapy Oil Set",
    description: "Premium essential oils inspired by the forest surrounding Chill Haven",
    price: 70,
    images: ["/placeholder.svg?height=600&width=600"],
    isNew: true,
    category: "healing-wellness",
  },
  {
    id: 6,
    name: "Chill Night Bedding Collection - Queen",
    description: "Experience our luxurious bedding at home with this complete set for queen-sized beds",
    price: 220,
    images: ["/placeholder.svg?height=600&width=600"],
    category: "signature-collection",
  },
  {
    id: 7,
    name: "Seasonal Peace Limited Edition Collection",
    description: "Special seasonal items that capture the essence of the current season at Chill Haven",
    price: 85,
    images: ["/placeholder.svg?height=600&width=600"],
    isLimitedEdition: true,
    category: "memories-collectibles",
  },
  {
    id: 8,
    name: "Earth Rest Eco-friendly Tumbler",
    description: "Keep your beverages at the perfect temperature while reducing single-use plastic",
    price: 35,
    images: ["/placeholder.svg?height=600&width=600"],
    category: "eco-sustainable",
  },
]

export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const visibleProducts = 4
  const maxIndex = Math.max(0, featuredProducts.length - visibleProducts)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="text-neutral-600">Our most popular items and new arrivals</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={cn(
                "rounded-full border-neutral-300",
                currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100",
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className={cn(
                "rounded-full border-neutral-300",
                currentIndex === maxIndex ? "opacity-50 cursor-not-allowed" : "opacity-100",
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleProducts)}%)` }}
          >
            {featuredProducts.map((product) => (
              <div key={product.id} className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-4">
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full">
                  <div className="relative h-64">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && <Badge className="bg-green-500 text-white">New Arrival</Badge>}
                      {product.isLimitedEdition && <Badge className="bg-amber-500 text-white">Limited Edition</Badge>}
                    </div>
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <Button variant="outline" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold mb-2 line-clamp-1">{product.name}</h3>
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                      <p className="text-xl font-bold text-primary">${product.price}</p>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}

