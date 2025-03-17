package com.hotel.domain.reservation.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import com.hotel.domain.room.entity.Room;
import com.hotel.domain.user.entity.PaymentMethod;
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
 * 예약 엔티티
 */
@Entity
@Table(name = "reservations")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Reservation extends BaseTimeEntity {

    /**
     * 예약 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservations_id")
    private Long id;

    /**
     * 사용자
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    /**
     * 객실
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rooms_id", nullable = false)
    private Room room;

    /**
     * 체크인 날짜
     */
    @Column(name = "check_in_date", nullable = false)
    private LocalDate checkInDate;

    /**
     * 체크아웃 날짜
     */
    @Column(name = "check_out_date", nullable = false)
    private LocalDate checkOutDate;

    /**
     * 성인 수
     */
    @Column(nullable = false)
    private Integer adults;

    /**
     * 어린이 수
     */
    @Column(nullable = false)
    private Integer children;

    /**
     * 유아 수
     */
    @Column(nullable = false)
    private Integer infants;

    /**
     * 예약 상태
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ReservationStatus status;

    /**
     * 총 금액
     */
    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    /**
     * 결제 수단
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_methods_id")
    private PaymentMethod paymentMethod;

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
        PENDING, CONFIRMED, CHECKED_IN, CHECKED_OUT, CANCELLED, NO_SHOW
    }

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public Reservation(User user, Room room, LocalDate checkInDate, LocalDate checkOutDate,
            Integer adults, Integer children, Integer infants, ReservationStatus status,
            BigDecimal totalAmount, PaymentMethod paymentMethod, String specialRequests,
            String reservationNumber) {
        this.user = user;
        this.room = room;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.adults = adults;
        this.children = children;
        this.infants = infants != null ? infants : 0;
        this.status = status;
        this.totalAmount = totalAmount;
        this.paymentMethod = paymentMethod;
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
     * 결제 수단 설정
     */
    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    /**
     * 특별 요청 사항 업데이트
     */
    public void updateSpecialRequests(String specialRequests) {
        this.specialRequests = specialRequests;
    }

    /**
     * 숙박 일수 계산
     */
    public int calculateNights() {
        return (int) checkInDate.until(checkOutDate).getDays();
    }
}
