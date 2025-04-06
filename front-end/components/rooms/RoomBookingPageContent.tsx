'use client';

import BookingForm from '@/components/common/forms/BookingForm';
import RoomDetailModal from '@/components/rooms/RoomDetailModal';
import RoomFilters from '@/components/rooms/RoomFilters';
import RoomList from '@/components/rooms/RoomList';
import { rooms as mockRooms } from '@/data/rooms/types/rooms';
import { RoomDisplay } from '@/types/room';
import { useEffect, useState } from 'react';

interface RoomBookingPageContentProps {
  initialRooms?: RoomDisplay[];
}

export default function RoomBookingPageContent({
  initialRooms = mockRooms,
}: RoomBookingPageContentProps) {
  const [rooms, setRooms] = useState<RoomDisplay[]>(initialRooms);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomDisplay | null>(null);

  useEffect(() => {
    // 개발 환경에서는 mockRooms 사용
    if (process.env.NODE_ENV !== 'production') {
      setRooms(mockRooms);
      return;
    }

    // 배포 환경에서만 API 호출
    const fetchRooms = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/rooms');
        if (!response.ok) {
          throw new Error('객실 정보를 불러오는 중 오류가 발생했습니다.');
        }

        const data = await response.json();
        setRooms(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []); // 필터 의존성 제거

  const handleViewDetails = (room: RoomDisplay) => {
    setSelectedRoom(room);
  };

  const handleBookNow = (room: RoomDisplay) => {
    setSelectedRoom(room);
    // 예약 폼으로 스크롤
    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const closeDetailModal = () => {
    setSelectedRoom(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <RoomFilters />

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <RoomList
            rooms={rooms}
            isLoading={isLoading}
            error={error || undefined}
            onViewDetails={handleViewDetails}
            onBookNow={handleBookNow}
          />

          {selectedRoom && (
            <>
              <RoomDetailModal
                room={selectedRoom}
                onClose={closeDetailModal}
                onBookNow={handleBookNow}
              />
              <div id="booking-form" className="mt-8">
                <BookingForm room={selectedRoom} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
