import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/common/layout/Header';
import Footer from '@/components/common/layout/Footer';
import MainCarousel from '@/components/common/home/MainCarousel';
import ReservationPanel from '@/components/common/forms/ReservationPanel';
import { getRoomTypes } from '@/lib/api/rooms';

// 로딩 Skeleton UI 컴포넌트
function SectionSkeleton() {
  return <div className="h-96 bg-gray-100 animate-pulse rounded-lg my-8"></div>;
}

// 동적 임포트 사용 - 코드 분할을 통한 번들 크기 감소
const DiningSection = dynamic(
  () => import('@/components/dining/DiningSection'),
  {
    loading: () => <SectionSkeleton />,
    ssr: true // 선택적: 서버 사이드 렌더링 활성화
  }
);

const GiftShopSection = dynamic(
  () => import('@/components/gift-shop/GiftShopSection'),
  {
    loading: () => <SectionSkeleton />,
    ssr: false // 초기 로드 시 필요하지 않은 컴포넌트는 CSR로 처리
  }
);

// 기본 임포트 대신 동적 임포트 사용
const RoomSection = dynamic(
  () => import('@/components/rooms/RoomSection'),
  {
    loading: () => <SectionSkeleton />,
    ssr: true // 중요 섹션은 SSR로 처리
  }
);

/**
 * 메인 페이지 컴포넌트 - 서버 컴포넌트
 * 
 * 성능 최적화:
 * 1. 서버 컴포넌트에서 데이터 페칭
 * 2. 동적 임포트를 통한 코드 분할
 * 3. Suspense를 통한 스트리밍 렌더링
 * 4. 중복 컴포넌트 제거
 * 
 * @returns {Promise<JSX.Element>} 렌더링된 메인 페이지
 */
export default async function Home() {
  // 서버 컴포넌트에서 데이터 페칭 (클라이언트 요청 제거)
  const rooms = await getRoomTypes();

  return (
    <main className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Carousel Section */}
      <section className="relative w-full h-screen">
        <MainCarousel />
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <ReservationPanel />
        </div>
      </section>

      {/* Room Section - 서버에서 가져온 데이터 전달 */}
      <Suspense fallback={<SectionSkeleton />}>
        <RoomSection rooms={rooms} />
      </Suspense>

      {/* Dining Section - 지연 로딩 적용 */}
      <Suspense fallback={<SectionSkeleton />}>
        <DiningSection />
      </Suspense>

      {/* Gift Shop Section - 가장 마지막에 로드 */}
      <Suspense fallback={<SectionSkeleton />}>
        <GiftShopSection />
      </Suspense>

      {/* Footer */}
      <Footer />
    </main>
  );
}
