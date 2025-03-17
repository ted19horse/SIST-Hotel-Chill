package com.hotel.domain.room.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 객실 편의시설 엔티티
 */
@Entity
@Table(name = "room_amenities")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomAmenity {

    /**
     * 객실 편의시설 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_amenities_id")
    private Long id;

    /**
     * 편의시설 이름
     */
    @Column(nullable = false, length = 100)
    private String name;

    /**
     * 아이콘
     */
    @Column(length = 100)
    private String icon;

    /**
     * 설명
     */
    @Column(length = 255)
    private String description;

    /**
     * 편의시설 유형
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "amenity_type", nullable = false, length = 50)
    private AmenityType amenityType;

    /**
     * 편의시설 유형 열거형
     */
    public enum AmenityType {
        BATHROOM, BEDROOM, ENTERTAINMENT, KITCHEN, GENERAL, SERVICE
    }

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public RoomAmenity(String name, String icon, String description, AmenityType amenityType) {
        this.name = name;
        this.icon = icon;
        this.description = description;
        this.amenityType = amenityType;
    }

    /**
     * 편의시설 정보 업데이트
     */
    public void update(String name, String icon, String description, AmenityType amenityType) {
        this.name = name;
        this.icon = icon;
        this.description = description;
        this.amenityType = amenityType;
    }
} 