package com.hotel.domain.dining.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import com.hotel.domain.user.entity.User;
import com.hotel.global.entity.BaseTimeEntity;
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

/**
 * 다이닝 예약 엔티티
 */
@Entity
@Table(name = "dining_reservations")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DiningReservation extends BaseTimeEntity {

    /**
     * 다이닝 예약 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dining_reservations_id")
    private Long id;

    /**
     * 사용자
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    /**
     * 레스토랑
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurants_id", nullable = false)
    private Restaurant restaurant;

    /**
     * 예약 날짜
     */
    @Column(name = "reservation_date", nullable = false)
    private LocalDate reservationDate;

    /**
     * 예약 시간
     */
    @Column(name = "reservation_time", nullable = false)
    private LocalTime reservationTime;

    /**
     * 인원 수
     */
    @Column(nullable = false)
    private Integer guests;

    /**
     * 예약 상태
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ReservationStatus status;

    /**
     * 특별 요청 사항
     */
    @Column(name = "special_requests", columnDefinition = "TEXT")
    private String specialRequests;

    /**
     * 예약 번호
     */
    @Column(name = "reservation_number", nullable = false, unique = true, length = 20)
    private String reservationNumber;

    /**
     * 예약 상태 열거형
     */
    public enum ReservationStatus {
        PENDING, CONFIRMED, CANCELLED, COMPLETED, NO_SHOW
    }

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public DiningReservation(User user, Restaurant restaurant, LocalDate reservationDate,
            LocalTime reservationTime, Integer guests, ReservationStatus status,
            String specialRequests, String reservationNumber) {
        this.user = user;
        this.restaurant = restaurant;
        this.reservationDate = reservationDate;
        this.reservationTime = reservationTime;
        this.guests = guests;
        this.status = status;
        this.specialRequests = specialRequests;
        this.reservationNumber = reservationNumber;
    }

    /**
     * 예약 상태 변경
     */
    public void changeStatus(ReservationStatus status) {
        this.status = status;
    }

    /**
     * 예약 정보 업데이트
     */
    public void update(LocalDate reservationDate, LocalTime reservationTime, Integer guests,
            String specialRequests) {
        this.reservationDate = reservationDate;
        this.reservationTime = reservationTime;
        this.guests = guests;
        this.specialRequests = specialRequests;
    }
}
