import api from '@/lib/api';
import { Membership, MembershipOffer, PointTransaction } from '@/lib/types/my-account';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

/**
 * 멤버십 정보를 로드하는 훅
 */
export function useMembership(userId?: number, options?: UseQueryOptions<Membership, Error>) {
  return useQuery<Membership, Error>({
    queryKey: ['membership', userId],
    queryFn: async () => {
      if (!userId) throw new Error('User ID is required');
      const response = await api.myAccount.membership.getMembership({ userId });
      return response.data;
    },
    enabled: !!userId,
    ...options,
  });
}

/**
 * 포인트 내역을 로드하는 훅
 */
export interface UsePointsHistoryParams {
  userId?: number;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  transactionType?: string;
}

export function usePointsHistory(
  { userId, page = 1, limit = 10, startDate, endDate, transactionType }: UsePointsHistoryParams,
  options?: UseQueryOptions<
    {
      points: PointTransaction[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    },
    Error
  >
) {
  return useQuery<
    {
      points: PointTransaction[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    },
    Error
  >({
    queryKey: ['points-history', userId, page, limit, startDate, endDate, transactionType],
    queryFn: async () => {
      if (!userId) throw new Error('User ID is required');
      const response = await api.myAccount.membership.getPointsHistory({
        userId,
        page,
        limit,
        startDate,
        endDate,
        transactionType,
      });
      return response.data;
    },
    enabled: !!userId,
    ...options,
  });
}

/**
 * 멤버십 특별 오퍼를 로드하는 훅
 */
export function useMembershipOffers(
  userId?: number,
  tier?: string,
  options?: UseQueryOptions<MembershipOffer[], Error>
) {
  return useQuery<MembershipOffer[], Error>({
    queryKey: ['membership-offers', userId, tier],
    queryFn: async () => {
      if (!userId) throw new Error('User ID is required');
      const response = await api.myAccount.membership.getMembershipOffers({ userId, tier });
      return response.data;
    },
    enabled: !!userId,
    ...options,
  });
}
