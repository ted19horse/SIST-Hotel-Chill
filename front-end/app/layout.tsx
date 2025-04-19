import ClientComponentWrapper from '@/components/common/ClientComponentWrapper';
import ScrollToTop from '@/components/common/home/ScrollToTop';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';
import './globals.css';

// 웹 폰트 최적화 (preload 설정)
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // 폰트 로드 중 텍스트 표시 최적화
  preload: true,
  // 필요한 가중치만 지정하여 폰트 파일 크기 최적화
  weight: ['400', '500', '600', '700'],
});

// 메타데이터 정의
export const metadata: Metadata = {
  title: 'Chill Haven Resort & Spa',
  description: 'Your ultimate healing retreat in nature, offering premium accommodation, dining, and spa services.',
  generator: 'Next.js',
  applicationName: 'Chill Haven Resort & Spa',
  // 검색 엔진 최적화를 위한 추가 메타데이터
  keywords: ['resort', 'spa', 'hotel', 'accommodation', 'luxury', 'retreat'],
  authors: [{ name: 'SIST Hotel Chill Team' }],
  creator: 'SIST Hotel Chill Team',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// 뷰포트 설정
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
};

/**
 * 루트 레이아웃 컴포넌트
 * 
 * 성능 최적화:
 * 1. 웹 폰트 최적화 설정
 * 2. 필요한 메타데이터 최적화
 * 3. ScrollToTop 컴포넌트 중복 제거 (페이지에서 제거)
 * 
 * @param {object} props - 컴포넌트 속성
 * @param {React.ReactNode} props.children - 자식 컴포넌트
 * @returns {JSX.Element} 렌더링된 레이아웃
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ClientComponentWrapper>
          <ScrollToTop />
          {children}
        </ClientComponentWrapper>
      </body>
    </html>
  );
}
