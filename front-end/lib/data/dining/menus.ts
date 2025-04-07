import { MenuCategory } from '@/lib/types/restaurant';

/**
 * 메뉴 아이템에 이미지 추가
 */
function addImageToMenuItem(menuItem, categoryName) {
  const itemName = encodeURIComponent(menuItem.name);
  const categoryText = encodeURIComponent(categoryName);
  // 메뉴 카테고리별로 다른 색상 지정
  let bgColor = 'F1F5F9';
  let textColor = '667080';

  if (categoryName.includes('조식') || categoryName.includes('Morning')) {
    bgColor = 'FFF8E1';
    textColor = 'F57F17';
  } else if (categoryName.includes('점심') || categoryName.includes('Afternoon')) {
    bgColor = 'E0F7FA';
    textColor = '006064';
  } else if (categoryName.includes('저녁') || categoryName.includes('Evening')) {
    bgColor = 'EDE7F6';
    textColor = '4527A0';
  } else if (categoryName.includes('디저트') || categoryName.includes('Dessert')) {
    bgColor = 'FCE4EC';
    textColor = 'AD1457';
  } else if (categoryName.includes('코스') || categoryName.includes('Course')) {
    bgColor = 'E8F5E9';
    textColor = '1B5E20';
  } else if (categoryName.includes('음료') || categoryName.includes('Drink')) {
    bgColor = 'E3F2FD';
    textColor = '0D47A1';
  }

  return {
    ...menuItem,
    image: `https://placehold.co/400x300/${bgColor}/${textColor}?text=${itemName}`,
  };
}

/**
 * 카테고리의 모든 메뉴 아이템에 이미지 추가
 */
function addImagesToMenuCategory(category) {
  return {
    ...category,
    items: category.items.map((item) => addImageToMenuItem(item, category.name)),
  };
}

/**
 * Chill Bites 메뉴 데이터
 */
export const chillBitesMenus: MenuCategory[] = [
  {
    id: 'morning-chill',
    name: 'Morning Chill 조식 메뉴',
    description: '아침 활력을 위한 건강한 조식 메뉴',
    timeAvailable: {
      start: '06:30',
      end: '10:30',
    },
    items: [
      {
        id: 'chillean-brunch-plate',
        name: '치킬리언 브런치 플레이트',
        description: '유기농 샐러드, 계란 요리, 홈메이드 소시지, 통곡물 토스트',
        price: 28000,
        currency: '₩',
        isSignature: true,
        allergens: ['EGG', 'GLUTEN', 'DAIRY'],
        dietaryRestrictions: [],
      },
      {
        id: 'wellbeing-granola-bowl',
        name: '웰빙 그래놀라 볼',
        description: '제철 과일, 그릭 요거트, 꿀, 견과류',
        price: 18000,
        currency: '₩',
        isSignature: false,
        allergens: ['NUTS', 'DAIRY'],
        dietaryRestrictions: ['VEGETARIAN'],
      },
      {
        id: 'fluffy-pancake-stack',
        name: '플러피 팬케이크 스택',
        description: '베리 콤포트, 메이플 시럽, 마스카포네',
        price: 22000,
        currency: '₩',
        isSignature: false,
        allergens: ['EGG', 'GLUTEN', 'DAIRY'],
        dietaryRestrictions: ['VEGETARIAN'],
      },
      {
        id: 'local-korean-breakfast',
        name: '로컬 한식 조찬',
        description: '된장국, 계절 나물, 구운 생선, 유기농 쌀밥',
        price: 25000,
        currency: '₩',
        isSignature: true,
        allergens: ['FISH', 'SOY'],
        dietaryRestrictions: [],
      },
    ],
  },
  {
    id: 'afternoon-vibe',
    name: 'Afternoon Vibe 점심 메뉴',
    description: '여유로운 오후를 위한 점심 메뉴',
    timeAvailable: {
      start: '11:30',
      end: '15:00',
    },
    items: [
      {
        id: 'slow-life-salad',
        name: '슬로우 라이프 샐러드',
        description: '현지 농장 채소, 퀴노아, 아보카도, 구운 견과류',
        price: 24000,
        currency: '₩',
        isSignature: false,
        allergens: ['NUTS'],
        dietaryRestrictions: ['VEGETARIAN'],
      },
      {
        id: 'sea-relaxation-pasta',
        name: '바다의 여유 파스타',
        description: '지역 해산물, 레몬 오일, 신선한 허브',
        price: 32000,
        currency: '₩',
        isSignature: true,
        allergens: ['SHELLFISH', 'GLUTEN'],
        dietaryRestrictions: [],
      },
      {
        id: 'chill-grilled-chicken',
        name: '치킬 그릴드 치킨',
        description: '허브 마리네이드 닭가슴살, 계절 채소, 퀴노아',
        price: 28000,
        currency: '₩',
        isSignature: false,
        allergens: [],
        dietaryRestrictions: [],
      },
      {
        id: 'calm-bibimbap',
        name: '평온한 비빔밥',
        description: '제철 나물, 고추장, 유기농 현미밥',
        price: 26000,
        currency: '₩',
        isSignature: true,
        allergens: ['EGG', 'SOY'],
        dietaryRestrictions: ['VEGETARIAN'],
      },
    ],
  },
  {
    id: 'evening-zen',
    name: 'Evening Zen 저녁 메뉴',
    description: '저녁의 품격있는 식사를 위한 메뉴',
    timeAvailable: {
      start: '17:30',
      end: '22:30',
    },
    items: [
      {
        id: 'relax-prime-steak',
        name: '릴렉스 프라임 스테이크',
        description: '초이스급 한우, 구운 계절 채소, 트러플 감자 퓨레',
        price: 58000,
        currency: '₩',
        isSignature: true,
        allergens: ['DAIRY'],
        dietaryRestrictions: [],
      },
      {
        id: 'sea-meditation-platter',
        name: '바다의 명상 플래터',
        description: '신선한 해산물 모둠, 허브 마리네이드, 시트러스 드레싱',
        price: 65000,
        currency: '₩',
        isSignature: true,
        allergens: ['SHELLFISH', 'MOLLUSCS'],
        dietaryRestrictions: [],
      },
      {
        id: 'healing-vegan-plate',
        name: '힐링 비건 플레이트',
        description: '콜리플라워 스테이크, 버섯 라구, 퀴노아 리소토',
        price: 42000,
        currency: '₩',
        isSignature: false,
        allergens: [],
        dietaryRestrictions: ['VEGETARIAN', 'VEGAN'],
      },
      {
        id: 'forest-comfort-chicken',
        name: '포레스트 컴포트 치킨',
        description: '로스트 치킨, 야생 버섯, 타임 주스',
        price: 45000,
        currency: '₩',
        isSignature: false,
        allergens: [],
        dietaryRestrictions: [],
      },
    ],
  },
].map(addImagesToMenuCategory);

/**
 * Chill Garden 메뉴 데이터
 */
export const chillGardenMenus: MenuCategory[] = [
  {
    id: 'garden-inspiration-salads',
    name: '가든 인스피레이션 샐러드',
    description: '정원에서 영감을 받은 신선한 샐러드',
    items: [
      {
        id: 'drift-away-salad',
        name: '드리프트 어웨이 샐러드',
        description: '호텔 옥상 정원에서 채취한 허브, 꽃잎, 계절 과일',
        price: 26000,
        currency: '₩',
        isSignature: true,
        allergens: ['NUTS'],
        dietaryRestrictions: ['VEGETARIAN'],
      },
      {
        id: 'forest-walk-salad',
        name: '포레스트 워크 샐러드',
        description: '야생 버섯, 구운 견과류, 트러플 드레싱, 파르미산',
        price: 28000,
        currency: '₩',
        isSignature: false,
        allergens: ['NUTS', 'DAIRY'],
        dietaryRestrictions: ['VEGETARIAN'],
      },
      {
        id: 'sunny-day-caprese',
        name: '써니 데이 카프레제',
        description: '국내산 모짜렐라, 토마토, 바질 페스토',
        price: 24000,
        currency: '₩',
        isSignature: false,
        allergens: ['DAIRY', 'NUTS'],
        dietaryRestrictions: ['VEGETARIAN'],
      },
    ],
  },
  {
    id: 'pasta-risotto',
    name: '파스타 & 리조또',
    description: '풍부한 맛의 파스타와 리조또',
    items: [
      {
        id: 'zen-moment-pasta',
        name: '젠 모먼트 파스타',
        description: '호텔 정원 바질 페스토, 파인 너트, 햇콩',
        price: 32000,
        currency: '₩',
        isSignature: false,
        allergens: ['GLUTEN', 'NUTS'],
        dietaryRestrictions: ['VEGETARIAN'],
      },
      {
        id: 'lake-view-seafood-linguine',
        name: '레이크 뷰 해산물 링귀니',
        description: '제철 해산물, 화이트 와인 소스',
        price: 38000,
        currency: '₩',
        isSignature: true,
        allergens: ['SHELLFISH', 'GLUTEN', 'DAIRY'],
        dietaryRestrictions: [],
      },
      {
        id: 'forest-mood-risotto',
        name: '포레스트 무드 리조또',
        description: '야생 버섯, 트러플 오일, 파르미잔',
        price: 34000,
        currency: '₩',
        isSignature: true,
        allergens: ['DAIRY'],
        dietaryRestrictions: ['VEGETARIAN'],
      },
    ],
  },
  {
    id: 'grill-specials',
    name: '그릴 스페셜',
    description: '정성스럽게 그릴에서 조리한 특별 요리',
    items: [
      {
        id: 'nolo-rush-steak',
        name: '놀로 러쉬 스테이크',
        description: '그릴에 구운 채끝 등심, 루스틱 감자, 계절 채소',
        price: 55000,
        currency: '₩',
        isSignature: true,
        allergens: [],
        dietaryRestrictions: [],
      },
      {
        id: 'meadow-view-chicken',
        name: '메도우 뷰 닭고기',
        description: '허브 마리네이드 닭고기, 로스팅 채소',
        price: 42000,
        currency: '₩',
        isSignature: false,
        allergens: [],
        dietaryRestrictions: [],
      },
      {
        id: 'chill-and-bubble-fish',
        name: '치킬 앤 버블 생선',
        description: '오븐에 구운 제철 생선, 샴페인 소스, 미니 채소',
        price: 48000,
        currency: '₩',
        isSignature: false,
        allergens: ['FISH', 'DAIRY'],
        dietaryRestrictions: [],
      },
    ],
  },
  {
    id: 'desserts',
    name: '디저트',
    description: '달콤한 마무리를 위한 특별 디저트',
    items: [
      {
        id: 'cloud-nine-pancake',
        name: '크라우드 나인 팬케이크',
        description: '리코타 팬케이크, 계절 베리, 꿀',
        price: 18000,
        currency: '₩',
        isSignature: true,
        allergens: ['EGG', 'GLUTEN', 'DAIRY'],
        dietaryRestrictions: ['VEGETARIAN'],
      },
      {
        id: 'nature-dream-parfait',
        name: '네이처 드림 파르페',
        description: '계절 과일, 그래놀라, 요거트',
        price: 16000,
        currency: '₩',
        isSignature: false,
        allergens: ['NUTS', 'DAIRY'],
        dietaryRestrictions: ['VEGETARIAN'],
      },
      {
        id: 'forest-chill',
        name: '포레스트 치킬',
        description: '다크 초콜릿 무스, 포레스트 베리 콤포트',
        price: 19000,
        currency: '₩',
        isSignature: false,
        allergens: ['DAIRY'],
        dietaryRestrictions: ['VEGETARIAN'],
      },
    ],
  },
].map(addImagesToMenuCategory);

/**
 * Chill Elegance 메뉴 데이터
 */
export const chillEleganceMenus: MenuCategory[] = [
  {
    id: 'serene-journey',
    name: 'Serene Journey 코스',
    description: '여유로운 미식 여행을 위한 5코스 메뉴',
    timeAvailable: {
      start: '18:00',
      end: '22:00',
    },
    items: [
      {
        id: 'serene-journey-course',
        name: 'Serene Journey 코스 메뉴',
        description: '시작의 고요, 숲의 속삭임, 바다의 명상, 대지의 평온, 달콤한 휴식 등 5코스',
        price: 150000,
        currency: '₩',
        isSignature: true,
        allergens: ['SHELLFISH', 'GLUTEN', 'DAIRY', 'NUTS', 'EGG'],
        dietaryRestrictions: [],
      },
    ],
  },
  {
    id: 'ultimate-chill',
    name: 'Ultimate Chill 코스',
    description: '궁극의 미식 경험을 위한 7코스 메뉴',
    timeAvailable: {
      start: '18:00',
      end: '22:00',
    },
    items: [
      {
        id: 'ultimate-chill-course',
        name: 'Ultimate Chill 코스 메뉴',
        description:
          '여유로운 시작, 자연의 선물, 바다의 속삭임, 숲의 여행, 고요한 휴식, 대지의 풍요, 달콤한 여운 등 7코스',
        price: 220000,
        currency: '₩',
        isSignature: true,
        allergens: ['SHELLFISH', 'GLUTEN', 'DAIRY', 'NUTS', 'EGG'],
        dietaryRestrictions: [],
      },
    ],
  },
  {
    id: 'beverage-pairing',
    name: '음료 페어링',
    description: '코스 요리에 완벽히 어울리는 음료 페어링',
    items: [
      {
        id: 'premium-wine-pairing',
        name: '프리미엄 와인 페어링',
        description: '코스에 어울리는 엄선된 와인 페어링',
        price: 80000,
        currency: '₩',
        isSignature: false,
        allergens: ['ALCOHOL'],
        dietaryRestrictions: [],
      },
      {
        id: 'korean-traditional-pairing',
        name: '한국 전통주 페어링',
        description: '코스에 어울리는 프리미엄 전통주 페어링',
        price: 70000,
        currency: '₩',
        isSignature: false,
        allergens: ['ALCOHOL'],
        dietaryRestrictions: [],
      },
      {
        id: 'non-alcohol-pairing',
        name: '수제 논알콜 페어링',
        description: '코스에 어울리는 특별 제작 논알콜 음료 페어링',
        price: 50000,
        currency: '₩',
        isSignature: false,
        allergens: [],
        dietaryRestrictions: ['VEGETARIAN', 'VEGAN'],
      },
    ],
  },
].map(addImagesToMenuCategory);

/**
 * Chill Moments 메뉴 데이터
 */
export const chillMomentsMenus: MenuCategory[] = [
  {
    id: 'afternoon-tea',
    name: '애프터눈 티 세트',
    description: '여유로운 오후를 위한 티 세트',
    timeAvailable: {
      start: '14:00',
      end: '17:00',
    },
    items: [
      {
        id: 'dreamy-afternoon',
        name: 'Dreamy Afternoon 세트',
        description: '스콘, 미니 샌드위치, 디저트 6종, 프리미엄 티 선택',
        price: 65000,
        currency: '₩',
        isSignature: true,
        allergens: ['EGG', 'GLUTEN', 'DAIRY', 'NUTS'],
        dietaryRestrictions: [],
      },
      {
        id: 'chill-moments-set',
        name: 'Chill Moments 세트',
        description: '계절 디저트 5종, 과일 플레이트, 티 또는 커피 선택',
        price: 55000,
        currency: '₩',
        isSignature: false,
        allergens: ['GLUTEN', 'DAIRY', 'NUTS'],
        dietaryRestrictions: ['VEGETARIAN'],
      },
    ],
  },
  {
    id: 'finger-food',
    name: '핑거 푸드',
    description: '간단히 즐길 수 있는 핑거 푸드',
    items: [
      {
        id: 'peace-of-mind-plate',
        name: '마음의 여유 플레이트',
        description: '치즈 셀렉션, 과일, 견과류, 크래커',
        price: 35000,
        currency: '₩',
        isSignature: false,
        allergens: ['DAIRY', 'NUTS', 'GLUTEN'],
        dietaryRestrictions: ['VEGETARIAN'],
      },
      {
        id: 'gentle-breeze-dumplings',
        name: '부드러운 바람 만두',
        description: '트러플 오일 딥핑 소스의 모둠 만두',
        price: 28000,
        currency: '₩',
        isSignature: false,
        allergens: ['GLUTEN', 'SOY'],
        dietaryRestrictions: [],
      },
      {
        id: 'chill-bite-mini-burgers',
        name: '치킬 바이트 미니 버거',
        description: '미니 와규 버거 3종',
        price: 32000,
        currency: '₩',
        isSignature: true,
        allergens: ['GLUTEN', 'DAIRY', 'EGG'],
        dietaryRestrictions: [],
      },
      {
        id: 'forest-whispering-platter',
        name: '숲의 속삭임 플래터',
        description: '계절 채소 바스켓, 3종 딥',
        price: 26000,
        currency: '₩',
        isSignature: false,
        allergens: ['NUTS'],
        dietaryRestrictions: ['VEGETARIAN'],
      },
    ],
  },
  {
    id: 'signature-drinks',
    name: '시그니처 음료',
    description: 'Chill Moments만의 특별한 음료',
    items: [
      {
        id: 'peace-of-mind',
        name: '마음의 평온',
        description: '청포도, 애플민트, 탄산수',
        price: 15000,
        currency: '₩',
        isSignature: false,
        allergens: [],
        dietaryRestrictions: ['VEGETARIAN', 'VEGAN'],
      },
      {
        id: 'forest-meditation',
        name: '숲의 명상',
        description: '녹차, 레몬그라스, 꿀',
        price: 15000,
        currency: '₩',
        isSignature: true,
        allergens: [],
        dietaryRestrictions: ['VEGETARIAN'],
      },
      {
        id: 'infinity-blue',
        name: '인피니티 블루',
        description: '블루 버터플라이 피, 레몬, 코코넛 워터',
        price: 16000,
        currency: '₩',
        isSignature: false,
        allergens: [],
        dietaryRestrictions: ['VEGETARIAN', 'VEGAN'],
      },
      {
        id: 'chill-mojito',
        name: '치킬 모히토',
        description: '화이트 럼, 민트, 라임, 설탕',
        price: 22000,
        currency: '₩',
        isSignature: false,
        allergens: ['ALCOHOL'],
        dietaryRestrictions: ['VEGETARIAN'],
      },
      {
        id: 'forest-dream',
        name: '포레스트 드림',
        description: '진, 로즈마리, 라임, 토닉',
        price: 22000,
        currency: '₩',
        isSignature: false,
        allergens: ['ALCOHOL'],
        dietaryRestrictions: ['VEGETARIAN'],
      },
      {
        id: 'lake-view-martini',
        name: '레이크 뷰 마티니',
        description: '보드카, 블루 큐라소, 라임 주스',
        price: 24000,
        currency: '₩',
        isSignature: true,
        allergens: ['ALCOHOL'],
        dietaryRestrictions: ['VEGETARIAN'],
      },
    ],
  },
].map(addImagesToMenuCategory);

/**
 * 모든 레스토랑 메뉴를 export
 */
export const restaurantMenus = {
  'chill-bites': chillBitesMenus,
  'chill-garden': chillGardenMenus,
  'chill-elegance': chillEleganceMenus,
  'chill-moments': chillMomentsMenus,
};
