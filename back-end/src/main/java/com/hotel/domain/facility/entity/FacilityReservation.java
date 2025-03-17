package com.hotel.domain.facility.entity;

import java.math.BigDecimal;
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
 * 부대시설 예약 엔티티
 */
@Entity
@Table(name = "facility_reservations")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FacilityReservation extends BaseTimeEntity {

    /**
     * 부대시설 예약 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "facility_reservations_id")
    private Long id;

    /**
     * 사용자
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    /**
     * 부대시설
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "facilities_id", nullable = false)
    private Facility facility;

    /**
     * 예약 날짜
     */
    @Column(name = "reservation_date", nullable = false)
    private LocalDate reservationDate;

    /**
     * 시작 시간
     */
    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    /**
     * 종료 시간
     */
    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

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
     * 결제 완료 여부
     */
    @Column(name = "is_paid", nullable = false)
    private Boolean isPaid;

    /**
     * 금액
     */
    @Column(precision = 10, scale = 2)
    private BigDecimal amount;

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
    public FacilityReservation(User user, Facility facility, LocalDate reservationDate,
            LocalTime startTime, LocalTime endTime, Integer guests, ReservationStatus status,
            String specialRequests, Boolean isPaid, BigDecimal amount, String reservationNumber) {
        this.user = user;
        this.facility = facility;
        this.reservationDate = reservationDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.guests = guests;
        this.status = status;
        this.specialRequests = specialRequests;
        this.isPaid = isPaid != null ? isPaid : false;
        this.amount = amount;
        this.reservationNumber = reservationNumber;
    }

    /**
     * 예약 상태 변경
     */
    public void changeStatus(ReservationStatus status) {
        this.status = status;
    }

    /**
     * 결제 완료 처리
     */
    public void markAsPaid(BigDecimal amount) {
        this.isPaid = true;
        this.amount = amount;
    }

    /**
     * 예약 정보 업데이트
     */
    public void update(LocalDate reservationDate, LocalTime startTime, LocalTime endTime,
            Integer guests, String specialRequests) {
        this.reservationDate = reservationDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.guests = guests;
        this.specialRequests = specialRequests;
    }
}
