package sist.backend.room.entity;

import java.io.Serializable;
import java.util.Objects;

/**
 * RoomTypeAmenityGroupsId는 복합키(room_types_id, amenity_groups_id)를 위한 클래스입니다.
 * JPA의 @IdClass에서 사용되며, Serializable을 반드시 구현해야 합니다.
 */
public class RoomTypeAmenityGroupsId implements Serializable {
    private Long roomTypes;
    private Long amenityGroups;

    public RoomTypeAmenityGroupsId() {}
    public RoomTypeAmenityGroupsId(Long roomTypes, Long amenityGroups) {
        this.roomTypes = roomTypes;
        this.amenityGroups = amenityGroups;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RoomTypeAmenityGroupsId that = (RoomTypeAmenityGroupsId) o;
        return Objects.equals(roomTypes, that.roomTypes) && Objects.equals(amenityGroups, that.amenityGroups);
    }
    @Override
    public int hashCode() {
        return Objects.hash(roomTypes, amenityGroups);
    }
}
