'use client';

import { Button } from '@/components/common/ui/Button';
import { getCategories, getProductsByCategory } from '@/lib/api/gift-shop';
import { ProductCategory } from '@/types/gift-shop';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CategoryGrid() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [featuredProductsMap, setFeaturedProductsMap] = useState<
    Record<number, { name: string; price: number }[]>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // 카테고리 데이터 가져오기
        const categoriesData = await getCategories();
        setCategories(categoriesData);

        // 카테고리별 추천 상품 가져오기
        const productsMap: Record<number, { name: string; price: number }[]> = {};
        for (const category of categoriesData) {
          const products = await getProductsByCategory(category.id);
          // 각 카테고리당 최대 6개 상품만 표시
          productsMap[category.id] = products
            .slice(0, 6)
            .map((p) => ({ name: p.name, price: p.price }));
        }
        setFeaturedProductsMap(productsMap);
      } catch (err) {
        console.error('데이터 로딩 오류:', err);
        setError('카테고리 정보를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>카테고리 정보를 불러오는 중...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">상품 카테고리</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Chill Haven의 경험을 일상 생활에서도 느낄 수 있도록 신중하게 큐레이션된 컬렉션을
            탐색해보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-64">
                <Image
                  src={category.image || '/placeholder.svg'}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-neutral-600 mb-4 line-clamp-2">{category.description}</p>

                {featuredProductsMap[category.id] &&
                  featuredProductsMap[category.id].length > 0 && (
                    <div className="space-y-2 mb-6">
                      <p className="font-medium text-sm text-neutral-700">추천 상품:</p>
                      <ul className="space-y-1">
                        {featuredProductsMap[category.id].slice(0, 3).map((product, index) => (
                          <li key={index} className="flex justify-between text-sm">
                            <span className="text-neutral-600">{product.name}</span>
                            <span className="font-medium">₩{product.price.toLocaleString()}</span>
                          </li>
                        ))}
                      </ul>
                      {featuredProductsMap[category.id].length > 3 && (
                        <p className="text-sm text-neutral-500">
                          + {featuredProductsMap[category.id].length - 3}개 더...
                        </p>
                      )}
                    </div>
                  )}

                <Link href={`/gift-shop/category/${category.slug}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    자세히 보기
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
