package sist.backend.room.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

/**
 * RoomTypes 엔티티는 DDL.sql의 room_types 테이블과 1:1로 매핑됩니다.
 * 컬럼명, 타입, 길이, 제약조건을 엄격하게 일치시킵니다.
 */
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "room_types")
public class RoomTypes {
    /**
     * 객실 유형의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_types_id")
    private Long roomTypesId;

    /**
     * 객실 유형 이름 (VARCHAR(50) NOT NULL)
     */
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    /**
     * 객실 유형 설명 (VARCHAR(255))
     */
    @Column(name = "description", length = 255)
    private String description;

    /**
     * 객실 크기 (INT NOT NULL)
     */
    @Column(name = "size", nullable = false)
    private Integer size;

    /**
     * 최대 성인 투숙 인원 (INT NOT NULL)
     */
    @Column(name = "max_adults", nullable = false)
    private Integer maxAdults;

    /**
     * 최대 어린이 투숙 인원 (INT NOT NULL)
     */
    @Column(name = "max_children", nullable = false)
    private Integer maxChildren;

    /**
     * 평일 1박 가격(원) (INT NOT NULL)
     */
    @Column(name = "weekday_price", nullable = false)
    private Integer weekdayPrice;

    /**
     * 주말 1박 가격(원) (INT NOT NULL)
     */
    @Column(name = "weekend_price", nullable = false)
    private Integer weekendPrice;

    /**
     * 성수기 1박 가격(원) (INT NOT NULL)
     */
    @Column(name = "peak_season_price", nullable = false)
    private Integer peakSeasonPrice;

    /**
     * 객실이 위치한 건물 동 (CHAR NOT NULL)
     * 실제 DB 컬럼 타입이 char이므로 columnDefinition 속성으로 명시합니다.
     */
    @Column(name = "building", columnDefinition = "char", nullable = false)
    private String building;

    /**
     * 해당 유형의 총 층수 (INT NOT NULL)
     */
    @Column(name = "floor_count", nullable = false)
    private Integer floorCount;

    /**
     * 층별 객실 수 (INT NOT NULL)
     */
    @Column(name = "rooms_per_floor", nullable = false)
    private Integer roomsPerFloor;

    /**
     * 객실 전망 타입 (VARCHAR(20) NOT NULL)
     */
    @Column(name = "view_type", length = 20, nullable = false)
    private String viewType;

    /**
     * 대표 이미지 URL (VARCHAR(255))
     */
    @Column(name = "image_url", length = 255)
    private String imageUrl;

    /**
     * 생성일시 (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
     */
    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private java.sql.Timestamp createdAt;

    /**
     * 수정일시 (TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)
     */
    @Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
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
