# Querydsl 샘플 프로젝트

이 프로젝트는 Spring Boot와 QueryDSL을 사용하는 샘플 프로젝트입니다.

## 프로젝트 구조

- `src/main/java/sist/sample/config/QuerydslConfiguration.java`: Querydsl 설정
- `src/main/java/sist/sample/entity/User.java`: 샘플 엔티티 클래스
- `src/main/java/sist/sample/controller/UserController.java`: 테스트용 REST 컨트롤러
- `src/main/java/sist/sample/QuerydslTest.java`: Querydsl 테스트 클래스
- `src/main/java/sist/sample/SampleApplication.java`: 애플리케이션 시작점

## EntityManager 문제 해결 방법

1. `@PersistenceContext` 어노테이션 사용
2. QuerydslConfiguration 클래스 추가
3. application.properties에서 데이터베이스 설정
4. Q클래스 생성을 위한 maven 설정 수정

## 실행 방법

```bash
cd sample
mvn clean install
mvn spring-boot:run
```

## 테스트 엔드포인트

- `GET /api/users/test` - EntityManager 테스트
- `GET /api/users/test-querydsl` - JPAQueryFactory 테스트
- `GET /api/users/add` - 테스트 유저 추가
- `GET /api/users` - 모든 유저 조회 (Querydsl 사용)
