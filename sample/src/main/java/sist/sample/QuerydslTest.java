package sist.sample;

import jakarta.persistence.EntityManager;
import com.querydsl.jpa.impl.JPAQueryFactory;

public class QuerydslTest {
    // check
    public void test() {
        EntityManager em = null;
        JPAQueryFactory factory = new JPAQueryFactory(em);
    }
}