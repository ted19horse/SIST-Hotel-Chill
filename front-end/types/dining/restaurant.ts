/**
 * 다이닝 레스토랑 관련 타입 정의
 */

// 레스토랑 타입 정의
export interface Restaurant {
  id: number;
  name: string;
  concept: string;
  description: string;
  hours: string;
  location: string;
  capacity: {
    total: number;
    details?: string;
  };
  tags: string[];
  images: string[];
  policy: string[];
  restrictions?: string;
  menuCategories: MenuCategory[];
  featuredDishes: string[];
  beveragePairings?: BeveragePairing[];
  isExclusive?: boolean;
  exclusiveFor?: string[];
}

// 메뉴 카테고리 타입 정의
export interface MenuCategory {
  name: string;
  description?: string;
  hours?: string;
  price?: number;
  items: MenuItem[];
}

// 메뉴 아이템 타입 정의
export interface MenuItem {
  name: string;
  description?: string;
  price?: number | string;
  perPerson?: boolean;
  allergens?: string[];
  isVegetarian?: boolean;
  isSignature?: boolean;
}

// 음료 페어링 타입 정의
export interface BeveragePairing {
  name: string;
  description: string;
  price: number;
  isAlcoholic: boolean;
}

// 레스토랑 개방 시간 타입 정의
export interface OperatingHours {
  breakfast?: {
    start: string;
    end: string;
  };
  lunch?: {
    start: string;
    end: string;
  };
  dinner?: {
    start: string;
    end: string;
  };
  brunch?: {
    start: string;
    end: string;
    daysAvailable: (
      | 'monday'
      | 'tuesday'
      | 'wednesday'
      | 'thursday'
      | 'friday'
      | 'saturday'
      | 'sunday'
    )[];
  };
  bar?: {
    start: string;
    end: string;
  };
}

// 예약 정책 타입 정의
export interface ReservationPolicy {
  isRequired: boolean;
  advanceBooking: string; // e.g. "최소 2시간 전"
  maxPartySize: number;
  cancellationPolicy: string;
  specialNotes?: string;
}

// 레스토랑 필터 타입 정의
export interface RestaurantFilter {
  mealTime?: 'all' | 'breakfast' | 'lunch' | 'dinner';
  diningStyle?: 'all' | 'casual' | 'specialty' | 'premium';
  searchQuery?: string;
}
