package com.hotel.domain.facility.entity;

import java.math.BigDecimal;
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
 * 부대시설 엔티티
 */
@Entity
@Table(name = "facilities")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Facility {

    /**
     * 부대시설 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "facilities_id")
    private Long id;

    /**
     * 시설 이름
     */
    @Column(nullable = false, length = 100)
    private String name;

    /**
     * 시설 카테고리
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private FacilityCategory category;

    /**
     * 위치
     */
    @Column(nullable = false, length = 100)
    private String location;

    /**
     * 설명
     */
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    /**
     * 오픈 시간
     */
    @Column(name = "opening_time")
    private LocalTime openingTime;

    /**
     * 마감 시간
     */
    @Column(name = "closing_time")
    private LocalTime closingTime;

    /**
     * 예약 필요 여부
     */
    @Column(name = "is_reservation_required", nullable = false)
    private Boolean isReservationRequired;

    /**
     * 유료 여부
     */
    @Column(name = "is_chargeable", nullable = false)
    private Boolean isChargeable;

    /**
     * 가격
     */
    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    /**
     * 시설 이미지 목록
     */
    @OneToMany(mappedBy = "facility", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FacilityImage> images = new ArrayList<>();

    /**
     * 시설 카테고리 열거형
     */
    public enum FacilityCategory {
        POOL, SPA, FITNESS, KIDS, BUSINESS, ENTERTAINMENT, OUTDOOR, INDOOR
    }

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public Facility(String name, FacilityCategory category, String location, String description,
            LocalTime openingTime, LocalTime closingTime, Boolean isReservationRequired,
            Boolean isChargeable, BigDecimal price) {
        this.name = name;
        this.category = category;
        this.location = location;
        this.description = description;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
        this.isReservationRequired = isReservationRequired != null ? isReservationRequired : false;
        this.isChargeable = isChargeable != null ? isChargeable : false;
        this.price = price;
    }

    /**
     * 시설 정보 업데이트
     */
    public void update(String name, FacilityCategory category, String location, String description,
            LocalTime openingTime, LocalTime closingTime, Boolean isReservationRequired,
            Boolean isChargeable, BigDecimal price) {
        this.name = name;
        this.category = category;
        this.location = location;
        this.description = description;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
        this.isReservationRequired = isReservationRequired;
        this.isChargeable = isChargeable;
        this.price = price;
    }

    /**
     * 시설 이미지 추가
     */
    public void addImage(FacilityImage image) {
        this.images.add(image);
        image.setFacility(this);
    }
}
