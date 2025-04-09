/**
 * 객실 필터 컴포넌트
 * 
 * 객실 검색을 위한 필터 옵션을 제공하는 컴포넌트입니다.
 * 날짜, 인원, 객실 등급, 가격, 전망 등으로 필터링할 수 있습니다.
 */

import ClientComponentWrapper from '@/components/common/ClientComponentWrapper';
import RoomFiltersContent from './RoomFiltersContent';

/**
 * 객실 필터 컴포넌트
 * 
 * 서버 컴포넌트에서 클라이언트 컴포넌트로 연결하는 래퍼 컴포넌트입니다.
 * 
 * @returns JSX.Element
 */
export default function RoomFilters() {
  // 서버에서 초기 필터 옵션 데이터를 가져올 수 있음
  // 백엔드 연결 후에는 실제 API 호출로 대체
  
  return (
    <ClientComponentWrapper>
      <RoomFiltersContent />
    </ClientComponentWrapper>
  );
}
