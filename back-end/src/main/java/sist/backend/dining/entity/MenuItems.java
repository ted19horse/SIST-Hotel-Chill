package sist.backend.dining.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

/**
 * MenuItems 엔티티는 DDL.sql의 menu_items 테이블과 100% 동일하게 설계됩니다.
 * 컬럼명, 타입, 제약조건, FK, 인덱스 모두 DDL.sql 기준으로만 작성합니다.
 */
@Entity
@Table(name = "menu_items",
    indexes = {
        @Index(name = "idx_menu_categories_id", columnList = "menu_categories_id"),
        @Index(name = "idx_is_available", columnList = "is_available"),
        @Index(name = "idx_is_signature", columnList = "is_signature")
    }
)
public class MenuItems {
    /**
     * 메뉴 아이템의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_items_id")
    private Long menuItemsId;

    /**
     * 소속 메뉴 카테고리 (MenuCategories와 단방향 다대일 관계)
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_categories_id", nullable = false)
    private MenuCategories menuCategories;

    /**
     * 메뉴 아이템 이름
     */
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    /**
     * 메뉴 아이템 설명
     */
    @Column(name = "description")
    private String description;

    /**
     * 메뉴 아이템 가격
     */
    @Column(name = "price", precision = 10, scale = 2, nullable = false)
    private BigDecimal price;

    /**
     * 메뉴 아이템 이미지 URL
     */
    @Column(name = "image_url", length = 255)
    private String imageUrl;

    /**
     * 메뉴 아이템 채식 여부
     */
    @Column(name = "is_vegetarian", nullable = false)
    private Boolean isVegetarian = false;

    /**
     * 메뉴 아이템 시그니처 여부
     */
    @Column(name = "is_signature", nullable = false)
    private Boolean isSignature = false;

    /**
     * 메뉴 아이템 가용 여부
     */
    @Column(name = "is_available", nullable = false)
    private Boolean isAvailable = true;

    /**
     * 메뉴 아이템 알레르기 정보
     */
    @Column(name = "allergens", length = 255)
    private String allergens;
}
