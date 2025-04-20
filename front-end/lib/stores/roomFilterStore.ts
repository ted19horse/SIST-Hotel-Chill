import { create } from 'zustand';

// 가격 범위 상수 (최소/최대값)
const PRICE_RANGE = {
  MIN: 0,        // 최소 가격
  MAX: 2000000,  // 최대 가격
};

// 인원 수 상수
const OCCUPANCY = {
  ADULTS_MIN: 1,   // 성인 최소 1명
  ADULTS_MAX: 4,   // 성인 최대 4명
  CHILDREN_MIN: 0, // 아동 최소 0명
  CHILDREN_MAX: 4, // 아동 최대 4명
};

// 필터의 기본값
const initialFilters = {
  checkIn: undefined, // 체크인 날짜 (Date 또는 undefined)
  checkOut: undefined, // 체크아웃 날짜 (Date 또는 undefined)
  adults: 2,          // 성인 기본값 2명
  children: 0,        // 아동 기본값 0명
  roomGrade: [],      // 객실 등급 (배열)
  priceRange: [PRICE_RANGE.MIN, PRICE_RANGE.MAX], // 가격 범위
  viewType: [],       // 전망 유형 (배열)
  isFiltering: false, // 필터 적용 여부
};

// Zustand를 이용한 전역 상태 관리 store 생성
export const useRoomFilterStore = create((set) => ({
  filters: initialFilters,
  // 특정 필터 값을 변경하는 함수
  updateFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),
  // 모든 필터를 초기값으로 리셋하는 함수
  resetFilters: () => set({ filters: initialFilters }),
  // 필터 적용(예: 검색 버튼 클릭 시 isFiltering을 true로 변경)
  applyFilters: () =>
    set((state) => ({
      filters: {
        ...state.filters,
        isFiltering: true,
      },
    })),
  // 필터 적용 후 isFiltering을 false로 리셋
  resetFiltering: () =>
    set((state) => ({
      filters: {
        ...state.filters,
        isFiltering: false,
      },
    })),
}));

/*
초보자용 상세 설명:
- 이 store의 필터 구조와 기본값은 RoomFiltersContent.tsx의 UI/로직과 100% 일치합니다.
- adults/children, roomGrade, viewType, building 등 모든 필드명과 타입, 기본값을 맞췄습니다.
- 실제 UI와 store가 다르면 필터 동작이 꼬일 수 있으니 항상 구조를 맞추는 것이 중요합니다.
- resetFiltering 함수는 REST API 요청 후 isFiltering을 자동으로 false로 돌려줍니다.
- RoomListContent에서 이 함수를 호출하면, 다음 검색까지 중복 요청을 방지할 수 있습니다.
*/
