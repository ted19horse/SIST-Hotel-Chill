/**
 * 객실 예약 페이지
 * 
 * 선택한 객실에 대한 예약 정보를 입력하고 예약을 진행하는 페이지입니다.
 * 날짜 선택, 인원 정보, 요금 정보, 결제 정보 등을 입력 받습니다.
 */

import { notFound, redirect } from 'next/navigation';
import PageBanner from '@/components/common/layout/PageBanner';
import ScrollToTop from '@/components/common/home/ScrollToTop';
import RoomBookingForm from '@/components/rooms/booking/RoomBookingForm';
import { getRoomById } from '@/lib/data/rooms';
import { Suspense } from 'react';

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
 * 객실 예약 페이지 컴포넌트
 * 
 * URL 쿼리 파라미터에서 객실 정보를 가져와 예약 폼을 표시합니다.
 * 
 * @param props 컴포넌트 속성 (URL 검색 파라미터 포함)
 * @returns JSX.Element
 */
export default function RoomBookingPage({ searchParams }: RoomBookingPageProps) {
  // 필수 파라미터 확인
  if (!searchParams.roomId) {
    // 객실 ID가 없으면 객실 목록 페이지로 리다이렉트
    redirect('/rooms');
  }
  
  // 객실 데이터 가져오기
  const room = getRoomById(searchParams.roomId);
  
  // 객실 데이터가 없거나 예약 불가능한 경우 404 페이지
  if (!room || room.availability.available === 0) {
    notFound();
  }
  
  // URL 파라미터에서 날짜 및 인원 정보 파싱
  const initialValues = {
    checkIn: searchParams.checkIn ? new Date(searchParams.checkIn) : undefined,
    checkOut: searchParams.checkOut ? new Date(searchParams.checkOut) : undefined,
    adults: searchParams.adults ? parseInt(searchParams.adults) : 2,
    children: searchParams.children ? parseInt(searchParams.children) : 0,
  };
  
  return (
    <main className="min-h-screen">
      <ScrollToTop />
      
      {/* 페이지 배너 */}
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

      {/* 예약 폼 */}
      <div className="container mx-auto px-4 py-12">
        <Suspense fallback={<div className="animate-pulse bg-gray-200 h-[600px] rounded-lg"></div>}>
          <RoomBookingForm room={room} initialValues={initialValues} />
        </Suspense>
      </div>
    </main>
  );
}
