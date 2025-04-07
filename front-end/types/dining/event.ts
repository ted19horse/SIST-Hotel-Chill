/**
 * 다이닝 이벤트 관련 타입 정의
 */

// 이벤트 타입 정의
export interface Event {
  id: string;
  restaurantId: string;
  restaurantName?: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  startDate: string; // 'YYYY-MM-DD' 형식
  endDate: string; // 'YYYY-MM-DD' 형식
  price: number;
  originalPrice?: number;
  discountRate: number;
  isActive: boolean;
  category: EventCategory;
  tags: string[];
  details?: EventDetail[];
  maxParticipants?: number;
  currentParticipants?: number;
  bookingDeadline?: string;
  location?: string;
  time?: string;
}

// 이벤트 카테고리 타입
export type EventCategory =
  | 'tasting' // 테이스팅 이벤트
  | 'seasonal' // 시즌 이벤트
  | 'entertainment' // 엔터테인먼트 이벤트
  | 'special' // 스페셜 이벤트
  | 'celebration' // 기념일 이벤트
  | 'brunch' // 브런치 이벤트
  | 'breakfast' // 아침 이벤트
  | 'tea_time'; // 티타임 이벤트

// 이벤트 상세 정보 타입
export interface EventDetail {
  title: string;
  content: string;
}

// 이벤트 필터 타입
export interface EventFilter {
  category?: EventCategory;
  restaurantId?: string;
  isActive?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  searchQuery?: string;
}

// 이벤트 예약 타입
export interface EventBooking {
  id: string;
  eventId: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  participants: number;
  bookingDate: string;
  paymentStatus: 'pending' | 'completed' | 'cancelled';
  specialRequests?: string;
}
