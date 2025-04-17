/**
 * Next.js 설정 파일 (ES Module)
 * 각 옵션별 상세 설명 포함
 */

const nextConfig = {
  // React의 엄격 모드 활성화 (개발 중 잠재적 문제 탐지)
  reactStrictMode: true,

  // 환경 변수 설정 (프론트엔드에서 process.env로 접근 가능)
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api', // API 기본 경로
    NEXT_PUBLIC_USE_MOCK: process.env.NEXT_PUBLIC_USE_MOCK || 'true', // 목(mock) 데이터 사용 여부
  },

  // 프로덕션 환경에서 소스맵 생성 (배포 후 디버깅에 도움)
  productionBrowserSourceMaps: true,

  // ESLint 설정 (빌드 중 오류 무시)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 이미지 최적화 및 도메인/패턴 설정
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }, // 모든 https 이미지 허용
      { protocol: 'https', hostname: 'via.placeholder.com' }, // placeholder 이미지 허용
      { protocol: 'https', hostname: 'picsum.photos' }, // 랜덤 이미지 허용
    ],
    unoptimized: true, // Next.js 이미지 최적화 사용하지 않음 (직접 CDN 등 활용 시)
    dangerouslyAllowSVG: true, // SVG 파일 허용 (보안에 주의 필요)
    contentDispositionType: 'attachment', // 이미지 다운로드 시 Content-Disposition 헤더 설정
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // 이미지에 대한 CSP 설정
    domains: ['localhost', 'via.placeholder.com', 'picsum.photos'], // 허용할 이미지 도메인 목록 (remotePatterns와 중복 가능)
  },

  // 실험적(Experimental) 기능 활성화 (빌드 성능 개선)
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },

  // Webpack 커스텀 설정 (개발 환경에서 소스맵 활성화)
  webpack: (config, { dev, isServer }) => {
    // 개발 환경 + 클라이언트 사이드에서만 소스맵 설정
    if (dev && !isServer) {
      config.devtool = 'source-map';
    }
    return config;
  },

  // API 요청을 백엔드로 리라이트하는 설정
  async rewrites() {
    return [
      // 객실 관련 API
      {
        source: '/api/rooms/:path*',
        destination: 'http://localhost:8080/api/rooms/:path*',
      },
      // 다이닝 관련 API
      {
        source: '/api/dining/:path*',
        destination: 'http://localhost:8080/api/dining/:path*',
      },
      // 시설 관련 API
      {
        source: '/api/facilities/:path*',
        destination: 'http://localhost:8080/api/facilities/:path*',
      },
      // 기프트샵 관련 API
      {
        source: '/api/gift-shop/:path*',
        destination: 'http://localhost:8080/api/gift-shop/:path*',
      },
      // 멤버십 관련 API
      {
        source: '/api/membership/:path*',
        destination: 'http://localhost:8080/api/membership/:path*',
      },
      // 사용자 계정 관련 API
      {
        source: '/api/my-account/:path*',
        destination: 'http://localhost:8080/api/my-account/:path*',
      },
      // 인증 관련 API
      {
        source: '/api/auth/:path*',
        destination: 'http://localhost:8080/api/auth/:path*',
      },
      // 예약 관련 API
      {
        source: '/api/reservations/:path*',
        destination: 'http://localhost:8080/api/reservations/:path*',
      },
      // 기타 모든 API 요청
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
    ];
  },
};

export default nextConfig;
