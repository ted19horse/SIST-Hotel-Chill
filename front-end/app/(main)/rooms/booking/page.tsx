import BookingForm from '@/components/common/forms/BookingForm';
import { rooms } from '@/data/rooms/types/rooms';

interface BookingPageProps {
  searchParams: {
    roomId?: string;
  };
}

export default function BookingPage({ searchParams }: BookingPageProps) {
  const selectedRoom = searchParams.roomId
    ? rooms.find((room) => room.id === searchParams.roomId)
    : null;

  const defaultGuests = {
    adults: 2,
    children: 0,
    infants: 0,
  };

  const defaultDates = {
    checkIn: null,
    checkOut: null,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">객실 예약</h1>
        <BookingForm
          selectedRoom={selectedRoom}
          bookingDates={defaultDates}
          guests={defaultGuests}
        />
      </div>
    </div>
  );
}
