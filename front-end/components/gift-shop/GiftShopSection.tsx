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
 * 기프트샵 카테고리 데이터 배열
 * 각 카테고리는 고유 ID, 이름, 설명, 이미지 경로를 포함합니다.
 */
const categories = [
  {
    id: 1,
    name: 'Chill Haven 시그니처 컬렉션',
    description: '호텔 로고와 시그니처 향이 담긴 제품들',
    image: '/placeholder.svg?height=600&width=800',
  },
  {
    id: 2,
    name: '힐링 & 웰니스 컬렉션',
    description: '마음의 평화와 힐링을 위한 제품들',
    image: '/placeholder.svg?height=600&width=800',
  },
  {
    id: 3,
    name: '에코 & 지속가능한 라이프스타일 제품',
    description: '환경을 생각하는 지속가능한 제품들',
    image: '/placeholder.svg?height=600&width=800',
  },
  {
    id: 4,
    name: '휴식을 위한 식음료 제품',
    description: '차와 음식으로 즐기는 휴식',
    image: '/placeholder.svg?height=600&width=800',
  },
  {
    id: 5,
    name: '객실 등급별 맞춤 컬렉션',
    description: '객실 타입에 맞는 특별 제품들',
    image: '/placeholder.svg?height=600&width=800',
  },
  {
    id: 6,
    name: '메모리 & 컬렉터블 아이템',
    description: '특별한 기념품과 컬렉션 아이템',
    image: '/placeholder.svg?height=600&width=800',
  },
];

/**
 * GiftShopSection 컴포넌트
 * 
 * 홈페이지의 기프트샵 소개 섹션을 구현합니다.
 * 스크롤 시 애니메이션 효과가 적용되며, 기프트샵 카테고리를 캐러셀로 표시합니다.
 * Intersection Observer API를 활용하여 컴포넌트가 화면에 보일 때 애니메이션을 트리거합니다.
 */
export default function GiftShopSection() {
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
   * 캐러셀에 표시할 카테고리 항목 컴포넌트 배열 생성
   * 각 카테고리 항목은 이미지, 이름, 설명, 상세 페이지 링크를 포함합니다.
   */
  const categoryItems = categories.map((category) => (
    <div key={category.id} className="group relative overflow-hidden rounded-lg h-96 w-full">
      {/* 카테고리 이미지 컨테이너 */}
      <div className="relative h-full w-full">
        <Image
          src={category.image || '/placeholder.svg'}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105" // 호버 시 이미지 확대 효과
          loading="lazy" // 지연 로딩으로 성능 최적화
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 반응형 이미지 크기 최적화
        />
        {/* 이미지 위에 그라데이션 오버레이 추가 (텍스트 가독성 향상) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      {/* 카테고리 정보 텍스트 영역 */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
            <p className="mb-4 max-w-md">{category.description}</p>
          </div>
          {/* 카테고리 상세 페이지로 이동하는 링크 버튼 */}
          <Link
            href={`/gift-shop/products?category=${category.id}`}
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
        'py-20 bg-neutral-50 transition-opacity duration-1000 ease-in-out',
        // 섹션이 화면에 보이거나 이미 애니메이션이 실행되었으면 완전히 표시, 아니면 투명하게 처리
        isVisible || hasAnimated ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className="container mx-auto px-4">
        {/* 섹션 제목과 설명 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">기프트샵</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Chill Haven의 힐링 경험을 집에서도 이어갈 수 있는 특별한 제품들을 만나보세요.
          </p>
        </div>

        {/* 카테고리 캐러셀 */}
        <Carousel 
          autoSlideInterval={5000} // 5초마다 자동 슬라이드
          slidesToShow={1} // 한 번에 하나의 슬라이드만 표시
          className="md:max-w-4xl mx-auto"
        >
          {categoryItems}
        </Carousel>

        {/* '기프트샵 방문하기' 버튼 */}
        <div className="text-center mt-12">
          <Button
            asChild // 버튼을 다른 컴포넌트(Link)로 렌더링하기 위한 속성
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Link href="/gift-shop/products">
              기프트샵 방문하기
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
