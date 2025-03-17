# 호텔 예약 시스템 개발 가이드

## 개발 환경 설정

### 필수 소프트웨어

- JDK 17 이상
- Node.js 18 이상
- MySQL 8.0
- Redis (선택사항)
- Docker (선택사항)

### 프로젝트 클론 및 설정

```bash
# 저장소 클론
git clone https://github.com/your-username/hotel-reservation-system.git
cd hotel-reservation-system

# 프론트엔드 의존성 설치
cd front-end
npm install

# 백엔드 빌드
cd ../back-end
./gradlew build
```

### 데이터베이스 설정

1. MySQL 서버 실행
2. 데이터베이스 생성:

```sql
CREATE DATABASE chill CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'chill'@'localhost' IDENTIFIED BY '1111';
GRANT ALL PRIVILEGES ON chill.* TO 'chill'@'localhost';
FLUSH PRIVILEGES;
```

### 애플리케이션 실행

```bash
# 백엔드 실행
cd back-end
./gradlew bootRun

# 프론트엔드 실행
cd front-end
npm run dev
```

## 코드 스타일 가이드

### 공통 규칙

- 들여쓰기: 프론트엔드 2칸, 백엔드 4칸
- 파일 인코딩: UTF-8
- 줄 끝 문자: LF (Linux/Mac) 또는 CRLF (Windows)

### 네이밍 컨벤션

- **Java**:
  - 클래스: PascalCase (예: `UserService`)
  - 메서드/변수: camelCase (예: `getUserById`)
  - 상수: UPPER_SNAKE_CASE (예: `MAX_RETRY_COUNT`)
- **TypeScript/JavaScript**:
  - 컴포넌트: PascalCase (예: `RoomCard`)
  - 함수/변수: camelCase (예: `fetchRooms`)
  - 상수: UPPER_SNAKE_CASE (예: `API_BASE_URL`)
- **CSS/SCSS**:
  - 클래스: kebab-case (예: `room-card`)

### 코드 포맷팅

- **프론트엔드**: ESLint + Prettier 사용

  ```bash
  # 코드 스타일 검사
  npm run lint

  # 코드 포맷팅
  npm run format
  ```

- **백엔드**: Checkstyle 사용
  ```bash
  # 코드 스타일 검사
  ./gradlew checkstyleMain
  ```

## 아키텍처 가이드

### 프론트엔드 아키텍처

```
front-end/
├── app/                 # 페이지 및 라우팅
├── components/          # 재사용 가능한 컴포넌트
│   ├── ui/              # 기본 UI 컴포넌트
│   ├── [feature]/       # 기능별 컴포넌트
├── hooks/               # 커스텀 React 훅
├── lib/                 # 유틸리티 함수 및 설정
├── styles/              # 전역 스타일
```

#### 상태 관리

- 로컬 상태: React useState/useReducer
- 서버 상태: React Query
- 전역 상태: Context API

### 백엔드 아키텍처

```
back-end/
├── src/main/java/com/hotel/
│   ├── config/          # 설정 클래스
│   ├── controller/      # API 엔드포인트
│   ├── dto/             # 데이터 전송 객체
│   ├── entity/          # JPA 엔티티
│   ├── repository/      # 데이터 액세스 계층
│   ├── service/         # 비즈니스 로직
│   ├── exception/       # 예외 처리
│   ├── security/        # 보안 관련 클래스
│   └── util/            # 유틸리티 클래스
```

#### 계층 구조

- **Controller**: API 요청 처리 및 응답 반환
- **Service**: 비즈니스 로직 구현
- **Repository**: 데이터 액세스 로직
- **Entity**: 데이터베이스 테이블 매핑

## API 가이드

### RESTful API 설계 원칙

- 리소스 중심 URL 설계
- HTTP 메서드 적절히 사용 (GET, POST, PUT, DELETE)
- 적절한 HTTP 상태 코드 반환
- 일관된 응답 형식 유지

### 응답 형식

```json
{
  "status": "success",
  "data": { ... },
  "message": "성공적으로 처리되었습니다."
}
```

### 오류 응답 형식

```json
{
  "status": "error",
  "code": "USER_NOT_FOUND",
  "message": "사용자를 찾을 수 없습니다."
}
```

### API 문서화

- Swagger UI: `http://localhost:8080/api/swagger-ui.html`

## 테스트 가이드

### 프론트엔드 테스트

- **단위 테스트**: Jest + React Testing Library

  ```bash
  # 테스트 실행
  npm test

  # 특정 파일 테스트
  npm test -- components/RoomCard.test.tsx
  ```

- **E2E 테스트**: Cypress
  ```bash
  # Cypress 실행
  npm run cypress:open
  ```

### 백엔드 테스트

- **단위 테스트**: JUnit 5 + Mockito
  ```bash
  # 테스트 실행
  ./gradlew test
  ```
- **통합 테스트**: @SpringBootTest
  ```bash
  # 통합 테스트 실행
  ./gradlew integrationTest
  ```

## 배포 가이드

### Docker 배포

```bash
# 백엔드 Docker 이미지 빌드
cd back-end
docker build -t hotel-backend .

# 프론트엔드 Docker 이미지 빌드
cd front-end
docker build -t hotel-frontend .

# Docker Compose로 실행
docker-compose up -d
```

### AWS 배포

1. EC2 인스턴스 생성
2. RDS MySQL 설정
3. ElastiCache Redis 설정 (선택사항)
4. CI/CD 파이프라인 구성 (GitHub Actions)

## 브랜치 전략

### GitHub Flow

1. `main` 브랜치는 항상 배포 가능한 상태 유지
2. 새 기능 개발 시 `feature/기능명` 브랜치 생성
3. 작업 완료 후 Pull Request 생성
4. 코드 리뷰 및 승인 후 `main`에 병합
5. 버그 수정은 `hotfix/버그명` 브랜치 사용

### 커밋 메시지 컨벤션

```
<type>(<scope>): <subject>

<body>

<footer>
```

- **Type**: feat, fix, docs, style, refactor, test, chore
- **Scope**: 변경 범위 (예: auth, room, reservation)
- **Subject**: 변경 내용 요약 (50자 이내)
- **Body**: 상세 설명 (선택사항)
- **Footer**: 이슈 참조 (선택사항)

예시:

```
feat(auth): 소셜 로그인 기능 추가

- Google OAuth2 로그인 구현
- 프로필 정보 동기화 기능 추가

Closes #123
```

## 문제 해결 및 지원

### 일반적인 문제

- **프론트엔드 빌드 오류**: `node_modules` 삭제 후 재설치
- **백엔드 빌드 오류**: Gradle 캐시 삭제 후 재빌드
- **데이터베이스 연결 오류**: MySQL 서버 실행 확인 및 설정 검토

### 지원 채널

- GitHub 이슈: 버그 리포트 및 기능 요청
- 팀 채팅: 긴급 문의 및 논의
- 문서 위키: 추가 가이드 및 참고 자료
