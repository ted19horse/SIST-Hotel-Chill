import { ApiResponse, PaginatedResponse } from '@/types/api/common';
import {
  AvailableTime,
  CreateReservationRequest,
  GetAvailableTimesOptions,
  GetRestaurantEventsParams,
  GetRestaurantParams,
  GetRestaurantsOptions,
  Reservation,
} from '@/types/api/dining';
import { Event } from '@/types/dining/event';
import { Restaurant } from '@/types/dining/restaurant';
import axios from 'axios';
import { restaurantMenus } from '../data/dining/menus';
import { restaurants } from '../data/dining/restaurants';
import { ReservationFormData } from '../types/reservation';
import { DietaryRestriction } from '../types/restaurant';
import apiClient from './client';

/**
 * 다이닝 관련 API 서비스
 */
export const diningApi = {
  /**
   * 레스토랑 목록을 조회합니다.
   * @param options 필터링 및 페이지네이션 옵션
   * @returns 레스토랑 목록 및 페이지네이션 정보
   */
  getRestaurants: async (
    options?: GetRestaurantsOptions
  ): Promise<PaginatedResponse<Restaurant>> => {
    const response = await apiClient.get<PaginatedResponse<Restaurant>>('/api/dining/restaurants', {
      params: options,
    });
    return response;
  },

  /**
   * 레스토랑 상세 정보를 조회합니다.
   * @param params 레스토랑 ID
   * @returns 레스토랑 상세 정보
   */
  getRestaurant: async (params: GetRestaurantParams): Promise<ApiResponse<Restaurant>> => {
    const response = await apiClient.get<ApiResponse<Restaurant>>(
      `/api/dining/restaurants/${params.id}`
    );
    return response;
  },

  /**
   * 모든 이벤트를 조회합니다.
   * @param options 필터링 및 페이지네이션 옵션
   * @returns 이벤트 목록 및 페이지네이션 정보
   */
  getEvents: async (options?: any): Promise<PaginatedResponse<Event>> => {
    const response = await apiClient.get<PaginatedResponse<Event>>('/api/dining/events', {
      params: options,
    });
    return response;
  },

  /**
   * 특정 레스토랑의 이벤트를 조회합니다.
   * @param params 레스토랑 ID 및 옵션
   * @returns 해당 레스토랑의 이벤트 목록
   */
  getRestaurantEvents: async (params: GetRestaurantEventsParams): Promise<ApiResponse<Event[]>> => {
    const response = await apiClient.get<ApiResponse<Event[]>>(
      `/api/dining/events/restaurant/${params.restaurantId}`,
      {
        params: { includeInactive: params.includeInactive },
      }
    );
    return response;
  },

  /**
   * 이벤트 상세 정보를 조회합니다.
   * @param id 이벤트 ID
   * @returns 이벤트 상세 정보
   */
  getEvent: async (id: string): Promise<ApiResponse<Event>> => {
    const response = await apiClient.get<ApiResponse<Event>>(`/api/dining/events/${id}`);
    return response;
  },

  /**
   * 예약 가능한 시간을 조회합니다.
   * @param options 레스토랑 ID, 날짜, 인원수
   * @returns 예약 가능한 시간 목록
   */
  getAvailableTimes: async (
    options: GetAvailableTimesOptions
  ): Promise<ApiResponse<AvailableTime[]>> => {
    const response = await apiClient.get<ApiResponse<AvailableTime[]>>(
      '/api/dining/reservations/available-times',
      {
        params: options,
      }
    );
    return response;
  },

  /**
   * 예약을 생성합니다.
   * @param data 예약 정보
   * @returns 생성된 예약 정보
   */
  createReservation: async (data: CreateReservationRequest): Promise<ApiResponse<Reservation>> => {
    const response = await apiClient.post<ApiResponse<Reservation>>(
      '/api/dining/reservations',
      data
    );
    return response;
  },

  /**
   * 예약을 조회합니다.
   * @param id 예약 ID
   * @returns 예약 정보
   */
  getReservation: async (id: string): Promise<ApiResponse<Reservation>> => {
    const response = await apiClient.get<ApiResponse<Reservation>>(
      `/api/dining/reservations/${id}`
    );
    return response;
  },

  /**
   * 예약을 취소합니다.
   * @param id 예약 ID
   * @returns 취소 결과
   */
  cancelReservation: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/api/dining/reservations/${id}`);
    return response;
  },
};

// API 기본 URL 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

// 다이닝 API 관련 경로
const DINING_API = {
  RESTAURANTS: `${API_BASE_URL}/dining/restaurants`,
  MENUS: `${API_BASE_URL}/dining/menus`,
  RESERVATIONS: `${API_BASE_URL}/dining/reservations`,
};

// API 클라이언트 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 다이닝 API 서비스
 */
const diningService = {
  /**
   * 모든 레스토랑 정보 조회
   */
  getRestaurants: async () => {
    try {
      // 실제 API 연동 코드
      // const response = await apiClient.get(DINING_API.RESTAURANTS);
      // return response.data;

      // 목업 데이터 반환 (API 연동 전까지 사용)
      return { data: restaurants };
    } catch (error) {
      console.error('레스토랑 정보 조회 실패:', error);
      throw error;
    }
  },

  /**
   * 레스토랑 ID로 레스토랑 상세 정보 조회
   */
  getRestaurantById: async (id: string) => {
    try {
      // 실제 API 연동 코드
      // const response = await apiClient.get(`${DINING_API.RESTAURANTS}/${id}`);
      // return response.data;

      // 목업 데이터 반환 (API 연동 전까지 사용)
      const restaurant = restaurants.find((r) => r.id === id);
      if (!restaurant) {
        throw new Error('레스토랑을 찾을 수 없습니다.');
      }
      return { data: restaurant };
    } catch (error) {
      console.error(`레스토랑 ID: ${id} 정보 조회 실패:`, error);
      throw error;
    }
  },

  /**
   * 레스토랑 ID로 메뉴 정보 조회
   */
  getMenusByRestaurantId: async (restaurantId: string) => {
    try {
      // 실제 API 연동 코드
      // const response = await apiClient.get(`${DINING_API.MENUS}?restaurantId=${restaurantId}`);
      // return response.data;

      // 목업 데이터 반환 (API 연동 전까지 사용)
      const menus = restaurantMenus[restaurantId as keyof typeof restaurantMenus];
      if (!menus) {
        throw new Error('메뉴 정보를 찾을 수 없습니다.');
      }
      return { data: menus };
    } catch (error) {
      console.error(`레스토랑 ID: ${restaurantId} 메뉴 조회 실패:`, error);
      throw error;
    }
  },

  /**
   * 레스토랑 검색 및 필터링
   */
  searchRestaurants: async (params: {
    query?: string;
    cuisine?: string[];
    priceRange?: string[];
    features?: string[];
    mealTime?: string;
    dietaryRestrictions?: DietaryRestriction[];
  }) => {
    try {
      // 실제 API 연동 코드
      // const response = await apiClient.get(DINING_API.RESTAURANTS, { params });
      // return response.data;

      // 목업 데이터에서 필터링 (API 연동 전까지 사용)
      let filteredRestaurants = [...restaurants];

      // 검색어 필터링
      if (params.query) {
        const term = params.query.toLowerCase();
        filteredRestaurants = filteredRestaurants.filter(
          (restaurant) =>
            restaurant.name.toLowerCase().includes(term) ||
            restaurant.concept.toLowerCase().includes(term) ||
            restaurant.description.toLowerCase().includes(term) ||
            restaurant.cuisine.toLowerCase().includes(term) ||
            restaurant.location.toLowerCase().includes(term)
        );
      }

      // 요리 종류 필터링
      if (params.cuisine?.length) {
        filteredRestaurants = filteredRestaurants.filter((restaurant) =>
          params.cuisine!.some((cuisine) =>
            restaurant.cuisine.toLowerCase().includes(cuisine.toLowerCase())
          )
        );
      }

      // 가격대 필터링
      if (params.priceRange?.length) {
        filteredRestaurants = filteredRestaurants.filter((restaurant) =>
          params.priceRange!.includes(restaurant.priceRange)
        );
      }

      // 특별 기능 필터링
      if (params.features?.length) {
        filteredRestaurants = filteredRestaurants.filter((restaurant) =>
          params.features!.some((feature) => restaurant.features?.includes(feature))
        );
      }

      return { data: filteredRestaurants };
    } catch (error) {
      console.error('레스토랑 검색 실패:', error);
      throw error;
    }
  },

  /**
   * 예약 가능한 시간 조회
   */
  getAvailableTimes: async (restaurantId: string, date: string, partySize: number) => {
    try {
      // 실제 API 연동 코드
      // const response = await apiClient.get(
      //   `${DINING_API.RESTAURANTS}/${restaurantId}/available-times`,
      //   { params: { date, partySize } }
      // );
      // return response.data;

      // 목업 데이터 반환 (API 연동 전까지 사용)
      // 레스토랑별 예약 가능 시간 설정
      const availableTimes: Record<string, string[]> = {
        'chill-bites': ['11:30', '12:00', '12:30', '13:00', '18:00', '18:30', '19:00', '19:30'],
        'chill-garden': ['11:30', '12:00', '12:30', '13:00', '18:00', '18:30', '19:00', '19:30'],
        'chill-elegance': ['18:00', '18:30', '19:00', '19:30', '20:00'],
        'chill-moments': ['10:30', '11:00', '14:00', '14:30', '15:00', '18:00', '18:30', '19:00'],
      };

      return {
        data: {
          date,
          restaurantId,
          partySize,
          availableTimes: availableTimes[restaurantId] || [],
        },
      };
    } catch (error) {
      console.error('예약 가능 시간 조회 실패:', error);
      throw error;
    }
  },

  /**
   * 예약 생성
   */
  createReservation: async (formData: ReservationFormData) => {
    try {
      // 실제 API 연동 코드
      // const response = await apiClient.post(DINING_API.RESERVATIONS, formData);
      // return response.data;

      // 목업 데이터 생성 (API 연동 전까지 사용)
      const mockReservationId = `RES-${Date.now().toString().substr(-6)}`;

      return {
        data: {
          id: mockReservationId,
          restaurantId: formData.restaurantId,
          date: formData.date,
          time: formData.time,
          partySize: formData.partySize,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          specialRequests: formData.specialRequests,
          status: 'CONFIRMED',
          createdAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('예약 생성 실패:', error);
      throw error;
    }
  },

  /**
   * 예약 상세 정보 조회
   */
  getReservationById: async (reservationId: string) => {
    try {
      // 실제 API 연동 코드
      // const response = await apiClient.get(`${DINING_API.RESERVATIONS}/${reservationId}`);
      // return response.data;

      // 목업 데이터 반환 (API 연동 전까지 사용)
      // 실제 앱에서는 임시 예약 정보가 아닌 실제 DB 데이터 사용
      return {
        data: {
          id: reservationId,
          restaurantId: 'chill-bites',
          date: new Date().toISOString(),
          time: '19:00',
          partySize: 2,
          name: '홍길동',
          email: 'hong@example.com',
          phone: '010-1234-5678',
          specialRequests: '',
          status: 'CONFIRMED',
          createdAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error(`예약 ID: ${reservationId} 조회 실패:`, error);
      throw error;
    }
  },

  /**
   * 예약 취소
   */
  cancelReservation: async (reservationId: string) => {
    try {
      // 실제 API 연동 코드
      // const response = await apiClient.delete(`${DINING_API.RESERVATIONS}/${reservationId}`);
      // return response.data;

      // 목업 응답 (API 연동 전까지 사용)
      return {
        data: {
          id: reservationId,
          status: 'CANCELLED',
          cancelledAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error(`예약 ID: ${reservationId} 취소 실패:`, error);
      throw error;
    }
  },
};

export default diningService;
