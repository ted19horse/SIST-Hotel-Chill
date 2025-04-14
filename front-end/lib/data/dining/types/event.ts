/**
 * 다이닝 이벤트 관련 타입 정의
 */

// 이벤트 카테고리 타입
export type EventCategory =
  | 'TASTING' // 테이스팅 이벤트
  | 'SEASONAL' // 시즌 이벤트
  | 'ENTERTAINMENT' // 엔터테인먼트 이벤트
  | 'SPECIAL' // 스페셜 이벤트
  | 'CELEBRATION' // 기념일 이벤트
  | 'BRUNCH' // 브런치 이벤트
  | 'BREAKFAST' // 아침 이벤트
  | 'TEA_TIME'; // 티타임 이벤트

// 이벤트 세부 정보 타입
export interface EventDetail {
  title: string;
  content: string;
}

// 다이닝 이벤트 인터페이스
export interface DiningEvent {
  id: string;
  restaurantId: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  startDate: string; // ISO 형식 날짜 (YYYY-MM-DD)
  endDate: string; // ISO 형식 날짜 (YYYY-MM-DD)
  price: number;
  discountRate: number;
  isActive: boolean;
  category: EventCategory;
  tags: string[];
  details: EventDetail[];
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
}
