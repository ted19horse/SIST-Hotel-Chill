/**
 * 객실 관련 API 서비스
 * 
 * 객실 정보, 객실 타입, 예약 관련 API 호출을 처리하는 서비스 모듈입니다.
 * 백엔드 API 연결 시 사용될 실제 API 엔드포인트를 통해 데이터를 가져옵니다.
 */

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
} from '@/lib/types/room';
import { ApiError } from '@/lib/types/api/errors';

// 백엔드 API 엔드포인트 (추후 환경 변수로 관리)
const API_BASE_URL = '/api/rooms';

/**
 * API 에러 처리 헬퍼 함수
 * @param response Fetch API 응답 객체
 * @param errorMessage 에러 메시지
 */
async function handleApiResponse<T>(response: Response, errorMessage: string): Promise<T> {
  if (!response.ok) {
    // 에러 응답 파싱 시도
    try {
      const errorData = await response.json();
      throw new ApiError(
        errorMessage,
        response.status,
        errorData.message || errorData.error || errorMessage
      );
    } catch (e) {
      // JSON 파싱 실패 시 일반 에러 발생
      if (e instanceof ApiError) throw e;
      throw new ApiError(errorMessage, response.status);
    }
  }
  
  return response.json() as Promise<T>;
}

/**
 * 객실 타입 관련 API 서비스
 */
export const roomTypeService = {
  /**
   * 모든 객실 타입 조회
   * @returns 객실 타입 목록
   */
  async getAllRoomTypes(): Promise<RoomType[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/types`);
      return handleApiResponse<RoomType[]>(response, '객실 타입 조회 중 오류가 발생했습니다.');
    } catch (error) {
      console.error('객실 타입 조회 실패:', error);
      throw error;
    }
  },

  /**
   * 특정 객실 타입 조회
   * @param id 객실 타입 ID
   * @returns 객실 타입 정보
   */
  async getRoomTypeById(id: number): Promise<RoomType> {
    try {
      const response = await fetch(`${API_BASE_URL}/types/${id}`);
      return handleApiResponse<RoomType>(response, '객실 타입 조회 중 오류가 발생했습니다.');
    } catch (error) {
      console.error(`객실 타입(ID: ${id}) 조회 실패:`, error);
      throw error;
    }
  },

  /**
   * 건물별 객실 타입 조회
   * @param building 건물 코드
   * @returns 객실 타입 목록
   */
  async getRoomTypesByBuilding(building: Building): Promise<RoomType[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/types/building/${building}`);
      return handleApiResponse<RoomType[]>(response, '객실 타입 조회 중 오류가 발생했습니다.');
    } catch (error) {
      console.error(`건물(${building}) 객실 타입 조회 실패:`, error);
      throw error;
    }
  },

  /**
   * 전망 타입별 객실 타입 조회
   * @param viewType 전망 유형
   * @returns 객실 타입 목록
   */
  async getRoomTypesByView(viewType: ViewType): Promise<RoomType[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/types/view/${viewType}`);
      return handleApiResponse<RoomType[]>(response, '객실 타입 조회 중 오류가 발생했습니다.');
    } catch (error) {
      console.error(`전망(${viewType}) 객실 타입 조회 실패:`, error);
      throw error;
    }
  },

  /**
   * 등급별 객실 타입 조회
   * @param grade 객실 등급
   * @returns 객실 타입 목록
   */
  async getRoomTypesByGrade(grade: RoomGrade): Promise<RoomType[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/types/grade/${grade}`);
      return handleApiResponse<RoomType[]>(response, '객실 타입 조회 중 오류가 발생했습니다.');
    } catch (error) {
      console.error(`등급(${grade}) 객실 타입 조회 실패:`, error);
      throw error;
    }
  },
};

/**
 * 객실 관련 API 서비스
 */
export const roomService = {
  /**
   * 모든 객실 조회
   * @returns 객실 목록
   */
  async getAllRooms(): Promise<Room[]> {
    try {
      const response = await fetch(`${API_BASE_URL}`);
      return handleApiResponse<Room[]>(response, '객실 조회 중 오류가 발생했습니다.');
    } catch (error) {
      console.error('객실 조회 실패:', error);
      throw error;
    }
  },

  /**
   * 특정 객실 조회
   * @param id 객실 ID
   * @returns 객실 정보
   */
  async getRoomById(id: number): Promise<Room> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      return handleApiResponse<Room>(response, '객실 조회 중 오류가 발생했습니다.');
    } catch (error) {
      console.error(`객실(ID: ${id}) 조회 실패:`, error);
      throw error;
    }
  },

  /**
   * 객실 타입별 객실 조회
   * @param typeId 객실 타입 ID
   * @returns 객실 목록
   */
  async getRoomsByType(typeId: number): Promise<Room[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/type/${typeId}`);
      return handleApiResponse<Room[]>(response, '객실 조회 중 오류가 발생했습니다.');
    } catch (error) {
      console.error(`타입(ID: ${typeId}) 객실 조회 실패:`, error);
      throw error;
    }
  },

  /**
   * 객실 상태 조회
   * @param roomId 객실 ID
   * @returns 객실 상태
   */
  async getRoomStatus(roomId: number): Promise<RoomStatus> {
    try {
      const response = await fetch(`${API_BASE_URL}/${roomId}/status`);
      return handleApiResponse<RoomStatus>(response, '객실 상태 조회 중 오류가 발생했습니다.');
    } catch (error) {
      console.error(`객실(ID: ${roomId}) 상태 조회 실패:`, error);
      throw error;
    }
  },

  /**
   * 객실 검색
   * @param filters 검색 필터
   * @returns 검색 결과 객실 목록
   */
  async searchRooms(filters: RoomSearchFilters): Promise<Room[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      });
      return handleApiResponse<Room[]>(response, '객실 검색 중 오류가 발생했습니다.');
    } catch (error) {
      console.error('객실 검색 실패:', error);
      throw error;
    }
  },

  /**
   * 객실 가용성 조회
   * @param roomTypeId 객실 타입 ID
   * @param checkIn 체크인 날짜
   * @param checkOut 체크아웃 날짜
   * @returns 객실 가용성 정보
   */
  async checkAvailability(
    roomTypeId: number,
    checkIn: Date,
    checkOut: Date
  ): Promise<RoomAvailability[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/type/${roomTypeId}/availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          checkIn: checkIn.toISOString(), 
          checkOut: checkOut.toISOString() 
        }),
      });
      return handleApiResponse<RoomAvailability[]>(response, '객실 가용성 조회 중 오류가 발생했습니다.');
    } catch (error) {
      console.error('객실 가용성 조회 실패:', error);
      throw error;
    }
  },
};

/**
 * 예약 관련 API 서비스
 */
export const reservationService = {
  /**
   * 예약 생성
   * @param reservation 예약 정보 (ID와 예약번호 제외)
   * @returns 생성된 예약 정보
   */
  async createReservation(
    reservation: Omit<Reservation, 'id' | 'reservationNumber'>
  ): Promise<Reservation> {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
      });
      return handleApiResponse<Reservation>(response, '예약 생성 중 오류가 발생했습니다.');
    } catch (error) {
      console.error('예약 생성 실패:', error);
      throw error;
    }
  },

  /**
   * 예약 조회
   * @param id 예약 ID
   * @returns 예약 정보
   */
  async getReservation(id: number): Promise<Reservation> {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${id}`);
      return handleApiResponse<Reservation>(response, '예약 조회 중 오류가 발생했습니다.');
    } catch (error) {
      console.error(`예약(ID: ${id}) 조회 실패:`, error);
      throw error;
    }
  },

  /**
   * 사용자별 예약 조회
   * @param userId 사용자 ID
   * @returns 예약 목록
   */
  async getUserReservations(userId: number): Promise<Reservation[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/user/${userId}`);
      return handleApiResponse<Reservation[]>(response, '예약 조회 중 오류가 발생했습니다.');
    } catch (error) {
      console.error(`사용자(ID: ${userId}) 예약 조회 실패:`, error);
      throw error;
    }
  },

  /**
   * 예약 취소
   * @param id 예약 ID
   * @param reason 취소 사유
   * @returns 취소 결과 (성공 여부, 환불 금액)
   */
  async cancelReservation(
    id: number,
    reason: string
  ): Promise<{ success: boolean; refundAmount: number }> {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${id}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });
      return handleApiResponse<{ success: boolean; refundAmount: number }>(
        response, 
        '예약 취소 중 오류가 발생했습니다.'
      );
    } catch (error) {
      console.error(`예약(ID: ${id}) 취소 실패:`, error);
      throw error;
    }
  },

  /**
   * 예약 수정
   * @param id 예약 ID
   * @param updates 수정할 정보
   * @returns 수정된 예약 정보
   */
  async updateReservation(id: number, updates: Partial<Reservation>): Promise<Reservation> {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      return handleApiResponse<Reservation>(response, '예약 수정 중 오류가 발생했습니다.');
    } catch (error) {
      console.error(`예약(ID: ${id}) 수정 실패:`, error);
      throw error;
    }
  },
};

/**
 * 요금 계산 유틸리티
 */
export const priceUtils = {
  /**
   * 총 숙박 요금 계산
   * @param roomType 객실 타입
   * @param checkIn 체크인 날짜
   * @param checkOut 체크아웃 날짜
   * @returns 총 요금 및 일별 요금 상세
   */
  calculateTotalPrice(
    roomType: RoomType,
    checkIn: Date,
    checkOut: Date
  ): { totalPrice: number; breakdown: { date: Date; price: number }[] } {
    const breakdown: { date: Date; price: number }[] = [];
    let totalPrice = 0;

    const currentDate = new Date(checkIn);
    while (currentDate < checkOut) {
      const isWeekend = [0, 6].includes(currentDate.getDay()); // 0: 일요일, 6: 토요일
      const isPeakSeason = this.isPeakSeason(currentDate);

      // 날짜에 따른 가격 결정
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
      currentDate.setDate(currentDate.getDate() + 1); // 다음 날짜로 이동
    }

    return { totalPrice, breakdown };
  },

  /**
   * 성수기 여부 확인
   * @param date 확인할 날짜
   * @returns 성수기 여부
   */
  isPeakSeason(date: Date): boolean {
    const month = date.getMonth() + 1; // 0부터 시작하므로 +1
    const day = date.getDate();

    // 여름 성수기 (7-8월)
    if (month === 7 || month === 8) return true;

    // 연말연시 성수기 (12/20 - 1/5)
    if ((month === 12 && day >= 20) || (month === 1 && day <= 5)) return true;

    // TODO: 주요 연휴 기간 추가 (설날, 추석 등)
    // 설날, 추석 등의 연휴는 해당 연도의 달력에 따라 달라지므로
    // 별도의 공휴일 API 또는 설정을 통해 처리해야 함

    return false;
  },
};
