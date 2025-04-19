'use client'; // 클라이언트 컴포넌트 지시문

import { Button } from '@/components/common/ui/Button';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { RoomCarousel } from './carousel/RoomCarousel';

/**
 * 객실 타입 인터페이스
 * 서버에서 가져온 데이터 구조 정의
 */
interface RoomType {
  id: number;
  name: string;
  description: string;
  size: number;
  maxAdults: number;
  maxChildren: number;
  weekdayPrice: number;
  weekendPrice: number;
  peakSeasonPrice: number;
  building: string;
  floorCount: number;
  roomsPerFloor: number;
  viewType: string;
  imageUrl: string;
  amenityGroups: any[];
}

/**
 * RoomSection 컴포넌트 props 인터페이스
 */
interface RoomSectionProps {
  rooms: RoomType[]; // 서버 컴포넌트에서 전달받은 객실 데이터
}

/**
 * RoomSection 컴포넌트
 *
 * 홈페이지의 객실 소개 섹션을 구현합니다.
 * 성능 최적화:
 * 1. 서버 컴포넌트에서 데이터를 미리 가져와 props로 받음
 * 2. 불필요한 API 호출 제거
 * 3. 인터섹션 옵저버를 통한 지연 로딩 적용
 *
 * @param {RoomSectionProps} props - 컴포넌트 속성
 * @returns {JSX.Element} 렌더링된 컴포넌트
 */
export default function RoomSection({ rooms = [] }: RoomSectionProps) {
  // 섹션 요소에 대한 참조 생성
  const sectionRef = useRef(null);
  // 커스텀 훅을 사용하여 섹션이 화면에 보이는지 감지 (rootMargin 설정으로 더 빠른 로딩 시작)
  const isVisible = useIntersectionObserver({ 
    ref: sectionRef,
    rootMargin: '200px', // 화면에 완전히 보이기 전에 미리 로딩 시작
    threshold: 0.1 
  });
  // 애니메이션이 이미 실행되었는지 추적하는 상태
  const [hasAnimated, setHasAnimated] = useState(false);

  /**
   * 섹션이 화면에 보일 때 애니메이션 효과 적용
   * 한 번 애니메이션이 실행되면 다시 사라지지 않도록 hasAnimated 상태를 true로 설정
   */
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        'py-20 bg-neutral-50 transition-opacity duration-500 ease-in-out',
        isVisible || hasAnimated ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className="container mx-auto px-4">
        {/* 섹션 제목과 설명 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">객실 안내</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Chill Haven Resort & Spa의 다양한 객실에서 편안한 휴식을 경험해보세요. 고객님의 취향과
            필요에 맞는 최적의 공간을 제공합니다.
          </p>
        </div>

        {/* 객실 캐러셀 컴포넌트 */}
        <RoomCarousel rooms={rooms} />

        {/* '모든 객실 보기' 버튼 */}
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
