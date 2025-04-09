/**
 * 객실 메인 페이지
 * 
 * 사용 가능한 모든 객실 타입을 목록으로 표시하고 필터링할 수 있는 페이지입니다.
 * 사용자는 여기서 객실을 검색하고 상세 정보를 확인하거나 예약을 진행할 수 있습니다.
 */

import PageBanner from '@/components/common/layout/PageBanner';
import ScrollToTop from '@/components/common/home/ScrollToTop';
import RoomFilters from '@/components/rooms/RoomFilters';
import RoomList from '@/components/rooms/RoomList';
import { Suspense } from 'react';

/**
 * 객실 메인 페이지 컴포넌트
 * 객실 목록과 필터링 UI를 표시합니다.
 */
export default function RoomsPage() {
  return (
    <main className="min-h-screen">
      <ScrollToTop />
      
      {/* 페이지 배너 - 공통 컴포넌트 사용 */}
      <PageBanner 
        title="객실 안내" 
        breadcrumbs={[
          { label: '홈', href: '/' }, 
          { label: '객실' }
        ]} 
        backgroundImage="/placeholder.svg?height=800&width=1920" 
      />

      {/* 객실 필터 및 목록 */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">객실 예약</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 사이드바 필터 */}
          <aside className="lg:w-1/4">
            <Suspense
              fallback={<div className="animate-pulse bg-gray-200 rounded-lg h-[600px]"></div>}
            >
              <RoomFilters />
            </Suspense>
          </aside>

          {/* 객실 목록 */}
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
              {/* RoomList 컴포넌트는 내부적으로 데이터를 가져옵니다 */}
              <RoomList />
            </Suspense>
          </main>
        </div>
      </div>
    </main>
  );
}
