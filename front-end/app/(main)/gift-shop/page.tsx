// [파일 설명]
// 이 파일은 '기프트샵' 메인 페이지의 진입점입니다.
// Next.js App Router 구조에서 (main)/gift-shop 세그먼트의 첫 화면을 담당합니다.
// 주요 역할: 기프트샵 소개, 카테고리, 추천 상품, 정보 등 기프트샵 관련 주요 UI를 렌더링합니다.
//
// 주요 개념:
// - React 함수형 컴포넌트 구조
// - 여러 개의 재사용 컴포넌트 조합
// - Next.js의 동적 라우팅 및 Link 컴포넌트 활용
// - TypeScript의 타입 추론(필요시)
//
// 초보자 팁:
// 각 import, 렌더링 영역, 컴포넌트별로 상세 주석을 참고하세요.

import ScrollToTop from '@/components/common/home/ScrollToTop'; // 페이지 상단 이동 버튼
import Footer from '@/components/common/layout/Footer'; // 공통 푸터
import Header from '@/components/common/layout/Header'; // 공통 헤더
import CategoryGrid from '@/components/gift-shop/CategoryGrid'; // 상품 카테고리 그리드
import FeaturedProducts from '@/components/gift-shop/FeaturedProducts'; // 추천 상품
import ShopInfo from '@/components/gift-shop/ShopInfo'; // 기프트샵 정보
import ShopIntro from '@/components/gift-shop/ShopIntro'; // 기프트샵 소개
import { ChevronRight } from 'lucide-react'; // 아이콘
import Link from 'next/link'; // Next.js 라우팅용 링크 컴포넌트

/**
 * GiftShopPage 컴포넌트
 * - 기프트샵 관련 주요 UI를 렌더링합니다.
 * - 여러 개의 하위 컴포넌트(소개, 카테고리, 추천 상품, 정보 등)로 구성됩니다.
 */
export default function GiftShopPage() {
  return (
    <main className="min-h-screen">
      <ScrollToTop /> {/* 페이지 상단 이동 버튼 */}
      <Header /> {/* 공통 헤더 */}

      {/* [배너 영역] */}
      {/* 배경 이미지와 타이틀, 네비게이션(홈 > 기프트샵) 표시 */}
      <div className="relative h-[40vh] bg-neutral-900">
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
              <span>기프트샵</span>
            </div>
          </div>
        </div>
      </div>

      {/* [기프트샵 소개] */}
      <ShopIntro />

      {/* [카테고리 그리드] */}
      <CategoryGrid />

      {/* [추천 상품] */}
      <FeaturedProducts />

      {/* [기프트샵 정보] */}
      <ShopInfo />

      {/* [공통 푸터] */}
      <Footer />
    </main>
  );
}
