package sist.backend.room.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import sist.backend.room.entity.QRoomReservations;
import sist.backend.room.entity.QRooms;

import java.time.LocalDate;
import java.util.List;

/**
 * 객실 가용성 정보를 조회하는 커스텀 리포지토리 구현체입니다.
 * QueryDSL을 활용해 타입 안전한 쿼리로 객실 가용성 정보를 조회합니다.
 * 
 * 초보자 가이드:
 * - QueryDSL은 타입 안전한 쿼리를 작성할 수 있게 해주는 프레임워크입니다.
 * - Q로 시작하는 클래스(QRooms, QRoomReservations 등)는 QueryDSL이 자동으로 생성한 클래스입니다.
 * - 이 클래스들을 사용하여 컴파일 시점에 SQL 쿼리 오류를 잡을 수 있습니다.
 */
@Repository
@RequiredArgsConstructor
public class RoomAvailabilityRepositoryImpl implements RoomAvailabilityRepositoryCustom {

    private final EntityManager entityManager;
    private final JPAQueryFactory queryFactory;

    /**
     * 특정 객실 타입의 총 객실 수를 조회합니다.
     * 
     * @param roomTypeId 객실 타입 ID
     * @return 해당 객실 타입의 총 객실 수
     */
    @Override
    public long getTotalRoomCount(Long roomTypeId) {
        // Q 클래스를 사용하여 쿼리 작성
        QRooms rooms = QRooms.rooms;
        
        // 해당 객실 타입에 속하고 사용 가능한 상태인 객실 수 조회
        return queryFactory
                .selectFrom(rooms)
                .where(rooms.roomTypes.roomTypesId.eq(roomTypeId)  // 스키마에 맞게 roomTypesId 사용
                        .and(rooms.status.eq("AVAILABLE")))
                .fetchCount();
    }

    /**
     * 특정 기간에 예약된 객실 수를 조회합니다.
     * 
     * @param roomTypeId 객실 타입 ID
     * @param checkIn 체크인 날짜
     * @param checkOut 체크아웃 날짜
     * @return 해당 기간에 예약된 객실 수
     */
    @Override
    public long getBookedRoomCount(Long roomTypeId, LocalDate checkIn, LocalDate checkOut) {
        // Q 클래스를 사용하여 쿼리 작성
        QRooms rooms = QRooms.rooms;
        QRoomReservations reservations = QRoomReservations.roomReservations;
        
        // 특정 객실 타입에 속하고, 예약 상태가 취소나 완료가 아니며,
        // 지정된 체크인/체크아웃 기간과 겹치는 예약이 있는 객실의 고유 ID 목록 조회
        List<Long> bookedRoomIds = queryFactory
                .select(rooms.roomsId)
                .distinct()
                .from(rooms)
                .join(reservations).on(rooms.roomsId.eq(reservations.rooms.roomsId))
                .where(rooms.roomTypes.roomTypesId.eq(roomTypeId)  // 스키마에 맞게 roomTypesId 사용
                        .and(reservations.status.notIn("CANCELED", "COMPLETED"))
                        .and(reservations.checkInDate.loe(checkOut))
                        .and(reservations.checkOutDate.goe(checkIn)))
                .fetch();
        
        // 예약된 객실 수 반환
        return bookedRoomIds.size();
    }
}
