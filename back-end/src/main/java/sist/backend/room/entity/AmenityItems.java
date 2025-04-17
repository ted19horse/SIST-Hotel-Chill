package sist.backend.room.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Lombok 어노테이션 설명
 *
 * @Getter         // 각 필드에 대한 getter 메서드를 Lombok이 자동 생성합니다.
 * @NoArgsConstructor // 파라미터 없는 기본 생성자를 Lombok이 자동 생성합니다. (JPA 필수)
 * @AllArgsConstructor // 모든 필드를 파라미터로 받는 생성자를 Lombok이 자동 생성합니다.
 * 
 * AmenityItems 엔티티는 어메니티 그룹에 속한 개별 아이템 정보를 저장합니다.
 */
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
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
