'use client'; // 이 지시문은 Next.js에서 이 컴포넌트가 클라이언트 측에서 실행됨을 나타냅니다

import { Button } from '@/components/common/ui/Button'; // 버튼 UI 컴포넌트 가져오기
import { cn } from '@/lib/utils'; // 클래스 이름을 조건부로 결합하는 유틸리티 함수
import { Menu, X } from 'lucide-react'; // 메뉴와 닫기 아이콘 컴포넌트
import Image from 'next/image'; // Next.js의 최적화된 이미지 컴포넌트
import Link from 'next/link'; // Next.js의 클라이언트 사이드 라우팅을 위한 링크 컴포넌트
import { useEffect, useState } from 'react'; // React 훅

/**
 * Header 컴포넌트
 * 
 * 웹사이트의 상단 네비게이션 바를 구현합니다.
 * 스크롤 위치에 따라 배경색과 텍스트 색상이 변경되며,
 * 반응형 디자인으로 모바일과 데스크톱 레이아웃을 지원합니다.
 */
export default function Header() {
  // 스크롤 상태를 추적하는 상태 변수
  const [scrolled, setScrolled] = useState(false);
  // 모바일 메뉴 열림/닫힘 상태를 추적하는 상태 변수
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /**
   * 스크롤 이벤트를 감지하여 헤더 스타일을 변경하는 효과
   * 페이지가 10px 이상 스크롤되면 헤더 배경색과 텍스트 색상이 변경됩니다.
   */
  useEffect(() => {
    // 스크롤 위치를 감지하는 함수
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거 (메모리 누수 방지)
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header
      className={cn(
        // 기본 헤더 스타일: 상단에 고정, z-index로 다른 요소 위에 표시
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        // 스크롤 여부에 따른 조건부 스타일 적용
        scrolled ? 'bg-white text-neutral-900 shadow-md py-4' : 'bg-transparent text-white py-6'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* 로고 영역 */}
          <Link href="/" className="relative z-10">
            <div className="flex items-center">
              <div className="relative h-12 w-12 mr-3">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Chill Haven Logo"
                  fill
                  className={cn(
                    'object-contain transition-all',
                    // 스크롤 여부에 따라 로고 이미지 색상 변경
                    scrolled ? 'opacity-100' : 'brightness-0 invert opacity-100'
                  )}
                  priority // 이미지를 우선적으로 로드 (LCP 최적화)
                />
              </div>
              <div
                className={cn(
                  'font-serif transition-all',
                  // 스크롤 여부에 따라 텍스트 색상 변경
                  scrolled ? 'text-primary' : 'text-white'
                )}
              >
                <h1 className="text-xl font-bold leading-tight">Chill Haven</h1>
                <p className="text-xs tracking-wider">Resort & Spa</p>
              </div>
            </div>
          </Link>

          {/* 데스크톱 네비게이션 (중간 크기 이상의 화면에서만 표시) */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              <li>
                <Link href="/rooms" className="font-medium hover:text-primary transition-colors">
                  객실
                </Link>
              </li>
              <li>
                <Link href="/dining" className="font-medium hover:text-primary transition-colors">
                  다이닝
                </Link>
              </li>
              <li>
                <Link
                  href="/membership"
                  className="font-medium hover:text-primary transition-colors"
                >
                  멤버십
                </Link>
              </li>
              <li>
                <Link
                  href="/gift-shop"
                  className="font-medium hover:text-primary transition-colors"
                >
                  기프트샵
                </Link>
              </li>
              <li>
                <Link
                  href="/facilities"
                  className="font-medium hover:text-primary transition-colors"
                >
                  부대시설
                </Link>
              </li>
              <li>
                <Link
                  href="/my-account"
                  className="font-medium hover:text-primary transition-colors"
                >
                  마이페이지
                </Link>
              </li>
            </ul>
          </nav>

          {/* 모바일 메뉴 버튼 (중간 크기 미만의 화면에서만 표시) */}
          <div className="flex items-center md:hidden">
            <Button className="bg-primary hover:bg-primary/90 text-white mr-4">Book</Button>
            <button
              className="relative z-10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} // 모바일 메뉴 토글
              aria-label="Toggle menu" // 접근성을 위한 레이블
            >
              {mobileMenuOpen ? (
                // 메뉴가 열려있을 때는 X 아이콘 표시
                <X className={scrolled ? 'text-neutral-900' : 'text-white'} />
              ) : (
                // 메뉴가 닫혀있을 때는 메뉴 아이콘 표시
                <Menu className={scrolled ? 'text-neutral-900' : 'text-white'} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 네비게이션 (메뉴가 열려있을 때만 표시) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-24">
          <nav className="container mx-auto px-4">
            <ul className="space-y-6 text-neutral-900">
              <li>
                <Link
                  href="/rooms"
                  className="block text-xl font-medium"
                  onClick={() => setMobileMenuOpen(false)} // 링크 클릭 시 메뉴 닫기
                >
                  객실
                </Link>
              </li>
              <li>
                <Link
                  href="/dining"
                  className="block text-xl font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  다이닝
                </Link>
              </li>
              <li>
                <Link
                  href="/membership"
                  className="block text-xl font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  멤버십
                </Link>
              </li>
              <li>
                <Link
                  href="/gift-shop"
                  className="block text-xl font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  기프트샵
                </Link>
              </li>
              <li>
                <Link
                  href="/facilities"
                  className="block text-xl font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  부대시설
                </Link>
              </li>
              <li>
                <Link
                  href="/my-account"
                  className="block text-xl font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  마이페이지
                </Link>
              </li>
              <li className="pt-4">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  Book Now
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
