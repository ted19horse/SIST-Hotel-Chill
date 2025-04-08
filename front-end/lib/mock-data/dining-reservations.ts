/**
 * 다이닝 예약 더미 데이터
 */
import { DiningReservation, DiningReservationStatus } from '@/types/my-account';

export const mockDiningReservations: DiningReservation[] = [
  // 예정된 예약
  {
    id: 'dining-1001',
    userId: 1,
    restaurant: 'Chill Elegance',
    restaurantId: 1,
    image: '/placeholder.svg?height=400&width=600',
    date: '2025-04-15T19:00:00Z',
    guests: 2,
    status: DiningReservationStatus.CONFIRMED,
    totalAmount: 0, // 예약 시점에는 금액이 없음
    specialRequests: '창가 자리로 배정 부탁드립니다.',
    tableNumber: null, // 방문 시 할당
    isExpanded: false,
  },

  // 이용 완료된 예약
  {
    id: 'dining-1002',
    userId: 1,
    restaurant: 'Chill Elegance',
    restaurantId: 1,
    image: '/placeholder.svg?height=400&width=600',
    date: '2025-02-14T18:30:00Z',
    guests: 2,
    status: DiningReservationStatus.COMPLETED,
    totalAmount: 245000,
    specialRequests: '기념일 케이크 준비 부탁드립니다.',
    tableNumber: '28',
    isExpanded: false,
  },
  {
    id: 'dining-1003',
    userId: 1,
    restaurant: 'Chill Garden',
    restaurantId: 2,
    image: '/placeholder.svg?height=400&width=600',
    date: '2025-01-05T12:30:00Z',
    guests: 4,
    status: DiningReservationStatus.COMPLETED,
    totalAmount: 320000,
    specialRequests: '',
    tableNumber: '15',
    isExpanded: false,
  },

  // 취소된 예약
  {
    id: 'dining-1004',
    userId: 1,
    restaurant: 'Chill Breeze Terrace',
    restaurantId: 3,
    image: '/placeholder.svg?height=400&width=600',
    date: '2024-12-20T19:00:00Z',
    guests: 2,
    status: DiningReservationStatus.CANCELLED,
    totalAmount: 0,
    specialRequests: '',
    tableNumber: null,
    isExpanded: false,
    cancellationDate: '2024-12-18T10:15:00Z',
    cancellationReason: '일정 변경으로 인한 취소',
  },
];

// 현재 로그인한 사용자의 다이닝 예약 내역
export const currentUserDiningReservations = mockDiningReservations;

// 예정된 예약만 필터링
export const upcomingDiningReservations = mockDiningReservations.filter(
  (reservation) =>
    new Date(reservation.date) > new Date() &&
    reservation.status !== DiningReservationStatus.CANCELLED
);

// 이용 완료된 예약만 필터링
export const pastDiningReservations = mockDiningReservations.filter(
  (reservation) =>
    new Date(reservation.date) < new Date() &&
    reservation.status === DiningReservationStatus.COMPLETED
);

// 취소된 예약만 필터링
export const cancelledDiningReservations = mockDiningReservations.filter(
  (reservation) => reservation.status === DiningReservationStatus.CANCELLED
);
