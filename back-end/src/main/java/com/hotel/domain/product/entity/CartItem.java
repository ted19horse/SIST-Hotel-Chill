package com.hotel.domain.product.entity;

import java.time.LocalDateTime;
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
 * 장바구니 아이템 엔티티
 */
@Entity
@Table(name = "cart_items")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CartItem {

    /**
     * 장바구니 아이템 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_items_id")
    private Long id;

    /**
     * 장바구니
     */
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false)
    private ShoppingCart cart;

    /**
     * 상품
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "products_id", nullable = false)
    private Product product;

    /**
     * 수량
     */
    @Column(nullable = false)
    private Integer quantity;

    /**
     * 추가 일시
     */
    @Column(name = "added_at", nullable = false)
    private LocalDateTime addedAt;

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public CartItem(ShoppingCart cart, Product product, Integer quantity) {
        this.cart = cart;
        this.product = product;
        this.quantity = quantity;
        this.addedAt = LocalDateTime.now();
    }

    /**
     * 수량 업데이트
     */
    public void updateQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    /**
     * 수량 증가
     */
    public void increaseQuantity(int amount) {
        this.quantity += amount;
    }

    /**
     * 수량 감소
     */
    public void decreaseQuantity(int amount) {
        if (this.quantity <= amount) {
            this.quantity = 0;
        } else {
            this.quantity -= amount;
        }
    }
}
