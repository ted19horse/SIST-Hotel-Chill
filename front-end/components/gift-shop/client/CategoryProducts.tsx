'use client';

import { Button } from '@/components/common/ui/Button';
import { getProductsByCategory } from '@/lib/api/gift-shop';
import { useCart } from '@/lib/hooks/useCart';
import { Product } from '@/lib/types/gift-shop';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CategoryProductsProps {
  categoryId: number;
}

export default function CategoryProducts({ categoryId }: CategoryProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { addItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const categoryProducts = await getProductsByCategory(categoryId);
        setProducts(categoryProducts);
      } catch (err) {
        console.error('상품 로딩 오류:', err);
        setError('상품 정보를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    alert('상품이 장바구니에 추가되었습니다.');
  };

  const handleViewDetails = (productId: number) => {
    router.push(`/gift-shop/products/${productId}`);
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p>상품 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">이 카테고리에 상품이 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">상품 목록</h2>
        <p className="text-gray-600">총 {products.length}개의 상품이 있습니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div
              className="relative aspect-square cursor-pointer"
              onClick={() => handleViewDetails(product.id)}
            >
              <Image
                src={product.images[0] || '/placeholder.svg'}
                alt={product.name}
                fill
                className="object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <Heart
                  className={`h-5 w-5 ${
                    wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                />
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

              <div className="flex justify-between items-center">
                {product.isDiscounted && product.discountPrice ? (
                  <div>
                    <span className="text-lg font-bold">
                      ₩{product.discountPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ₩{product.price.toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <span className="text-lg font-bold">₩{product.price.toLocaleString()}</span>
                )}
                <Button size="sm" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  담기
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
