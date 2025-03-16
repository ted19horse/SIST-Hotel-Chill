/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    unoptimized: true
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true
  },
  // API 요청을 백엔드로 리라이트하는 설정
  async rewrites() {
    return [
      // 객실 관련 API
      {
        source: '/api/rooms/:path*',
        destination: 'http://localhost:8080/api/rooms/:path*'
      },
      // 다이닝 관련 API
      {
        source: '/api/dining/:path*',
        destination: 'http://localhost:8080/api/dining/:path*'
      },
      // 시설 관련 API
      {
        source: '/api/facilities/:path*',
        destination: 'http://localhost:8080/api/facilities/:path*'
      },
      // 기프트샵 관련 API
      {
        source: '/api/gift-shop/:path*',
        destination: 'http://localhost:8080/api/gift-shop/:path*'
      },
      // 멤버십 관련 API
      {
        source: '/api/membership/:path*',
        destination: 'http://localhost:8080/api/membership/:path*'
      },
      // 사용자 계정 관련 API
      {
        source: '/api/my-account/:path*',
        destination: 'http://localhost:8080/api/my-account/:path*'
      },
      // 인증 관련 API
      {
        source: '/api/auth/:path*',
        destination: 'http://localhost:8080/api/auth/:path*'
      },
      // 예약 관련 API
      {
        source: '/api/reservations/:path*',
        destination: 'http://localhost:8080/api/reservations/:path*'
      },
      // 기타 모든 API 요청
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*'
      }
    ];
  }
};

export default nextConfig;
