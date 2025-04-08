import { ProductCategory } from '@/types/gift-shop';

/**
 * 기프트샵 카테고리 더미 데이터
 * Giftshop.md 문서를 기반으로 작성
 */
export const categories: ProductCategory[] = [
  {
    id: 1,
    name: 'Chill Haven 시그니처 컬렉션',
    description:
      '호텔의 브랜드 아이덴티티를 담은 제품들로, 호텔에서 경험한 특별한 순간을 집에서도 느낄 수 있습니다.',
    image: '/placeholder.svg?height=600&width=800',
    slug: 'signature-collection',
  },
  {
    id: 2,
    name: '힐링 & 웰니스 컬렉션',
    description: '정신적, 육체적 휴식과 회복을 위한 다양한 제품들로 구성되어 있습니다.',
    image: '/placeholder.svg?height=600&width=800',
    slug: 'healing-wellness',
  },
  {
    id: 3,
    name: '에코 & 지속가능한 라이프스타일 제품',
    description: '환경 보호와 지속 가능한 소비를 위한 친환경 제품들을 제공합니다.',
    image: '/placeholder.svg?height=600&width=800',
    slug: 'eco-sustainable',
  },
  {
    id: 4,
    name: '휴식을 위한 식음료 제품',
    description: '호텔의 다이닝 경험을 집에서도 즐길 수 있는 다양한 식품과 음료를 제공합니다.',
    image: '/placeholder.svg?height=600&width=800',
    slug: 'food-beverage',
  },
  {
    id: 5,
    name: '객실 등급별 맞춤 컬렉션',
    description: '각 객실 등급의 특징과 컨셉에 맞춰 디자인된 맞춤형 제품들입니다.',
    image: '/placeholder.svg?height=600&width=800',
    slug: 'room-collections',
  },
  {
    id: 6,
    name: '메모리 & 컬렉터블 아이템',
    description: '호텔에서의 추억을 간직하고 기념할 수 있는 특별한 상품들입니다.',
    image: '/placeholder.svg?height=600&width=800',
    slug: 'memories-collectibles',
  },
];

/**
 * 서브 카테고리 데이터
 */
export const subCategories = [
  // 시그니처 컬렉션 서브 카테고리
  { id: 101, categoryId: 1, name: '아로마 & 디퓨저', slug: 'aroma-diffuser' },
  { id: 102, categoryId: 1, name: '목욕 제품', slug: 'bath-products' },
  { id: 103, categoryId: 1, name: '침구 & 가운', slug: 'bedding-robes' },

  // 힐링 & 웰니스 컬렉션 서브 카테고리
  { id: 201, categoryId: 2, name: '명상 & 요가', slug: 'meditation-yoga' },
  { id: 202, categoryId: 2, name: '수면 & 릴렉스', slug: 'sleep-relax' },
  { id: 203, categoryId: 2, name: '아로마테라피', slug: 'aromatherapy' },

  // 에코 & 지속가능한 라이프스타일 제품 서브 카테고리
  { id: 301, categoryId: 3, name: '친환경 생활용품', slug: 'eco-living' },
  { id: 302, categoryId: 3, name: '유기농 퍼스널 케어', slug: 'organic-care' },
  { id: 303, categoryId: 3, name: '지속가능한 여행용품', slug: 'sustainable-travel' },

  // 휴식을 위한 식음료 제품 서브 카테고리
  { id: 401, categoryId: 4, name: '차 & 티웨어', slug: 'tea-teaware' },
  { id: 402, categoryId: 4, name: '유기농 식품', slug: 'organic-food' },
  { id: 403, categoryId: 4, name: '와인 & 음료', slug: 'wine-beverages' },

  // 객실 등급별 맞춤 컬렉션 서브 카테고리
  { id: 501, categoryId: 5, name: '컴포트 & 하모니 컬렉션', slug: 'comfort-harmony' },
  { id: 502, categoryId: 5, name: '세레니티 컬렉션', slug: 'serenity' },
  { id: 503, categoryId: 5, name: '패밀리 & 레이크 컬렉션', slug: 'family-lake' },
  { id: 504, categoryId: 5, name: '얼티메이트 컬렉션', slug: 'ultimate' },

  // 메모리 & 컬렉터블 아이템 서브 카테고리
  { id: 601, categoryId: 6, name: '포토 & 아트', slug: 'photo-art' },
  { id: 602, categoryId: 6, name: '미니어처 & 피규어', slug: 'miniatures-figures' },
  { id: 603, categoryId: 6, name: '시즌 & 한정판 컬렉션', slug: 'seasonal-limited' },
];
