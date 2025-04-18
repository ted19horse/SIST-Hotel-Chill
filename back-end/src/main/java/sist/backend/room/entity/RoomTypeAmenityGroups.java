package sist.backend.room.entity;

import jakarta.persistence.*;
import lombok.*;
import sist.backend.room.entity.RoomTypeAmenityGroupsId;

/**
 * RoomTypeAmenityGroups 엔티티는 DDL.sql의 room_type_amenity_groups 테이블과 1:1로 매핑됩니다.
 * 복합 PK, 컬럼명, 타입, 제약조건, FK까지 엄격하게 일치시킵니다.
 */
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "room_type_amenity_groups")
@IdClass(RoomTypeAmenityGroupsId.class)
public class RoomTypeAmenityGroups {
    /**
     * 객실 유형 (복합 PK, FK, NOT NULL)
     */
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_types_id", nullable = false)
    private RoomTypes roomTypes;

    /**
     * 어메니티 그룹 (복합 PK, FK, NOT NULL)
     */
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "amenity_groups_id", nullable = false)
    private AmenityGroups amenityGroups;

    /**
     * 생성일시 (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
     */
    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private java.sql.Timestamp createdAt;
}
