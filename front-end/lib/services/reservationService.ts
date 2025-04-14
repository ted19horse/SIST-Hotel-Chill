import { reservations } from '@/lib/data/rooms/types/reservations';
import { RoomReservation } from '@/lib/types/room';

// 백엔드 API 엔드포인트 (추후 환경 변수로 관리)
const API_BASE_URL = '/api';

export const reservationService = {
  // 사용자의 모든 예약 조회
  getUserReservations: async (userId: number): Promise<RoomReservation[]> => {
    // TODO: 백엔드 API 연동 시 아래 주석 해제
    // const response = await fetch(`${API_BASE_URL}/users/${userId}/reservations`);
    // return response.json();

    return Promise.resolve(reservations.filter((r) => r.userId === userId));
  },

  // 예약 상태별 조회
  getReservationsByStatus: async (userId: number, status: string[]): Promise<RoomReservation[]> => {
    // TODO: 백엔드 API 연동 시 아래 주석 해제
    // const queryParams = new URLSearchParams();
    // status.forEach(s => queryParams.append('status', s));
    // const response = await fetch(`${API_BASE_URL}/users/${userId}/reservations?${queryParams}`);
    // return response.json();

    return Promise.resolve(
      reservations.filter((r) => r.userId === userId && status.includes(r.status))
    );
  },

  // 예약 상세 조회
  getReservationById: async (reservationId: string): Promise<RoomReservation | null> => {
    // TODO: 백엔드 API 연동 시 아래 주석 해제
    // const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}`);
    // return response.json();

    const reservation = reservations.find((r) => r.id === reservationId);
    return Promise.resolve(reservation || null);
  },

  // 예약 취소
  cancelReservation: async (
    reservationId: string,
    reason: string
  ): Promise<RoomReservation | null> => {
    // TODO: 백엔드 API 연동 시 아래 주석 해제
    // const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}/cancel`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ reason }),
    // });
    // return response.json();

    const reservation = reservations.find((r) => r.id === reservationId);
    if (!reservation) return null;

    const cancelledReservation = {
      ...reservation,
      status: 'cancelled',
      cancellationDate: new Date().toISOString(),
      cancellationReason: reason,
      refundAmount: Math.floor(reservation.totalAmount * 0.9), // 90% 환불 정책 가정
    };

    return Promise.resolve(cancelledReservation);
  },

  // 예약 수정 (체크인/체크아웃 날짜, 인원 수 등)
  updateReservation: async (
    reservationId: string,
    updates: Partial<RoomReservation>
  ): Promise<RoomReservation | null> => {
    // TODO: 백엔드 API 연동 시 아래 주석 해제
    // const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(updates),
    // });
    // return response.json();

    const reservation = reservations.find((r) => r.id === reservationId);
    if (!reservation) return null;

    const updatedReservation = {
      ...reservation,
      ...updates,
    };

    return Promise.resolve(updatedReservation);
  },
};
