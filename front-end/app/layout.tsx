import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';
import ScrollToTop from '../components/scroll-to-top';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chill Haven Resort & Spa',
  description: 'Your ultimate healing retreat',
  generator: 'v0.dev'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}

import './globals.css';
