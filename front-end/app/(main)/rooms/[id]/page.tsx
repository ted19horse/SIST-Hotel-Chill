// [파일 설명]
// 이 파일은 '객실 상세' 메인 페이지의 진입점입니다.
// Next.js App Router 구조에서 (main)/rooms/[id] 세그먼트의 첫 화면을 담당합니다.
// 주요 역할: 특정 객실의 상세 정보(이미지, 설명, 특징, 어메니티, 요금 등)를 렌더링합니다.
//
// 주요 개념:
// - React 함수형 컴포넌트 구조, TypeScript의 props 인터페이스 활용
// - Next.js의 notFound 등 내비게이션 함수 사용
// - 여러 개의 재사용 컴포넌트 조합 (예: PageBanner, RoomDetail 등)
// - URL 파라미터를 통한 동적 데이터 처리
// - Suspense로 비동기 컴포넌트 처리
//
// 초보자 팁:
// 각 import, props, 주요 로직, 렌더링 영역별 상세 주석을 참고하세요.

/**
 * 객실 상세 페이지
 * 
 * 특정 객실의 상세 정보를 표시하는 페이지입니다.
 * 객실 이미지, 설명, 특징, 어메니티, 요금 정보 등을 제공합니다.
 */

import { notFound } from 'next/navigation'; // Next.js 내비게이션 함수
import PageBanner from '@/components/common/layout/PageBanner'; // 공통 배너 컴포넌트
import RoomDetail from '@/components/rooms/detail/RoomDetail'; // 객실 상세 정보 컴포넌트
import { getRoomById } from '@/lib/data/rooms'; // 객실 데이터 조회 함수
import { Suspense } from 'react'; // 비동기 컴포넌트 처리용

// [props 타입 정의]
// URL 파라미터로 전달되는 값의 타입을 명확히 지정합니다.
interface RoomDetailPageProps {
  params: {
    id: string;
  };
}

/**
 * RoomDetailPage 컴포넌트
 * - URL 파라미터에서 객실 ID를 받아 상세 정보를 렌더링합니다.
 * - 데이터가 없을 때는 예외 처리(404)합니다.
 */
export default function RoomDetailPage({ params }: RoomDetailPageProps) {
  // [객실 데이터 가져오기]
  // params.id를 사용해 해당 객실 정보를 조회합니다.
  const room = getRoomById(params.id);
  
  // [객실 데이터가 없을 때 404]
  if (!room) {
    notFound();
  }
  
  // [렌더링 영역]
  // 배너, 객실 상세 정보 등 주요 UI를 렌더링합니다.
  return (
    <main className="min-h-screen">
      {/* [배너 영역] */}
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
      <div className="container mx-auto px-4 py-12">
        {/* [객실 상세 정보] */}
        <Suspense fallback={<div className="animate-pulse bg-gray-200 rounded-lg h-[600px]" />}> 
          <RoomDetail roomId={params.id} />
        </Suspense>
      </div>
    </main>
  );
}
