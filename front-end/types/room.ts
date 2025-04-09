/**
 * 객실 관련 타입 정의
 * 
 * 객실 등급, 타입, 상태 및 예약 관련 타입들을 정의합니다.
 * 백엔드 API와의 연동을 위한 인터페이스 및 클라이언트 표시용 타입을 포함합니다.
 */

import { ReactNode } from 'react';

/**
 * 객실 등급 (코드) 타입
 * 객실 등급을 나타내는 코드 값입니다.
 */
export type RoomGrade =
  | 'ULTIMATE_CHILL_SUITE'
  | 'CHILL_LAKE_SUITE'
  | 'CHILL_FAMILY_SUITE'
  | 'CHILL_SERENITY_ROOM'
  | 'CHILL_HARMONY_ROOM'
  | 'CHILL_COMFORT_ROOM';

/**
 * 객실 등급 (표시) 타입
 * 각 객실 등급별 표시 정보를 담고 있습니다.
 */
export type RoomGradeDisplay = {
  [key in RoomGrade]: {
    name: string;         // 표시명
    grade: number;        // 등급 번호 (1이 최상위)
    description: string;  // 등급 설명
  };
};

/**
 * 건물 타입
 * 호텔 내 건물 코드를 나타냅니다.
 */
export type Building = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

/**
 * 전망 타입
 * 객실의 전망 유형을 나타냅니다.
 */
export type ViewType = 'GARDEN' | 'FOREST_TRAIL' | 'LAKE_MOUNTAIN' | 'PREMIUM_CHOICE';

/**
 * 객실 상태 타입
 * 객실의 현재 상태를 나타냅니다.
 */
export type RoomStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'CLEANING';

/**
 * 어메니티 그룹 타입
 * 객실에 제공되는 어메니티 그룹의 유형입니다.
 */
export type AmenityGroupType = 'common' | 'deluxe' | 'premium' | 'presidential';

/**
 * 어메니티 아이템 인터페이스
 * 개별 어메니티 항목을 나타냅니다.
 */
export interface AmenityItem {
  id: number;                 // 고유 식별자
  name: string;               // 어메니티 이름
  icon: () => ReactNode;      // 아이콘 렌더링 함수
  description: string;        // 어메니티 설명
  sortOrder: number;          // 정렬 순서
}

/**
 * 어메니티 그룹 인터페이스
 * 어메니티 항목들의 그룹을 나타냅니다.
 */
export interface AmenityGroup {
  id: number;                // 고유 식별자
  name: string;              // 그룹 이름
  icon: () => ReactNode;     // 그룹 아이콘 렌더링 함수
  type: AmenityGroupType;    // 그룹 유형
  items: AmenityItem[];      // 그룹에 속한 어메니티 항목들
  sortOrder: number;         // 정렬 순서
}

/**
 * 객실 타입 인터페이스
 * 객실 타입 정보를 나타냅니다 (room_types 테이블)
 */
export interface RoomType {
  id: number;                      // 고유 식별자
  name: string;                    // 객실 타입 이름
  description: string;             // 객실 타입 설명
  size: number;                    // 객실 크기 (제곱미터)
  maxAdults: number;               // 최대 성인 수용 인원
  maxChildren: number;             // 최대 아동 수용 인원
  weekdayPrice: number;            // 주중 가격
  weekendPrice: number;            // 주말 가격
  peakSeasonPrice: number;         // 성수기 가격
  building: Building;              // 건물 코드
  floorCount: number;              // 층 수
  roomsPerFloor: number;           // 층별 객실 수
  viewType: ViewType;              // 전망 유형
  imageUrl: string;                // 대표 이미지 URL
  amenityGroups: AmenityGroupType[]; // 제공되는 어메니티 그룹
  createdAt: Date;                 // 생성일
  updatedAt: Date;                 // 수정일
}

/**
 * 객실 정보 인터페이스
 * 개별 객실 정보를 나타냅니다 (rooms 테이블)
 */
export interface Room {
  id: number;                  // 고유 식별자
  roomTypeId: number;          // 객실 타입 ID
  roomNumber: string;          // 객실 번호
  status: RoomStatus;          // 객실 상태
  floor: number;               // 층 번호
  roomOrder: number;           // 객실 순서
}

/**
 * 객실 가용성 정보 인터페이스
 * 특정 날짜의 객실 가용 여부를 나타냅니다.
 */
export interface RoomAvailability {
  date: string;              // 날짜 (YYYY-MM-DD)
  available: boolean;        // 가용 여부
  price: number;             // 해당 날짜 가격
  remainingRooms: number;    // 남은 객실 수
}

/**
 * 객실 검색 필터 인터페이스
 * 객실 검색 시 사용되는 필터링 조건을 나타냅니다.
 */
export interface RoomSearchFilters {
  checkIn?: Date;                // 체크인 날짜
  checkOut?: Date;               // 체크아웃 날짜
  adults?: number;               // 성인 인원 수
  children?: number;             // 아동 인원 수
  roomGrade?: RoomGrade[];       // 객실 등급 필터
  priceRange?: [number, number]; // 가격 범위 [최소, 최대]
  viewType?: ViewType[];         // 전망 유형 필터
  building?: Building[];         // 건물 필터
}

/**
 * 예약 상태 타입
 * 예약의 현재 상태를 나타냅니다.
 */
export type ReservationStatus =
  | 'PENDING'     // 대기중
  | 'CONFIRMED'   // 확정됨
  | 'CHECKED_IN'  // 체크인 완료
  | 'CHECKED_OUT' // 체크아웃 완료
  | 'CANCELLED'   // 취소됨
  | 'NO_SHOW';    // 노쇼

/**
 * 예약 정보 인터페이스
 * 객실 예약 정보를 나타냅니다 (reservations 테이블)
 */
export interface Reservation {
  id: number;                     // 고유 식별자
  userId: number;                 // 사용자 ID
  roomId: number;                 // 객실 ID
  checkInDate: Date;              // 체크인 날짜
  checkOutDate: Date;             // 체크아웃 날짜
  adults: number;                 // 성인 인원 수
  children: number;               // 아동 인원 수
  status: ReservationStatus;      // 예약 상태
  totalAmount: number;            // 총 결제 금액
  paymentMethodId: number | null; // 결제 방법 ID
  reservationNumber: string;      // 예약 번호
  specialRequests?: string;       // 특별 요청 사항
  cancellationDate?: Date;        // 취소 날짜
  cancellationReason?: string;    // 취소 사유
  refundAmount?: number;          // 환불 금액
}

/**
 * 객실 표시용 인터페이스
 * UI에 표시하기 위한 객실 정보를 나타냅니다.
 */
export interface RoomDisplay {
  id: string;                    // 고유 식별자
  grade: RoomGrade;              // 객실 등급
  name: string;                  // 객실 이름
  description: string;           // 객실 설명
  size: number;                  // 객실 크기 (제곱미터)
  building: Building;            // 건물 코드
  floorCount: number;            // 층 수
  roomsPerFloor: number;         // 층별 객실 수
  view: ViewType;                // 전망 유형
  maxOccupancy: number;          // 최대 수용 인원
  price: {                       // 가격 정보
    weekday: number;             // 주중 가격
    weekend: number;             // 주말 가격
    peakSeason: number;          // 성수기 가격
  };
  amenityGroups: AmenityGroupType[]; // 제공되는 어메니티 그룹
  features: string[];            // 특징/장점 목록
  images: string[];              // 이미지 URL 목록
  availability: {                // 가용성 정보
    available: number;           // 예약 가능 객실 수
    total: number;               // 전체 객실 수
  };
}

/**
 * 객실 등급별 표시 정보 상수
 * 각 객실 등급에 대한 표시 정보를 포함합니다.
 */
export const ROOM_GRADE_DISPLAY: RoomGradeDisplay = {
  ULTIMATE_CHILL_SUITE: {
    name: 'Ultimate Chill Suite',
    grade: 1,
    description:
      '최고급 시설과 개인 맞춤 서비스, 넓은 공간, 고객이 선호하는 프리미엄 전망 선택 가능',
  },
  CHILL_LAKE_SUITE: {
    name: 'Chill Lake Suite',
    grade: 2,
    description:
      '비즈니스와 휴식을 동시에, 넓은 업무공간과 휴식공간, 호수와 산이 어우러진 아름다운 전망',
  },
  CHILL_FAMILY_SUITE: {
    name: 'Chill Family Suite',
    grade: 3,
    description: '가족 단위 투숙객을 위한 분리된 거실과 침실, 울창한 숲과 아름다운 오솔길 전망',
  },
  CHILL_SERENITY_ROOM: {
    name: 'Chill Serenity Room',
    grade: 4,
    description: '고급 침구와 가구, 넓은 욕실, 일부 객실 테라스 포함',
  },
  CHILL_HARMONY_ROOM: {
    name: 'Chill Harmony Room',
    grade: 5,
    description: '넓은 공간과 고급스러운 인테리어, 휴식을 위한 추가 소파공간',
  },
  CHILL_COMFORT_ROOM: {
    name: 'Chill Comfort Room',
    grade: 6,
    description: '심플하고 편안한 기본형 객실, 자연적 요소가 가미된 인테리어',
  },
} as const;
