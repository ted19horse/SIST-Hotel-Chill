/**
 * 객실 데이터 접근 모듈
 * 
 * 객실 데이터에 접근하기 위한 표준화된 함수들을 제공합니다.
 * 백엔드 API 연결 전에 목업 데이터를 사용하며, API 연결 후에는
 * 이 모듈의 함수들을 업데이트하여 실제 API 호출로 전환할 수 있습니다.
 */

import { rooms as roomsData } from './types/rooms';
import { Building, RoomDisplay, RoomGrade, RoomSearchFilters, ViewType } from '@/types/room';

/**
 * 모든 객실 정보를 가져옵니다.
 * @returns 모든 객실 목록
 */
export function getRooms(): RoomDisplay[] {
  return roomsData;
}

/**
 * ID로 특정 객실 정보를 가져옵니다.
 * @param id 객실 ID
 * @returns 찾은 객실 정보 또는 undefined
 */
export function getRoomById(id: string): RoomDisplay | undefined {
  return roomsData.find(room => room.id === id);
}

/**
 * 객실 등급으로 객실 목록을 필터링합니다.
 * @param grade 객실 등급
 * @returns 필터링된 객실 목록
 */
export function getRoomsByGrade(grade: RoomGrade): RoomDisplay[] {
  return roomsData.filter(room => room.grade === grade);
}

/**
 * 건물 코드로 객실 목록을 필터링합니다.
 * @param building 건물 코드
 * @returns 필터링된 객실 목록
 */
export function getRoomsByBuilding(building: Building): RoomDisplay[] {
  return roomsData.filter(room => room.building === building);
}

/**
 * 전망 유형으로 객실 목록을 필터링합니다.
 * @param viewType 전망 유형
 * @returns 필터링된 객실 목록
 */
export function getRoomsByView(viewType: ViewType): RoomDisplay[] {
  return roomsData.filter(room => room.view === viewType);
}

/**
 * 검색 필터를 적용하여 객실 목록을 필터링합니다.
 * @param filters 검색 필터
 * @returns 필터링된 객실 목록
 */
export function searchRooms(filters: RoomSearchFilters): RoomDisplay[] {
  return roomsData.filter(room => {
    // 객실 등급 필터링
    if (filters.roomGrade && filters.roomGrade.length > 0) {
      if (!filters.roomGrade.includes(room.grade)) {
        return false;
      }
    }
    
    // 전망 유형 필터링
    if (filters.viewType && filters.viewType.length > 0) {
      if (!filters.viewType.includes(room.view)) {
        return false;
      }
    }
    
    // 건물 필터링
    if (filters.building && filters.building.length > 0) {
      if (!filters.building.includes(room.building)) {
        return false;
      }
    }
    
    // 가격 범위 필터링
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      if (room.price.weekday < minPrice || room.price.weekday > maxPrice) {
        return false;
      }
    }
    
    // 인원 필터링 (성인 + 아동)
    if (filters.adults || filters.children) {
      const totalOccupants = (filters.adults || 0) + (filters.children || 0);
      if (totalOccupants > room.maxOccupancy) {
        return false;
      }
    }
    
    return true;
  });
}

/**
 * 객실 가용성을 체크합니다.
 * 백엔드 API 연결 시 실제 API 호출로 대체될 함수입니다.
 * 
 * @param roomId 객실 ID
 * @param checkIn 체크인 날짜
 * @param checkOut 체크아웃 날짜
 * @returns 가용성 여부
 */
export function checkRoomAvailability(
  roomId: string,
  checkIn: Date,
  checkOut: Date
): boolean {
  // 백엔드 연결 전에는 간단히 true/false를 리턴
  // 실제 구현에서는 API 호출 결과를 반환
  const room = getRoomById(roomId);
  return room ? room.availability.available > 0 : false;
}

/**
 * 모든 API 호출을 async/await 패턴으로 전환하기 위한 함수들
 * 백엔드 연결 시 실제 API 호출로 대체될 함수들입니다.
 */

export async function fetchRooms(): Promise<RoomDisplay[]> {
  return Promise.resolve(roomsData);
}

export async function fetchRoomById(id: string): Promise<RoomDisplay | undefined> {
  return Promise.resolve(getRoomById(id));
}

export async function fetchRoomsByGrade(grade: RoomGrade): Promise<RoomDisplay[]> {
  return Promise.resolve(getRoomsByGrade(grade));
}

export async function fetchSearchRooms(filters: RoomSearchFilters): Promise<RoomDisplay[]> {
  return Promise.resolve(searchRooms(filters));
}
