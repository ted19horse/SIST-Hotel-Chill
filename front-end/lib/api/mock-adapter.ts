import { mockEvents } from '@/data/dining/mock/events';
import { restaurants } from '@/data/dining/restaurants';
import { ApiResponse, PaginatedResponse } from '@/types/api/common';
import { GetRestaurantsOptions } from '@/types/api/dining';
import { Event } from '@/types/dining/event';
import { Restaurant } from '@/types/dining/restaurant';
import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

/**
 * API 목업 어댑터 클래스
 * 개발 환경에서 실제 API 서버 없이 테스트할 수 있도록 목업 데이터를 제공합니다.
 */
class MockAdapter {
  private static instance: MockAdapter;
  private mockDelay: number = 300; // 응답 지연 시간 (ms)

  private constructor() {}

  public static getInstance(): MockAdapter {
    if (!MockAdapter.instance) {
      MockAdapter.instance = new MockAdapter();
    }
    return MockAdapter.instance;
  }

  /**
   * Axios 인스턴스에 목업 어댑터를 설정합니다.
   * @param axiosInstance Axios 인스턴스
   */
  public setup(axiosInstance: AxiosInstance): void {
    // 요청 인터셉터 설정
    axiosInstance.interceptors.request.use(
      async (config) => {
        // 개발 환경에서만 목업 데이터 사용
        if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
          const mockResponse = await this.handleMockRequest(config);
          if (mockResponse) {
            // 목업 응답이 있으면 요청을 중단하고 응답을 반환
            return {
              ...config,
              adapter: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(mockResponse);
                  }, this.mockDelay);
                });
              },
            };
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  /**
   * 목업 요청을 처리합니다.
   * @param config Axios 요청 설정
   * @returns 목업 응답 또는 null
   */
  private async handleMockRequest(
    config: InternalAxiosRequestConfig
  ): Promise<AxiosResponse | null> {
    const { url, method, params } = config;
    const lowerMethod = (method || 'get').toLowerCase();

    // URL 패턴에 따라 다른 목업 응답 생성
    if (url?.startsWith('/api/dining/restaurants') && lowerMethod === 'get') {
      if (url === '/api/dining/restaurants') {
        // 레스토랑 목록 조회
        return this.getMockRestaurants(params as GetRestaurantsOptions);
      } else {
        // 레스토랑 상세 조회
        const id = url.split('/').pop();
        if (id) {
          return this.getMockRestaurantDetail(parseInt(id, 10));
        }
      }
    } else if (url?.startsWith('/api/dining/events') && lowerMethod === 'get') {
      if (url === '/api/dining/events') {
        // 이벤트 목록 조회
        return this.getMockEvents(params);
      } else if (url.includes('/restaurant/')) {
        // 레스토랑별 이벤트 조회
        const restaurantId = url.split('/restaurant/').pop();
        if (restaurantId) {
          return this.getMockEventsByRestaurant(restaurantId);
        }
      } else {
        // 이벤트 상세 조회
        const id = url.split('/').pop();
        if (id) {
          return this.getMockEventDetail(id);
        }
      }
    }

    // 매칭되는 목업 응답이 없으면 null 반환
    return null;
  }

  /**
   * 레스토랑 목록 조회 목업 응답을 생성합니다.
   */
  private getMockRestaurants(options?: GetRestaurantsOptions): AxiosResponse {
    let filtered = [...restaurants];

    // 필터링 로직
    if (options) {
      if (options.mealTime && options.mealTime !== 'all') {
        filtered = filtered.filter((r) => r.tags.includes(options.mealTime as string));
      }

      if (options.diningStyle && options.diningStyle !== 'all') {
        filtered = filtered.filter((r) => r.tags.includes(options.diningStyle as string));
      }

      if (options.searchQuery) {
        const query = options.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (r) =>
            r.name.toLowerCase().includes(query) ||
            r.concept.toLowerCase().includes(query) ||
            r.description.toLowerCase().includes(query) ||
            r.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }
    }

    // 페이지네이션
    const page = options?.page || 1;
    const size = options?.size || 10;
    const totalElements = filtered.length;
    const totalPages = Math.ceil(totalElements / size);
    const startIndex = (page - 1) * size;
    const paginatedData = filtered.slice(startIndex, startIndex + size);

    // API 응답 형식으로 포장
    const response: PaginatedResponse<Restaurant> = {
      status: 200,
      success: true,
      data: paginatedData,
      message: '레스토랑 목록을 성공적으로 조회했습니다.',
      timestamp: new Date().toISOString(),
      pagination: {
        page,
        size,
        totalElements,
        totalPages,
      },
    };

    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
      data: response,
    };
  }

  /**
   * 레스토랑 상세 조회 목업 응답을 생성합니다.
   */
  private getMockRestaurantDetail(id: number): AxiosResponse {
    const restaurant = restaurants.find((r) => r.id === id);

    if (!restaurant) {
      return {
        status: 404,
        statusText: 'Not Found',
        headers: {},
        config: {} as any,
        data: {
          status: 404,
          success: false,
          message: '해당 레스토랑을 찾을 수 없습니다.',
          timestamp: new Date().toISOString(),
        },
      };
    }

    const response: ApiResponse<Restaurant> = {
      status: 200,
      success: true,
      data: restaurant,
      message: '레스토랑 정보를 성공적으로 조회했습니다.',
      timestamp: new Date().toISOString(),
    };

    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
      data: response,
    };
  }

  /**
   * 이벤트 목록 조회 목업 응답을 생성합니다.
   */
  private getMockEvents(options?: any): AxiosResponse {
    let filtered = [...mockEvents];

    // 필터링 로직
    if (options) {
      if (options.isActive !== undefined) {
        filtered = filtered.filter((e) => e.isActive === options.isActive);
      }

      if (options.category) {
        filtered = filtered.filter((e) => e.category === options.category);
      }

      if (options.searchQuery) {
        const query = options.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (e) =>
            e.title.toLowerCase().includes(query) ||
            e.subtitle.toLowerCase().includes(query) ||
            e.description.toLowerCase().includes(query) ||
            e.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }
    }

    // 페이지네이션
    const page = options?.page || 1;
    const size = options?.size || 10;
    const totalElements = filtered.length;
    const totalPages = Math.ceil(totalElements / size);
    const startIndex = (page - 1) * size;
    const paginatedData = filtered.slice(startIndex, startIndex + size);

    // API 응답 형식으로 포장
    const response: PaginatedResponse<Event> = {
      status: 200,
      success: true,
      data: paginatedData,
      message: '이벤트 목록을 성공적으로 조회했습니다.',
      timestamp: new Date().toISOString(),
      pagination: {
        page,
        size,
        totalElements,
        totalPages,
      },
    };

    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
      data: response,
    };
  }

  /**
   * 레스토랑별 이벤트 조회 목업 응답을 생성합니다.
   */
  private getMockEventsByRestaurant(restaurantId: string): AxiosResponse {
    const filtered = mockEvents.filter((e) => e.restaurantId === restaurantId && e.isActive);

    const response: ApiResponse<Event[]> = {
      status: 200,
      success: true,
      data: filtered,
      message: '레스토랑 이벤트 목록을 성공적으로 조회했습니다.',
      timestamp: new Date().toISOString(),
    };

    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
      data: response,
    };
  }

  /**
   * 이벤트 상세 조회 목업 응답을 생성합니다.
   */
  private getMockEventDetail(id: string): AxiosResponse {
    const event = mockEvents.find((e) => e.id === id);

    if (!event) {
      return {
        status: 404,
        statusText: 'Not Found',
        headers: {},
        config: {} as any,
        data: {
          status: 404,
          success: false,
          message: '해당 이벤트를 찾을 수 없습니다.',
          timestamp: new Date().toISOString(),
        },
      };
    }

    const response: ApiResponse<Event> = {
      status: 200,
      success: true,
      data: event,
      message: '이벤트 정보를 성공적으로 조회했습니다.',
      timestamp: new Date().toISOString(),
    };

    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
      data: response,
    };
  }
}

// 싱글톤 인스턴스 내보내기
const mockAdapter = MockAdapter.getInstance();
export default mockAdapter;
