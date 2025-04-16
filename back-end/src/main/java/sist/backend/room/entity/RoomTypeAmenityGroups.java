package sist.backend.room.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Lombok 어노테이션 설명
 *
 * @Getter         // 모든 필드의 getter 메서드 자동 생성
 * @Setter         // 모든 필드의 setter 메서드 자동 생성
 * @NoArgsConstructor // 기본 생성자 자동 생성
 * @AllArgsConstructor // 전체 필드 생성자 자동 생성
 * @Builder        // 빌더 패턴 지원
 * @ToString(exclude = {"roomTypes", "amenityGroups"}) // toString()에서 양방향 관계 필드 제외 (순환참조 방지)
 *
 * 객실 유형별 어메니티 그룹 연결 엔티티
 * (room_type_amenity_groups 테이블)
 * 이 엔티티는 객실 유형(RoomTypes)과 어메니티 그룹(AmenityGroups)의 N:M 관계를 표현합니다.
 * 복합 기본키(객실유형ID, 어메니티그룹ID)와 생성일시 필드를 포함합니다.
 */
@Entity
@Table(name = "room_type_amenity_groups")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"roomTypes", "amenityGroups"})
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
