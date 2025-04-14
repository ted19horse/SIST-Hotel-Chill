'use client'; // 이 지시문은 Next.js에서 이 컴포넌트가 클라이언트 측에서 실행됨을 나타냅니다

import { cn } from '@/lib/utils'; // 클래스 이름을 조건부로 결합하는 유틸리티 함수
import { throttle } from 'lodash'; // 함수 호출 빈도를 제한하는 유틸리티 함수
import { ArrowUp } from 'lucide-react'; // 화살표 아이콘 컴포넌트
import { usePathname, useSearchParams } from 'next/navigation'; // Next.js의 라우팅 관련 훅
import { useCallback, useEffect, useState } from 'react'; // React 훅
import { boolean } from 'zod';

/**
 * ScrollToTop 컴포넌트
 * 
 * 페이지를 아래로 스크롤할 때 나타나는 '맨 위로 이동' 버튼을 구현합니다.
 * 사용자가 페이지를 100px 이상 스크롤하면 버튼이 나타나고,
 * 버튼을 클릭하면 페이지 최상단으로 부드럽게 스크롤됩니다.
 */
export default function ScrollToTop() {
  // 현재 경로와 URL 파라미터를 가져옵니다 (페이지 변경 감지용)
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // 버튼의 표시 여부를 관리하는 상태
  const [isVisible, setIsVisible] = useState(false);

  /**
   * 스크롤 위치를 감지하고 버튼 표시 여부를 설정하는 함수
   * throttle을 사용하여 100ms마다 한 번씩만 실행되도록 제한합니다.
   * (성능 최적화: 스크롤 이벤트는 매우 자주 발생하기 때문)
   */
  const handleScroll = useCallback(
    throttle(() => {
      // 스크롤 위치가 100px을 초과하면 버튼을 표시합니다
      const scrolled = window.scrollY > 100;
      setIsVisible(scrolled);
    }, 100),
    []
  );

  /**
   * 컴포넌트가 마운트될 때 스크롤 이벤트 리스너를 등록하고,
   * 언마운트될 때 이벤트 리스너를 제거합니다.
   * (메모리 누수 방지를 위한 클린업 함수 포함)
   */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /**
   * 페이지 변경 시 스크롤 위치를 최상단으로 초기화합니다.
   * pathname이나 searchParams가 변경될 때마다 실행됩니다.
   */
  useEffect(() => {
    const handleRouteChange = () => {
      // 여러 방식으로 스크롤 위치를 초기화합니다 (브라우저 호환성 고려)
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0; // <html> 요소
      document.body.scrollTop = 0; // <body> 요소

      // 일부 브라우저에서 즉시 적용되지 않는 경우를 대비해 약간의 지연 후 다시 시도
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 50);
    };

    // 페이지 변경 시 스크롤 초기화 실행
    handleRouteChange();

    // 브라우저의 스크롤 복원 동작을 비활성화 (수동으로 제어하기 위함)
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }

    // 컴포넌트 언마운트 시 브라우저의 기본 스크롤 복원 동작 복구
    return () => {
      if (history.scrollRestoration) {
        history.scrollRestoration = 'auto';
      }
    };
  }, [pathname, searchParams]); // 경로나 검색 파라미터가 변경될 때마다 실행

  /**
   * 페이지 최상단으로 스크롤하는 함수
   * 가능하면 부드러운 스크롤 효과를 사용하고,
   * 지원되지 않는 브라우저에서는 즉시 이동합니다.
   */
  const scrollToTop = () => {
    try {
      // 부드러운 스크롤 효과로 최상단으로 이동 (모던 브라우저)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      // 부드러운 스크롤이 지원되지 않는 경우 대체 동작
      window.scrollTo(0, 0);
    }
  };

  return (
    <button
      onClick={scrollToTop} // 클릭 시 최상단으로 스크롤
      onKeyDown={(e) => {
        // 키보드 접근성: Enter 또는 Space 키로도 작동하도록 함
        if (e.key === 'Enter' || e.key === ' ') {
          scrollToTop();
        }
      }}
      className={cn(
        // cn 함수를 사용하여 여러 클래스를 조건부로 결합
        'fixed bottom-8 right-8 z-50', // 화면 우측 하단에 고정 위치
        'w-12 h-12 md:w-14 md:h-14', // 기본 크기 및 반응형 크기 조정
        'flex items-center justify-center', // 내부 아이콘 중앙 정렬
        'bg-primary hover:bg-primary/90 text-white', // 배경색 및 호버 효과
        'rounded-full shadow-lg', // 둥근 모양과 그림자 효과
        'transition-all duration-300', // 부드러운 전환 효과
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2', // 포커스 스타일 (키보드 접근성)
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none' // 표시 여부에 따른 투명도 및 클릭 가능 여부
      )}
      aria-label="페이지 최상단으로 이동" // 스크린 리더를 위한 접근성 레이블
      aria-live="polite" // 스크린 리더에게 상태 변경을 알림
      aria-hidden={!isVisible} // 버튼이 보이지 않을 때 스크린 리더에서도 숨김
      tabIndex={isVisible ? 0 : -1} // 버튼이 보일 때만 탭 순서에 포함
    >
      <ArrowUp className="w-6 h-6" /> {/* 위쪽 화살표 아이콘 */}
    </button>
  );
}
