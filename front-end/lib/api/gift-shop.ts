import { categories, subCategories } from '@/lib/data/gift-shop/categories';
import { featuredProducts } from '@/lib/data/gift-shop/featured-products';
import { products } from '@/lib/data/gift-shop/products';
import {
  Product,
  ProductCategory,
  ProductFilterParams,
  ProductSubCategory,
} from '@/lib/types/gift-shop';
import axios from 'axios';
import apiClient from './client';

/**
 * 개발 환경에서는 더미 데이터 사용, 프로덕션에서는 실제 API 호출
 */
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * 카테고리 목록 가져오기
 */
export async function getCategories(): Promise<ProductCategory[]> {
  if (isDevelopment) {
    return categories;
  }

  const response = await apiClient.get('/api/gift-shop/categories');
  return response;
}

/**
 * 서브 카테고리 목록 가져오기
 */
export async function getSubCategories(categoryId?: number): Promise<ProductSubCategory[]> {
  if (isDevelopment) {
    return categoryId ? subCategories.filter((sc) => sc.categoryId === categoryId) : subCategories;
  }

  const url = categoryId
    ? `/api/gift-shop/sub-categories?categoryId=${categoryId}`
    : '/api/gift-shop/sub-categories';
  const response = await apiClient.get(url);
  return response;
}

/**
 * 모든 상품 목록 가져오기 (필터링 가능)
 */
export async function getProducts(params?: ProductFilterParams): Promise<Product[]> {
  if (isDevelopment) {
    return filterProducts(products, params);
  }

  // 실제 API 호출시 쿼리 파라미터 구성
  const response = await apiClient.get('/api/gift-shop/products', { params });
  return response;
}

/**
 * 추천 상품 가져오기
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  if (isDevelopment) {
    return featuredProducts;
  }

  const response = await apiClient.get('/api/gift-shop/products/featured');
  return response;
}

/**
 * 신상품 가져오기
 */
export async function getNewArrivals(): Promise<Product[]> {
  if (isDevelopment) {
    return products.filter((p) => p.isNewArrival);
  }

  const response = await apiClient.get('/api/gift-shop/products/new-arrivals');
  return response;
}

/**
 * 한정판 상품 가져오기
 */
export async function getLimitedEditions(): Promise<Product[]> {
  if (isDevelopment) {
    return products.filter((p) => p.isLimitedEdition);
  }

  const response = await apiClient.get('/api/gift-shop/products/limited');
  return response;
}

/**
 * 할인 상품 가져오기
 */
export async function getDiscountedProducts(): Promise<Product[]> {
  if (isDevelopment) {
    return products.filter((p) => p.isDiscounted);
  }

  const response = await apiClient.get('/api/gift-shop/products/discounted');
  return response;
}

/**
 * 상품 상세 정보 가져오기
 */
export async function getProductById(productId: number): Promise<Product | null> {
  if (isDevelopment) {
    const product = products.find((p) => p.id === productId);
    return product || null;
  }

  try {
    const response = await apiClient.get(`/api/gift-shop/products/${productId}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

/**
 * 카테고리별 상품 가져오기
 */
export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  return getProducts({ categoryId });
}

/**
 * 서브 카테고리별 상품 가져오기
 */
export async function getProductsBySubCategory(subCategoryId: number): Promise<Product[]> {
  return getProducts({ subCategoryId });
}

/**
 * 상품 검색
 */
export async function searchProducts(search: string): Promise<Product[]> {
  return getProducts({ search });
}

/**
 * 로컬 상품 필터링 함수 (개발 환경용)
 */
function filterProducts(productList: Product[], params?: ProductFilterParams): Product[] {
  if (!params) return productList;

  let filtered = [...productList];

  // 카테고리 필터링
  if (params.categoryId) {
    filtered = filtered.filter((p) => p.categoryId === params.categoryId);
  }

  // 서브 카테고리 필터링
  if (params.subCategoryId) {
    filtered = filtered.filter((p) => p.subCategoryId === params.subCategoryId);
  }

  // 가격 범위 필터링
  if (params.minPrice) {
    filtered = filtered.filter((p) => p.price >= params.minPrice!);
  }

  if (params.maxPrice) {
    filtered = filtered.filter((p) => p.price <= params.maxPrice!);
  }

  // 검색어 필터링
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
    );
  }

  // 특징 필터링
  if (params.featured) {
    filtered = filtered.filter((p) => p.isFeatured);
  }

  if (params.newArrival) {
    filtered = filtered.filter((p) => p.isNewArrival);
  }

  if (params.limitedEdition) {
    filtered = filtered.filter((p) => p.isLimitedEdition);
  }

  if (params.discounted) {
    filtered = filtered.filter((p) => p.isDiscounted);
  }

  if (params.relatedRoom) {
    filtered = filtered.filter((p) => p.relatedRoom === params.relatedRoom);
  }

  return filtered;
}
