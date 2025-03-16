"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const categories = [
  { id: 1, name: "Chill Haven 시그니처 컬렉션" },
  { id: 2, name: "힐링 & 웰니스 컬렉션" },
  { id: 3, name: "에코 & 지속가능한 라이프스타일 제품" },
  { id: 4, name: "휴식을 위한 식음료 제품" },
  { id: 5, name: "객실 등급별 맞춤 컬렉션" },
  { id: 6, name: "메모리 & 컬렉터블 아이템" },
]

const priceRanges = [
  { id: "under50k", name: "50,000원 미만", min: 0, max: 50000 },
  { id: "50k-100k", name: "50,000원 - 100,000원", min: 50000, max: 100000 },
  { id: "100k-200k", name: "100,000원 - 200,000원", min: 100000, max: 200000 },
  { id: "over200k", name: "200,000원 이상", min: 200000, max: Number.POSITIVE_INFINITY },
]

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedCategories, setSelectedCategories] = useState<number[]>(() => {
    const categoryParam = searchParams.get("category")
    return categoryParam ? [Number.parseInt(categoryParam)] : []
  })

  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (selectedCategories.length === 1) {
      params.set("category", selectedCategories[0].toString())
    } else if (selectedCategories.length > 1) {
      params.set("categories", selectedCategories.join(","))
    }

    if (selectedPriceRanges.length > 0) {
      params.set("price", selectedPriceRanges.join(","))
    }

    if (inStockOnly) {
      params.set("inStock", "true")
    }

    router.push(`/gift-shop/products?${params.toString()}`)
  }

  const resetFilters = () => {
    setSelectedCategories([])
    setSelectedPriceRanges([])
    setInStockOnly(false)
    router.push("/gift-shop/products")
  }

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const togglePriceRange = (rangeId: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeId) ? prev.filter((id) => id !== rangeId) : [...prev, rangeId],
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="font-bold text-lg mb-4">필터</h3>

      <Accordion type="single" collapsible defaultValue="categories">
        <AccordionItem value="categories">
          <AccordionTrigger className="text-left font-medium">카테고리</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-left font-medium">가격</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {priceRanges.map((range) => (
                <div key={range.id} className="flex items-center">
                  <Checkbox
                    id={`price-${range.id}`}
                    checked={selectedPriceRanges.includes(range.id)}
                    onCheckedChange={() => togglePriceRange(range.id)}
                  />
                  <label
                    htmlFor={`price-${range.id}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {range.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger className="text-left font-medium">재고 여부</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center mt-2">
              <Checkbox
                id="in-stock"
                checked={inStockOnly}
                onCheckedChange={(checked) => setInStockOnly(checked === true)}
              />
              <label
                htmlFor="in-stock"
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                재고 있는 상품만 보기
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex gap-2 mt-6">
        <Button onClick={applyFilters} className="flex-1 bg-primary hover:bg-primary/90">
          적용하기
        </Button>
        <Button onClick={resetFilters} variant="outline" className="flex-1">
          초기화
        </Button>
      </div>
    </div>
  )
}

