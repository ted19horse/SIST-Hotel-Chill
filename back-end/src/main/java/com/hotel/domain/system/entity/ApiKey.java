package com.hotel.domain.system.entity;

import java.time.LocalDateTime;
import java.util.UUID;
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
 * API 키 엔티티
 */
@Entity
@Table(name = "api_keys")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ApiKey {

    /**
     * API 키 유형 열거형
     */
    public enum ApiKeyType {
        ADMIN, CLIENT, PARTNER, SYSTEM
    }

    /**
     * API 키 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "api_key_id")
    private Long id;

    /**
     * API 키 이름
     */
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    /**
     * API 키 값
     */
    @Column(name = "api_key", nullable = false, unique = true, length = 64)
    private String apiKey;

    /**
     * API 키 유형
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "key_type", nullable = false, length = 20)
    private ApiKeyType keyType;

    /**
     * 활성화 여부
     */
    @Column(name = "is_active", nullable = false)
    private boolean isActive;

    /**
     * 만료일시
     */
    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    /**
     * 마지막 사용일시
     */
    @Column(name = "last_used_at")
    private LocalDateTime lastUsedAt;

    /**
     * 생성일시
     */
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    /**
     * 수정일시
     */
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public ApiKey(String name, ApiKeyType keyType, LocalDateTime expiresAt) {
        this.name = name;
        this.apiKey = generateApiKey();
        this.keyType = keyType;
        this.isActive = true;
        this.expiresAt = expiresAt;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * API 키 생성
     */
    private String generateApiKey() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    /**
     * API 키 정보 업데이트
     */
    public void update(String name, ApiKeyType keyType, LocalDateTime expiresAt) {
        this.name = name;
        this.keyType = keyType;
        this.expiresAt = expiresAt;
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * API 키 재생성
     */
    public void regenerateKey() {
        this.apiKey = generateApiKey();
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * 활성화 상태 변경
     */
    public void changeActiveStatus(boolean isActive) {
        this.isActive = isActive;
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * 마지막 사용 시간 업데이트
     */
    public void updateLastUsedAt() {
        this.lastUsedAt = LocalDateTime.now();
    }

    /**
     * API 키가 유효한지 확인
     */
    public boolean isValid() {
        if (!isActive) {
            return false;
        }

        if (expiresAt != null && LocalDateTime.now().isAfter(expiresAt)) {
            return false;
        }

        return true;
    }
}
