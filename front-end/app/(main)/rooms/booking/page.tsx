// [파일 설명]
// 이 파일은 '객실 예약' 메인 페이지의 진입점입니다.
// Next.js App Router 구조에서 (main)/rooms/booking 세그먼트의 첫 화면을 담당합니다.
// 주요 역할: 선택한 객실의 예약 정보를 입력받고, 예약을 진행하는 폼과 관련 UI를 렌더링합니다.
//
// 주요 개념:
// - React 함수형 컴포넌트 구조, TypeScript의 props 인터페이스 활용
// - Next.js의 notFound, redirect 등 내비게이션 함수 사용
// - 여러 개의 재사용 컴포넌트 조합 (예: PageBanner, RoomBookingForm 등)
// - URL 쿼리 파라미터를 통한 동적 데이터 처리
// - Suspense로 비동기 컴포넌트 처리
//
// 초보자 팁:
// 각 import, props, 주요 로직, 렌더링 영역별 상세 주석을 참고하세요.

/**
 * 객실 예약 페이지
 * 
 * 선택한 객실에 대한 예약 정보를 입력하고 예약을 진행하는 페이지입니다.
 * 날짜 선택, 인원 정보, 요금 정보, 결제 정보 등을 입력 받습니다.
 */

import { notFound, redirect } from 'next/navigation'; // Next.js 내비게이션 함수
import PageBanner from '@/components/common/layout/PageBanner'; // 공통 배너 컴포넌트
import RoomBookingForm from '@/components/rooms/booking/RoomBookingForm'; // 객실 예약 폼
import { getRoomById } from '@/lib/data/rooms'; // 객실 데이터 조회 함수
import { Suspense } from 'react'; // 비동기 컴포넌트 처리용

// [props 타입 정의]
// URL 쿼리 파라미터로 전달되는 값의 타입을 명확히 지정합니다.
interface RoomBookingPageProps {
  searchParams: {
    roomId?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
  };
}

/**
 * RoomBookingPage 컴포넌트
 * - URL 쿼리 파라미터에서 객실 정보를 받아 예약 폼을 렌더링합니다.
 * - 필수 파라미터가 없거나 데이터가 없을 때는 예외 처리(리다이렉트/404)합니다.
 */
export default function RoomBookingPage({ searchParams }: RoomBookingPageProps) {
  // [필수 파라미터 확인]
  // 객실 ID가 없으면 객실 목록 페이지로 리다이렉트
  if (!searchParams.roomId) {
    redirect('/rooms');
  }
  
  // [객실 데이터 가져오기]
  // roomId로 객실 정보를 조회합니다.
  const room = getRoomById(searchParams.roomId);
  
  // [객실 데이터가 없거나 예약 불가 시 404]
  if (!room || room.availability.available === 0) {
    notFound();
  }
  
  // [초기값 세팅]
  // URL 파라미터에서 날짜 및 인원 정보를 받아 예약 폼의 초기값으로 사용합니다.
  const initialValues = {
    checkIn: searchParams.checkIn ? new Date(searchParams.checkIn) : undefined,
    checkOut: searchParams.checkOut ? new Date(searchParams.checkOut) : undefined,
    adults: searchParams.adults ? Number(searchParams.adults) : 2,
    children: searchParams.children ? Number(searchParams.children) : 0,
  };

  // [렌더링 영역]
  // 배너, 예약 폼 등 주요 UI를 렌더링합니다.
  return (
    <main className="min-h-screen">
      {/* [배너 영역] */}
      <PageBanner
        title="객실 예약"
        subtitle={room.name}
        breadcrumbs={[
          { label: '홈', href: '/' },
          { label: '객실', href: '/rooms' },
          { label: room.name, href: `/rooms/${room.id}` },
          { label: '예약' }
        ]}
        backgroundImage="/placeholder.svg?height=800&width=1920"
      />
      <div className="container mx-auto px-4 py-12">
        {/* [예약 폼] */}
        <Suspense fallback={<div className="animate-pulse bg-gray-200 rounded-lg h-[600px]" />}> 
          <RoomBookingForm room={room} initialValues={initialValues} />
        </Suspense>
      </div>
    </main>
  );
}
