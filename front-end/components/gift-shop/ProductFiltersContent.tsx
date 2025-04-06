'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/common/ui/Accordion';
import { Button } from '@/components/common/ui/Button';
import { Checkbox } from '@/components/common/ui/Checkbox';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const categories = [
  { id: 1, name: 'Chill Haven 시그니처 컬렉션' },
  { id: 2, name: '힐링 & 웰니스 컬렉션' },
  { id: 3, name: '에코 & 지속가능한 라이프스타일 제품' },
  { id: 4, name: '휴식을 위한 식음료 제품' },
  { id: 5, name: '객실 등급별 맞춤 컬렉션' },
  { id: 6, name: '메모리 & 컬렉터블 아이템' },
];

const priceRanges = [
  { id: 'under50k', name: '50,000원 미만', min: 0, max: 50000 },
  { id: '50k-100k', name: '50,000원 - 100,000원', min: 50000, max: 100000 },
  { id: '100k-200k', name: '100,000원 - 200,000원', min: 100000, max: 200000 },
  { id: 'over200k', name: '200,000원 이상', min: 200000, max: Number.POSITIVE_INFINITY },
];

export default function ProductFiltersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
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

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategories.length > 0) {
      params.set('categories', selectedCategories.join(','));
    } else {
      params.delete('categories');
    }

    if (selectedPriceRanges.length > 0) {
      params.set('priceRanges', selectedPriceRanges.join(','));
    } else {
      params.delete('priceRanges');
    }

    router.push(`/gift-shop/products?${params.toString()}`);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    router.push('/gift-shop/products');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="font-bold text-lg mb-4">필터</h3>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger>카테고리</AccordionTrigger>
          <AccordionContent>
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
