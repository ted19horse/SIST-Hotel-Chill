# Next.js 설정 최적화 가이드

이 문서는 Next.js 애플리케이션의 설정을 최적화하여 성능을 향상시키는 방법에 대해 설명합니다. 적절한 설정을 통해 빌드 시간, 번들 크기, 런타임 성능을 개선할 수 있습니다.

## 목차

1. [next.config.js 최적화](#nextconfigjs-최적화)
2. [웹 폰트 최적화](#웹-폰트-최적화)
3. [메타데이터 최적화](#메타데이터-최적화)
4. [환경 변수 및 빌드 설정](#환경-변수-및-빌드-설정)
5. [번들 분석 및 모니터링](#번들-분석-및-모니터링)
6. [Hotel Chill 프로젝트 적용 사례](#hotel-chill-프로젝트-적용-사례)

## next.config.js 최적화

`next.config.js` 파일은 Next.js 애플리케이션의 동작과 빌드 과정을 구성하는 중요한 파일입니다. 다양한 옵션을 설정하여 성능을 최적화할 수 있습니다.

### 기본 최적화 설정

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // X-Powered-By 헤더 제거 (보안 및 성능상 이점)
  poweredByHeader: false,
  
  // React 개발 모드에서의 엄격 검사 활성화
  reactStrictMode: true,
  
  // SWC 미니파이어 사용 (Terser보다 빠름)
  swcMinify: true,
  
  // 프로덕션 환경에서 콘솔 로그 제거
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // 이미지 최적화 설정
  images: {
    domains: ['example.com'], // 이미지 호스트 허용 목록
    formats: ['image/avif', 'image/webp'], // 최신 이미지 포맷 활성화
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // 반응형 이미지 크기
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // 이미지 크기 설정
  },
  
  // 실험적 기능 활성화
  experimental: {
    optimizeCss: true, // CSS 최적화
  },
};

module.exports = nextConfig;
```

### 고급 설정 옵션

#### 1. 웹팩 구성 커스터마이징

```javascript
const nextConfig = {
  webpack: (config, { isServer, dev }) => {
    // 프로덕션 빌드에서만 적용되는 최적화
    if (!dev) {
      // 특정 라이브러리를 외부화하여 번들 크기 축소
      config.externals.push({
        'some-large-library': 'SomeLargeLibrary',
      });
      
      // 특정 플러그인 추가
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/,
        })
      );
    }
    
    // 서버와 클라이언트에 대한 개별 구성
    if (isServer) {
      // 서버 측 구성
    } else {
      // 클라이언트 측 구성
    }
    
    return config;
  },
};
```

#### 2. 번들 분석기 추가

```javascript
const nextConfig = {
  // 다른 설정들...
};

// 번들 분석기 활성화 (환경변수로 제어)
if (process.env.ANALYZE) {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
  module.exports = withBundleAnalyzer(nextConfig);
} else {
  module.exports = nextConfig;
}
```

#### 3. 국제화(i18n) 설정

다국어 지원이 필요한 경우, 성능을 최적화하면서 설정할 수 있습니다:

```javascript
const nextConfig = {
  i18n: {
    // 지원하는 언어 목록
    locales: ['ko', 'en', 'ja'],
    // 기본 언어
    defaultLocale: 'ko',
    // 언어 자동 감지 비활성화 (성능 향상)
    localeDetection: false,
    // 도메인별 언어 설정 (선택 사항)
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'ko',
      },
      {
        domain: 'example.com/en',
        defaultLocale: 'en',
      },
    ],
  },
};
```

## 웹 폰트 최적화

웹 폰트는 웹사이트의 로딩 성능과 CLS(Cumulative Layout Shift)에 큰 영향을 미칩니다. Next.js에서는 `next/font` 모듈을 사용하여 웹 폰트를 최적화할 수 있습니다.

### Google Fonts 최적화

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

// 웹 폰트 최적화 설정
const inter = Inter({
  subsets: ['latin'], // 필요한 문자 집합만 포함
  display: 'swap', // 폰트 로드 중에도 텍스트 표시 (FOUT 방지)
  preload: true, // 미리 로드
  weight: ['400', '500', '600', '700'], // 필요한 가중치만 지정
  fallback: ['system-ui', 'sans-serif'], // 폴백 폰트 지정
  adjustFontFallback: true, // 폰트 폴백 자동 조정
  variable: '--font-inter', // CSS 변수로 사용
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

### 로컬 폰트 최적화

```tsx
// app/layout.tsx
import localFont from 'next/font/local';

// 로컬 폰트 설정
const myFont = localFont({
  src: [
    {
      path: '../fonts/MyFont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/MyFont-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: true,
  variable: '--font-myfont',
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={myFont.variable}>
      <body className="font-myfont">{children}</body>
    </html>
  );
}
```

### CSS 변수를 사용한 폰트 적용

```tsx
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        custom: ['var(--font-myfont)'],
      },
    },
  },
};
```

## 메타데이터 최적화

메타데이터는 SEO와 사용자 경험에 중요한 역할을 합니다. Next.js 13 이상에서는 내장된 메타데이터 API를 사용하여 최적화된 메타데이터를 설정할 수 있습니다.

### 정적 메타데이터

```tsx
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Chill Haven Resort & Spa',
    template: '%s | Chill Haven Resort & Spa',
  },
  description: 'Your ultimate healing retreat in nature, offering premium accommodation, dining, and spa services.',
  keywords: ['resort', 'spa', 'hotel', 'accommodation', 'luxury', 'retreat'],
  authors: [{ name: 'SIST Hotel Chill Team' }],
  creator: 'SIST Hotel Chill Team',
  publisher: 'Chill Haven Resort & Spa',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Chill Haven Resort & Spa',
    description: 'Your ultimate healing retreat',
    url: 'https://chilhaven.com',
    siteName: 'Chill Haven Resort & Spa',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Chill Haven Resort & Spa',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chill Haven Resort & Spa',
    description: 'Your ultimate healing retreat',
    images: ['/twitter-image.jpg'],
  },
};
```

### 동적 메타데이터

```tsx
// app/rooms/[id]/page.tsx
import type { Metadata } from 'next';

// 동적 메타데이터 생성
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const room = await getRoomById(params.id);
  
  return {
    title: room.name,
    description: room.description,
    openGraph: {
      title: room.name,
      description: room.description,
      images: [
        {
          url: room.imageUrl,
          width: 1200,
          height: 630,
          alt: room.name,
        },
      ],
    },
  };
}

export default async function RoomPage({ params }: { params: { id: string } }) {
  // ...
}
```

### 뷰포트 설정

모바일 기기에서의 최적화된 표시를 위한 뷰포트 설정:

```tsx
// app/layout.tsx
import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ffffff',
  colorScheme: 'light dark',
};
```

## 환경 변수 및 빌드 설정

환경 변수와 빌드 설정을 최적화하여 개발 및 프로덕션 환경을 효율적으로 관리할 수 있습니다.

### 환경 변수 설정

Next.js는 `.env` 파일을 통해 다양한 환경 변수를 관리할 수 있습니다:

```bash
# .env (모든 환경)
# .env.development (개발 환경만)
# .env.production (프로덕션 환경만)
# .env.local (로컬 환경 우선)

# 서버 측에서만 접근 가능한 환경 변수
DATABASE_URL=postgres://user:password@localhost:5432/mydb

# 클라이언트 측에서도 접근 가능한 환경 변수 (NEXT_PUBLIC 접두어 필요)
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ANALYTICS_ID=UA-XXXXXXXX-X
```

환경 변수 사용:

```tsx
// 서버 컴포넌트
export async function getServerSideProps() {
  // 서버 측 환경 변수 접근
  const dbUrl = process.env.DATABASE_URL;
  // ...
}

// 클라이언트 컴포넌트
export default function Analytics() {
  // 클라이언트 측 환경 변수 접근 (NEXT_PUBLIC 접두어 필요)
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  // ...
}
```

### 빌드 스크립트 최적화

```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "analyze": "ANALYZE=true next build",
    "build:production": "NODE_ENV=production next build",
    "test": "jest",
    "test:watch": "jest --watch",
    "cypress": "cypress open",
    "cypress:headless": "cypress run"
  }
}
```

## 번들 분석 및 모니터링

웹 애플리케이션의 성능을 지속적으로 모니터링하고 분석하는 것이 중요합니다.

### 번들 분석기 설정

```bash
# 설치
npm install --save-dev @next/bundle-analyzer

# 사용
npm run analyze
```

파일 설정:

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // 기타 Next.js 설정...
});
```

### 런타임 성능 측정

Next.js에서 제공하는 내장 성능 측정 도구:

```bash
# 프로덕션 빌드 및 실행
npm run build && npm run start
```

그런 다음 `http://localhost:3000/analytics` 접속하여 성능 데이터 확인

### 외부 모니터링 도구 통합

```typescript
// pages/_app.tsx
import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  // Google Analytics 페이지뷰 추적
  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
      });
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  
  return (
    <>
      {/* Google Analytics 스크립트 */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      
      <Component {...pageProps} />
    </>
  );
}
```

## Hotel Chill 프로젝트 적용 사례

Hotel Chill 프로젝트에서는 다음과 같이 Next.js 설정 최적화를 적용했습니다.

### next.config.js 최적화

기존의 `next.config.js` 파일이 없었으므로, 최적화된 구성 파일을 새로 생성했습니다:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true, // SWC 미니파이어 사용
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // 프로덕션 환경에서 콘솔 로그 제거
  },
  images: {
    domains: ['localhost'], // 이미지 도메인 설정 (필요한 경우 추가)
    formats: ['image/webp'], // WebP 포맷 활성화
  },
  experimental: {
    optimizeCss: true, // CSS 최적화
  },
};

// Webpack 번들 분석기 활성화 (필요 시 사용)
if (process.env.ANALYZE) {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
  module.exports = withBundleAnalyzer(nextConfig);
} else {
  module.exports = nextConfig;
}
```

### 웹 폰트 최적화

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

// 웹 폰트 최적화
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // 폰트 로드 중 텍스트 표시 최적화
  preload: true,
  // 필요한 가중치만 지정하여 폰트 파일 크기 최적화
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Chill Haven Resort & Spa',
  description: 'Your ultimate healing retreat in nature...',
  // 추가 메타데이터...
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
```

### package.json 최적화

package.json에 성능 분석 도구를 추가하고 스크립트를 최적화했습니다:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "analyze": "ANALYZE=true next build",
    "test": "jest",
    "test:watch": "jest --watch",
    "cypress": "cypress open",
    "cypress:headless": "cypress run"
  },
  "devDependencies": {
    "@next/bundle-analyzer": "^14.2.24",
    // 기타 개발 의존성...
  }
}
```

### 성능 개선 결과

Next.js 설정 최적화를 통해 다음과 같은 개선 효과를 얻었습니다:

1. **빌드 시간 단축**
   - SWC 미니파이어 사용으로 빌드 속도 향상
   - 불필요한 콘솔 로그 제거로 번들 크기 감소

2. **로드 시간 개선**
   - 최적화된 이미지 포맷 사용으로 이미지 로딩 속도 향상
   - 웹 폰트 최적화로 CLS(Cumulative Layout Shift) 감소

3. **개발 경험 개선**
   - 번들 분석 도구를 통한 성능 병목 식별 용이
   - 스크립트 최적화로 개발 워크플로우 개선

4. **향후 확장성 향상**
   - 구조화된 설정으로 추가 최적화 용이
   - 모니터링 도구 통합으로 지속적인 성능 관리 가능

[이전 문서: 컴포넌트 최적화 고급 가이드](./05-2-component-optimization-advanced.md)
