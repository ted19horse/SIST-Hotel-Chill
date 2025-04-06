import {
  Building,
  Reservation,
  Room,
  RoomAvailability,
  RoomGrade,
  RoomSearchFilters,
  RoomStatus,
  RoomType,
  ViewType,
} from '@/types/room';

// 백엔드 API 엔드포인트 (추후 환경 변수로 관리)
const API_BASE_URL = '/api/rooms';

/**
 * 객실 타입 관련 API
 */
export const roomTypeService = {
  // 모든 객실 타입 조회
  async getAllRoomTypes(): Promise<RoomType[]> {
    const response = await fetch(`${API_BASE_URL}/types`);
    if (!response.ok) throw new Error('객실 타입 조회 중 오류가 발생했습니다.');
    return response.json();
  },

  // 특정 객실 타입 조회
  async getRoomTypeById(id: number): Promise<RoomType> {
    const response = await fetch(`${API_BASE_URL}/types/${id}`);
    if (!response.ok) throw new Error('객실 타입 조회 중 오류가 발생했습니다.');
    return response.json();
  },

  // 건물별 객실 타입 조회
  async getRoomTypesByBuilding(building: Building): Promise<RoomType[]> {
    const response = await fetch(`${API_BASE_URL}/types/building/${building}`);
    if (!response.ok) throw new Error('객실 타입 조회 중 오류가 발생했습니다.');
    return response.json();
  },

  // 전망 타입별 객실 타입 조회
  async getRoomTypesByView(viewType: ViewType): Promise<RoomType[]> {
    const response = await fetch(`${API_BASE_URL}/types/view/${viewType}`);
    if (!response.ok) throw new Error('객실 타입 조회 중 오류가 발생했습니다.');
    return response.json();
  },

  // 등급별 객실 타입 조회
  async getRoomTypesByGrade(grade: RoomGrade): Promise<RoomType[]> {
    const response = await fetch(`${API_BASE_URL}/types/grade/${grade}`);
    if (!response.ok) throw new Error('객실 타입 조회 중 오류가 발생했습니다.');
    return response.json();
  },
};

/**
 * 객실 관련 API
 */
export const roomService = {
  // 모든 객실 조회
  async getAllRooms(): Promise<Room[]> {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) throw new Error('객실 조회 중 오류가 발생했습니다.');
    return response.json();
  },

  // 특정 객실 조회
  async getRoomById(id: number): Promise<Room> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error('객실 조회 중 오류가 발생했습니다.');
    return response.json();
  },

  // 객실 타입별 객실 조회
  async getRoomsByType(typeId: number): Promise<Room[]> {
    const response = await fetch(`${API_BASE_URL}/type/${typeId}`);
    if (!response.ok) throw new Error('객실 조회 중 오류가 발생했습니다.');
    return response.json();
  },

  // 객실 상태 조회
  async getRoomStatus(roomId: number): Promise<RoomStatus> {
    const response = await fetch(`${API_BASE_URL}/${roomId}/status`);
    if (!response.ok) throw new Error('객실 상태 조회 중 오류가 발생했습니다.');
    return response.json();
  },

  // 객실 검색
  async searchRooms(filters: RoomSearchFilters): Promise<Room[]> {
    const response = await fetch(`${API_BASE_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
    });
    if (!response.ok) throw new Error('객실 검색 중 오류가 발생했습니다.');
    return response.json();
  },

  // 객실 가용성 조회
  async checkAvailability(
    roomTypeId: number,
    checkIn: Date,
    checkOut: Date
  ): Promise<RoomAvailability[]> {
    const response = await fetch(`${API_BASE_URL}/type/${roomTypeId}/availability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ checkIn, checkOut }),
    });
    if (!response.ok) throw new Error('객실 가용성 조회 중 오류가 발생했습니다.');
    return response.json();
  },
};

/**
 * 예약 관련 API
 */
export const reservationService = {
  // 예약 생성
  async createReservation(
    reservation: Omit<Reservation, 'id' | 'reservationNumber'>
  ): Promise<Reservation> {
    const response = await fetch(`${API_BASE_URL}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
    });
    if (!response.ok) throw new Error('예약 생성 중 오류가 발생했습니다.');
    return response.json();
  },

  // 예약 조회
  async getReservation(id: number): Promise<Reservation> {
    const response = await fetch(`${API_BASE_URL}/reservations/${id}`);
    if (!response.ok) throw new Error('예약 조회 중 오류가 발생했습니다.');
    return response.json();
  },

  // 사용자별 예약 조회
  async getUserReservations(userId: number): Promise<Reservation[]> {
    const response = await fetch(`${API_BASE_URL}/reservations/user/${userId}`);
    if (!response.ok) throw new Error('예약 조회 중 오류가 발생했습니다.');
    return response.json();
  },

  // 예약 취소
  async cancelReservation(
    id: number,
    reason: string
  ): Promise<{ success: boolean; refundAmount: number }> {
    const response = await fetch(`${API_BASE_URL}/reservations/${id}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reason }),
    });
    if (!response.ok) throw new Error('예약 취소 중 오류가 발생했습니다.');
    return response.json();
  },

  // 예약 수정
  async updateReservation(id: number, updates: Partial<Reservation>): Promise<Reservation> {
    const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('예약 수정 중 오류가 발생했습니다.');
    return response.json();
  },
};

// 요금 계산 유틸리티
export const priceUtils = {
  // 총 숙박 요금 계산
  calculateTotalPrice(
    roomType: RoomType,
    checkIn: Date,
    checkOut: Date
  ): { totalPrice: number; breakdown: { date: Date; price: number }[] } {
    const breakdown: { date: Date; price: number }[] = [];
    let totalPrice = 0;

    const currentDate = new Date(checkIn);
    while (currentDate < checkOut) {
      const isWeekend = [0, 6].includes(currentDate.getDay());
      const isPeakSeason = this.isPeakSeason(currentDate);

      let dailyPrice = isPeakSeason
        ? roomType.peakSeasonPrice
        : isWeekend
        ? roomType.weekendPrice
        : roomType.weekdayPrice;

      breakdown.push({
        date: new Date(currentDate),
        price: dailyPrice,
      });

      totalPrice += dailyPrice;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return { totalPrice, breakdown };
  },

  // 성수기 여부 확인
  isPeakSeason(date: Date): boolean {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 여름 성수기 (7-8월)
    if (month === 7 || month === 8) return true;

    // 연말연시 성수기 (12/20 - 1/5)
    if ((month === 12 && day >= 20) || (month === 1 && day <= 5)) return true;

    // TODO: 주요 연휴 기간 추가 (설날, 추석 등)

    return false;
  },
};
