package com.hotel.domain.dining.entity;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 메뉴 카테고리 엔티티
 */
@Entity
@Table(name = "menu_categories")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MenuCategory {

    /**
     * 메뉴 카테고리 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_categories_id")
    private Long id;

    /**
     * 레스토랑
     */
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurants_id", nullable = false)
    private Restaurant restaurant;

    /**
     * 카테고리 이름
     */
    @Column(nullable = false, length = 100)
    private String name;

    /**
     * 카테고리 설명
     */
    @Column(length = 255)
    private String description;

    /**
     * 정렬 순서
     */
    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

    /**
     * 제공 시작 시간
     */
    @Column(name = "availability_start")
    private LocalTime availabilityStart;

    /**
     * 제공 종료 시간
     */
    @Column(name = "availability_end")
    private LocalTime availabilityEnd;

    /**
     * 메뉴 아이템 목록
     */
    @OneToMany(mappedBy = "menuCategory", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MenuItem> menuItems = new ArrayList<>();

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public MenuCategory(Restaurant restaurant, String name, String description, Integer sortOrder,
            LocalTime availabilityStart, LocalTime availabilityEnd) {
        this.restaurant = restaurant;
        this.name = name;
        this.description = description;
        this.sortOrder = sortOrder != null ? sortOrder : 0;
        this.availabilityStart = availabilityStart;
        this.availabilityEnd = availabilityEnd;
    }

    /**
     * 메뉴 카테고리 정보 업데이트
     */
    public void update(String name, String description, Integer sortOrder,
            LocalTime availabilityStart, LocalTime availabilityEnd) {
        this.name = name;
        this.description = description;
        this.sortOrder = sortOrder;
        this.availabilityStart = availabilityStart;
        this.availabilityEnd = availabilityEnd;
    }

    /**
     * 메뉴 아이템 추가
     */
    public void addMenuItem(MenuItem menuItem) {
        this.menuItems.add(menuItem);
        menuItem.setMenuCategory(this);
    }
}
