'use client';

import { Badge } from '@/components/common/ui/Badge';
import { Button } from '@/components/common/ui/Button';
import { useRoomFilterStore } from '@/lib/stores/roomFilterStore';
import { Room } from '@/types/room';
import {
  Bath,
  ChefHat,
  Coffee,
  Eye,
  Gift,
  Leaf,
  Maximize,
  Music,
  ShowerHead,
  Tablet,
  Tv,
  Users,
  UtensilsCrossed,
  Wifi,
  Wind,
  Wine,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface RoomListContentProps {
  rooms?: Room[];
  onViewDetails?: (room: Room) => void;
  onBookNow?: (room: Room) => void;
}

export default function RoomListContent({
  rooms: propRooms,
  onViewDetails,
  onBookNow,
}: RoomListContentProps = {}) {
  const [stateRooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const filters = useRoomFilterStore((state) => state.filters);

  useEffect(() => {
    if (propRooms && propRooms.length > 0) {
      setRooms(propRooms);
      return;
    }

    const fetchRooms = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/rooms/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(filters),
        });

        if (!response.ok) {
          throw new Error('객실 검색 중 오류가 발생했습니다.');
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
  }, [filters, propRooms]);

  const displayRooms = propRooms || stateRooms;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
      </div>
    );
  }

  if (!displayRooms.length) {
    return (
      <div className="text-center text-gray-600 p-4">
        <p>조건에 맞는 객실이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayRooms.map((room) => (
        <div
          key={room.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="relative h-48">
            <Image
              src={room.images[0] || '/placeholder.svg'}
              alt={room.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{room.name}</h3>
              <Badge variant="outline" className="text-xs">
                {room.type}
              </Badge>
            </div>

            <p className="text-sm text-gray-600 mb-4">{room.description}</p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Maximize className="h-4 w-4 mr-2" />
                {room.size}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                최대 {room.capacity.total}인
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4">
              {room.amenities.includes('wifi') && (
                <div className="tooltip" data-tip="무선 인터넷">
                  <Wifi className="h-4 w-4 text-gray-600" aria-label="무선 인터넷" />
                </div>
              )}
              {room.amenities.includes('tv') && (
                <div className="tooltip" data-tip="TV">
                  <Tv className="h-4 w-4 text-gray-600" aria-label="TV" />
                </div>
              )}
              {room.amenities.includes('bath') && (
                <div className="tooltip" data-tip="욕조">
                  <Bath className="h-4 w-4 text-gray-600" aria-label="욕조" />
                </div>
              )}
              {room.amenities.includes('shower') && (
                <div className="tooltip" data-tip="샤워부스">
                  <ShowerHead className="h-4 w-4 text-gray-600" aria-label="샤워부스" />
                </div>
              )}
              {room.amenities.includes('coffee') && (
                <div className="tooltip" data-tip="커피머신">
                  <Coffee className="h-4 w-4 text-gray-600" aria-label="커피머신" />
                </div>
              )}
              {room.amenities.includes('minibar') && (
                <div className="tooltip" data-tip="미니바">
                  <Wine className="h-4 w-4 text-gray-600" aria-label="미니바" />
                </div>
              )}
              {room.amenities.includes('dining') && (
                <div className="tooltip" data-tip="다이닝">
                  <UtensilsCrossed className="h-4 w-4 text-gray-600" aria-label="다이닝" />
                </div>
              )}
              {room.amenities.includes('roomService') && (
                <div className="tooltip" data-tip="룸서비스">
                  <ChefHat className="h-4 w-4 text-gray-600" aria-label="룸서비스" />
                </div>
              )}
              {room.amenities.includes('aircon') && (
                <div className="tooltip" data-tip="에어컨">
                  <Wind className="h-4 w-4 text-gray-600" aria-label="에어컨" />
                </div>
              )}
              {room.amenities.includes('eco') && (
                <div className="tooltip" data-tip="친환경">
                  <Leaf className="h-4 w-4 text-gray-600" aria-label="친환경" />
                </div>
              )}
              {room.amenities.includes('tablet') && (
                <div className="tooltip" data-tip="객실 태블릿">
                  <Tablet className="h-4 w-4 text-gray-600" aria-label="객실 태블릿" />
                </div>
              )}
              {room.amenities.includes('music') && (
                <div className="tooltip" data-tip="음악 시스템">
                  <Music className="h-4 w-4 text-gray-600" aria-label="음악 시스템" />
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold">₩{room.price.toLocaleString()}</span>
                <span className="text-sm text-gray-600">/1박</span>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={() => onViewDetails?.(room)}>
                  <Eye className="h-4 w-4 mr-1" />
                  상세보기
                </Button>
                <Button size="sm" onClick={() => onBookNow?.(room)}>
                  <Gift className="h-4 w-4 mr-1" />
                  예약하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
