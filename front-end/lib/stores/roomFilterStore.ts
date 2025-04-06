import { create } from 'zustand';

// 필터 타입 정의
interface FilterState {
  priceRange: [number, number];
  roomType: string[];
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
}

interface FilterStore {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(filterName: K, value: FilterState[K]) => void;
  resetFilters: () => void;
}

const initialState: FilterState = {
  priceRange: [0, 1000000],
  roomType: [],
  checkIn: null,
  checkOut: null,
  guests: 1,
};

// 타입 어서션을 명시적으로 사용하여 타입 오류 방지
export const useRoomFilterStore = create<FilterStore>()((set) => ({
  filters: initialState,
  updateFilter: (filterName, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [filterName]: value,
      },
    })),
  resetFilters: () => set({ filters: initialState }),
}));