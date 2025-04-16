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
 * @ToString(exclude = {"amenityGroups"}) // toString()에서 양방향 관계 필드 제외 (순환참조 방지)
 *
 * AmenityItems 엔티티는 어메니티 그룹에 속한 개별 아이템 정보를 저장합니다.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"amenityGroups"})
public class AmenityItems {
    /**
     * 어메니티 아이템의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long amenityItemsId;

    /**
     * 소속 어메니티 그룹 (AmenityGroups와 양방향 다대일 관계)
     */
    @ManyToOne
    @JoinColumn(name = "amenity_groups_id")
    private AmenityGroups amenityGroups;

    /**
     * 어메니티 아이템 이름
     */
    private String name;

    /**
     * 어메니티 아이콘 이름
     */
    private String iconName;

    /**
     * 정렬 순서
     */
    private Integer sortOrder;

    /**
     * 생성일시
     */
    private java.sql.Timestamp createdAt;

    // TODO: 필요시 추가 필드 및 관계 구현
}
