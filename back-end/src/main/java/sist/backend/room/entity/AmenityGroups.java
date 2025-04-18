package sist.backend.room.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import java.util.List;

/**
 * AmenityGroups 엔티티는 DDL.sql의 amenity_groups 테이블과 1:1로 매핑됩니다.
 * 컬럼명, 타입, 길이, 제약조건을 엄격하게 일치시킵니다.
 */
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "amenity_groups")
public class AmenityGroups {
    /**
     * 어메니티 그룹의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "amenity_groups_id")
    private Long amenityGroupsId;

    /**
     * 어메니티 그룹 이름 (VARCHAR(50) NOT NULL)
     */
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    /**
     * 어메니티 그룹 아이콘 이름 (VARCHAR(50) NOT NULL)
     */
    @Column(name = "icon_name", length = 50, nullable = false)
    private String iconName;

    /**
     * 정렬 순서 (INT NOT NULL DEFAULT 0)
     */
    @Column(name = "sort_order", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer sortOrder;

    /**
     * 생성일시 (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
     */
    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private java.sql.Timestamp createdAt;

    /**
     * 이 그룹에 속한 어메니티 아이템 목록 (양방향)
     */
    @OneToMany(mappedBy = "amenityGroups", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AmenityItems> amenityItems;

    /**
     * 이 그룹이 연결된 객실유형-어메니티 그룹 목록 (양방향)
     */
    @OneToMany(mappedBy = "amenityGroups", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RoomTypeAmenityGroups> roomTypeAmenityGroups;
}
