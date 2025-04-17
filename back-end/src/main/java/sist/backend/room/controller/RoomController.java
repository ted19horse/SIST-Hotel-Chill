package sist.backend.room.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sist.backend.room.dto.RoomTypeWithAmenitiesDto;
import sist.backend.room.service.RoomService;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {
    // 기존 repository 대신 service를 주입받아 사용합니다.
    private final RoomService roomService;

    /**
     * 모든 객실 타입과 어매니티 그룹/아이템 정보를 계층적 JSON으로 반환하는 엔드포인트입니다.
     * - QueryDSL fetch join 기반 Service 호출
     * - 프론트엔드는 이 응답을 활용해 객실별 어매니티 정보를 쉽게 표시할 수 있습니다.
     */
    @GetMapping("/getRoomTypes")
    public List<RoomTypeWithAmenitiesDto> getRoomTypes() {
        System.out.println("Enter /api/rooms/getRoomTypes");
        return roomService.getAllRoomTypesWithAmenities();
    }
}