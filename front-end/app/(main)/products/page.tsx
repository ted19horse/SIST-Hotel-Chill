// [파일 설명]
// 이 파일은 '기프트샵 상품 목록' 메인 페이지의 진입점입니다.
// Next.js App Router 구조에서 (main)/products 세그먼트의 첫 화면을 담당합니다.
// 주요 역할: 기프트샵의 상품 검색, 필터, 장바구니, 상품 목록 등 상품 관련 주요 UI를 렌더링합니다.
//
// 주요 개념:
// - React 함수형 컴포넌트 구조
// - 여러 개의 재사용 컴포넌트 조합 (예: ProductGrid, ProductFilters, ShoppingCart 등)
// - Next.js의 Link 컴포넌트 활용
// - TypeScript의 타입 추론(필요시)
//
// 초보자 팁:
// 각 import, 렌더링 영역, 컴포넌트별로 상세 주석을 참고하세요.

import Footer from '@/components/common/layout/Footer'; // 공통 푸터
import Header from '@/components/common/layout/Header'; // 공통 헤더
import ProductFilters from '@/components/gift-shop/ProductFilters'; // 상품 필터
import ProductGrid from '@/components/gift-shop/ProductGrid'; // 상품 목록 그리드
import ProductSearch from '@/components/gift-shop/ProductSearch'; // 상품 검색
import ShoppingCart from '@/components/gift-shop/ShoppingCart'; // 장바구니
import { ChevronRight } from 'lucide-react'; // 아이콘
import Link from 'next/link'; // Next.js 라우팅용 링크 컴포넌트

/**
 * GiftShopProductsPage 컴포넌트
 * - 기프트샵 상품 목록, 검색, 필터, 장바구니 등 주요 UI를 렌더링합니다.
 * - 여러 개의 하위 컴포넌트로 구성됩니다.
 */
export default function GiftShopProductsPage() {
  return (
    <main className="min-h-screen">
      <Header /> {/* 공통 헤더 */}

      {/* [배너 영역] */}
      {/* 배경 이미지와 타이틀, 네비게이션(홈 > 기프트샵 > 상품) 표시 */}
      <div className="relative h-[30vh] bg-neutral-900">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/placeholder.svg?height=800&width=1920')", opacity: 0.6 }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">기프트샵</h1>
            <div className="flex items-center justify-center text-sm">
              <Link href="/" className="hover:underline">홈</Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link href="/gift-shop" className="hover:underline">기프트샵</Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>상품</span>
            </div>
          </div>
        </div>
      </div>

      {/* [상품 목록 및 사이드바 영역] */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* [사이드바: 검색/필터/장바구니] */}
          <div className="w-full md:w-1/4">
            <div className="sticky top-24">
              <ProductSearch /> {/* 상품 검색 */}
              <ProductFilters /> {/* 상품 필터 */}
              <ShoppingCart /> {/* 장바구니 */}
            </div>
          </div>
          {/* [메인: 상품 목록 그리드] */}
          <div className="w-full md:w-3/4">
            <ProductGrid />
          </div>
        </div>
      </div>

      {/* [공통 푸터] */}
      <Footer />
    </main>
  );
}
