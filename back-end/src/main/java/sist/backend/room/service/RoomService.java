package sist.backend.room.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sist.backend.room.dto.AvailabilityDTO;
import sist.backend.room.dto.RoomFilterDTO;
import sist.backend.room.dto.RoomTypeWithAmenitiesDto;
import sist.backend.room.repository.RoomTypesRepositoryCustom;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * RoomService는 객실(RoomType) 및 어매니티(Amenity) 관련 비즈니스 로직을 담당합니다.
 * 객실 정보 조회, 가용성 확인, 필터링 등의 기능을 제공합니다.
 * 
 * 초보자 가이드:
 * - Service 계층은 비즈니스 로직을 담당하는 계층입니다.
 * - Controller와 Repository 사이에서 데이터 처리와 변환을 담당합니다.
 * - 이 클래스에서는 객실 정보 조회, 가용성 확인, 필터링 기능을 제공합니다.
 */
@Service
@RequiredArgsConstructor
public class RoomService {
    
    /**
     * 커스텀 리포지토리를 주입받아 사용합니다.
     * QueryDSL을 통해 복잡한 객실 타입과 어메니티 정보를 조회합니다.
     */
    private final RoomTypesRepositoryCustom roomTypesRepositoryCustom;
    
    /**
     * EntityManager를 주입받아 사용합니다.
     * Native Query 등을 실행하기 위해 사용됩니다.
     */
    @PersistenceContext
    private EntityManager entityManager;

    /**
     * 모든 객실 타입과 어메니티 정보를 반환합니다.
     * 추가적으로 현재 날짜 기준의 가용성 정보도 포함합니다.
     * 
     * @return 어메니티 정보와 가용성 정보가 포함된 객실 타입 리스트
     */
    public List<RoomTypeWithAmenitiesDto> getAllRoomTypesWithAmenities() {
        // 기존 메소드를 통해 객실 타입과 어메니티 정보를 조회합니다.
        List<RoomTypeWithAmenitiesDto> roomTypes = roomTypesRepositoryCustom.findAllRoomTypesWithAmenities();
        
        // 오늘 날짜와 내일 날짜를 기준으로 가용성 정보를 추가합니다.
        LocalDate today = LocalDate.now();
        LocalDate tomorrow = today.plusDays(1);
        addAvailabilityInfo(roomTypes, today, tomorrow);
        
        return roomTypes;
    }
    
    /**
     * 필터링 조건에 맞는 객실 타입과 가용성 정보를 반환합니다.
     * 
     * @param filter 필터링 조건을 담은 DTO
     * @return 필터링 조건에 맞는 객실 타입 리스트 (가용성 정보 포함)
     */
    public List<RoomTypeWithAmenitiesDto> getFilteredRoomTypes(RoomFilterDTO filter) {
        // 1. 모든 객실 타입과 어메니티 정보를 조회합니다.
        List<RoomTypeWithAmenitiesDto> roomTypes = roomTypesRepositoryCustom.findAllRoomTypesWithAmenities();
        
        // 2. 필터링 조건이 있으면 필터링합니다.
        if (filter != null) {
            roomTypes = filterRoomTypes(roomTypes, filter);
            
            // 3. 날짜 기반 가용성 정보를 추가합니다.
            LocalDate checkIn = filter.getCheckIn() != null ? filter.getCheckIn() : LocalDate.now();
            LocalDate checkOut = filter.getCheckOut() != null ? filter.getCheckOut() : checkIn.plusDays(1);
            addAvailabilityInfo(roomTypes, checkIn, checkOut);
        } else {
            // 필터가 null인 경우 오늘 날짜 기준으로 가용성 정보 추가
            addAvailabilityInfo(roomTypes, LocalDate.now(), LocalDate.now().plusDays(1));
        }
        
        return roomTypes;
    }
    
    /**
     * 객실 타입 리스트에 가용성 정보를 추가합니다.
     * 
     * @param roomTypes 가용성 정보를 추가할 객실 타입 리스트
     * @param checkIn 체크인 날짜
     * @param checkOut 체크아웃 날짜
     */
    private void addAvailabilityInfo(List<RoomTypeWithAmenitiesDto> roomTypes, LocalDate checkIn, LocalDate checkOut) {
        for (RoomTypeWithAmenitiesDto roomType : roomTypes) {
            // 해당 객실 타입의 총 객실 수를 조회합니다.
            int totalRooms = getTotalRoomCount(roomType.getId());
            
            // 해당 기간에 예약된 객실 수를 조회합니다.
            int bookedRooms = getBookedRoomCount(roomType.getId(), checkIn, checkOut);
            
            // 사용 가능한 객실 수를 계산합니다.
            int availableRooms = totalRooms - bookedRooms;
            
            // 가용성 정보를 설정합니다.
            roomType.setAvailability(new AvailabilityDTO(
                availableRooms,
                availableRooms > 0  // 사용 가능한 객실이 1개 이상이면 예약 가능
            ));
        }
    }
    
    /**
     * 객실 타입별 총 객실 수를 조회합니다.
     * 
     * @param roomTypeId 객실 타입 ID
     * @return 해당 객실 타입의 총 객실 수
     */
    private int getTotalRoomCount(Long roomTypeId) {
        // Native SQL 쿼리를 사용하여 해당 객실 타입의 총 객실 수를 조회합니다.
        Query query = entityManager.createNativeQuery(
            "SELECT COUNT(*) FROM rooms WHERE room_types_id = :roomTypeId AND status = 'AVAILABLE'"
        );
        query.setParameter("roomTypeId", roomTypeId);
        
        Number result = (Number) query.getSingleResult();
        return result != null ? result.intValue() : 0;
    }
    
    /**
     * 특정 기간에 예약된 객실 수를 조회합니다.
     * 
     * @param roomTypeId 객실 타입 ID
     * @param checkIn 체크인 날짜
     * @param checkOut 체크아웃 날짜
     * @return 해당 기간에 예약된 객실 수
     */
    private int getBookedRoomCount(Long roomTypeId, LocalDate checkIn, LocalDate checkOut) {
        // Native SQL 쿼리를 사용하여 해당 기간에 예약된 객실 수를 조회합니다.
        Query query = entityManager.createNativeQuery(
            "SELECT COUNT(DISTINCT r.rooms_id) FROM rooms r " +
            "JOIN room_reservations rr ON r.rooms_id = rr.rooms_id " +
            "WHERE r.room_types_id = :roomTypeId " +
            "AND rr.status NOT IN ('CANCELED', 'COMPLETED') " +
            "AND ((rr.check_in_date <= :checkOut AND rr.check_out_date >= :checkIn))"
        );
        query.setParameter("roomTypeId", roomTypeId);
        query.setParameter("checkIn", checkIn);
        query.setParameter("checkOut", checkOut);
        
        Number result = (Number) query.getSingleResult();
        return result != null ? result.intValue() : 0;
    }
    
    /**
     * 필터 조건에 따라 객실 타입을 필터링합니다.
     * 
     * @param roomTypes 필터링할 객실 타입 리스트
     * @param filter 필터링 조건
     * @return 필터링된 객실 타입 리스트
     */
    private List<RoomTypeWithAmenitiesDto> filterRoomTypes(List<RoomTypeWithAmenitiesDto> roomTypes, RoomFilterDTO filter) {
        return roomTypes.stream()
            .filter(roomType -> {
                // 1. 인원 수 필터 (성인)
                if (filter.getAdults() != null && filter.getAdults() > 0 && 
                    roomType.getMaxAdults() < filter.getAdults()) {
                    return false; // 최대 성인 수용 인원보다 많으면 필터링
                }
                
                // 2. 인원 수 필터 (아동)
                if (filter.getChildren() != null && filter.getChildren() > 0 && 
                    roomType.getMaxChildren() < filter.getChildren()) {
                    return false; // 최대 아동 수용 인원보다 많으면 필터링
                }
                
                // 3. 가격 범위 필터
                if (filter.getPriceRange() != null && filter.getPriceRange().length == 2) {
                    int minPrice = filter.getPriceRange()[0];
                    int maxPrice = filter.getPriceRange()[1];
                    
                    // 평일 가격이 범위 밖이면 필터링
                    if (roomType.getWeekdayPrice() < minPrice || roomType.getWeekdayPrice() > maxPrice) {
                        return false;
                    }
                }
                
                // 4. 객실 등급 필터
                if (filter.getRoomGrade() != null && !filter.getRoomGrade().isEmpty()) {
                    // 객실 등급 매핑 (frontend의 key -> 실제 객실 이름 패턴)
                    boolean matchesGrade = filter.getRoomGrade().stream()
                        .anyMatch(grade -> {
                            String roomName = roomType.getName().toLowerCase();
                            return (grade.equals("standard") && roomName.contains("스탠다드")) ||
                                   (grade.equals("deluxe") && roomName.contains("디럭스")) ||
                                   (grade.equals("premium") && roomName.contains("프리미엄")) ||
                                   (grade.equals("presidential") && roomName.contains("프레지덴셜"));
                        });
                    
                    if (!matchesGrade) {
                        return false; // 등급이 일치하지 않으면 필터링
                    }
                }
                
                // 5. 전망 필터
                if (filter.getViewType() != null && !filter.getViewType().isEmpty() && 
                    !filter.getViewType().contains(roomType.getViewType())) {
                    return false; // 전망 타입이 일치하지 않으면 필터링
                }
                
                // 모든 필터를 통과하면 true
                return true;
            })
            .collect(Collectors.toList());
    }
}
