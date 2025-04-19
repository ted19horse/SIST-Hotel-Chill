import ClientComponentWrapper from '@/components/common/ClientComponentWrapper';
import ScrollToTop from '@/components/common/home/ScrollToTop';
import Header from '@/components/common/layout/Header';
import Footer from '@/components/common/layout/Footer';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chill Haven Resort & Spa',
  description: 'Your ultimate healing retreat',
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ClientComponentWrapper>
          {/* 헤더 영역 */}
          <Header />
          {/* 페이지 상단 이동 버튼 */}
          <ScrollToTop />
          {children}
          {/* 푸터 영역 */}
          <Footer />
        </ClientComponentWrapper>
      </body>
    </html>
  );
}
