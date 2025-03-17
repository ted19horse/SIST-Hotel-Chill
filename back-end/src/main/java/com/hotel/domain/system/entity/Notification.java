package com.hotel.domain.system.entity;

import java.time.LocalDateTime;
import com.hotel.domain.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
 * 알림 엔티티
 */
@Entity
@Table(name = "notifications")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notification {

    /**
     * 알림 유형 열거형
     */
    public enum NotificationType {
        SYSTEM, RESERVATION, ORDER, PAYMENT, PROMOTION, MEMBERSHIP
    }

    /**
     * 알림 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    /**
     * 수신자
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * 알림 유형
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "notification_type", nullable = false, length = 20)
    private NotificationType type;

    /**
     * 알림 제목
     */
    @Column(name = "title", nullable = false, length = 100)
    private String title;

    /**
     * 알림 내용
     */
    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    /**
     * 읽음 여부
     */
    @Column(name = "is_read", nullable = false)
    private boolean isRead;

    /**
     * 링크 URL
     */
    @Column(name = "link_url", length = 255)
    private String linkUrl;

    /**
     * 생성일시
     */
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    /**
     * 읽은 일시
     */
    @Column(name = "read_at")
    private LocalDateTime readAt;

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public Notification(User user, NotificationType type, String title, String content,
            String linkUrl) {
        this.user = user;
        this.type = type;
        this.title = title;
        this.content = content;
        this.linkUrl = linkUrl;
        this.isRead = false;
        this.createdAt = LocalDateTime.now();
    }

    /**
     * 알림을 읽음 상태로 변경
     */
    public void markAsRead() {
        if (!this.isRead) {
            this.isRead = true;
            this.readAt = LocalDateTime.now();
        }
    }

    /**
     * 알림을 읽지 않음 상태로 변경
     */
    public void markAsUnread() {
        if (this.isRead) {
            this.isRead = false;
            this.readAt = null;
        }
    }

    /**
     * 시스템 알림 생성 정적 팩토리 메서드
     */
    public static Notification createSystemNotification(User user, String title, String content,
            String linkUrl) {
        return Notification.builder().user(user).type(NotificationType.SYSTEM).title(title)
                .content(content).linkUrl(linkUrl).build();
    }

    /**
     * 예약 알림 생성 정적 팩토리 메서드
     */
    public static Notification createReservationNotification(User user, String title,
            String content, String linkUrl) {
        return Notification.builder().user(user).type(NotificationType.RESERVATION).title(title)
                .content(content).linkUrl(linkUrl).build();
    }
}
