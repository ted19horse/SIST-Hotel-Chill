'use client'; // 이 지시문은 Next.js에서 이 컴포넌트가 클라이언트 측에서 실행됨을 나타냅니다

import { Button } from '@/components/common/ui/Button'; // 버튼 UI 컴포넌트 가져오기
// import { rooms } from '@/lib/data/rooms/types/rooms'; // 객실 데이터 가져오기
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver'; // 요소가 화면에 보이는지 감지하는 커스텀 훅
import { cn } from '@/lib/utils'; // 클래스 이름을 조건부로 결합하는 유틸리티 함수
import { ChevronRight } from 'lucide-react'; // 오른쪽 화살표 아이콘 컴포넌트
import Link from 'next/link'; // Next.js의 클라이언트 사이드 라우팅을 위한 링크 컴포넌트
import { useEffect, useRef, useState } from 'react'; // React 훅
import { RoomCarousel } from './carousel/RoomCarousel'; // 객실 캐러셀 컴포넌트
import axios from 'axios';

/**
 * RoomSection 컴포넌트
 * 
 * 홈페이지의 객실 소개 섹션을 구현합니다.
 * 스크롤 시 애니메이션 효과가 적용되며, 객실 캐러셀과 '모든 객실 보기' 버튼을 포함합니다.
 * Intersection Observer API를 활용하여 컴포넌트가 화면에 보일 때 애니메이션을 트리거합니다.
 */
export default function RoomSection() {
  // 섹션 요소에 대한 참조 생성 (DOM 요소에 접근하기 위함)
  const sectionRef = useRef<HTMLElement>(null);
  // 커스텀 훅을 사용하여 섹션이 화면에 보이는지 감지
  const isVisible = useIntersectionObserver({ ref: sectionRef });
  // 애니메이션이 이미 실행되었는지 추적하는 상태
  const [hasAnimated, setHasAnimated] = useState(false);

  // DB에서 호출하는 객실 데이터
  const [rooms, setRooms] = useState([]);
  // api 호출
  useEffect(() => {
    const getRoomsData = async () => {
      const response = await axios.get('/api/rooms/getRoomTypes');
      setRooms(response.data);
      /*
      response.Data = [
        {
          "roomTypesId": 1,
          "name": "Chill Comfort Room",
          "description": "심플하고 편안한 기본형 객실로, 자연적 요소가 가미된 인테리어와 가든 뷰를 제공하는 30㎡ 크기의 객실입니다.",
          "size": 30,
          "maxAdults": 2,
          "maxChildren": 1,
          "weekdayPrice": 220000,
          "weekendPrice": 270000,
          "peakSeasonPrice": 320000,
          "building": "F",
          "floorCount": 4,
          "roomsPerFloor": 30,
          "viewType": "가든 뷰",
          "imageUrl": "/images/rooms/placeholder.jpg",
          "createdAt": "2025-04-16 11:01:28",
          "updatedAt": "2025-04-16 11:01:28"
        }, ...
      ]
      */
    };

    getRoomsData();
  }, []);

  /**
   * 섹션이 화면에 보일 때 애니메이션 효과 적용
   * 한 번 애니메이션이 실행되면 다시 사라지지 않도록 hasAnimated 상태를 true로 설정
   */
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]); // isVisible 또는 hasAnimated가 변경될 때마다 효과 재실행

  return (
    <section
      ref={sectionRef} // ref를 통해 DOM 요소 참조
      className={cn(
        'py-20 bg-neutral-50 transition-opacity duration-1000 ease-in-out',
        // 섹션이 화면에 보이거나 이미 애니메이션이 실행되었으면 완전히 표시, 아니면 투명하게 처리
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
            asChild // 버튼을 다른 컴포넌트(Link)로 렌더링하기 위한 속성
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
