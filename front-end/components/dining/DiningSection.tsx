'use client'; // 이 지시문은 Next.js에서 이 컴포넌트가 클라이언트 측에서 실행됨을 나타냅니다

import { Button } from '@/components/common/ui/Button'; // 버튼 UI 컴포넌트 가져오기
import { Carousel } from '@/components/common/ui/Carousel'; // 캐러셀 UI 컴포넌트 가져오기
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver'; // 요소가 화면에 보이는지 감지하는 커스텀 훅
import { cn } from '@/lib/utils'; // 클래스 이름을 조건부로 결합하는 유틸리티 함수
import { ChevronRight } from 'lucide-react'; // 오른쪽 화살표 아이콘 컴포넌트
import Image from 'next/image'; // Next.js의 최적화된 이미지 컴포넌트
import Link from 'next/link'; // Next.js의 클라이언트 사이드 라우팅을 위한 링크 컴포넌트
import { useEffect, useRef, useState } from 'react'; // React 훅

/**
 * 다이닝 정보 데이터 배열
 * 각 다이닝 항목은 고유 ID, 이름, 설명, 이미지 경로, 운영 시간을 포함합니다.
 */
const dinings = [
  {
    id: 1,
    name: 'Chill Bites',
    description: '신선한 유기농 재료로 만든 건강한 요리를 즐길 수 있는 올데이 다이닝',
    image: '/placeholder.svg?height=600&width=800',
    hours: '06:30 - 22:30',
  },
  {
    id: 2,
    name: 'Chill Garden',
    description: '자연 속에서 즐기는 힐링 다이닝, 정원 전망과 함께하는 건강식',
    image: '/placeholder.svg?height=600&width=800',
    hours: '11:30 - 22:00',
  },
  {
    id: 3,
    name: 'Chill Moments',
    description: '여유로운 분위기에서 즐기는 유기농 차와 웰빙 디저트',
    image: '/placeholder.svg?height=600&width=800',
    hours: '10:00 - 24:00',
  },
  {
    id: 4,
    name: 'Chill Elegance',
    description: '고급 모던 한식 및 퓨전 요리',
    image: '/placeholder.svg?height=600&width=800',
    hours: '18:00 - 22:00',
  },
];

/**
 * DiningSection 컴포넌트
 * 
 * 홈페이지의 다이닝 소개 섹션을 구현합니다.
 * 스크롤 시 애니메이션 효과가 적용되며, 다이닝 정보를 캐러셀로 표시합니다.
 * Intersection Observer API를 활용하여 컴포넌트가 화면에 보일 때 애니메이션을 트리거합니다.
 */
export default function DiningSection() {
  // 섹션 요소에 대한 참조 생성 (DOM 요소에 접근하기 위함)
  const sectionRef = useRef<HTMLElement>(null);
  // 커스텀 훅을 사용하여 섹션이 화면에 보이는지 감지 (threshold: 0.1은 요소의 10%가 보일 때 감지)
  const isVisible = useIntersectionObserver({ ref: sectionRef, threshold: 0.1 });
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

  /**
   * 캐러셀에 표시할 다이닝 항목 컴포넌트 배열 생성
   * 각 다이닝 항목은 이미지, 이름, 설명, 운영 시간, 상세 페이지 링크를 포함합니다.
   */
  const diningItems = dinings.map((dining) => (
    <div key={dining.id} className="group relative overflow-hidden rounded-lg h-96 w-full">
      {/* 다이닝 이미지 컨테이너 */}
      <div className="relative h-full w-full">
        <Image
          src={dining.image || '/placeholder.svg'}
          alt={dining.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105" // 호버 시 이미지 확대 효과
          loading="lazy" // 지연 로딩으로 성능 최적화
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 반응형 이미지 크기 최적화
        />
        {/* 이미지 위에 그라데이션 오버레이 추가 (텍스트 가독성 향상) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      {/* 다이닝 정보 텍스트 영역 */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-2xl font-bold mb-2">{dining.name}</h3>
            <p className="mb-4 max-w-md">{dining.description}</p>
            <p className="text-sm opacity-80">운영시간: {dining.hours}</p>
          </div>
          {/* 상세 페이지로 이동하는 링크 버튼 */}
          <Link
            href={`/dining#restaurant-${dining.id}`}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <section
      ref={sectionRef} // ref를 통해 DOM 요소 참조
      className={cn(
        'py-20 transition-opacity duration-1000 ease-in-out',
        // 섹션이 화면에 보이거나 이미 애니메이션이 실행되었으면 완전히 표시, 아니면 투명하게 처리
        isVisible || hasAnimated ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className="container mx-auto px-4">
        {/* 섹션 제목과 설명 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">다이닝</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            건강과 맛을 모두 생각한 Chill Haven의 다이닝 경험을 통해 몸과 마음의 균형을 찾아보세요.
          </p>
        </div>

        {/* 다이닝 캐러셀 */}
        <Carousel 
          autoSlideInterval={5000} // 5초마다 자동 슬라이드
          slidesToShow={1} // 한 번에 하나의 슬라이드만 표시
          className="md:max-w-4xl mx-auto"
        >
          {diningItems}
        </Carousel>

        {/* '모든 다이닝 보기' 버튼 */}
        <div className="text-center mt-12">
          <Button
            asChild // 버튼을 다른 컴포넌트(Link)로 렌더링하기 위한 속성
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Link href="/dining">
              모든 다이닝 보기
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
