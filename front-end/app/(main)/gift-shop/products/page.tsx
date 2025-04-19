// [파일 설명]
// 이 파일은 '기프트샵 상품 목록' 메인 페이지의 진입점입니다.
// Next.js App Router 구조에서 (main)/gift-shop/products 세그먼트의 첫 화면을 담당합니다.
// 주요 역할: 기프트샵 상품 검색, 필터링, 상품 목록, 장바구니 등 주요 UI를 렌더링합니다.
//
// 주요 개념:
// - React 함수형 컴포넌트 구조
// - 여러 개의 재사용 컴포넌트 조합 (예: ProductFilters, ProductGrid, ShoppingCart 등)
// - Next.js의 Link 컴포넌트와 동적 내비게이션
// - 상품 필터링, 검색, 장바구니 등 상태 기반 UI 구현
//
// 초보자 팁:
// 각 import, 주요 컴포넌트, 렌더링 영역별 상세 주석을 참고하세요.

import Footer from '@/components/common/layout/Footer'; // 공통 푸터
import Header from '@/components/common/layout/Header'; // 공통 헤더
import ProductFilters from '@/components/gift-shop/ProductFilters'; // 상품 필터 컴포넌트
import ProductGrid from '@/components/gift-shop/ProductGrid'; // 상품 목록 컴포넌트
import ProductSearch from '@/components/gift-shop/ProductSearch'; // 상품 검색 컴포넌트
import ShoppingCart from '@/components/gift-shop/ShoppingCart'; // 장바구니 컴포넌트
import { ChevronRight } from 'lucide-react'; // 아이콘
import Link from 'next/link'; // 라우팅용 링크

/**
 * GiftShopProductsPage 컴포넌트
 * - 기프트샵 상품 목록, 검색, 필터, 장바구니 등 다양한 UI를 렌더링합니다.
 */
export default function GiftShopProductsPage() {
  return (
    <main className="min-h-screen">
      {/* [헤더 영역] */}
      <Header />

      {/* [페이지 배너 영역] */}
      <div className="relative h-[30vh] bg-neutral-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=800&width=1920')",
            opacity: 0.6,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">기프트샵</h1>
            <div className="flex items-center justify-center text-sm">
              <Link href="/" className="hover:underline">
                홈
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link href="/gift-shop" className="hover:underline">
                기프트샵
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>상품</span>
            </div>
          </div>
        </div>
      </div>

      {/* [메인 콘텐츠 영역] */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* [사이드바 - 필터/검색/장바구니] */}
          <div className="w-full md:w-1/4">
            <div className="sticky top-24">
              <ProductSearch /> {/* 상품 검색 */}
              <ProductFilters /> {/* 상품 필터 */}
              <ShoppingCart /> {/* 장바구니 */}
            </div>
          </div>
          {/* [상품 목록 영역] */}
          <div className="w-full md:w-3/4">
            <ProductGrid /> {/* 상품 목록 */}
          </div>
        </div>
      </div>

      {/* [푸터 영역] */}
      <Footer />
    </main>
  );
}
