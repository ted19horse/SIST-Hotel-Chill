/**
 * 객실 상세 페이지
 * 
 * 특정 객실의 상세 정보를 표시하는 페이지입니다.
 * 객실 이미지, 설명, 특징, 어메니티, 요금 정보 등을 제공합니다.
 */

import { notFound } from 'next/navigation';
import PageBanner from '@/components/common/layout/PageBanner';
import ScrollToTop from '@/components/common/home/ScrollToTop';
import RoomDetail from '@/components/rooms/detail/RoomDetail';
import { getRoomById } from '@/data/rooms';
import { Suspense } from 'react';

interface RoomDetailPageProps {
  params: {
    id: string;
  };
}

/**
 * 객실 상세 페이지 컴포넌트
 * 
 * URL에서 객실 ID를 받아 해당 객실의 상세 정보를 표시합니다.
 * 
 * @param props 컴포넌트 속성 (URL 파라미터 포함)
 * @returns JSX.Element
 */
export default function RoomDetailPage({ params }: RoomDetailPageProps) {
  // 객실 데이터 가져오기
  const room = getRoomById(params.id);
  
  // 객실 데이터가 없으면 404 페이지
  if (!room) {
    notFound();
  }
  
  return (
    <main className="min-h-screen">
      <ScrollToTop />
      
      {/* 페이지 배너 */}
      <PageBanner 
        title={room.name} 
        subtitle={`${room.size}㎡ | 최대 ${room.maxOccupancy}인`}
        breadcrumbs={[
          { label: '홈', href: '/' },
          { label: '객실', href: '/rooms' },
          { label: room.name }
        ]} 
        backgroundImage="/placeholder.svg?height=800&width=1920" 
      />

      {/* 객실 상세 정보 */}
      <div className="container mx-auto px-4 py-12">
        <Suspense fallback={<div className="animate-pulse bg-gray-200 h-[400px] rounded-lg"></div>}>
          <RoomDetail roomId={params.id} />
        </Suspense>
      </div>
    </main>
  );
}
