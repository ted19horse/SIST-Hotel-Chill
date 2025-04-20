package sist.backend.room.repository;

import java.time.LocalDate;

/**
 * 객실 가용성 정보를 조회하는 커스텀 리포지토리 인터페이스입니다.
 * QueryDSL을 활용해 객실 타입별 총 객실 수와 예약된 객실 수를 조회합니다.
 * 
 * 초보자 가이드:
 * - 이 인터페이스는 객실 가용성 정보 조회를 위한 사용자 정의 메소드를 정의합니다.
 * - 실제 구현은 RoomAvailabilityRepositoryImpl 클래스에서 이루어집니다.
 * - QueryDSL을 사용하여 타입 안전한 쿼리를 작성합니다.
 */
public interface RoomAvailabilityRepositoryCustom {
    
    /**
     * 특정 객실 타입의 총 객실 수를 조회합니다.
     * 
     * @param roomTypeId 객실 타입 ID
     * @return 해당 객실 타입의 총 객실 수
     */
    long getTotalRoomCount(Long roomTypeId);
    
    /**
     * 특정 기간에 예약된 객실 수를 조회합니다.
     * 
     * @param roomTypeId 객실 타입 ID
     * @param checkIn 체크인 날짜
     * @param checkOut 체크아웃 날짜
     * @return 해당 기간에 예약된 객실 수
     */
    long getBookedRoomCount(Long roomTypeId, LocalDate checkIn, LocalDate checkOut);
}
