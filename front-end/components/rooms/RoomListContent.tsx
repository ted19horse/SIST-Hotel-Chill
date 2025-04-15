/**
 * 객실 목록 내용 컴포넌트 (클라이언트 컴포넌트)
 * 
 * 클라이언트 사이드에서 객실 목록을 표시하고 상호작용을 처리합니다.
 * 검색 결과 없음, 로딩 상태, 에러 상태에 대한 처리를 포함합니다.
 */

'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import RoomCard from './RoomGrid/RoomCard';
import RoomCardSkeleton from './RoomGrid/RoomCardSkeleton';

/**
 * 객실 목록 내용 컴포넌트
 * 
 * 객실 목록 데이터를 받아 카드 형태로 표시하고,
 * 상세보기 및 예약하기 기능을 처리합니다.
 * 
 * @param props 컴포넌트 속성
 * @returns JSX.Element
 */
export default function RoomListContent({
  rooms = [],
  isLoading,
  error,
}) {
  const router = useRouter();
  
  /**
   * 객실 상세 보기 페이지로 이동
   * @param roomId 객실 ID
   */
  const handleViewDetails = useCallback((roomId) => {
    router.push(`/rooms/${roomId}`);
  }, [router]);
  
  /**
   * 객실 예약 페이지로 이동
   * @param roomId 객실 ID
   */
  const handleBookNow = useCallback((roomId) => {
    router.push(`/rooms/booking?roomId=${roomId}`);
  }, [router]);

  // 로딩 중일 때 스켈레톤 UI 표시
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true" aria-label="객실 목록 로딩 중">
        {[...Array(6)].map((_, index) => (
          <RoomCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // 에러 발생 시 에러 메시지 표시
  if (error) {
    return (
      <div className="text-center py-8" role="alert" aria-live="assertive">
        <p className="text-lg text-red-600">{error}</p>
        <button 
          onClick={() => router.refresh()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 검색 결과가 없을 때 안내 메시지 표시
  if (!rooms.length) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-neutral-600">현재 예약 가능한 객실이 없습니다.</p>
        <p className="text-sm text-neutral-500 mt-2">다른 날짜나 조건으로 검색해 보세요.</p>
      </div>
    );
  }

  // 객실 목록 그리드 표시
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="객실 목록">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          onViewDetails={() => handleViewDetails(room.id)}
          onBookNow={() => handleBookNow(room.id)}
        />
      ))}
    </div>
  );
}