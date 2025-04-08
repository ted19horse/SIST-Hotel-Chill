'use client';

import { Button } from '@/components/common/ui/Button';
import { Separator } from '@/components/common/ui/Separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/common/ui/Sheet';
import { useCart } from '@/lib/hooks/useCart';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function ShoppingCartComponent() {
  const { cart, isLoaded, updateQuantity, removeItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // 배송비 계산: 10만원 이상 구매시 무료배송, 그 외 3,000원
  const shipping = cart.totalAmount >= 100000 ? 0 : 3000;

  // 총 금액
  const total = cart.totalAmount + shipping;

  if (!isLoaded) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="font-bold text-lg mb-4">장바구니</h3>
        <p className="text-sm text-gray-500">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">장바구니</h3>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.totalQuantity}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>장바구니</SheetTitle>
            </SheetHeader>

            {cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[50vh]">
                <ShoppingCart className="h-16 w-16 text-neutral-300 mb-4" />
                <p className="text-neutral-500">장바구니가 비어있습니다</p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-auto py-4">
                  {cart.items.map((item) => (
                    <div key={item.productId} className="flex py-4">
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 mr-4 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-primary font-semibold mt-1">
                          {item.discountPrice
                            ? `₩${item.discountPrice.toLocaleString()} `
                            : `₩${item.price.toLocaleString()}`}
                          {item.discountPrice && (
                            <span className="line-through text-gray-500 text-sm ml-1">
                              ₩{item.price.toLocaleString()}
                            </span>
                          )}
                        </p>
                        <div className="flex items-center mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-3">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.productId)}
                      >
                        <Trash2 className="h-5 w-5 text-neutral-400" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between py-2">
                    <span className="text-neutral-600">소계</span>
                    <span>₩{cart.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-neutral-600">배송비</span>
                    <span>{shipping === 0 ? '무료' : `₩${shipping.toLocaleString()}`}</span>
                  </div>
                  {shipping === 0 && (
                    <div className="bg-green-50 text-green-700 text-sm p-2 rounded my-2">
                      10만원 이상 구매로 무료배송 혜택이 적용되었습니다.
                    </div>
                  )}
                  {shipping > 0 && cart.totalAmount > 0 && (
                    <div className="text-sm text-gray-600 my-2">
                      ₩{(100000 - cart.totalAmount).toLocaleString()}원 더 구매 시 무료배송
                    </div>
                  )}
                  <Separator className="my-2" />
                  <div className="flex justify-between py-2 font-bold">
                    <span>합계</span>
                    <span>₩{total.toLocaleString()}</span>
                  </div>

                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90">결제하기</Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>

      <div className="text-sm text-neutral-600">
        <p>장바구니에 {cart.totalQuantity}개의 상품이 있습니다.</p>
        <p className="font-medium mt-2">합계: ₩{total.toLocaleString()}</p>
        {shipping > 0 && cart.totalAmount > 0 && (
          <p className="text-xs text-gray-500 mt-1">
            ₩{(100000 - cart.totalAmount).toLocaleString()}원 더 구매 시 무료배송
          </p>
        )}
      </div>

      <Button
        className="w-full mt-4 bg-primary hover:bg-primary/90"
        onClick={() => setIsOpen(true)}
      >
        장바구니 보기
      </Button>
    </div>
  );
}
