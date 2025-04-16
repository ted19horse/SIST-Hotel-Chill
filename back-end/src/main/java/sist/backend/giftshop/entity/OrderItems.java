package sist.backend.giftshop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;

/**
 * OrderItems 엔티티는 주문에 포함된 개별 상품 정보를 저장합니다.
 */
@Entity
public class OrderItems {
    /**
     * 주문 아이템의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemsId;

    /**
     * 소속 주문 (Orders와 단방향 다대일 관계)
     */
    @ManyToOne
    private Orders orders;

    /**
     * 주문된 상품 (Products와 단방향 다대일 관계)
     */
    @ManyToOne
    private Products products;

    // TODO: 필요시 추가 필드 및 관계 구현
}
