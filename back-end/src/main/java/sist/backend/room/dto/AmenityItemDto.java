package sist.backend.room.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * AmenityItemDto는 각 객실 어매니티 그룹에 포함되는 개별 어매니티(예: 샴푸, TV 등)를 표현하는 DTO입니다.
 * - itemId: 어매니티 아이템의 고유 ID
 * - itemName: 어매니티 아이템의 이름
 * @Data: Lombok이 getter/setter, toString, equals, hashCode를 자동 생성합니다.
 * @NoArgsConstructor: Lombok이 파라미터 없는 기본 생성자를 자동 생성합니다.
 * @AllArgsConstructor: Lombok이 모든 필드를 파라미터로 받는 생성자를 자동 생성합니다.
 * @Getter: Lombok이 각 필드에 대한 getter 메서드를 자동 생성합니다. (중복 방지용, @Data와 함께 사용 시 실수 방지)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AmenityItemDto {
    private Long itemId; // 어매니티 아이템 ID
    private String itemName; // 어매니티 아이템 이름
}
