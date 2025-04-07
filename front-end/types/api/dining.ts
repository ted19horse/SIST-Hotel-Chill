import { RequestOptions } from './common';

// 레스토랑 목록 조회 요청 옵션
export interface GetRestaurantsOptions extends RequestOptions {
  mealTime?: 'all' | 'breakfast' | 'lunch' | 'dinner';
  diningStyle?: 'all' | 'casual' | 'specialty' | 'premium';
  searchQuery?: string;
}

// 레스토랑 상세 조회 요청 파라미터
export interface GetRestaurantParams {
  id: string | number;
}

// 레스토랑 이벤트 조회 요청 파라미터
export interface GetRestaurantEventsParams {
  restaurantId: string | number;
  includeInactive?: boolean;
}

// 예약 가능 시간 조회 요청 옵션
export interface GetAvailableTimesOptions {
  restaurantId: string | number;
  date: string; // YYYY-MM-DD 형식
  partySize: number;
}

// 예약 가능 시간 조회 응답
export interface AvailableTime {
  time: string; // HH:MM 형식
  available: boolean;
  capacity: number;
  remainingSeats: number;
}

// 예약 생성 요청
export interface CreateReservationRequest {
  restaurantId: string | number;
  date: string; // YYYY-MM-DD 형식
  time: string; // HH:MM 형식
  partySize: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
  tableArea?: string; // 'indoor', 'terrace', 'bar' 등
}

// 예약 조회 응답
export interface Reservation {
  id: string | number;
  restaurantId: string | number;
  restaurantName: string;
  date: string;
  time: string;
  partySize: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
  tableArea?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// 메뉴 카테고리 조회 파라미터
export interface GetMenuCategoriesParams {
  restaurantId: string | number;
}

// 메뉴 카테고리 응답
export interface MenuCategory {
  id: string | number;
  name: string;
  description?: string;
  hours?: string;
  price?: number;
  items: MenuItem[];
}

// 메뉴 아이템 응답
export interface MenuItem {
  id: string | number;
  name: string;
  description?: string;
  price?: number | string;
  perPerson?: boolean;
  allergens?: string[];
  isVegetarian?: boolean;
  isSignature?: boolean;
  imageUrl?: string;
}
