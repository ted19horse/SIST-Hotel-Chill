/**
 * 숫자를 천 단위로 구분하여 포맷팅합니다.
 * @param value 포맷팅할 숫자
 * @returns 포맷팅된 문자열
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('ko-KR').format(value);
};
