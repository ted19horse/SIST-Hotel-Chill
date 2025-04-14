'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/common/ui/Accordion';
import { Button } from '@/components/common/ui/Button';
import { Checkbox } from '@/components/common/ui/Checkbox';
import { getCategories } from '@/lib/api/gift-shop';
import { ProductCategory } from '@/lib/types/gift-shop';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const priceRanges = [
  { id: 'under50k', name: '50,000원 미만', min: 0, max: 50000 },
  { id: '50k-100k', name: '50,000원 - 100,000원', min: 50000, max: 100000 },
  { id: '100k-200k', name: '100,000원 - 200,000원', min: 100000, max: 200000 },
  { id: 'over200k', name: '200,000원 이상', min: 200000, max: Number.POSITIVE_INFINITY },
];

export default function ProductFiltersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    searchParams
      .get('categories')
      ?.split(',')
      .map(Number)
      .filter((id) => !isNaN(id)) || []
  );
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>(
    searchParams.get('priceRanges')?.split(',') || []
  );
  const [selectedFeatures, setSelectedFeatures] = useState({
    featured: searchParams.get('featured') === 'true',
    newArrival: searchParams.get('newArrival') === 'true',
    limited: searchParams.get('limited') === 'true',
    discounted: searchParams.get('discounted') === 'true',
  });

  // 카테고리 정보 로드
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('카테고리 로딩 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // 카테고리 필터
    if (selectedCategories.length > 0) {
      params.set('categories', selectedCategories.join(','));
    } else {
      params.delete('categories');
    }

    // 가격대 필터
    if (selectedPriceRanges.length > 0) {
      params.set('priceRanges', selectedPriceRanges.join(','));
    } else {
      params.delete('priceRanges');
    }

    // 특징 필터
    Object.entries(selectedFeatures).forEach(([key, value]) => {
      if (value) {
        params.set(key, 'true');
      } else {
        params.delete(key);
      }
    });

    router.push(`/gift-shop/products?${params.toString()}`);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSelectedFeatures({
      featured: false,
      newArrival: false,
      limited: false,
      discounted: false,
    });
    router.push('/gift-shop/products');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="font-bold text-lg mb-4">필터</h3>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger>카테고리</AccordionTrigger>
          <AccordionContent>
            {isLoading ? (
              <div className="p-2 text-sm text-gray-500">카테고리 불러오는 중...</div>
            ) : (
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCategories([...selectedCategories, category.id]);
                        } else {
                          setSelectedCategories(
                            selectedCategories.filter((id) => id !== category.id)
                          );
                        }
                      }}
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>가격대</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <div key={range.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`price-${range.id}`}
                    checked={selectedPriceRanges.includes(range.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedPriceRanges([...selectedPriceRanges, range.id]);
                      } else {
                        setSelectedPriceRanges(selectedPriceRanges.filter((id) => id !== range.id));
                      }
                    }}
                  />
                  <label
                    htmlFor={`price-${range.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {range.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="features">
          <AccordionTrigger>특징</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="feature-featured"
                  checked={selectedFeatures.featured}
                  onCheckedChange={(checked) => {
                    setSelectedFeatures({
                      ...selectedFeatures,
                      featured: !!checked,
                    });
                  }}
                />
                <label
                  htmlFor="feature-featured"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  추천 상품
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="feature-new"
                  checked={selectedFeatures.newArrival}
                  onCheckedChange={(checked) => {
                    setSelectedFeatures({
                      ...selectedFeatures,
                      newArrival: !!checked,
                    });
                  }}
                />
                <label
                  htmlFor="feature-new"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  신상품
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="feature-limited"
                  checked={selectedFeatures.limited}
                  onCheckedChange={(checked) => {
                    setSelectedFeatures({
                      ...selectedFeatures,
                      limited: !!checked,
                    });
                  }}
                />
                <label
                  htmlFor="feature-limited"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  한정판
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="feature-discounted"
                  checked={selectedFeatures.discounted}
                  onCheckedChange={(checked) => {
                    setSelectedFeatures({
                      ...selectedFeatures,
                      discounted: !!checked,
                    });
                  }}
                />
                <label
                  htmlFor="feature-discounted"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  할인상품
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex gap-2 mt-6">
        <Button onClick={applyFilters} className="flex-1">
          필터 적용
        </Button>
        <Button variant="outline" onClick={resetFilters}>
          초기화
        </Button>
      </div>
    </div>
  );
}
