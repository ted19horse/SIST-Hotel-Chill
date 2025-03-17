package com.hotel.domain.content.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import com.hotel.domain.user.entity.User;
import com.hotel.global.entity.BaseTimeEntity;
import jakarta.persistence.CascadeType;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 컨텐츠 엔티티
 */
@Entity
@Table(name = "contents")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Content extends BaseTimeEntity {

    /**
     * 컨텐츠 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contents_id")
    private Long id;

    /**
     * 제목
     */
    @Column(nullable = false, length = 255)
    private String title;

    /**
     * 내용
     */
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    /**
     * 컨텐츠 유형
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "content_type", nullable = false, length = 50)
    private ContentType contentType;

    /**
     * 시작일
     */
    @Column(name = "start_date")
    private LocalDate startDate;

    /**
     * 종료일
     */
    @Column(name = "end_date")
    private LocalDate endDate;

    /**
     * 게시 여부
     */
    @Column(name = "is_published", nullable = false)
    private Boolean isPublished;

    /**
     * 작성자
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    /**
     * 컨텐츠 이미지 목록
     */
    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ContentImage> images = new ArrayList<>();

    /**
     * 컨텐츠 유형 열거형
     */
    public enum ContentType {
        NEWS, EVENT, NOTICE, PROMOTION, FAQ, ABOUT
    }

    /**
     * 빌더 패턴을 사용한 생성자
     */
    @Builder
    public Content(String title, String content, ContentType contentType, LocalDate startDate,
            LocalDate endDate, Boolean isPublished, User author) {
        this.title = title;
        this.content = content;
        this.contentType = contentType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isPublished = isPublished != null ? isPublished : false;
        this.author = author;
    }

    /**
     * 컨텐츠 정보 업데이트
     */
    public void update(String title, String content, ContentType contentType, LocalDate startDate,
            LocalDate endDate, Boolean isPublished) {
        this.title = title;
        this.content = content;
        this.contentType = contentType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isPublished = isPublished;
    }

    /**
     * 게시 상태 변경
     */
    public void changePublishStatus(Boolean isPublished) {
        this.isPublished = isPublished;
    }

    /**
     * 컨텐츠 이미지 추가
     */
    public void addImage(ContentImage image) {
        this.images.add(image);
        image.setContent(this);
    }

    /**
     * 현재 활성화 여부 확인
     */
    public boolean isActive() {
        if (!isPublished) {
            return false;
        }

        LocalDate today = LocalDate.now();

        if (startDate != null && today.isBefore(startDate)) {
            return false;
        }

        if (endDate != null && today.isAfter(endDate)) {
            return false;
        }

        return true;
    }
}
