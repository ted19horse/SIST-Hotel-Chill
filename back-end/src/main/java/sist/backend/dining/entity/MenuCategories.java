package sist.backend.dining.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;

/**
 * MenuCategories 엔티티는 레스토랑의 메뉴 카테고리 정보를 저장합니다.
 */
@Entity
public class MenuCategories {
    /**
     * 메뉴 카테고리의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuCategoriesId;

    /**
     * 소속 레스토랑 (Restaurants와 단방향 다대일 관계)
     */
    @ManyToOne
    private Restaurants restaurants;

    /**
     * 메뉴 카테고리 이름
     */
    private String name;

    // TODO: 필요시 추가 필드 및 관계 구현
}
