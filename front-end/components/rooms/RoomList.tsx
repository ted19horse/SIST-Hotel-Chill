/**
 * 객실 목록 컴포넌트
 * 
 * 표시할 객실 목록을 받아 그리드 형태로 보여주는 컴포넌트입니다.
 * 서버 컴포넌트에서 클라이언트 컴포넌트로 데이터를 전달하는 중간 컴포넌트입니다.
 */

import ClientComponentWrapper from '@/components/common/ClientComponentWrapper';
import RoomListContent from './RoomListContent';
import { getRooms } from '@/lib/data/rooms';

/**
 * 객실 목록 컴포넌트
 * 
 * 페이지에서 직접 사용하는 컴포넌트로, 객실 데이터를 가져와
 * 클라이언트 컴포넌트로 전달합니다.
 * 
 * @param props 컴포넌트 속성
 * @returns JSX.Element
 */
export default function RoomList() {  
  return (
    <ClientComponentWrapper>
      <RoomListContent />
    </ClientComponentWrapper>
  );
}