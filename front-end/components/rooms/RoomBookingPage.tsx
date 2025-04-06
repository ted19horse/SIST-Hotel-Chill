import LoadingSpinner from '@/components/common/LoadingSpinner';
import { RoomDisplay } from '@/types/room';
import { Suspense } from 'react';
import RoomBookingPageContent from './RoomBookingPageContent';

interface RoomBookingPageProps {
  initialRooms?: RoomDisplay[];
}

export default function RoomBookingPage({ initialRooms }: RoomBookingPageProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RoomBookingPageContent initialRooms={initialRooms} />
    </Suspense>
  );
}
