'use client';

import { Button } from '@/components/common/ui/Button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState, memo } from 'react';

/**
 * 캐러셀에 표시될 슬라이드 데이터 배열
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
 * 개별 슬라이드 컴포넌트 - 메모이제이션으로 불필요한 리렌더링 방지
 */
const Slide = memo(function Slide({
  slide,
  isActive,
}: {
  slide: typeof slides[0];
  isActive: boolean;
}) {
  return (
    <div
      className={cn(
        'absolute inset-0 transition-opacity duration-1000',
        isActive ? 'opacity-100' : 'opacity-0'
      )}
    >
      {/* 슬라이드 배경 이미지 */}
      <Image
        src={slide.image || '/placeholder.svg'}
        alt={slide.title}
        fill
        priority={slide.id === 1} // 첫 번째 슬라이드만 priority 설정
        sizes="100vw" // 반응형 크기 설정
        className="object-cover"
        quality={80} // 이미지 품질 최적화
      />
      {/* 이미지 위에 어두운 오버레이 추가 */}
      <div className="absolute inset-0 bg-black/30" />
      {/* 슬라이드 콘텐츠 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl">{slide.title}</h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-8">{slide.subtitle}</p>
        <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
          Begin Your Journey
        </Button>
      </div>
    </div>
  );
});

/**
 * 슬라이드 인디케이터 버튼 컴포넌트 - 메모이제이션으로 불필요한 리렌더링 방지
 */
const SlideIndicator = memo(function SlideIndicator({
  index,
  currentSlide,
  onClick,
  isAnimating,
}: {
  index: number;
  currentSlide: number;
  onClick: () => void;
  isAnimating: boolean;
}) {
  return (
    <button
      onClick={() => {
        if (isAnimating) return;
        onClick();
      }}
      className={cn(
        'w-3 h-3 rounded-full transition-all',
        index === currentSlide ? 'bg-white w-10' : 'bg-white/50 hover:bg-white/80'
      )}
      aria-label={`Go to slide ${index + 1}`}
    />
  );
});

/**
 * MainCarousel 컴포넌트 - 성능 최적화
 * 
 * 최적화 내용:
 * 1. 메모이제이션을 통한 불필요한 리렌더링 방지
 * 2. 이미지 로딩 최적화
 * 3. 첫 번째 슬라이드만 priority 로딩으로 설정
 * 4. 컴포넌트 분리로 리렌더링 범위 최소화
 */
export default function MainCarousel() {
  // 상태 관리
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // 슬라이드 이동 함수 - useCallback으로 메모이제이션
  const goToNextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const goToPrevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  // 자동 슬라이드 기능
  useEffect(() => {
    const interval = setInterval(goToNextSlide, 6000);
    return () => clearInterval(interval);
  }, [goToNextSlide]);

  // 특정 슬라이드로 이동하는 함수
  const goToSlide = useCallback((index: number) => {
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="max-w-[1440px] mx-auto h-full relative">
        {/* 슬라이드 컴포넌트 */}
        {slides.map((slide) => (
          <Slide 
            key={slide.id} 
            slide={slide} 
            isActive={slides.indexOf(slide) === currentSlide} 
          />
        ))}
      </div>

      {/* 네비게이션 버튼 */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-10"
        aria-label="Previous slide"
        disabled={isAnimating}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-10"
        aria-label="Next slide"
        disabled={isAnimating}
      >
        <ChevronRight size={24} />
      </button>

      {/* 슬라이드 인디케이터 */}
      <div className="absolute bottom-32 left-0 right-0 flex justify-center space-x-2 z-10">
        {slides.map((_, index) => (
          <SlideIndicator
            key={index}
            index={index}
            currentSlide={currentSlide}
            onClick={() => goToSlide(index)}
            isAnimating={isAnimating}
          />
        ))}
      </div>
    </div>
  );
}
