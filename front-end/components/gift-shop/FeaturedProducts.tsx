'use client';

import { Badge } from '@/components/common/ui/Badge';
import { Button } from '@/components/common/ui/Button';
import { getFeaturedProducts } from '@/lib/api/gift-shop';
import { useCart } from '@/lib/hooks/useCart';
import { cn } from '@/lib/utils';
import { Product } from '@/types/gift-shop';
import { ChevronLeft, ChevronRight, Eye, Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  // 추천 상품 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const products = await getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (err) {
        console.error('추천 상품 로딩 오류:', err);
        setError('추천 상품을 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 위시리스트 관리
  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // 장바구니에 추가
  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    alert('상품이 장바구니에 추가되었습니다.');
  };

  const visibleProducts = 4;
  const maxIndex = Math.max(0, featuredProducts.length - visibleProducts);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>추천 상품을 불러오는 중...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return (
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>추천 상품이 없습니다.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">추천 상품</h2>
            <p className="text-neutral-600">가장 인기 있는 상품들과 신상품</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={cn(
                'rounded-full border-neutral-300',
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
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
                'rounded-full border-neutral-300',
                currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
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
                      src={product.images[0] || '/placeholder.svg'}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNewArrival && (
                        <Badge className="bg-green-500 text-white">신상품</Badge>
                      )}
                      {product.isLimitedEdition && (
                        <Badge className="bg-amber-500 text-white">한정판</Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white/80 hover:bg-white"
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart
                          className={cn(
                            'h-4 w-4',
                            wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''
                          )}
                        />
                      </Button>
                      <Link href={`/gift-shop/products/${product.id}`}>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full bg-white/80 hover:bg-white"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold mb-2 line-clamp-1">{product.name}</h3>
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      {product.isDiscounted && product.discountPrice ? (
                        <div className="flex items-center gap-2">
                          <p className="text-xl font-bold text-primary">
                            ₩{product.discountPrice.toLocaleString()}
                          </p>
                          <p className="text-sm text-neutral-500 line-through">
                            ₩{product.price.toLocaleString()}
                          </p>
                        </div>
                      ) : (
                        <p className="text-xl font-bold text-primary">
                          ₩{product.price.toLocaleString()}
                        </p>
                      )}
                    </div>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      장바구니 담기
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/gift-shop/products">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              모든 상품 보기
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
