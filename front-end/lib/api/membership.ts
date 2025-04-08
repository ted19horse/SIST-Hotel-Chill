import {
  MembershipDiscount,
  MembershipFaq,
  MembershipRegistrationFormData,
  MembershipTier,
  MembershipTierInfo,
  MembershipUser,
  PointTransaction,
  SpecialEvent,
  Testimonial,
} from '@/lib/types/membership';
import apiClient from './client';

/**
 * 멤버십 관련 API
 */
const membershipApi = {
  /**
   * 멤버십 등급 정보 조회
   */
  getMembershipTiers(): Promise<MembershipTierInfo[]> {
    return apiClient.get<MembershipTierInfo[]>('/membership/tiers');
  },

  /**
   * 사용자의 멤버십 정보 조회
   */
  getUserMembership(userId: number): Promise<MembershipUser> {
    return apiClient.get<MembershipUser>(`/membership/users/${userId}`);
  },

  /**
   * 사용자의 포인트 정보 조회
   */
  getMembershipPoints(userId: number): Promise<{ points: number }> {
    return apiClient.get<{ points: number }>(`/membership/users/${userId}/points`);
  },

  /**
   * 사용자의 포인트 거래 내역 조회
   */
  getPointsHistory(
    userId: number,
    page = 1,
    limit = 10
  ): Promise<{
    transactions: PointTransaction[];
    totalPages: number;
    currentPage: number;
  }> {
    return apiClient.get<{
      transactions: PointTransaction[];
      totalPages: number;
      currentPage: number;
    }>(`/membership/users/${userId}/points/history?page=${page}&limit=${limit}`);
  },

  /**
   * 멤버십 등록
   */
  registerMembership(data: MembershipRegistrationFormData): Promise<{
    success: boolean;
    membershipId: number;
    membershipNumber: string;
    tier: MembershipTier;
  }> {
    return apiClient.post<{
      success: boolean;
      membershipId: number;
      membershipNumber: string;
      tier: MembershipTier;
    }>('/membership/register', data);
  },

  /**
   * 멤버십 등급 업그레이드
   */
  upgradeMembership(
    userId: number,
    tier: MembershipTier
  ): Promise<{
    success: boolean;
    previousTier: MembershipTier;
    newTier: MembershipTier;
    pointsUsed: number;
  }> {
    return apiClient.post<{
      success: boolean;
      previousTier: MembershipTier;
      newTier: MembershipTier;
      pointsUsed: number;
    }>(`/membership/users/${userId}/upgrade`, { tier });
  },

  /**
   * 특별 이벤트 정보 조회
   */
  getSpecialEvents(status?: 'UPCOMING' | 'ACTIVE' | 'PAST'): Promise<SpecialEvent[]> {
    const statusParam = status ? `?status=${status}` : '';
    return apiClient.get<SpecialEvent[]>(`/membership/events${statusParam}`);
  },

  /**
   * 특별 이벤트 참가 신청
   */
  registerForEvent(
    userId: number,
    eventId: number
  ): Promise<{
    success: boolean;
    registrationId: number;
  }> {
    return apiClient.post<{
      success: boolean;
      registrationId: number;
    }>(`/membership/events/${eventId}/register`, { userId });
  },

  /**
   * 멤버십 할인 정보 조회
   */
  getMembershipDiscounts(tier?: MembershipTier): Promise<MembershipDiscount[]> {
    const tierParam = tier ? `?tier=${tier}` : '';
    return apiClient.get<MembershipDiscount[]>(`/membership/discounts${tierParam}`);
  },

  /**
   * 사용자 후기 조회
   */
  getTestimonials(): Promise<Testimonial[]> {
    return apiClient.get<Testimonial[]>('/membership/testimonials');
  },

  /**
   * 자주 묻는 질문 조회
   */
  getFaqs(category?: string): Promise<MembershipFaq[]> {
    const categoryParam = category ? `?category=${category}` : '';
    return apiClient.get<MembershipFaq[]>(`/membership/faqs${categoryParam}`);
  },

  /**
   * 포인트 사용
   */
  redeemPoints(
    userId: number,
    points: number,
    purpose: string,
    referenceId?: number,
    referenceType?: string
  ): Promise<{
    success: boolean;
    transactionId: number;
    remainingPoints: number;
  }> {
    return apiClient.post<{
      success: boolean;
      transactionId: number;
      remainingPoints: number;
    }>(`/membership/users/${userId}/points/redeem`, {
      points,
      purpose,
      referenceId,
      referenceType,
    });
  },
};

export default membershipApi;
