/**
 * Placehold.co 서비스를 사용하여 더미 이미지 URL을 생성합니다.
 *
 * @param width 이미지 너비 (픽셀)
 * @param height 이미지 높이 (픽셀)
 * @param bgColor 배경색 (hex 코드, # 제외)
 * @param textColor 텍스트 색상 (hex 코드, # 제외)
 * @param text 이미지에 표시할 텍스트
 * @returns 생성된 이미지 URL
 */
export function getPlaceholderImage(
  width: number = 600,
  height: number = 400,
  bgColor: string = 'f5f5f5',
  textColor: string = '333333',
  text: string = 'Image Placeholder'
): string {
  // URL 인코딩하여 안전하게 처리
  const encodedText = encodeURIComponent(text);
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodedText}`;
}

/**
 * 멤버십 등급별 테마 색상을 기반으로 플레이스홀더 이미지를 생성합니다.
 *
 * @param tier 멤버십 등급 ('CHILL_BREEZE', 'CHILL_FLOW', 'DEEP_CHILL')
 * @param width 이미지 너비 (픽셀)
 * @param height 이미지 높이 (픽셀)
 * @param text 이미지에 표시할 텍스트
 * @returns 생성된 이미지 URL
 */
export function getMembershipTierImage(
  tier: 'CHILL_BREEZE' | 'CHILL_FLOW' | 'DEEP_CHILL',
  width: number = 600,
  height: number = 400,
  text: string = ''
): string {
  let bgColor = 'e3f2fd';
  let textColor = '1565c0';
  let defaultText = 'Chill Breeze';

  if (tier === 'CHILL_FLOW') {
    bgColor = 'e0f2f1';
    textColor = '00695c';
    defaultText = 'Chill Flow';
  } else if (tier === 'DEEP_CHILL') {
    bgColor = 'f3e5f5';
    textColor = '6a1b9a';
    defaultText = 'Deep Chill';
  }

  const displayText = text || defaultText;
  return getPlaceholderImage(width, height, bgColor, textColor, displayText);
}

/**
 * 사용자 아바타 이미지를 생성합니다.
 *
 * @param name 사용자 이름 (이니셜로 변환됨)
 * @param size 이미지 크기 (픽셀)
 * @param bgColor 배경색 (hex 코드, # 제외)
 * @param textColor 텍스트 색상 (hex 코드, # 제외)
 * @returns 생성된 아바타 이미지 URL
 */
export function getUserAvatarImage(
  name: string,
  size: number = 100,
  bgColor?: string,
  textColor: string = 'ffffff'
): string {
  // 이름에서 이니셜 추출 (영문 기준)
  const initials = name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);

  // 이름을 기반으로 일관된 색상 생성 (배경색 지정 안된 경우)
  if (!bgColor) {
    const colors = ['1976d2', '0097a7', '388e3c', 'fbc02d', 'e64a19', '7b1fa2', 'd32f2f'];
    const nameHash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    bgColor = colors[nameHash % colors.length];
  }

  return getPlaceholderImage(size, size, bgColor, textColor, initials);
}
