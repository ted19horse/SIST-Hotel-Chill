/**
 * 객실 필터 내용 컴포넌트 (클라이언트 컴포넌트)
 * 
 * 객실 검색을 위한 필터 UI 및 로직을 처리하는 클라이언트 컴포넌트입니다.
 * 날짜, 인원, 객실 등급, 가격 범위, 전망 유형 등으로 필터링할 수 있습니다.
 */

'use client';

import { useCallback, useState } from 'react';
import { Filter, CalendarDays, Users, DollarSign, Mountain, Building2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRoomFilterStore } from '@/lib/stores/roomFilterStore';

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
  
  // Zustand store에서 상태와 변경 함수 가져오기
  const filters = useRoomFilterStore(state => state.filters);
  const updateFilter = useRoomFilterStore(state => state.updateFilter);
  const resetFilters = useRoomFilterStore(state => state.resetFilters);
  const applyFilters = useRoomFilterStore(state => state.applyFilters);

  // 필터 섹션 확장/축소 상태만 로컬에서 관리
  const [expandedSections, setExpandedSections] = useState({
    dates: true,     // 날짜 섹션 기본 확장
    occupancy: true, // 인원 섹션 기본 확장
    roomGrade: false,
    price: false,
    viewType: false,
    building: false,
  });

  // 객실 등급 상수 선언 (어메니티 이름 차용)
  const ROOM_GRADES = [
    { key: 'standard', label: '스탠다드' },
    { key: 'deluxe', label: '디럭스' },
    { key: 'premium', label: '프리미엄' },
    { key: 'presidential', label: '프레지덴셜' },
  ];

  // 오늘 날짜를 YYYY-MM-DD 포맷으로 변환하는 함수
  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  /**
   * 필터 섹션 토글 처리
   */
  const toggleSection = useCallback((section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  /**
   * 필터 변경 처리 (단일 값)
   */
  const handleFilterChange = useCallback((key, value) => {
    updateFilter(key, value);
  }, [updateFilter]);

  /**
   * 체크박스 필터 변경 처리 (배열 값)
   */
  const handleArrayFilterChange = useCallback((key, value, checked) => {
    const currentValues = filters[key] || [];
    if (checked) {
      updateFilter(key, [...currentValues, value]);
    } else {
      updateFilter(key, currentValues.filter(v => v !== value));
    }
  }, [filters, updateFilter]);

  /**
   * 필터 적용 처리
   */
  const handleApplyFilters = useCallback(() => {
    applyFilters();
    // (예시) URL 쿼리 파라미터 동기화 등 추가 작업 가능
    // router.push(...)
  }, [applyFilters]);

  /**
   * 필터 초기화 처리
   */
  const handleResetFilters = useCallback(() => {
    resetFilters();
    // (예시) URL 초기화 등 추가 작업 가능
    // router.push('/rooms');
  }, [resetFilters]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Filter className="mr-2 h-5 w-5" />
          검색 필터
        </h2>
        {filters && (
          <button
            onClick={handleResetFilters}
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
                min={getTodayString()} // 오늘 이전 날짜 선택 불가
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
            {/* 등급 아이콘 등 추가 가능 */}
            객실 등급
          </span>
          <span className="text-neutral-500">
            {expandedSections.roomGrade ? '−' : '+'}
          </span>
        </button>
        
        {expandedSections.roomGrade && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {ROOM_GRADES.map((grade) => (
              <label key={grade.key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.roomGrade?.includes(grade.key) || false}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    let newGrades = filters.roomGrade ? [...filters.roomGrade] : [];
                    if (checked) {
                      newGrades.push(grade.key);
                    } else {
                      newGrades = newGrades.filter((g) => g !== grade.key);
                    }
                    handleFilterChange('roomGrade', newGrades);
                  }}
                  className="mr-2"
                />
                {grade.label}
              </label>
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
                  checked={filters.viewType?.includes(view.value) || false}
                  onChange={(e) => handleArrayFilterChange('viewType', view.value, e.target.checked)}
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

      {/* 필터 적용 버튼 */}
      <button
        onClick={handleApplyFilters}
        className="w-full bg-blue-600 text-white rounded py-3 font-medium hover:bg-blue-700 transition-colors"
      >
        검색 필터 적용
      </button>
    </div>
  );
}