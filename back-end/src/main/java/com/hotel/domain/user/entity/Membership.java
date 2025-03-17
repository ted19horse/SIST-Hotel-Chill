package com.hotel.domain.user.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 멤버십 엔티티
 */
@Entity
@Table(name = "memberships")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Membership {

    /**
     * 멤버십 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "memberships_id")
    private Long id;

    /**
     * 사용자
     */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    /**
     * 멤버십 등급
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "membership_tier", nullable = false, length = 20)
    private MembershipTier membershipTier;

    /**
     * 포인트
     */
    @Column(nullable = false)
    private Integer points;

    /**
     * 총 숙박 횟수
     */
    @Column(name = "total_stays", nullable = false)
    private Integer totalStays;

    /**
     * 총 지출 금액
     */
    @Column(name = "total_spending", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalSpending;

    /**
     * 가입일
     */
    @Column(name = "joined_date", nullable = false)
    private LocalDate joinedDate;

    /**
     * 마지막 등급 변경일
     */
    @Column(name = "last_tier_change")
    private LocalDate lastTierChange;

    /**
     * 멤버십 번호
     */
    @Column(name = "membership_number", nullable = false, unique = true, length = 20)
    private String membershipNumber;

    /**
     * 멤버십 등급 열거형
     */
    public enum MembershipTier {
        CHILL_BREEZE, CHILL_WIND, CHILL_STORM, CHILL_BLIZZARD
    }

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public Membership(User user, MembershipTier membershipTier, Integer points, Integer totalStays,
            BigDecimal totalSpending, LocalDate joinedDate, LocalDate lastTierChange,
            String membershipNumber) {
        this.user = user;
        this.membershipTier = membershipTier != null ? membershipTier : MembershipTier.CHILL_BREEZE;
        this.points = points != null ? points : 0;
        this.totalStays = totalStays != null ? totalStays : 0;
        this.totalSpending = totalSpending != null ? totalSpending : BigDecimal.ZERO;
        this.joinedDate = joinedDate != null ? joinedDate : LocalDate.now();
        this.lastTierChange = lastTierChange;
        this.membershipNumber = membershipNumber;
    }

    /**
     * 포인트 추가
     */
    public void addPoints(int points) {
        this.points += points;
    }

    /**
     * 포인트 사용
     */
    public void usePoints(int points) {
        if (this.points < points) {
            throw new IllegalArgumentException("사용 가능한 포인트가 부족합니다.");
        }
        this.points -= points;
    }

    /**
     * 숙박 횟수 증가
     */
    public void incrementStays() {
        this.totalStays += 1;
        checkAndUpdateTier();
    }

    /**
     * 총 지출 금액 추가
     */
    public void addSpending(BigDecimal amount) {
        this.totalSpending = this.totalSpending.add(amount);
        checkAndUpdateTier();
    }

    /**
     * 멤버십 등급 변경
     */
    public void changeTier(MembershipTier newTier) {
        if (this.membershipTier != newTier) {
            this.membershipTier = newTier;
            this.lastTierChange = LocalDate.now();
        }
    }

    /**
     * 등급 조건 확인 및 업데이트
     */
    private void checkAndUpdateTier() {
        MembershipTier newTier = this.membershipTier;

        // 등급 조건 확인 로직 (예시)
        if (totalStays >= 50 || totalSpending.compareTo(new BigDecimal("10000000")) >= 0) {
            newTier = MembershipTier.CHILL_BLIZZARD;
        } else if (totalStays >= 30 || totalSpending.compareTo(new BigDecimal("5000000")) >= 0) {
            newTier = MembershipTier.CHILL_STORM;
        } else if (totalStays >= 10 || totalSpending.compareTo(new BigDecimal("1000000")) >= 0) {
            newTier = MembershipTier.CHILL_WIND;
        }

        changeTier(newTier);
    }
}
