/**
 * 레스토랑 정보 인터페이스
 */
export interface Restaurant {
  id: string | number;
  name: string;
  concept: string;
  description: string;
  location: string;
  cuisine: string;
  priceRange: string;
  image: string;
  images?: string[];

  // 운영 정보
  openingHours: {
    open: string;
    close: string;
    days: string[];
  };

  // 수용 인원 세부 정보
  capacity?: {
    total: number;
    indoor?: number;
    outdoor?: number;
    terrace?: number;
    bar?: number;
    privateRoom?: number;
  };

  // 특별 기능 및 편의 시설
  amenities?: string[];
  features?: string[];

  // 연락처 정보
  contact?: {
    phone: string;
    email: string;
  };

  // 예약 정책
  reservationPolicy?: {
    minPartySize: number;
    maxPartySize: number;
    reservationRequired: boolean;
    cancellationPolicy: string;
    cancellationDeadlineHours: number;
    specialRequests: boolean;
    dressCode: string;
  };

  // 특별 이벤트
  specialEvents?: SpecialEvent[];

  // 메뉴 구성
  menu?: {
    categories: MenuCategory[];
  };
}

/**
 * 특별 이벤트 인터페이스
 */
export interface SpecialEvent {
  id: string | number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  days?: string[];
  time?: {
    start: string;
    end: string;
  };
  image?: string;
  type: 'LIVE_MUSIC' | 'SEASONAL_MENU' | 'SPECIAL_OFFER' | 'PROMOTION';
}

/**
 * 메뉴 카테고리 인터페이스
 */
export interface MenuCategory {
  name: string;
  description?: string;
  mealTime?: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'ALL_DAY' | 'TEA_TIME' | 'BAR';
  timeAvailable?: {
    start: string;
    end: string;
  };
  items: MenuItem[];
}

/**
 * 메뉴 아이템 인터페이스
 */
export interface MenuItem {
  id: string | number;
  name: string;
  description: string;
  price: number;
  image?: string;
  allergens?: string[];
  isVegetarian?: boolean;
  isVegan?: boolean;
  isSignature?: boolean;
  isSpicy?: boolean;
  tags?: string[];
}

/**
 * 예약 가능 시간 슬롯 인터페이스
 */
export interface TimeSlot {
  time: string;
  available: boolean;
}

/**
 * 레스토랑 필터 옵션 인터페이스
 */
export interface RestaurantFilterOptions {
  cuisine?: string[];
  priceRange?: string[];
  features?: string[];
  mealTime?: string;
  dietaryRestrictions?: ('vegetarian' | 'vegan' | 'glutenFree' | 'nutFree')[];
}

/**
 * 알레르기 타입
 */
export type Allergen =
  | 'eggs'
  | 'dairy'
  | 'nuts'
  | 'peanuts'
  | 'shellfish'
  | 'seafood'
  | 'gluten'
  | 'soy'
  | 'wheat';

/**
 * 레스토랑 가격대 타입
 */
export type PriceRange = '$' | '$$' | '$$$' | '$$$$';

/**
 * 메뉴 종류 타입
 */
export type MenuType =
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'all-day'
  | 'dessert'
  | 'drinks'
  | 'wine'
  | 'tea';

/**
 * 식이 제한 타입
 */
export type DietaryRestriction =
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'dairy-free'
  | 'nut-free'
  | 'halal'
  | 'kosher';

/**
 * 레스토랑 필터 옵션 타입
 */
export interface RestaurantFilterOptions {
  cuisine?: string[];
  priceRange?: PriceRange[];
  features?: string[];
  mealTime?: string;
  dietaryRestrictions?: DietaryRestriction[];
}

/**
 * 메뉴 아이템 타입
 */
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency?: string;
  image?: string;
  isSignature?: boolean;
  menuType: MenuType;
  dietaryRestrictions?: DietaryRestriction[];
  ingredients?: string[];
  allergens?: Allergen[];
  isAvailable?: boolean;
  calories?: number;
  spicyLevel?: number; // 0-3 (0: 맵지 않음, 3: 매우 매움)
}

/**
 * 레스토랑 운영 시간 타입
 */
export interface OpeningHours {
  dayOfWeek: string;
  open: string; // HH:MM
  close: string; // HH:MM
  isClosed?: boolean;
}

/**
 * 레스토랑 타입
 */
export interface Restaurant {
  id: string;
  name: string;
  concept: string;
  description: string;
  shortDescription?: string;
  cuisine: string; // 주요 요리 종류 (이탈리안, 한식, 등)
  location: string; // 호텔 내 위치
  floor?: string; // 층수
  phone?: string;
  email?: string;
  priceRange: PriceRange;
  rating?: number; // 평점 (0-5)
  reviewCount?: number; // 리뷰 수
  capacity?: {
    total: number;
    indoor?: number;
    outdoor?: number;
    terrace?: number;
    bar?: number;
    privateRoom?: number;
  };
  images: string[]; // 이미지 URL 배열
  thumbnail: string; // 썸네일 이미지 URL
  features?: string[]; // 특징 (야외 좌석, 라이브 음악, 프라이빗 다이닝 등)
  amenities?: string[];
  openingHours: OpeningHours[];
  menuCategories?: MenuCategory[];
  slug: string; // URL용 슬러그
  isOpen?: boolean; // 현재 운영 중인지 여부
  reservationUrl?: string; // 예약 페이지 URL
  dresscode?: string; // 드레스 코드
  chefName?: string; // 셰프 이름
  chefDescription?: string; // 셰프 소개
  isNew?: boolean; // 새로 오픈한 레스토랑인지 여부
  isPromoted?: boolean; // 프로모션 중인지 여부
  specialEvents?: SpecialEvent[];
  reservationPolicy?: {
    minPartySize: number;
    maxPartySize: number;
    reservationRequired: boolean;
    cancellationPolicy: string;
    cancellationDeadlineHours: number;
    specialRequests: boolean;
  };
}

/**
 * 레스토랑 예약 타입
 */
export interface RestaurantReservation {
  id: string;
  restaurantId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  partySize: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

/**
 * 다이닝 이벤트 타입 (특별 메뉴, 프로모션 등)
 */
export interface DiningEvent {
  id: string;
  title: string;
  description: string;
  restaurantId: string;
  restaurantName?: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  image: string;
  price?: number;
  currency?: string;
  isPromoted?: boolean;
  tags?: string[];
  slug: string;
  detailsUrl?: string;
  bookingUrl?: string;
}

/**
 * 레스토랑 리뷰 타입
 */
export interface RestaurantReview {
  id: string;
  restaurantId: string;
  customerName: string;
  rating: number; // 0-5
  comment: string;
  date: string; // YYYY-MM-DD
  visitDate?: string; // YYYY-MM-DD
  response?: string; // 레스토랑 응답
  responseDate?: string; // YYYY-MM-DD
  isVerified?: boolean; // 인증된 구매자인지 여부
}

/**
 * 레스토랑 관련 타입 정의
 */

/**
 * 가격 범위 타입
 */
export type PriceRange = '₩' | '₩₩' | '₩₩₩' | '₩₩₩₩';

/**
 * 요리 종류 타입
 */
export type CuisineType =
  | '한식'
  | '모던 한식'
  | '일식'
  | '중식'
  | '양식'
  | '이탈리안'
  | '프렌치'
  | '스페인'
  | '아시안'
  | '퓨전'
  | '인터내셔널'
  | '바베큐'
  | '씨푸드'
  | '그릴'
  | '디저트'
  | '베이커리'
  | '카페';

/**
 * 메뉴 종류 타입
 */
export type MenuType =
  | 'BREAKFAST' // 아침 메뉴
  | 'LUNCH' // 점심 메뉴
  | 'DINNER' // 저녁 메뉴
  | 'BRUNCH' // 브런치
  | 'DESSERT' // 디저트
  | 'SNACK' // 스낵
  | 'BEVERAGE' // 음료
  | 'ALCOHOL' // 주류
  | 'COURSE' // 코스 요리
  | 'KIDS' // 키즈 메뉴
  | 'SPECIAL'; // 스페셜 메뉴

/**
 * 식이 제한 타입
 */
export type DietaryRestriction =
  | 'VEGETARIAN' // 채식주의자
  | 'VEGAN' // 비건
  | 'GLUTEN_FREE' // 글루텐 프리
  | 'NUT_FREE' // 견과류 제외
  | 'DAIRY_FREE' // 유제품 제외
  | 'LOW_CALORIE' // 저칼로리
  | 'HALAL' // 할랄
  | 'KOSHER'; // 코셔

/**
 * 알레르기 유형
 */
export type Allergen =
  | 'GLUTEN' // 글루텐
  | 'DAIRY' // 유제품
  | 'EGGS' // 계란
  | 'NUTS' // 견과류
  | 'PEANUTS' // 땅콩
  | 'SHELLFISH' // 갑각류
  | 'FISH' // 생선
  | 'SOY' // 대두
  | 'WHEAT' // 밀
  | 'SESAME' // 참깨
  | 'MOLLUSCS' // 조개류
  | 'CELERY' // 셀러리
  | 'MUSTARD' // 겨자
  | 'LUPIN' // 루핀
  | 'ALCOHOL'; // 알코올

/**
 * 운영 시간 타입
 */
export interface OpeningHours {
  dayOfWeek: string;
  open: string;
  close: string;
  isClosed: boolean;
}

/**
 * 특별 이벤트 타입
 */
export interface SpecialEvent {
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  time?: string;
  days?: string[];
  images?: string[];
  isRegular?: boolean;
}

/**
 * 메뉴 카테고리 타입
 */
export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  timeAvailable?: {
    start: string;
    end: string;
  };
  items: MenuItem[];
}

/**
 * 메뉴 아이템 타입
 */
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency?: string;
  image?: string;
  isSignature?: boolean;
  menuType?: MenuType;
  dietaryRestrictions?: DietaryRestriction[];
  ingredients?: string[];
  allergens?: Allergen[];
  isAvailable?: boolean;
  calories?: number;
  spicyLevel?: number; // 0-3 (0: 맵지 않음, 3: 매우 매움)
}

/**
 * 레스토랑 필터 옵션 타입
 */
export interface RestaurantFilterOptions {
  cuisine?: string[];
  priceRange?: PriceRange[];
  features?: string[];
  mealTime?: string;
  dietaryRestrictions?: DietaryRestriction[];
}

/**
 * 레스토랑 타입
 */
export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  concept: string;
  description: string;
  shortDescription?: string;
  cuisine: string; // 주요 요리 종류 (이탈리안, 한식, 등)
  location: string; // 호텔 내 위치
  floor?: string; // 층수
  phone?: string;
  email?: string;
  priceRange: PriceRange;
  rating?: number; // 평점 (0-5)
  reviewCount?: number; // 리뷰 수
  capacity?: {
    total: number;
    indoor?: number;
    outdoor?: number;
    terrace?: number;
    bar?: number;
    lounge?: number;
    privateRoom?: number;
  };
  images: string[]; // 이미지 URL 배열
  thumbnail: string; // 썸네일 이미지 URL
  features?: string[]; // 특징 (야외 좌석, 라이브 음악, 프라이빗 다이닝 등)
  amenities?: string[];
  openingHours: OpeningHours[];
  menuCategories?: MenuCategory[];
  isOpen?: boolean; // 현재 운영 중인지 여부
  reservationUrl?: string; // 예약 페이지 URL
  dresscode?: string; // 드레스 코드
  chefName?: string; // 셰프 이름
  chefDescription?: string; // 셰프 소개
  isNew?: boolean; // 새로 오픈한 레스토랑인지 여부
  isPromoted?: boolean; // 프로모션 중인지 여부
  specialEvents?: SpecialEvent[];
  exclusiveFor?: string[]; // 특정 객실 타입에만 이용 가능한 경우
  reservationPolicy?: {
    minPartySize: number;
    maxPartySize: number;
    reservationRequired: boolean;
    cancellationPolicy: string;
    cancellationDeadlineHours: number;
    specialRequests: boolean;
  };
}
