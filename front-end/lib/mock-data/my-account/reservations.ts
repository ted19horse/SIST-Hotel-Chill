import { DiningReservation, RoomReservation } from '@/types/my-account';

/**
 * 객실 예약 더미데이터
 */
export const roomReservations: RoomReservation[] = [
  // 예정된 예약
  {
    reservationId: 1001,
    userId: 1,
    roomId: 101,
    roomType: 'Chill Serenity Room',
    roomNumber: 'A201',
    checkIn: '2025-04-15T15:00:00',
    checkOut: '2025-04-17T11:00:00',
    guests: {
      adults: 2,
      children: 0,
    },
    status: 'CONFIRMED',
    totalAmount: 580000,
    paymentMethodId: 1,
    reservationNumber: 'CH-123456',
    specialRequests: '창가 쪽 방으로 배정 요청합니다.',
  },
  // 완료된 예약
  {
    reservationId: 1002,
    userId: 1,
    roomId: 102,
    roomType: 'Chill Lake Suite',
    roomNumber: 'B305',
    checkIn: '2025-01-10T15:00:00',
    checkOut: '2025-01-15T11:00:00',
    guests: {
      adults: 2,
      children: 1,
    },
    status: 'COMPLETED',
    totalAmount: 1250000,
    paymentMethodId: 1,
    reservationNumber: 'CH-123455',
    specialRequests: '유아용 침대를 추가해주세요.',
  },
  // 취소된 예약
  {
    reservationId: 1003,
    userId: 1,
    roomId: 103,
    roomType: 'Deep Chill Premium Suite',
    roomNumber: 'C410',
    checkIn: '2024-12-24T15:00:00',
    checkOut: '2024-12-26T11:00:00',
    guests: {
      adults: 2,
      children: 0,
    },
    status: 'CANCELLED',
    totalAmount: 950000,
    paymentMethodId: 2,
    reservationNumber: 'CH-123454',
    cancellationDate: '2024-12-10T09:30:00',
    cancellationReason: '일정 변경으로 인한 취소',
  },
];

/**
 * 다이닝 예약 더미데이터
 */
export const diningReservations: DiningReservation[] = [
  // 예정된 다이닝 예약
  {
    diningReservationId: 2001,
    userId: 1,
    restaurantId: 1,
    restaurant: 'Chill Elegance',
    reservationDate: '2025-04-16T19:00:00',
    guests: 2,
    status: 'CONFIRMED',
    reservationNumber: 'D-45678',
    tableNumber: '12',
    specialRequests: '창가 자리 요청합니다.',
  },
  // 완료된 다이닝 예약
  {
    diningReservationId: 2002,
    userId: 1,
    restaurantId: 2,
    restaurant: 'Breeze Terrace',
    reservationDate: '2025-02-14T18:30:00',
    guests: 2,
    status: 'COMPLETED',
    reservationNumber: 'D-45677',
    tableNumber: '7',
    specialRequests: '발렌타인데이 이벤트 참여 희망',
    totalAmount: 185000,
  },
  // 취소된 다이닝 예약
  {
    diningReservationId: 2003,
    userId: 1,
    restaurantId: 1,
    restaurant: 'Chill Elegance',
    reservationDate: '2024-12-25T12:00:00',
    guests: 4,
    status: 'CANCELLED',
    reservationNumber: 'D-45676',
    specialRequests: '크리스마스 스페셜 메뉴 요청',
    cancellationDate: '2024-12-20T10:15:00',
    cancellationReason: '일정 변경으로 인한 취소',
  },
];
