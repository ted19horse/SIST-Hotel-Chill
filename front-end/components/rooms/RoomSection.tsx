'use client';

import { Badge } from '@/components/common/ui/Badge';
import { Button } from '@/components/common/ui/Button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/common/ui/Popover';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
import {
  Apple,
  Bath,
  BatteryCharging,
  BedDouble,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Droplets,
  Footprints,
  Heart,
  Key,
  Lock,
  Users as Lounge,
  Maximize2,
  Moon,
  Mountain,
  Plus,
  Scale,
  Scissors,
  ShowerHead,
  Speaker,
  Tablet,
  Tv,
  UserCog,
  Users,
  Utensils,
  Waves,
  Wifi,
  Wind,
  Wine,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// 어메니티 데이터 구조화
const amenityGroups = {
  common: {
    name: '공통 어메니티',
    icon: <BedDouble className="h-4 w-4" />,
    items: [
      { name: '고급 침구', icon: <BedDouble className="h-4 w-4" /> },
      { name: '43인치 스마트 TV', icon: <Tv className="h-4 w-4" /> },
      { name: '고속 무선 인터넷', icon: <Wifi className="h-4 w-4" /> },
      { name: '객실 내 금고', icon: <Lock className="h-4 w-4" /> },
      { name: '미니바/미니 냉장고', icon: <Coffee className="h-4 w-4" /> },
      { name: '친환경 욕실 용품 세트', icon: <ShowerHead className="h-4 w-4" /> },
      { name: '슬리퍼 및 목욕 가운', icon: <Footprints className="h-4 w-4" /> },
      { name: 'USB 충전 포트 및 멀티 어댑터', icon: <BatteryCharging className="h-4 w-4" /> },
      { name: '헤어 드라이어', icon: <Scissors className="h-4 w-4" /> },
      { name: '커피/차 메이커', icon: <Coffee className="h-4 w-4" /> },
    ],
  },
  deluxe: {
    name: '디럭스 어메니티',
    icon: <Coffee className="h-4 w-4" />,
    items: [
      { name: '에스프레소 머신', icon: <Coffee className="h-4 w-4" /> },
      { name: '필로우 미스트', icon: <Droplets className="h-4 w-4" /> },
      { name: '욕실 체중계', icon: <Scale className="h-4 w-4" /> },
      { name: '추가 욕실 용품', icon: <Bath className="h-4 w-4" /> },
      { name: '블루투스 스피커', icon: <Speaker className="h-4 w-4" /> },
      { name: '다회용 텀블러', icon: <Coffee className="h-4 w-4" /> },
    ],
  },
  premium: {
    name: '프리미엄 어메니티',
    icon: <Tablet className="h-4 w-4" />,
    items: [
      { name: '태블릿 객실 컨트롤 시스템', icon: <Tablet className="h-4 w-4" /> },
      { name: '개별 공기청정기', icon: <Wind className="h-4 w-4" /> },
      { name: '전용 라운지 이용권', icon: <Lounge className="h-4 w-4" /> },
      { name: '턴다운 서비스', icon: <Moon className="h-4 w-4" /> },
      { name: '조식 무료 제공', icon: <Utensils className="h-4 w-4" /> },
      { name: '웰컴 과일 또는 스낵', icon: <Apple className="h-4 w-4" /> },
    ],
  },
  presidential: {
    name: '프레지덴셜 어메니티',
    icon: <UserCog className="h-4 w-4" />,
    items: [
      { name: '개인 집사 서비스', icon: <UserCog className="h-4 w-4" /> },
      { name: '프라이빗 체크인/체크아웃', icon: <Key className="h-4 w-4" /> },
      { name: '객실 내 자쿠지', icon: <Waves className="h-4 w-4" /> },
      { name: '프리미엄 와인/주류 셀렉션', icon: <Wine className="h-4 w-4" /> },
      { name: '프라이빗 다이닝 옵션', icon: <ChefHat className="h-4 w-4" /> },
      { name: '스페셜 스파 트리트먼트 패키지', icon: <Heart className="h-4 w-4" /> },
    ],
  },
};

// 객실 타입 정의
type RoomType = 'standard' | 'deluxe' | 'premium' | 'presidential';

// 객실 타입별 어메니티 그룹 매핑
const roomAmenityGroups: Record<RoomType, (keyof typeof amenityGroups)[]> = {
  standard: ['common'],
  deluxe: ['common', 'deluxe'],
  premium: ['common', 'deluxe', 'premium'],
  presidential: ['common', 'deluxe', 'premium', 'presidential'],
};

const rooms = [
  {
    id: 1,
    type: 'standard',
    name: 'Chill Comfort Room',
    description:
      '심플하고 편안한 기본형 객실로, 자연적 요소가 가미된 인테리어와 가든 뷰를 제공하는 30㎡ 크기의 객실입니다.',
    image: '/images/rooms/comfort.jpg',
    size: '30',
    capacity: '성인 2인 + 아동 1인 (최대 3인)',
    price: {
      weekday: 220000,
      weekend: 270000,
      peak: 320000,
    },
    building: 'F동',
    view: '가든 뷰',
    amenities: ['Wi-Fi', 'TV', '에어컨'],
  },
  {
    id: 2,
    type: 'deluxe',
    name: 'Chill Harmony Room',
    description:
      '넓은 공간과 고급스러운 인테리어, 휴식을 위한 전용 소파 공간이 있는 45㎡ 크기의 객실입니다.',
    image: '/images/rooms/harmony.jpg',
    size: '45',
    capacity: '성인 2인 + 아동 1인 (최대 3인)',
    price: {
      weekday: 280000,
      weekend: 350000,
      peak: 400000,
    },
    building: 'E동',
    view: '가든 뷰',
    amenities: ['Wi-Fi', 'TV', '에어컨', '미니바'],
  },
  {
    id: 3,
    type: 'premium',
    name: 'Chill Serenity Room',
    description:
      '넓은 창과 테라스가 있는 70㎡ 객실로, 자연과 하나 되는 휴식을 제공하는 프리미엄 객실입니다.',
    image: '/images/rooms/serenity.jpg',
    size: '70',
    capacity: '성인 2인 + 아동 2인 (최대 4인)',
    price: {
      weekday: 380000,
      weekend: 450000,
      peak: 520000,
    },
    building: 'D동',
    view: '가든 뷰',
    amenities: ['Wi-Fi', 'TV', '에어컨', '미니바', '스파'],
  },
  {
    id: 4,
    type: 'premium',
    name: 'Chill Family Suite',
    description:
      '가족 단위 고객을 위한 90㎡ 스위트룸으로, 2개의 침실과 거실이 분리되어 있어 편안한 가족 휴식이 가능합니다.',
    image: '/images/rooms/family.jpg',
    size: '90',
    capacity: '성인 4인 + 아동 2인 (최대 6인)',
    price: {
      weekday: 520000,
      weekend: 650000,
      peak: 750000,
    },
    building: 'C동',
    view: '숲 & 오솔길 뷰',
    amenities: ['Wi-Fi', 'TV', '에어컨', '미니바', '스파'],
  },
  {
    id: 5,
    type: 'premium',
    name: 'Chill Lake Suite',
    description:
      '100㎡ 크기의 럭셔리 스위트룸으로, 파노라마 호수 전망과 프라이빗 테라스를 갖추고 있습니다.',
    image: '/images/rooms/lake.jpg',
    size: '100',
    capacity: '성인 2인 + 아동 2인 (최대 4인)',
    price: {
      weekday: 680000,
      weekend: 820000,
      peak: 950000,
    },
    building: 'B동',
    view: '호수 & 산 뷰',
    amenities: ['Wi-Fi', 'TV', '에어컨', '미니바', '스파'],
  },
  {
    id: 6,
    type: 'presidential',
    name: 'Ultimate Chill Suite',
    description:
      '120㎡의 최고급 스위트룸으로, 전용 라운지와 다이닝 공간, 웰니스 룸을 갖춘 프리미엄 객실입니다.',
    image: '/images/rooms/ultimate.jpg',
    size: '120',
    capacity: '성인 4인 + 아동 4인 (최대 8인)',
    price: {
      weekday: 950000,
      weekend: 1200000,
      peak: 1500000,
    },
    building: 'A동',
    view: '선택 가능 프리미엄 뷰',
    amenities: ['Wi-Fi', 'TV', '에어컨', '미니바', '스파', '집사 서비스'],
  },
];

// 어메니티 타입 정의
type AmenityItem = {
  name: string;
  icon: JSX.Element;
};

type AmenityGroupType = {
  name: string;
  icon: JSX.Element;
  items: AmenityItem[];
};

// 어메니티 그룹 컴포넌트
const AmenityGroupComponent = ({ group, items }: { group: string; items: AmenityItem[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-1">
      <Badge variant="outline" className="flex items-center gap-1">
        {items[0].icon}
        <span>{group}</span>
      </Badge>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0 hover:bg-primary/10"
            aria-label="어메니티 상세 정보"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">{group}</h4>
              <p className="text-sm text-muted-foreground">제공되는 모든 어메니티를 확인하세요</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

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
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="relative h-64">
                      <Image
                        src={room.image || '/placeholder.svg'}
                        alt={room.name}
                        fill
                        className="object-cover"
                      />
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
                            <span>{room.capacity.split(' (')[0]}</span>
                          </div>
                          <div className="text-xs text-neutral-400 ml-6">
                            {room.capacity.split(' (')[1].replace(')', '')}
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
