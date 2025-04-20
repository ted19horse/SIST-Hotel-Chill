// RoomCarousel 컴포넌트는 여러 호텔 객실 정보를 슬라이드(캐러셀) 형태로 보여주는 클라이언트 컴포넌트입니다.
// 주요 기능: 자동/수동 슬라이드, 객실 요약 정보, 어메니티 표시, 상세 페이지 이동 등
// 초보자를 위해 각 부분별로 역할과 개념을 설명하는 주석을 추가합니다.

'use client'; // Next.js에서 클라이언트 컴포넌트임을 명시합니다.

import { Badge } from '@/components/common/ui/Badge'; // 객실의 건물 정보 등을 뱃지 형태로 표시하는 UI 컴포넌트
import { cn } from '@/lib/utils'; // 조건부로 CSS 클래스를 합칠 때 사용하는 유틸 함수
import { ChevronLeft, ChevronRight, Maximize2, Mountain, Users } from 'lucide-react'; // 다양한 아이콘 컴포넌트(좌우 화살표, 인원, 뷰 등)
import Image from 'next/image'; // Next.js의 최적화된 이미지 컴포넌트
import Link from 'next/link'; // 페이지 이동을 위한 Next.js 라우팅 컴포넌트
import { useEffect, useRef, useState } from 'react'; // React의 주요 훅: 상태 관리, 참조, 생명주기 제어
import { AmenityGroupComponent } from './AmenityGroupComponent'; // 객실 어메니티 그룹을 보여주는 하위 컴포넌트

export function RoomCarousel({ rooms }: any) {
  /*
  rooms = [
    {
        "id": 1,
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
        "amenityGroups": [
            {
                "amenityGroupsId": 1,
                "name": "공통 어메니티",
                "iconName": "Bed",
                "sortOrder": 1,
                "createdAt": "2025-04-19 05:38:33.0",
                "amenities": [
                    {
                        "amenityItemsId": 1,
                        "amenityGroupsId": 1,
                        "name": "고급 침구",
                        "iconName": "Bed",
                        "sortOrder": 1,
                        "createdAt": "2025-04-19 05:38:33.0"
                    },...,
                    {
                        "amenityItemsId": 10,
                        "amenityGroupsId": 1,
                        "name": "커피/차 메이커",
                        "iconName": "Coffee",
                        "sortOrder": 10,
                        "createdAt": "2025-04-19 05:38:33.0"
                    }
                ]
            }
        ]
    },...
  ]
  */
  // 현재 보여주고 있는 첫 번째 객실의 인덱스(슬라이드 위치)
  const [currentIndex, setCurrentIndex] = useState(0);
  // 마우스 오버 시 자동 슬라이드 일시정지 여부를 저장
  const [isPaused, setIsPaused] = useState(false);
  // 캐러셀 전체 영역의 DOM 요소를 참조할 때 사용
  const carouselRef = useRef(null);

  // 한 번에 보여줄 객실 카드 개수(예: 3개)
  const visibleRooms = 3;
  // 슬라이드 가능한 최대 인덱스(마지막 카드가 오른쪽 끝에 맞춰질 때)
  const maxIndex = rooms.length - visibleRooms;

  // 다음 슬라이드로 이동하는 함수(최대 인덱스를 넘지 않도록 제한)
  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  // 이전 슬라이드로 이동하는 함수(0보다 작아지지 않도록 제한)
  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // 자동 슬라이드 효과: 5초마다 다음 슬라이드로 이동, 마지막이면 처음으로 돌아감
  useEffect(() => {
    if (isPaused) return; // 일시정지 상태면 자동 슬라이드 중단
    const interval = setInterval(() => {
      if (currentIndex < maxIndex) {
        nextSlide();
      } else {
        setCurrentIndex(0); // 마지막까지 갔으면 처음으로
      }
    }, 5000); // 5초 간격
    return () => clearInterval(interval); // 언마운트 시 interval 해제
  }, [currentIndex, isPaused, maxIndex]);

  return (
    <div className="relative">
      {/* 좌우 이동 네비게이션 버튼 */}
      {/* currentIndex가 0이면 이전 버튼 비활성화, 마지막 인덱스면 다음 버튼 비활성화 */}
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

      {/* 캐러셀 전체를 감싸는 컨테이너: 마우스 오버 시 자동 슬라이드 일시정지 */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* 실제 슬라이드 카드들을 감싸는 flex 컨테이너 */}
        {/* currentIndex에 따라 transform을 적용해 좌우로 슬라이드 효과 */}
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleRooms)}%)` }}
        >
          {/* 객실(room) 배열을 순회하며 각 객실 카드 렌더링 */}
          {rooms.map((room: any) => (
            <div key={room.id} className="w-full md:w-1/3 flex-shrink-0 px-4">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                {/* 객실 이미지 영역 */}
                <div className="relative h-64 bg-neutral-100">
                  <Image
                    // room.images가 없거나 비어있으면 onError에서 대체 이미지로 변경
                    // src={room.images?.[0]}
                    src={`https://placehold.co/800x600/e2e8f0/64748b.png?text=${encodeURIComponent(
                      `${room.name ?? "이름없음"}\n${room.size ?? "정보없음"}㎡`
                    )}&font=montserrat`}
                    alt={room.name ?? "이름없음"}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      // 이미지가 없을 때 대체 이미지를 표시 (객실명과 크기 포함)
                      target.src = `https://placehold.co/800x600/e2e8f0/64748b.png?text=${encodeURIComponent(
                        `${room.name ?? "이름없음"}\n${room.size ?? "정보없음"}㎡`
                      )}&font=montserrat`;
                    }}
                  />
                </div>
                {/* 객실 정보(이름, 건물, 설명 등) */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{room.name}</h3>
                    <Badge variant="outline">{room.building}</Badge>
                  </div>
                  <div className="text-neutral-600 mb-4 h-[3em] flex flex-col justify-start">
                    {/* 객실 설명(2줄까지만 표시, 없으면 빈 칸) */}
                    <p className="line-clamp-2">{room.description || "\u00A0"}</p>
                  </div>
                  {/* 객실 크기, 최대 인원, 뷰 타입 등 요약 정보 */}
                  <div className="grid grid-cols-2 gap-4 text-sm text-neutral-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Maximize2 className="h-4 w-4" />
                      <span>{room.size}㎡</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>최대 {room.maxAdults + room.maxChildren}인</span>
                      </div>
                      <div className="text-xs text-neutral-400 ml-6">
                        성인 {room.maxAdults}인 + 아동 {room.maxChildren}인
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mountain className="h-4 w-4" />
                      <span>{room.viewType}</span>
                    </div>
                  </div>
                  {/* 객실 어메니티(편의시설) 그룹 표시 */}
                  <div className="flex flex-col gap-2 mb-4">
                    {/* any 타입 지정으로 린트 에러 방지 */}
                    {room.amenityGroups && room.amenityGroups.map((group: any) => (
                      <AmenityGroupComponent key={group.amenityGroupsId || group.id} group={group} />
                    ))}
                  </div>
                  {/* 가격 정보 및 상세 보기 링크 */}
                  <div className="mt-auto">
                    <div className="flex flex-col gap-2 text-sm mb-4">
                      <span>
                        평일: {new Intl.NumberFormat('ko-KR').format(room.weekdayPrice)}원
                      </span>
                      <span>
                        주말: {new Intl.NumberFormat('ko-KR').format(room.weekendPrice)}원
                      </span>
                      <span>
                        시즌: {new Intl.NumberFormat('ko-KR').format(room.peakSeasonPrice)}원
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
