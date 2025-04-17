package sist.backend.room.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import java.util.List;

/**
 * AmenityGroups 엔티티는 어매니티 그룹(예: 욕실, 침구 등) 정보를 나타냅니다.
 * @Getter: 각 필드에 대한 getter 메서드를 Lombok이 자동 생성합니다.
 * @NoArgsConstructor: 파라미터 없는 기본 생성자를 Lombok이 자동 생성합니다. (JPA 필수)
 * @AllArgsConstructor: 모든 필드를 파라미터로 받는 생성자를 Lombok이 자동 생성합니다.
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
