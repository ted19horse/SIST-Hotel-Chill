// [파일 설명]
// 이 파일은 '마이페이지(내 계정)' 메인 페이지의 진입점입니다.
// Next.js App Router 구조에서 (main)/my-account 세그먼트의 첫 화면을 담당합니다.
// 주요 역할: 회원의 프로필, 예약, 리워드, 결제수단, 환경설정, 고객지원 등 다양한 마이페이지 기능을 탭 형태로 제공하고 렌더링합니다.
//
// 주요 개념:
// - 'use client' 지시문: 클라이언트 컴포넌트임을 명시
// - React 함수형 컴포넌트 구조, useState 훅 사용
// - 여러 개의 재사용 컴포넌트 조합 (예: ProfileSummary, RoomReservations 등)
// - 동적 섹션 렌더링(탭 전환)
// - Next.js의 Link 컴포넌트 활용
// - TypeScript의 타입 추론(필요시)
//
// 초보자 팁:
// 각 import, 상태, 핸들러, 렌더링 영역별 상세 주석을 참고하세요.

'use client';

import ScrollToTop from '@/components/common/home/ScrollToTop'; // 페이지 상단 이동 버튼
import Footer from '@/components/common/layout/Footer'; // 공통 푸터
import Header from '@/components/common/layout/Header'; // 공통 헤더
import AccountLayout from '@/components/my-account/AccountLayout'; // 마이페이지 전체 레이아웃
import DiningReservations from '@/components/my-account/DiningReservations'; // 다이닝 예약 내역
import MembershipRewards from '@/components/my-account/MembershipRewards'; // 멤버십 리워드(포인트 등)
import PaymentMethods from '@/components/my-account/PaymentMethods'; // 결제수단 관리
import Preferences from '@/components/my-account/Preferences'; // 환경설정
import ProfileSettings from '@/components/my-account/ProfileSettings'; // 프로필 설정
import ProfileSummary from '@/components/my-account/ProfileSummary'; // 프로필 요약
import RoomReservations from '@/components/my-account/RoomReservations'; // 객실 예약 내역
import Support from '@/components/my-account/Support'; // 고객지원
import { ChevronRight } from 'lucide-react'; // 아이콘
import Link from 'next/link'; // Next.js 라우팅용 링크 컴포넌트
import { useState } from 'react'; // React 상태 관리 훅

// [탭/섹션 정의]
// 각 탭(섹션)별로 한글 이름을 매핑합니다.
const sections = {
  overview: '개요',
  profile: '프로필',
  roomReservations: '객실-예약',
  diningReservations: '다이닝-예약',
  rewards: '리워드',
  payments: '결제수단',
  preferences: '환경설정',
  support: '고객지원',
};

/**
 * MyAccountPage 컴포넌트
 * - 회원의 마이페이지 주요 UI를 탭 형태로 렌더링합니다.
 * - 각 섹션별로 하위 컴포넌트를 동적으로 렌더링합니다.
 */
export default function MyAccountPage() {
  // [상태 관리]
  // activeSection: 현재 활성화된 탭(섹션)
  const [activeSection, setActiveSection] = useState(sections.overview);

  // [섹션 렌더링 함수]
  // activeSection 값에 따라 해당 컴포넌트를 반환합니다.
  const renderSection = () => {
    switch (activeSection) {
      case sections.overview:
        return <ProfileSummary />;
      case sections.profile:
        return <ProfileSettings />;
      case sections.roomReservations:
        return <RoomReservations />;
      case sections.diningReservations:
        return <DiningReservations />;
      case sections.rewards:
        return <MembershipRewards />;
      case sections.payments:
        return <PaymentMethods />;
      case sections.preferences:
        return <Preferences />;
      case sections.support:
        return <Support />;
      default:
        return null;
    }
  };

  // [렌더링 영역]
  // 헤더, 네비게이션, 탭 UI, 각 섹션별 컨텐츠, 푸터를 렌더링합니다.
  return (
    <main className="min-h-screen">
      <ScrollToTop /> {/* 페이지 상단 이동 버튼 */}
      <Header /> {/* 공통 헤더 */}

      {/* [배너 영역] */}
      {/* 배경 이미지와 타이틀, 네비게이션(홈 > 마이페이지) 표시 */}
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">마이 페이지</h1>
            <div className="flex items-center justify-center text-sm">
              <Link href="/" className="hover:underline">
                홈
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>마이 페이지</span>
            </div>
          </div>
        </div>
      </div>

      <AccountLayout
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sections={sections}
      >
        {renderSection()}
      </AccountLayout>

      {/* 푸터 */}
      <Footer />
    </main>
  );
}
