package sist.sample;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.jpa.impl.JPAQueryFactory;

@Service
public class QuerydslTest {
    
    @PersistenceContext
    private EntityManager entityManager;
    
    @Autowired
    private JPAQueryFactory queryFactory;
    
    @Transactional
    public void test() {
        // 직접 EntityManager 사용
        System.out.println("EntityManager: " + entityManager);
        
        // Bean으로 등록된 JPAQueryFactory 사용
        System.out.println("QueryFactory: " + queryFactory);
    }
}
