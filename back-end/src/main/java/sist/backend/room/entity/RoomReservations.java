package sist.backend.room.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * RoomReservations 엔티티는 DDL.sql의 room_reservations 테이블과 1:1로 매핑됩니다.
 * 컬럼명, 타입, 길이, 제약조건, FK, UNIQUE까지 엄격하게 일치시킵니다.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"rooms"})
@Table(name = "room_reservations",
       uniqueConstraints = @UniqueConstraint(name = "uk_reservation_number", columnNames = {"reservation_number"}),
       indexes = {
           @Index(name = "idx_check_in_date", columnList = "check_in_date"),
           @Index(name = "idx_check_out_date", columnList = "check_out_date"),
           @Index(name = "idx_status", columnList = "status"),
           @Index(name = "idx_reservation_number", columnList = "reservation_number")
       })
public class RoomReservations {
    /**
     * 객실 예약의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_reservations_id")
    private Long roomReservationsId;

    /**
     * 예약한 사용자 (FK, NOT NULL)
     */
    @Column(name = "users_id", nullable = false)
    private Long usersId;

    /**
     * 예약된 객실 (FK, NOT NULL)
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rooms_id", nullable = false)
    private Rooms rooms;

    /**
     * 체크인 날짜 (DATE NOT NULL)
     */
    @Column(name = "check_in_date", nullable = false)
    private java.time.LocalDate checkInDate;

    /**
     * 체크아웃 날짜 (DATE NOT NULL)
     */
    @Column(name = "check_out_date", nullable = false)
    private java.time.LocalDate checkOutDate;

    /**
     * 성인 투숙객 수 (INT NOT NULL)
     */
    @Column(name = "adults", nullable = false)
    private Integer adults;

    /**
     * 어린이 투숙객 수 (INT NOT NULL)
     */
    @Column(name = "children", nullable = false)
    private Integer children;

    /**
     * 예약 상태 (VARCHAR(20) NOT NULL)
     */
    @Column(name = "status", length = 20, nullable = false)
    private String status;

    /**
     * 총 결제 금액 (DECIMAL(10,2) NOT NULL)
     */
    @Column(name = "total_amount", precision = 10, scale = 2, nullable = false)
    private java.math.BigDecimal totalAmount;

    /**
     * 결제 수단 ID (FK, NULL 허용)
     */
    @Column(name = "payment_methods_id")
    private Long paymentMethodsId;

    /**
     * 예약 번호 (VARCHAR(20) NOT NULL UNIQUE)
     */
    @Column(name = "reservation_number", length = 20, nullable = false, unique = true)
    private String reservationNumber;
}
