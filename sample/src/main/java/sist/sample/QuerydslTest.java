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
        // Use EntityManager directly
        System.out.println("EntityManager: " + entityManager);
        
        // Use JPAQueryFactory from the bean
        System.out.println("QueryFactory: " + queryFactory);
    }
}
