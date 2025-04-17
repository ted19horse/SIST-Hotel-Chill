package sist.sample.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.querydsl.jpa.impl.JPAQueryFactory;
import sist.sample.entity.User;
// Remove QUser import

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @PersistenceContext
    private EntityManager entityManager;
    
    @Autowired
    private JPAQueryFactory queryFactory;
    
    @GetMapping("/test")
    public String testEntityManager() {
        if (entityManager != null) {
            return "EntityManager is properly configured!";
        } else {
            return "EntityManager is null!";
        }
    }
    
    @GetMapping("/test-querydsl")
    public String testQuerydsl() {
        if (queryFactory != null) {
            return "JPAQueryFactory is properly configured!";
        } else {
            return "JPAQueryFactory is null!";
        }
    }
    
    @GetMapping("/add")
    @Transactional
    public User addUser() {
        User user = new User("Test User", "test@example.com");
        entityManager.persist(user);
        return user;
    }
    
    @GetMapping
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        // Use JPQL instead of Querydsl
        return entityManager.createQuery("SELECT u FROM User u", User.class).getResultList();
    }
}
