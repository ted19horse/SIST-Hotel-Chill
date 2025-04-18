package sist.backend.dining.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * DiningReservations 엔티티는 DDL.sql의 dining_reservations 테이블과 100% 동일하게 설계됩니다.
 * 컬럼명, 타입, 제약조건, FK, 인덱스 모두 DDL.sql 기준으로만 작성합니다.
 */
@Entity
@Table(name = "dining_reservations",
    uniqueConstraints = @UniqueConstraint(name = "uk_reservation_number", columnNames = {"reservation_number"}),
    indexes = {
        @Index(name = "idx_reservation_date", columnList = "reservation_date"),
        @Index(name = "idx_status", columnList = "status"),
        @Index(name = "idx_reservation_number", columnList = "reservation_number")
    }
)
public class DiningReservations {
    /**
     * 다이닝 예약의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dining_reservations_id")
    private Long diningReservationsId;

    /**
     * 예약자 (Users와 단방향 다대일 관계)
     */
    @Column(name = "users_id", nullable = false)
    private Long usersId;

    /**
     * 레스토랑 (Restaurants와 단방향 다대일 관계)
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurants_id", nullable = false)
    private Restaurants restaurants;

    /**
     * 예약 날짜
     */
    @Column(name = "reservation_date", nullable = false)
    private LocalDate reservationDate;

    /**
     * 예약 시간
     */
    @Column(name = "reservation_time", nullable = false)
    private LocalTime reservationTime;

    /**
     * 예약 인원 수
     */
    @Column(name = "guests", nullable = false)
    private Integer guests;

    /**
     * 예약 상태
     */
    @Column(name = "status", nullable = false)
    private String status;

    /**
     * 예약 고유 번호 (유니크)
     */
    @Column(name = "reservation_number", length = 20, nullable = false, unique = true)
    private String reservationNumber;
}
