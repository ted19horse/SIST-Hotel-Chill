package sist.backend.room.repository;

import java.time.LocalDate;

/**
 * 객실 가용성 조회를 위한 커스텀 리포지토리 인터페이스입니다.
 * 객실 타입별 총 객실 수와 예약된 객실 수를 조회하는 메소드를 제공합니다.
 * 
 * 초보자 가이드:
 * - 이 인터페이스는 QueryDSL을 활용한 커스텀 쿼리 메소드를 정의합니다.
 * - 객실 가용성을 계산하기 위한 두 가지 핵심 메소드를 포함합니다.
 */
public interface RoomAvailabilityRepositoryCustom {
    
    /**
     * 객실 타입별 총 사용 가능한 객실 수를 조회합니다.
     * 
     * @param roomTypeId 객실 타입 ID
     * @return 해당 객실 타입의 총 사용 가능한 객실 수
     */
    int getTotalRoomCount(Long roomTypeId);
    
    /**
     * 특정 기간에 예약된 객실 수를 조회합니다.
     * 체크인/체크아웃 날짜가 겹치는 모든 예약을 고려합니다.
     * 
     * @param roomTypeId 객실 타입 ID
     * @param checkIn 체크인 날짜
     * @param checkOut 체크아웃 날짜
     * @return 해당 기간에 예약된 객실 수
     */
    int getBookedRoomCount(Long roomTypeId, LocalDate checkIn, LocalDate checkOut);
}
