package sist.backend.giftshop.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

/**
 * Orders 엔티티는 DDL.sql의 orders 테이블과 100% 동일하게 설계됩니다.
 * 컬럼명, 타입, 제약조건, 인덱스 모두 DDL.sql 기준으로만 작성합니다.
 */
@Entity
@Table(name = "orders",
    uniqueConstraints = @UniqueConstraint(name = "uk_order_number", columnNames = {"order_number"}),
    indexes = {
        @Index(name = "idx_order_number", columnList = "order_number")
    }
)
public class Orders {
    /**
     * 주문의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orders_id")
    private Long ordersId;

    /**
     * 주문자 (Users와 단방향 다대일 관계)
     */
    @Column(name = "users_id", nullable = false)
    private Long usersId;

    /**
     * 주문 총액
     */
    @Column(name = "total_amount", precision = 10, scale = 2, nullable = false)
    private BigDecimal totalAmount;

    /**
     * 주문 상태
     */
    @Column(name = "status", length = 20, nullable = false)
    private String status;

    /**
     * 결제수단 (PaymentMethods와 단방향 다대일 관계)
     */
    @Column(name = "payment_methods_id", nullable = false)
    private Long paymentMethodsId;

    /**
     * 주문 고유 번호 (유니크)
     */
    @Column(name = "order_number", length = 20, nullable = false, unique = true)
    private String orderNumber;

    /**
     * 객실 내 배달 여부
     */
    @Column(name = "is_in_room_delivery", nullable = false)
    private Boolean isInRoomDelivery = false;
}
