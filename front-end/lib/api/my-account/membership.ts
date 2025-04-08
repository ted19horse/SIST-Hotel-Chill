import {
  availableOffers,
  pointsHistory,
  userMembership,
} from '@/lib/mock-data/my-account/membership';
import { Membership, MembershipOffer, PointTransaction } from '@/types/my-account';

/**
 * 멤버십 정보 조회 API
 */
export interface GetMembershipRequest {
  userId: number;
}

export interface GetMembershipResponse {
  data: Membership;
  success: boolean;
  message: string;
}

export const getMembership = async ({
  userId,
}: GetMembershipRequest): Promise<GetMembershipResponse> => {
  try {
    // 실제 환경에서는 API 호출
    // const response = await apiClient.get(`/api/my-account/membership/${userId}`);
    // return response.data;

    // 개발 환경에서는 더미데이터 반환
    return {
      data: userMembership,
      success: true,
      message: 'Membership data retrieved successfully',
    };
  } catch (error) {
    console.error('Error fetching membership data:', error);
    throw error;
  }
};

/**
 * 포인트 내역 조회 API
 */
export interface GetPointsHistoryRequest {
  userId: number;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  transactionType?: string;
}

export interface GetPointsHistoryResponse {
  data: {
    points: PointTransaction[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  success: boolean;
  message: string;
}

export const getPointsHistory = async ({
  userId,
  page = 1,
  limit = 10,
  startDate,
  endDate,
  transactionType,
}: GetPointsHistoryRequest): Promise<GetPointsHistoryResponse> => {
  try {
    // 실제 환경에서는 API 호출
    // const response = await apiClient.get(`/api/my-account/membership/${userId}/points-history`, {
    //   params: { page, limit, startDate, endDate, transactionType },
    // });
    // return response.data;

    // 개발 환경에서는 더미데이터 반환
    // 필터링 로직 적용
    let filteredPoints = [...pointsHistory];

    if (startDate) {
      filteredPoints = filteredPoints.filter(
        (p) => new Date(p.transactionDate) >= new Date(startDate)
      );
    }

    if (endDate) {
      filteredPoints = filteredPoints.filter(
        (p) => new Date(p.transactionDate) <= new Date(endDate)
      );
    }

    if (transactionType) {
      filteredPoints = filteredPoints.filter((p) => p.transactionType === transactionType);
    }

    // 페이지네이션 적용
    const total = filteredPoints.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedPoints = filteredPoints.slice(startIndex, startIndex + limit);

    return {
      data: {
        points: paginatedPoints,
        total,
        page,
        limit,
        totalPages,
      },
      success: true,
      message: 'Points history retrieved successfully',
    };
  } catch (error) {
    console.error('Error fetching points history:', error);
    throw error;
  }
};

/**
 * 특별 오퍼 조회 API
 */
export interface GetMembershipOffersRequest {
  userId: number;
  tier?: string;
}

export interface GetMembershipOffersResponse {
  data: MembershipOffer[];
  success: boolean;
  message: string;
}

export const getMembershipOffers = async ({
  userId,
  tier,
}: GetMembershipOffersRequest): Promise<GetMembershipOffersResponse> => {
  try {
    // 실제 환경에서는 API 호출
    // const response = await apiClient.get(`/api/my-account/membership/${userId}/offers`, {
    //   params: { tier },
    // });
    // return response.data;

    // 개발 환경에서는 더미데이터 반환
    let filteredOffers = [...availableOffers];

    // 등급별 필터링 로직이 필요한 경우 여기에 구현

    return {
      data: filteredOffers,
      success: true,
      message: 'Membership offers retrieved successfully',
    };
  } catch (error) {
    console.error('Error fetching membership offers:', error);
    throw error;
  }
};
