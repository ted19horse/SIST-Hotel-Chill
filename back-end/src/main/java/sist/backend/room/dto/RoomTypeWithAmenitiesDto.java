package sist.backend.room.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * 객실 유형(RoomTypes) + 어메니티 그룹 정보를 포함하는 DTO입니다.
 * - roomTypesId 등은 RoomTypesDto와 동일
 * - amenityGroups: 객실 유형에 연결된 AmenityGroupDto 리스트
 */
@Getter
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
}
