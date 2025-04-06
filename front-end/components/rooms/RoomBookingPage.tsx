import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Room, RoomAvailability, RoomFilters } from '@/types/room';
import { Suspense } from 'react';
import RoomBookingPageContent from './RoomBookingPageContent';

interface RoomBookingPageProps {
  rooms: Room[];
  availability: RoomAvailability;
  initialFilters: RoomFilters;
}

export default function RoomBookingPage({
  rooms,
  availability,
  initialFilters,
}: RoomBookingPageProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RoomBookingPageContent
        rooms={rooms}
        availability={availability}
        initialFilters={initialFilters}
      />
    </Suspense>
  );
}
