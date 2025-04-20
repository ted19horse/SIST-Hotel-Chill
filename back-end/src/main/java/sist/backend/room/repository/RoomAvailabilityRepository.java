package sist.backend.room.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sist.backend.room.entity.Rooms;

/**
 * 객실 가용성 관련 리포지토리 인터페이스입니다.
 * JpaRepository와 커스텀 리포지토리를 함께 상속받아 사용합니다.
 * 
 * 초보자 가이드:
 * - JpaRepository는 기본적인 CRUD 연산을 제공합니다.
 * - RoomAvailabilityRepositoryCustom은 우리가 직접 정의한 커스텀 쿼리 메소드를 제공합니다.
 * - 이렇게 두 인터페이스를 함께 상속받아서 기본 기능과 커스텀 기능을 모두 사용할 수 있습니다.
 */
@Repository
public interface RoomAvailabilityRepository extends JpaRepository<Rooms, Long>, RoomAvailabilityRepositoryCustom {
    // JpaRepository에서 기본 제공하는 메소드를 사용할 수 있습니다.
    // 또한 RoomAvailabilityRepositoryCustom에서 정의한 메소드도 사용할 수 있습니다.
}
