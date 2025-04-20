package sist.backend.room.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.core.Tuple;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import sist.backend.room.dto.AmenityGroupDto;
import sist.backend.room.dto.AmenityItemDto;
import sist.backend.room.dto.RoomTypeWithAmenitiesDto;
import sist.backend.room.entity.AmenityGroups;
import sist.backend.room.entity.AmenityItems;
import sist.backend.room.entity.QAmenityGroups;
import sist.backend.room.entity.QAmenityItems;
import sist.backend.room.entity.QRoomTypes;
import sist.backend.room.entity.RoomTypes;
import sist.backend.room.entity.QRoomTypeAmenityGroups;

import java.util.*;

/**
 * QueryDSL fetch join을 사용해 RoomTypes-AmenityGroups-AmenityItems 계층 데이터를 한 번에 조회하는 구현체입니다.
 * 중복 데이터는 Map을 활용해 계층 구조로 변환합니다.
 */
@Repository
@RequiredArgsConstructor
public class RoomTypesRepositoryImpl implements RoomTypesRepositoryCustom {
    @PersistenceContext
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    @Override
    public List<RoomTypeWithAmenitiesDto> findAllRoomTypesWithAmenities() {
        // =============================
        // 1. QueryDSL Q타입 객체 선언
        // =============================
        // Q타입은 각 엔티티(RoomTypes, AmenityGroups 등)에 대해 QueryDSL이 자동 생성하는 쿼리 전용 클래스입니다.
        // Q타입을 사용하면 SQL문이 아닌 자바 코드로 타입 안전하게 동적 쿼리를 작성할 수 있습니다.
        QRoomTypes roomTypes = QRoomTypes.roomTypes; // 객실 유형(마스터)
        QRoomTypeAmenityGroups mapping = QRoomTypeAmenityGroups.roomTypeAmenityGroups; // 객실-어메니티 그룹 매핑
        QAmenityGroups amenityGroup = QAmenityGroups.amenityGroups; // 어메니티 그룹
        QAmenityItems amenityItem = QAmenityItems.amenityItems; // 어메니티 아이템

        /*
         =============================
         2. QueryDSL 쿼리 작성 및 실행 (fetch join)
         =============================
         - from(roomTypes): 객실 유형(RoomTypes) 테이블을 기준으로 쿼리 시작
         - leftJoin(roomTypes.roomTypeAmenityGroups, mapping): 객실-어메니티 그룹 매핑 테이블과 LEFT OUTER JOIN
         - leftJoin(mapping.amenityGroups, amenityGroup): 매핑 테이블에서 어메니티 그룹 테이블과 LEFT OUTER JOIN
         - leftJoin(amenityGroup.amenityItems, amenityItem): 어메니티 그룹에서 어메니티 아이템 테이블과 LEFT OUTER JOIN
         - select(roomTypes, amenityGroup, amenityItem): 각 조인 결과를 Tuple(복합 row)로 반환
         - fetchJoin(): 실제 SQL 쿼리에서 join fetch를 사용하여 N+1 문제 방지
         - distinct(): 중복 row 제거
         - fetch(): 쿼리 실행 및 결과 리스트 반환
         */
        List<Tuple> results = queryFactory
                .select(roomTypes, amenityGroup, amenityItem)
                .from(roomTypes)
                .leftJoin(roomTypes.roomTypeAmenityGroups, mapping)
                .leftJoin(mapping.amenityGroups, amenityGroup)
                .leftJoin(amenityGroup.amenityItems, amenityItem)
                .fetchJoin()
                .distinct()
                .fetch();

        /*
         =============================
         3. 쿼리 결과를 계층적 DTO로 변환
         =============================
         - 쿼리 결과는 Tuple(객실, 어메니티 그룹, 어메니티 아이템)이 납작한(flat) 구조로 반환됨
         - 중복 데이터를 제거하고, 아래와 같은 계층 구조로 변환함
           RoomTypeWithAmenitiesDto {
               Long roomTypesId;
               String name;
               String description;
               List<AmenityGroupDto> amenityGroups;
           }
           AmenityGroupDto {
               Long groupId;
               String name;
               List<AmenityItemDto> amenities;
           }
           AmenityItemDto {
               Long itemId;
               String name;
           }
         - Map을 활용해 중복된 그룹/아이템을 한 번만 추가
         */
        Map<Long, RoomTypeWithAmenitiesDto> roomTypeMap = new LinkedHashMap<>();
        for (Tuple tuple : results) {
            // (1) 객실 유형(RoomTypes) 엔티티 추출
            RoomTypes rt = tuple.get(roomTypes);
            if (rt == null) continue; // LEFT JOIN이므로 NULL 가능
            // roomTypeMap에 없으면 새 DTO 생성, 있으면 기존 DTO 반환
            RoomTypeWithAmenitiesDto roomDto = roomTypeMap.computeIfAbsent(rt.getRoomTypesId(), id ->
                    // RoomType 엔티티의 모든 필드를 DTO에 전달
                    new RoomTypeWithAmenitiesDto(
                        rt.getRoomTypesId(),              // roomTypesId
                        rt.getName(),                     // name
                        rt.getDescription(),              // description
                        rt.getSize(),                     // size
                        rt.getMaxAdults(),                // maxAdults
                        rt.getMaxChildren(),              // maxChildren
                        rt.getWeekdayPrice(),             // weekdayPrice
                        rt.getWeekendPrice(),             // weekendPrice
                        rt.getPeakSeasonPrice(),          // peakSeasonPrice
                        rt.getBuilding(),                 // building
                        rt.getFloorCount(),               // floorCount
                        rt.getRoomsPerFloor(),            // roomsPerFloor
                        rt.getViewType(),                 // viewType
                        rt.getViewType_kor(),             // viewType_kor
                        rt.getImageUrl(),                 // imageUrl
                        new ArrayList<>()                 // amenityGroups
                    )
            );

            // (2) 어메니티 그룹(AmenityGroups) 엔티티 추출
            AmenityGroups group = tuple.get(amenityGroup);

            if (group != null) {
                // 이미 추가된 AmenityGroupDto가 있는지 확인 (groupId는 엔티티의 PK)
                AmenityGroupDto groupDto = roomDto.getAmenityGroups().stream()
                        .filter(g -> g.getAmenityGroupsId().equals(group.getAmenityGroupsId()))
                        .findFirst()
                        .orElseGet(() -> {
                            // 없으면 새로 생성해서 추가 (DDL.sql 기준 모든 필드 전달)
                            AmenityGroupDto newGroup = new AmenityGroupDto(
                                group.getAmenityGroupsId(),
                                group.getName(),
                                group.getName_kor(),
                                group.getIconName(),
                                group.getSortOrder(),
                                group.getCreatedAt() != null ? group.getCreatedAt().toString() : null,
                                new ArrayList<>()
                            );
                            roomDto.getAmenityGroups().add(newGroup);
                            return newGroup;
                        });

                // (3) 어메니티 아이템(AmenityItems) 엔티티 추출
                AmenityItems item = tuple.get(amenityItem);
                if (item != null) {
                    // 이미 추가된 AmenityItemDto가 있는지 확인 (amenityItemsId는 엔티티의 PK)
                    boolean exists = groupDto.getAmenities().stream()
                            .anyMatch(i -> i.getAmenityItemsId().equals(item.getAmenityItemsId()));
                    if (!exists) {
                        // 없으면 새로 추가 (DDL.sql 기준 모든 필드 전달)
                        groupDto.getAmenities().add(
                            new AmenityItemDto(
                                item.getAmenityItemsId(),
                                item.getAmenityGroups() != null ? item.getAmenityGroups().getAmenityGroupsId() : null,
                                item.getName(),
                                item.getIconName(),
                                item.getSortOrder(),
                                item.getCreatedAt() != null ? item.getCreatedAt().toString() : null
                            )
                        );
                    }
                }
            }
        }
        // 최종적으로 모든 RoomTypeWithAmenitiesDto를 리스트로 반환
        return new ArrayList<>(roomTypeMap.values());
    }
}
