/**
 * 객실 예약 더미 데이터
 */
import { ReservationStatus, RoomReservation } from '@/types/my-account';

export const mockRoomReservations: RoomReservation[] = [
  // 예정된 예약
  {
    reservationId: 1,
    userId: 1,
    roomId: 101,
    roomType: 'Chill Serenity Room',
    roomNumber: 'A201',
    checkIn: '2025-04-20T15:00:00Z',
    checkOut: '2025-04-23T11:00:00Z',
    adults: 2,
    children: 0,
    status: ReservationStatus.CONFIRMED,
    totalAmount: 750000,
    reservationNumber: 'CH-123456',
    paymentMethodId: 1,
    isExpanded: false,
    guests: { adults: 2, children: 0 },
  },
  {
    reservationId: 2,
    userId: 1,
    roomId: 102,
    roomType: 'Chill Lake Suite',
    roomNumber: 'B301',
    checkIn: '2025-05-15T15:00:00Z',
    checkOut: '2025-05-18T11:00:00Z',
    adults: 2,
    children: 1,
    status: ReservationStatus.CONFIRMED,
    totalAmount: 1350000,
    reservationNumber: 'CH-123457',
    paymentMethodId: 1,
    isExpanded: false,
    guests: { adults: 2, children: 1 },
  },

  // 이용 완료된 예약
  {
    reservationId: 3,
    userId: 1,
    roomId: 103,
    roomType: 'Chill Garden Room',
    roomNumber: 'A105',
    checkIn: '2025-01-10T15:00:00Z',
    checkOut: '2025-01-13T11:00:00Z',
    adults: 1,
    children: 0,
    status: ReservationStatus.CHECKED_OUT,
    totalAmount: 450000,
    reservationNumber: 'CH-123458',
    paymentMethodId: 1,
    isExpanded: false,
    guests: { adults: 1, children: 0 },
  },
  {
    reservationId: 4,
    userId: 1,
    roomId: 104,
    roomType: 'Ultimate Chill Suite',
    roomNumber: 'C401',
    checkIn: '2024-12-24T15:00:00Z',
    checkOut: '2024-12-27T11:00:00Z',
    adults: 2,
    children: 2,
    status: ReservationStatus.CHECKED_OUT,
    totalAmount: 2100000,
    reservationNumber: 'CH-123459',
    paymentMethodId: 2,
    isExpanded: false,
    guests: { adults: 2, children: 2 },
  },
  {
    reservationId: 5,
    userId: 1,
    roomId: 105,
    roomType: 'Chill Serenity Room',
    roomNumber: 'A202',
    checkIn: '2024-10-05T15:00:00Z',
    checkOut: '2024-10-08T11:00:00Z',
    adults: 2,
    children: 0,
    status: ReservationStatus.CHECKED_OUT,
    totalAmount: 650000,
    reservationNumber: 'CH-123460',
    paymentMethodId: 1,
    isExpanded: false,
    guests: { adults: 2, children: 0 },
  },

  // 취소된 예약
  {
    reservationId: 6,
    userId: 1,
    roomId: 106,
    roomType: 'Chill Forest View Room',
    roomNumber: null,
    checkIn: '2024-11-15T15:00:00Z',
    checkOut: '2024-11-18T11:00:00Z',
    adults: 2,
    children: 1,
    status: ReservationStatus.CANCELLED,
    totalAmount: 780000,
    reservationNumber: 'CH-123461',
    paymentMethodId: 1,
    isExpanded: false,
    cancellationDate: '2024-11-01T10:15:00Z',
    cancellationReason: '일정 변경으로 인한 취소',
    guests: { adults: 2, children: 1 },
  },
];

// 현재 로그인한 사용자의 객실 예약 내역
export const currentUserReservations = mockRoomReservations;

// 예정된 예약만 필터링
export const upcomingReservations = mockRoomReservations.filter(
  (reservation) =>
    new Date(reservation.checkIn) > new Date() && reservation.status !== ReservationStatus.CANCELLED
);

// 이용 완료된 예약만 필터링
export const pastReservations = mockRoomReservations.filter(
  (reservation) =>
    new Date(reservation.checkOut) < new Date() &&
    reservation.status === ReservationStatus.CHECKED_OUT
);

// 취소된 예약만 필터링
export const cancelledReservations = mockRoomReservations.filter(
  (reservation) => reservation.status === ReservationStatus.CANCELLED
);
