'use client';

import { cn } from '@/lib/utils';
import { throttle } from 'lodash';
import { ArrowUp } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 위치 감지 및 버튼 표시 여부 설정
  const handleScroll = useCallback(
    throttle(() => {
      const scrolled = window.scrollY > 100;
      setIsVisible(scrolled);
    }, 100),
    []
  );

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 페이지 변경 시 스크롤 초기화
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 50);
    };

    handleRouteChange();

    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }

    return () => {
      if (history.scrollRestoration) {
        history.scrollRestoration = 'auto';
      }
    };
  }, [pathname, searchParams]);

  // 스크롤 탑으로 이동하는 함수
  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      // 부드러운 스크롤이 지원되지 않는 경우 대체 동작
      window.scrollTo(0, 0);
    }
  };

  return (
    <button
      onClick={scrollToTop}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          scrollToTop();
        }
      }}
      className={cn(
        'fixed bottom-8 right-8 z-50',
        'w-12 h-12 md:w-14 md:h-14',
        'flex items-center justify-center',
        'bg-primary hover:bg-primary/90 text-white',
        'rounded-full shadow-lg',
        'transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      aria-label="페이지 최상단으로 이동"
      aria-live="polite"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
}
