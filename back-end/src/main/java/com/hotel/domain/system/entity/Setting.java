package com.hotel.domain.system.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 시스템 설정 엔티티
 */
@Entity
@Table(name = "settings")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Setting {

    /**
     * 설정 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "settings_id")
    private Long id;

    /**
     * 설정 키
     */
    @Column(name = "setting_key", nullable = false, unique = true, length = 100)
    private String key;

    /**
     * 설정 값
     */
    @Column(name = "setting_value", nullable = false, columnDefinition = "TEXT")
    private String value;

    /**
     * 설정 그룹
     */
    @Column(name = "setting_group", nullable = false, length = 50)
    private String group;

    /**
     * 설명
     */
    @Column(length = 255)
    private String description;

    /**
     * 수정일시
     */
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public Setting(String key, String value, String group, String description) {
        this.key = key;
        this.value = value;
        this.group = group;
        this.description = description;
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * 설정 값 업데이트
     */
    public void updateValue(String value) {
        this.value = value;
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * 설정 정보 업데이트
     */
    public void update(String value, String group, String description) {
        this.value = value;
        this.group = group;
        this.description = description;
        this.updatedAt = LocalDateTime.now();
    }
}
