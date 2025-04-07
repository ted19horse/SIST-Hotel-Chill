import { OPERATING_HOURS } from '../constants/hours';
import { Restaurant, SpecialEvent } from '../types/restaurant';

// 특별 이벤트 데이터
const SPECIAL_EVENTS: Record<string, SpecialEvent> = {
  LIVE_MUSIC: {
    id: 'live-music',
    name: '라이브 뮤직',
    description: '재즈, 어쿠스틱 음악 등 편안한 라이브 공연',
    days: ['FRIDAY', 'SATURDAY'],
    startTime: '19:00',
    endTime: '22:00',
    isRegular: true,
  },
};

export const restaurants: Restaurant[] = [
  {
    id: 'chill-bites',
    name: '칠 바이츠',
    type: 'CHILL_BITES',
    description:
      '건강한 로컬 식재료 중심의 올데이 다이닝. 신선한 재료와 정성어린 조리법으로 건강한 맛을 선사합니다.',
    operatingHours: OPERATING_HOURS.CHILL_BITES,
    capacity: {
      total: 120,
      indoor: 120,
      details: '20 four-person tables, 20 two-person tables',
    },
    features: ['ALL_DAY_DINING', 'LOCAL_INGREDIENTS', 'GARDEN_VIEW'],
    images: [
      '/images/dining/chill-bites/main.jpg',
      '/images/dining/chill-bites/interior.jpg',
      '/images/dining/chill-bites/food.jpg',
    ],
    location: '1층 중앙, 가든 뷰',
    reservationPolicy: {
      required: false,
      recommendedFor: '6인 이상 단체는 예약 권장',
    },
    dressCode: 'CASUAL',
    floorLevel: '1층',
    viewType: '정원 전경',
    isOpen: true,
  },
  {
    id: 'chill-garden',
    name: '칠 가든',
    type: 'CHILL_GARDEN',
    description:
      '가든 뷰가 있는 야외 테라스를 갖춘 캐주얼 다이닝. 자연과 함께하는 여유로운 식사를 즐길 수 있습니다.',
    operatingHours: OPERATING_HOURS.CHILL_GARDEN,
    capacity: {
      total: 80,
      indoor: 50,
      terrace: 30,
      details: '실내 50명, 테라스 30명',
    },
    features: ['LOCAL_INGREDIENTS', 'GARDEN_VIEW', 'TERRACE'],
    images: [
      '/images/dining/chill-garden/main.jpg',
      '/images/dining/chill-garden/interior.jpg',
      '/images/dining/chill-garden/food.jpg',
    ],
    location: '가든 레벨, 실내 및 야외 테라스',
    reservationPolicy: {
      required: false,
      recommendedFor: '주말 및 공휴일은 예약 권장',
      specialNotes: '테라스 좌석은 날씨에 따라 운영',
    },
    dressCode: 'SMART_CASUAL',
    floorLevel: '가든 레벨',
    viewType: '정원 전경',
    isOpen: true,
  },
  {
    id: 'chill-elegance',
    name: '칠 엘레강스',
    type: 'CHILL_ELEGANCE',
    description:
      '고급 모던 한식 및 퓨전 요리. 최상층에서 파노라마 뷰를 감상하며 프리미엄 식사 경험을 제공합니다.',
    operatingHours: OPERATING_HOURS.CHILL_ELEGANCE,
    capacity: {
      total: 40,
      indoor: 40,
    },
    features: ['PREMIUM_DINING', 'PANORAMA_VIEW'],
    images: [
      '/images/dining/chill-elegance/main.jpg',
      '/images/dining/chill-elegance/interior.jpg',
      '/images/dining/chill-elegance/food.jpg',
    ],
    location: '최상층, 파노라마 뷰',
    reservationPolicy: {
      required: true,
      advanceTime: '최소 1일 전',
    },
    dressCode: 'SMART_CASUAL',
    exclusiveFor: ['CHILL_FAMILY_SUITE', 'CHILL_LAKE_SUITE', 'ULTIMATE_CHILL_SUITE'],
    floorLevel: '최상층',
    viewType: '파노라마 전경',
    isOpen: true,
  },
  {
    id: 'chill-moments',
    name: '칠 모먼츠',
    type: 'CHILL_MOMENTS',
    description:
      '티 타임, 가벼운 식사, 칵테일을 즐길 수 있는 공간. 낮에는 여유로운 라운지, 밤에는 활기찬 바로 변신합니다.',
    operatingHours: OPERATING_HOURS.CHILL_MOMENTS,
    capacity: {
      total: 60,
      indoor: 60,
      bar: 10,
      lounge: 50,
      details: '바 좌석 10석, 라운지 좌석 50석',
    },
    features: ['LOUNGE', 'BAR', 'LIVE_MUSIC', 'GARDEN_VIEW'],
    images: [
      '/images/dining/chill-moments/main.jpg',
      '/images/dining/chill-moments/interior.jpg',
      '/images/dining/chill-moments/cocktails.jpg',
    ],
    location: '로비 인접, 정원 뷰',
    reservationPolicy: {
      required: false,
      recommendedFor: '애프터눈 티는 예약 권장',
    },
    dressCode: 'SMART_CASUAL',
    specialEvents: [SPECIAL_EVENTS.LIVE_MUSIC],
    floorLevel: '로비층',
    viewType: '정원 전경',
    isOpen: true,
  },
];
