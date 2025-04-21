'use client'
/**
 * 객실 목록 내용 컴포넌트 (REST API 연동)
 * 
 * - /rooms 경로에서만 필터 상태 유지, 다른 경로로 이동 시 자동 초기화
 * - 페이지 첫 진입 시(초기 로딩)에는 기본 필터로 자동 요청
 * - 사용자가 필터 적용 버튼을 눌렀을 때만 filters.isFiltering이 true가 되어 요청
 * - 요청 후 filters.isFiltering을 false로 자동 리셋(상태 일관성 유지)
 * - 로딩/에러/빈 결과 처리 포함
 * - 가용성 정보를 표시합니다.
 */
import { useCallback, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import RoomCard from './RoomGrid/RoomCard';
import RoomCardSkeleton from './RoomGrid/RoomCardSkeleton';
import { useRoomFilterStore } from '@/lib/stores/roomFilterStore';
import RoomDetailModal from './detail/RoomDetailModal';

/**
 * 객실 목록 컴포넌트
 * 
 * 객실 정보를 서버에서 가져와 목록으로 표시하는 클라이언트 컴포넌트입니다.
 * 초기 로딩 및 필터 변경 시 API를 호출하여 데이터를 가져옵니다.
 */
export default function RoomListContent() {
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
  
  // 모달 상태 관리
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // /rooms에서만 필터 유지, 그 외 이동 시 자동 초기화
  useEffect(() => {
    if (pathname !== '/rooms') {
      resetFilters();
      setIsFirstLoad(true);
    }
  }, [pathname, resetFilters]);

  // 1. 페이지 첫 진입 시(최초 1회) 기본 필터로 자동 요청
  useEffect(() => {
    if (isFirstLoad) {
      setLoading(true);
      setError('');
      
      // 초기에는 모든 객실 조회 API 사용
      axios.get('/api/rooms/getRoomTypes')
        .then(res => {
          console.log('초기 객실 데이터 로드 성공:', res.data.length); // 디버깅용
          setRoomData(res.data);
        })
        .catch(err => {
          console.error('객실 정보 로드 오류:', err);
          setError('객실 정보를 불러오는 중 오류가 발생했습니다.');
          setRoomData([]);
        })
        .finally(() => {
          setLoading(false);
          setIsFirstLoad(false);
        });
    }
  }, [isFirstLoad]);

  // 2. 사용자가 필터 적용 버튼을 눌렀을 때만 요청 (isFiltering === true)
  useEffect(() => {
    if (filters.isFiltering) {
      setLoading(true);
      setError('');
      
      // 필터링 API 호출
      axios.post('/api/rooms/search', {
        // 날짜 형식 변환 (Date 객체 -> ISO 문자열 -> yyyy-MM-dd 형식)
        checkIn: filters.checkIn ? new Date(filters.checkIn).toISOString().split('T')[0] : undefined,
        checkOut: filters.checkOut ? new Date(filters.checkOut).toISOString().split('T')[0] : undefined,
        // 기타 필터 조건들
        adults: filters.adults,
        children: filters.children,
        roomGrade: filters.roomGrade,
        priceRange: filters.priceRange,
        viewType: filters.viewType,
      })
        .then(res => {
          console.log('필터링된 객실 데이터 로드 성공:', res.data.length); // 디버깅용
          setRoomData(res.data);
        })
        .catch(err => {
          console.error('객실 필터링 오류:', err);
          setError('객실 필터링 중 오류가 발생했습니다.');
          setRoomData([]);
        })
        .finally(() => {
          setLoading(false);
          // 요청 후 isFiltering을 false로 리셋
          resetFiltering && resetFiltering();
        });
    }
  }, [filters, resetFiltering]);

  // 상세보기 모달 열기
  const handleViewDetails = useCallback((roomId) => {
    // roomId를 기반으로 전체 객실 데이터 찾기
    const room = roomData.find(room => room.id === roomId);
    if (room) {
      setSelectedRoom(room);
      setIsModalOpen(true);
    }
  }, [roomData]);
  
  // 모달 닫기
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  }, []);
  
  // 예약 페이지로 이동
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
    <>
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

      {/* 객실 상세 모달 */}
      {selectedRoom && (
        <RoomDetailModal
          room={selectedRoom}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
