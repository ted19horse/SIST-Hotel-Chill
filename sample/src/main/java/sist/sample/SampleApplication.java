package sist.sample;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@SpringBootApplication
public class SampleApplication {

    @PersistenceContext
    private EntityManager entityManager;
    
    @Autowired
    private QuerydslTest querydslTest;

    public static void main(String[] args) {
        SpringApplication.run(SampleApplication.class, args);
    }
    
    @Bean
    public CommandLineRunner testQuerydsl() {
        return args -> {
            System.out.println("=================================================");
            System.out.println("Testing EntityManager and QueryDSL Configuration");
            System.out.println("=================================================");
            
            System.out.println("EntityManager: " + entityManager);
            
            // Run the test method
            if (querydslTest != null) {
                querydslTest.test();
                System.out.println("QuerydslTest is autowired successfully");
            } else {
                System.out.println("QuerydslTest is null!");
            }
            
            System.out.println("=================================================");
        };
    }
}
