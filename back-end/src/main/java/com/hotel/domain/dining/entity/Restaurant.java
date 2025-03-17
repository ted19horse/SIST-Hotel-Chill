package com.hotel.domain.dining.entity;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 레스토랑 엔티티
 */
@Entity
@Table(name = "restaurants")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Restaurant {

    /**
     * 레스토랑 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "restaurants_id")
    private Long id;

    /**
     * 레스토랑 이름
     */
    @Column(nullable = false, length = 100)
    private String name;

    /**
     * 레스토랑 컨셉
     */
    @Column(nullable = false, length = 255)
    private String concept;

    /**
     * 위치
     */
    @Column(nullable = false, length = 100)
    private String location;

    /**
     * 수용 인원
     */
    @Column(nullable = false)
    private Integer capacity;

    /**
     * 오픈 시간
     */
    @Column(name = "opening_time", nullable = false)
    private LocalTime openingTime;

    /**
     * 마감 시간
     */
    @Column(name = "closing_time", nullable = false)
    private LocalTime closingTime;

    /**
     * 예약 필요 여부
     */
    @Column(name = "is_reservation_required", nullable = false)
    private Boolean isReservationRequired;

    /**
     * 접근 레벨
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "access_level", nullable = false, length = 50)
    private AccessLevel accessLevel;

    /**
     * 레스토랑 이미지 목록
     */
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RestaurantImage> images = new ArrayList<>();

    /**
     * 메뉴 카테고리 목록
     */
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MenuCategory> menuCategories = new ArrayList<>();

    /**
     * 접근 레벨 열거형
     */
    public enum AccessLevel {
        ALL, GUEST_ONLY, MEMBERSHIP_ONLY, VIP_ONLY
    }

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public Restaurant(String name, String concept, String location, Integer capacity,
            LocalTime openingTime, LocalTime closingTime, Boolean isReservationRequired,
            AccessLevel accessLevel) {
        this.name = name;
        this.concept = concept;
        this.location = location;
        this.capacity = capacity;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
        this.isReservationRequired = isReservationRequired != null ? isReservationRequired : false;
        this.accessLevel = accessLevel != null ? accessLevel : AccessLevel.ALL;
    }

    /**
     * 레스토랑 정보 업데이트
     */
    public void update(String name, String concept, String location, Integer capacity,
            LocalTime openingTime, LocalTime closingTime, Boolean isReservationRequired,
            AccessLevel accessLevel) {
        this.name = name;
        this.concept = concept;
        this.location = location;
        this.capacity = capacity;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
        this.isReservationRequired = isReservationRequired;
        this.accessLevel = accessLevel;
    }

    /**
     * 레스토랑 이미지 추가
     */
    public void addImage(RestaurantImage image) {
        this.images.add(image);
        image.setRestaurant(this);
    }

    /**
     * 메뉴 카테고리 추가
     */
    public void addMenuCategory(MenuCategory menuCategory) {
        this.menuCategories.add(menuCategory);
        menuCategory.setRestaurant(this);
    }
}
