'use client';

import { Button } from '@/components/common/ui/Button';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const rooms = [
  {
    id: 1,
    name: '칠 컴포트 룸',
    description: '정원 전망과 자연 요소를 갖춘 평화로운 휴식 공간',
    image: '/placeholder.svg?height=600&width=800',
    size: '30㎡',
    capacity: '성인 2인 + 어린이 1인',
    price: 220000,
  },
  {
    id: 2,
    name: '칠 하모니 룸',
    description: '조화로운 디자인 요소가 돋보이는 넓은 객실에서 심신의 균형을 찾아보세요',
    image: '/placeholder.svg?height=600&width=800',
    size: '45㎡',
    capacity: '성인 2인 + 어린이 1인',
    price: 300000,
  },
  {
    id: 3,
    name: '칠 세레니티 룸',
    description: '프리미엄 편의시설과 아름다운 자연 전망으로 깊은 평온함을 경험하세요',
    image: '/placeholder.svg?height=600&width=800',
    size: '70㎡',
    capacity: '성인 2인 + 어린이 2인',
    price: 450000,
  },
  {
    id: 4,
    name: '칠 패밀리 스위트',
    description: '가족 웰니스를 위해 설계된 넓은 스위트룸에서 치유의 추억을 만들어보세요',
    image: '/placeholder.svg?height=600&width=800',
    size: '90㎡',
    capacity: '성인 4인 + 어린이 2인',
    price: 650000,
  },
  {
    id: 5,
    name: '칠 레이크 스위트',
    description: '파노라마 호수 전망과 프리미엄 웰니스 시설에서 재충전의 시간을 가져보세요',
    image: '/placeholder.svg?height=600&width=800',
    size: '100㎡',
    capacity: '성인 2인 + 어린이 2인',
    price: 850000,
  },
  {
    id: 6,
    name: '얼티밋 칠 스위트',
    description: '개인 맞춤 서비스와 최고급 시설이 제공되는 저희의 가장 특별한 힐링 경험',
    image: '/placeholder.svg?height=600&width=800',
    size: '120㎡',
    capacity: '성인 4인 + 어린이 4인',
    price: 1200000,
  },
];

export default function RoomSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver({ ref: sectionRef });
  const [hasAnimated, setHasAnimated] = useState(false);

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

  // Animation effect
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        'py-20 bg-neutral-50 transition-opacity duration-1000 ease-in-out',
        isVisible || hasAnimated ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">객실 안내</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Chill Haven Resort & Spa의 다양한 객실에서 편안한 휴식을 경험해보세요. 고객님의 취향과
            필요에 맞는 최적의 공간을 제공합니다.
          </p>
        </div>

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
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full">
                    <div className="relative h-64">
                      <Image
                        src={room.image || '/placeholder.svg'}
                        alt={room.name}
                        fill
                        className="object-cover"
                      />
                      {/* 금액 표시 제거 */}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                      <p className="text-neutral-600 mb-4">{room.description}</p>
                      <div className="flex justify-between text-sm text-neutral-500 mb-6">
                        <span>{room.size}</span>
                        <span>{room.capacity}</span>
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
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Link href="/rooms">
              모든 객실 보기
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
