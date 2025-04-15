// [파일 설명]
// 이 파일은 '멤버십' 메인 페이지의 진입점입니다.
// Next.js App Router 구조에서 (main)/membership 세그먼트의 첫 화면을 담당합니다.
// 주요 역할: 호텔 멤버십 프로그램 소개, 등급, 포인트, 이벤트 등 멤버십 관련 주요 UI를 렌더링합니다.
//
// 주요 개념:
// - React 함수형 컴포넌트 구조
// - 여러 개의 재사용 컴포넌트 조합 (예: MembershipHero, MembershipTiers, PointsSystem 등)
// - Next.js의 동적 라우팅 및 Link 컴포넌트 활용
// - TypeScript의 타입 추론(필요시)
//
// 초보자 팁:
// 각 import, 렌더링 영역, 컴포넌트별로 상세 주석을 참고하세요.

import ScrollToTop from '@/components/common/home/ScrollToTop'; // 페이지 상단 이동 버튼
import Footer from '@/components/common/layout/Footer'; // 공통 푸터
import Header from '@/components/common/layout/Header'; // 공통 헤더
import DigitalCard from '@/components/membership/DigitalCard'; // 디지털 멤버십 카드
import MembershipFaq from '@/components/membership/MembershipFaq'; // 자주 묻는 질문
import MembershipHero from '@/components/membership/MembershipHero'; // 멤버십 메인 소개
import MembershipTiers from '@/components/membership/MembershipTiers'; // 멤버십 등급
import PointsSystem from '@/components/membership/PointsSystem'; // 포인트 제도
import RegistrationForm from '@/components/membership/RegistrationForm'; // 가입 폼
import RoomRates from '@/components/membership/RoomRates'; // 객실 요금 안내
import SpecialEvents from '@/components/membership/SpecialEvents'; // 특별 이벤트
import Testimonials from '@/components/membership/Testimonials'; // 후기
import { ChevronRight } from 'lucide-react'; // 아이콘
import Link from 'next/link'; // Next.js 라우팅용 링크 컴포넌트

/**
 * MembershipPage 컴포넌트
 * - 멤버십 관련 주요 UI를 렌더링합니다.
 * - 여러 개의 하위 컴포넌트(소개, 등급, 포인트, 이벤트, FAQ 등)로 구성됩니다.
 */
export default function MembershipPage() {
  return (
    <main className="min-h-screen">
      <ScrollToTop /> {/* 페이지 상단 이동 버튼 */}
      <Header /> {/* 공통 헤더 */}

      {/* [배너 영역] */}
      {/* 배경 이미지와 타이틀, 네비게이션(홈 > 멤버십) 표시 */}
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">멤버십</h1>
            <div className="flex items-center justify-center text-sm">
              <Link href="/" className="hover:underline">
                홈
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>멤버십</span>
            </div>
          </div>
        </div>
      </div>

      {/* [멤버십 메인 소개] */}
      <MembershipHero />

      {/* [멤버십 등급 안내] */}
      <MembershipTiers />

      {/* [포인트 제도 안내] */}
      <PointsSystem />

      {/* [객실 요금 안내] */}
      <RoomRates />

      {/* [특별 이벤트 안내] */}
      <SpecialEvents />

      {/* [후기] */}
      <Testimonials />

      {/* [디지털 멤버십 카드 안내] */}
      <DigitalCard />

      {/* [가입 폼] */}
      <RegistrationForm />

      {/* [자주 묻는 질문(FAQ)] */}
      <MembershipFaq />

      {/* [공통 푸터] */}
      <Footer />
    </main>
  );
}
