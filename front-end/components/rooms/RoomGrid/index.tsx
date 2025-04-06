import { rooms } from '@/data/rooms/types/rooms';
import { RoomDisplay } from '@/types/room';
import RoomCard from './RoomCard';
import RoomCardSkeleton from './RoomCardSkeleton';

interface RoomGridProps {
  isLoading?: boolean;
  error?: string;
  onViewDetails?: (room: RoomDisplay) => void;
  onBookNow?: (room: RoomDisplay) => void;
}

export default function RoomGrid({
  isLoading = false,
  error,
  onViewDetails,
  onBookNow,
}: RoomGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <RoomCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">검색 조건에 맞는 객실이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          onViewDetails={() => onViewDetails?.(room)}
          onBookNow={() => onBookNow?.(room)}
        />
      ))}
    </div>
  );
}
