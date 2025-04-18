package sist.backend.room.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

/**
 * Rooms 엔티티는 DDL.sql의 rooms 테이블과 1:1로 매핑됩니다.
 * 컬럼명, 타입, 길이, 제약조건, FK, UNIQUE, GENERATED 컬럼까지 엄격하게 일치시킵니다.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"roomTypes", "roomReservations"})
@Table(name = "rooms",
       uniqueConstraints = @UniqueConstraint(name = "uk_room_number", columnNames = {"room_number"}),
       indexes = {
           @Index(name = "idx_room_number", columnList = "room_number"),
           @Index(name = "idx_status", columnList = "status"),
           @Index(name = "idx_floor", columnList = "floor"),
           @Index(name = "idx_room_order", columnList = "room_order")
       })
public class Rooms {
    /**
     * 객실의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rooms_id")
    private Long roomsId;

    /**
     * 객실 유형 (FK, NOT NULL)
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_types_id", nullable = false)
    private RoomTypes roomTypes;

    /**
     * 객실 번호 (VARCHAR(10) NOT NULL UNIQUE)
     */
    @Column(name = "room_number", length = 10, nullable = false, unique = true)
    private String roomNumber;

    /**
     * 객실 상태 (VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE')
     */
    @Column(name = "status", length = 20, nullable = false, columnDefinition = "VARCHAR(20) DEFAULT 'AVAILABLE'")
    private String status;

    /**
     * 객실이 위치한 층 (GENERATED ALWAYS AS, 읽기 전용)
     * JPA에서는 직접 지원하지 않으므로 DB에서 관리, insertable = false, updatable = false
     */
    @Column(name = "floor", insertable = false, updatable = false)
    private Integer floor;

    /**
     * 객실 정렬 순서 (GENERATED ALWAYS AS, 읽기 전용)
     * JPA에서는 직접 지원하지 않으므로 DB에서 관리, insertable = false, updatable = false
     */
    @Column(name = "room_order", insertable = false, updatable = false)
    private Integer roomOrder;

    /**
     * 이 객실의 예약 목록 (양방향)
     */
    @OneToMany(mappedBy = "rooms", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RoomReservations> roomReservations;
}
