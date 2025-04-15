'use client';

import { Button } from '@/components/common/ui/Button';
import { getProducts } from '@/lib/api/gift-shop';
import { useCart } from '@/lib/hooks/useCart';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductGridContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const { addItem } = useCart();

  // 상품 로드
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        // 검색 파라미터 구성
        const params = {};

        // 카테고리 필터링
        const categories = searchParams.get('categories');
        if (categories) {
          params.categoryId = Number(categories);
        }

        // 서브 카테고리 필터링
        const subCategories = searchParams.get('subCategories');
        if (subCategories) {
          params.subCategoryId = Number(subCategories);
        }

        // 가격 범위 필터링
        const priceRanges = searchParams.get('priceRanges')?.split(',');
        if (priceRanges?.length) {
          priceRanges.forEach((range) => {
            switch (range) {
              case 'under50k':
                params.maxPrice = 50000;
                break;
              case '50k-100k':
                if (!params.minPrice || params.minPrice < 50000) params.minPrice = 50000;
                if (!params.maxPrice || params.maxPrice > 100000) params.maxPrice = 100000;
                break;
              case '100k-200k':
                if (!params.minPrice || params.minPrice < 100000) params.minPrice = 100000;
                if (!params.maxPrice || params.maxPrice > 200000) params.maxPrice = 200000;
                break;
              case 'over200k':
                params.minPrice = 200000;
                break;
            }
          });
        }

        // 특징 필터링
        if (searchParams.get('featured') === 'true') {
          params.featured = true;
        }

        if (searchParams.get('newArrival') === 'true') {
          params.newArrival = true;
        }

        if (searchParams.get('limited') === 'true') {
          params.limitedEdition = true;
        }

        if (searchParams.get('discounted') === 'true') {
          params.discounted = true;
        }

        // 검색어 필터링
        const search = searchParams.get('q');
        if (search) {
          params.search = search;
        }

        // 상품 가져오기
        const data = await getProducts(params);
        setProducts(data);
      } catch (err) {
        console.error('상품 로딩 오류:', err);
        setError('상품 정보를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleAddToCart = (product) => {
    addItem(product, 1);
    alert('상품이 장바구니에 추가되었습니다.');
  };

  const handleViewDetails = (productId) => {
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
  );
}