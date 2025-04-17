package sist.backend.room.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * AmenityGroupDto는 객실 타입에 연결된 어매니티 그룹(예: 욕실, 침구 등)을 표현하는 DTO입니다.
 * - groupId: 그룹의 고유 ID
 * - groupName: 그룹 이름
 * - amenities: 해당 그룹에 속한 어매니티 아이템 리스트
 * @Data: Lombok이 getter/setter, toString, equals, hashCode를 자동 생성합니다.
 * @NoArgsConstructor: Lombok이 파라미터 없는 기본 생성자를 자동 생성합니다.
 * @AllArgsConstructor: Lombok이 모든 필드를 파라미터로 받는 생성자를 자동 생성합니다.
 * @Getter: Lombok이 각 필드에 대한 getter 메서드를 자동 생성합니다. (중복 방지용, @Data와 함께 사용 시 실수 방지)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AmenityGroupDto {
    private Long groupId; // 어매니티 그룹 ID
    private String groupName; // 어매니티 그룹 이름
    private List<AmenityItemDto> amenities; // 그룹에 속한 어매니티 아이템 리스트
}
