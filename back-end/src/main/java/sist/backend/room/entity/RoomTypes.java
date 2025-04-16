package sist.backend.room.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

/**
 * Lombok 어노테이션 설명
 *
 * @Getter         // 모든 필드의 getter 메서드 자동 생성
 * @Setter         // 모든 필드의 setter 메서드 자동 생성
 * @NoArgsConstructor // 기본 생성자 자동 생성
 * @AllArgsConstructor // 전체 필드 생성자 자동 생성
 * @Builder        // 빌더 패턴 지원
 * @ToString(exclude = {"rooms", "roomTypeAmenityGroups"}) // toString()에서 양방향 관계 필드 제외 (순환참조 방지)
 *
 * RoomTypes 엔티티는 객실 유형의 상세 정보를 저장합니다.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"rooms", "roomTypeAmenityGroups"})
public class RoomTypes {
    /**
     * 객실 유형의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomTypesId;

    /**
     * 객실 유형 이름 (예: 스탠다드, 디럭스 등)
     */
    private String name;

    /**
     * 객실 유형 설명
     */
    private String description;

    /**
     * 객실 크기 (제곱미터)
     */
    private Integer size;

    /**
     * 최대 성인 투숙 인원
     */
    private Integer maxAdults;

    /**
     * 최대 어린이 투숙 인원
     */
    private Integer maxChildren;

    /**
     * 평일 1박 가격(원)
     */
    private java.math.BigDecimal weekdayPrice;

    /**
     * 주말 1박 가격(원)
     */
    private java.math.BigDecimal weekendPrice;

    /**
     * 성수기 1박 가격(원)
     */
    private java.math.BigDecimal peakSeasonPrice;

    /**
     * 객실이 위치한 건물 동 (A~F)
     */
    private String building;

    /**
     * 해당 유형의 총 층수
     */
    private Integer floorCount;

    /**
     * 층별 객실 수
     */
    private Integer roomsPerFloor;

    /**
     * 객실 전망 타입 (예: 오션뷰, 마운틴뷰 등)
     */
    private String viewType;

    /**
     * 대표 이미지 URL
     */
    private String imageUrl;

    /**
     * 생성일시
     */
    private java.sql.Timestamp createdAt;

    /**
     * 수정일시
     */
    private java.sql.Timestamp updatedAt;

    /**
     * 이 객실 유형에 속한 객실 목록 (양방향)
     */
    @OneToMany(mappedBy = "roomTypes", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Rooms> rooms;

    /**
     * 이 객실 유형이 연결된 객실유형-어메니티 그룹 목록 (양방향)
     */
    @OneToMany(mappedBy = "roomTypes", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RoomTypeAmenityGroups> roomTypeAmenityGroups;
}
