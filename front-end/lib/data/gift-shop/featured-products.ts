import { Product } from '@/types/gift-shop';

/**
 * 추천 상품 더미 데이터
 * Giftshop.md 문서를 기반으로 작성
 */
export const featuredProducts: Product[] = [
  // 시그니처 컬렉션
  {
    id: 1001,
    name: '평온한 순간 아로마 디퓨저 세트',
    description: '호텔 로비와 객실에서 사용되는 시그니처 향',
    price: 85000,
    categoryId: 1,
    subCategoryId: 101,
    images: ['/placeholder.svg?height=600&width=600'],
    sku: 'SIG-ARO-001',
    stock: 50,
    isFeatured: true,
    isNewArrival: false,
  },
  {
    id: 1002,
    name: 'Chill Comfort 고급 목욕 가운',
    description: '호텔 로고가 새겨진 프리미엄 면 소재 가운',
    price: 95000,
    categoryId: 1,
    subCategoryId: 103,
    images: ['/placeholder.svg?height=600&width=600'],
    sku: 'SIG-ROB-001',
    stock: 40,
    isFeatured: true,
  },

  // 힐링 & 웰니스
  {
    id: 2001,
    name: '깊은 휴식 수면 키트',
    description: '수면 마스크, 베개 미스트, 이어플러그, 수면 유도 음악',
    price: 65000,
    categoryId: 2,
    subCategoryId: 202,
    images: ['/placeholder.svg?height=600&width=600'],
    sku: 'HEA-SLE-001',
    stock: 35,
    isFeatured: true,
  },
  {
    id: 2002,
    name: '숲의 선물 아로마테라피 오일 세트',
    description: '야생 허브, 나무, 꽃에서 추출한 에센셜 오일',
    price: 70000,
    categoryId: 2,
    subCategoryId: 203,
    images: ['/placeholder.svg?height=600&width=600'],
    sku: 'HEA-ARO-001',
    stock: 45,
    isFeatured: true,
    isNewArrival: true,
  },

  // 에코 & 지속가능
  {
    id: 3001,
    name: '지구를 위한 휴식 친환경 텀블러',
    description: '재활용 소재로 만든 보온/보냉 텀블러',
    price: 35000,
    categoryId: 3,
    subCategoryId: 301,
    images: ['/placeholder.svg?height=600&width=600'],
    sku: 'ECO-LIV-001',
    stock: 60,
    isFeatured: true,
  },

  // 식음료
  {
    id: 4001,
    name: 'Chill Tea 시그니처 차 컬렉션',
    description: '호텔 레스토랑과 라운지에서 제공되는 차 모음',
    price: 45000,
    categoryId: 4,
    subCategoryId: 401,
    images: ['/placeholder.svg?height=600&width=600'],
    sku: 'FOO-TEA-001',
    stock: 55,
    isFeatured: true,
  },

  // 객실 컬렉션
  {
    id: 5001,
    name: 'Chill Night 베개커버 세트 - 퀸',
    description: '호텔에서 사용하는 것과 동일한 베개커버',
    price: 120000,
    categoryId: 1,
    subCategoryId: 103,
    images: ['/placeholder.svg?height=600&width=600'],
    sku: 'SIG-BED-001',
    stock: 30,
    isFeatured: true,
  },

  // 메모리 & 컬렉터블
  {
    id: 6001,
    name: '계절의 평온 봄 에디션',
    description: '봄을 테마로 한 한정판 제품 세트',
    price: 95000,
    categoryId: 6,
    subCategoryId: 603,
    images: ['/placeholder.svg?height=600&width=600'],
    sku: 'MEM-SEA-001',
    stock: 20,
    isFeatured: true,
    isLimitedEdition: true,
    isNewArrival: true,
  },
];
