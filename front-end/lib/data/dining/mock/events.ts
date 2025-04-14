import { DiningEvent } from '../types/event';

// 다이닝 이벤트 목업 데이터
export const mockEvents: DiningEvent[] = [
  {
    id: 'event-001',
    restaurantId: 'chill-elegance',
    title: '셰프의 테이스팅 디너',
    subtitle: '셰프와 함께하는 프리미엄 테이스팅 코스',
    description:
      '칠 엘레강스의 헤드 셰프가 엄선한 재료로 준비하는 특별한 테이스팅 메뉴를 경험해보세요. 와인 페어링과 함께 제공되는 이 특별한 저녁 식사는 미식가들을 위한 완벽한 선택입니다.',
    imageUrl: '/images/dining/events/tasting-dinner.jpg',
    startDate: '2023-11-15',
    endDate: '2023-12-15',
    price: 220000,
    discountRate: 0,
    isActive: true,
    category: 'TASTING',
    tags: ['셰프 스페셜', '와인 페어링', '프리미엄'],
    details: [
      {
        title: '이벤트 시간',
        content: '매주 금요일과 토요일 저녁 7시 ~ 10시',
      },
      {
        title: '예약 안내',
        content: '최소 3일 전 예약 필수, 2인 이상 예약 가능',
      },
      {
        title: '코스 구성',
        content: '7코스 테이스팅 메뉴와 프리미엄 와인 페어링 포함',
      },
    ],
  },
  {
    id: 'event-002',
    restaurantId: 'chill-garden',
    title: '가든 브런치 페스티벌',
    subtitle: '야외 테라스에서 즐기는 주말 브런치',
    description:
      '칠 가든의 아름다운 테라스에서 제공되는 특별한 주말 브런치 페스티벌입니다. 신선한 샐러드, 수제 베이커리, 계절 과일 등 다양한 메뉴와 함께 여유로운 주말을 보내세요.',
    imageUrl: '/images/dining/events/garden-brunch.jpg',
    startDate: '2023-11-01',
    endDate: '2023-11-30',
    price: 65000,
    discountRate: 10,
    isActive: true,
    category: 'BRUNCH',
    tags: ['주말 브런치', '테라스 다이닝', '페스티벌'],
    details: [
      {
        title: '이벤트 시간',
        content: '매주 토요일, 일요일 오전 10시 ~ 오후 2시',
      },
      {
        title: '예약 안내',
        content: '주말 브런치는 예약을 권장합니다',
      },
      {
        title: '메뉴 구성',
        content: '브런치 뷔페 및 에그 스테이션, 시그니처 음료 1잔 포함',
      },
    ],
  },
  {
    id: 'event-003',
    restaurantId: 'chill-moments',
    title: '애프터눈 티 스페셜',
    subtitle: '프리미엄 티와 함께하는 우아한 오후',
    description:
      '칠 모먼츠에서 제공하는 특별한 애프터눈 티 세트입니다. 엄선된 프리미엄 차와 함께 수제 스콘, 미니 샌드위치, 페이스트리 등 다양한 디저트를 즐기세요.',
    imageUrl: '/images/dining/events/afternoon-tea.jpg',
    startDate: '2023-11-01',
    endDate: '2023-12-31',
    price: 55000,
    discountRate: 0,
    isActive: true,
    category: 'TEA_TIME',
    tags: ['애프터눈 티', '티타임', '디저트'],
    details: [
      {
        title: '이벤트 시간',
        content: '매일 오후 2시 ~ 오후 5시',
      },
      {
        title: '예약 안내',
        content: '최소 1일 전 예약 권장',
      },
      {
        title: '세트 구성',
        content: '티 세트(2인 기준), 프리미엄 차 또는 커피 포함',
      },
    ],
  },
  {
    id: 'event-004',
    restaurantId: 'chill-bites',
    title: '시즌 특선 스페셜',
    subtitle: '가을 제철 식재료로 준비한 스페셜 메뉴',
    description:
      '칠 바이츠에서 준비한 가을 시즌 특선 메뉴입니다. 국내산 제철 식재료로 준비한 건강하고 맛있는 요리를 경험해보세요.',
    imageUrl: '/images/dining/events/seasonal-special.jpg',
    startDate: '2023-11-01',
    endDate: '2023-11-30',
    price: 45000,
    discountRate: 0,
    isActive: true,
    category: 'SEASONAL',
    tags: ['시즌 스페셜', '제철 식재료', '가을 메뉴'],
    details: [
      {
        title: '제공 시간',
        content: '점심 및 저녁 서비스 시간 내 주문 가능',
      },
      {
        title: '메뉴 구성',
        content: '시즌 스페셜 메인 요리, 샐러드, 디저트 포함',
      },
    ],
  },
  {
    id: 'event-005',
    restaurantId: 'chill-moments',
    title: '재즈 나이트',
    subtitle: '라이브 재즈와 함께하는 저녁',
    description:
      '칠 모먼츠에서 매주 금요일과 토요일 저녁에 진행되는 라이브 재즈 공연입니다. 편안한 분위기에서 칵테일과 함께 수준 높은 재즈 음악을 즐기세요.',
    imageUrl: '/images/dining/events/jazz-night.jpg',
    startDate: '2023-11-01',
    endDate: '2023-12-31',
    price: 20000,
    discountRate: 0,
    isActive: true,
    category: 'ENTERTAINMENT',
    tags: ['라이브 음악', '재즈', '저녁 프로그램'],
    details: [
      {
        title: '공연 시간',
        content: '매주 금요일, 토요일 저녁 7시 ~ 10시',
      },
      {
        title: '예약 안내',
        content: '주말 저녁은 예약을 권장합니다',
      },
      {
        title: '입장료',
        content: '1인당 20,000원 (웰컴 드링크 1잔 포함)',
      },
    ],
  },
  {
    id: 'event-006',
    restaurantId: 'chill-elegance',
    title: '크리스마스 갈라 디너',
    subtitle: '특별한 크리스마스 이브 갈라 디너',
    description:
      '칠 엘레강스에서 준비하는 화려한 크리스마스 이브 갈라 디너입니다. 최상급 식재료로 준비한 스페셜 코스와 샴페인 한 잔으로 특별한 크리스마스 이브를 보내세요.',
    imageUrl: '/images/dining/events/christmas-gala.jpg',
    startDate: '2023-12-24',
    endDate: '2023-12-24',
    price: 250000,
    discountRate: 0,
    isActive: true,
    category: 'CELEBRATION',
    tags: ['크리스마스', '갈라 디너', '스페셜 이벤트'],
    details: [
      {
        title: '디너 시간',
        content: '크리스마스 이브 저녁 6시 ~ 10시',
      },
      {
        title: '예약 안내',
        content: '최소 1주일 전 예약 필수',
      },
      {
        title: '코스 구성',
        content: '7코스 갈라 디너, 샴페인 웰컴 드링크, 와인 페어링 옵션',
      },
    ],
  },
  {
    id: 'event-007',
    restaurantId: 'chill-bites',
    title: '헬시 브렉퍼스트 위크',
    subtitle: '건강한 아침으로 활기찬 하루 시작',
    description:
      '칠 바이츠에서 진행하는 헬시 브렉퍼스트 위크입니다. 유기농 재료와 슈퍼푸드로 준비한 특별한 아침 메뉴로 건강한 하루를 시작하세요.',
    imageUrl: '/images/dining/events/healthy-breakfast.jpg',
    startDate: '2023-11-20',
    endDate: '2023-11-26',
    price: 35000,
    discountRate: 15,
    isActive: true,
    category: 'BREAKFAST',
    tags: ['건강식', '아침', '유기농'],
    details: [
      {
        title: '제공 시간',
        content: '매일 오전 6시 30분 ~ 오전 10시 30분',
      },
      {
        title: '메뉴 구성',
        content: '유기농 그릭 요거트, 슈퍼푸드 그래놀라, 계절 과일, 채소 오믈렛 등',
      },
    ],
  },
  {
    id: 'event-008',
    restaurantId: 'chill-garden',
    title: '프로방스 스페셜 위크',
    subtitle: '프랑스 프로방스 지역의 맛',
    description:
      '칠 가든에서 일주일간 진행되는 프랑스 프로방스 지역 스페셜 메뉴입니다. 지중해식 요리와 프랑스 남부의 향긋한 허브가 어우러진 특별한 요리를 경험해보세요.',
    imageUrl: '/images/dining/events/provence-week.jpg',
    startDate: '2023-12-04',
    endDate: '2023-12-10',
    price: 58000,
    discountRate: 0,
    isActive: true,
    category: 'SPECIAL',
    tags: ['프랑스 요리', '지중해식', '테마 위크'],
    details: [
      {
        title: '제공 시간',
        content: '점심 및 저녁 서비스 시간 내 주문 가능',
      },
      {
        title: '메뉴 구성',
        content: '프로방스 스타일의 3코스 또는 단품 메뉴 선택 가능',
      },
      {
        title: '추천 메뉴',
        content: '부야베스, 라타투이, 허브 로스티드 램',
      },
    ],
  },
  {
    id: 'event-009',
    restaurantId: 'chill-moments',
    title: '위스키 테이스팅 나이트',
    subtitle: '프리미엄 위스키 테이스팅 경험',
    description:
      '칠 모먼츠에서 진행하는 프리미엄 위스키 테이스팅 나이트입니다. 전문 소믈리에의 안내와 함께 세계 각국의 희귀 위스키를 경험해보세요.',
    imageUrl: '/images/dining/events/whiskey-tasting.jpg',
    startDate: '2023-12-15',
    endDate: '2023-12-15',
    price: 120000,
    discountRate: 0,
    isActive: true,
    category: 'TASTING',
    tags: ['위스키', '테이스팅', '프리미엄'],
    details: [
      {
        title: '이벤트 시간',
        content: '12월 15일 저녁 7시 ~ 9시',
      },
      {
        title: '예약 안내',
        content: '최소 3일 전 예약 필수, 좌석 한정',
      },
      {
        title: '테이스팅 구성',
        content: '5종의 프리미엄 위스키, 페어링 핑거 푸드, 소믈리에 가이드',
      },
    ],
  },
  {
    id: 'event-010',
    restaurantId: 'chill-elegance',
    title: '신년 카운트다운 디너',
    subtitle: '새해를 맞이하는 특별한 디너',
    description:
      '칠 엘레강스에서 준비하는 신년 카운트다운 디너입니다. 최상층에서 불꽃놀이를 감상하며 럭셔리한 코스 요리와 샴페인으로 새해를 맞이하세요.',
    imageUrl: '/images/dining/events/new-year-dinner.jpg',
    startDate: '2023-12-31',
    endDate: '2023-12-31',
    price: 280000,
    discountRate: 0,
    isActive: true,
    category: 'CELEBRATION',
    tags: ['새해', '카운트다운', '갈라 디너'],
    details: [
      {
        title: '디너 시간',
        content: '12월 31일 저녁 8시 ~ 새해 1시',
      },
      {
        title: '예약 안내',
        content: '최소 2주 전 예약 필수, 좌석 한정',
      },
      {
        title: '코스 구성',
        content: '7코스 갈라 디너, 샴페인 웰컴 드링크, 와인 페어링, 카운트다운 스페셜 이벤트',
      },
    ],
  },
];
