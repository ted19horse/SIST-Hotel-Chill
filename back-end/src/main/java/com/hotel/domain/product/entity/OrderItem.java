package com.hotel.domain.product.entity;

import java.math.BigDecimal;
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
 * 주문 아이템 엔티티
 */
@Entity
@Table(name = "order_items")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderItem {

    /**
     * 주문 아이템 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_items_id")
    private Long id;

    /**
     * 주문
     */
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orders_id", nullable = false)
    private Order order;

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
     * 가격
     */
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    /**
     * 총 가격
     */
    @Column(name = "total_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public OrderItem(Order order, Product product, Integer quantity, BigDecimal price,
            BigDecimal totalPrice) {
        this.order = order;
        this.product = product;
        this.quantity = quantity;
        this.price = price;
        this.totalPrice =
                totalPrice != null ? totalPrice : price.multiply(new BigDecimal(quantity));
    }

    /**
     * 수량 업데이트
     */
    public void updateQuantity(Integer quantity) {
        this.quantity = quantity;
        this.totalPrice = this.price.multiply(new BigDecimal(quantity));
    }
}
