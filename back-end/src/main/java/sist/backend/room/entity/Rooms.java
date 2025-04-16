package sist.backend.room.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

/**
 * Lombok 어노테이션 설명
 *
 * @Getter         // 모든 필드의 getter 메서드 자동 생성
 * @Setter         // 모든 필드의 setter 메서드 자동 생성
 * @NoArgsConstructor // 기본 생성자 자동 생성
 * @AllArgsConstructor // 전체 필드 생성자 자동 생성
 * @Builder        // 빌더 패턴 지원
 * @ToString(exclude = {"roomTypes", "roomReservations"}) // toString()에서 양방향 관계 필드 제외 (순환참조 방지)
 *
 * Rooms 엔티티는 실제 객실 정보를 저장합니다.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"roomTypes", "roomReservations"})
public class Rooms {
    /**
     * 객실의 고유 식별자 (Primary Key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomsId;

    /**
     * 객실 유형 (RoomTypes와 양방향 다대일 관계)
     */
    @ManyToOne
    @JoinColumn(name = "room_types_id")
    private RoomTypes roomTypes;

    /**
     * 객실 번호 (예: 101, 202A 등)
     */
    private String roomNumber;

    /**
     * 객실 상태 (예: AVAILABLE, OCCUPIED 등)
     */
    private String status;

    /**
     * 객실이 위치한 층
     */
    private Integer floor;

    /**
     * 객실 정렬 순서
     */
    private Integer roomOrder;

    /**
     * 이 객실의 예약 목록 (양방향)
     */
    @OneToMany(mappedBy = "rooms", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RoomReservations> roomReservations;
}
