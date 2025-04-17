package sist.backend.room.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Lombok 어노테이션 설명
 *
 * @Getter         // 각 필드에 대한 getter 메서드를 자동 생성합니다.
 * @NoArgsConstructor // 파라미터 없는 기본 생성자를 자동 생성합니다. (JPA 필수)
 * @AllArgsConstructor // 모든 필드를 파라미터로 받는 생성자를 자동 생성합니다.
 * 
 * 객실 유형별 어메니티 그룹 연결 엔티티
 * (room_type_amenity_groups 테이블)
 * 이 엔티티는 객실 유형(RoomTypes)과 어메니티 그룹(AmenityGroups)의 N:M 관계를 표현합니다.
 * 복합 기본키(객실유형ID, 어메니티그룹ID)와 생성일시 필드를 포함합니다.
 */
@Entity
@Table(name = "room_type_amenity_groups")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoomTypeAmenityGroups {
    /**
     * 객실 유형 (RoomTypes와 양방향 다대일 관계, 복합키의 일부)
     */
    @Id
    @ManyToOne
    @JoinColumn(name = "room_types_id", nullable = false)
    private RoomTypes roomTypes;

    /**
     * 어메니티 그룹 (AmenityGroups와 양방향 다대일 관계, 복합키의 일부)
     */
    @Id
    @ManyToOne
    @JoinColumn(name = "amenity_groups_id", nullable = false)
    private AmenityGroups amenityGroups;

    /**
     * 생성일시 (기본값: 현재 시간)
     */
    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private java.sql.Timestamp createdAt;
}
