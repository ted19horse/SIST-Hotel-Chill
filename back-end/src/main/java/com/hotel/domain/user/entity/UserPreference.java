package com.hotel.domain.user.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 사용자 선호도 엔티티
 */
@Entity
@Table(name = "user_preferences")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserPreference {

    /**
     * 사용자 선호도 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_preferences_id")
    private Long id;

    /**
     * 사용자
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    /**
     * 선호도 유형
     */
    @Column(name = "preference_type", nullable = false, length = 50)
    private String preferenceType;

    /**
     * 선호도 키
     */
    @Column(name = "preference_key", nullable = false, length = 50)
    private String preferenceKey;

    /**
     * 선호도 값
     */
    @Column(name = "preference_value", nullable = false, length = 255)
    private String preferenceValue;

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public UserPreference(User user, String preferenceType, String preferenceKey,
            String preferenceValue) {
        this.user = user;
        this.preferenceType = preferenceType;
        this.preferenceKey = preferenceKey;
        this.preferenceValue = preferenceValue;
    }

    /**
     * 선호도 값 업데이트
     */
    public void updateValue(String preferenceValue) {
        this.preferenceValue = preferenceValue;
    }
}
