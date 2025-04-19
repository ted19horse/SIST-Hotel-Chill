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
