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
 * 이메일 템플릿 엔티티
 */
@Entity
@Table(name = "email_templates")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EmailTemplate {

    /**
     * 이메일 템플릿 유형 열거형
     */
    public enum TemplateType {
        WELCOME, PASSWORD_RESET, ORDER_CONFIRMATION, RESERVATION_CONFIRMATION, RESERVATION_REMINDER, NEWSLETTER, PROMOTION
    }

    /**
     * 이메일 템플릿 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "template_id")
    private Long id;

    /**
     * 템플릿 코드
     */
    @Column(name = "template_code", nullable = false, unique = true, length = 50)
    private String code;

    /**
     * 템플릿 이름
     */
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    /**
     * 템플릿 유형
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "template_type", nullable = false, length = 30)
    private TemplateType type;

    /**
     * 이메일 제목
     */
    @Column(name = "subject", nullable = false, length = 200)
    private String subject;

    /**
     * 이메일 본문 (HTML)
     */
    @Column(name = "body_html", nullable = false, columnDefinition = "TEXT")
    private String bodyHtml;

    /**
     * 이메일 본문 (텍스트)
     */
    @Column(name = "body_text", columnDefinition = "TEXT")
    private String bodyText;

    /**
     * 활성화 여부
     */
    @Column(name = "is_active", nullable = false)
    private boolean isActive;

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
    public EmailTemplate(String code, String name, TemplateType type, String subject,
            String bodyHtml, String bodyText, boolean isActive) {
        this.code = code;
        this.name = name;
        this.type = type;
        this.subject = subject;
        this.bodyHtml = bodyHtml;
        this.bodyText = bodyText;
        this.isActive = isActive;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * 템플릿 정보 업데이트
     */
    public void update(String name, TemplateType type, String subject, String bodyHtml,
            String bodyText) {
        this.name = name;
        this.type = type;
        this.subject = subject;
        this.bodyHtml = bodyHtml;
        this.bodyText = bodyText;
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
     * 템플릿 내용에 변수 적용
     * 
     * @param content 템플릿 내용
     * @param variables 변수 맵
     * @return 변수가 적용된 내용
     */
    public static String applyVariables(String content, java.util.Map<String, String> variables) {
        if (content == null || variables == null) {
            return content;
        }

        String result = content;
        for (java.util.Map.Entry<String, String> entry : variables.entrySet()) {
            result = result.replace("{{" + entry.getKey() + "}}", entry.getValue());
        }
        return result;
    }

    /**
     * 변수가 적용된 HTML 본문 반환
     */
    public String getProcessedHtmlBody(java.util.Map<String, String> variables) {
        return applyVariables(this.bodyHtml, variables);
    }

    /**
     * 변수가 적용된 텍스트 본문 반환
     */
    public String getProcessedTextBody(java.util.Map<String, String> variables) {
        return applyVariables(this.bodyText, variables);
    }
}
