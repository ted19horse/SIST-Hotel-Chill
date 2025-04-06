'use client';

import { Button } from '@/components/common/ui/Button';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

// Mock product data - reduced to essential information
const allProducts = [
  // Category 1: Chill Haven 시그니처 컬렉션
  {
    id: 101,
    name: 'Chill Haven 시그니처 디퓨저',
    price: 85000,
    image: '/placeholder.svg?height=400&width=400',
    category: 1,
    description: '호텔의 시그니처 향을 집에서도 즐길 수 있는 프리미엄 디퓨저',
    inStock: true,
  },
  {
    id: 102,
    name: 'Chill Haven 로고 배스로브',
    price: 120000,
    image: '/placeholder.svg?height=400&width=400',
    category: 1,
    description: '호텔과 동일한 고급 면소재의 배스로브',
    inStock: true,
  },
  // Category 2: 힐링 & 웰니스 컬렉션
  {
    id: 201,
    name: '힐링 아로마 테라피 세트',
    price: 95000,
    image: '/placeholder.svg?height=400&width=400',
    category: 2,
    description: '스트레스 해소와 숙면을 위한 에센셜 오일 세트',
    inStock: true,
  },
  // Category 3: 에코 & 지속가능한 라이프스타일 제품
  {
    id: 301,
    name: '친환경 대나무 칫솔 세트',
    price: 25000,
    image: '/placeholder.svg?height=400&width=400',
    category: 3,
    description: '생분해성 대나무 칫솔과 천연 치약 세트',
    inStock: true,
  },
  // Category 4: 휴식을 위한 식음료 제품
  {
    id: 401,
    name: 'Chill Tea 시그니처 블렌드',
    price: 45000,
    image: '/placeholder.svg?height=400&width=400',
    category: 4,
    description: '호텔 다이닝에서 제공되는 5가지 프리미엄 차 세트',
    inStock: true,
  },
  // Category 5: 객실 등급별 맞춤 컬렉션
  {
    id: 501,
    name: 'Chill Serenity 룸 패키지',
    price: 220000,
    image: '/placeholder.svg?height=400&width=400',
    category: 5,
    description: 'Serenity 룸에서 사용되는 침구, 배스 제품, 향 세트',
    inStock: true,
  },
  // Category 6: 메모리 & 컬렉터블 아이템
  {
    id: 601,
    name: 'Chill Haven 미니어처 모델',
    price: 65000,
    image: '/placeholder.svg?height=400&width=400',
    category: 6,
    description: '호텔 건물의 정교한 미니어처 모델',
    inStock: true,
  },
];

export default function ProductGridContent() {
  const searchParams = useSearchParams();
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Memoize filtered products to avoid recalculating on every render
  const products = useMemo(() => {
    const categories = searchParams.get('categories')?.split(',').map(Number);
    const priceRanges = searchParams.get('priceRanges')?.split(',');
    const searchQuery = searchParams.get('q')?.toLowerCase();
    let filtered = [...allProducts];

    // 카테고리 필터링
    if (categories?.length) {
      filtered = filtered.filter((product) => categories.includes(product.category));
    }

    // 가격대 필터링
    if (priceRanges?.length) {
      filtered = filtered.filter((product) => {
        return priceRanges.some((range) => {
          switch (range) {
            case 'under50k':
              return product.price < 50000;
            case '50k-100k':
              return product.price >= 50000 && product.price < 100000;
            case '100k-200k':
              return product.price >= 100000 && product.price < 200000;
            case 'over200k':
              return product.price >= 200000;
            default:
              return true;
          }
        });
      });
    }

    // 검색어 필터링
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery) ||
          product.description.toLowerCase().includes(searchQuery)
      );
    }

    return filtered;
  }, [searchParams]);

  const addToCart = (productId: number) => {
    alert('상품이 장바구니에 추가되었습니다.');
  };

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="relative aspect-square">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
            <button
              onClick={() => toggleWishlist(product.id)}
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
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>

            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">₩{product.price.toLocaleString()}</span>
              <Button size="sm" onClick={() => addToCart(product.id)}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                담기
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
