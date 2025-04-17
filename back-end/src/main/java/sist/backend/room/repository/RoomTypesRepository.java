package sist.backend.room.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sist.backend.room.entity.RoomTypes;
import sist.backend.room.dto.RoomTypesDto;
import java.util.List;

public interface RoomTypesRepository extends JpaRepository<RoomTypes, Long> {
    // RoomTypes 엔티티를 RoomTypesDto로 바로 매핑해서 반환하는 쿼리
    @Query("SELECT new sist.backend.room.dto.RoomTypesDto(" +
            "r.roomTypesId, r.name, r.description, r.size, r.maxAdults, r.maxChildren, " +
            "r.weekdayPrice, r.weekendPrice, r.peakSeasonPrice, r.building, r.floorCount, " +
            "r.roomsPerFloor, r.viewType, r.imageUrl, r.createdAt, r.updatedAt" +
            ") FROM RoomTypes r")
    List<RoomTypesDto> findAllRoomTypesDto();
}