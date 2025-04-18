package sist.backend.room.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

/**
 * RoomTypes 테이블 구조와 1:1로 매핑되는 DTO입니다.
 */
@Getter
@NoArgsConstructor 
@AllArgsConstructor 
public class RoomTypesDto {
    private Long roomTypesId;        // 객실 유형 ID
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
    private Timestamp createdAt;     // 생성일시
    private Timestamp updatedAt;     // 수정일시
}