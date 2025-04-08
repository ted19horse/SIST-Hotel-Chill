// 이 파일은 삭제되어야 합니다.

// 시설 데이터 타입 정의
export interface Facility {
  id: string;
  name: string;
  category: FacilityCategory;
  location: string;
  operatingHours: string;
  description: string;
  concept: string;
  keyFeatures: string[];
  imageUrl: string;
  requiresReservation: boolean;
  reservationNotice?: string;
  membershipBenefits?: string[];
  mapPosition: {
    x: number;
    y: number;
  };
}

export enum FacilityCategory {
  WELLNESS = '웰니스 & 스파',
  NATURE = '자연 & 아웃도어',
  ENTERTAINMENT = '엔터테인먼트 & 사교',
  BUSINESS = '비즈니스 & 이벤트',
  FAMILY = '패밀리 & 키즈',
}

// 시설 데이터
export const facilities: Facility[] = [
  // 웰니스 & 스파 카테고리
  {
    id: 'wellness-center',
    name: 'Chill Wellness Center',
    category: FacilityCategory.WELLNESS,
    location: '호텔 메인동 1-2층',
    operatingHours: '수영장: 06:00-22:00, 사우나/스팀룸: 07:00-22:00, 피트니스 센터: 24시간',
    description:
      '심신의 휴식과 재충전을 위한 종합 웰니스 공간으로, 현대적인 시설과 자연 친화적인 환경이 조화를 이룹니다.',
    concept: 'Chill',
    keyFeatures: [
      '무한 치킬 풀',
      'Zen Zone',
      '24/7 Chill Fit',
      '마인드 스튜디오',
      'Chill Recovery',
    ],
    imageUrl: '/images/facilities/wellness-center.jpg',
    requiresReservation: false,
    membershipBenefits: ['모든 투숙객 무료 이용'],
    mapPosition: {
      x: 25,
      y: 30,
    },
  },
  {
    id: 'serenity-spa',
    name: 'Chill Serenity Spa',
    category: FacilityCategory.WELLNESS,
    location: '호텔 별관 전용 동',
    operatingHours: '10:00-21:00 (예약제)',
    description: '맞춤형 힐링 트리트먼트를 통한 깊은 휴식 경험을 제공하는 프리미엄 스파입니다.',
    concept: 'Chill',
    keyFeatures: [
      'Just Chill 마사지',
      'Forest Calm',
      'Lake Reflection',
      "Couple's Retreat",
      'Ultimate Chill Experience',
    ],
    imageUrl: '/images/facilities/serenity-spa.jpg',
    requiresReservation: true,
    reservationNotice: '최소 2시간 전 예약 권장',
    membershipBenefits: [
      'Chill Lake Suite: 스파 트리트먼트 30분 무료',
      'Ultimate Chill Suite: 스파 트리트먼트 60분 무료',
    ],
    mapPosition: {
      x: 60,
      y: 50,
    },
  },

  // 자연 & 아웃도어 카테고리
  {
    id: 'nature-chill-zone',
    name: 'Nature Chill Zone',
    category: FacilityCategory.NATURE,
    location: '호텔 외부 정원 및 주변 자연 환경',
    operatingHours: '일출-일몰 (계절에 따라 변동)',
    description:
      '자연 속에서 즐기는 여유로운 힐링 활동을 위한 공간으로, 주변 자연 환경을 최대한 활용하여 설계되었습니다.',
    concept: 'Chill',
    keyFeatures: ['Chill Path', 'Silent Garden', 'Lake Chill Deck', 'Herb Haven', 'Seasonal Chill'],
    imageUrl: '/images/facilities/nature-chill-zone.jpg',
    requiresReservation: false,
    membershipBenefits: ['Ultimate Chill Suite: 프라이빗 카바나 예약 우선권'],
    mapPosition: {
      x: 40,
      y: 15,
    },
  },

  // 엔터테인먼트 & 사교 카테고리
  {
    id: 'chill-lounge',
    name: 'Chill Lounge & Entertainment',
    category: FacilityCategory.ENTERTAINMENT,
    location: '호텔 메인동 3층',
    operatingHours: '09:00-23:00',
    description:
      '사교와 문화적 휴식을 위한 다목적 공간으로, 편안한 분위기에서 다양한 활동을 즐길 수 있습니다.',
    concept: 'Chill',
    keyFeatures: [
      'Book & Chill',
      'Art of Chill',
      'Chill Vibes',
      'Digital Detox Den',
      'Chill Cinema',
    ],
    imageUrl: '/images/facilities/chill-lounge.jpg',
    requiresReservation: false,
    mapPosition: {
      x: 75,
      y: 30,
    },
  },

  // 비즈니스 & 이벤트 카테고리
  {
    id: 'business-chill',
    name: 'Business Chill',
    category: FacilityCategory.BUSINESS,
    location: '호텔 메인동 B1층',
    operatingHours: '24시간 (연회장/미팅룸은 예약제)',
    description: '휴식을 병행하는 업무 및 행사 공간으로, 일과 휴식의 균형을 추구합니다.',
    concept: 'Chill',
    keyFeatures: [
      'Productivity Lounge',
      'Balance Rooms',
      'Harmony Hall',
      'Private Dining Chill',
      '워크 & 치킬(Work & Chill)',
    ],
    imageUrl: '/images/facilities/business-chill.jpg',
    requiresReservation: true,
    reservationNotice: '미팅룸/연회장: 1주일 전 예약 필수',
    mapPosition: {
      x: 30,
      y: 70,
    },
  },

  // 패밀리 & 키즈 카테고리
  {
    id: 'chill-kids',
    name: 'Chill Kids & Family',
    category: FacilityCategory.FAMILY,
    location: '호텔 메인동 B2층',
    operatingHours: '09:00-21:00',
    description:
      '가족 모두가 함께 즐기는 활동과 휴식을 위한 공간으로, 아이들과 함께하는 가족 여행객을 위해 설계되었습니다.',
    concept: 'Chill',
    keyFeatures: [
      'Mini Chill Zone',
      'Family Chill',
      'Splash Chill',
      'Family Retreat Programs',
      'Teen Chill Lounge',
    ],
    imageUrl: '/images/facilities/chill-kids.jpg',
    requiresReservation: true,
    reservationNotice: '키즈 케어 서비스: 4시간 전 예약 필요',
    membershipBenefits: ['Chill Family Suite: 패밀리 액티비티 1회 무료'],
    mapPosition: {
      x: 65,
      y: 70,
    },
  },
];

// 예약 정보 데이터
export interface ReservationInfo {
  facilityName: string;
  notice: string;
  methods: string[];
}

export const reservationInfo: ReservationInfo[] = [
  {
    facilityName: '스파 트리트먼트',
    notice: '최소 2시간 전 예약 권장',
    methods: ['홈페이지', '전화', '컨시어지'],
  },
  {
    facilityName: '요가/명상 클래스',
    notice: '하루 전 예약 필수 (정원 12명)',
    methods: ['홈페이지', '전화', '컨시어지'],
  },
  {
    facilityName: '프라이빗 카바나',
    notice: '3일 전 예약 권장',
    methods: ['홈페이지', '전화', '컨시어지'],
  },
  {
    facilityName: '미팅룸/연회장',
    notice: '1주일 전 예약 필수',
    methods: ['홈페이지', '전화', '이메일'],
  },
  {
    facilityName: '키즈 케어 서비스',
    notice: '4시간 전 예약 필요',
    methods: ['홈페이지', '전화', '컨시어지'],
  },
];

// 시설 이용 에티켓 데이터
export interface FacilityEtiquette {
  category: string;
  rules: string[];
}

export const facilityEtiquette: FacilityEtiquette[] = [
  {
    category: '웰니스 시설',
    rules: ['적절한 수영복 착용 필수', '샤워 후 입장', '다른 이용객 배려'],
  },
  {
    category: '스파',
    rules: ['예약 시간 15분 전 도착', '취소는 24시간 전 통보 필요'],
  },
  {
    category: '자연 공간',
    rules: ['자연 보호', '쓰레기 반드시 지정된 곳에 버리기'],
  },
  {
    category: '라운지 및 엔터테인먼트',
    rules: ['소음 조절', '타인 배려'],
  },
  {
    category: '키즈 시설',
    rules: ['어린이 안전 관리', '3세 미만 어린이는 보호자 동반 필수'],
  },
];
