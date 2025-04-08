/**
 * 기프트샵 카테고리 타입 정의
 */
export interface ProductCategory {
  id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
}

/**
 * 서브 카테고리 타입 정의
 */
export interface ProductSubCategory {
  id: number;
  categoryId: number;
  name: string;
  slug: string;
}

/**
 * 상품 특징 타입
 */
export interface ProductFeature {
  isFeatured?: boolean; // 추천 제품
  isNewArrival?: boolean; // 신상품
  isLimitedEdition?: boolean; // 한정판
  isDiscounted?: boolean; // 할인 제품
  discountPrice?: number; // 할인 가격
  relatedRoom?: string; // 관련 객실
}

/**
 * 상품 타입 정의
 */
export interface Product extends ProductFeature {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  subCategoryId?: number;
  images: string[];
  sku: string;
  stock: number;
}

/**
 * 상품 필터 파라미터 타입
 */
export interface ProductFilterParams {
  categoryId?: number;
  subCategoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  featured?: boolean;
  newArrival?: boolean;
  limitedEdition?: boolean;
  discounted?: boolean;
  relatedRoom?: string;
}

/**
 * 장바구니 아이템 타입
 */
export interface CartItem {
  productId: number;
  name: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  image: string;
}

/**
 * 장바구니 타입
 */
export interface Cart {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}
