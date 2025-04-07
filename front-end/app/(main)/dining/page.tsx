'use client';

import { Button } from '@/components/common/ui/Button';
import { Input } from '@/components/common/ui/Input';
import RestaurantCard from '@/components/dining/RestaurantCard';
import RestaurantFilter from '@/components/dining/RestaurantFilter';
import { restaurants } from '@/lib/data/dining/restaurants';
import { Restaurant, RestaurantFilterOptions } from '@/lib/types/restaurant';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * 다이닝 메인 페이지
 */
export default function DiningPage() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<RestaurantFilterOptions>({});
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants);

  // URL 쿼리 파라미터에서 검색어 초기화
  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  // 검색어 및 필터 변경 시 레스토랑 목록 필터링
  useEffect(() => {
    let results = [...restaurants];

    // 검색어로 필터링
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(term) ||
          restaurant.concept.toLowerCase().includes(term) ||
          restaurant.description.toLowerCase().includes(term) ||
          restaurant.cuisine.toLowerCase().includes(term) ||
          restaurant.location.toLowerCase().includes(term) ||
          restaurant.features?.some((feature) => feature.toLowerCase().includes(term))
      );
    }

    // 필터로 필터링
    if (activeFilters) {
      // 요리 종류 필터링
      if (activeFilters.cuisine?.length) {
        results = results.filter((restaurant) =>
          activeFilters.cuisine!.some((cuisine) =>
            restaurant.cuisine.toLowerCase().includes(cuisine.toLowerCase())
          )
        );
      }

      // 가격대 필터링
      if (activeFilters.priceRange?.length) {
        results = results.filter((restaurant) =>
          activeFilters.priceRange!.includes(restaurant.priceRange)
        );
      }

      // 특별 기능 필터링
      if (activeFilters.features?.length) {
        results = results.filter((restaurant) =>
          activeFilters.features!.some((feature) => restaurant.features?.includes(feature))
        );
      }

      // 식사 시간 필터링 (추후 메뉴 데이터와 연동 필요)
      if (activeFilters.mealTime) {
        // 임시 로직
        const mealTimeMap: Record<string, string[]> = {
          breakfast: ['올데이 다이닝'],
          lunch: ['올데이 다이닝', '캐주얼 다이닝'],
          dinner: ['올데이 다이닝', '캐주얼 다이닝', '프리미엄 다이닝'],
          'all-day': ['올데이 다이닝'],
          'tea-time': ['애프터눈 티'],
        };

        const relevantFeatures = mealTimeMap[activeFilters.mealTime] || [];

        results = results.filter((restaurant) =>
          restaurant.features?.some((feature) => relevantFeatures.includes(feature))
        );
      }

      // 식이 제한 필터링 (메뉴 데이터 필요)
      if (activeFilters.dietaryRestrictions?.length) {
        // 현재는 단순 구현. 추후 메뉴 데이터와 연동 필요
        // 식당명에 "Chill Garden"이 있는 경우에는 채식 옵션이 있다고 가정
        results = results.filter((restaurant) => {
          if (
            activeFilters.dietaryRestrictions!.includes('vegetarian') ||
            activeFilters.dietaryRestrictions!.includes('vegan')
          ) {
            // 모든 레스토랑에 일부 채식 메뉴가 있다고 가정
            return true;
          }
          return true;
        });
      }
    }

    setFilteredRestaurants(results);
  }, [searchTerm, activeFilters]);

  // 검색어 변경 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 필터 변경 핸들러
  const handleFilterChange = (filters: RestaurantFilterOptions) => {
    setActiveFilters(filters);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">다이닝</h1>
        <p className="text-gray-600">
          Chill Haven Resort & Spa의 다양한 레스토랑에서 특별한 다이닝 경험을 즐겨보세요.
        </p>
      </div>

      <div className="relative mb-6">
        <Input
          placeholder="레스토랑 이름, 요리 종류, 또는 키워드로 검색..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pr-10"
        />
        <Search
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <RestaurantFilter onChange={handleFilterChange} initialFilters={activeFilters} />
        </div>

        <div className="lg:col-span-3">
          {filteredRestaurants.length > 0 ? (
            <div>
              <div className="mb-4 flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {filteredRestaurants.length}개 레스토랑 중에서{' '}
                  {Object.values(activeFilters).flat().length > 0
                    ? '필터링된 결과'
                    : '전체 레스토랑'}
                  {searchTerm && ` "${searchTerm}" 검색 결과`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-600 mb-4">다른 검색어나 필터를 사용해 보세요.</p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilters({});
                }}
              >
                모든 필터 초기화
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
