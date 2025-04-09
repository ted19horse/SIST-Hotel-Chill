/**
 * 객실 상세 정보 컴포넌트
 * 
 * 특정 객실의 상세 정보를 표시하는 컴포넌트입니다.
 * 서버 컴포넌트에서 객실 데이터를 가져와 클라이언트 컴포넌트로 전달합니다.
 */

import ClientComponentWrapper from '@/components/common/ClientComponentWrapper';
import { getRoomById } from '@/data/rooms';
import RoomDetailContent from './RoomDetailContent';

interface RoomDetailProps {
  roomId: string;
}

/**
 * 객실 상세 정보 컴포넌트
 * 
 * 객실 ID를 통해 객실 정보를 가져와 상세 내용을 표시합니다.
 * 서버 컴포넌트에서 데이터를 가져와 클라이언트 컴포넌트로 전달하는 래퍼입니다.
 * 
 * @param props 컴포넌트 속성
 * @returns JSX.Element
 */
export default function RoomDetail({ roomId }: RoomDetailProps) {
  // 객실 데이터 가져오기
  const room = getRoomById(roomId);
  
  if (!room) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-red-600">객실 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }
  
  return (
    <ClientComponentWrapper>
      <RoomDetailContent room={room} />
    </ClientComponentWrapper>
  );
}
