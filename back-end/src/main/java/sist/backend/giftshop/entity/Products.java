package sist.backend.giftshop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

/**
 * Products 엔티티는 기프트샵에서 판매하는 상품 정보를 저장합니다.
 */
@Entity
public class Products {
    /**
     * 상품의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productsId;

    /**
     * 상품 카테고리
     */
    private String category;

    /**
     * 상품 이름
     */
    private String name;

    // TODO: 필요시 추가 필드 및 관계 구현
}
