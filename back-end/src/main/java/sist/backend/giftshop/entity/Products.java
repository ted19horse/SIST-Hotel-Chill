package sist.backend.giftshop.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

/**
 * Products 엔티티는 DDL.sql의 products 테이블과 100% 동일하게 설계됩니다.
 * 컬럼명, 타입, 제약조건, 인덱스 모두 DDL.sql 기준으로만 작성합니다.
 */
@Entity
@Table(name = "products",
    indexes = {
        @Index(name = "idx_category", columnList = "category"),
        @Index(name = "idx_sku", columnList = "sku")
    }
)
public class Products {
    /**
     * 상품의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "products_id")
    private Long productsId;

    /**
     * 상품 카테고리
     */
    @Column(name = "category", length = 100, nullable = false)
    private String category;

    /**
     * 상품 이름
     */
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    /**
     * 상품 가격
     */
    @Column(name = "price", precision = 10, scale = 2, nullable = false)
    private BigDecimal price;

    /**
     * 상품 재고
     */
    @Column(name = "stock", nullable = false)
    private Integer stock;

    /**
     * 상품 SKU(고유 코드)
     */
    @Column(name = "sku", length = 50, nullable = false, unique = true)
    private String sku;
}
