package com.hotel.domain.dining.entity;

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
import lombok.Setter;

/**
 * 레스토랑 이미지 엔티티
 */
@Entity
@Table(name = "restaurant_images")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RestaurantImage {

    /**
     * 레스토랑 이미지 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "restaurant_images_id")
    private Long id;

    /**
     * 레스토랑
     */
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurants_id", nullable = false)
    private Restaurant restaurant;

    /**
     * 이미지 URL
     */
    @Column(name = "image_url", nullable = false, length = 255)
    private String imageUrl;

    /**
     * 메인 이미지 여부
     */
    @Column(name = "is_main_image", nullable = false)
    private Boolean isMainImage;

    /**
     * 정렬 순서
     */
    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public RestaurantImage(Restaurant restaurant, String imageUrl, Boolean isMainImage,
            Integer sortOrder) {
        this.restaurant = restaurant;
        this.imageUrl = imageUrl;
        this.isMainImage = isMainImage != null ? isMainImage : false;
        this.sortOrder = sortOrder != null ? sortOrder : 0;
    }

    /**
     * 메인 이미지로 설정
     */
    public void setAsMainImage() {
        this.isMainImage = true;
    }

    /**
     * 메인 이미지 해제
     */
    public void unsetMainImage() {
        this.isMainImage = false;
    }

    /**
     * 정렬 순서 변경
     */
    public void changeSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }

    /**
     * 이미지 URL 업데이트
     */
    public void updateImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
