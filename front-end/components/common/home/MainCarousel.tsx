'use client'; // 이 지시문은 Next.js에서 이 컴포넌트가 클라이언트 측에서 실행됨을 나타냅니다

import { Button } from '@/components/common/ui/Button'; // 버튼 UI 컴포넌트 가져오기
import { cn } from '@/lib/utils'; // 클래스 이름을 조건부로 결합하는 유틸리티 함수
import { ChevronLeft, ChevronRight } from 'lucide-react'; // 좌/우 화살표 아이콘 컴포넌트
import Image from 'next/image'; // Next.js의 최적화된 이미지 컴포넌트
import { useCallback, useEffect, useState } from 'react'; // React 훅

/**
 * 캐러셀에 표시될 슬라이드 데이터 배열
 * 각 슬라이드는 고유 ID, 이미지 경로, 제목, 부제목을 포함합니다.
 */
const slides = [
  {
    id: 1,
    image: '/placeholder.svg?height=1080&width=1920',
    title: 'Your Ultimate Healing Retreat',
    subtitle: 'Experience tranquility and rejuvenation at Chill Haven Resort & Spa',
  },
  {
    id: 2,
    image: '/placeholder.svg?height=1080&width=1920',
    title: 'Find Your Inner Peace',
    subtitle: 'Reconnect with yourself in our serene natural surroundings',
  },
  {
    id: 3,
    image: '/placeholder.svg?height=1080&width=1920',
    title: 'Escape to Tranquility',
    subtitle: 'Let go of stress and embrace the healing power of nature',
  },
];

/**
 * MainCarousel 컴포넌트
 * 
 * 홈페이지 상단에 표시되는 메인 이미지 슬라이더를 구현합니다.
 * 자동 슬라이드 기능과 수동 네비게이션(화살표 및 인디케이터)을 제공합니다.
 * 각 슬라이드에는 이미지, 제목, 부제목, 그리고 CTA 버튼이 포함됩니다.
 */
export default function MainCarousel() {
  // 현재 표시 중인 슬라이드의 인덱스를 추적하는 상태 변수
  const [currentSlide, setCurrentSlide] = useState(0);
  // 슬라이드 전환 애니메이션 중인지 여부를 추적하는 상태 변수
  const [isAnimating, setIsAnimating] = useState(false);

  /**
   * 다음 슬라이드로 이동하는 함수
   * 애니메이션 중복 실행 방지 로직 포함
   */
  const goToNextSlide = useCallback(() => {
    if (isAnimating) return; // 이미 애니메이션 중이면 실행 중지
    setIsAnimating(true); // 애니메이션 상태 시작
    // 현재 슬라이드가 마지막이면 첫 번째로, 아니면 다음 슬라이드로 이동
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    // 애니메이션 완료 후 상태 초기화 (500ms는 CSS transition-duration과 일치해야 함)
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  /**
   * 이전 슬라이드로 이동하는 함수
   * 애니메이션 중복 실행 방지 로직 포함
   */
  const goToPrevSlide = useCallback(() => {
    if (isAnimating) return; // 이미 애니메이션 중이면 실행 중지
    setIsAnimating(true); // 애니메이션 상태 시작
    // 현재 슬라이드가 첫 번째면 마지막으로, 아니면 이전 슬라이드로 이동
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    // 애니메이션 완료 후 상태 초기화
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  /**
   * 자동 슬라이드 기능 구현
   * 6초마다 다음 슬라이드로 자동 전환됩니다.
   */
  useEffect(() => {
    // setInterval을 사용하여 주기적으로 다음 슬라이드로 이동
    const interval = setInterval(goToNextSlide, 6000);
    // 컴포넌트 언마운트 시 인터벌 정리 (메모리 누수 방지)
    return () => clearInterval(interval);
  }, [goToNextSlide]); // goToNextSlide가 변경될 때마다 효과 재실행

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="max-w-[1440px] mx-auto h-full relative">
        {/* 슬라이드 컨테이너 */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000',
              // 현재 슬라이드만 표시하고 나머지는 숨김 처리
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            )}
          >
            {/* 슬라이드 배경 이미지 */}
            <Image
              src={slide.image || '/placeholder.svg'}
              alt={slide.title}
              fill
              priority // 이미지를 우선적으로 로드 (LCP 최적화)
              className="object-cover"
            />
            {/* 이미지 위에 어두운 오버레이 추가 (텍스트 가독성 향상) */}
            <div className="absolute inset-0 bg-black/30" />
            {/* 슬라이드 콘텐츠 (제목, 부제목, 버튼) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl">{slide.title}</h1>
              <p className="text-xl md:text-2xl max-w-2xl mb-8">{slide.subtitle}</p>
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
                Begin Your Journey
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 좌우 네비게이션 화살표 */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-10"
        aria-label="Previous slide" // 접근성을 위한 레이블
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-10"
        aria-label="Next slide" // 접근성을 위한 레이블
      >
        <ChevronRight size={24} />
      </button>

      {/* 하단 슬라이드 인디케이터 (점) */}
      <div className="absolute bottom-32 left-0 right-0 flex justify-center space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              // 특정 슬라이드로 직접 이동하는 기능
              if (isAnimating) return; // 애니메이션 중이면 실행 중지
              setIsAnimating(true);
              setCurrentSlide(index);
              setTimeout(() => setIsAnimating(false), 500);
            }}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              // 현재 슬라이드 인디케이터는 더 넓게 표시하고 색상 강조
              index === currentSlide ? 'bg-white w-10' : 'bg-white/50 hover:bg-white/80'
            )}
            aria-label={`Go to slide ${index + 1}`} // 접근성을 위한 레이블
          />
        ))}
      </div>
    </div>
  );
}
