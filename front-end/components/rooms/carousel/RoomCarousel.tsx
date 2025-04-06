'use client';

import { Badge } from '@/components/common/ui/Badge';
import { amenityGroups, roomAmenityGroups } from '@/data/rooms/constants/amenities';
import { cn } from '@/lib/utils';
import { Room, RoomType } from '@/types/room';
import { ChevronLeft, ChevronRight, Maximize2, Mountain, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AmenityGroupComponent } from './AmenityGroupComponent';

interface RoomCarouselProps {
  rooms: Room[];
}

export function RoomCarousel({ rooms }: RoomCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const visibleRooms = 3;
  const maxIndex = rooms.length - visibleRooms;

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Auto carousel effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (currentIndex < maxIndex) {
        nextSlide();
      } else {
        setCurrentIndex(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, maxIndex]);

  return (
    <div className="relative">
      {/* Carousel Navigation Buttons */}
      <button
        onClick={prevSlide}
        disabled={currentIndex === 0}
        className={cn(
          'absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md transition-all -ml-4',
          currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
        )}
        aria-label="이전 객실"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        disabled={currentIndex === maxIndex}
        className={cn(
          'absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md transition-all -mr-4',
          currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
        )}
        aria-label="다음 객실"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Carousel Container */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleRooms)}%)` }}
        >
          {rooms.map((room) => (
            <div key={room.id} className="w-full md:w-1/3 flex-shrink-0 px-4">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative h-64 bg-neutral-100">
                  {room.images && room.images[0] ? (
                    <Image
                      src={room.images[0]}
                      alt={room.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://placehold.co/800x600/e2e8f0/64748b.png?text=${encodeURIComponent(
                          `${room.name}\n${room.size}㎡`
                        )}&font=montserrat`;
                      }}
                    />
                  ) : (
                    <Image
                      src={`https://placehold.co/800x600/e2e8f0/64748b.png?text=${encodeURIComponent(
                        `${room.name}\n${room.size}㎡`
                      )}&font=montserrat`}
                      alt={room.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{room.name}</h3>
                    <Badge variant="outline">{room.building}</Badge>
                  </div>
                  <p className="text-neutral-600 mb-4 line-clamp-2">{room.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-neutral-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Maximize2 className="h-4 w-4" />
                      <span>{room.size}㎡</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>최대 {room.maxOccupancy}인</span>
                      </div>
                      <div className="text-xs text-neutral-400 ml-6">
                        성인 {Math.floor(room.maxOccupancy * 0.7)}인 + 아동{' '}
                        {Math.ceil(room.maxOccupancy * 0.3)}인
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mountain className="h-4 w-4" />
                      <span>{room.view}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mb-4">
                    {room.type &&
                      roomAmenityGroups[room.type as RoomType]?.map((groupKey) => {
                        const group = amenityGroups[groupKey];
                        return (
                          <AmenityGroupComponent
                            key={groupKey}
                            group={group.name}
                            items={group.items}
                          />
                        );
                      })}
                  </div>
                  <div className="mt-auto">
                    <div className="flex flex-col gap-2 text-sm mb-4">
                      <span>
                        평일: {new Intl.NumberFormat('ko-KR').format(room.price.weekday)}원
                      </span>
                      <span>
                        주말: {new Intl.NumberFormat('ko-KR').format(room.price.weekend)}원
                      </span>
                    </div>
                    <Link
                      href={`/rooms#room-${room.id}`}
                      className="inline-flex items-center text-primary font-medium hover:underline"
                    >
                      자세히 보기
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
