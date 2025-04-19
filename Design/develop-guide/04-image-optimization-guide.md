# Next.js 이미지 최적화 가이드

이 문서는 Next.js 애플리케이션에서 이미지를 최적화하는 방법에 대해 설명합니다. 이미지는 웹 페이지의 성능에 큰 영향을 미치는 요소 중 하나로, 적절한 최적화를 통해 로딩 시간을 단축하고 사용자 경험을 크게 향상시킬 수 있습니다.

## 목차

1. [이미지 최적화의 중요성](#이미지-최적화의-중요성)
2. [Next.js Image 컴포넌트](#nextjs-image-컴포넌트)
3. [이미지 크기 및 품질 최적화](#이미지-크기-및-품질-최적화)
4. [반응형 이미지](#반응형-이미지)
5. [이미지 우선순위 및 로딩 전략](#이미지-우선순위-및-로딩-전략)
6. [Next.js 이미지 구성 옵션](#nextjs-이미지-구성-옵션)
7. [이미지 최적화 유틸리티](#이미지-최적화-유틸리티)
8. [메모이제이션된 이미지 컴포넌트](#메모이제이션된-이미지-컴포넌트)
9. [Hotel Chill 프로젝트 적용 사례](#hotel-chill-프로젝트-적용-사례)

## 이미지 최적화의 중요성

이미지 최적화가 중요한 이유는 다음과 같습니다:

1. **페이지 로드 속도 향상**
   - 이미지는 일반적으로 웹페이지에서 가장 큰 리소스
   - 최적화된 이미지는 다운로드 시간 단축

2. **대역폭 사용량 감소**
   - 모바일 사용자의 데이터 사용량 감소
   - CDN 비용 절감

3. **Core Web Vitals 개선**
   - Largest Contentful Paint (LCP) 향상
   - Cumulative Layout Shift (CLS) 감소

4. **SEO 향상**
   - 페이지 속도는 검색 엔진 랭킹 요소
   - 모바일 친화적인 사이트에 가산점

## Next.js Image 컴포넌트

Next.js는 내장 `Image` 컴포넌트를 통해 이미지 최적화를 자동으로 처리합니다. 이 컴포넌트는 기본 HTML `<img>` 태그를 대체하며 다양한 최적화 기능을 제공합니다.

### 기본 사용법

```tsx
import Image from 'next/image';

export default function MyComponent() {
  return (
    <div>
      {/* 정적 이미지: 빌드 시 최적화 */}
      <Image
        src="/my-image.jpg"    // 정적 이미지 경로
        alt="My Image"
        width={500}            // 원본 이미지 너비(px)
        height={300}           // 원본 이미지 높이(px)
      />
      
      {/* 원격 이미지: 요청 시 최적화 */}
      <Image
        src="https://example.com/my-image.jpg"  // 원격 이미지 URL
        alt="Remote Image"
        width={500}
        height={300}
      />
    </div>
  );
}
```

### 부모 요소에 맞는 이미지 (fill 속성)

이미지 크기를 부모 요소에 맞추기 위해 `fill` 속성을 사용할 수 있습니다:

```tsx
<div className="relative w-full h-64">
  <Image
    src="/hero-image.jpg"
    alt="Hero Image"
    fill                         // 부모 요소에 맞게 채움
    className="object-cover"     // 컨테이너에 맞게 이미지 조정
  />
</div>
```

`fill` 사용 시 주의사항:
- 부모 요소는 반드시 `position: relative` 또는 `position: absolute` 스타일을 가져야 함
- `object-fit` CSS 속성을 사용하여 이미지 비율 조정 방식 지정 필요

## 이미지 크기 및 품질 최적화

### 자동 크기 조정

Next.js Image 컴포넌트는 다양한 디바이스와 화면 크기에 맞게 이미지 크기를 자동으로 조정합니다. 이는 필요한 크기보다 큰 이미지를 다운로드하는 것을 방지합니다.

### 이미지 품질 설정

`quality` 속성을 사용하여 이미지 품질을 조절할 수 있습니다 (1-100 범위, 기본값은 75):

```tsx
<Image
  src="/my-image.jpg"
  alt="My Image"
  width={500}
  height={300}
  quality={80}  // 이미지 품질 설정 (80%)
/>
```

### 이미지 포맷 최적화

Next.js는 자동으로 최신 이미지 포맷(WebP, AVIF 등)을 지원하는 브라우저에 최적화된 이미지를 제공합니다.

## 반응형 이미지

반응형 이미지는 디바이스 크기에 따라 적절한 크기의 이미지를 로드하도록 합니다.

### sizes 속성

`sizes` 속성을 사용하여 다양한 뷰포트 크기에 맞는 이미지 너비를 지정할 수 있습니다:

```tsx
<Image
  src="/responsive-image.jpg"
  alt="Responsive Image"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

위 예시에서:
- 모바일 화면(768px 이하): 이미지가 화면 너비의 100%
- 태블릿 화면(768px~1200px): 이미지가 화면 너비의 50%
- 데스크톱 화면(1200px 이상): 이미지가 화면 너비의 33%

### 자주 사용되는 sizes 값

```tsx
// 썸네일용
sizes="(max-width: 640px) 100vw, 300px"

// 중간 크기 이미지용
sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"

// 전체 너비 이미지용
sizes="100vw"
```

## 이미지 우선순위 및 로딩 전략

이미지 로딩 순서와 방식을 최적화하여 성능을 향상시킬 수 있습니다.

### 우선 로딩 (Priority)

페이지에서 가장 중요한 이미지(예: 히어로 이미지, LCP 이미지)에는 `priority` 속성을 사용하여 우선적으로 로드하도록 할 수 있습니다:

```tsx
<Image
  src="/hero-image.jpg"
  alt="Hero Image"
  width={1200}
  height={600}
  priority  // 우선 로딩 활성화
/>
```

`priority` 속성은 다음과 같은 최적화를 제공합니다:
- 이미지에 높은 사전 로드 우선순위 부여
- 레이지 로딩 비활성화
- 즉시 로드 시작

### 레이지 로딩 (Lazy Loading)

기본적으로 Next.js Image 컴포넌트는 레이지 로딩을 적용합니다. 뷰포트에 보이기 전에는 이미지가 로드되지 않습니다. 이 동작은 `loading` 속성으로 제어할 수 있습니다:

```tsx
<Image
  src="/below-fold-image.jpg"
  alt="Below Fold Image"
  width={800}
  height={600}
  loading="lazy"  // 기본값 - 뷰포트에 접근할 때 로드
/>

<Image
  src="/important-image.jpg"
  alt="Important Image"
  width={800}
  height={600}
  loading="eager"  // 페이지 로드 시 즉시 로드
/>
```

## Next.js 이미지 구성 옵션

`next.config.js` 파일에서 이미지 최적화 관련 설정을 구성할 수 있습니다:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 외부 도메인에서 이미지 로드 허용
    domains: ['example.com', 'cdn.example.com'],
    
    // 또는 더 세분화된 제어를 위한 remotePatterns 사용
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
      },
    ],
    
    // 이미지 최적화 서비스 설정 (선택 사항)
    loader: 'default',
    
    // 최신 이미지 포맷 활성화
    formats: ['image/avif', 'image/webp'],
    
    // 디바이스 크기 설정
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // 이미지 크기 설정
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // 최적화 이미지의 최대 너비 (기본값: 1920)
    minimumCacheTTL: 60, // 이미지 캐싱 시간(초)
  },
};

module.exports = nextConfig;
```

## 이미지 최적화 유틸리티

이미지 최적화 전략을 일관되게 적용하기 위해 유틸리티 함수를 만드는 것이 좋습니다.

### 이미지 유틸리티 타입 및 상수

```typescript
// lib/utils/image-utils.ts

// 이미지 우선순위 타입
export type ImagePriority = 'high' | 'medium' | 'low';

// 표준 이미지 크기 상수
export const IMAGE_SIZES = {
  THUMBNAIL: '(max-width: 640px) 100vw, 300px',
  MEDIUM: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px',
  LARGE: '(max-width: 1024px) 100vw, 1200px',
  FULL: '100vw',
};

// 이미지 품질 상수
export const IMAGE_QUALITY = {
  LOW: 60,
  MEDIUM: 75,
  HIGH: 85,
  PREMIUM: 95,
};
```

### 유틸리티 함수

```typescript
// 반응형 이미지 크기 문자열 생성
export function getResponsiveImageSizes(sizes: string | string[]): string {
  if (Array.isArray(sizes)) {
    return sizes.join(', ');
  }
  return sizes;
}

// 이미지 로딩 전략 결정
export function getImageLoadingStrategy(
  priority: ImagePriority, 
  index: number = 0
): 'eager' | 'lazy' {
  if (priority === 'high' || index === 0) {
    return 'eager';
  }
  return 'lazy';
}

// 이미지 품질 결정
export function getImageQualityByPriority(priority: ImagePriority): number {
  switch (priority) {
    case 'high':
      return IMAGE_QUALITY.HIGH;
    case 'medium':
      return IMAGE_QUALITY.MEDIUM;
    case 'low':
      return IMAGE_QUALITY.LOW;
    default:
      return IMAGE_QUALITY.MEDIUM;
  }
}
```

### 최적화된 이미지 컴포넌트 래퍼

이러한 유틸리티 함수를 사용하여 최적화된 이미지 컴포넌트 래퍼를 만들 수 있습니다:

```tsx
// components/common/OptimizedImage.tsx
'use client';

import Image, { ImageProps } from 'next/image';
import { 
  ImagePriority, 
  getImageLoadingStrategy, 
  getImageQualityByPriority, 
  IMAGE_SIZES 
} from '@/lib/utils/image-utils';

interface OptimizedImageProps extends Omit<ImageProps, 'loading' | 'quality'> {
  priority?: ImagePriority;
  index?: number;
}

export function OptimizedImage({
  priority = 'medium',
  index = 0,
  sizes = IMAGE_SIZES.MEDIUM,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      {...props}
      sizes={sizes}
      loading={getImageLoadingStrategy(priority, index)}
      quality={getImageQualityByPriority(priority)}
    />
  );
}
```

## 메모이제이션된 이미지 컴포넌트

이미지 컴포넌트를 메모이제이션하여 불필요한 리렌더링을 방지할 수 있습니다:

```tsx
// components/common/MemoizedImage.tsx
'use client';

import Image, { ImageProps } from 'next/image';
import { memo } from 'react';

const MemoizedImage = memo(function MemoizedImage(props: ImageProps) {
  return <Image {...props} />;
});

export default MemoizedImage;
```

### 사용 예시

```tsx
import MemoizedImage from '@/components/common/MemoizedImage';

// 캐러셀 슬라이드 컴포넌트
const Slide = memo(function Slide({
  slide,
  isActive,
}: {
  slide: SlideType;
  isActive: boolean;
}) {
  return (
    <div className={isActive ? 'opacity-100' : 'opacity-0'}>
      <MemoizedImage
        src={slide.image}
        alt={slide.title}
        fill
        priority={slide.id === 1}
        sizes="100vw"
        className="object-cover"
        quality={80}
      />
      {/* 슬라이드 콘텐츠 */}
    </div>
  );
});
```

## Hotel Chill 프로젝트 적용 사례

Hotel Chill 프로젝트에서는 다음과 같이 이미지 최적화를 적용했습니다.

### Next.js 설정 최적화

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... 다른 설정들
  images: {
    domains: ['localhost'], // 이미지 도메인 설정 (필요한 경우)
    formats: ['image/webp'], // WebP 포맷 활성화
  },
};

module.exports = nextConfig;
```

### 메인 캐러셀 이미지 최적화

기존 코드 (최적화 전):

```tsx
// components/common/home/MainCarousel.tsx
<div className={index === currentSlide ? 'opacity-100' : 'opacity-0'}>
  <Image
    src={slide.image || '/placeholder.svg'}
    alt={slide.title}
    fill
    priority
    className="object-cover"
  />
  {/* 콘텐츠 */}
</div>
```

최적화 후:

```tsx
// components/common/home/MainCarousel.tsx
import { memo } from 'react';

// 메모이제이션된 슬라이드 컴포넌트
const Slide = memo(function Slide({
  slide,
  isActive,
}: {
  slide: typeof slides[0];
  isActive: boolean;
}) {
  return (
    <div className={isActive ? 'opacity-100' : 'opacity-0'}>
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        priority={slide.id === 1} // 첫 번째 슬라이드만 우선 로드
        sizes="100vw" // 반응형 크기 설정
        className="object-cover"
        quality={80} // 이미지 품질 최적화
        loading={slide.id === 1 ? 'eager' : 'lazy'} // 로딩 전략
      />
      {/* 콘텐츠 */}
    </div>
  );
});
```

### 객실 이미지 최적화

```tsx
// components/rooms/RoomCard.tsx
<div className="relative aspect-[4/3] overflow-hidden rounded-lg">
  <Image
    src={room.imageUrl || '/placeholder.svg'}
    alt={room.name}
    fill
    sizes={IMAGE_SIZES.MEDIUM}
    className="object-cover transition-transform duration-500 group-hover:scale-105"
    loading="lazy" // 스크롤 시 로드
    quality={75} // 적절한 품질 설정
  />
</div>
```

### 성능 개선 결과

이미지 최적화 적용 후 다음과 같은 개선 효과를 얻었습니다:

1. **이미지 로딩 시간 단축**
   - WebP 포맷 사용으로 파일 크기 약 30% 감소
   - 적절한 크기의 이미지 제공으로 대역폭 사용 최적화

2. **레이아웃 이동 감소**
   - 이미지 크기가 미리 예약되어 CLS 감소
   - 메모이제이션으로 리렌더링 중 깜빡임 방지

3. **우선순위 지정**
   - 중요한 이미지(LCP)가 먼저 로드되어 인지된 성능 향상
   - 화면 밖 이미지는 필요할 때만 로드되어 초기 로드 시간 단축

4. **일관된 이미지 최적화 전략**
   - 유틸리티 함수를 통한 이미지 설정 표준화
   - 향후 확장 및 유지보수 용이성 향상
