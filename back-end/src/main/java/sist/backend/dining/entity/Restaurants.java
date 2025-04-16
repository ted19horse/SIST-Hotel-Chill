package sist.backend.dining.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

/**
 * Restaurants 엔티티는 호텔 내 레스토랑 정보를 저장합니다.
 */
@Entity
public class Restaurants {
    /**
     * 레스토랑의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long restaurantsId;

    /**
     * 레스토랑 이름
     */
    private String name;

    // TODO: 필요시 추가 필드 및 관계 구현
}
