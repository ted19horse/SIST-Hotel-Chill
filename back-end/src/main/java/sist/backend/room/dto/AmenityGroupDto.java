package sist.backend.room.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * AmenityGroups 테이블 구조와 1:1로 매핑되는 DTO입니다.
 * - amenityGroupsId: 어메니티 그룹 PK (BIGINT)
 * - name: 그룹 이름 (VARCHAR(50))
 * - iconName: 아이콘 이름 (VARCHAR(50))
 * - sortOrder: 정렬 순서 (INT)
 * - createdAt: 생성일시 (TIMESTAMP)
 * - amenities: 해당 그룹에 포함된 AmenityItemDto 리스트
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AmenityGroupDto {
    private Long amenityGroupsId; // 어메니티 그룹 PK
    private String name; // 그룹 이름
    private String iconName; // 아이콘 이름
    private Integer sortOrder; // 정렬 순서
    private String createdAt; // 생성일시(문자열로 반환, 필요시 Timestamp로 변경)
    private List<AmenityItemDto> amenities; // 그룹에 포함된 아이템 리스트
}
