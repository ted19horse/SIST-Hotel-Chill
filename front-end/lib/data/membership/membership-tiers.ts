import { MembershipTierInfo } from '@/lib/types/membership';

/**
 * 멤버십 등급 정보 더미 데이터
 * 실제 사용 시 아이콘은 컴포넌트에서 매핑해야 함
 */
export const membershipTiers: MembershipTierInfo[] = [
  {
    id: 'chill-breeze',
    name: 'Chill Breeze',
    level: 'Basic',
    requirements: ['무료 회원가입'],
    benefits: [
      '객실 요금 5% 할인',
      '웰컴 드링크 제공',
      '기프트샵 5% 할인',
      '생일 특별 혜택 (웰컴 디저트)',
      '디지털 뉴스레터 구독',
      '모바일 체크인/체크아웃',
      '회원 전용 프로모션 접근권',
      '객실 1박당 Chill 포인트 100점 적립',
    ],
    pointsPerNight: 100,
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-500',
  },
  {
    id: 'chill-flow',
    name: 'Chill Flow',
    level: 'Intermediate',
    requirements: ['연간 누적 숙박 3박 이상', '연간 호텔 내 누적 소비금액 100만원 이상'],
    benefits: [
      '객실 요금 10% 할인',
      '레이트 체크아웃 (오후 2시까지, 가능 시)',
      '다이닝 이용 금액 5% 할인',
      '스파 트리트먼트 10% 할인',
      '기프트샵 10% 할인',
      '룸 업그레이드 1회 (가능 시, 연간)',
      '웰컴 어메니티 업그레이드',
      '요가/명상 클래스 1회 무료 (연간)',
      '객실 1박당 Chill 포인트 200점 적립',
    ],
    pointsPerNight: 200,
    color: 'bg-teal-50 border-teal-200',
    iconColor: 'text-teal-500',
  },
  {
    id: 'deep-chill',
    name: 'Deep Chill',
    level: 'Premium',
    requirements: [
      '연간 누적 숙박 5박 이상',
      '연간 호텔 내 누적 소비금액 300만원 이상',
      'Ultimate Chill Suite 1박 이상 숙박',
    ],
    benefits: [
      '객실 요금 15% 할인',
      '아얼리 체크인 (오전 11시부터)/레이트 체크아웃 (오후 4시까지) (가능 시)',
      '다이닝 이용 금액 10% 할인',
      '스파 트리트먼트 20% 할인',
      '기프트샵 15% 할인',
      '특별 감사 선물 (연 1회)',
      'VIP 컨시어지 서비스',
      '멤버 전용 이벤트 초대',
      '프라이빗 카바나 2시간 무료 이용 (연간 1회)',
      'Chill Elegance 레스토랑 우선 예약권',
      '특별 기념일 케이크 및 샴페인 서비스 (예약 시 요청 가능)',
      '객실 1박당 Chill 포인트 300점 적립',
    ],
    pointsPerNight: 300,
    color: 'bg-purple-50 border-purple-200',
    iconColor: 'text-purple-500',
  },
];

/**
 * 멤버십 등급별 할인율 정보 (사용 시 백엔드 API로 대체)
 */
export const membershipDiscounts = [
  { tier: 'CHILL_BREEZE', benefitType: 'ROOM', discountPercentage: 5 },
  { tier: 'CHILL_BREEZE', benefitType: 'GIFT_SHOP', discountPercentage: 5 },

  { tier: 'CHILL_FLOW', benefitType: 'ROOM', discountPercentage: 10 },
  { tier: 'CHILL_FLOW', benefitType: 'DINING', discountPercentage: 5 },
  { tier: 'CHILL_FLOW', benefitType: 'SPA', discountPercentage: 10 },
  { tier: 'CHILL_FLOW', benefitType: 'GIFT_SHOP', discountPercentage: 10 },

  { tier: 'DEEP_CHILL', benefitType: 'ROOM', discountPercentage: 15 },
  { tier: 'DEEP_CHILL', benefitType: 'DINING', discountPercentage: 10 },
  { tier: 'DEEP_CHILL', benefitType: 'SPA', discountPercentage: 20 },
  { tier: 'DEEP_CHILL', benefitType: 'GIFT_SHOP', discountPercentage: 15 },
];
