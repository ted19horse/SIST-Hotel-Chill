"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import { useSearchParams } from "next/navigation"

// Mock product data - reduced to essential information
const allProducts = [
  // Category 1: Chill Haven 시그니처 컬렉션
  {
    id: 101,
    name: "Chill Haven 시그니처 디퓨저",
    price: 85000,
    image: "/placeholder.svg?height=400&width=400",
    category: 1,
    description: "호텔의 시그니처 향을 집에서도 즐길 수 있는 프리미엄 디퓨저",
    inStock: true,
  },
  {
    id: 102,
    name: "Chill Haven 로고 배스로브",
    price: 120000,
    image: "/placeholder.svg?height=400&width=400",
    category: 1,
    description: "호텔과 동일한 고급 면소재의 배스로브",
    inStock: true,
  },

  // Category 2: 힐링 & 웰니스 컬렉션
  {
    id: 201,
    name: "힐링 아로마 테라피 세트",
    price: 95000,
    image: "/placeholder.svg?height=400&width=400",
    category: 2,
    description: "스트레스 해소와 숙면을 위한 에센셜 오일 세트",
    inStock: true,
  },

  // Category 3: 에코 & 지속가능한 라이프스타일 제품
  {
    id: 301,
    name: "친환경 대나무 칫솔 세트",
    price: 25000,
    image: "/placeholder.svg?height=400&width=400",
    category: 3,
    description: "생분해성 대나무 칫솔과 천연 치약 세트",
    inStock: true,
  },

  // Category 4: 휴식을 위한 식음료 제품
  {
    id: 401,
    name: "Chill Tea 시그니처 블렌드",
    price: 45000,
    image: "/placeholder.svg?height=400&width=400",
    category: 4,
    description: "호텔 다이닝에서 제공되는 5가지 프리미엄 차 세트",
    inStock: true,
  },

  // Category 5: 객실 등급별 맞춤 컬렉션
  {
    id: 501,
    name: "Chill Serenity 룸 패키지",
    price: 220000,
    image: "/placeholder.svg?height=400&width=400",
    category: 5,
    description: "Serenity 룸에서 사용되는 침구, 배스 제품, 향 세트",
    inStock: true,
  },

  // Category 6: 메모리 & 컬렉터블 아이템
  {
    id: 601,
    name: "Chill Haven 미니어처 모델",
    price: 65000,
    image: "/placeholder.svg?height=400&width=400",
    category: 6,
    description: "호텔 건물의 정교한 미니어처 모델",
    inStock: true,
  },
]

export default function ProductGrid() {
  const searchParams = useSearchParams()
  const [wishlist, setWishlist] = useState<number[]>([])

  // Memoize filtered products to avoid recalculating on every render
  const products = useMemo(() => {
    const categoryParam = searchParams.get("category")

    if (categoryParam) {
      return allProducts.filter((product) => product.category === Number.parseInt(categoryParam))
    }
    return allProducts
  }, [searchParams])

  const addToCart = (productId: number) => {
    // Simple alert instead of state manipulation to reduce memory usage
    alert("상품이 장바구니에 추가되었습니다.")
  }

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">상품 ({products.length})</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <div className="relative h-64 w-full">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
                aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={`h-5 w-5 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-neutral-400"}`}
                />
              </button>
              {!product.inStock && (
                <div className="absolute top-0 left-0 bg-neutral-800 text-white px-3 py-1 text-sm">품절</div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-medium text-lg mb-1">{product.name}</h3>
              <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-primary font-bold">{product.price.toLocaleString()}원</p>
                <Button
                  onClick={() => addToCart(product.id)}
                  disabled={!product.inStock}
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  담기
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

