package com.hotel.domain.room.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
 * 객실 엔티티
 */
@Entity
@Table(name = "rooms")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Room {

    /**
     * 객실 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rooms_id")
    private Long id;

    /**
     * 객실 타입
     */
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_types_id", nullable = false)
    private RoomType roomType;

    /**
     * 객실 번호
     */
    @Column(name = "room_number", nullable = false, unique = true, length = 10)
    private String roomNumber;

    /**
     * 층
     */
    @Column(nullable = false)
    private Integer floor;

    /**
     * 객실 상태
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private RoomStatus status;

    /**
     * 객실 상태 열거형
     */
    public enum RoomStatus {
        AVAILABLE, OCCUPIED, MAINTENANCE, CLEANING, RESERVED
    }

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public Room(RoomType roomType, String roomNumber, Integer floor, RoomStatus status) {
        this.roomType = roomType;
        this.roomNumber = roomNumber;
        this.floor = floor;
        this.status = status != null ? status : RoomStatus.AVAILABLE;
    }

    /**
     * 객실 상태 변경
     */
    public void changeStatus(RoomStatus status) {
        this.status = status;
    }

    /**
     * 객실 정보 업데이트
     */
    public void update(String roomNumber, Integer floor) {
        this.roomNumber = roomNumber;
        this.floor = floor;
    }
}
