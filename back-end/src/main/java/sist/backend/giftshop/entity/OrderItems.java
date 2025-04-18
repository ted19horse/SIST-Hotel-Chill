package sist.backend.giftshop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import java.math.BigDecimal;

/**
 * OrderItems 엔티티는 DDL.sql의 order_items 테이블과 100% 동일하게 설계됩니다.
 * 컬럼명, 타입, 제약조건, FK, 인덱스 모두 DDL.sql 기준으로만 작성합니다.
 */
@Entity
@Table(name = "order_items",
    indexes = {
        @Index(name = "idx_orders_id", columnList = "orders_id"),
        @Index(name = "idx_products_id", columnList = "products_id")
    }
)
public class OrderItems {
    /**
     * 주문 아이템의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_items_id")
    private Long orderItemsId;

    /**
     * 소속 주문 (Orders와 단방향 다대일 관계)
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orders_id", nullable = false)
    private Orders orders;

    /**
     * 주문된 상품 (Products와 단방향 다대일 관계)
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "products_id", nullable = false)
    private Products products;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "price", precision = 10, scale = 2, nullable = false)
    private BigDecimal price;

    @Column(name = "total_price", precision = 10, scale = 2, nullable = false)
    private BigDecimal totalPrice;
}
