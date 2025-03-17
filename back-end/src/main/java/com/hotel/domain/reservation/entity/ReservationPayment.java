package com.hotel.domain.reservation.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import com.hotel.domain.user.entity.PaymentMethod;
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
 * 예약 결제 엔티티
 */
@Entity
@Table(name = "reservation_payments")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReservationPayment {

    /**
     * 예약 결제 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_payments_id")
    private Long id;

    /**
     * 예약
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservations_id", nullable = false)
    private Reservation reservation;

    /**
     * 결제 금액
     */
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    /**
     * 결제 수단
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_methods_id", nullable = false)
    private PaymentMethod paymentMethod;

    /**
     * 결제 일시
     */
    @Column(name = "payment_date", nullable = false)
    private LocalDateTime paymentDate;

    /**
     * 결제 상태
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PaymentStatus status;

    /**
     * 거래 ID
     */
    @Column(name = "transaction_id", unique = true, length = 100)
    private String transactionId;

    /**
     * 결제 상태 열거형
     */
    public enum PaymentStatus {
        PENDING, COMPLETED, FAILED, REFUNDED, CANCELLED
    }

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public ReservationPayment(Reservation reservation, BigDecimal amount,
            PaymentMethod paymentMethod, LocalDateTime paymentDate, PaymentStatus status,
            String transactionId) {
        this.reservation = reservation;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.paymentDate = paymentDate != null ? paymentDate : LocalDateTime.now();
        this.status = status;
        this.transactionId = transactionId;
    }

    /**
     * 결제 상태 변경
     */
    public void changeStatus(PaymentStatus status) {
        this.status = status;
    }

    /**
     * 거래 ID 설정
     */
    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
}
