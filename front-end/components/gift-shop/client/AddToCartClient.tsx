'use client';

import { Button } from '@/components/common/ui/Button';
import { useCart } from '@/lib/hooks/useCart';
import { Product } from '@/types/gift-shop';
import { Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface AddToCartClientProps {
  product: Product;
}

export default function AddToCartClient({ product }: AddToCartClientProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < (product.stock || 10)) {
      // 재고 제한
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    alert('상품이 장바구니에 추가되었습니다.');
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          size="icon"
          disabled={quantity <= 1}
          onClick={decreaseQuantity}
          className="h-10 w-10"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="mx-4 w-8 text-center">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          disabled={quantity >= (product.stock || 10)}
          onClick={increaseQuantity}
          className="h-10 w-10"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-4">
        <Button
          className="flex-1 bg-primary hover:bg-primary/90"
          disabled={product.stock <= 0}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          장바구니 담기
        </Button>
        <Button variant="outline" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      {product.stock <= 0 && <p className="text-red-500 mt-2">현재 품절된 상품입니다.</p>}
    </div>
  );
}
