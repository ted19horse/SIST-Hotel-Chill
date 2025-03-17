package com.hotel.domain.content.entity;

import java.time.LocalDate;
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
 * 배너 엔티티
 */
@Entity
@Table(name = "banners")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Banner {

    /**
     * 배너 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "banners_id")
    private Long id;

    /**
     * 제목
     */
    @Column(nullable = false, length = 100)
    private String title;

    /**
     * 이미지 URL
     */
    @Column(name = "image_url", nullable = false, length = 255)
    private String imageUrl;

    /**
     * 모바일 이미지 URL
     */
    @Column(name = "mobile_image_url", length = 255)
    private String mobileImageUrl;

    /**
     * 링크 URL
     */
    @Column(name = "link_url", length = 255)
    private String linkUrl;

    /**
     * 시작일
     */
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    /**
     * 종료일
     */
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    /**
     * 활성화 여부
     */
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    /**
     * 위치
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private BannerPosition position;

    /**
     * 정렬 순서
     */
    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

    /**
     * 배너 위치 열거형
     */
    public enum BannerPosition {
        MAIN_TOP, MAIN_MIDDLE, MAIN_BOTTOM, SIDE, POPUP
    }

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public Banner(String title, String imageUrl, String mobileImageUrl, String linkUrl,
            LocalDate startDate, LocalDate endDate, Boolean isActive, BannerPosition position,
            Integer sortOrder) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.mobileImageUrl = mobileImageUrl;
        this.linkUrl = linkUrl;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive != null ? isActive : true;
        this.position = position;
        this.sortOrder = sortOrder != null ? sortOrder : 0;
    }

    /**
     * 배너 정보 업데이트
     */
    public void update(String title, String imageUrl, String mobileImageUrl, String linkUrl,
            LocalDate startDate, LocalDate endDate, Boolean isActive, BannerPosition position,
            Integer sortOrder) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.mobileImageUrl = mobileImageUrl;
        this.linkUrl = linkUrl;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive;
        this.position = position;
        this.sortOrder = sortOrder;
    }

    /**
     * 활성화 상태 변경
     */
    public void changeActiveStatus(Boolean isActive) {
        this.isActive = isActive;
    }

    /**
     * 현재 표시 가능 여부 확인
     */
    public boolean isDisplayable() {
        if (!isActive) {
            return false;
        }

        LocalDate today = LocalDate.now();
        return !today.isBefore(startDate) && !today.isAfter(endDate);
    }
}
