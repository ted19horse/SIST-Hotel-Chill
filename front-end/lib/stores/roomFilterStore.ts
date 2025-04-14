import { MAX_OCCUPANCY, PRICE_RANGE } from '@/lib/data/rooms/constants/filters';
import { RoomGrade } from '@/lib/types/room';
import { create } from 'zustand';

interface RoomFilters {
  priceRange: [number, number];
  roomGrades: RoomGrade[];
  guests: number;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  isFiltering: boolean;
}

interface RoomFilterStore {
  filters: RoomFilters;
  updateFilter: <K extends keyof RoomFilters>(key: K, value: RoomFilters[K]) => void;
  resetFilters: () => void;
  applyFilters: () => void;
}

const initialFilters: RoomFilters = {
  priceRange: [PRICE_RANGE.MIN, PRICE_RANGE.MAX],
  roomGrades: [],
  guests: MAX_OCCUPANCY.MIN,
  checkIn: undefined,
  checkOut: undefined,
  isFiltering: false,
};

export const useRoomFilterStore = create<RoomFilterStore>((set) => ({
  filters: initialFilters,
  updateFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),
  resetFilters: () => set({ filters: initialFilters }),
  applyFilters: () =>
    set((state) => ({
      filters: {
        ...state.filters,
        isFiltering: true,
      },
    })),
}));
