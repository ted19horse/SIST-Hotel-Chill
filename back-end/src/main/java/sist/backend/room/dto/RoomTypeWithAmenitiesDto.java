package sist.backend.room.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

/**
 * 객실 유형(RoomTypes) + 어메니티 그룹 정보를 포함하는 DTO입니다.
 * - roomTypesId 등은 RoomTypesDto와 동일
 * - amenityGroups: 객실 유형에 연결된 AmenityGroupDto 리스트
 * - availability: 객실 가용성 정보 (추가됨)
 * 
 * 초보자 가이드:
 * - DTO(Data Transfer Object)는 데이터 전송 객체로, API를 통해 클라이언트에 전달되는 데이터 구조입니다.
 * - 이 DTO는 객실 유형의 기본 정보, 어메니티 정보, 가용성 정보를 모두 포함하고 있습니다.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomTypeWithAmenitiesDto {
    private Long id;                 // 객실 유형 ID
    private String name;             // 객실 유형 이름
    private String description;      // 객실 설명
    private Integer size;            // 객실 크기(㎡)
    private Integer maxAdults;       // 최대 성인 수
    private Integer maxChildren;     // 최대 어린이 수
    private Integer weekdayPrice;    // 평일 가격
    private Integer weekendPrice;    // 주말 가격
    private Integer peakSeasonPrice; // 성수기 가격
    private String building;         // 건물 구분
    private Integer floorCount;      // 층수
    private Integer roomsPerFloor;   // 층별 객실 수
    private String viewType;         // 전망 타입
    private String imageUrl;         // 대표 이미지 URL
    private List<AmenityGroupDto> amenityGroups; // 객실 유형에 연결된 어메니티 그룹 리스트
    private AvailabilityDTO availability; // 객실 가용성 정보 (NEW!)
    
    /**
     * 기존 생성자 (가용성 정보 미포함)
     * 기존 코드와의 호환성을 위해 유지합니다.
     */
    public RoomTypeWithAmenitiesDto(
            Long id, String name, String description, Integer size, 
            Integer maxAdults, Integer maxChildren, Integer weekdayPrice, 
            Integer weekendPrice, Integer peakSeasonPrice, String building, 
            Integer floorCount, Integer roomsPerFloor, String viewType, 
            String imageUrl, List<AmenityGroupDto> amenityGroups) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.size = size;
        this.maxAdults = maxAdults;
        this.maxChildren = maxChildren;
        this.weekdayPrice = weekdayPrice;
        this.weekendPrice = weekendPrice;
        this.peakSeasonPrice = peakSeasonPrice;
        this.building = building;
        this.floorCount = floorCount;
        this.roomsPerFloor = roomsPerFloor;
        this.viewType = viewType;
        this.imageUrl = imageUrl;
        this.amenityGroups = amenityGroups;
        this.availability = null; // 기본값은 null (나중에 서비스 레이어에서 설정)
    }
}
