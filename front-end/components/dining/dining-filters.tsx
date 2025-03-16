"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

export default function DiningFilters() {
  const [mealType, setMealType] = useState("all")
  const [diningStyle, setDiningStyle] = useState("all")

  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">다이닝 옵션</h2>

        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setMealType}>
            <TabsList className="grid grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="breakfast">아침</TabsTrigger>
              <TabsTrigger value="lunch">점심</TabsTrigger>
              <TabsTrigger value="dinner">저녁</TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setDiningStyle}>
            <TabsList className="grid grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="casual">캐주얼</TabsTrigger>
              <TabsTrigger value="specialty">스페셜티</TabsTrigger>
              <TabsTrigger value="premium">프리미엄</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-neutral-400" />
        </div>
        <input
          type="search"
          className="block w-full p-4 pl-10 text-sm border border-neutral-200 rounded-lg focus:ring-primary focus:border-primary"
          placeholder="레스토랑 이름, 메뉴 또는 키워드로 검색..."
        />
        <Button className="absolute right-2.5 bottom-2.5 bg-primary hover:bg-primary/90">검색</Button>
      </div>
    </div>
  )
}

