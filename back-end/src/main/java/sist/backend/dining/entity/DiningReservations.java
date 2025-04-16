package sist.backend.dining.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;

/**
 * DiningReservations 엔티티는 다이닝(레스토랑) 예약 정보를 저장합니다.
 */
@Entity
public class DiningReservations {
    /**
     * 다이닝 예약의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diningReservationsId;

    /**
     * 예약된 레스토랑 (Restaurants와 단방향 다대일 관계)
     */
    @ManyToOne
    private Restaurants restaurants;

    // TODO: 필요시 추가 필드 및 관계 구현
}
