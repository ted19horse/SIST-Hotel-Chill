"use client"

import { useState } from "react"
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Simplified cart item type
type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}

// Mock cart data with minimal items
const initialCartItems: CartItem[] = [
  {
    id: 101,
    name: "Chill Haven 시그니처 디퓨저",
    price: 85000,
    quantity: 1,
  },
]

export default function ShoppingCartComponent() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [isOpen, setIsOpen] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Fixed shipping cost
  const shipping = 3000

  // Calculate total
  const total = subtotal + shipping

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">장바구니</h3>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>장바구니</SheetTitle>
            </SheetHeader>

            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[50vh]">
                <ShoppingCart className="h-16 w-16 text-neutral-300 mb-4" />
                <p className="text-neutral-500">장바구니가 비어있습니다</p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-auto py-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex py-4">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-primary font-semibold mt-1">{item.price.toLocaleString()}원</p>
                        <div className="flex items-center mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-3">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-5 w-5 text-neutral-400" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between py-2">
                    <span className="text-neutral-600">소계</span>
                    <span>{subtotal.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-neutral-600">배송비</span>
                    <span>{shipping.toLocaleString()}원</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between py-2 font-bold">
                    <span>합계</span>
                    <span>{total.toLocaleString()}원</span>
                  </div>

                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90">결제하기</Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>

      <div className="text-sm text-neutral-600">
        <p>장바구니에 {totalItems}개의 상품이 있습니다.</p>
        <p className="font-medium mt-2">합계: {total.toLocaleString()}원</p>
      </div>

      <Button className="w-full mt-4 bg-primary hover:bg-primary/90" onClick={() => setIsOpen(true)}>
        장바구니 보기
      </Button>
    </div>
  )
}

