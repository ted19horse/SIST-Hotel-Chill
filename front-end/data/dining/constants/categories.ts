import { MenuCategory } from '../types/menu';

export const MENU_CATEGORIES: Record<string, { name: string; categories: MenuCategory[] }> = {
  CHILL_BITES: {
    name: '올데이 다이닝',
    categories: ['BREAKFAST', 'LUNCH', 'DINNER', 'DESSERT'],
  },
  CHILL_GARDEN: {
    name: '캐주얼 다이닝',
    categories: ['SALAD', 'PASTA', 'GRILL', 'DESSERT'],
  },
  CHILL_ELEGANCE: {
    name: '프리미엄 다이닝',
    categories: ['COURSE'],
  },
  CHILL_MOMENTS: {
    name: '라운지 & 바',
    categories: ['AFTERNOON_TEA', 'BAR', 'BEVERAGE'],
  },
} as const;

export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  BREAKFAST: '조식',
  LUNCH: '중식',
  DINNER: '석식',
  DESSERT: '디저트',
  SALAD: '샐러드',
  PASTA: '파스타',
  GRILL: '그릴',
  COURSE: '코스',
  BEVERAGE: '음료',
  AFTERNOON_TEA: '애프터눈 티',
  BAR: '바',
  FINGER_FOOD: '핑거 푸드',
  SIGNATURE_DRINK: '시그니처 음료',
};

export const CATEGORY_ICONS: Record<MenuCategory, string> = {
  BREAKFAST: 'Sunrise',
  LUNCH: 'Sun',
  DINNER: 'Sunset',
  DESSERT: 'Cake',
  SALAD: 'Salad',
  PASTA: 'Utensils',
  GRILL: 'Flame',
  COURSE: 'MenuSquare',
  BEVERAGE: 'Coffee',
  AFTERNOON_TEA: 'TeaCup',
  BAR: 'Wine',
  FINGER_FOOD: 'PalmTree',
  SIGNATURE_DRINK: 'Sparkles',
};

export const CATEGORY_DESCRIPTIONS: Record<MenuCategory, string> = {
  BREAKFAST: '신선한 재료로 준비한 건강한 아침',
  LUNCH: '여유로운 점심 식사',
  DINNER: '특별한 저녁 식사',
  DESSERT: '달콤한 디저트',
  SALAD: '신선한 샐러드',
  PASTA: '수제 파스타',
  GRILL: '최상급 그릴 요리',
  COURSE: '셰프의 특별 코스',
  BEVERAGE: '다양한 음료',
  AFTERNOON_TEA: '우아한 티타임',
  BAR: '시그니처 칵테일',
} as const;

export const ALLERGEN_LABELS: Record<string, string> = {
  EGGS: '계란',
  MILK: '우유',
  FISH: '생선',
  SHELLFISH: '갑각류',
  NUTS: '견과류',
  GLUTEN: '글루텐',
  SOY: '대두',
  WHEAT: '밀',
  CRUSTACEAN: '갑각류',
  MOLLUSCS: '연체동물',
  MUSTARD: '겨자',
  SESAME: '참깨',
  CELERY: '셀러리',
  PEANUTS: '땅콩',
  SULPHITES: '아황산염',
  ALCOHOL: '알코올',
};

export const DIETARY_OPTION_LABELS: Record<string, string> = {
  VEGETARIAN: '베지테리언',
  VEGAN: '비건',
  GLUTEN_FREE: '글루텐 프리',
  DAIRY_FREE: '유제품 프리',
  HALAL: '할랄',
  KOSHER: '코셔',
  NUT_FREE: '견과류 프리',
  LOW_CALORIE: '저칼로리',
  KETO: '케토',
  ORGANIC: '유기농',
};

export const BADGE_LABELS: Record<string, string> = {
  SIGNATURE: '시그니처',
  CHEF_RECOMMENDATION: '셰프 추천',
  SEASONAL: '시즌 한정',
  NEW: '신메뉴',
  SPICY: '매운맛',
  BESTSELLER: '베스트셀러',
  LOCAL_INGREDIENT: '로컬 식재료',
  ORGANIC: '유기농',
  PREMIUM: '프리미엄',
};
