package com.hotel.domain.room.entity;

import java.math.BigDecimal;
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
 * 객실 타입 엔티티
 */
@Entity
@Table(name = "room_types")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomType {

    /**
     * 객실 타입 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_types_id")
    private Long id;

    /**
     * 객실 타입 이름
     */
    @Column(nullable = false, length = 100)
    private String name;

    /**
     * 객실 등급
     */
    @Column(nullable = false)
    private Integer grade;

    /**
     * 객실 크기 (제곱미터)
     */
    @Column(nullable = false)
    private Integer size;

    /**
     * 객실 전망 타입
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "view_type", nullable = false, length = 50)
    private ViewType viewType;

    /**
     * 최대 성인 수
     */
    @Column(name = "max_adults", nullable = false)
    private Integer maxAdults;

    /**
     * 최대 어린이 수
     */
    @Column(name = "max_children", nullable = false)
    private Integer maxChildren;

    /**
     * 객실 설명
     */
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    /**
     * 주중 가격
     */
    @Column(name = "weekday_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal weekdayPrice;

    /**
     * 주말 가격
     */
    @Column(name = "weekend_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal weekendPrice;

    /**
     * 성수기 가격
     */
    @Column(name = "peak_season_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal peakSeasonPrice;

    /**
     * 총 객실 수
     */
    @Column(name = "total_rooms", nullable = false)
    private Integer totalRooms;

    /**
     * 객실 목록
     */
    @OneToMany(mappedBy = "roomType", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Room> rooms = new ArrayList<>();

    /**
     * 객실 이미지 목록
     */
    @OneToMany(mappedBy = "roomType", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RoomImage> images = new ArrayList<>();

    /**
     * 객실 전망 타입 열거형
     */
    public enum ViewType {
        CITY, OCEAN, MOUNTAIN, GARDEN, POOL
    }

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public RoomType(String name, Integer grade, Integer size, ViewType viewType, Integer maxAdults,
            Integer maxChildren, String description, BigDecimal weekdayPrice,
            BigDecimal weekendPrice, BigDecimal peakSeasonPrice, Integer totalRooms) {
        this.name = name;
        this.grade = grade;
        this.size = size;
        this.viewType = viewType;
        this.maxAdults = maxAdults;
        this.maxChildren = maxChildren;
        this.description = description;
        this.weekdayPrice = weekdayPrice;
        this.weekendPrice = weekendPrice;
        this.peakSeasonPrice = peakSeasonPrice;
        this.totalRooms = totalRooms;
    }

    /**
     * 객실 정보 업데이트
     */
    public void update(String name, Integer grade, Integer size, ViewType viewType,
            Integer maxAdults, Integer maxChildren, String description, BigDecimal weekdayPrice,
            BigDecimal weekendPrice, BigDecimal peakSeasonPrice, Integer totalRooms) {
        this.name = name;
        this.grade = grade;
        this.size = size;
        this.viewType = viewType;
        this.maxAdults = maxAdults;
        this.maxChildren = maxChildren;
        this.description = description;
        this.weekdayPrice = weekdayPrice;
        this.weekendPrice = weekendPrice;
        this.peakSeasonPrice = peakSeasonPrice;
        this.totalRooms = totalRooms;
    }

    /**
     * 객실 추가
     */
    public void addRoom(Room room) {
        this.rooms.add(room);
        room.setRoomType(this);
    }

    /**
     * 객실 이미지 추가
     */
    public void addImage(RoomImage image) {
        this.images.add(image);
        image.setRoomType(this);
    }
}
