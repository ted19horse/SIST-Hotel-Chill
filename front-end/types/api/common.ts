/**
 * API 공통 타입 정의
 */

// 페이지네이션 관련 타입
export interface Pagination {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// API 성공 응답 타입
export interface ApiResponse<T> {
  status: number;
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

// 페이지네이션된 API 응답 타입
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination;
}

// API 에러 응답 타입
export interface ApiError {
  status: number;
  success: boolean;
  message: string;
  error?: string;
  timestamp: string;
  path?: string;
}

// API 요청 상태
export enum ApiStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

// API 요청 옵션 (필터링, 정렬 등)
export interface RequestOptions {
  page?: number;
  size?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  [key: string]: any;
}
