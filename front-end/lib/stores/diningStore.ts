import { DiningEvent } from '@/data/dining/types/event';
import { Restaurant } from '@/data/dining/types/restaurant';
import { create } from 'zustand';

// 필터 타입 정의
export type MealTime = 'all' | 'breakfast' | 'lunch' | 'dinner';
export type DiningStyle = 'all' | 'casual' | 'specialty' | 'premium';

interface DiningFilters {
  mealTime: MealTime;
  diningStyle: DiningStyle;
  searchQuery: string;
  isFiltering: boolean;
}

interface DiningStore {
  // 상태
  filters: DiningFilters;
  filteredRestaurants: Restaurant[];
  filteredEvents: DiningEvent[];
  restaurants: Restaurant[];
  events: DiningEvent[];

  // 액션
  updateFilter: <K extends keyof DiningFilters>(key: K, value: DiningFilters[K]) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
  applyFilters: () => void;
  setRestaurants: (restaurants: Restaurant[]) => void;
  setEvents: (events: DiningEvent[]) => void;
}

// 초기 필터 상태
const initialFilters: DiningFilters = {
  mealTime: 'all',
  diningStyle: 'all',
  searchQuery: '',
  isFiltering: false,
};

// 필터링 로직을 구현하는 함수
const filterRestaurants = (restaurants: Restaurant[], filters: DiningFilters): Restaurant[] => {
  if (!filters.isFiltering) return restaurants;

  return restaurants.filter((restaurant) => {
    // 식사 시간 필터
    if (filters.mealTime !== 'all') {
      if (!restaurant.tags.includes(filters.mealTime)) {
        return false;
      }
    }

    // 다이닝 스타일 필터
    if (filters.diningStyle !== 'all') {
      if (!restaurant.tags.includes(filters.diningStyle)) {
        return false;
      }
    }

    // 검색어 필터
    if (filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase();
      const nameMatch = restaurant.name.toLowerCase().includes(query);
      const descriptionMatch = restaurant.description.toLowerCase().includes(query);
      const tagsMatch = restaurant.tags.some((tag) => tag.toLowerCase().includes(query));

      // 메뉴 항목에서도 검색
      const menuMatch = restaurant.menuCategories.some((category) =>
        category.items.some(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            (item.description && item.description.toLowerCase().includes(query))
        )
      );

      if (!(nameMatch || descriptionMatch || tagsMatch || menuMatch)) {
        return false;
      }
    }

    return true;
  });
};

// 이벤트 필터링 함수
const filterEvents = (
  events: DiningEvent[],
  filters: DiningFilters,
  filteredRestaurantIds: string[]
): DiningEvent[] => {
  if (!filters.isFiltering) return events;

  return events.filter((event) => {
    // 활성 이벤트만 표시
    if (!event.isActive) {
      return false;
    }

    // 필터링된 레스토랑에 속한 이벤트만 표시
    if (filteredRestaurantIds.length > 0 && !filteredRestaurantIds.includes(event.restaurantId)) {
      return false;
    }

    // 검색어 필터
    if (filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase();
      const titleMatch = event.title.toLowerCase().includes(query);
      const subtitleMatch = event.subtitle.toLowerCase().includes(query);
      const descriptionMatch = event.description.toLowerCase().includes(query);
      const tagsMatch = event.tags.some((tag) => tag.toLowerCase().includes(query));

      if (!(titleMatch || subtitleMatch || descriptionMatch || tagsMatch)) {
        return false;
      }
    }

    return true;
  });
};

// Zustand 스토어 생성
export const useDiningStore = create<DiningStore>((set, get) => ({
  filters: initialFilters,
  filteredRestaurants: [],
  filteredEvents: [],
  restaurants: [],
  events: [],

  updateFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),

  setSearchQuery: (query) =>
    set((state) => ({
      filters: {
        ...state.filters,
        searchQuery: query,
      },
    })),

  resetFilters: () =>
    set((state) => ({
      filters: initialFilters,
      filteredRestaurants: state.restaurants,
      filteredEvents: state.events,
    })),

  applyFilters: () =>
    set((state) => {
      const updatedFilters = {
        ...state.filters,
        isFiltering: true,
      };

      const filteredRestaurants = filterRestaurants(state.restaurants, updatedFilters);
      const filteredRestaurantIds = filteredRestaurants.map((r) => r.id.toString());
      const filteredEvents = filterEvents(state.events, updatedFilters, filteredRestaurantIds);

      return {
        filters: updatedFilters,
        filteredRestaurants,
        filteredEvents,
      };
    }),

  setRestaurants: (restaurants) =>
    set((state) => {
      const filteredRestaurants = state.filters.isFiltering
        ? filterRestaurants(restaurants, state.filters)
        : restaurants;

      return {
        restaurants,
        filteredRestaurants,
      };
    }),

  setEvents: (events) =>
    set((state) => {
      const filteredRestaurantIds = state.filteredRestaurants.map((r) => r.id.toString());
      const filteredEvents = state.filters.isFiltering
        ? filterEvents(events, state.filters, filteredRestaurantIds)
        : events;

      return {
        events,
        filteredEvents,
      };
    }),
}));
