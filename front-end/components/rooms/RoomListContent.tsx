'use client';

import { RoomDisplay } from '@/types/room';
import { useCallback } from 'react';
import RoomCard from './RoomGrid/RoomCard';
import RoomCardSkeleton from './RoomGrid/RoomCardSkeleton';

interface RoomListContentProps {
  rooms: RoomDisplay[];
  isLoading?: boolean;
  error?: string;
  onViewDetails?: (roomId: string) => void;
  onBookNow?: (roomId: string) => void;
}

export default function RoomListContent({
  rooms = [],
  isLoading,
  error,
  onViewDetails,
  onBookNow,
}: RoomListContentProps) {
  const handleViewDetails = useCallback(
    (roomId: string) => {
      onViewDetails?.(roomId);
    },
    [onViewDetails]
  );

  const handleBookNow = useCallback(
    (roomId: string) => {
      onBookNow?.(roomId);
    },
    [onBookNow]
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <RoomCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!rooms.length) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-neutral-600">현재 예약 가능한 객실이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          onViewDetails={handleViewDetails}
          onBookNow={handleBookNow}
        />
      ))}
    </div>
  );
}
