package com.hotel.domain.room.entity;

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
 * 객실 이미지 엔티티
 */
@Entity
@Table(name = "room_images")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomImage {

    /**
     * 객실 이미지 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_images_id")
    private Long id;

    /**
     * 객실 타입
     */
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_types_id", nullable = false)
    private RoomType roomType;

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
    public RoomImage(RoomType roomType, String imageUrl, Boolean isMainImage, Integer sortOrder) {
        this.roomType = roomType;
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
