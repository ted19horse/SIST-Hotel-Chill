package sist.backend.room.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * AmenityItems 테이블 구조와 1:1로 매핑되는 DTO입니다.
 * - amenityItemsId: 어메니티 아이템 PK (BIGINT)
 * - amenityGroupsId: 소속 그룹 FK (BIGINT)
 * - name: 아이템 이름 (VARCHAR(100))
 * - iconName: 아이콘 이름 (VARCHAR(50))
 * - sortOrder: 정렬 순서 (INT)
 * - createdAt: 생성일시 (TIMESTAMP)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AmenityItemDto {
    private Long amenityItemsId; // 어메니티 아이템 PK
    private Long amenityGroupsId; // 소속 그룹 FK
    private String name; // 아이템 이름
    private String iconName; // 아이콘 이름
    private Integer sortOrder; // 정렬 순서
    private String createdAt; // 생성일시(문자열로 반환, 필요시 Timestamp로 변경)
}
