import { CourseMenu, PairingOption } from '../types/menu';

// 페어링 옵션 데이터
const PAIRING_OPTIONS: Record<string, PairingOption> = {
  WINE: {
    id: 'ce-pairing-wine',
    name: '프리미엄 와인 페어링',
    description: '코스에 어울리는 엄선된 와인 페어링',
    price: 80000,
    type: 'WINE',
    alcoholPercentage: 12.5,
    origin: '프랑스, 이탈리아, 미국',
  },
  TRADITIONAL: {
    id: 'ce-pairing-traditional',
    name: '한국 전통주 페어링',
    description: '코스에 어울리는 프리미엄 전통주 페어링',
    price: 70000,
    type: 'TRADITIONAL',
    alcoholPercentage: 10,
    origin: '한국',
  },
  NON_ALCOHOLIC: {
    id: 'ce-pairing-non',
    name: '수제 논알콜 페어링',
    description: '코스에 어울리는 특별 제작 논알콜 음료 페어링',
    price: 50000,
    type: 'NON_ALCOHOLIC',
    origin: '한국',
  },
};

// Chill Elegance 코스 메뉴
export const chillEleganceMenu: CourseMenu[] = [
  // Serene Journey 코스
  {
    id: 'ce-serene-journey',
    restaurantId: 'chill-elegance',
    name: 'Serene Journey 코스',
    nameEn: 'Serene Journey Course',
    description: '특별한 순간을 위한 5코스 다이닝 경험',
    descriptionEn: 'A 5-course dining experience for special moments',
    price: 150000,
    servingTime: 120,
    minimumParty: 1,
    requiresReservation: true,
    badges: ['SIGNATURE', 'PREMIUM'],
    imageUrl: '/images/dining/chill-elegance/serene-journey.jpg',
    availableTime: {
      start: '18:00',
      end: '22:00',
    },
    courses: [
      {
        name: '시작의 고요',
        description: '셰프의 인사와 함께하는 특별한 아뮤즈 부쉬',
        items: [
          {
            id: 'ce-sj-amuse',
            restaurantId: 'chill-elegance',
            name: '셰프의 아뮤즈 부쉬',
            description: '제철 재료로 준비된 셰프의 인사',
            price: 0,
            category: 'COURSE',
            badges: ['SIGNATURE', 'SEASONAL'],
            imageUrl: '/images/dining/chill-elegance/amuse.jpg',
          },
        ],
      },
      {
        name: '숲의 속삭임',
        description: '로컬 농장의 신선한 식재료로 준비된 전채 요리',
        items: [
          {
            id: 'ce-sj-appetizer',
            restaurantId: 'chill-elegance',
            name: '산채 샐러드',
            description: '산에서 자란 나물과 허브 드레싱',
            price: 0,
            category: 'COURSE',
            dietaryOptions: ['VEGETARIAN'],
            allergens: ['NUTS'],
            imageUrl: '/images/dining/chill-elegance/mountain-salad.jpg',
          },
        ],
      },
      {
        name: '바다의 명상',
        description: '국내산 해산물을 이용한 선명하고 깊은 맛의 요리',
        items: [
          {
            id: 'ce-sj-seafood',
            restaurantId: 'chill-elegance',
            name: '해산물 명상',
            description: '국내산 제철 해산물과 해초 에멀션',
            price: 0,
            category: 'COURSE',
            allergens: ['SHELLFISH', 'FISH'],
            imageUrl: '/images/dining/chill-elegance/seafood-meditation.jpg',
          },
        ],
      },
      {
        name: '대지의 평온',
        description: '한우와 로컬 재배 채소를 이용한 메인 요리',
        items: [
          {
            id: 'ce-sj-main',
            restaurantId: 'chill-elegance',
            name: '한우 안심 스테이크',
            description: '48시간 숙성한 한우 안심과 로컬 채소',
            price: 0,
            category: 'COURSE',
            badges: ['PREMIUM'],
            imageUrl: '/images/dining/chill-elegance/korean-beef.jpg',
          },
        ],
      },
      {
        name: '달콤한 휴식',
        description: '제철 과일과 하우스 메이드 디저트',
        items: [
          {
            id: 'ce-sj-dessert',
            restaurantId: 'chill-elegance',
            name: '계절 과일 파블로바',
            description: '하우스 메이드 머랭과 제철 과일',
            price: 0,
            category: 'DESSERT',
            dietaryOptions: ['VEGETARIAN'],
            allergens: ['EGGS', 'MILK'],
            imageUrl: '/images/dining/chill-elegance/fruit-pavlova.jpg',
          },
        ],
      },
    ],
    pairings: [PAIRING_OPTIONS.WINE, PAIRING_OPTIONS.TRADITIONAL, PAIRING_OPTIONS.NON_ALCOHOLIC],
    isAvailable: true,
  },

  // Ultimate Chill 코스
  {
    id: 'ce-ultimate-chill',
    restaurantId: 'chill-elegance',
    name: 'Ultimate Chill 코스',
    nameEn: 'Ultimate Chill Course',
    description: '셰프의 철학이 담긴 최상의 7코스 다이닝 경험',
    descriptionEn: "The ultimate 7-course dining experience with chef's philosophy",
    price: 220000,
    servingTime: 180,
    minimumParty: 2,
    requiresReservation: true,
    badges: ['SIGNATURE', 'PREMIUM'],
    imageUrl: '/images/dining/chill-elegance/ultimate-chill.jpg',
    availableTime: {
      start: '18:00',
      end: '21:00',
    },
    courses: [
      {
        name: '여유로운 시작',
        description: '셰프의 웰컴 아뮤즈 부쉬 3종',
        items: [
          {
            id: 'ce-uc-amuse',
            restaurantId: 'chill-elegance',
            name: '셰프의 웰컴 3종',
            description: '산, 들, 바다를 테마로 한 아뮤즈 3종',
            price: 0,
            category: 'COURSE',
            badges: ['SIGNATURE'],
            imageUrl: '/images/dining/chill-elegance/amuse-trio.jpg',
          },
        ],
      },
      {
        name: '자연의 선물',
        description: '산에서 온 선물로 준비한 전채',
        items: [
          {
            id: 'ce-uc-appetizer1',
            restaurantId: 'chill-elegance',
            name: '산의 선물',
            description: '산나물, 송이버섯, 송로버섯 드레싱',
            price: 0,
            category: 'COURSE',
            dietaryOptions: ['VEGETARIAN'],
            imageUrl: '/images/dining/chill-elegance/mountain-gift.jpg',
          },
        ],
      },
      {
        name: '바다의 속삭임',
        description: '청정 바다의 신선한 해산물 요리',
        items: [
          {
            id: 'ce-uc-seafood1',
            restaurantId: 'chill-elegance',
            name: '해산물 콘소메',
            description: '해산물 콘소메와 가리비',
            price: 0,
            category: 'COURSE',
            allergens: ['SHELLFISH'],
            imageUrl: '/images/dining/chill-elegance/seafood-consomme.jpg',
          },
        ],
      },
      {
        name: '숲의 여행',
        description: '숲에서 영감을 받은 중간 요리',
        items: [
          {
            id: 'ce-uc-palate',
            restaurantId: 'chill-elegance',
            name: '송이버섯 리조또',
            description: '국내산 송이버섯과 아르보리오 쌀',
            price: 0,
            category: 'COURSE',
            dietaryOptions: ['VEGETARIAN'],
            allergens: ['MILK'],
            imageUrl: '/images/dining/chill-elegance/mushroom-risotto.jpg',
          },
        ],
      },
      {
        name: '고요한 휴식',
        description: '팔레트 클렌저, 입안을 정화하는 소르베',
        items: [
          {
            id: 'ce-uc-sorbet',
            restaurantId: 'chill-elegance',
            name: '유자 소르베',
            description: '해남 유자로 만든 상큼한 소르베',
            price: 0,
            category: 'COURSE',
            dietaryOptions: ['VEGAN'],
            imageUrl: '/images/dining/chill-elegance/yuzu-sorbet.jpg',
          },
        ],
      },
      {
        name: '대지의 풍요',
        description: '최상급 한우 안심 스테이크',
        items: [
          {
            id: 'ce-uc-main',
            restaurantId: 'chill-elegance',
            name: '한우 안심 스테이크',
            description: '1++ 한우 안심과 제철 채소',
            price: 0,
            category: 'COURSE',
            badges: ['PREMIUM'],
            imageUrl: '/images/dining/chill-elegance/premium-beef.jpg',
          },
        ],
      },
      {
        name: '달콤한 여운',
        description: '하우스 메이드 디저트로 마무리하는 코스',
        items: [
          {
            id: 'ce-uc-dessert',
            restaurantId: 'chill-elegance',
            name: '제주 청귤 무스',
            description: '제주 청귤과 화이트 초콜릿 무스',
            price: 0,
            category: 'DESSERT',
            dietaryOptions: ['VEGETARIAN'],
            allergens: ['MILK', 'EGGS'],
            imageUrl: '/images/dining/chill-elegance/citrus-mousse.jpg',
          },
        ],
      },
    ],
    pairings: [PAIRING_OPTIONS.WINE, PAIRING_OPTIONS.TRADITIONAL, PAIRING_OPTIONS.NON_ALCOHOLIC],
    isAvailable: true,
  },
];
