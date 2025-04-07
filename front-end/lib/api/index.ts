/**
 * API 모듈 인덱스 파일
 */
import apiClient from './client';
import { diningApi } from './dining';
import mockAdapter from './mock-adapter';

// 개발 환경에서 목업 어댑터 설정
if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
  mockAdapter.setup(apiClient.getAxiosInstance());
}

// API 모듈 내보내기
const api = {
  dining: diningApi,
};

export default api;
