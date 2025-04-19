/**
 * 이미지 최적화 유틸리티 함수 모음
 * 
 * 이 파일은 이미지 관련 최적화 유틸리티 함수를 제공합니다.
 */

/**
 * 이미지 로딩 우선순위 유형
 */
export type ImagePriority = 'high' | 'medium' | 'low';

/**
 * 이미지 부하 전략 유형
 */
export type ImageLoadingStrategy = 'eager' | 'lazy';

/**
 * 이미지 크기 상수
 */
export const IMAGE_SIZES = {
  THUMBNAIL: '(max-width: 640px) 100vw, 300px',
  MEDIUM: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px',
  LARGE: '(max-width: 1024px) 100vw, 1200px',
  FULL: '100vw',
};

/**
 * 이미지 품질 상수
 */
export const IMAGE_QUALITY = {
  LOW: 60,
  MEDIUM: 75,
  HIGH: 85,
  PREMIUM: 95,
};

/**
 * 반응형 이미지 크기 문자열 생성 함수
 * 
 * @param {string | string[]} sizes - 단일 크기 또는 크기 배열
 * @returns {string} 반응형 이미지 크기 문자열
 */
export function getResponsiveImageSizes(sizes: string | string[]): string {
  if (Array.isArray(sizes)) {
    return sizes.join(', ');
  }
  return sizes;
}

/**
 * 이미지 로딩 전략 결정 함수
 * 
 * @param {ImagePriority} priority - 이미지 우선순위
 * @param {number} index - 이미지 인덱스 (선택적)
 * @returns {ImageLoadingStrategy} 이미지 로딩 전략
 */
export function getImageLoadingStrategy(
  priority: ImagePriority, 
  index: number = 0
): ImageLoadingStrategy {
  if (priority === 'high' || index === 0) {
    return 'eager';
  }
  return 'lazy';
}

/**
 * 이미지 품질 결정 함수
 * 
 * @param {ImagePriority} priority - 이미지 우선순위
 * @returns {number} 이미지 품질 값
 */
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

/**
 * 이미지 URL을 WebP 포맷으로 변환 (가능한 경우)
 * 
 * @param {string} url - 원본 이미지 URL
 * @returns {string} WebP 포맷 URL 또는 원본 URL
 */
export function getOptimizedImageUrl(url: string): string {
  // 실제 구현에서는 이미지 처리 서비스 URL로 변환하거나
  // Next.js Image 컴포넌트가 자동 최적화하도록 원본 URL 반환
  return url;
}
