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
    id: '1',
    name: '시그니처 버거',
    description: '특제 소스와 신선한 재료로 만든 시그니처 버거',
    price: 25000,
    isSignature: true,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1999&q=80',
  },
  {
    id: '2',
    name: '트러플 프라이',
    description: '트러플 오일과 파마산 치즈를 곁들인 프렌치 프라이',
    price: 12000,
    image:
      'https://images.unsplash.com/photo-1630384066952-38535f7ddcff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  },
  {
    id: '3',
    name: '아보카도 샐러드',
    description: '신선한 아보카도와 채소로 만든 건강한 샐러드',
    price: 15000,
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
];

/**
 * Chill Garden 메뉴 데이터
 */
export const chillGardenMenus: MenuCategory[] = [
  {
    id: '1',
    name: '가든 샐러드',
    description: '신선한 채소와 과일로 만든 건강한 샐러드',
    price: 18000,
    isSignature: true,
    image:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: '2',
    name: '아보카도 샌드위치',
    description: '신선한 아보카도와 채소로 만든 샌드위치',
    price: 15000,
    image:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
  },
  {
    id: '3',
    name: '베리 스무디',
    description: '신선한 베리와 요거트로 만든 스무디',
    price: 12000,
    image:
      'https://images.unsplash.com/photo-1502741224143-90386d401f93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
];

/**
 * Chill Elegance 메뉴 데이터
 */
export const chillEleganceMenus: MenuCategory[] = [
  {
    id: '1',
    name: '와그유 스테이크',
    description: '최고급 와그유 소고기로 만든 스테이크',
    price: 85000,
    isSignature: true,
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
  },
  {
    id: '2',
    name: '트러플 파스타',
    description: '트러플 오일과 파마산 치즈를 곁들인 파스타',
    price: 35000,
    image:
      'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: '3',
    name: '로브스터 테일',
    description: '신선한 로브스터 테일을 버터에 구워낸 요리',
    price: 65000,
    image:
      'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
];

/**
 * Chill Moments 메뉴 데이터
 */
export const chillMomentsMenus: MenuCategory[] = [
  {
    id: '1',
    name: '아프터눈 티 세트',
    description: '다양한 차와 디저트로 구성된 아프터눈 티 세트',
    price: 35000,
    isSignature: true,
    image:
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: '2',
    name: '마카롱 세트',
    description: '다양한 맛의 마카롱으로 구성된 세트',
    price: 25000,
    image:
      'https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: '3',
    name: '아이스크림 플래터',
    description: '다양한 맛의 아이스크림과 토핑으로 구성된 플래터',
    price: 20000,
    image:
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
];

/**
 * 레스토랑 메뉴 목업 데이터
 * (Dining.md 문서 기준으로 업데이트)
 */
export const menus: MenuCategory[] = [
  // Chill Bites 메뉴
  {
    id: 'morning-chill',
    restaurantId: 'chill-bites',
    name: 'Morning Chill 조식 메뉴',
    description: '활기찬 아침을 위한 건강한 조식',
    timeAvailable: { start: '06:30', end: '10:30' },
    image: '/images/menu/morning-chill.jpg',
    items: [
      {
        id: 'cb-morning-1',
        name: '치킬리언 브런치 플레이트',
        description: '유기농 샐러드, 계란 요리, 홈메이드 소시지, 통곡물 토스트',
        price: 28000,
        isSignature: true,
        allergens: ['계란', '글루텐', '유제품'],
        image: '/images/menu/chillean-brunch.jpg',
      },
      {
        id: 'cb-morning-2',
        name: '웰빙 그래놀라 볼',
        description: '제철 과일, 그릭 요거트, 꿀, 견과류',
        price: 18000,
        isVegetarian: true,
        allergens: ['견과류', '유제품'],
        image: '/images/menu/granola-bowl.jpg',
      },
      {
        id: 'cb-morning-3',
        name: '플러피 팬케이크 스택',
        description: '베리 콤포트, 메이플 시럽, 마스카포네',
        price: 22000,
        isVegetarian: true,
        allergens: ['계란', '글루텐', '유제품'],
        image: '/images/menu/pancake-stack.jpg',
      },
      {
        id: 'cb-morning-4',
        name: '로컬 한식 조찬',
        description: '된장국, 계절 나물, 구운 생선, 유기농 쌀밥',
        price: 25000,
        isSignature: true,
        allergens: ['생선', '대두'],
        image: '/images/menu/korean-breakfast.jpg',
      },
    ],
  },
  {
    id: 'afternoon-vibe',
    restaurantId: 'chill-bites',
    name: 'Afternoon Vibe 점심 메뉴',
    description: '여유로운 점심을 위한 다양한 요리',
    timeAvailable: { start: '11:30', end: '15:00' },
    image: '/images/menu/afternoon-vibe.jpg',
    items: [
      {
        id: 'cb-lunch-1',
        name: '슬로우 라이프 샐러드',
        description: '현지 농장 채소, 퀴노아, 아보카도, 구운 견과류',
        price: 24000,
        isVegetarian: true,
        allergens: ['견과류'],
        image: '/images/menu/slow-life-salad.jpg',
      },
      {
        id: 'cb-lunch-2',
        name: '바다의 여유 파스타',
        description: '지역 해산물, 레몬 오일, 신선한 허브',
        price: 32000,
        isSignature: true,
        allergens: ['갑각류', '글루텐'],
        image: '/images/menu/seafood-pasta.jpg',
      },
      {
        id: 'cb-lunch-3',
        name: '치킬 그릴드 치킨',
        description: '허브 마리네이드 닭가슴살, 계절 채소, 퀴노아',
        price: 28000,
        image: '/images/menu/grilled-chicken.jpg',
      },
      {
        id: 'cb-lunch-4',
        name: '평온한 비빔밥',
        description: '제철 나물, 고추장, 유기농 현미밥',
        price: 26000,
        isSignature: true,
        isVegetarian: true,
        allergens: ['계란', '대두'],
        image: '/images/menu/bibimbap.jpg',
      },
    ],
  },
  {
    id: 'evening-zen',
    restaurantId: 'chill-bites',
    name: 'Evening Zen 저녁 메뉴',
    description: '하루를 마무리하는 풍성한 저녁 식사',
    timeAvailable: { start: '17:30', end: '22:30' },
    image: '/images/menu/evening-zen.jpg',
    items: [
      {
        id: 'cb-dinner-1',
        name: '릴렉스 프라임 스테이크',
        description: '초이스급 한우, 구운 계절 채소, 트러플 감자 퓨레',
        price: 58000,
        isSignature: true,
        allergens: ['유제품'],
        image: '/images/menu/prime-steak.jpg',
      },
      {
        id: 'cb-dinner-2',
        name: '바다의 명상 플래터',
        description: '신선한 해산물 모둠, 허브 마리네이드, 시트러스 드레싱',
        price: 65000,
        isSignature: true,
        allergens: ['갑각류', '조개류'],
        image: '/images/menu/seafood-platter.jpg',
      },
      {
        id: 'cb-dinner-3',
        name: '힐링 비건 플레이트',
        description: '콜리플라워 스테이크, 버섯 라구, 퀴노아 리소토',
        price: 42000,
        isVegetarian: true,
        image: '/images/menu/vegan-plate.jpg',
      },
      {
        id: 'cb-dinner-4',
        name: '포레스트 컴포트 치킨',
        description: '로스트 치킨, 야생 버섯, 타임 주스',
        price: 45000,
        image: '/images/menu/comfort-chicken.jpg',
      },
    ],
  },

  // Chill Garden 메뉴
  {
    id: 'garden-salads',
    restaurantId: 'chill-garden',
    name: '가든 인스피레이션 샐러드',
    description: '정원에서 영감을 얻은 신선한 샐러드',
    image: '/images/menu/garden-salads.jpg',
    items: [
      {
        id: 'cg-salad-1',
        name: '드리프트 어웨이 샐러드',
        description: '호텔 옥상 정원에서 채취한 허브, 꽃잎, 계절 과일',
        price: 26000,
        isSignature: true,
        isVegetarian: true,
        allergens: ['견과류'],
        image: '/images/menu/drift-away-salad.jpg',
      },
      {
        id: 'cg-salad-2',
        name: '포레스트 워크 샐러드',
        description: '야생 버섯, 구운 견과류, 트러플 드레싱, 파르미산',
        price: 28000,
        isVegetarian: true,
        allergens: ['견과류', '유제품'],
        image: '/images/menu/forest-walk-salad.jpg',
      },
      {
        id: 'cg-salad-3',
        name: '써니 데이 카프레제',
        description: '국내산 모짜렐라, 토마토, 바질 페스토',
        price: 24000,
        isVegetarian: true,
        allergens: ['유제품', '견과류'],
        image: '/images/menu/caprese.jpg',
      },
    ],
  },
  {
    id: 'garden-pasta',
    restaurantId: 'chill-garden',
    name: '파스타 & 리조또',
    description: '신선한 재료로 만든 파스타와 리조또',
    image: '/images/menu/pasta-risotto.jpg',
    items: [
      {
        id: 'cg-pasta-1',
        name: '젠 모먼트 파스타',
        description: '호텔 정원 바질 페스토, 파인 너트, 햇콩',
        price: 32000,
        isVegetarian: true,
        allergens: ['글루텐', '견과류'],
        image: '/images/menu/zen-moment-pasta.jpg',
      },
      {
        id: 'cg-pasta-2',
        name: '레이크 뷰 해산물 링귀니',
        description: '제철 해산물, 화이트 와인 소스',
        price: 38000,
        isSignature: true,
        allergens: ['갑각류', '글루텐', '유제품'],
        image: '/images/menu/seafood-linguine.jpg',
      },
      {
        id: 'cg-pasta-3',
        name: '포레스트 무드 리조또',
        description: '야생 버섯, 트러플 오일, 파르미잔',
        price: 34000,
        isSignature: true,
        isVegetarian: true,
        allergens: ['유제품'],
        image: '/images/menu/forest-mood-risotto.jpg',
      },
    ],
  },

  // Chill Elegance 메뉴
  {
    id: 'serene-journey',
    restaurantId: 'chill-elegance',
    name: 'Serene Journey 코스',
    description: '시작의 고요, 숲의 속삭임, 바다의 명상, 대지의 평온, 달콤한 휴식 등 5코스',
    price: 150000,
    isSignature: true,
    allergens: ['갑각류', '글루텐', '유제품', '견과류', '계란'],
    image: '/images/menu/serene-journey.jpg',
    items: [],
  },
  {
    id: 'ultimate-chill',
    restaurantId: 'chill-elegance',
    name: 'Ultimate Chill 코스',
    description:
      '여유로운 시작, 자연의 선물, 바다의 속삭임, 숲의 여행, 고요한 휴식, 대지의 풍요, 달콤한 여운 등 7코스',
    price: 220000,
    isSignature: true,
    allergens: ['갑각류', '글루텐', '유제품', '견과류', '계란'],
    image: '/images/menu/ultimate-chill.jpg',
    items: [],
  },
  {
    id: 'elegance-pairing',
    restaurantId: 'chill-elegance',
    name: '음료 페어링',
    description: '코스 요리와 완벽한 조화를 이루는 음료 페어링',
    image: '/images/menu/drink-pairing.jpg',
    items: [
      {
        id: 'ce-drink-1',
        name: '프리미엄 와인 페어링',
        description: '코스에 어울리는 엄선된 와인 페어링',
        price: 80000,
        allergens: ['알코올'],
        image: '/images/menu/wine-pairing.jpg',
      },
      {
        id: 'ce-drink-2',
        name: '한국 전통주 페어링',
        description: '코스에 어울리는 프리미엄 전통주 페어링',
        price: 70000,
        allergens: ['알코올'],
        image: '/images/menu/traditional-pairing.jpg',
      },
      {
        id: 'ce-drink-3',
        name: '수제 논알콜 페어링',
        description: '코스에 어울리는 특별 제작 논알콜 음료 페어링',
        price: 50000,
        image: '/images/menu/non-alcoholic-pairing.jpg',
      },
    ],
  },

  // Chill Moments 메뉴
  {
    id: 'afternoon-tea',
    restaurantId: 'chill-moments',
    name: '애프터눈 티 세트',
    description: '오후의 여유로운 티타임',
    timeAvailable: { start: '14:00', end: '17:00' },
    image: '/images/menu/afternoon-tea.jpg',
    items: [
      {
        id: 'cm-tea-1',
        name: 'Dreamy Afternoon 세트',
        description: '스콘, 미니 샌드위치, 디저트 6종, 프리미엄 티 선택',
        price: 65000,
        isSignature: true,
        allergens: ['계란', '글루텐', '유제품', '견과류'],
        image: '/images/menu/dreamy-afternoon.jpg',
      },
      {
        id: 'cm-tea-2',
        name: 'Chill Moments 세트',
        description: '계절 디저트 5종, 과일 플레이트, 티 또는 커피 선택',
        price: 55000,
        isVegetarian: true,
        allergens: ['글루텐', '유제품', '견과류'],
        image: '/images/menu/chill-moments-set.jpg',
      },
    ],
  },
  {
    id: 'finger-food',
    restaurantId: 'chill-moments',
    name: '핑거 푸드',
    description: '가볍게 즐기는 다양한 간식',
    image: '/images/menu/finger-food.jpg',
    items: [
      {
        id: 'cm-food-1',
        name: '마음의 여유 플레이트',
        description: '치즈 셀렉션, 과일, 견과류, 크래커',
        price: 35000,
        isVegetarian: true,
        allergens: ['유제품', '견과류', '글루텐'],
        image: '/images/menu/peace-of-mind-plate.jpg',
      },
      {
        id: 'cm-food-2',
        name: '부드러운 바람 만두',
        description: '트러플 오일 딥핑 소스의 모둠 만두',
        price: 28000,
        allergens: ['글루텐', '대두'],
        image: '/images/menu/breeze-dumplings.jpg',
      },
      {
        id: 'cm-food-3',
        name: '치킬 바이트 미니 버거',
        description: '미니 와규 버거 3종',
        price: 32000,
        isSignature: true,
        allergens: ['글루텐', '유제품', '계란'],
        image: '/images/menu/chill-bite-burgers.jpg',
      },
      {
        id: 'cm-food-4',
        name: '숲의 속삭임 플래터',
        description: '계절 채소 바스켓, 3종 딥',
        price: 26000,
        isVegetarian: true,
        allergens: ['견과류'],
        image: '/images/menu/forest-whisper-platter.jpg',
      },
    ],
  },
  {
    id: 'signature-drinks',
    restaurantId: 'chill-moments',
    name: '시그니처 음료',
    description: '특별한 음료 컬렉션',
    image: '/images/menu/signature-drinks.jpg',
    items: [
      {
        id: 'cm-drink-1',
        name: '마음의 평온',
        description: '청포도, 애플민트, 탄산수',
        price: 15000,
        isVegetarian: true,
        image: '/images/menu/peace-of-mind-drink.jpg',
      },
      {
        id: 'cm-drink-2',
        name: '숲의 명상',
        description: '녹차, 레몬그라스, 꿀',
        price: 15000,
        isSignature: true,
        isVegetarian: true,
        image: '/images/menu/forest-meditation.jpg',
      },
      {
        id: 'cm-drink-3',
        name: '인피니티 블루',
        description: '블루 버터플라이 피, 레몬, 코코넛 워터',
        price: 16000,
        isVegetarian: true,
        image: '/images/menu/infinity-blue.jpg',
      },
      {
        id: 'cm-drink-4',
        name: '치킬 모히토',
        description: '화이트 럼, 민트, 라임, 설탕',
        price: 22000,
        isVegetarian: true,
        allergens: ['알코올'],
        image: '/images/menu/chill-mojito.jpg',
      },
      {
        id: 'cm-drink-5',
        name: '포레스트 드림',
        description: '진, 로즈마리, 라임, 토닉',
        price: 22000,
        isVegetarian: true,
        allergens: ['알코올'],
        image: '/images/menu/forest-dream.jpg',
      },
      {
        id: 'cm-drink-6',
        name: '레이크 뷰 마티니',
        description: '보드카, 블루 큐라소, 라임 주스',
        price: 24000,
        isSignature: true,
        isVegetarian: true,
        allergens: ['알코올'],
        image: '/images/menu/lake-view-martini.jpg',
      },
    ],
  },
];

/**
 * 레스토랑별 메뉴 데이터를 그룹화하여 제공
 */
export const restaurantMenus = menus.reduce((acc, menu) => {
  if (!acc[menu.restaurantId]) {
    acc[menu.restaurantId] = [];
  }
  acc[menu.restaurantId].push(menu);
  return acc;
}, {} as Record<string, MenuCategory[]>);
