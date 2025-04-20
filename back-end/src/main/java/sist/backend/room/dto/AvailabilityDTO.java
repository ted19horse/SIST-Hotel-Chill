package sist.backend.room.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 객실 가용성 정보를 담는 DTO 클래스입니다.
 * 
 * 이 클래스는 특정 객실 타입의 특정 기간 내 예약 가능 여부와
 * 남은 객실 수를 표현하는데 사용됩니다.
 * 
 * 초보자 가이드:
 * - DTO(Data Transfer Object)는 계층 간 데이터 전송에 사용되는 객체입니다.
 * - 이 DTO는 백엔드에서 프론트엔드로 객실 가용성 정보를 전달하는데 사용됩니다.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AvailabilityDTO {
    
    /**
     * 사용 가능한 객실 수
     * 특정 기간에 예약되지 않은 객실의 총 개수입니다.
     */
    private int available;
    
    /**
     * 예약 가능 여부
     * 사용 가능한 객실이 1개 이상이면 true, 아니면 false입니다.
     * 
     * 참고: Lombok은 boolean 필드에 대해 'is' 접두사 없이 필드를 선언해도
     * getter 메소드는 'is'로 시작하는 이름(isBookable)을 자동으로 생성합니다.
     */
    private boolean bookable;
}
