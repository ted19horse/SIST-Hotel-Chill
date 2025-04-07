/**
 * 텍스트 내의 검색어를 하이라이트 처리하는 함수
 * @param text 원본 텍스트
 * @param searchTerm 검색어
 * @returns 하이라이트된 HTML 문자열
 */
export function highlightMatches(text: string, searchTerm: string): string {
  if (!text || !searchTerm || searchTerm.trim() === '') {
    return text;
  }

  try {
    // 검색어를 안전하게 처리
    const sanitizedSearchTerm = searchTerm.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // 대소문자 구분 없이 검색어 패턴 생성
    const pattern = new RegExp(`(${sanitizedSearchTerm})`, 'gi');

    // 검색어에 해당하는 부분에 하이라이트 적용
    return text.replace(pattern, '<span class="bg-yellow-200 text-neutral-900">$1</span>');
  } catch (error) {
    // 정규식 오류가 발생하는 경우 원본 텍스트 반환
    console.error('하이라이트 처리 중 오류 발생:', error);
    return text;
  }
}
