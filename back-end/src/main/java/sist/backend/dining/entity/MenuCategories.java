package sist.backend.dining.entity;

import jakarta.persistence.*;

/**
 * MenuCategories 엔티티는 DDL.sql의 menu_categories 테이블과 100% 동일하게 설계됩니다.
 * 컬럼명, 타입, 제약조건, FK, 인덱스 모두 DDL.sql 기준으로만 작성합니다.
 */
@Entity
@Table(name = "menu_categories",
    indexes = {
        @Index(name = "idx_restaurants_id", columnList = "restaurants_id"),
        @Index(name = "idx_sort_order", columnList = "sort_order")
    }
)
public class MenuCategories {
    /**
     * 메뉴 카테고리의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_categories_id")
    private Long menuCategoriesId;

    /**
     * 소속 레스토랑 (Restaurants와 단방향 다대일 관계)
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurants_id", nullable = false)
    private Restaurants restaurants;

    /**
     * 메뉴 카테고리 이름
     */
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    /**
     * 메뉴 카테고리 설명
     */
    @Column(name = "description", length = 255)
    private String description;

    /**
     * 메뉴 카테고리 정렬 순서
     */
    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder = 0;

    /**
     * 메뉴 카테고리 이용 가능 시작 시간
     */
    @Column(name = "availability_start")
    private java.time.LocalTime availabilityStart;

    /**
     * 메뉴 카테고리 이용 가능 종료 시간
     */
    @Column(name = "availability_end")
    private java.time.LocalTime availabilityEnd;
}
