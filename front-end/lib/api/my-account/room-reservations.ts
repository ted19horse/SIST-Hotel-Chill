import { roomReservations } from '@/lib/mock-data/my-account/reservations';
import { RoomReservation } from '@/lib/types/my-account';

/**
 * 객실 예약 목록 조회 API
 */
export interface GetRoomReservationsRequest {
  userId: number;
  status?: 'CONFIRMED' | 'PENDING' | 'COMPLETED' | 'CANCELLED';
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

export interface GetRoomReservationsResponse {
  data: {
    reservations: RoomReservation[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  success: boolean;
  message: string;
}

export const getRoomReservations = async ({
  userId,
  status,
  page = 1,
  limit = 10,
  startDate,
  endDate,
}: GetRoomReservationsRequest): Promise<GetRoomReservationsResponse> => {
  try {
    // 실제 환경에서는 API 호출
    // const response = await apiClient.get(`/api/my-account/room-reservations`, {
    //   params: { userId, status, page, limit, startDate, endDate },
    // });
    // return response.data;

    // 개발 환경에서는 더미데이터 반환
    let filteredReservations = [...roomReservations];

    // 필터링 로직 적용
    if (status) {
      filteredReservations = filteredReservations.filter((r) => r.status === status);
    }

    if (startDate) {
      filteredReservations = filteredReservations.filter(
        (r) => new Date(r.checkIn) >= new Date(startDate)
      );
    }

    if (endDate) {
      filteredReservations = filteredReservations.filter(
        (r) => new Date(r.checkOut) <= new Date(endDate)
      );
    }

    // 페이지네이션 적용
    const total = filteredReservations.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedReservations = filteredReservations.slice(startIndex, startIndex + limit);

    return {
      data: {
        reservations: paginatedReservations,
        total,
        page,
        limit,
        totalPages,
      },
      success: true,
      message: 'Room reservations retrieved successfully',
    };
  } catch (error) {
    console.error('Error fetching room reservations:', error);
    throw error;
  }
};

/**
 * 객실 예약 상세 조회 API
 */
export interface GetRoomReservationDetailsRequest {
  userId: number;
  reservationId: number;
}

export interface GetRoomReservationDetailsResponse {
  data: RoomReservation;
  success: boolean;
  message: string;
}

export const getRoomReservationDetails = async ({
  userId,
  reservationId,
}: GetRoomReservationDetailsRequest): Promise<GetRoomReservationDetailsResponse> => {
  try {
    // 실제 환경에서는 API 호출
    // const response = await apiClient.get(`/api/my-account/room-reservations/${reservationId}`, {
    //   params: { userId },
    // });
    // return response.data;

    // 개발 환경에서는 더미데이터 반환
    const reservation = roomReservations.find((r) => r.reservationId === reservationId);

    if (!reservation) {
      throw new Error('Reservation not found');
    }

    return {
      data: reservation,
      success: true,
      message: 'Room reservation details retrieved successfully',
    };
  } catch (error) {
    console.error('Error fetching room reservation details:', error);
    throw error;
  }
};

/**
 * 객실 예약 취소 API
 */
export interface CancelRoomReservationRequest {
  userId: number;
  reservationId: number;
  cancellationReason: string;
}

export interface CancelRoomReservationResponse {
  data: RoomReservation;
  success: boolean;
  message: string;
}

export const cancelRoomReservation = async ({
  userId,
  reservationId,
  cancellationReason,
}: CancelRoomReservationRequest): Promise<CancelRoomReservationResponse> => {
  try {
    // 실제 환경에서는 API 호출
    // const response = await apiClient.post(`/api/my-account/room-reservations/${reservationId}/cancel`, {
    //   userId,
    //   cancellationReason,
    // });
    // return response.data;

    // 개발 환경에서는 더미데이터 수정 후 반환
    const reservationIndex = roomReservations.findIndex((r) => r.reservationId === reservationId);

    if (reservationIndex === -1) {
      throw new Error('Reservation not found');
    }

    const updatedReservation: RoomReservation = {
      ...roomReservations[reservationIndex],
      status: 'CANCELLED',
      cancellationDate: new Date().toISOString(),
      cancellationReason,
    };

    return {
      data: updatedReservation,
      success: true,
      message: 'Room reservation cancelled successfully',
    };
  } catch (error) {
    console.error('Error cancelling room reservation:', error);
    throw error;
  }
};
