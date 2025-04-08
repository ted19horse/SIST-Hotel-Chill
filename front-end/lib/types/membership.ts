/**
 * 멤버십 등급 타입
 */
export type MembershipTier = 'CHILL_BREEZE' | 'CHILL_FLOW' | 'DEEP_CHILL';

/**
 * 멤버십 등급 정보 타입
 */
export interface MembershipTierInfo {
  id: string;
  name: string;
  level: string;
  requirements: string[];
  benefits: string[];
  pointsPerNight: number;
  color: string;
  iconColor: string;
  icon?: any; // 컴포넌트에서 직접 아이콘 매핑
}

/**
 * 사용자 멤버십 정보 타입
 */
export interface MembershipUser {
  userId: number;
  membershipId: number;
  tier: MembershipTier;
  points: number;
  totalStays: number;
  totalSpending: number;
  membershipNumber: string;
  joinDate: string;
  tierUpdateDate: string;
}

/**
 * 포인트 거래 타입
 */
export type PointTransactionType = 'EARN' | 'REDEEM' | 'EXPIRE' | 'BONUS' | 'TIER_UPGRADE';

/**
 * 포인트 거래 참조 타입
 */
export type PointReferenceType =
  | 'RESERVATION'
  | 'DINING'
  | 'SPA'
  | 'GIFT_SHOP'
  | 'MANUAL'
  | 'SYSTEM';

/**
 * 포인트 거래 내역 타입
 */
export interface PointTransaction {
  id: number;
  userId: number;
  points: number;
  referenceId?: number;
  referenceType?: PointReferenceType;
  transactionType: PointTransactionType;
  transactionDate: string;
  description: string;
}

/**
 * 멤버십 특별 이벤트 타입
 */
export interface SpecialEvent {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  eligibleTiers: MembershipTier[];
  pointsBonus?: number;
  discountPercent?: number;
  location?: string;
  status: 'UPCOMING' | 'ACTIVE' | 'PAST';
  registrationUrl?: string;
}

/**
 * 멤버십 사용자 후기 타입
 */
export interface Testimonial {
  id: number;
  name: string;
  tier: MembershipTier;
  comment: string;
  rating: number;
  avatarUrl?: string;
  date: string;
}

/**
 * 멤버십 FAQ 타입
 */
export interface MembershipFaq {
  id: number;
  question: string;
  answer: string;
  category: 'GENERAL' | 'TIERS' | 'POINTS' | 'BENEFITS';
}

/**
 * 포인트 사용 안내 타입
 */
export interface PointsUsageInfo {
  redemptionRatio: number; // 포인트 : 원 비율 (예: 100 = 100포인트당 1,000원)
  minRedemption: number; // 최소 사용 가능 포인트
  validityMonths: number; // 유효기간(월)
  bonusOptions: {
    title: string;
    description: string;
    bonusAmount: string;
  }[];
  redeemOptions: {
    title: string;
    description: string;
    pointsNeeded?: number;
    conversionRate?: string;
  }[];
}

/**
 * 멤버십 등급별 할인 혜택 타입
 */
export interface MembershipDiscount {
  tier: MembershipTier;
  benefitType: 'ROOM' | 'DINING' | 'SPA' | 'GIFT_SHOP';
  discountPercentage: number;
}

/**
 * 멤버십 등록 폼 데이터 타입
 */
export interface MembershipRegistrationFormData {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  preferredContactMethod: 'EMAIL' | 'PHONE' | 'SMS';
  receivePromotions: boolean;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}
