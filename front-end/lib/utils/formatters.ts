import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 개장 시간을 포맷팅하는 함수
 * @param openingHours 개장 시간 객체 또는 배열
 * @returns 포맷팅된 개장 시간 문자열
 */
export function formatOpeningHours(openingHours: any): string {
  if (!openingHours) return '정보 없음';

  // 배열 형태인 경우 (새로운 형식)
  if (Array.isArray(openingHours)) {
    // 영업일 문자열 생성
    const daysOfWeek = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
    const openDays = openingHours.filter((h) => !h.isClosed).map((h) => h.dayOfWeek);

    // 모든 요일이 영업일인 경우
    if (openDays.length === 7) {
      // 첫 번째 항목의 시간을 사용
      const { open, close } = openingHours[0];
      return `매일 ${formatTime(open)} - ${formatTime(close)}`;
    }

    // 일부 요일만 영업하는 경우
    if (openDays.length > 0) {
      // 첫 번째 영업일의 시간을 사용
      const firstOpenDay = openingHours.find((h) => !h.isClosed);
      if (firstOpenDay) {
        return `${openDays.join(', ')} ${formatTime(firstOpenDay.open)} - ${formatTime(
          firstOpenDay.close
        )}`;
      }
    }

    return '정보 없음';
  }

  // 객체 형태인 경우 (이전 형식)
  const { open, close, days } = openingHours;

  // days가 없거나 배열이 아닌 경우 예외 처리
  if (!days || !Array.isArray(days)) {
    return `${formatTime(open)} - ${formatTime(close)}`;
  }

  // 영업일 표시 (연속된 요일 처리)
  let daysString = '';
  if (days.length === 7) {
    daysString = '매일';
  } else {
    daysString = days.join(', ');
  }

  // 시간 포맷팅
  const formattedOpen = formatTime(open);
  const formattedClose = formatTime(close);

  return `${daysString} ${formattedOpen} - ${formattedClose}`;
}

/**
 * 시간 문자열(HH:MM)을 포맷팅하는 함수
 * @param timeStr 시간 문자열 (예: '14:30')
 * @returns 포맷팅된 시간 문자열 (예: '오후 2:30')
 */
export function formatTime(timeStr: string): string {
  if (!timeStr) return '';

  const [hours, minutes] = timeStr.split(':').map(Number);
  const period = hours >= 12 ? '오후' : '오전';
  const hour12 = hours % 12 || 12;

  return `${period} ${hour12}:${minutes.toString().padStart(2, '0')}`;
}

/**
 * 날짜를 한국어 형식으로 포맷팅하는 함수
 * @param date 날짜 객체
 * @param formatStr 포맷 문자열
 * @returns 포맷팅된 날짜 문자열
 */
export function formatDateKorean(date: Date, formatStr: string = 'PPP'): string {
  return format(date, formatStr, { locale: ko });
}

/**
 * 날짜 범위를 한국어 형식으로 포맷팅하는 함수
 * @param startDate 시작 날짜
 * @param endDate 종료 날짜
 * @returns 포맷팅된 날짜 범위 문자열
 */
export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  // 같은 해인 경우 연도 한 번만 표시
  if (startYear === endYear) {
    return `${format(start, 'yyyy년 M월 d일', { locale: ko })} - ${format(end, 'M월 d일', {
      locale: ko,
    })}`;
  }

  return `${format(start, 'yyyy년 M월 d일', { locale: ko })} - ${format(end, 'yyyy년 M월 d일', {
    locale: ko,
  })}`;
}

/**
 * 가격을 한국어 형식으로 포맷팅하는 함수
 * @param price 가격
 * @returns 포맷팅된 가격 문자열
 */
export function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR') + '원';
}

/**
 * 현재로부터 지난 시간을 포맷팅하는 함수
 * @param date 날짜 객체
 * @returns 포맷팅된 지난 시간 문자열
 */
export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}개월 전`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}년 전`;
}
