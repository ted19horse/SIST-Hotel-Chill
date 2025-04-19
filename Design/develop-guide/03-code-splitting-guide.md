# Next.js 코드 분할 및 지연 로딩 가이드

이 문서는 Next.js 애플리케이션에서 코드 분할(Code Splitting)과 지연 로딩(Lazy Loading) 기법을 활용하여 성능을 최적화하는 방법을 설명합니다. 이러한 기법은 초기 페이지 로드 시간을 단축하고 사용자 경험을 향상시키는 데 중요합니다.

## 목차

1. [코드 분할이란?](#코드-분할이란)
2. [Next.js의 자동 코드 분할](#nextjs의-자동-코드-분할)
3. [동적 임포트(Dynamic Import)](#동적-임포트dynamic-import)
4. [React.lazy와 Suspense](#reactlazy와-suspense)
5. [스켈레톤 UI 구현](#스켈레톤-ui-구현)
6. [인터섹션 옵저버를 활용한 지연 로딩](#인터섹션-옵저버를-활용한-지연-로딩)
7. [Hotel Chill 프로젝트 적용 사례](#hotel-chill-프로젝트-적용-사례)

## 코드 분할이란?

코드 분할은 애플리케이션 번들을 여러 개의 작은 청크(chunk)로 나누는 기술입니다. 이를 통해 필요한 코드만 필요할 때 로드함으로써 초기 로드 시간을 단축할 수 있습니다. React와 Next.js는 다양한 코드 분할 방법을 제공합니다.

코드 분할의 주요 장점:
- 초기 페이지 로드 시간 단축
- 필요하지 않은 코드의 로딩 방지
- 리소스 사용 최적화
- 캐싱 효율성 향상

## Next.js의 자동 코드 분할

Next.js는 기본적으로 다음 수준에서 자동 코드 분할을 제공합니다:

1. **페이지 레벨**: 각 페이지는 별도의 JavaScript 번들로 분할됩니다.
2. **라우트 레벨**: 동적 라우트도 별도의 청크로 로드됩니다.
3. **공통 청크**: 여러 페이지에서 공유되는 코드는 공통 청크로 추출됩니다.

이러한 자동 코드 분할 덕분에 사용자는 현재 필요한 페이지의 코드만 다운로드하면 됩니다.

## 동적 임포트(Dynamic Import)

Next.js는 `next/dynamic`을 통해 동적 임포트를 지원합니다. 이는 React의 lazy 로딩과 유사하지만 서버 사이드 렌더링까지 지원합니다.

### 기본 사용법

```typescript
import dynamic from 'next/dynamic';

// 기본 동적 임포트
const DynamicComponent = dynamic(() => import('@/components/SomeComponent'));

// 로딩 중 표시할 UI 지정
const DynamicComponentWithLoader = dynamic(
  () => import('@/components/SomeComponent'),
  {
    loading: () => <p>로딩 중...</p>
  }
);
```

### SSR 비활성화

일부 컴포넌트는 브라우저 API에 의존하여 서버에서 렌더링할 수 없는 경우가 있습니다. 이런 경우 `ssr` 옵션을 `false`로 설정할 수 있습니다:

```typescript
const DynamicComponentWithNoSSR = dynamic(
  () => import('@/components/BrowserOnlyComponent'),
  { ssr: false }
);
```

### 네이밍된 익스포트 임포트

컴포넌트가 기본 익스포트가 아닌 경우:

```typescript
const DynamicNamedComponent = dynamic(() => 
  import('@/components/SomeComponent').then(mod => mod.NamedComponent)
);
```

## React.lazy와 Suspense

Next.js의 `dynamic`은 내부적으로 React.lazy와 Suspense를 사용합니다. React 18부터는 Suspense가 더 강력해져서 데이터 페칭과 코드 로딩을 모두 처리할 수 있습니다.

### Suspense를 사용한 콘텐츠 스트리밍

```typescript
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// 동적으로 로드할 컴포넌트
const DynamicRoomSection = dynamic(() => import('@/components/rooms/RoomSection'));
const DynamicDiningSection = dynamic(() => import('@/components/dining/DiningSection'));

export default function HomePage() {
  return (
    <main>
      <Header />
      
      {/* Suspense로 감싸기 */}
      <Suspense fallback={<SectionSkeleton />}>
        <DynamicRoomSection rooms={rooms} />
      </Suspense>

      {/* 스크롤 시 보이는 섹션은 나중에 로드 */}
      <Suspense fallback={<SectionSkeleton />}>
        <DynamicDiningSection />
      </Suspense>
    </main>
  );
}

// 로딩 중 표시할 스켈레톤 UI
function SectionSkeleton() {
  return <div className="h-96 bg-gray-100 animate-pulse rounded-lg my-8"></div>;
}
```

### Suspense 경계 중첩

Suspense 경계를 중첩하여 더 세분화된 로딩 상태를 제공할 수 있습니다:

```typescript
<Suspense fallback={<PageSkeleton />}>
  <Header />
  
  <Suspense fallback={<MainContentSkeleton />}>
    <MainContent />
    
    <Suspense fallback={<SectionSkeleton />}>
      <ExpensiveComponent />
    </Suspense>
  </Suspense>
  
  <Footer />
</Suspense>
```

## 스켈레톤 UI 구현

로딩 중 사용자 경험을 향상시키기 위해 스켈레톤 UI를 구현하는 것이 좋습니다. 스켈레톤 UI는 실제 콘텐츠가 로드되기 전에 콘텐츠의 레이아웃을 미리 보여주는 플레이스홀더입니다.

### 기본 스켈레톤 컴포넌트

```typescript
// components/common/ui/Skeleton.tsx
'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: string;
}

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
```

### 특화된 스켈레톤 컴포넌트

다양한 콘텐츠 유형에 맞는 스켈레톤 컴포넌트를 만들 수 있습니다:

```typescript
// 텍스트용 스켈레톤
export function SkeletonText({ className, ...props }: SkeletonProps) {
  return (
    <Skeleton
      className={cn('h-4 w-full', className)}
      rounded="sm"
      {...props}
    />
  );
}

// 이미지 또는 아바타용 원형 스켈레톤
export function SkeletonCircle({ size = 48, ...props }: SkeletonProps & { size?: number }) {
  return (
    <Skeleton
      width={size}
      height={size}
      rounded="full"
      {...props}
    />
  );
}

// 카드용 스켈레톤
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
```

## 인터섹션 옵저버를 활용한 지연 로딩

인터섹션 옵저버(Intersection Observer) API를 사용하면 뷰포트에 요소가 보일 때만 콘텐츠를 로드하여 성능을 더욱 최적화할 수 있습니다.

### 인터섹션 옵저버 커스텀 훅

```typescript
// lib/hooks/useIntersectionObserver.ts
'use client';

import { useEffect, useState } from 'react';

interface UseIntersectionObserverProps {
  ref: React.RefObject<Element>;
  rootMargin?: string;
  threshold?: number | number[];
  root?: Element | null;
}

/**
 * 요소가 뷰포트에 보이는지 감지하는 커스텀 훅
 */
export function useIntersectionObserver({
  ref,
  rootMargin = '0px',
  threshold = 0,
  root = null,
}: UseIntersectionObserverProps): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 요소가 뷰포트에 보이는지 여부 업데이트
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin, threshold, root }
    );

    observer.observe(element);

    // 클린업 함수
    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [ref, rootMargin, threshold, root]);

  return isIntersecting;
}
```

### 인터섹션 옵저버를 활용한 지연 로딩 컴포넌트

```typescript
// components/common/LazyLoad.tsx
'use client';

import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { useRef, useState } from 'react';

interface LazyLoadProps {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  rootMargin?: string;
}

/**
 * 요소가 뷰포트에 보일 때만 자식 컴포넌트를 렌더링하는 래퍼 컴포넌트
 */
export function LazyLoad({ 
  children, 
  placeholder, 
  rootMargin = '200px' 
}: LazyLoadProps) {
  const ref = useRef(null);
  const isVisible = useIntersectionObserver({ ref, rootMargin });
  const [hasRendered, setHasRendered] = useState(false);
  
  // 한 번 보이면 계속 렌더링 유지
  if (isVisible && !hasRendered) {
    setHasRendered(true);
  }
  
  return (
    <div ref={ref}>
      {hasRendered ? children : placeholder}
    </div>
  );
}
```

### 사용 예시

```typescript
<LazyLoad 
  placeholder={<SkeletonCard />}
  rootMargin="200px" // 요소가 뷰포트에 200px 접근하면 로드 시작
>
  <ExpensiveComponent />
</LazyLoad>
```

## Hotel Chill 프로젝트 적용 사례

Hotel Chill 프로젝트에서는 메인 페이지의 성능을 최적화하기 위해 코드 분할과 지연 로딩을 적용했습니다.

### 기존 코드 (최적화 전)

```typescript
// app/page.tsx - 모든 컴포넌트를 직접 임포트
import ReservationPanel from '@/components/common/forms/ReservationPanel';
import MainCarousel from '@/components/common/home/MainCarousel';
import ScrollToTop from '@/components/common/home/ScrollToTop';
import Footer from '@/components/common/layout/Footer';
import Header from '@/components/common/layout/Header';
import DiningSection from '@/components/dining/DiningSection';
import GiftShopSection from '@/components/gift-shop/GiftShopSection';
import RoomSection from '@/components/rooms/RoomSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollToTop />
      <Header />

      <section className="relative w-full h-screen">
        <MainCarousel />
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <ReservationPanel />
        </div>
      </section>

      <RoomSection />
      <DiningSection />
      <GiftShopSection />
      <Footer />
    </main>
  );
}
```

### 최적화 후 코드

```typescript
// app/page.tsx - 동적 임포트와 Suspense 사용
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/common/layout/Header';
import Footer from '@/components/common/layout/Footer';
import MainCarousel from '@/components/common/home/MainCarousel';
import ReservationPanel from '@/components/common/forms/ReservationPanel';
import { getRoomTypes } from '@/lib/api/rooms';

// 로딩 Skeleton UI 컴포넌트
function SectionSkeleton() {
  return <div className="h-96 bg-gray-100 animate-pulse rounded-lg my-8"></div>;
}

// 동적 임포트 사용 - 코드 분할을 통한 번들 크기 감소
const DiningSection = dynamic(
  () => import('@/components/dining/DiningSection'),
  {
    loading: () => <SectionSkeleton />,
    ssr: true // 선택적: 서버 사이드 렌더링 활성화
  }
);

const GiftShopSection = dynamic(
  () => import('@/components/gift-shop/GiftShopSection'),
  {
    loading: () => <SectionSkeleton />,
    ssr: false // 초기 로드 시 필요하지 않은 컴포넌트는 CSR로 처리
  }
);

// 기본 임포트 대신 동적 임포트 사용
const RoomSection = dynamic(
  () => import('@/components/rooms/RoomSection'),
  {
    loading: () => <SectionSkeleton />,
    ssr: true // 중요 섹션은 SSR로 처리
  }
);

export default async function Home() {
  // 서버 컴포넌트에서 데이터 페칭
  const rooms = await getRoomTypes();

  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative w-full h-screen">
        <MainCarousel />
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <ReservationPanel />
        </div>
      </section>

      <Suspense fallback={<SectionSkeleton />}>
        <RoomSection rooms={rooms} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <DiningSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <GiftShopSection />
      </Suspense>

      <Footer />
    </main>
  );
}
```

### 성능 개선 결과

코드 분할과 지연 로딩을 적용한 결과:

1. **초기 번들 크기 감소**
   - 필요한 컴포넌트만 초기에 로드
   - 스크롤 시 보이는 콘텐츠는 필요할 때 로드

2. **초기 로드 시간 단축**
   - 첫 페인트 시간(FP) 개선
   - 상호작용까지 걸리는 시간(TTI) 단축

3. **사용자 경험 향상**
   - 스켈레톤 UI로 로딩 중 시각적 피드백 제공
   - 페이지 스크롤 시 자연스러운 콘텐츠 로드

4. **리소스 사용 최적화**
   - 필요하지 않은 자바스크립트 실행 최소화
   - 모바일 기기에서 특히 효과적
