package sist.backend.giftshop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

/**
 * Orders 엔티티는 기프트샵 상품 주문 정보를 저장합니다.
 */
@Entity
public class Orders {
    /**
     * 주문의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ordersId;

    // TODO: 필요시 추가 필드 및 관계 구현
}
