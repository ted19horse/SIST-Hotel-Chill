/**
 * 다이닝 리뷰 관련 타입 정의
 */

// 리뷰 응답 타입
export interface ReviewResponse {
  content: string;
  respondentName: string;
  respondentPosition: string;
  createdAt: string; // ISO 형식 날짜 (YYYY-MM-DDThh:mm:ssZ)
}

// 다이닝 리뷰 인터페이스
export interface DiningReview {
  id: string;
  restaurantId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  visitDate: string; // ISO 형식 날짜 (YYYY-MM-DD)
  images: string[];
  likes: number;
  helpful: number;
  createdAt: string; // ISO 형식 날짜 (YYYY-MM-DDThh:mm:ssZ)
  updatedAt: string; // ISO 형식 날짜 (YYYY-MM-DDThh:mm:ssZ)
  isVerified: boolean;
  response?: ReviewResponse;
}

// 리뷰 생성 요청 타입
export interface ReviewCreateRequest {
  restaurantId: string;
  rating: number;
  title: string;
  content: string;
  visitDate: string;
  images?: string[];
}

// 리뷰 업데이트 요청 타입
export interface ReviewUpdateRequest {
  id: string;
  rating?: number;
  title?: string;
  content?: string;
  visitDate?: string;
  images?: string[];
}

// 리뷰 필터 타입
export interface ReviewFilter {
  restaurantId?: string;
  minRating?: number;
  maxRating?: number;
  isVerified?: boolean;
  sortBy?: 'newest' | 'highest_rating' | 'lowest_rating' | 'most_helpful';
}
