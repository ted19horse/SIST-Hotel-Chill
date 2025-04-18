package sist.backend.dining.entity;

import jakarta.persistence.*;

/**
 * Restaurants 엔티티는 DDL.sql의 restaurants 테이블과 100% 동일하게 설계됩니다.
 * 컬럼명, 타입, 제약조건, 인덱스 모두 DDL.sql 기준으로만 작성합니다.
 */
@Entity
@Table(name = "restaurants",
    indexes = {
        @Index(name = "idx_name", columnList = "name")
    }
)
public class Restaurants {
    /**
     * 레스토랑의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "restaurants_id")
    private Long restaurantsId;

    /**
     * 레스토랑 이름
     */
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    /**
     * 레스토랑 수용 인원
     */
    @Column(name = "capacity", nullable = false)
    private Integer capacity;

    /**
     * 레스토랑 오픈 시간
     */
    @Column(name = "opening_time", nullable = false)
    private java.time.LocalTime openingTime;

    /**
     * 레스토랑 마감 시간
     */
    @Column(name = "closing_time", nullable = false)
    private java.time.LocalTime closingTime;
}
