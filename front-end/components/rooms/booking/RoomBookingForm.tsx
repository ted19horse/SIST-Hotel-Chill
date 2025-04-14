/**
 * 객실 예약 폼 컴포넌트
 * 
 * 객실 예약 정보를 입력받는 폼을 표시하는 컴포넌트입니다.
 * 서버 컴포넌트에서 객실 데이터를 가져와 클라이언트 컴포넌트로 전달합니다.
 */

import ClientComponentWrapper from '@/components/common/ClientComponentWrapper';
import { RoomDisplay } from '@/lib/types/room';
import RoomBookingFormContent from './RoomBookingFormContent';

interface RoomBookingFormProps {
  room: RoomDisplay;
  initialValues?: {
    checkIn?: Date;
    checkOut?: Date;
    adults?: number;
    children?: number;
  };
}

/**
 * 객실 예약 폼 컴포넌트
 * 
 * 객실 정보와 초기값을 받아 예약 폼을 표시합니다.
 * 서버 컴포넌트에서 클라이언트 컴포넌트로 데이터를 전달하는 래퍼입니다.
 * 
 * @param props 컴포넌트 속성
 * @returns JSX.Element
 */
export default function RoomBookingForm({ room, initialValues }: RoomBookingFormProps) {
  // 서버에서 필요한 추가 데이터를 가져올 수 있음
  // 백엔드 연결 후에는 실제 API 호출로 대체
  
  return (
    <ClientComponentWrapper>
      <RoomBookingFormContent 
        room={room} 
        initialValues={initialValues} 
      />
    </ClientComponentWrapper>
  );
}
