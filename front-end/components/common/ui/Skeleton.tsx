'use client';

import { cn } from '@/lib/utils';
import React from 'react';

/**
 * Skeleton UI 컴포넌트 속성 인터페이스
 */
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: string;
}

/**
 * Skeleton 컴포넌트
 * 
 * 콘텐츠 로딩 중에 표시되는 로딩 플레이스홀더 컴포넌트입니다.
 * 부드러운 애니메이션을 통해 로딩 중임을 시각적으로, 부드럽게 표현합니다.
 * 
 * @param {SkeletonProps} props - 컴포넌트 속성
 * @returns {JSX.Element} 렌더링된 스켈레톤 컴포넌트
 * 
 * @example
 * // 기본 사용법
 * <Skeleton className="h-10 w-full" />
 * 
 * @example
 * // 커스텀 크기 및 모서리 둥글기 지정
 * <Skeleton width="200px" height="100px" rounded="md" />
 */
export function Skeleton({
  className,
  width,
  height,
  rounded = 'md',
  ...props
}: SkeletonProps) {
  const style: React.CSSProperties = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-neutral-200 dark:bg-neutral-700',
        rounded === 'none' ? '' : `rounded-${rounded}`,
        className
      )}
      style={style}
      {...props}
    />
  );
}

/**
 * SkeletonText 컴포넌트
 * 
 * 텍스트 로딩 중에 표시되는 로딩 플레이스홀더 컴포넌트입니다.
 * 
 * @param {SkeletonProps} props - 컴포넌트 속성
 * @returns {JSX.Element} 렌더링된 텍스트 스켈레톤 컴포넌트
 * 
 * @example
 * <SkeletonText className="h-4 w-3/4" />
 */
export function SkeletonText({ className, ...props }: SkeletonProps) {
  return (
    <Skeleton
      className={cn('h-4 w-full', className)}
      rounded="sm"
      {...props}
    />
  );
}

/**
 * SkeletonCircle 컴포넌트
 * 
 * 원형 로딩 플레이스홀더 컴포넌트입니다.
 * 
 * @param {SkeletonProps} props - 컴포넌트 속성
 * @returns {JSX.Element} 렌더링된 원형 스켈레톤 컴포넌트
 * 
 * @example
 * <SkeletonCircle size={48} />
 */
export function SkeletonCircle({ className, width, height, ...props }: SkeletonProps) {
  const size = width || height || 48;
  
  return (
    <Skeleton
      className={cn('rounded-full', className)}
      width={size}
      height={size}
      rounded="full"
      {...props}
    />
  );
}

/**
 * SkeletonCard 컴포넌트
 * 
 * 카드 로딩 플레이스홀더 컴포넌트입니다.
 * 
 * @param {SkeletonProps} props - 컴포넌트 속성
 * @returns {JSX.Element} 렌더링된 카드 스켈레톤 컴포넌트
 * 
 * @example
 * <SkeletonCard className="h-64" />
 */
export function SkeletonCard({ className, ...props }: SkeletonProps) {
  return (
    <Skeleton
      className={cn('h-48 w-full', className)}
      rounded="lg"
      {...props}
    >
      <div className="p-4 space-y-3">
        <SkeletonText className="h-6 w-3/4" />
        <SkeletonText className="h-4 w-full" />
        <SkeletonText className="h-4 w-5/6" />
      </div>
    </Skeleton>
  );
}
