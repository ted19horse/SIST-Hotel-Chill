package com.hotel.domain.membership.entity;

import com.hotel.domain.user.entity.Membership.MembershipTier;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 멤버십 혜택 엔티티
 */
@Entity
@Table(name = "membership_benefits")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MembershipBenefit {

    /**
     * 멤버십 혜택 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "membership_benefits_id")
    private Long id;

    /**
     * 멤버십 등급
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "membership_tier", nullable = false, length = 20)
    private MembershipTier membershipTier;

    /**
     * 혜택 카테고리
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "benefit_category", nullable = false, length = 50)
    private BenefitCategory benefitCategory;

    /**
     * 혜택 설명
     */
    @Column(nullable = false, length = 255)
    private String description;

    /**
     * 할인율
     */
    @Column(name = "discount_percentage")
    private Integer discountPercentage;

    /**
     * 활성화 여부
     */
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    /**
     * 혜택 카테고리 열거형
     */
    public enum BenefitCategory {
        ROOM, DINING, SPA, FITNESS, SHOPPING, TRANSPORTATION, EVENT, OTHER
    }

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public MembershipBenefit(MembershipTier membershipTier, BenefitCategory benefitCategory,
            String description, Integer discountPercentage, Boolean isActive) {
        this.membershipTier = membershipTier;
        this.benefitCategory = benefitCategory;
        this.description = description;
        this.discountPercentage = discountPercentage;
        this.isActive = isActive != null ? isActive : true;
    }

    /**
     * 혜택 정보 업데이트
     */
    public void update(BenefitCategory benefitCategory, String description,
            Integer discountPercentage, Boolean isActive) {
        this.benefitCategory = benefitCategory;
        this.description = description;
        this.discountPercentage = discountPercentage;
        this.isActive = isActive;
    }

    /**
     * 활성화 상태 변경
     */
    public void changeActiveStatus(Boolean isActive) {
        this.isActive = isActive;
    }
}
