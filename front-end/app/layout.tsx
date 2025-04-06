import ClientComponentWrapper from '@/components/common/ClientComponentWrapper';
import ScrollToTop from '@/components/common/home/ScrollToTop';
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
          <ScrollToTop />
          {children}
        </ClientComponentWrapper>
      </body>
    </html>
  );
}

import './globals.css';
