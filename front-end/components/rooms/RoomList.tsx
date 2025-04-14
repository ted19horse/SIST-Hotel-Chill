/**
 * 객실 목록 컴포넌트
 * 
 * 표시할 객실 목록을 받아 그리드 형태로 보여주는 컴포넌트입니다.
 * 서버 컴포넌트에서 클라이언트 컴포넌트로 데이터를 전달하는 중간 컴포넌트입니다.
 */

import ClientComponentWrapper from '@/components/common/ClientComponentWrapper';
import { RoomDisplay } from '@/lib/types/room';
import RoomListContent from './RoomListContent';
import { getRooms } from '@/lib/data/rooms';

interface RoomListProps {
  rooms?: RoomDisplay[];
  isLoading?: boolean;
  error?: string;
}

/**
 * 객실 목록 컴포넌트
 * 
 * 페이지에서 직접 사용하는 컴포넌트로, 객실 데이터를 가져와
 * 클라이언트 컴포넌트로 전달합니다.
 * 
 * @param props 컴포넌트 속성
 * @returns JSX.Element
 */
export default function RoomList({ rooms, isLoading, error }: RoomListProps) {
  // props로 받지 않았을 경우 데이터 직접 로드
  // 백엔드 연결 후에는 fetch API 호출로 대체
  const roomsData = rooms || getRooms();
  
  return (
    <ClientComponentWrapper>
      <RoomListContent 
        rooms={roomsData} 
        isLoading={isLoading} 
        error={error} 
      />
    </ClientComponentWrapper>
  );
}
