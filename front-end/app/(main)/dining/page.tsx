// [파일 설명]
// 이 파일은 '다이닝' 메인 페이지의 진입점입니다.
// Next.js App Router 구조에서 (main)/dining 세그먼트의 첫 화면을 담당합니다.
// 주요 역할: 다이닝 레스토랑 목록, 검색/필터, 상세 이동 등 다이닝 관련 주요 UI를 렌더링합니다.
//
// 주요 개념:
// - 'use client' 지시문: 이 파일이 클라이언트 컴포넌트임을 명시합니다.
// - React 함수형 컴포넌트 구조, useState/useEffect 등 훅 사용
// - TypeScript의 타입 추론 및 인터페이스 활용(필요시)
// - Next.js의 동적 라우팅 및 URL 쿼리 파라미터 활용
//
// 초보자 팁:
// 각 import, 상태, 효과, 렌더링 부분마다 상세 주석을 참고하세요.

'use client';

// [UI 요소 및 다이닝 관련 컴포넌트 import]
import { Button } from '@/components/common/ui/Button';
import { Input } from '@/components/common/ui/Input';
import RestaurantCard from '@/components/dining/RestaurantCard';
import RestaurantFilter from '@/components/dining/RestaurantFilter';

// [데이터 및 아이콘 import]
import { restaurants } from '@/lib/data/dining/restaurants';
import { ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * 다이닝 메인 페이지 컴포넌트
 * - 레스토랑 목록, 검색, 필터 기능을 제공합니다.
 * - Next.js의 클라이언트 컴포넌트이며, React 훅으로 상태와 효과를 관리합니다.
 */
export default function DiningPage() {
  // [URL 쿼리 파라미터 관리]
  // useSearchParams 훅을 사용해 URL의 query 파라미터 값을 읽습니다.
  const searchParams = useSearchParams();

  // [상태 정의]
  // searchTerm: 검색어
  // activeFilters: 선택된 필터(객체 형태)
  // filteredRestaurants: 현재 화면에 표시할 레스토랑 목록
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  // [초기 검색어 세팅]
  // 컴포넌트가 마운트될 때 URL의 query 파라미터를 읽어 검색어를 초기화합니다.
  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  // [레스토랑 목록 필터링]
  // 검색어 또는 필터가 변경될 때마다 레스토랑 목록을 필터링합니다.
  // useEffect는 React의 사이드 이펙트 관리 훅입니다.
  useEffect(() => {
    let results = [...restaurants];

    // [검색어 필터]
    // 사용자가 입력한 검색어가 레스토랑의 여러 속성에 포함되는지 검사합니다.
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

    // [필터 적용]
    // activeFilters 객체의 각 필터 조건에 따라 추가적으로 목록을 필터링합니다.
    if (activeFilters) {
      // 요리 종류 필터링
      if (activeFilters.cuisine?.length) {
        results = results.filter((restaurant) =>
          activeFilters.cuisine.some((cuisine) =>
            restaurant.cuisine.toLowerCase().includes(cuisine.toLowerCase())
          )
        );
      }

      // 가격대 필터링
      if (activeFilters.priceRange?.length) {
        results = results.filter((restaurant) =>
          activeFilters.priceRange.includes(restaurant.priceRange)
        );
      }

      // 특별 기능 필터링
      if (activeFilters.features?.length) {
        results = results.filter((restaurant) =>
          activeFilters.features.some((feature) => restaurant.features?.includes(feature))
        );
      }

      // 식사 시간 필터링 (추후 메뉴 데이터와 연동 필요)
      if (activeFilters.mealTime) {
        // 임시 로직
        const mealTimeMap = {
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
            activeFilters.dietaryRestrictions.includes('vegetarian') ||
            activeFilters.dietaryRestrictions.includes('vegan')
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

  // [검색어 변경 핸들러]
  // 사용자가 검색어를 입력할 때마다 searchTerm 상태를 업데이트합니다.
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // [필터 변경 핸들러]
  // 사용자가 필터를 선택할 때마다 activeFilters 상태를 업데이트합니다.
  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  // [렌더링 영역]
  // 실제 UI를 반환합니다. 각 컴포넌트/요소 위에 주석을 추가해 역할을 설명할 수 있습니다.
  return (
    <main className="min-h-screen">
      {/* Page Banner */}
      <div className="relative h-[40vh] bg-neutral-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=800&width=1920')",
            opacity: 0.6,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">다이닝</h1>
            <div className="flex items-center justify-center text-sm">
              <Link href="/" className="hover:underline">
                홈
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>다이닝</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dining Content */}
      <div className="container mx-auto px-4 py-12">
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
    </main>
  );
}