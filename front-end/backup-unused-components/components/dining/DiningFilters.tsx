'use client';

import { Button } from '@/components/common/ui/Button';
import { Input } from '@/components/common/ui/Input';
import { Label } from '@/components/common/ui/Label';
import { RadioGroup, RadioGroupItem } from '@/components/common/ui/RadioGroup';
import { useDiningStore } from '@/lib/stores/diningStore';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';

export default function DiningFilters() {
  const { filters, updateFilter, setSearchQuery, resetFilters, applyFilters } = useDiningStore();

  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(filters.searchQuery);

  // 검색어 입력 처리
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  };

  // 검색 실행
  const handleSearch = () => {
    setSearchQuery(localSearchQuery);
    applyFilters();
  };

  // 엔터 키로 검색
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 식사 시간 필터 변경
  const handleMealTimeChange = (value: string) => {
    updateFilter('mealTime', value as 'all' | 'breakfast' | 'lunch' | 'dinner');
    applyFilters();
  };

  // 다이닝 스타일 필터 변경
  const handleDiningStyleChange = (value: string) => {
    updateFilter('diningStyle', value as 'all' | 'casual' | 'specialty' | 'premium');
    applyFilters();
  };

  // 필터 초기화
  const handleResetFilters = () => {
    resetFilters();
    setLocalSearchQuery('');
  };

  // 모바일 필터 토글
  const toggleFilter = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  return (
    <div className="sticky top-20">
      <div className="bg-white rounded-lg shadow-sm p-5 border border-neutral-100">
        {/* 검색 */}
        <div className="mb-6">
          <div className="relative">
            <Input
              placeholder="레스토랑 또는 메뉴 검색"
              className="pl-10"
              value={localSearchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
            {localSearchQuery && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                onClick={() => {
                  setLocalSearchQuery('');
                  setSearchQuery('');
                  applyFilters();
                }}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button className="w-full mt-2" onClick={handleSearch}>
            검색
          </Button>
        </div>

        {/* 모바일 필터 토글 */}
        <Button
          variant="outline"
          className="w-full flex items-center justify-between mb-4 lg:hidden"
          onClick={toggleFilter}
        >
          <span>필터</span>
          <SlidersHorizontal className="h-4 w-4" />
        </Button>

        {/* 필터 옵션 */}
        <div className={`space-y-6 ${isFilterExpanded || 'hidden lg:block'}`}>
          {/* 식사 시간 필터 */}
          <div>
            <h3 className="text-base font-medium mb-3">식사 시간</h3>
            <RadioGroup
              defaultValue={filters.mealTime}
              value={filters.mealTime}
              onValueChange={handleMealTimeChange}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all-meal" />
                <Label htmlFor="all-meal">전체</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="breakfast" id="breakfast" />
                <Label htmlFor="breakfast">아침</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lunch" id="lunch" />
                <Label htmlFor="lunch">점심</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dinner" id="dinner" />
                <Label htmlFor="dinner">저녁</Label>
              </div>
            </RadioGroup>
          </div>

          {/* 다이닝 스타일 필터 */}
          <div>
            <h3 className="text-base font-medium mb-3">다이닝 스타일</h3>
            <RadioGroup
              defaultValue={filters.diningStyle}
              value={filters.diningStyle}
              onValueChange={handleDiningStyleChange}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all-style" />
                <Label htmlFor="all-style">전체</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="casual" id="casual" />
                <Label htmlFor="casual">캐주얼</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="specialty" id="specialty" />
                <Label htmlFor="specialty">스페셜티</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="premium" id="premium" />
                <Label htmlFor="premium">프리미엄</Label>
              </div>
            </RadioGroup>
          </div>

          {/* 필터 초기화 버튼 */}
          <Button variant="outline" className="w-full" onClick={handleResetFilters}>
            필터 초기화
          </Button>
        </div>
      </div>
    </div>
  );
}
