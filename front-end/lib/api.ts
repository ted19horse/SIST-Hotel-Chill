import { ReservationFormData } from './stores/reservationStore';
import { Restaurant, TimeSlot } from './types/restaurant';

/**
 * API 기본 URL 설정
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * API 클라이언트 설정
 */
const apiClient = {
  /**
   * 기본 API 요청 함수
   */
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  /**
   * GET 요청
   */
  get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  },

  /**
   * POST 요청
   */
  post<T>(endpoint: string, data: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * PUT 요청
   */
  put<T>(endpoint: string, data: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * DELETE 요청
   */
  delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  },
};

/**
 * 다이닝 관련 API
 */
const diningApi = {
  /**
   * 모든 레스토랑 가져오기
   */
  getRestaurants(): Promise<Restaurant[]> {
    return apiClient.get<Restaurant[]>('/dining/restaurants');
  },

  /**
   * 특정 레스토랑 정보 가져오기
   */
  getRestaurant(id: string | number): Promise<Restaurant> {
    return apiClient.get<Restaurant>(`/dining/restaurants/${id}`);
  },

  /**
   * 특정 날짜의 예약 가능 시간 슬롯 가져오기
   */
  getAvailableTimeSlots(
    restaurantId: string | number,
    date: string,
    partySize: number
  ): Promise<TimeSlot[]> {
    return apiClient.get<TimeSlot[]>(
      `/dining/restaurants/${restaurantId}/availability?date=${date}&partySize=${partySize}`
    );
  },

  /**
   * 예약 생성하기
   */
  createReservation(data: ReservationFormData): Promise<{ id: string; status: string }> {
    return apiClient.post<{ id: string; status: string }>('/dining/reservations', data);
  },

  /**
   * 예약 정보 가져오기
   */
  getReservation(id: string, email: string): Promise<any> {
    return apiClient.get<any>(`/dining/reservations/${id}?email=${encodeURIComponent(email)}`);
  },

  /**
   * 예약 취소하기
   */
  cancelReservation(id: string): Promise<{ success: boolean; message: string }> {
    return apiClient.delete<{ success: boolean; message: string }>(`/dining/reservations/${id}`);
  },
};

/**
 * API 클라이언트 객체
 */
const api = {
  dining: diningApi,
};

export default api;
