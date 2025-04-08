import { PointsUsageInfo } from '@/lib/types/membership';

/**
 * 포인트 사용 안내 더미 데이터
 */
export const pointsUsageInfo: PointsUsageInfo = {
  redemptionRatio: 100, // 100포인트 = 1,000원
  minRedemption: 1000, // 최소 1,000포인트부터 사용 가능
  validityMonths: 24, // 유효기간 24개월

  bonusOptions: [
    {
      title: '직접 예약',
      description: '웹사이트나 앱을 통한 직접 예약 시 10% 추가 포인트',
      bonusAmount: '+10%',
    },
    {
      title: '장기 숙박',
      description: '5박 이상 연속 숙박 시 15% 추가 포인트',
      bonusAmount: '+15%',
    },
    {
      title: '친구 추천',
      description: '친구 추천 시 추천인에게 1,000 포인트 지급',
      bonusAmount: '1,000 포인트',
    },
    {
      title: '가입 기념일',
      description: '가입 기념일 숙박 시 해당 숙박의 2배 포인트 적립',
      bonusAmount: '2배 포인트',
    },
    {
      title: '시즌 프로모션',
      description: '특별 시즌 프로모션 기간 동안 추가 포인트 적립',
      bonusAmount: '시즌별 상이',
    },
  ],

  redeemOptions: [
    {
      title: '객실 요금',
      description: '객실 요금 결제에 포인트 사용 (1,000 포인트 = 10,000원)',
      conversionRate: '1,000 포인트 = ₩10,000',
    },
    {
      title: '다이닝 결제',
      description: '호텔 내 레스토랑 및 바에서 포인트로 결제',
      conversionRate: '1,000 포인트 = ₩10,000',
    },
    {
      title: '스파 트리트먼트',
      description: '스파 서비스 이용 시 포인트로 결제',
      conversionRate: '1,000 포인트 = ₩10,000',
    },
    {
      title: '기프트샵',
      description: '기프트샵 상품 구매 시 포인트 사용',
      conversionRate: '1,000 포인트 = ₩10,000',
    },
    {
      title: '등급 업그레이드',
      description: '포인트를 사용하여 멤버십 등급 업그레이드',
      pointsNeeded: 20000, // Chill Breeze → Chill Flow
    },
    {
      title: '프리미엄 등급 업그레이드',
      description: 'Chill Flow에서 Deep Chill로 등급 업그레이드',
      pointsNeeded: 50000, // Chill Flow → Deep Chill
    },
  ],
};

/**
 * 포인트 거래 이력 더미 데이터 (특정 사용자용)
 */
export const dummyPointTransactions = [
  {
    id: 1001,
    userId: 1,
    points: 300,
    referenceId: 5001,
    referenceType: 'RESERVATION',
    transactionType: 'EARN',
    transactionDate: '2025-04-05T15:30:00Z',
    description: '스탠다드 룸 1박 숙박으로 적립 (Deep Chill 등급)',
  },
  {
    id: 1002,
    userId: 1,
    points: 500,
    referenceId: 6001,
    referenceType: 'DINING',
    transactionType: 'EARN',
    transactionDate: '2025-04-06T19:45:00Z',
    description: '다이닝 이용으로 포인트 적립 (₩150,000)',
  },
  {
    id: 1003,
    userId: 1,
    points: 1000,
    referenceType: 'SYSTEM',
    transactionType: 'BONUS',
    transactionDate: '2025-04-10T09:00:00Z',
    description: '친구 추천 보너스',
  },
  {
    id: 1004,
    userId: 1,
    points: -2000,
    referenceId: 7001,
    referenceType: 'SPA',
    transactionType: 'REDEEM',
    transactionDate: '2025-04-15T14:20:00Z',
    description: '스파 트리트먼트 결제에 포인트 사용',
  },
  {
    id: 1005,
    userId: 1,
    points: 600,
    referenceId: 5002,
    referenceType: 'RESERVATION',
    transactionType: 'EARN',
    transactionDate: '2025-05-01T16:00:00Z',
    description: '디럭스 룸 2박 숙박으로 적립 (Deep Chill 등급)',
  },
];

/**
 * 포인트 적립 정책 더미 데이터
 */
export const pointsEarningRates = [
  {
    tier: 'CHILL_BREEZE',
    pointsPerStay: 100,
    pointsPerSpend: 0.01, // 1,000원당 10포인트
  },
  {
    tier: 'CHILL_FLOW',
    pointsPerStay: 200,
    pointsPerSpend: 0.015, // 1,000원당 15포인트
  },
  {
    tier: 'DEEP_CHILL',
    pointsPerStay: 300,
    pointsPerSpend: 0.02, // 1,000원당 20포인트
  },
];
