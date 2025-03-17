package com.hotel.domain.product.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 상품 엔티티
 */
@Entity
@Table(name = "products")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product {

    /**
     * 상품 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "products_id")
    private Long id;

    /**
     * 상품 카테고리
     */
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private ProductCategory category;

    /**
     * 상품명
     */
    @Column(nullable = false, length = 100)
    private String name;

    /**
     * 상품 설명
     */
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    /**
     * 가격
     */
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    /**
     * 할인 가격
     */
    @Column(name = "discount_price", precision = 10, scale = 2)
    private BigDecimal discountPrice;

    /**
     * 재고
     */
    @Column(nullable = false)
    private Integer stock;

    /**
     * SKU
     */
    @Column(nullable = false, unique = true, length = 50)
    private String sku;

    /**
     * 추천 상품 여부
     */
    @Column(name = "is_featured", nullable = false)
    private Boolean isFeatured;

    /**
     * 신상품 여부
     */
    @Column(name = "is_new_arrival", nullable = false)
    private Boolean isNewArrival;

    /**
     * 한정판 여부
     */
    @Column(name = "is_limited_edition", nullable = false)
    private Boolean isLimitedEdition;

    /**
     * 관련 객실 타입
     */
    @Column(name = "related_room_type", length = 50)
    private String relatedRoomType;

    /**
     * 상품 이미지 목록
     */
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImage> images = new ArrayList<>();

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public Product(ProductCategory category, String name, String description, BigDecimal price,
            BigDecimal discountPrice, Integer stock, String sku, Boolean isFeatured,
            Boolean isNewArrival, Boolean isLimitedEdition, String relatedRoomType) {
        this.category = category;
        this.name = name;
        this.description = description;
        this.price = price;
        this.discountPrice = discountPrice;
        this.stock = stock;
        this.sku = sku;
        this.isFeatured = isFeatured != null ? isFeatured : false;
        this.isNewArrival = isNewArrival != null ? isNewArrival : false;
        this.isLimitedEdition = isLimitedEdition != null ? isLimitedEdition : false;
        this.relatedRoomType = relatedRoomType;
    }

    /**
     * 상품 정보 업데이트
     */
    public void update(ProductCategory category, String name, String description, BigDecimal price,
            BigDecimal discountPrice, Integer stock, String sku, Boolean isFeatured,
            Boolean isNewArrival, Boolean isLimitedEdition, String relatedRoomType) {
        this.category = category;
        this.name = name;
        this.description = description;
        this.price = price;
        this.discountPrice = discountPrice;
        this.stock = stock;
        this.sku = sku;
        this.isFeatured = isFeatured;
        this.isNewArrival = isNewArrival;
        this.isLimitedEdition = isLimitedEdition;
        this.relatedRoomType = relatedRoomType;
    }

    /**
     * 재고 증가
     */
    public void increaseStock(int quantity) {
        this.stock += quantity;
    }

    /**
     * 재고 감소
     */
    public void decreaseStock(int quantity) {
        if (this.stock < quantity) {
            throw new IllegalArgumentException("재고가 부족합니다.");
        }
        this.stock -= quantity;
    }

    /**
     * 상품 이미지 추가
     */
    public void addImage(ProductImage image) {
        this.images.add(image);
        image.setProduct(this);
    }

    /**
     * 현재 판매 가격 계산
     */
    public BigDecimal getCurrentPrice() {
        return discountPrice != null ? discountPrice : price;
    }

    /**
     * 할인율 계산
     */
    public int getDiscountRate() {
        if (discountPrice == null || price.compareTo(BigDecimal.ZERO) == 0) {
            return 0;
        }
        BigDecimal discountAmount = price.subtract(discountPrice);
        return discountAmount.multiply(new BigDecimal("100"))
                .divide(price, 0, BigDecimal.ROUND_HALF_UP).intValue();
    }
}
