/**
 * 마이 페이지 관련 타입 정의
 */

// 사용자 타입
export interface User {
  userId: number;
  email: string;
  name: string;
  phone: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  profileImage?: string;
}

// 멤버십 타입
export interface Membership {
  membershipId: number;
  userId: number;
  membershipTier: 'CHILL_BREEZE' | 'CHILL_FLOW' | 'DEEP_CHILL';
  points: number;
  totalStays: number;
  totalSpending: number;
  membershipNumber: string;
  tierProgress?: number; // 프론트엔드 표시용
  pointsToNextTier?: number; // 프론트엔드 표시용
  nextTierThreshold?: number; // 프론트엔드 표시용
  pointExpiryDate?: string; // 포인트 만료일
  pointConversionRate: number; // 포인트 적립률 (1원당 포인트)
}

// 멤버십 혜택 타입
export interface MembershipBenefit {
  benefitId: number;
  membershipTier: string;
  benefitType: 'ROOM' | 'DINING' | 'SPA' | 'GIFT_SHOP' | 'EVENT' | 'PARKING';
  discountPercentage: number;
  description?: string;
  terms?: string; // 혜택 이용 조건
  validFrom?: string; // 혜택 시작일
  validUntil?: string; // 혜택 종료일
  isActive: boolean; // 혜택 활성화 여부
}

// 포인트 트랜잭션 타입
export interface PointTransaction {
  transactionId: number;
  userId: number;
  points: number;
  referenceId?: number;
  referenceType?: string;
  transactionType: 'EARNED' | 'REDEEMED' | 'EXPIRED' | 'ADJUSTED';
  transactionDate: string;
  description: string;
  expiryDate?: string; // 포인트 만료일
  conversionRate?: number; // 적립/사용 시 적용된 환율
}

// 객실 예약 타입
export interface RoomReservation {
  reservationId: number;
  userId: number;
  roomId: number;
  roomType: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
  };
  status: 'CONFIRMED' | 'PENDING' | 'COMPLETED' | 'CANCELLED';
  totalAmount: number;
  paymentMethodId?: number;
  reservationNumber: string;
  cancellationDate?: string;
  cancellationReason?: string;
  specialRequests?: string;
}

// 다이닝 예약 타입
export interface DiningReservation {
  diningReservationId: number;
  userId: number;
  restaurantId: number;
  restaurant: string;
  reservationDate: string;
  guests: number;
  status: 'CONFIRMED' | 'PENDING' | 'COMPLETED' | 'CANCELLED';
  reservationNumber: string;
  tableNumber?: string;
  specialRequests?: string;
  totalAmount?: number;
  cancellationDate?: string;
  cancellationReason?: string;
}

// 결제 수단 타입
export interface PaymentMethod {
  paymentMethodId: number;
  userId: number;
  cardType: string;
  lastFourDigits: string;
  isDefault: boolean;
  cardholderName?: string;
  expiryDate?: string;
}

// 멤버십 특별 오퍼 타입
export interface MembershipOffer {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  validUntil: string;
  image: string;
  terms?: string; // 오퍼 이용 조건
  category?: 'ROOM' | 'DINING' | 'SPA' | 'GIFT_SHOP' | 'EVENT'; // 오퍼 카테고리
  isActive: boolean; // 오퍼 활성화 여부
}

// 사용자 계정 설정 타입
export interface UserPreferences {
  userId: number;
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingCommunications: boolean;
  roomPreferences: {
    preferredFloor?: string;
    preferredView?: string;
    preferredBedType?: string;
    additionalRequests?: string;
  };
}
