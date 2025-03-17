package com.hotel.domain.dining.entity;

import java.math.BigDecimal;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 메뉴 아이템 엔티티
 */
@Entity
@Table(name = "menu_items")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MenuItem {

    /**
     * 메뉴 아이템 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_items_id")
    private Long id;

    /**
     * 메뉴 카테고리
     */
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_categories_id", nullable = false)
    private MenuCategory menuCategory;

    /**
     * 메뉴 이름
     */
    @Column(nullable = false, length = 100)
    private String name;

    /**
     * 메뉴 설명
     */
    @Column(columnDefinition = "TEXT")
    private String description;

    /**
     * 가격
     */
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    /**
     * 이미지 URL
     */
    @Column(name = "image_url", length = 255)
    private String imageUrl;

    /**
     * 채식 메뉴 여부
     */
    @Column(name = "is_vegetarian", nullable = false)
    private Boolean isVegetarian;

    /**
     * 시그니처 메뉴 여부
     */
    @Column(name = "is_signature", nullable = false)
    private Boolean isSignature;

    /**
     * 제공 가능 여부
     */
    @Column(name = "is_available", nullable = false)
    private Boolean isAvailable;

    /**
     * 알레르기 정보
     */
    @Column(length = 255)
    private String allergens;

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public MenuItem(MenuCategory menuCategory, String name, String description, BigDecimal price,
            String imageUrl, Boolean isVegetarian, Boolean isSignature, Boolean isAvailable,
            String allergens) {
        this.menuCategory = menuCategory;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.isVegetarian = isVegetarian != null ? isVegetarian : false;
        this.isSignature = isSignature != null ? isSignature : false;
        this.isAvailable = isAvailable != null ? isAvailable : true;
        this.allergens = allergens;
    }

    /**
     * 메뉴 정보 업데이트
     */
    public void update(String name, String description, BigDecimal price, String imageUrl,
            Boolean isVegetarian, Boolean isSignature, Boolean isAvailable, String allergens) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.isVegetarian = isVegetarian;
        this.isSignature = isSignature;
        this.isAvailable = isAvailable;
        this.allergens = allergens;
    }

    /**
     * 제공 가능 상태 변경
     */
    public void changeAvailability(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }
}
