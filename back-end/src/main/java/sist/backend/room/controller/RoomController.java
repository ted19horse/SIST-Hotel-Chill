package sist.backend.room.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sist.backend.room.dto.RoomFilterDTO;
import sist.backend.room.dto.RoomTypeWithAmenitiesDto;
import sist.backend.room.service.RoomService;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 객실 정보 및 예약 관련 API를 제공하는 컨트롤러입니다.
 * 
 * 초보자 가이드:
 * - RestController는 HTTP 요청을 처리하고 JSON 형태로 응답을 반환하는 컨트롤러입니다.
 * - 각 메소드는 특정 API 엔드포인트에 매핑됩니다.
 * - @GetMapping은 HTTP GET 요청을, @PostMapping은 HTTP POST 요청을 처리합니다.
 */
@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {
    // 기존 repository 대신 service를 주입받아 사용합니다.
    private final RoomService roomService;

    /**
     * 모든 객실 타입과 어매니티 그룹/아이템 정보를 계층적 JSON으로 반환하는 엔드포인트입니다.
     * 오늘 날짜 기준으로 각 객실 유형별 가용성 정보도 함께 반환합니다.
     * 
     * @return 객실 타입 정보 리스트 (어메니티 및 가용성 정보 포함)
     */
    @GetMapping("/getRoomTypes")
    public List<RoomTypeWithAmenitiesDto> getRoomTypes() {
        return roomService.getAllRoomTypesWithAmenities();
    }

    /**
     * 필터링 조건에 맞는 객실 타입 정보를 반환하는 엔드포인트입니다.
     * 체크인/체크아웃 날짜, 인원수, 객실 등급, 가격 범위, 전망 타입 등의 조건으로 필터링합니다.
     * 
     * @param requestMap 필터링 조건이 담긴 Map 객체
     * @return 필터링된 객실 타입 정보 리스트 (어메니티 및 가용성 정보 포함)
     */
    @PostMapping("/search")
    public List<RoomTypeWithAmenitiesDto> searchRooms(@RequestBody Map<String, Object> requestMap) {
        // 디버깅을 위한 출력 (실제 운영 환경에서는 로깅으로 대체)
        requestMap.forEach((key, value) -> System.out.println(key + ": " + value));
        
        // Map 형태의 요청을 RoomFilterDTO로 변환
        RoomFilterDTO filter = convertMapToFilter(requestMap);
        
        // 서비스 계층을 통해 필터링된 객실 타입 정보 조회
        return roomService.getFilteredRoomTypes(filter);
    }
    
    /**
     * Map 형태의 요청을 RoomFilterDTO로 변환하는 메소드입니다.
     * 
     * @param requestMap 요청 데이터가 담긴 Map 객체
     * @return 변환된 RoomFilterDTO 객체
     */
    private RoomFilterDTO convertMapToFilter(Map<String, Object> requestMap) {
        RoomFilterDTO filter = new RoomFilterDTO();
        
        try {
            // 체크인/체크아웃 날짜 변환
            if (requestMap.containsKey("checkIn") && requestMap.get("checkIn") != null 
                    && !requestMap.get("checkIn").toString().isEmpty()) {
                try {
                    // 문자열을 LocalDate로 변환 (yyyy-MM-dd 형식 기대)
                    filter.setCheckIn(LocalDate.parse(requestMap.get("checkIn").toString()));
                } catch (DateTimeParseException e) {
                    System.err.println("체크인 날짜 파싱 오류: " + e.getMessage());
                    // 오류 시 null 유지 (기본값 사용)
                }
            }
            
            if (requestMap.containsKey("checkOut") && requestMap.get("checkOut") != null 
                    && !requestMap.get("checkOut").toString().isEmpty()) {
                try {
                    // 문자열을 LocalDate로 변환 (yyyy-MM-dd 형식 기대)
                    filter.setCheckOut(LocalDate.parse(requestMap.get("checkOut").toString()));
                } catch (DateTimeParseException e) {
                    System.err.println("체크아웃 날짜 파싱 오류: " + e.getMessage());
                    // 오류 시 null 유지 (기본값 사용)
                }
            }
            
            // 인원수 변환
            if (requestMap.containsKey("adults") && requestMap.get("adults") != null) {
                try {
                    filter.setAdults(Integer.parseInt(requestMap.get("adults").toString()));
                } catch (NumberFormatException e) {
                    System.err.println("성인 인원수 파싱 오류: " + e.getMessage());
                    // 오류 시 null 유지 (기본값 사용)
                }
            }
            
            if (requestMap.containsKey("children") && requestMap.get("children") != null) {
                try {
                    filter.setChildren(Integer.parseInt(requestMap.get("children").toString()));
                } catch (NumberFormatException e) {
                    System.err.println("아동 인원수 파싱 오류: " + e.getMessage());
                    // 오류 시 null 유지 (기본값 사용)
                }
            }
            
            // 객실 등급 변환
            if (requestMap.containsKey("roomGrade") && requestMap.get("roomGrade") != null) {
                try {
                    // ArrayList로 형변환 (프론트엔드에서는 배열로 전송)
                    @SuppressWarnings("unchecked")
                    List<String> roomGrades = (List<String>) requestMap.get("roomGrade");
                    filter.setRoomGrade(roomGrades);
                } catch (ClassCastException e) {
                    System.err.println("객실 등급 파싱 오류: " + e.getMessage());
                    // 오류 시 빈 리스트로 설정
                    filter.setRoomGrade(new ArrayList<>());
                }
            }
            
            // 가격 범위 변환
            if (requestMap.containsKey("priceRange") && requestMap.get("priceRange") != null) {
                try {
                    @SuppressWarnings("unchecked")
                    List<Integer> priceList = (List<Integer>) requestMap.get("priceRange");
                    if (priceList.size() >= 2) {
                        filter.setPriceRange(new int[] {priceList.get(0), priceList.get(1)});
                    }
                } catch (Exception e) {
                    System.err.println("가격 범위 파싱 오류: " + e.getMessage());
                    // 오류 시 기본값으로 설정 (0 ~ 최대값)
                    filter.setPriceRange(new int[] {0, Integer.MAX_VALUE});
                }
            }
            
            // 전망 타입 변환
            if (requestMap.containsKey("viewType") && requestMap.get("viewType") != null) {
                try {
                    @SuppressWarnings("unchecked")
                    List<String> viewTypes = (List<String>) requestMap.get("viewType");
                    filter.setViewType(viewTypes);
                } catch (ClassCastException e) {
                    System.err.println("전망 타입 파싱 오류: " + e.getMessage());
                    // 오류 시 빈 리스트로 설정
                    filter.setViewType(new ArrayList<>());
                }
            }
        } catch (Exception e) {
            System.err.println("필터 변환 중 오류 발생: " + e.getMessage());
            // 오류 시 기본 필터 객체 반환 (필터가 없는 상태)
            return new RoomFilterDTO();
        }
        
        return filter;
    }
}
