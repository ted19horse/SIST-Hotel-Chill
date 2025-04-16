package sist.backend.room.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Lombok 어노테이션 설명
 *
 * @Getter         // 모든 필드의 getter 메서드 자동 생성
 * @Setter         // 모든 필드의 setter 메서드 자동 생성
 * @NoArgsConstructor // 기본 생성자 자동 생성
 * @AllArgsConstructor // 전체 필드 생성자 자동 생성
 * @Builder        // 빌더 패턴 지원
 * @ToString(exclude = {"rooms"}) // toString()에서 양방향 관계 필드 제외 (순환참조 방지)
 *
 * RoomReservations 엔티티는 객실 예약 정보를 저장합니다.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"rooms"})
public class RoomReservations {
    /**
     * 객실 예약의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomReservationsId;

    /**
     * 예약한 사용자 ID (외래키)
     */
    private Long usersId;

    /**
     * 예약된 객실 (Rooms와 양방향 다대일 관계)
     */
    @ManyToOne
    @JoinColumn(name = "rooms_id")
    private Rooms rooms;

    /**
     * 체크인 날짜
     */
    private java.time.LocalDate checkInDate;

    /**
     * 체크아웃 날짜
     */
    private java.time.LocalDate checkOutDate;

    /**
     * 성인 투숙객 수
     */
    private Integer adults;

    /**
     * 어린이 투숙객 수
     */
    private Integer children;

    /**
     * 예약 상태 (예: CONFIRMED, CANCELLED 등)
     */
    private String status;

    /**
     * 총 결제 금액
     */
    private java.math.BigDecimal totalAmount;

    /**
     * 결제 수단 ID (nullable)
     */
    private Long paymentMethodsId;

    /**
     * 예약 번호 (고유)
     */
    private String reservationNumber;
}
