import { mockEvents } from '@/data/dining/mock/events';
import { restaurants } from '@/data/dining/restaurants';
import { membershipFaqs } from '@/lib/data/membership/faqs';
import { membershipDiscounts, membershipTiers } from '@/lib/data/membership/membership-tiers';
import { dummyPointTransactions } from '@/lib/data/membership/points-system';
import { specialEvents } from '@/lib/data/membership/special-events';
import { testimonials } from '@/lib/data/membership/testimonials';
import { MembershipTier } from '@/lib/types/membership';
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
    const { url, method, params, data } = config;
    const lowerMethod = (method || 'get').toLowerCase();

    // 다이닝 관련 목업 응답
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

    // 멤버십 관련 목업 응답
    else if (url?.startsWith('/api/membership/')) {
      if (url === '/api/membership/tiers' && lowerMethod === 'get') {
        // 멤버십 등급 정보 조회
        return this.getMockMembershipTiers();
      } else if (url.match(/\/api\/membership\/users\/\d+$/) && lowerMethod === 'get') {
        // 사용자 멤버십 정보 조회
        const userId = parseInt(url.split('/').pop() || '0', 10);
        return this.getMockUserMembership(userId);
      } else if (url.match(/\/api\/membership\/users\/\d+\/points$/) && lowerMethod === 'get') {
        // 사용자 포인트 정보 조회
        const userId = parseInt(url.split('/').pop() || '0', 10);
        return this.getMockUserPoints(userId);
      } else if (
        url.match(/\/api\/membership\/users\/\d+\/points\/history/) &&
        lowerMethod === 'get'
      ) {
        // 사용자 포인트 내역 조회
        const userId = parseInt(url.split('/users/')[1].split('/')[0], 10);
        return this.getMockPointsHistory(userId, params);
      } else if (url === '/api/membership/register' && lowerMethod === 'post') {
        // 멤버십 등록
        return this.registerMockMembership(JSON.parse(data || '{}'));
      } else if (url.match(/\/api\/membership\/users\/\d+\/upgrade/) && lowerMethod === 'post') {
        // 멤버십 업그레이드
        const userId = parseInt(url.split('/users/')[1].split('/')[0], 10);
        return this.upgradeMockMembership(userId, JSON.parse(data || '{}'));
      } else if (url.match(/\/api\/membership\/events$/) && lowerMethod === 'get') {
        // 특별 이벤트 정보 조회
        return this.getMockSpecialEvents(params);
      } else if (url.match(/\/api\/membership\/events\/\d+\/register/) && lowerMethod === 'post') {
        // 특별 이벤트 참가 신청
        const eventId = parseInt(url.split('/events/')[1].split('/')[0], 10);
        return this.registerMockEvent(eventId, JSON.parse(data || '{}'));
      } else if (url.match(/\/api\/membership\/discounts/) && lowerMethod === 'get') {
        // 멤버십 할인 정보 조회
        return this.getMockMembershipDiscounts(params);
      } else if (url === '/api/membership/testimonials' && lowerMethod === 'get') {
        // 사용자 후기 조회
        return this.getMockTestimonials();
      } else if (url === '/api/membership/faqs' && lowerMethod === 'get') {
        // 자주 묻는 질문 조회
        return this.getMockFaqs(params);
      } else if (
        url.match(/\/api\/membership\/users\/\d+\/points\/redeem/) &&
        lowerMethod === 'post'
      ) {
        // 포인트 사용
        const userId = parseInt(url.split('/users/')[1].split('/')[0], 10);
        return this.redeemMockPoints(userId, JSON.parse(data || '{}'));
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

  /**
   * 멤버십 등급 정보 조회 목업 응답
   */
  private getMockMembershipTiers(): AxiosResponse {
    const response: ApiResponse<typeof membershipTiers> = {
      status: 200,
      success: true,
      data: membershipTiers,
      message: '멤버십 등급 정보를 성공적으로 조회했습니다.',
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
   * 사용자 멤버십 정보 조회 목업 응답
   */
  private getMockUserMembership(userId: number): AxiosResponse {
    // 더미 데이터 생성 (실제 구현 시 데이터베이스에서 조회)
    const mockUserMembership = {
      userId,
      membershipId: 1000 + userId,
      tier: 'DEEP_CHILL' as MembershipTier,
      points: 5000,
      totalStays: 8,
      totalSpending: 3500000,
      membershipNumber: `CH${100000 + userId}`,
      joinDate: '2023-12-15T09:00:00Z',
      tierUpdateDate: '2025-01-10T09:00:00Z',
    };

    const response: ApiResponse<typeof mockUserMembership> = {
      status: 200,
      success: true,
      data: mockUserMembership,
      message: '사용자 멤버십 정보를 성공적으로 조회했습니다.',
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
   * 사용자 포인트 정보 조회 목업 응답
   */
  private getMockUserPoints(userId: number): AxiosResponse {
    const mockPoints = { points: 5000 }; // 더미 데이터

    const response: ApiResponse<typeof mockPoints> = {
      status: 200,
      success: true,
      data: mockPoints,
      message: '사용자 포인트 정보를 성공적으로 조회했습니다.',
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
   * 사용자 포인트 내역 조회 목업 응답
   */
  private getMockPointsHistory(userId: number, params: any): AxiosResponse {
    const page = parseInt(params.page || '1', 10);
    const limit = parseInt(params.limit || '10', 10);

    // 페이지네이션
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = dummyPointTransactions.slice(startIndex, endIndex);

    const response: PaginatedResponse<typeof paginatedData> = {
      status: 200,
      success: true,
      data: paginatedData,
      message: '사용자 포인트 내역을 성공적으로 조회했습니다.',
      timestamp: new Date().toISOString(),
      pagination: {
        page,
        size: limit,
        totalElements: dummyPointTransactions.length,
        totalPages: Math.ceil(dummyPointTransactions.length / limit),
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
   * 멤버십 등록 목업 응답
   */
  private registerMockMembership(data: any): AxiosResponse {
    const mockRegistration = {
      success: true,
      membershipId: Math.floor(Math.random() * 1000) + 1000,
      membershipNumber: `CH${Math.floor(Math.random() * 900000) + 100000}`,
      tier: 'CHILL_BREEZE' as MembershipTier,
    };

    const response: ApiResponse<typeof mockRegistration> = {
      status: 200,
      success: true,
      data: mockRegistration,
      message: '멤버십 등록이 성공적으로 완료되었습니다.',
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
   * 멤버십 업그레이드 목업 응답
   */
  private upgradeMockMembership(userId: number, data: any): AxiosResponse {
    const { tier } = data;

    const mockUpgrade = {
      success: true,
      previousTier: 'CHILL_BREEZE' as MembershipTier,
      newTier: tier as MembershipTier,
      pointsUsed: tier === 'CHILL_FLOW' ? 20000 : 50000,
    };

    const response: ApiResponse<typeof mockUpgrade> = {
      status: 200,
      success: true,
      data: mockUpgrade,
      message: '멤버십 등급이 성공적으로 업그레이드되었습니다.',
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
   * 특별 이벤트 정보 조회 목업 응답
   */
  private getMockSpecialEvents(params: any): AxiosResponse {
    let filteredEvents = [...specialEvents];

    // 상태별 필터링
    if (params.status) {
      filteredEvents = filteredEvents.filter((event) => event.status === params.status);
    }

    const response: ApiResponse<typeof filteredEvents> = {
      status: 200,
      success: true,
      data: filteredEvents,
      message: '특별 이벤트 정보를 성공적으로 조회했습니다.',
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
   * 특별 이벤트 참가 신청 목업 응답
   */
  private registerMockEvent(eventId: number, data: any): AxiosResponse {
    const { userId } = data;

    const mockRegistration = {
      success: true,
      registrationId: Math.floor(Math.random() * 1000) + 1000,
    };

    const response: ApiResponse<typeof mockRegistration> = {
      status: 200,
      success: true,
      data: mockRegistration,
      message: '이벤트 참가 신청이 성공적으로 완료되었습니다.',
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
   * 멤버십 할인 정보 조회 목업 응답
   */
  private getMockMembershipDiscounts(params: any): AxiosResponse {
    let filteredDiscounts = [...membershipDiscounts];

    // 등급별 필터링
    if (params.tier) {
      filteredDiscounts = filteredDiscounts.filter((discount) => discount.tier === params.tier);
    }

    const response: ApiResponse<typeof filteredDiscounts> = {
      status: 200,
      success: true,
      data: filteredDiscounts,
      message: '멤버십 할인 정보를 성공적으로 조회했습니다.',
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
   * 사용자 후기 조회 목업 응답
   */
  private getMockTestimonials(): AxiosResponse {
    const response: ApiResponse<typeof testimonials> = {
      status: 200,
      success: true,
      data: testimonials,
      message: '사용자 후기를 성공적으로 조회했습니다.',
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
   * 자주 묻는 질문 조회 목업 응답
   */
  private getMockFaqs(params: any): AxiosResponse {
    let filteredFaqs = [...membershipFaqs];

    // 카테고리별 필터링
    if (params.category) {
      filteredFaqs = filteredFaqs.filter((faq) => faq.category === params.category);
    }

    const response: ApiResponse<typeof filteredFaqs> = {
      status: 200,
      success: true,
      data: filteredFaqs,
      message: '자주 묻는 질문을 성공적으로 조회했습니다.',
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
   * 포인트 사용 목업 응답
   */
  private redeemMockPoints(userId: number, data: any): AxiosResponse {
    const { points, purpose, referenceId, referenceType } = data;

    const mockRedemption = {
      success: true,
      transactionId: Math.floor(Math.random() * 1000) + 1000,
      remainingPoints: 5000 - points,
    };

    const response: ApiResponse<typeof mockRedemption> = {
      status: 200,
      success: true,
      data: mockRedemption,
      message: '포인트가 성공적으로 사용되었습니다.',
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
