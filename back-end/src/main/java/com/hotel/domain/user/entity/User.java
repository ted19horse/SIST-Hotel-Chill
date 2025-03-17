package com.hotel.domain.user.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import com.hotel.global.entity.BaseTimeEntity;
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
 * 사용자 엔티티
 */
@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity {

    /**
     * 사용자 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "users_id")
    private Long id;

    /**
     * 이메일
     */
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    /**
     * 비밀번호
     */
    @Column(nullable = false, length = 60)
    private String password;

    /**
     * 이름
     */
    @Column(nullable = false, length = 50)
    private String name;

    /**
     * 전화번호
     */
    @Column(nullable = false, length = 20)
    private String phone;

    /**
     * 생년월일
     */
    @Column(name = "birth_date")
    private LocalDate birthDate;

    /**
     * 주소
     */
    @Column(length = 255)
    private String address;

    /**
     * 마지막 로그인 시간
     */
    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    /**
     * 상태
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private UserStatus status;

    /**
     * 역할
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private UserRole role;

    /**
     * 사용자 상태 열거형
     */
    public enum UserStatus {
        ACTIVE, INACTIVE, SUSPENDED, DELETED
    }

    /**
     * 사용자 역할 열거형
     */
    public enum UserRole {
        USER, ADMIN, MANAGER
    }

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public User(String email, String password, String name, String phone, LocalDate birthDate,
            String address, UserStatus status, UserRole role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.birthDate = birthDate;
        this.address = address;
        this.status = status != null ? status : UserStatus.ACTIVE;
        this.role = role != null ? role : UserRole.USER;
    }

    /**
     * 사용자 정보 업데이트
     */
    public void update(String name, String phone, LocalDate birthDate, String address) {
        this.name = name;
        this.phone = phone;
        this.birthDate = birthDate;
        this.address = address;
    }

    /**
     * 비밀번호 변경
     */
    public void changePassword(String password) {
        this.password = password;
    }

    /**
     * 로그인 시간 업데이트
     */
    public void updateLastLogin() {
        this.lastLogin = LocalDateTime.now();
    }

    /**
     * 사용자 상태 변경
     */
    public void changeStatus(UserStatus status) {
        this.status = status;
    }

    /**
     * 사용자 역할 변경
     */
    public void changeRole(UserRole role) {
        this.role = role;
    }
}
