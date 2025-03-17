package com.hotel.domain.user.entity;

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
 * 결제 수단 엔티티
 */
@Entity
@Table(name = "payment_methods")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PaymentMethod {

    /**
     * 결제 수단 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_methods_id")
    private Long id;

    /**
     * 사용자
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    /**
     * 카드 유형
     */
    @Column(name = "card_type", nullable = false, length = 50)
    private String cardType;

    /**
     * 카드 마지막 4자리
     */
    @Column(name = "last_four_digits", nullable = false, length = 4)
    private String lastFourDigits;

    /**
     * 카드 소유자 이름
     */
    @Column(name = "card_holder_name", nullable = false, length = 100)
    private String cardHolderName;

    /**
     * 만료일
     */
    @Column(name = "expiry_date", nullable = false, length = 10)
    private String expiryDate;

    /**
     * 기본 결제 수단 여부
     */
    @Column(name = "is_default", nullable = false)
    private Boolean isDefault;

    /**
     * 토큰
     */
    @Column(nullable = false, length = 255)
    private String token;

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public PaymentMethod(User user, String cardType, String lastFourDigits, String cardHolderName,
            String expiryDate, Boolean isDefault, String token) {
        this.user = user;
        this.cardType = cardType;
        this.lastFourDigits = lastFourDigits;
        this.cardHolderName = cardHolderName;
        this.expiryDate = expiryDate;
        this.isDefault = isDefault != null ? isDefault : false;
        this.token = token;
    }

    /**
     * 기본 결제 수단으로 설정
     */
    public void setAsDefault() {
        this.isDefault = true;
    }

    /**
     * 기본 결제 수단 해제
     */
    public void unsetDefault() {
        this.isDefault = false;
    }

    /**
     * 카드 정보 업데이트
     */
    public void updateCardInfo(String cardHolderName, String expiryDate) {
        this.cardHolderName = cardHolderName;
        this.expiryDate = expiryDate;
    }
}
