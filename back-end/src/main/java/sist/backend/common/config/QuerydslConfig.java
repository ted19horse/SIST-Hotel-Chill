package sist.backend.common.config;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * QueryDSL에서 사용할 JPAQueryFactory를 빈(Bean)으로 등록하는 설정 클래스입니다.
 * 이 설정이 있어야 Spring이 JPAQueryFactory를 자동으로 주입할 수 있습니다.
 */
@Configuration
public class QuerydslConfig {
    @Bean
    public JPAQueryFactory jpaQueryFactory(EntityManager entityManager) {
        // EntityManager는 이미 Spring이 자동으로 Bean으로 관리합니다.
        return new JPAQueryFactory(entityManager);
    }
}
