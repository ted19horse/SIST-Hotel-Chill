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
 * 시스템 로그 엔티티
 */
@Entity
@Table(name = "logs")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Log {

    /**
     * 로그 레벨 열거형
     */
    public enum LogLevel {
        INFO, WARNING, ERROR, DEBUG, CRITICAL
    }

    /**
     * 로그 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Long id;

    /**
     * 로그 레벨
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "log_level", nullable = false, length = 20)
    private LogLevel level;

    /**
     * 로그 메시지
     */
    @Column(name = "message", nullable = false, columnDefinition = "TEXT")
    private String message;

    /**
     * 로그 소스
     */
    @Column(name = "source", length = 100)
    private String source;

    /**
     * 스택 트레이스
     */
    @Column(name = "stack_trace", columnDefinition = "TEXT")
    private String stackTrace;

    /**
     * 사용자 ID
     */
    @Column(name = "user_id")
    private Long userId;

    /**
     * IP 주소
     */
    @Column(name = "ip_address", length = 45)
    private String ipAddress;

    /**
     * 생성일시
     */
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public Log(LogLevel level, String message, String source, String stackTrace, Long userId,
            String ipAddress) {
        this.level = level;
        this.message = message;
        this.source = source;
        this.stackTrace = stackTrace;
        this.userId = userId;
        this.ipAddress = ipAddress;
        this.createdAt = LocalDateTime.now();
    }

    /**
     * INFO 레벨 로그 생성 정적 팩토리 메서드
     */
    public static Log info(String message, String source, Long userId, String ipAddress) {
        return Log.builder().level(LogLevel.INFO).message(message).source(source).userId(userId)
                .ipAddress(ipAddress).build();
    }

    /**
     * ERROR 레벨 로그 생성 정적 팩토리 메서드
     */
    public static Log error(String message, String source, String stackTrace, Long userId,
            String ipAddress) {
        return Log.builder().level(LogLevel.ERROR).message(message).source(source)
                .stackTrace(stackTrace).userId(userId).ipAddress(ipAddress).build();
    }
}
