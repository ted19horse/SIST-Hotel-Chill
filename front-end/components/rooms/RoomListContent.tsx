'use client'
/**
 * 객실 목록 내용 컴포넌트 (POST 방식 REST API 연동)
 * 
 * - /rooms 경로에서만 필터 상태 유지, 다른 경로로 이동 시 자동 초기화
 * - 페이지 첫 진입 시(초기 로딩)에는 기본 필터로 자동 요청
 * - 사용자가 필터 적용 버튼을 눌렀을 때만 filters.isFiltering이 true가 되어 요청
 * - 요청 후 filters.isFiltering을 false로 자동 리셋(상태 일관성 유지)
 * - 로딩/에러/빈 결과 처리 포함
 * - 초보자용 상세 주석 포함
 */
import { useCallback, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import RoomCard from './RoomGrid/RoomCard';
import RoomCardSkeleton from './RoomGrid/RoomCardSkeleton';
import { useRoomFilterStore } from '@/lib/stores/roomFilterStore';

export default function RoomListContent({
  rooms = [], // 기존 props는 더 이상 사용하지 않음
  isLoading: _isLoading,
  error: _error,
}) {
  const router = useRouter();
  // Zustand store에서 현재 필터 상태를 구독
  const filters = useRoomFilterStore(state => state.filters);
  const resetFilters = useRoomFilterStore(state => state.resetFilters);
  const resetFiltering = useRoomFilterStore(state => state.resetFiltering);
  const pathname = usePathname();
  // API로 받아온 객실 데이터 상태
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFirstLoad, setIsFirstLoad] = useState(true); // 최초 진입 여부

  // /rooms에서만 필터 유지, 그 외 이동 시 자동 초기화
  useEffect(() => {
    if (pathname !== '/rooms') {
      resetFilters();
    }
  }, [pathname, resetFilters]);

  // 1. 페이지 첫 진입 시(최초 1회) 기본 필터로 자동 요청
  useEffect(() => {
    if (isFirstLoad) {
      setLoading(true);
      setError('');
      axios.post('/api/rooms/search', {
        ...filters,
        checkIn: filters.checkIn ? new Date(filters.checkIn).toISOString().split('T')[0] : undefined,
        checkOut: filters.checkOut ? new Date(filters.checkOut).toISOString().split('T')[0] : undefined,
      })
        .then(res => setRoomData(res.data))
        .catch(() => setRoomData([]))
        .finally(() => setLoading(false));
      setIsFirstLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstLoad]);

  // 2. 사용자가 필터 적용 버튼을 눌렀을 때만 요청 (isFiltering === true)
  useEffect(() => {
    if (filters.isFiltering) {
      setLoading(true);
      setError('');
      axios.post('/api/rooms/search', {
        ...filters,
        checkIn: filters.checkIn ? new Date(filters.checkIn).toISOString().split('T')[0] : undefined,
        checkOut: filters.checkOut ? new Date(filters.checkOut).toISOString().split('T')[0] : undefined,
      })
        .then(res => setRoomData(res.data))
        .catch(() => setRoomData([]))
        .finally(() => setLoading(false));
      // 요청 후 isFiltering을 false로 리셋 (store에 resetFiltering 함수 필요)
      resetFiltering && resetFiltering();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.isFiltering]);

  // 상세보기/예약 이동 함수(기존과 동일)
  const handleViewDetails = useCallback((roomId) => {
    router.push(`/rooms/${roomId}`);
  }, [router]);
  const handleBookNow = useCallback((roomId) => {
    router.push(`/rooms/booking?roomId=${roomId}`);
  }, [router]);

  // 로딩 중일 때 스켈레톤 UI 표시
  if (loading) {
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
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 검색 결과가 없을 때 안내 메시지 표시
  if (!roomData.length) {
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
      {roomData.map(room => (
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

/*
초보자용 상세 주석:
- usePathname()으로 현재 경로를 감지해 /rooms에서만 필터 상태를 유지하고, 그 외 이동 시 자동으로 초기화합니다.
- isFirstLoad: 페이지가 처음 열릴 때 true → 첫 목록 요청 후 false로 변경
- filters.isFiltering: 사용자가 "검색" 버튼을 누를 때 true → 요청 후 false로 자동 리셋
- resetFiltering 함수는 store에 아래와 같이 추가해야 합니다:
  resetFiltering: () => set(state => ({ filters: { ...state.filters, isFiltering: false } }))
*/