/**
 * 객실 필터 내용 컴포넌트 (클라이언트 컴포넌트)
 * 
 * 객실 검색을 위한 필터 UI 및 로직을 처리하는 클라이언트 컴포넌트입니다.
 * 날짜, 인원, 객실 등급, 가격 범위, 전망 유형 등으로 필터링할 수 있습니다.
 */

'use client';

import { Building, RoomGrade, RoomSearchFilters, ViewType } from '@/types/room';
import { ROOM_GRADE_DISPLAY } from '@/types/room';
import { useCallback, useState } from 'react';
import { Filter, CalendarDays, Users, DollarSign, Mountain, Building2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * 객실 필터 내용 컴포넌트
 * 
 * 사용자가 객실을 검색할 때 사용할 수 있는 필터링 옵션을 제공합니다.
 * 
 * @returns JSX.Element
 */
export default function RoomFiltersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 기본 필터 상태 설정 (URL 쿼리 파라미터에서 초기값 가져오기)
  const [filters, setFilters] = useState<RoomSearchFilters>({
    checkIn: searchParams.get('checkIn') ? new Date(searchParams.get('checkIn') as string) : undefined,
    checkOut: searchParams.get('checkOut') ? new Date(searchParams.get('checkOut') as string) : undefined,
    adults: searchParams.get('adults') ? Number(searchParams.get('adults')) : 2,
    children: searchParams.get('children') ? Number(searchParams.get('children')) : 0,
    roomGrade: parseQueryArray(searchParams.get('roomGrade')),
    priceRange: parseQueryPriceRange(searchParams.get('priceRange')),
    viewType: parseQueryArray(searchParams.get('viewType')),
    building: parseQueryArray(searchParams.get('building')),
  });
  
  // 필터 적용 상태
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);
  
  // 필터 섹션 확장/축소 상태
  const [expandedSections, setExpandedSections] = useState<{
    dates: boolean;
    occupancy: boolean;
    roomGrade: boolean;
    price: boolean;
    viewType: boolean;
    building: boolean;
  }>({
    dates: true,     // 날짜 섹션 기본 확장
    occupancy: true, // 인원 섹션 기본 확장
    roomGrade: false,
    price: false,
    viewType: false,
    building: false,
  });

  /**
   * 쿼리 파라미터 배열 파싱 헬퍼 함수
   */
  function parseQueryArray<T extends string>(param: string | null): T[] | undefined {
    if (!param) return undefined;
    return param.split(',') as T[];
  }

  /**
   * 가격 범위 쿼리 파라미터 파싱 헬퍼 함수
   */
  function parseQueryPriceRange(param: string | null): [number, number] | undefined {
    if (!param) return undefined;
    const [min, max] = param.split(',').map(Number);
    if (isNaN(min) || isNaN(max)) return undefined;
    return [min, max];
  }

  /**
   * 필터 섹션 토글 처리
   */
  const toggleSection = useCallback((section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  /**
   * 필터 변경 처리
   */
  const handleFilterChange = useCallback((key: keyof RoomSearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  /**
   * 체크박스 필터 변경 처리 (배열 값)
   */
  const handleArrayFilterChange = useCallback((key: keyof RoomSearchFilters, value: string, checked: boolean) => {
    setFilters(prev => {
      const currentValues = prev[key] as string[] || [];
      
      if (checked) {
        return {
          ...prev,
          [key]: [...currentValues, value]
        };
      } else {
        return {
          ...prev,
          [key]: currentValues.filter(v => v !== value)
        };
      }
    });
  }, []);

  /**
   * 필터 적용 처리
   */
  const applyFilters = useCallback(() => {
    // 필터를 URL 쿼리 파라미터로 변환
    const params = new URLSearchParams();
    
    if (filters.checkIn) params.set('checkIn', filters.checkIn.toISOString().split('T')[0]);
    if (filters.checkOut) params.set('checkOut', filters.checkOut.toISOString().split('T')[0]);
    if (filters.adults !== undefined) params.set('adults', filters.adults.toString());
    if (filters.children !== undefined) params.set('children', filters.children.toString());
    if (filters.roomGrade?.length) params.set('roomGrade', filters.roomGrade.join(','));
    if (filters.priceRange) params.set('priceRange', filters.priceRange.join(','));
    if (filters.viewType?.length) params.set('viewType', filters.viewType.join(','));
    if (filters.building?.length) params.set('building', filters.building.join(','));
    
    // 필터 적용 상태 업데이트
    setIsFilterApplied(true);
    
    // URL 업데이트
    router.push(`/rooms?${params.toString()}`);
  }, [filters, router]);

  /**
   * 필터 초기화 처리
   */
  const resetFilters = useCallback(() => {
    setFilters({
      adults: 2,
      children: 0
    });
    setIsFilterApplied(false);
    router.push('/rooms');
  }, [router]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Filter className="mr-2 h-5 w-5" />
          검색 필터
        </h2>
        {isFilterApplied && (
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            필터 초기화
          </button>
        )}
      </div>

      {/* 날짜 필터 섹션 */}
      <div className="mb-6">
        <button
          className="flex items-center justify-between w-full text-left font-medium"
          onClick={() => toggleSection('dates')}
          aria-expanded={expandedSections.dates}
        >
          <span className="flex items-center">
            <CalendarDays className="mr-2 h-5 w-5 text-neutral-500" />
            날짜
          </span>
          <span className="text-neutral-500">
            {expandedSections.dates ? '−' : '+'}
          </span>
        </button>
        
        {expandedSections.dates && (
          <div className="mt-3 space-y-3">
            <div>
              <label htmlFor="checkIn" className="block text-sm font-medium text-neutral-700 mb-1">
                체크인
              </label>
              <input
                type="date"
                id="checkIn"
                value={filters.checkIn ? filters.checkIn.toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : undefined;
                  handleFilterChange('checkIn', date);
                }}
                className="w-full border border-neutral-300 rounded px-3 py-2 text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="checkOut" className="block text-sm font-medium text-neutral-700 mb-1">
                체크아웃
              </label>
              <input
                type="date"
                id="checkOut"
                value={filters.checkOut ? filters.checkOut.toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : undefined;
                  handleFilterChange('checkOut', date);
                }}
                className="w-full border border-neutral-300 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* 인원 필터 섹션 */}
      <div className="mb-6">
        <button
          className="flex items-center justify-between w-full text-left font-medium"
          onClick={() => toggleSection('occupancy')}
          aria-expanded={expandedSections.occupancy}
        >
          <span className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-neutral-500" />
            인원
          </span>
          <span className="text-neutral-500">
            {expandedSections.occupancy ? '−' : '+'}
          </span>
        </button>
        
        {expandedSections.occupancy && (
          <div className="mt-3 space-y-3">
            <div>
              <label htmlFor="adults" className="block text-sm font-medium text-neutral-700 mb-1">
                성인
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleFilterChange('adults', Math.max(1, (filters.adults || 1) - 1))}
                  className="border border-neutral-300 rounded-l px-3 py-2 hover:bg-neutral-100"
                >
                  -
                </button>
                <input
                  type="number"
                  id="adults"
                  value={filters.adults || 1}
                  readOnly
                  className="w-12 border-y border-neutral-300 text-center py-2"
                />
                <button
                  type="button"
                  onClick={() => handleFilterChange('adults', (filters.adults || 1) + 1)}
                  className="border border-neutral-300 rounded-r px-3 py-2 hover:bg-neutral-100"
                >
                  +
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="children" className="block text-sm font-medium text-neutral-700 mb-1">
                아동
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleFilterChange('children', Math.max(0, (filters.children || 0) - 1))}
                  className="border border-neutral-300 rounded-l px-3 py-2 hover:bg-neutral-100"
                >
                  -
                </button>
                <input
                  type="number"
                  id="children"
                  value={filters.children || 0}
                  readOnly
                  className="w-12 border-y border-neutral-300 text-center py-2"
                />
                <button
                  type="button"
                  onClick={() => handleFilterChange('children', (filters.children || 0) + 1)}
                  className="border border-neutral-300 rounded-r px-3 py-2 hover:bg-neutral-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 객실 등급 필터 섹션 */}
      <div className="mb-6">
        <button
          className="flex items-center justify-between w-full text-left font-medium"
          onClick={() => toggleSection('roomGrade')}
          aria-expanded={expandedSections.roomGrade}
        >
          <span className="flex items-center">
            <span className="mr-2 h-5 w-5 text-neutral-500 flex items-center justify-center">★</span>
            객실 등급
          </span>
          <span className="text-neutral-500">
            {expandedSections.roomGrade ? '−' : '+'}
          </span>
        </button>
        
        {expandedSections.roomGrade && (
          <div className="mt-3 space-y-2">
            {Object.entries(ROOM_GRADE_DISPLAY).map(([grade, info]) => (
              <div key={grade} className="flex items-center">
                <input
                  type="checkbox"
                  id={`grade-${grade}`}
                  checked={filters.roomGrade?.includes(grade as RoomGrade) || false}
                  onChange={(e) => handleArrayFilterChange('roomGrade', grade as RoomGrade, e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor={`grade-${grade}`} className="ml-2 text-sm text-neutral-700">
                  {info.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 가격 범위 필터 섹션 */}
      <div className="mb-6">
        <button
          className="flex items-center justify-between w-full text-left font-medium"
          onClick={() => toggleSection('price')}
          aria-expanded={expandedSections.price}
        >
          <span className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-neutral-500" />
            가격 범위
          </span>
          <span className="text-neutral-500">
            {expandedSections.price ? '−' : '+'}
          </span>
        </button>
        
        {expandedSections.price && (
          <div className="mt-3">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-neutral-500">최소</span>
              <span className="text-sm text-neutral-500">최대</span>
            </div>
            
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={filters.priceRange?.[0] || 100000}
                onChange={(e) => {
                  const min = Number(e.target.value);
                  const max = filters.priceRange?.[1] || 1000000;
                  handleFilterChange('priceRange', [min, max]);
                }}
                className="w-1/2 border border-neutral-300 rounded px-3 py-2 text-sm"
                min="0"
                step="10000"
              />
              <span>~</span>
              <input
                type="number"
                value={filters.priceRange?.[1] || 1000000}
                onChange={(e) => {
                  const min = filters.priceRange?.[0] || 100000;
                  const max = Number(e.target.value);
                  handleFilterChange('priceRange', [min, max]);
                }}
                className="w-1/2 border border-neutral-300 rounded px-3 py-2 text-sm"
                min="0"
                step="10000"
              />
            </div>
          </div>
        )}
      </div>

      {/* 전망 필터 섹션 */}
      <div className="mb-6">
        <button
          className="flex items-center justify-between w-full text-left font-medium"
          onClick={() => toggleSection('viewType')}
          aria-expanded={expandedSections.viewType}
        >
          <span className="flex items-center">
            <Mountain className="mr-2 h-5 w-5 text-neutral-500" />
            전망
          </span>
          <span className="text-neutral-500">
            {expandedSections.viewType ? '−' : '+'}
          </span>
        </button>
        
        {expandedSections.viewType && (
          <div className="mt-3 space-y-2">
            {[
              { value: 'GARDEN', label: '정원 전망' },
              { value: 'FOREST_TRAIL', label: '숲길 전망' },
              { value: 'LAKE_MOUNTAIN', label: '호수/산 전망' },
              { value: 'PREMIUM_CHOICE', label: '프리미엄 선택 전망' },
            ].map((view) => (
              <div key={view.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`view-${view.value}`}
                  checked={filters.viewType?.includes(view.value as ViewType) || false}
                  onChange={(e) => handleArrayFilterChange('viewType', view.value as ViewType, e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor={`view-${view.value}`} className="ml-2 text-sm text-neutral-700">
                  {view.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 건물 필터 섹션 */}
      <div className="mb-6">
        <button
          className="flex items-center justify-between w-full text-left font-medium"
          onClick={() => toggleSection('building')}
          aria-expanded={expandedSections.building}
        >
          <span className="flex items-center">
            <Building2 className="mr-2 h-5 w-5 text-neutral-500" />
            건물
          </span>
          <span className="text-neutral-500">
            {expandedSections.building ? '−' : '+'}
          </span>
        </button>
        
        {expandedSections.building && (
          <div className="mt-3 space-y-2">
            {['A', 'B', 'C', 'D', 'E', 'F'].map((building) => (
              <div key={building} className="flex items-center">
                <input
                  type="checkbox"
                  id={`building-${building}`}
                  checked={filters.building?.includes(building as Building) || false}
                  onChange={(e) => handleArrayFilterChange('building', building as Building, e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor={`building-${building}`} className="ml-2 text-sm text-neutral-700">
                  {building}동
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 필터 적용 버튼 */}
      <button
        onClick={applyFilters}
        className="w-full bg-blue-600 text-white rounded py-3 font-medium hover:bg-blue-700 transition-colors"
      >
        검색 필터 적용
      </button>
    </div>
  );
}
