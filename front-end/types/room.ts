import { ReactNode } from 'react';

// 객실 등급 (코드) 타입
export type RoomGrade =
  | 'ULTIMATE_CHILL_SUITE'
  | 'CHILL_LAKE_SUITE'
  | 'CHILL_FAMILY_SUITE'
  | 'CHILL_SERENITY_ROOM'
  | 'CHILL_HARMONY_ROOM'
  | 'CHILL_COMFORT_ROOM';

// 객실 등급 (표시) 타입
export type RoomGradeDisplay = {
  [key in RoomGrade]: {
    name: string;
    grade: number;
    description: string;
  };
};

// 건물 타입
export type Building = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

// 전망 타입
export type ViewType = 'GARDEN' | 'FOREST_TRAIL' | 'LAKE_MOUNTAIN' | 'PREMIUM_CHOICE';

// 객실 상태 타입
export type RoomStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'CLEANING';

// 어메니티 그룹 타입
export type AmenityGroupType = 'common' | 'deluxe' | 'premium' | 'presidential';

// 어메니티 아이템 타입
export interface AmenityItem {
  id: number;
  name: string;
  icon: () => ReactNode;
  description: string;
  sortOrder: number;
}

// 어메니티 그룹 타입
export interface AmenityGroup {
  id: number;
  name: string;
  icon: () => ReactNode;
  type: AmenityGroupType;
  items: AmenityItem[];
  sortOrder: number;
}

// 객실 타입 (room_types 테이블)
export interface RoomType {
  id: number;
  name: string;
  description: string;
  size: number;
  maxAdults: number;
  maxChildren: number;
  weekdayPrice: number;
  weekendPrice: number;
  peakSeasonPrice: number;
  building: Building;
  floorCount: number;
  roomsPerFloor: number;
  viewType: ViewType;
  imageUrl: string;
  amenityGroups: AmenityGroupType[];
  createdAt: Date;
  updatedAt: Date;
}

// 객실 정보 (rooms 테이블)
export interface Room {
  id: number;
  roomTypeId: number;
  roomNumber: string;
  status: RoomStatus;
  floor: number;
  roomOrder: number;
}

// 객실 가용성 정보
export interface RoomAvailability {
  date: string;
  available: boolean;
  price: number;
  remainingRooms: number;
}

// 객실 검색 필터
export interface RoomSearchFilters {
  checkIn?: Date;
  checkOut?: Date;
  adults?: number;
  children?: number;
  roomGrade?: RoomGrade[];
  priceRange?: [number, number];
  viewType?: ViewType[];
  building?: Building[];
}

// 예약 상태 타입
export type ReservationStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'CHECKED_OUT'
  | 'CANCELLED'
  | 'NO_SHOW';

// 예약 정보 (reservations 테이블)
export interface Reservation {
  id: number;
  userId: number;
  roomId: number;
  checkInDate: Date;
  checkOutDate: Date;
  adults: number;
  children: number;
  status: ReservationStatus;
  totalAmount: number;
  paymentMethodId: number | null;
  reservationNumber: string;
  specialRequests?: string;
  cancellationDate?: Date;
  cancellationReason?: string;
  refundAmount?: number;
}

// 객실 표시용 인터페이스
export interface RoomDisplay {
  id: string;
  grade: RoomGrade;
  name: string;
  description: string;
  size: number;
  building: Building;
  floor_count: number;
  rooms_per_floor: number;
  view: ViewType;
  maxOccupancy: number;
  price: {
    weekday: number;
    weekend: number;
    peakSeason: number;
  };
  amenityGroups: AmenityGroupType[];
  features: string[];
  images: string[];
  availability: {
    available: number;
    total: number;
  };
}

// 객실 등급별 표시 정보
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
