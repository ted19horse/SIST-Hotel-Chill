package sist.backend.room.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * AmenityItems 엔티티는 DDL.sql의 amenity_items 테이블과 1:1로 매핑됩니다.
 * 컬럼명, 타입, 길이, 제약조건, FK, 인덱스, UNIQUE까지 엄격하게 일치시킵니다.
 */
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"amenityGroups"})
@Table(name = "amenity_items",
       uniqueConstraints = @UniqueConstraint(name = "uk_name_group", columnNames = {"name", "amenity_groups_id"}),
       indexes = @Index(name = "idx_sort_order", columnList = "sort_order"))
public class AmenityItems {
    /**
     * 어메니티 아이템의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "amenity_items_id")
    private Long amenityItemsId;

    /**
     * 소속 어메니티 그룹 (FK, NOT NULL)
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "amenity_groups_id", nullable = false)
    private AmenityGroups amenityGroups;

    /**
     * 어메니티 아이템 이름 (VARCHAR(50) NOT NULL)
     */
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    /**
     * 어메니티 아이콘 이름 (VARCHAR(50) NOT NULL)
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
}
