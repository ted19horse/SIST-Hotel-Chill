/**
 * API 모듈 인덱스 파일
 */
import apiClient from './client';
import { diningApi } from './dining';
import * as giftShopApi from './gift-shop';
import membershipApi from './membership';
import mockAdapter from './mock-adapter';
import myAccountApi from './my-account';

// 개발 환경에서 목업 어댑터 설정
if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
  mockAdapter.setup(apiClient.getAxiosInstance());
}

// API 모듈 내보내기
const api = {
  dining: diningApi,
  giftShop: giftShopApi,
  membership: membershipApi,
  myAccount: myAccountApi,
};

export default api;
