/**
 * 예약 관련 타입 정의
 */

/**
 * 예약 상태 타입
 */
export type ReservationStatus =
  | 'PENDING' // 대기중
  | 'CONFIRMED' // 확정됨
  | 'CANCELLED' // 취소됨
  | 'COMPLETED' // 완료됨
  | 'NO_SHOW'; // 노쇼

/**
 * 예약 폼 데이터 타입
 */
export interface ReservationFormData {
  restaurantId: string; // 레스토랑 ID
  date: Date; // 예약 날짜
  time: string; // 예약 시간 (HH:MM 형식)
  partySize: number; // 인원 수
  name: string; // 예약자 이름
  email: string; // 예약자 이메일
  phone: string; // 예약자 연락처
  specialRequests?: string; // 특별 요청사항
  allergies?: string[]; // 알레르기 정보
  isAgreedToPolicy?: boolean; // 정책 동의 여부
}

/**
 * 다이닝 예약 응답 타입
 */
export interface DiningReservation {
  id: string; // 예약 ID
  restaurantId: string; // 레스토랑 ID
  restaurantName?: string; // 레스토랑 이름
  date: string; // 예약 날짜 (ISO 형식)
  time: string; // 예약 시간 (HH:MM 형식)
  partySize: number; // 인원 수
  name: string; // 예약자 이름
  email: string; // 예약자 이메일
  phone: string; // 예약자 연락처
  specialRequests?: string; // 특별 요청사항
  status: ReservationStatus; // 예약 상태
  createdAt: string; // 생성 시간 (ISO 형식)
  updatedAt?: string; // 수정 시간 (ISO 형식)
  cancelledAt?: string; // 취소 시간 (ISO 형식)
  cancellationReason?: string; // 취소 사유
}

/**
 * 예약 가능 시간 응답 타입
 */
export interface AvailableTimesResponse {
  date: string; // 조회 날짜 (ISO 형식)
  restaurantId: string; // 레스토랑 ID
  partySize: number; // 인원 수
  availableTimes: string[]; // 예약 가능 시간 목록 (HH:MM 형식)
  availableCapacity?: number; // 해당 날짜 가용 가능한 인원
}

/**
 * 예약 취소 응답 타입
 */
export interface CancellationResponse {
  id: string; // 예약 ID
  status: ReservationStatus; // 예약 상태 (CANCELLED)
  cancelledAt: string; // 취소 시간 (ISO 형식)
  cancellationFee?: number; // 취소 수수료 (있을 경우)
}

/**
 * 예약 단계 열거형
 */
export enum ReservationStep {
  SELECT_DATETIME = 'SELECT_DATETIME',
  ENTER_DETAILS = 'ENTER_DETAILS',
  REVIEW = 'REVIEW',
  CONFIRMED = 'CONFIRMED',
}
