import {
  Membership,
  MembershipBenefit,
  MembershipOffer,
  PointTransaction,
} from '@/lib/types/my-account';

/**
 * 멤버십 더미데이터
 */
export const mockMembership: Membership = {
  membershipId: 1,
  userId: 1,
  membershipTier: 'CHILL_FLOW',
  points: 25000,
  totalStays: 5,
  totalSpending: 2500000,
  membershipNumber: 'CHF2024001',
  tierProgress: 75,
  pointsToNextTier: 50000,
  nextTierThreshold: 100000,
  pointExpiryDate: '2024-12-31',
  pointConversionRate: 0.01, // 1원당 0.01포인트
};

/**
 * 포인트 내역 더미데이터
 */
export const mockPointTransactions: PointTransaction[] = [
  {
    transactionId: 1,
    userId: 1,
    points: 1000,
    referenceId: 101,
    referenceType: 'ROOM_RESERVATION',
    transactionType: 'EARNED',
    transactionDate: '2024-03-15',
    description: '객실 예약 포인트 적립',
    expiryDate: '2025-03-15',
    conversionRate: 0.01,
  },
  {
    transactionId: 2,
    userId: 1,
    points: -500,
    referenceId: 201,
    referenceType: 'DINING_RESERVATION',
    transactionType: 'REDEEMED',
    transactionDate: '2024-03-10',
    description: '레스토랑 예약 포인트 사용',
    conversionRate: 0.01,
  },
];

/**
 * 멤버십 등급별 혜택 더미데이터
 */
export const mockMembershipBenefits: MembershipBenefit[] = [
  {
    benefitId: 1,
    membershipTier: 'CHILL_FLOW',
    benefitType: 'ROOM',
    discountPercentage: 15,
    description: '객실 할인 15%',
    terms: '주말 및 공휴일 제외',
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    isActive: true,
  },
  {
    benefitId: 2,
    membershipTier: 'CHILL_FLOW',
    benefitType: 'DINING',
    discountPercentage: 10,
    description: '레스토랑 할인 10%',
    terms: '주말 및 공휴일 제외',
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    isActive: true,
  },
];

/**
 * 특별 오퍼 더미데이터
 */
export const mockMembershipOffers: MembershipOffer[] = [
  {
    id: 'OFFER001',
    title: '주말 패키지',
    description: '2박 3일 주말 패키지',
    pointsRequired: 50000,
    validUntil: '2024-04-30',
    image: '/images/offers/weekend-package.jpg',
    terms: '주말(금,토,일) 이용 가능',
    category: 'ROOM',
    isActive: true,
  },
  {
    id: 'OFFER002',
    title: '스파 크레딧',
    description: '스파 서비스 50,000원 크레딧',
    pointsRequired: 30000,
    validUntil: '2024-04-30',
    image: '/images/offers/spa-credit.jpg',
    terms: '3개월 이내 사용',
    category: 'SPA',
    isActive: true,
  },
];

/**
 * MembershipRewards 컴포넌트에서 사용하는 등급별 혜택 리스트
 */
export const membershipBenefits = {
  CHILL_BREEZE: [
    '객실 이용 시 10% 할인 (주중)',
    '레스토랑 이용 시 5% 할인',
    '웰컴 드링크 제공',
    '체크인 시 웰컴 기프트',
    '수영장 무료 이용',
    '피트니스 센터 무료 이용',
  ],
  CHILL_FLOW: [
    '객실 이용 시 15% 할인 (주중)',
    '레스토랑 이용 시 10% 할인',
    '웰컴 드링크 제공',
    '체크인 시 웰컴 기프트',
    '수영장 및 사우나 무료 이용',
    '피트니스 센터 무료 이용',
    '무료 발렛 파킹',
    '스파 트리트먼트 10% 할인',
  ],
  DEEP_CHILL: [
    '객실 이용 시 20% 할인',
    '레스토랑 이용 시 15% 할인',
    '웰컴 드링크 및 프리미엄 스낵 제공',
    '체크인 시 프리미엄 웰컴 기프트',
    '수영장, 사우나, 스파 무료 이용',
    '피트니스 센터 무료 이용',
    '무료 발렛 파킹',
    '스파 트리트먼트 20% 할인',
    '룸 업그레이드 (가용 시)',
    '레이트 체크아웃 (오후 2시까지)',
    '전용 컨시어지 서비스',
  ],
};

// 기존 데이터들도 export
export const userMembership = mockMembership;
export const pointsHistory = mockPointTransactions;
export const availableOffers = mockMembershipOffers;
