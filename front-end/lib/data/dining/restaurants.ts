import { Restaurant } from '@/lib/stores/reservationStore';

/**
 * 다이닝 레스토랑 목업 데이터
 * (Dining.md 문서 기준으로 업데이트)
 */
export const restaurants: (Restaurant & {
  slug: string;
  images?: string[];
  description?: string;
  cuisine?: string;
  features?: string[];
  priceRange?: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isOpen?: boolean;
  floor?: string;
  phone?: string;
  email?: string;
  dresscode?: string;
  capacity?: {
    total: number;
    indoor?: number;
    outdoor?: number;
    bar?: number;
    lounge?: number;
  };
  specialEvents?: Array<{
    name: string;
    description: string;
    startDate?: string;
    endDate?: string;
    time?: string;
    days?: string[];
  }>;
  exclusiveFor?: string[];
})[] = [
  {
    id: 'chill-bites',
    slug: 'chill-bites',
    name: 'Chill Bites',
    location: '1층 중앙',
    floor: '1층',
    concept: '건강한 로컬 식재료 중심의 올데이 다이닝',
    description:
      '하루 종일 건강한 식사를 즐길 수 있는 올데이 다이닝 레스토랑입니다. 유기농 로컬 식재료를 중심으로 건강하고 영양 가득한 요리를 제공합니다.',
    cuisine: '올데이 다이닝',
    features: ['건강식', '로컬 식재료', '가든 뷰'],
    priceRange: '₩₩',
    rating: 4.5,
    reviewCount: 120,
    isOpen: true,
    phone: '02-1234-5678',
    email: 'chillbites@chillhaven.com',
    dresscode: '캐주얼',
    capacity: {
      total: 120,
      indoor: 120,
    },
    openingHours: [
      { dayOfWeek: '월요일', open: '06:30', close: '22:30' },
      { dayOfWeek: '화요일', open: '06:30', close: '22:30' },
      { dayOfWeek: '수요일', open: '06:30', close: '22:30' },
      { dayOfWeek: '목요일', open: '06:30', close: '22:30' },
      { dayOfWeek: '금요일', open: '06:30', close: '22:30' },
      { dayOfWeek: '토요일', open: '06:30', close: '22:30' },
      { dayOfWeek: '일요일', open: '06:30', close: '22:30' },
    ],
    reservationPolicy: {
      minPartySize: 1,
      maxPartySize: 8,
      reservationRequired: false,
      cancellationPolicy: '6인 이상 단체는 예약 권장',
    },
  },
  {
    id: 'chill-garden',
    slug: 'chill-garden',
    name: 'Chill Garden',
    location: '가든 레벨',
    floor: '가든 레벨',
    concept: '가든 뷰가 있는 야외 테라스를 갖춘 캐주얼 다이닝',
    description: '가든 뷰가 있는 야외 테라스에서 캐주얼한 다이닝을 즐길 수 있는 공간입니다.',
    cuisine: '캐주얼 다이닝',
    features: ['야외 테라스', '가든 뷰'],
    priceRange: '₩₩',
    rating: 4.6,
    reviewCount: 80,
    isOpen: true,
    phone: '02-1234-5679',
    email: 'chillgarden@chillhaven.com',
    dresscode: '캐주얼',
    capacity: {
      total: 80,
      indoor: 50,
      outdoor: 30,
    },
    openingHours: [
      { dayOfWeek: '월요일', open: '11:30', close: '22:00' },
      { dayOfWeek: '화요일', open: '11:30', close: '22:00' },
      { dayOfWeek: '수요일', open: '11:30', close: '22:00' },
      { dayOfWeek: '목요일', open: '11:30', close: '22:00' },
      { dayOfWeek: '금요일', open: '11:30', close: '22:00' },
      { dayOfWeek: '토요일', open: '11:30', close: '22:00' },
      { dayOfWeek: '일요일', open: '11:30', close: '22:00' },
    ],
    reservationPolicy: {
      minPartySize: 1,
      maxPartySize: 8,
      reservationRequired: false,
      cancellationPolicy: '주말 및 공휴일은 예약 권장',
    },
  },
  {
    id: 'chill-elegance',
    slug: 'chill-elegance',
    name: 'Chill Elegance',
    location: '최상층',
    floor: '최상층',
    concept: '고급 모던 한식 및 퓨전 요리',
    description:
      '최상층에서 파노라마 뷰와 함께 고급 모던 한식과 퓨전 요리를 즐길 수 있는 프리미엄 다이닝입니다.',
    cuisine: '모던 한식, 퓨전',
    features: ['파노라마 뷰', '프리미엄 다이닝'],
    priceRange: '₩₩₩₩',
    rating: 4.9,
    reviewCount: 40,
    isOpen: true,
    phone: '02-1234-5680',
    email: 'chillelegance@chillhaven.com',
    dresscode: '스마트 캐주얼',
    capacity: {
      total: 40,
      indoor: 40,
    },
    openingHours: [
      { dayOfWeek: '월요일', open: '18:00', close: '22:00' },
      { dayOfWeek: '화요일', open: '18:00', close: '22:00' },
      { dayOfWeek: '수요일', open: '18:00', close: '22:00' },
      { dayOfWeek: '목요일', open: '18:00', close: '22:00' },
      { dayOfWeek: '금요일', open: '18:00', close: '22:00' },
      { dayOfWeek: '토요일', open: '18:00', close: '22:00' },
      { dayOfWeek: '일요일', open: '18:00', close: '22:00' },
    ],
    reservationPolicy: {
      minPartySize: 1,
      maxPartySize: 8,
      reservationRequired: true,
      cancellationPolicy: '최소 1일 전 예약 필수',
    },
    exclusiveFor: ['Chill Family Suite', 'Chill Lake Suite', 'Ultimate Chill Suite'],
  },
  {
    id: 'chill-moments',
    slug: 'chill-moments',
    name: 'Chill Moments',
    location: '로비 인접',
    floor: '1층',
    concept: '티 타임, 가벼운 식사, 칵테일을 즐길 수 있는 공간',
    description:
      '로비 인접한 곳에서 정원 뷰와 함께 티 타임, 가벼운 식사, 칵테일을 즐길 수 있는 라운지 & 바입니다.',
    cuisine: '라운지 & 바',
    features: ['정원 뷰', '라이브 뮤직'],
    priceRange: '₩₩',
    rating: 4.7,
    reviewCount: 60,
    isOpen: true,
    phone: '02-1234-5681',
    email: 'chillmoments@chillhaven.com',
    dresscode: '스마트 캐주얼',
    capacity: {
      total: 60,
      indoor: 60,
      bar: 10,
      lounge: 50,
    },
    openingHours: [
      { dayOfWeek: '월요일', open: '10:00', close: '24:00' },
      { dayOfWeek: '화요일', open: '10:00', close: '24:00' },
      { dayOfWeek: '수요일', open: '10:00', close: '24:00' },
      { dayOfWeek: '목요일', open: '10:00', close: '24:00' },
      { dayOfWeek: '금요일', open: '10:00', close: '24:00' },
      { dayOfWeek: '토요일', open: '10:00', close: '24:00' },
      { dayOfWeek: '일요일', open: '10:00', close: '24:00' },
    ],
    reservationPolicy: {
      minPartySize: 1,
      maxPartySize: 8,
      reservationRequired: false,
      cancellationPolicy: '애프터눈 티는 예약 권장',
    },
    specialEvents: [
      {
        name: '라이브 뮤직',
        description: '재즈, 어쿠스틱 음악 등 편안한 라이브 공연',
        days: ['금요일', '토요일'],
        time: '19:00 - 22:00',
      },
    ],
  },
];

export default restaurants;
