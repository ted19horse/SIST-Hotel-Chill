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
 * @ToString(exclude = {"amenityItems", "roomTypeAmenityGroups"}) // toString()에서 양방향 관계 필드 제외 (순환참조 방지)
 *
 * AmenityGroups 엔티티는 객실 어메니티(편의시설) 그룹 정보를 저장합니다.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"amenityItems", "roomTypeAmenityGroups"})
public class AmenityGroups {
    /**
     * 어메니티 그룹의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long amenityGroupsId;

    /**
     * 어메니티 그룹 이름
     */
    private String name;

    /**
     * 어메니티 그룹 아이콘 이름
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
