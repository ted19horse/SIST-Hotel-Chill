import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/utils';
import { RoomDisplay } from '@/types/room';
import { Maximize2, Users } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import RoomDetailModal from '../RoomDetailModal';

interface RoomCardProps {
  room: RoomDisplay;
  onViewDetails: (roomId: string) => void;
  onBookNow: (roomId: string) => void;
}

export default function RoomCard({ room, onViewDetails, onBookNow }: RoomCardProps) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const router = useRouter();

  const handleViewDetails = () => {
    setIsDetailModalOpen(true);
    onViewDetails(room.id);
  };

  const handleBookNow = () => {
    router.push(`/rooms/booking?roomId=${room.id}`);
    onBookNow(room.id);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="relative h-48">
          <Image
            src={room.images[0]}
            alt={room.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-4 flex flex-col flex-1">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{room.name}</h3>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{room.description}</p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Maximize2 className="h-4 w-4 mr-2" />
                {room.size}㎡
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                최대 {room.maxOccupancy}인
              </div>
            </div>

            <div className="h-[72px] overflow-y-auto mb-4">
              <div className="flex flex-wrap gap-2">
                {room.amenityGroups.map((group, index) => (
                  <div
                    key={index}
                    className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600 whitespace-nowrap"
                  >
                    {group}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">주중</p>
                <p className="text-lg font-semibold">₩{formatNumber(room.price.weekday)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">주말</p>
                <p className="text-lg font-semibold">₩{formatNumber(room.price.weekend)}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={handleViewDetails}>
                상세보기
              </Button>
              <Button className="flex-1" onClick={handleBookNow}>
                예약하기
              </Button>
            </div>
          </div>
        </div>
      </div>

      <RoomDetailModal
        room={room}
        onClose={() => setIsDetailModalOpen(false)}
        onBookNow={handleBookNow}
        isOpen={isDetailModalOpen}
      />
    </>
  );
}
