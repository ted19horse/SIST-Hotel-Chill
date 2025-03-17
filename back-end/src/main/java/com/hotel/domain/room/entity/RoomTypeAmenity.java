package com.hotel.domain.room.entity;

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

/**
 * 객실 타입별 편의시설 엔티티
 */
@Entity
@Table(name = "room_type_amenities")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomTypeAmenity {

    /**
     * 객실 타입별 편의시설 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_type_amenities_id")
    private Long id;

    /**
     * 객실 타입
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_types_id", nullable = false)
    private RoomType roomType;

    /**
     * 객실 편의시설
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_amenities_id", nullable = false)
    private RoomAmenity roomAmenity;

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public RoomTypeAmenity(RoomType roomType, RoomAmenity roomAmenity) {
        this.roomType = roomType;
        this.roomAmenity = roomAmenity;
    }
}
