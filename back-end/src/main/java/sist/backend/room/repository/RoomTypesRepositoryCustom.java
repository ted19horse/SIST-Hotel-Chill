package sist.backend.room.repository;

import sist.backend.room.dto.RoomTypeWithAmenitiesDto;
import java.util.List;

/**
 * QueryDSL을 활용해 객실 타입(RoomType)과 그에 연결된 어매니티 그룹/아이템 정보를 한 번에 조회하는 커스텀 리포지토리 인터페이스입니다.
 * - fetch join을 통해 성능을 높이고 N+1 문제를 방지합니다.
 */
public interface RoomTypesRepositoryCustom {
    /**
     * 모든 객실 타입과 연결된 어매니티 그룹/아이템 정보를 계층적 구조로 반환합니다.
     * @return RoomTypeWithAmenitiesDto 리스트
     */
    List<RoomTypeWithAmenitiesDto> findAllRoomTypesWithAmenities();
}
