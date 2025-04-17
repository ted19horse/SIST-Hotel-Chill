package sist.backend.room.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sist.backend.room.dto.RoomTypeWithAmenitiesDto;
import sist.backend.room.repository.RoomTypesRepositoryCustom;
import java.util.List;

/**
 * RoomService는 객실(RoomType) 및 어매니티(Amenity) 관련 비즈니스 로직을 담당합니다.
 * Repository에서 계층적 DTO 리스트를 받아 Controller에 전달합니다.
 */
@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomTypesRepositoryCustom roomTypesRepositoryCustom;

    /**
     * 모든 객실 타입과 해당 어매니티 그룹/아이템 정보를 반환합니다.
     * @return RoomTypeWithAmenitiesDto 리스트
     */
    public List<RoomTypeWithAmenitiesDto> getAllRoomTypesWithAmenities() {
        return roomTypesRepositoryCustom.findAllRoomTypesWithAmenities();
    }
}
