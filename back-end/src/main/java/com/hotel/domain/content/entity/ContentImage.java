package com.hotel.domain.content.entity;

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
 * 컨텐츠 이미지 엔티티
 */
@Entity
@Table(name = "content_images")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ContentImage {

    /**
     * 컨텐츠 이미지 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "content_images_id")
    private Long id;

    /**
     * 컨텐츠
     */
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contents_id", nullable = false)
    private Content content;

    /**
     * 이미지 URL
     */
    @Column(name = "image_url", nullable = false, length = 255)
    private String imageUrl;

    /**
     * 정렬 순서
     */
    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public ContentImage(Content content, String imageUrl, Integer sortOrder) {
        this.content = content;
        this.imageUrl = imageUrl;
        this.sortOrder = sortOrder != null ? sortOrder : 0;
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
