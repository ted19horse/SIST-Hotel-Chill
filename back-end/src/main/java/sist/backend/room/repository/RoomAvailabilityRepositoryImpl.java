package sist.backend.room.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import sist.backend.room.entity.QRoomReservations;
import sist.backend.room.entity.QRooms;

import java.time.LocalDate;
import java.util.List;

/**
 * 객실 가용성 조회를 위한 커스텀 리포지토리 구현체입니다.
 * QueryDSL을 사용하여 객실 가용성 정보를 조회합니다.
 * 
 * 초보자 가이드:
 * - QueryDSL은 타입 안전한 쿼리를 자바 코드로 작성할 수 있게 해주는 프레임워크입니다.
 * - Q로 시작하는 클래스(QRooms, QRoomReservations)는 QueryDSL이 자동 생성한 타입입니다.
 * - JPAQueryFactory를 사용하여 쿼리를 생성하고 실행합니다.
 */
@Repository
@RequiredArgsConstructor
public class RoomAvailabilityRepositoryImpl implements RoomAvailabilityRepositoryCustom {

    /**
     * EntityManager를 주입받아 사용합니다.
     * QueryDSL의 JPAQueryFactory를 생성하는 데 사용됩니다.
     */
    @PersistenceContext
    private final EntityManager entityManager;
    
    /**
     * QueryDSL을 사용하여 쿼리를 생성하고 실행하는 객체입니다.
     */
    private final JPAQueryFactory queryFactory;

    /**
     * 객실 타입별 총 사용 가능한 객실 수를 조회합니다.
     * status가 'AVAILABLE'인 객실만 카운트합니다.
     * 
     * @param roomTypeId 객실 타입 ID
     * @return 해당 객실 타입의 총 사용 가능한 객실 수
     */
    @Override
    public int getTotalRoomCount(Long roomTypeId) {
        QRooms rooms = QRooms.rooms;
        
        // 특정 객실 타입에 속하며 상태가 'AVAILABLE'인 객실 수를 조회
        Long count = queryFactory
            .select(rooms.count())
            .from(rooms)
            .where(rooms.roomTypes.roomTypesId.eq(roomTypeId)
                .and(rooms.status.eq("AVAILABLE")))
            .fetchOne();
        
        return count != null ? count.intValue() : 0;
    }
    
    /**
     * 특정 기간에 예약된 객실 수를 조회합니다.
     * 체크인/체크아웃 날짜가 겹치는 모든 예약을 고려합니다.
     * 
     * @param roomTypeId 객실 타입 ID
     * @param checkIn 체크인 날짜
     * @param checkOut 체크아웃 날짜
     * @return 해당 기간에 예약된 객실 수
     */
    @Override
    public int getBookedRoomCount(Long roomTypeId, LocalDate checkIn, LocalDate checkOut) {
        QRooms rooms = QRooms.rooms;
        QRoomReservations reservations = QRoomReservations.roomReservations;
        
        // 해당 객실 타입이면서 지정된 날짜 범위와 예약이 겹치는 객실 ID 목록 조회
        List<Long> bookedRoomIds = queryFactory
            .select(rooms.roomsId)
            .distinct()
            .from(rooms)
            .join(reservations).on(rooms.roomsId.eq(reservations.rooms.roomsId))
            .where(rooms.roomTypes.roomTypesId.eq(roomTypeId)
                .and(reservations.status.notIn("CANCELED", "COMPLETED"))
                .and(reservations.checkInDate.loe(checkOut))   // 체크인 날짜가 체크아웃 날짜보다 이전이거나 같음
                .and(reservations.checkOutDate.goe(checkIn)))  // 체크아웃 날짜가 체크인 날짜보다 이후이거나 같음
            .fetch();
        
        return bookedRoomIds.size();
    }
}
