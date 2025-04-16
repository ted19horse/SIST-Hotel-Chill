package sist.backend.dining.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;

/**
 * MenuItems 엔티티는 메뉴 카테고리에 속한 실제 메뉴 아이템 정보를 저장합니다.
 */
@Entity
public class MenuItems {
    /**
     * 메뉴 아이템의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuItemsId;

    /**
     * 소속 메뉴 카테고리 (MenuCategories와 단방향 다대일 관계)
     */
    @ManyToOne
    private MenuCategories menuCategories;

    /**
     * 메뉴 아이템 이름
     */
    private String name;

    // TODO: 필요시 추가 필드 및 관계 구현
}
