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
 * 예약 작업 엔티티
 */
@Entity
@Table(name = "scheduled_tasks")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ScheduledTask {

    /**
     * 작업 상태 열거형
     */
    public enum TaskStatus {
        PENDING, RUNNING, COMPLETED, FAILED, CANCELLED
    }

    /**
     * 작업 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Long id;

    /**
     * 작업 이름
     */
    @Column(name = "task_name", nullable = false, length = 100)
    private String taskName;

    /**
     * 작업 설명
     */
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    /**
     * 크론 표현식
     */
    @Column(name = "cron_expression", length = 50)
    private String cronExpression;

    /**
     * 작업 클래스 이름
     */
    @Column(name = "task_class", nullable = false, length = 255)
    private String taskClass;

    /**
     * 작업 데이터
     */
    @Column(name = "task_data", columnDefinition = "TEXT")
    private String taskData;

    /**
     * 작업 상태
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private TaskStatus status;

    /**
     * 마지막 실행 시간
     */
    @Column(name = "last_run_at")
    private LocalDateTime lastRunAt;

    /**
     * 다음 실행 시간
     */
    @Column(name = "next_run_at")
    private LocalDateTime nextRunAt;

    /**
     * 마지막 실행 결과
     */
    @Column(name = "last_result", columnDefinition = "TEXT")
    private String lastResult;

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
    public ScheduledTask(String taskName, String description, String cronExpression,
            String taskClass, String taskData, LocalDateTime nextRunAt) {
        this.taskName = taskName;
        this.description = description;
        this.cronExpression = cronExpression;
        this.taskClass = taskClass;
        this.taskData = taskData;
        this.status = TaskStatus.PENDING;
        this.nextRunAt = nextRunAt;
        this.isActive = true;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * 작업 정보 업데이트
     */
    public void update(String taskName, String description, String cronExpression, String taskClass,
            String taskData, LocalDateTime nextRunAt) {
        this.taskName = taskName;
        this.description = description;
        this.cronExpression = cronExpression;
        this.taskClass = taskClass;
        this.taskData = taskData;
        this.nextRunAt = nextRunAt;
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * 작업 상태 변경
     */
    public void changeStatus(TaskStatus status) {
        this.status = status;
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
     * 작업 실행 시작
     */
    public void startExecution() {
        this.status = TaskStatus.RUNNING;
        this.lastRunAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * 작업 실행 완료
     */
    public void completeExecution(String result, LocalDateTime nextRunAt) {
        this.status = TaskStatus.COMPLETED;
        this.lastResult = result;
        this.nextRunAt = nextRunAt;
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * 작업 실행 실패
     */
    public void failExecution(String errorMessage, LocalDateTime nextRunAt) {
        this.status = TaskStatus.FAILED;
        this.lastResult = errorMessage;
        this.nextRunAt = nextRunAt;
        this.updatedAt = LocalDateTime.now();
    }
}
