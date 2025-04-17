package sist.backend.room.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * RoomTypeWithAmenitiesDto는 객실 타입과 해당 타입에 연결된 어매니티 그룹/아이템 정보를 계층적으로 담는 DTO입니다.
 * - roomTypeId: 객실 타입 고유 ID
 * - roomTypeName: 객실 타입 이름
 * - description: 객실 타입 설명
 * - amenityGroups: 객실 타입에 연결된 어매니티 그룹 리스트
 * @Data: Lombok이 getter/setter, toString, equals, hashCode를 자동 생성합니다.
 * @NoArgsConstructor: Lombok이 파라미터 없는 기본 생성자를 자동 생성합니다.
 * @AllArgsConstructor: Lombok이 모든 필드를 파라미터로 받는 생성자를 자동 생성합니다.
 * @Getter: Lombok이 각 필드에 대한 getter 메서드를 자동 생성합니다. (중복 방지용, @Data와 함께 사용 시 실수 방지)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RoomTypeWithAmenitiesDto {
    private Long roomTypeId; // 객실 타입 ID
    private String roomTypeName; // 객실 타입 이름
    private String description; // 객실 타입 설명
    private List<AmenityGroupDto> amenityGroups; // 객실 타입에 연결된 어매니티 그룹 리스트
}
