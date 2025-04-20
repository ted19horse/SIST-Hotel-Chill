package sist.backend.room.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

/**
 * 객실 필터링 조건을 담는 DTO 클래스입니다.
 * 
 * 이 클래스는 프론트엔드에서 전달되는 필터링 조건을 백엔드에서 처리하기 위한 객체입니다.
 * 체크인/체크아웃 날짜, 인원수, 객실 등급, 가격 범위, 전망 타입 등의 필터링 조건을 포함합니다.
 * 
 * 초보자 가이드:
 * - DTO는 API 요청/응답 시 데이터를 주고받는 객체입니다.
 * - 프론트엔드의 필터링 UI와 1:1로 매핑되도록 설계되었습니다.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomFilterDTO {
    
    /**
     * 체크인 날짜
     * 이 날짜부터 객실 예약 가능 여부를 확인합니다.
     * null인 경우 현재 날짜(오늘)로 처리됩니다.
     */
    private LocalDate checkIn;
    
    /**
     * 체크아웃 날짜
     * 이 날짜까지 객실 예약 가능 여부를 확인합니다.
     * null인 경우 체크인 날짜 다음 날로 처리됩니다.
     */
    private LocalDate checkOut;
    
    /**
     * 성인 인원수
     * 숙박할 성인 인원수입니다.
     * 객실의 최대 성인 수용 인원과 비교하여 필터링에 사용됩니다.
     */
    private Integer adults;
    
    /**
     * 아동 인원수
     * 숙박할 아동 인원수입니다.
     * 객실의 최대 아동 수용 인원과 비교하여 필터링에 사용됩니다.
     */
    private Integer children;
    
    /**
     * 객실 등급 리스트
     * 예: ["standard", "deluxe", "premium", "presidential"]
     * 해당 등급의 객실만 필터링합니다.
     * 빈 리스트인 경우 모든 등급을 포함합니다.
     */
    private List<String> roomGrade;
    
    /**
     * 가격 범위
     * [최소가격, 최대가격] 형태의 배열입니다.
     * 이 범위에 포함되는 가격의 객실만 필터링합니다.
     */
    private int[] priceRange;
    
    /**
     * 전망 타입 리스트
     * 예: ["GARDEN", "LAKE_MOUNTAIN", "FOREST_TRAIL", "PREMIUM_CHOICE"]
     * 해당 전망 타입의 객실만 필터링합니다.
     * 빈 리스트인 경우 모든 전망 타입을 포함합니다.
     */
    private List<String> viewType;
}
