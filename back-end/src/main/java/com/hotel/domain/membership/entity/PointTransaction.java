package com.hotel.domain.membership.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import com.hotel.domain.user.entity.User;
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
 * 포인트 거래 내역 엔티티
 */
@Entity
@Table(name = "point_transactions")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PointTransaction {

    /**
     * 포인트 거래 내역 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_transactions_id")
    private Long id;

    /**
     * 사용자
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    /**
     * 포인트
     */
    @Column(nullable = false)
    private Integer points;

    /**
     * 거래 유형
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_type", nullable = false, length = 50)
    private TransactionType transactionType;

    /**
     * 참조 ID
     */
    @Column(name = "reference_id")
    private Long referenceId;

    /**
     * 설명
     */
    @Column(nullable = false, length = 255)
    private String description;

    /**
     * 거래 일시
     */
    @Column(name = "transaction_date", nullable = false)
    private LocalDateTime transactionDate;

    /**
     * 만료일
     */
    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    /**
     * 거래 유형 열거형
     */
    public enum TransactionType {
        EARN, USE, EXPIRE, ADJUST, CANCEL
    }

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public PointTransaction(User user, Integer points, TransactionType transactionType,
            Long referenceId, String description, LocalDateTime transactionDate,
            LocalDate expiryDate) {
        this.user = user;
        this.points = points;
        this.transactionType = transactionType;
        this.referenceId = referenceId;
        this.description = description;
        this.transactionDate = transactionDate != null ? transactionDate : LocalDateTime.now();
        this.expiryDate = expiryDate;
    }

    /**
     * 포인트 적립 내역 생성
     */
    public static PointTransaction createEarnTransaction(User user, Integer points,
            Long referenceId, String description, LocalDate expiryDate) {
        return PointTransaction.builder().user(user).points(points)
                .transactionType(TransactionType.EARN).referenceId(referenceId)
                .description(description).transactionDate(LocalDateTime.now())
                .expiryDate(expiryDate).build();
    }

    /**
     * 포인트 사용 내역 생성
     */
    public static PointTransaction createUseTransaction(User user, Integer points, Long referenceId,
            String description) {
        return PointTransaction.builder().user(user).points(points)
                .transactionType(TransactionType.USE).referenceId(referenceId)
                .description(description).transactionDate(LocalDateTime.now()).build();
    }

    /**
     * 포인트 만료 내역 생성
     */
    public static PointTransaction createExpireTransaction(User user, Integer points,
            String description) {
        return PointTransaction.builder().user(user).points(points)
                .transactionType(TransactionType.EXPIRE).description(description)
                .transactionDate(LocalDateTime.now()).build();
    }
}
