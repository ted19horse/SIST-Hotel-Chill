package sist.backend.room.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

/**
 * RoomTypes 엔티티의 주요 필드만 포함하는 DTO 클래스입니다.
 * rooms, roomTypeAmenityGroups 등 리스트 필드는 제외하여 순환참조를 방지합니다.
 */
@Getter
@NoArgsConstructor // 기본 생성자 자동 생성
@AllArgsConstructor // 모든 필드를 인자로 받는 생성자 자동 생성
public class RoomTypesDto {
    private Long roomTypesId;        // 객실 유형 ID
    private String name;             // 객실 유형 이름
    private String description;      // 객실 설명
    private Integer size;            // 객실 크기(㎡)
    private Integer maxAdults;       // 최대 성인 수
    private Integer maxChildren;     // 최대 어린이 수
    private BigDecimal weekdayPrice; // 평일 가격
    private BigDecimal weekendPrice; // 주말 가격
    private BigDecimal peakSeasonPrice; // 성수기 가격
    private String building;         // 건물 구분
    private Integer floorCount;      // 층수
    private Integer roomsPerFloor;   // 층별 객실 수
    private String viewType;         // 전망 타입
    private String imageUrl;         // 대표 이미지 URL
    private Timestamp createdAt;     // 생성일시
    private Timestamp updatedAt;     // 수정일시
}