/**
 * PageBanner 컴포넌트
 * 
 * 모든 페이지 상단에 공통으로 사용되는 배너 컴포넌트입니다.
 * 제목, 배경 이미지, 부제목 및 이동 경로(breadcrumbs)를 표시합니다.
 * 
 * @example
 * <PageBanner 
 *   title="객실 안내" 
 *   breadcrumbs={[{ label: '홈', href: '/' }, { label: '객실' }]} 
 *   backgroundImage="/images/rooms-banner.jpg" 
 * />
 */

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  breadcrumbs?: BreadcrumbItem[];
  height?: string; // CSS 높이 값 (예: '40vh', '400px')
  className?: string;
}

export default function PageBanner({
  title,
  subtitle,
  backgroundImage = "/placeholder.svg?height=800&width=1920",
  breadcrumbs = [],
  height = '40vh',
  className = '',
}: PageBannerProps) {
  return (
    <div 
      className={`relative bg-neutral-900 ${className}`} 
      style={{ height }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          opacity: 0.6,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          
          {subtitle && (
            <p className="text-lg md:text-xl mb-4">{subtitle}</p>
          )}
          
          {breadcrumbs.length > 0 && (
            <div className="flex items-center justify-center text-sm">
              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
                  {item.href ? (
                    <Link href={item.href} className="hover:underline">
                      {item.label}
                    </Link>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
