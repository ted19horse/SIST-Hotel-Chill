'use client';

import BookingForm from '@/components/common/forms/BookingForm';
import Header from '@/components/common/layout/Header';
import RoomDetailModal from '@/components/rooms/RoomDetailModal';
import RoomFilters from '@/components/rooms/RoomFilters';
import RoomList from '@/components/rooms/RoomList';
import { useRoomFilterStore } from '@/lib/stores/roomFilterStore';
import { Room, RoomAvailability, RoomFilters as RoomFiltersType } from '@/types/room';
import { useEffect, useState } from 'react';

interface RoomBookingPageContentProps {
  rooms: Room[];
  availability: RoomAvailability;
  initialFilters: RoomFiltersType;
}

export default function RoomBookingPageContent({
  rooms,
  availability,
  initialFilters,
}: RoomBookingPageContentProps) {
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(rooms);
  const filters = useRoomFilterStore((state) => state.filters);

  const [bookingDates, setBookingDates] = useState({
    checkIn: null as Date | null,
    checkOut: null as Date | null,
  });
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    infants: 0,
  });
  const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    let filtered = [...rooms];

    if (filters.checkIn && filters.checkOut) {
      setBookingDates({
        checkIn: filters.checkIn,
        checkOut: filters.checkOut,
      });
    }

    if (filters.guests) {
      setGuests({
        adults: filters.guests,
        children: 0,
        infants: 0,
      });

      filtered = filtered.filter((room) => filters.guests <= room.capacity.total);
    }

    if (filters.roomType && filters.roomType.length > 0) {
      setSelectedRoomType(filters.roomType[0]);
      filtered = filtered.filter((room) => filters.roomType.includes(room.type.toLowerCase()));
    } else {
      setSelectedRoomType(null);
    }

    setFilteredRooms(filtered);
  }, [filters, rooms]);

  const handleViewDetails = (room: Room) => {
    setSelectedRoom(room);
    setIsDetailModalOpen(true);
  };

  const handleBookNow = (room: Room) => {
    setSelectedRoom(room);
    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4">
            최상의 휴식을 선사하는 객실
          </h1>
          <p className="text-neutral-600">
            칠 헤이븐 리조트 & 스파의 모든 객실은 진정한 휴식을 위해 세심하게 디자인되었습니다. 자연
            소재부터 편안한 색감까지, 모든 요소가 여러분의 휴식과 재충전을 위해 준비되어 있습니다.
          </p>
        </section>

        <section className="my-12">
          <RoomFilters />
          <RoomList
            rooms={filteredRooms}
            onViewDetails={handleViewDetails}
            onBookNow={handleBookNow}
          />
        </section>

        <section id="booking-form" className="my-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-teal-800 mb-6">객실 예약하기</h2>
          <BookingForm selectedRoom={selectedRoom} bookingDates={bookingDates} guests={guests} />
        </section>
      </main>

      {isDetailModalOpen && selectedRoom && (
        <RoomDetailModal room={selectedRoom} onClose={closeDetailModal} onBookNow={handleBookNow} />
      )}
    </div>
  );
}
