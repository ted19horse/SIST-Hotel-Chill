package com.hotel.domain.system.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 감사 로그 엔티티
 */
@Entity
@Table(name = "audits")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Audit {

    /**
     * 작업 유형 열거형
     */
    public enum ActionType {
        CREATE, READ, UPDATE, DELETE, LOGIN, LOGOUT, EXPORT
    }

    /**
     * 감사 로그 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "audit_id")
    private Long id;

    /**
     * 사용자 ID
     */
    @Column(name = "user_id")
    private Long userId;

    /**
     * 작업 유형
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "action_type", nullable = false, length = 20)
    private ActionType actionType;

    /**
     * 엔티티 이름
     */
    @Column(name = "entity_name", nullable = false, length = 100)
    private String entityName;

    /**
     * 엔티티 ID
     */
    @Column(name = "entity_id", length = 50)
    private String entityId;

    /**
     * 이전 데이터
     */
    @Column(name = "old_value", columnDefinition = "TEXT")
    private String oldValue;

    /**
     * 새 데이터
     */
    @Column(name = "new_value", columnDefinition = "TEXT")
    private String newValue;

    /**
     * IP 주소
     */
    @Column(name = "ip_address", length = 45)
    private String ipAddress;

    /**
     * 사용자 에이전트
     */
    @Column(name = "user_agent", length = 255)
    private String userAgent;

    /**
     * 생성일시
     */
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public Audit(Long userId, ActionType actionType, String entityName, String entityId,
            String oldValue, String newValue, String ipAddress, String userAgent) {
        this.userId = userId;
        this.actionType = actionType;
        this.entityName = entityName;
        this.entityId = entityId;
        this.oldValue = oldValue;
        this.newValue = newValue;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.createdAt = LocalDateTime.now();
    }

    /**
     * 생성 작업 감사 로그 생성 정적 팩토리 메서드
     */
    public static Audit createAudit(Long userId, String entityName, String entityId,
            String newValue, String ipAddress, String userAgent) {
        return Audit.builder().userId(userId).actionType(ActionType.CREATE).entityName(entityName)
                .entityId(entityId).newValue(newValue).ipAddress(ipAddress).userAgent(userAgent)
                .build();
    }

    /**
     * 수정 작업 감사 로그 생성 정적 팩토리 메서드
     */
    public static Audit updateAudit(Long userId, String entityName, String entityId,
            String oldValue, String newValue, String ipAddress, String userAgent) {
        return Audit.builder().userId(userId).actionType(ActionType.UPDATE).entityName(entityName)
                .entityId(entityId).oldValue(oldValue).newValue(newValue).ipAddress(ipAddress)
                .userAgent(userAgent).build();
    }

    /**
     * 삭제 작업 감사 로그 생성 정적 팩토리 메서드
     */
    public static Audit deleteAudit(Long userId, String entityName, String entityId,
            String oldValue, String ipAddress, String userAgent) {
        return Audit.builder().userId(userId).actionType(ActionType.DELETE).entityName(entityName)
                .entityId(entityId).oldValue(oldValue).ipAddress(ipAddress).userAgent(userAgent)
                .build();
    }
}
