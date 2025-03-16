"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ProductSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Create a new URLSearchParams object based on the current params
    const params = new URLSearchParams(searchParams.toString())

    // Update or remove the search query parameter
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim())
    } else {
      params.delete("q")
    }

    // Navigate to the new URL with the updated search params
    router.push(`/gift-shop/products?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="font-bold text-lg mb-4">상품 검색</h3>

      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}

