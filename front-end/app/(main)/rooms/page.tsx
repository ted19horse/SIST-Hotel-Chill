// [파일 설명]
// 이 파일은 '객실' 메인 페이지의 진입점입니다.
// Next.js App Router 구조에서 (main)/rooms 세그먼트의 첫 화면을 담당합니다.
// 주요 역할: 호텔의 다양한 객실 타입을 목록으로 보여주고, 필터링 및 예약으로 연결하는 UI를 렌더링합니다.
//
// 주요 개념:
// - React 함수형 컴포넌트 구조, Suspense로 비동기 컴포넌트 처리
// - 여러 개의 재사용 컴포넌트 조합 (예: PageBanner, RoomFilters, RoomList 등)
// - Next.js의 App Router 및 공통 레이아웃 활용
// - TypeScript의 타입 추론(필요시)
//
// 초보자 팁:
// 각 import, 렌더링 영역, 컴포넌트별로 상세 주석을 참고하세요.

/**
 * 객실 메인 페이지
 * 
 * 사용 가능한 모든 객실 타입을 목록으로 표시하고 필터링할 수 있는 페이지입니다.
 * 사용자는 여기서 객실을 검색하고 상세 정보를 확인하거나 예약을 진행할 수 있습니다.
 */

import PageBanner from '@/components/common/layout/PageBanner'; // 공통 배너 컴포넌트
import RoomFilters from '@/components/rooms/RoomFilters'; // 객실 필터
import RoomList from '@/components/rooms/RoomList'; // 객실 목록
import { Suspense } from 'react'; // 비동기 컴포넌트 처리용

/**
 * RoomsPage 컴포넌트
 * - 객실 목록과 필터링 UI를 표시합니다.
 * - Suspense를 사용해 비동기 로딩 상태를 처리합니다.
 */
export default function RoomsPage() {
  return (
    <main className="min-h-screen">
      {/* [배너 영역] */}
      {/* 공통 PageBanner 컴포넌트로 타이틀, 네비게이션, 배경이미지 표시 */}
      <PageBanner 
        title="객실 안내" 
        breadcrumbs={[
          { label: '홈', href: '/' }, 
          { label: '객실' }
        ]} 
        backgroundImage="/placeholder.svg?height=800&width=1920" 
      />

      {/* [객실 필터 및 목록 영역] */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">객실 예약</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* [사이드바: 객실 필터] */}
          <aside className="lg:w-1/4">
            <Suspense
              fallback={<div className="animate-pulse bg-gray-200 rounded-lg h-[600px]"></div>}
            >
              <RoomFilters />
            </Suspense>
          </aside>

          {/* [메인: 객실 목록] */}
          <main className="lg:w-3/4">
            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                      <div className="bg-gray-200 h-40 rounded-b-lg mt-1"></div>
                    </div>
                  ))}
                </div>
              }
            >
              <RoomList />
            </Suspense>
          </main>
        </div>
      </div>
    </main>
  );
}
