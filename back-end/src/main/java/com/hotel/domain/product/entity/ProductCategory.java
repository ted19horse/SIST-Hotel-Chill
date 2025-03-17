package com.hotel.domain.product.entity;

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

/**
 * 상품 카테고리 엔티티
 */
@Entity
@Table(name = "product_categories")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductCategory {

    /**
     * 상품 카테고리 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_categories_id")
    private Long id;

    /**
     * 카테고리 이름
     */
    @Column(nullable = false, length = 100)
    private String name;

    /**
     * 카테고리 설명
     */
    @Column(length = 255)
    private String description;

    /**
     * 부모 카테고리
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private ProductCategory parent;

    /**
     * 자식 카테고리 목록
     */
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<ProductCategory> children = new ArrayList<>();

    /**
     * 정렬 순서
     */
    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

    /**
     * 이미지 URL
     */
    @Column(name = "image_url", length = 255)
    private String imageUrl;

    /**
     * 상품 목록
     */
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Product> products = new ArrayList<>();

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public ProductCategory(String name, String description, ProductCategory parent,
            Integer sortOrder, String imageUrl) {
        this.name = name;
        this.description = description;
        this.parent = parent;
        this.sortOrder = sortOrder != null ? sortOrder : 0;
        this.imageUrl = imageUrl;
    }

    /**
     * 카테고리 정보 업데이트
     */
    public void update(String name, String description, ProductCategory parent, Integer sortOrder,
            String imageUrl) {
        this.name = name;
        this.description = description;
        this.parent = parent;
        this.sortOrder = sortOrder;
        this.imageUrl = imageUrl;
    }

    /**
     * 자식 카테고리 추가
     */
    public void addChild(ProductCategory child) {
        this.children.add(child);
        child.setParent(this);
    }

    /**
     * 부모 카테고리 설정
     */
    public void setParent(ProductCategory parent) {
        this.parent = parent;
    }

    /**
     * 상품 추가
     */
    public void addProduct(Product product) {
        this.products.add(product);
        product.setCategory(this);
    }
}
